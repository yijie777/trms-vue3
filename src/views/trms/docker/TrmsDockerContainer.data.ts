import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import {JVxeTypes,JVxeColumn} from '/@/components/jeecg/JVxeTable/types'
import {h} from "vue";
import {Tag} from "ant-design-vue";
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '容器名称',
    align:"center",
    dataIndex: 'name'
   },
   {
    title: '容器状态',
    align:"center",
    dataIndex: 'state',
     customRender: ({ record }) => {
       const status = record.state;
       const enable =status === 'running';
       const color = enable ? 'green' : 'red';
       const text = enable ? '运行' : '停止';
       return h(Tag, { color: color }, () => text);
     },
   },
   {
    title: '镜像名称',
    align:"center",
    dataIndex: 'image'
   },
   {
    title: '启动命令',
    align:"center",
    dataIndex: 'command',


   },
   {
    title: '哈希值',
    align:"center",
    dataIndex: 'id64'
   },
   {
    title: '创建时间',
    align:"center",
    dataIndex: 'createTime'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "容器名称",
      field: 'name',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "容器状态",
      field: 'state',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "镜像哈希",
      field: 'imageId64',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "镜像名称",
      field: 'image',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "启动命令",
      field: 'command',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "哈希值",
      field: 'id64',
      component: 'Input',
      colProps: {span: 6},
 	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '容器名称',
    field: 'name',
    component: 'Input',
  },
  {
    label: '容器状态',
    field: 'state',
    component: 'Input',
  },
  {
    label: '镜像名称',
    field: 'image',
    component: 'Input',
  },
  {
    label: '启动命令',
    field: 'command',
    component: 'Input',
  },
  {
    label: '哈希值',
    field: 'id64',
    component: 'Input',
  },
  {
    label: '创建时间',
    field: 'createTime',
    component: 'DatePicker',
    componentProps: {
       showTime:true,
       valueFormat: 'YYYY-MM-DD HH:mm:ss'
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
//子表单数据
//子表列表数据
export const trmsDockerNetworkSettingsColumns: BasicColumn[] = [
   {
    title: '网络名称',
    align:"center",
    dataIndex: 'networkName'
   },
   {
    title: 'mac地址',
    align:"center",
    dataIndex: 'macAddress'
   },
   {
    title: '网关',
    align:"center",
    dataIndex: 'gateway'
   },
   {
    title: 'IP地址',
    align:"center",
    sorter: true,
    dataIndex: 'ipAddress'
   },
   {
    title: '前缀长度',
    align:"center",
    sorter: true,
    dataIndex: 'ipPrefixLen'
   },
   {
    title: '哈希值',
    align:"center",
    dataIndex: 'id64'
   },
];
//子表列表数据
export const trmsDockerContainerPortsColumns: BasicColumn[] = [
   {
    title: 'IP地址',
    align:"center",
    dataIndex: 'ip'
   },
   {
    title: '内部端口',
    align:"center",
    dataIndex: 'privatePort'
   },
   {
    title: '外部端口',
    align:"center",
    dataIndex: 'publicPort'
   },
   {
    title: '通信类型',
    align:"center",
    dataIndex: 'type'
   },
];
//子表表格配置
export const trmsDockerNetworkSettingsJVxeColumns: JVxeColumn[] = [
    {
      title: '网络名称',
      key: 'networkName',
      type: JVxeTypes.input,
      disabled:true,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: 'mac地址',
      key: 'macAddress',
      type: JVxeTypes.input,
      disabled:true,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '网关',
      key: 'gateway',
      type: JVxeTypes.input,
      disabled:true,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: 'IP地址',
      key: 'ipAddress',
      type: JVxeTypes.input,
      disabled:true,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '前缀长度',
      key: 'ipPrefixLen',
      type: JVxeTypes.inputNumber,
      disabled:true,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '哈希值',
      key: 'id64',
      type: JVxeTypes.input,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
  ]
export const trmsDockerContainerPortsJVxeColumns: JVxeColumn[] = [
    {
      title: 'IP地址',
      key: 'ip',
      type: JVxeTypes.input,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '内部端口',
      key: 'privatePort',
      type: JVxeTypes.inputNumber,
      disabled:true,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '外部端口',
      key: 'publicPort',
      type: JVxeTypes.inputNumber,
      disabled:true,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '通信类型',
      key: 'type',
      type: JVxeTypes.input,
      disabled:true,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
  ]

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
