import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '课程',
    align:"center",
    sorter: true,
    dataIndex: 'courseId_dictText'
  },
  {
    title: '学生选课的日期',
    align:"center",
    sorter: true,
    dataIndex: 'createTime'
  },
  {
    title: '文件上传',
    align:"center",
    dataIndex: 'uploadUrl',
    slots: { customRender: 'fileSlot' },
  },
  {
    title: '备注',
    align:"center",
    dataIndex: 'notes'
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: "学生",
    field: 'studentId',
    component: 'Input',
    colProps: {span: 6},
  },
  {
    label: "课程",
    field: 'courseId',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode:"trms_course,course_name,id"
    },
    colProps: {span: 6},
  },
  {
    label: "学生选课的日期",
    field: "createTime",
    component: 'RangePicker',
    componentProps: {
      valueType: 'Date',
      showTime:true
    },
    colProps: {span: 6},
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '小组',
    field: 'groupId',
    defaultValue: "",
    component: 'JSelectMultiple',
    componentProps:{
      dictCode:"trms_group,group_name,id"
    },
    dynamicRules: ({model,schema}) => {
      return [
        { required: true, message: '请输入小组ID!'},
      ];
    },
  },
  {
    label: '课程',
    field: 'courseId',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode:"trms_course,course_name,id"
    },
    dynamicRules: ({model,schema}) => {
      return [
        { required: true, message: '请输入课程ID!'},
      ];
    },
  },

  {
    label: '文件上传',
    field: 'uploadUrl',
    component: 'JUpload',
    componentProps:{
    },
    dynamicDisabled:true
  },
  {
    label: '备注',
    field: 'notes',
    component: 'Input',
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false
  },
];



/**
 * 流程表单调用这个方法获取formSchema
 * @param param
 */
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
