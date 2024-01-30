import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '课程名称',
    align:"center",
    dataIndex: 'courseName'
  },
  {
    title: '授课教师',
    align:"center",
    dataIndex: 'tearcherId'
  },
  {
    title: '课程描述',
    align:"center",
    dataIndex: 'description'
  },

  {
    title: '文档路径',
    align:"center",
    dataIndex: 'documentUrl',
    slots: { customRender: 'fileSlot' },
  },
  {
    title: '资源路径',
    align:"center",
    dataIndex: 'resourceUrl',
    slots: { customRender: 'fileSlot' },
  },
  {
    title: '封面',
    align:"center",
    dataIndex: 'imageUrl',
    customRender:render.renderImage,
  },
  {
    title: '创建日期',
    align:"center",
    dataIndex: 'createTime'
  },
  {
    title: '镜像组',
    align:"center",
    dataIndex: 'imageGroup_dictText'
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '课程名称',
    field: 'courseName',
    component: 'Input',
  },
  {
    label: '授课教师',
    field: 'tearcherId',
    component: 'Input',
  },
  {
    label: '课程描述',
    field: 'description',
    component: 'Input',
  },

  {
    label: '文档路径',
    field: 'documentUrl',
    component: 'JUpload',
    componentProps:{
    },
  },
  {
    label: '资源路径',
    field: 'resourceUrl',
    component: 'JUpload',
    componentProps:{
    },
  },
  {
    label: '封面',
    field: 'imageUrl',
    component: 'JImageUpload',
    componentProps:{
    },
  },
  {
    label: '创建日期',
    field: 'createTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    },
    dynamicDisabled:true
  },
  {
    label: '镜像组',
    field: 'imageGroup',
    component: 'JSelectMultiple',
    componentProps:{
      dictCode:"trms_docker_image,repotags,id"
    },
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
