<template>
  <PageWrapper contentFullHeight>
    <CollapseContainer>
      <a-spin :spinning="confirmLoading">
        <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-row>
            <a-col :span="24">
              <a-form-item label="科目" v-bind="validateInfos.subjectId">
                <j-dict-select-tag v-model:value="formData.subjectId"
                                   dictCode="trms_exam_subject,subject_name,id"
                                   placeholder="请选择科目" :disabled="disabled"/>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="分数" v-bind="validateInfos.score">
                <a-input-number v-model:value="formData.score" placeholder="请输入分数"
                                style="width: 100%" :disabled="disabled"/>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="难度" v-bind="validateInfos.difficult">
                <a-rate v-model:value="formData.difficult" placeholder="请输入难度"
                        style="width: 100%" :disabled="disabled"/>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="题干" v-bind="validateInfos.stem">
                <j-editor v-model:value="formData.stem" :disabled="disabled"/>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="选项">
              </a-form-item>
              <a-form-item :label="item.prefix" v-for="(item,index) in formData.items"
                           :key="item.prefix"  v-show="!confirmLoading">
                <a-row :gutter="9">
                  <a-col :span="2">
                    <a-input v-model:value="item.content"
                             style="width: 100%" :disabled="disabled"/>
                  </a-col>
                </a-row>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="标答" v-bind="validateInfos.correct">
                <a-radio-group v-model:value="formData.correct" name="radioGroup">
                  <a-radio :value="item.prefix"  v-for="item in formData.items">{{item.prefix}}</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="解析" v-bind="validateInfos.analysis">
                <j-editor v-model:value="formData.analysis" :disabled="disabled"/>

              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item :wrapper-col="{ offset: 5 }">
                <a-button @click="submitForm()" type="primary">提交</a-button>
                <a-button @click="resetForm()" style="margin-left: 10px">重置</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-spin>

    </CollapseContainer>
  </PageWrapper>
</template>

<script lang="ts" setup>
import {ref, reactive, defineExpose, nextTick, defineProps, computed, onMounted} from 'vue';
import {defHttp} from '/@/utils/http/axios';
import {useMessage} from '/@/hooks/web/useMessage';
import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
import JSwitch from '/@/components/Form/src/jeecg/components/JSwitch.vue';
import JEditor from '/@/components/Form/src/jeecg/components/JEditor.vue';
import {getValueType} from '/@/utils';
import {saveOrUpdate} from '../TrmsExamQuestion.api';
import {Form} from 'ant-design-vue';
import {PageWrapper} from "@/components/Page";
import {CollapseContainer} from "@/components/Container";
import {useRoute} from "vue-router";

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
  questionType: 3,
  subjectId: '',
  score: undefined,
  difficult: undefined,
  stem: '',
  items: [
    {prefix: 'A', content: '是'},
    {prefix: 'B', content: '否'},

  ],
  correct: '',
  analysis: '',
  status: 'Y',
});
const {createMessage} = useMessage();
const labelCol = ref<any>({xs: {span: 24}, sm: {span: 5}});
const wrapperCol = ref<any>({xs: {span: 24}, sm: {span: 16}});
const confirmLoading = ref<boolean>(false);
//表单验证
const validatorRules = {
  subjectId: [
    {required: true, message: '请选择科目', trigger: 'blur'}
  ],
  score: [
    {required: true, message: '请输入分数', trigger: 'blur'}
  ],
  difficult: [
    {required: true, message: '请输入难度', trigger: 'blur'}
  ],
  stem: [
    {required: true, message: '请输入题干', trigger: 'blur'}
  ],
  correct: [
    {required: true, message: '请选择标答', trigger: 'blur'}
  ],

};
const {resetFields, validate, validateInfos} = useForm(formData, validatorRules, {immediate: true});

// 表单禁用
const disabled = computed(() => {
  if (props.formBpm === true) {
    return false;
  }
  return props.formDisabled;
});
onMounted(()=>{
  init()
})

function init() {
  let id = route.query.id
  if (id) {
    confirmLoading.value=true
    defHttp.get({url: '/trms/trmsExamQuestion/queryById?id=' + id, params: {}}).then((res) => {
      res.items=JSON.parse(res.items)
      Object.assign(formData,res)
      confirmLoading.value=false
    });
  }

}

function resetForm() {
  resetFields();
}

function questionItemRemove(index) {
  formData.items.splice(index, 1)
}

function questionItemAdd() {
  let items = formData.items
  let newLastPrefix
  if (items.length > 0) {
    let last = items[items.length - 1]
    newLastPrefix = String.fromCharCode(last.prefix.charCodeAt() + 1)
  } else {
    newLastPrefix = 'A'
  }
  items.push({id: null, prefix: newLastPrefix, content: ''})
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
  let flag = true;
  if (formData.itemsObject.length < 2) {
    createMessage.warning('选项不能少于2个');
    flag = false
  }
  formData.itemsObject.forEach((item, index) => {
    if (item.content == '') {
      createMessage.warning('选项内容不能为空');
      flag = false
    }
  })
  if (!flag) return
  confirmLoading.value = true;
  const isUpdate = ref<boolean>(false);
  //时间格式化
  let model = formData;
  if (model.id) {
    isUpdate.value = true;
  }
  formData.items = JSON.stringify(formData.items)
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
