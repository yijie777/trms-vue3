import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import {render} from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '题目类型',
    align: "center",
    sorter: true,
    dataIndex: 'questionType',
    customRender: ({text}) => {
      return render.renderSwitch(text, [
        {text: '单选题', value: '1'}, {text: '多选题', value: '2'},
        {text: '判断题', value: '3'}, {text: '填空题', value: '4'},
        {text: '简答题', value: '5'},
      ]);
    },
  },
  {
    title: '科目',
    align: "center",
    sorter: true,
    dataIndex: 'subjectId_dictText'
  },
  {
    title: '分数',
    align: "center",
    sorter: true,
    dataIndex: 'score'
  },
  {
    title: '难度',
    align: "center",
    sorter: true,
    dataIndex: 'difficult'
  },
  {
    title: '题干',
    align: "center",
    dataIndex: 'stem',
    slots: {customRender: 'htmlSlot'},
  },
  // {
  //   title: '选项',
  //   align: "center",
  //   dataIndex: 'items'
  // },
  {
    title: '正确答案',
    align: "center",
    dataIndex: 'correct',
    slots: {customRender: 'htmlSlot'},
  },
  {
    title: '解析',
    align: "center",
    dataIndex: 'analysis',
    slots: {customRender: 'htmlSlot'},
  },
  // {
  //   title: '创建用户',
  //   align: "center",
  //   dataIndex: 'createUser',
  // },
  {
    title: '状态',
    align: "center",
    sorter: true,
    dataIndex: 'status',
    customRender: ({text}) => {
      return render.renderSwitch(text, [{text: '是', value: 'Y'}, {text: '否', value: 'N'}]);
    },
  },
  {
    title: '创建时间',
    align: "center",
    sorter: true,
    dataIndex: 'createTime'
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: "科目ID",
    field: 'subjectId',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: "trms_exam_subject,subject_name,id"
    },
    colProps: {span: 6},
  },
  {
    label: "分数",
    field: 'score',
    component: 'Input',
    colProps: {span: 6},
  },
  {
    label: "题干",
    field: "stem",
    component: 'Input', //TODO 范围查询
    colProps: {span: 6},
  },
  {
    label: "创建用户",
    field: 'createUser',
    component: 'Input',
    colProps: {span: 6},
  },
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '题目类型',
    field: 'questionType',
    component: 'Input',
    dynamicDisabled: true
  },
  {
    label: '科目ID',
    field: 'subjectId',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: "trms_exam_subject,subject_name,id"
    },
  },
  {
    label: '分数',
    field: 'score',
    component: 'InputNumber',
  },
  {
    label: '难度',
    field: 'difficult',
    component: 'InputNumber',
  },
  {
    label: '题干',
    field: 'stem',
    component: 'JEditor',
  },
  {
    label: '选项',
    field: 'items',
    component: 'InputTextArea',
  },
  {
    label: '正确答案',
    field: 'correct',
    component: 'JEditor',
  },
  {
    label: '解析',
    field: 'analysis',
    component: 'JEditor',
  },
  {
    label: '状态',
    field: 'status',
    component: 'JSwitch',
    componentProps: {},
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
