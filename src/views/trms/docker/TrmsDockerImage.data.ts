import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '创建时间',
    align:"center",
    dataIndex: 'createTime'
   },
   {
    title: '标签',
    align:"center",
    dataIndex: 'repotags'
   },
   {
    title: '大小',
    align:"center",
    dataIndex: 'size'
   },
   {
    title: '哈希值',
    align:"center",
    dataIndex: 'id64'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '创建时间',
    field: 'createTime',
    component: 'DatePicker',
    componentProps: {
       showTime: true,
       valueFormat: 'YYYY-MM-DD HH:mm:ss'
     },
  },
  {
    label: '标签',
    field: 'repotags',
    component: 'Input',
  },
  {
    label: '大小',
    field: 'size',
    component: 'InputNumber',
  },
  {
    label: '哈希值',
    field: 'id64',
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