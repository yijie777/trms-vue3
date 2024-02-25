<template>
  <PageWrapper contentFullHeight>
    <CollapseContainer>
      <a-spin :spinning="confirmLoading">
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-row>
            <a-col :span="24">
              <a-form-item label="学科" v-bind="validateInfos.subjectId">
                <j-dict-select-tag v-model:value="formData.subjectId"
                                   dictCode="trms_exam_subject,subject_name,id"
                                   placeholder="请选择科目" :disabled="disabled"/>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="试卷名称" v-bind="validateInfos.name">
                <a-input v-model:value="formData.name"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="试卷类型" v-bind="validateInfos.paperType">
                <a-select v-model:value="formData.paperType">
                  <a-select-option value="1">固定试卷</a-select-option>
                  <a-select-option value="2">时段试卷</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="24" v-show="formData.paperType==='2'">
              <a-form-item label="考试时间">
                <a-range-picker
                  :show-time="{ format: 'HH:mm:ss' }"
                  format="YYYY-MM-DD HH:mm:ss"
                  :placeholder="['开始日期', '结束日期']"
                  @change="onRangeChange"
                  @ok="onRangeOk"
                />
              </a-form-item>
            </a-col>
            <a-col :span="24" v-for="(titleItem,index) in formData.titleItemsObject">
              <a-form-item :label="'标题'+(index+1)+'：'" v-bind="validateInfos.name">
                <a-input v-model:value="titleItem.name" style="width: 80%"/>
                <a-button type="primary" style="margin-left: 20px" @click="addQuestion(index)">
                  添加题目
                </a-button>
<!--                <a-card v-if="titleItem.questionItems.length!==0" style="margin-top: 10px">-->
                <a-card  style="margin-top: 10px">
                  <a-row :key="questionIndex"
                         v-for="(questionItem,questionIndex) in titleItem.questionItems"
                         style="margin-bottom: 15px">
                    <a-col :span="22">
                      <span>{{ '题目' + (questionIndex + 1) + '：' }}</span>
                      <div v-html="questionItem.stem"></div>
                      <div v-for="item in questionItem.items" :key="item.id"
                           style="margin-right: 5px" v-if="questionItem.questionType===1">
                        {{ item.prefix }}: {{ item.content }}
                      </div>
                      <div v-for="item in questionItem.items" :key="item.id"
                           style="margin-right: 5px" v-if="questionItem.questionType===2">
                        {{ item.prefix }}: {{ item.content }}
                      </div>
                    </a-col>
                    <a-col :span="1">
                      <a-button type="primary"
                                @click="titleItem.questionItems.splice(questionIndex,1)">删除
                      </a-button>
                    </a-col>
                  </a-row>
                </a-card>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="时间限制" v-bind="validateInfos.suggestTime">
                <a-input-number v-model:value="formData.suggestTime"></a-input-number>
                <span>分钟</span>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item :wrapper-col="{ offset: 5 }">
                <a-button @click="submitForm()" type="primary">提交</a-button>
                <a-button @click="resetForm()" style="margin-left: 10px">重置</a-button>
                <a-button type="ghost" @click="addTitle">添加标题</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-spin>
      <a-modal width="70%" :visible="questionPage.showDialog" @ok="handleOk" @cancel="handleCancel"
               cancelText="关闭">
        <a-form :model="questionPage.queryParam" ref="queryForm" :label-col="labelCol"
                :wrapper-col="wrapperCol">
          <a-row :gutter="24" style="padding-top: 20px">
            <a-col :lg="6">
              <a-form-item label="题干" name="stem">
                <a-input placeholder="请输入关键字"
                         v-model:value="questionPage.queryParam.stem"></a-input>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item label="题型：">
                <a-select v-model:value="questionPage.queryParam.questionType" clearable>
                  <a-select-option v-for="item in formData.questionTypeEnum"
                                   :value="item.key">{{ item.value }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item>
                <a-button type="primary" @click="search">查询</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <a-table
          :row-selection="rowSelection"
          row-key="id"
          :columns="columns"
          :data-source="questionPage.tableData"
        >
          <template #htmlSlot="{text}">
            <div v-html="text"></div>
          </template>

        </a-table>
      </a-modal>
    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts" setup>
import {computed, defineExpose, defineProps, nextTick, onMounted, reactive, ref} from 'vue';
import {defHttp} from '/@/utils/http/axios';
import {useMessage} from '/@/hooks/web/useMessage';
import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
import {getValueType} from '/@/utils';
import {Form} from 'ant-design-vue';
import {PageWrapper} from "@/components/Page";
import {CollapseContainer} from "@/components/Container";
import {useRoute} from "vue-router";
import {saveOrUpdate} from "@/views/trms/exam/paper/TrmsExamPaper.api";
import {Dayjs} from 'dayjs';
import {columns} from './PaperEdit.data';

const route = useRoute()
const props = defineProps({
  formDisabled: {type: Boolean, default: false},
  formData: {
    type: Object, default: () => {
    }
  },
  formBpm: {type: Boolean, default: true}
});
const formRef = ref();
const useForm = Form.useForm;
const emit = defineEmits(['register', 'ok']);
const formData = reactive<Record<string, any>>({
  id: '',
  name: '',
  subjectId: undefined,
  score: undefined,
  questionCount: undefined,
  suggestTime: undefined,
  limitStartTime: '',
  limitEndTime: '',
  paperType:'1',
  titleItems: "",
  titleItemsObject: [{
    name: "",
    questionItems: []
  }],
  questionTypeEnum: [{key: 1, value: '单选题'}, {key: 2, value: '多选题'}, {
    key: 3,
    value: '判断题'
  }, {key: 4, value: '填空题'}, {key: 5, value: '简答题'}],
  // paperTypeEnum: [{ key: 1, value: '固定试卷' }, { key: 4, value: '时段试卷' }, { key: 6, value: '视频试卷' }]
});
const {createMessage} = useMessage();
const labelCol = ref<any>({xs: {span: 24}, sm: {span: 5}});
const wrapperCol = ref<any>({xs: {span: 24}, sm: {span: 16}});
const confirmLoading = ref<boolean>(false);
//表单验证
const validatorRules = {
  subjectId: [
    {required: true, message: '学科不能为空', trigger: 'blur'},
  ],
  name: [
    {required: true, message: '试卷名称不能为空', trigger: 'blur'},
    {max: 50, message: '试卷名称不能超过50个字符', trigger: 'blur'},
  ],
  suggestTime: [
    {required: true, message: '建议时长不能为空', trigger: 'blur'},
  ],
  titleItemsObject: [
    {required: true, message: '标题不能为空', trigger: 'blur'},
  ],


};
const {resetFields, validate, validateInfos} = useForm(formData, validatorRules, {immediate: true});
const questionPage = reactive<Record<string, any>>({
  multipleSelection: [],
  showDialog: false,
  selectedRowKeys: [],
  queryParam: {
    questionType: null,
    term: '',
    pageNo: 1,
    pageSize: 10,
  },
  listLoading: true,
  tableData: [],
  total: 0
})

// const rowSelection: TableProps['rowSelection'] = {
//   onChange: (selectedRowKeys: string[], selectedRows: {}) => {
//     console.log(selectedRowKeys)
//     questionPage.multipleSelection = selectedRowKeys;
//   },
// };
const state = reactive({
  selectedRowKeys: [],
});
const rowSelection = computed(() => {
  return {
    selectedRowKeys: state.selectedRowKeys,
    onChange: (selectedRowKeys) => {
      questionPage.multipleSelection = selectedRowKeys;
      state.selectedRowKeys = selectedRowKeys;
      console.log(state.selectedRowKeys)
    },
  };
});

let currentTitleIndex = 0
// 表单禁用
const disabled = computed(() => {
  if (props.formBpm === true) {
    return false;
  }
  return props.formDisabled;
});

onMounted(() => {
  init()
})

function init() {
  let id = route.query.id
  if (id) {
    confirmLoading.value = true
    defHttp.get({url: '/trms/trmsExamQuestion/queryById?id=' + id, params: {}}).then((res) => {
      res.items = JSON.parse(res.items)
      Object.assign(formData, res)
      confirmLoading.value = false
    });
  }
}


function search() {
  defHttp.get({url: '/trms/trmsExamQuestion/list', params: questionPage.queryParam}).then((res) => {
    const idList = formData.titleItemsObject[currentTitleIndex]['questionItems'].map((item) => item.id)
    questionPage.tableData = res.records.filter(item => !idList.includes(item.id));
  });
}

function handleOk() {
  questionPage.multipleSelection.forEach((id) => {
    defHttp.get({url: '/trms/trmsExamQuestion/queryById?id=' + id, params: {}}).then((res) => {
      res.items = JSON.parse(res.items)
      formData.titleItemsObject[currentTitleIndex]['questionItems'].push(res)
    });
  })
  questionPage.showDialog = false
}

function handleCancel() {
  questionPage.showDialog = false
}

function addTitle() {
  formData.titleItemsObject.push({
    name: '',
    questionItems: []
  })
}

function addQuestion(index) {
  questionPage.showDialog = true
  currentTitleIndex = index
  questionPage.multipleSelection = []
  state.selectedRowKeys = []
  search()
}

const onRangeChange = (value: [Dayjs, Dayjs], dateString: [string, string]) => {
  formData.limitStartTime = dateString[0];
  formData.limitEndTime = dateString[1];
};

const onRangeOk = (value: [Dayjs, Dayjs]) => {
};

function resetForm() {
  resetFields();
}

/**
 * 新增
 */
function add() {
  edit({});
}

/**
 * 编辑
 */
function edit(record) {
  nextTick(() => {
    resetFields();
    //赋值
    Object.assign(formData, record);
  });
}

/**
 * 提交数据
 */
async function submitForm() {
  // 触发表单验证
  await validate();
  confirmLoading.value = true;
  const isUpdate = ref<boolean>(false);
  //时间格式化
  let model = formData;
  if (model.id) {
    isUpdate.value = true;
  }
  formData.score = formData.titleItemsObject.reduce((pre, cur) => {
    return pre + cur.questionItems.reduce((pre, cur) => {
      return pre + cur.score
    }, 0)
  }, 0)
  formData.questionCount= formData.titleItemsObject.reduce((pre, cur) => {
    return pre + cur.questionItems.length
  }, 0)
  formData.titleItems = JSON.stringify(formData.titleItemsObject.map(item => {
    return {
      name: item.name,
      // questionItems: item.questionItems.map(question => question.id)
      questionItems: item.questionItems
    }
  }))
  await saveOrUpdate(model, isUpdate.value)
    .then((res) => {
      resetFields();
      if (res.success) {
        createMessage.success(res.message);
        emit('ok');
      } else {
        createMessage.warning(res.message);
      }
    })
    .finally(() => {
      confirmLoading.value = false;
    });
}


defineExpose({
  add,
  edit,
  submitForm,
});
</script>

<style lang="less" scoped>
.antd-modal-form {
  min-height: 500px !important;
  overflow-y: auto;
  padding: 24px 24px 24px 24px;
}
</style>
