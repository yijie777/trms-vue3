import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '学生选课的日期',
    align:"center",
    sorter: true,
    dataIndex: 'createTime'
   },
   {
    title: '分数',
    align:"center",
    sorter: true,
    dataIndex: 'score'
   },
   {
    title: '容器列表',
    align:"center",
    dataIndex: 'containerList'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "学生ID",
      field: 'studentId',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "课程ID",
      field: 'courseId',
      component: 'Input',
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
    label: '学生选课的日期',
    field: 'createTime',
    component: 'DatePicker',
    componentProps: {
       showTime: true,
       valueFormat: 'YYYY-MM-DD HH:mm:ss'
     },
  },
  {
    label: '分数',
    field: 'score',
    component: 'InputNumber',
  },
  {
    label: '容器列表',
    field: 'containerList',
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