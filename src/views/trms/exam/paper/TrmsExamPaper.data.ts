import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import {render} from "@/utils/common/renderUtils";
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '试卷名称',
    align: "center",
    dataIndex: 'name'
  },
  {
    title: '科目',
    align: "center",
    dataIndex: 'subjectId_dictText'
  },
  {
    title: '试卷类型',
    align: "center",
    dataIndex: 'paperType',
    customRender:({text}) => {
      return  render.renderSwitch(text, [{text:'固定试卷',value:'1'},{text:'时段试卷',value:'2'}]);
    },
  },
  {
    title: '分数',
    align: "center",
    sorter: true,
    dataIndex: 'score'
  },
  {
    title: '题目数量',
    align: "center",
    sorter: true,
    dataIndex: 'questionCount'
  },
  {
    title: '建议时间',
    align: "center",
    sorter: true,
    dataIndex: 'suggestTime'
  },
  {
    title: '开始时间限制',
    align: "center",
    sorter: true,
    dataIndex: 'limitStartTime'
  },
  {
    title: '结束时间限制',
    align: "center",
    sorter: true,
    dataIndex: 'limitEndTime'
  },
  // {
  //   title: '标题列表',
  //   align: "center",
  //   dataIndex: 'titleItems'
  // },
  // {
  //   title: '创建用户',
  //   align: "center",
  //   sorter: true,
  //   dataIndex: 'createUser'
  // },
  {
    title: '创建时间',
    align: "center",
    dataIndex: 'createTime'
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '试卷名称',
    field: 'name',
    component: 'Input',
  },
  {
    label: '科目',
    field: 'subjectId',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "trms_exam_subject,subject_name,id"
    },
  },
  {
    label: '分数',
    field: 'score',
    component: 'InputNumber',
  },
  {
    label: '题目数量',
    field: 'questionCount',
    component: 'InputNumber',
  },
  {
    label: '建议时间',
    field: 'suggestTime',
    component: 'InputNumber',
  },
  {
    label: '开始时间限制',
    field: 'limitStartTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    },
  },
  {
    label: '结束时间限制',
    field: 'limitEndTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    },
  },
  {
    label: '标题列表',
    field: 'titleItems',
    component: 'Input',
  },
	// TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
