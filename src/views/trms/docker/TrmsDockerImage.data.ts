import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '创建时间',
    align:"center",
    sorter: true,
    dataIndex: 'createTime'
  },
  {
    title: '标签',
    align:"center",
    sorter: true,
    dataIndex: 'repotags'
  },
  {
    title: '大小',
    align:"center",
    sorter: true,
    dataIndex: 'size',
    format: (text) => {
      // 将字节转换为 GB，保留两位小数
      const sizeInGB = text / (1024 * 1024 * 1024);
      return sizeInGB.toFixed(2) + ' GB';
    }
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: "标签",
    field: 'repotags',
    component: 'Input',
    colProps: {span: 6},
    //模糊查询
    componentProps: {
      suffixIcon: 'SearchOutlined',
    }
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: 'id',
    field: 'id',
    component: 'Input',
    show:false,
  },

  {
    label: '开放端口',
    field: 'openPort',
    component: 'Input',
    helpMessage:'多个端口用逗号隔开',
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
