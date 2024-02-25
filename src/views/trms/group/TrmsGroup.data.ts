import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import {rules} from '/@/utils/helper/validator';
import {render} from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '小组名称',
    align: "center",
    dataIndex: 'groupName'
  },
  {
    title: '小组成员',
    align: "center",
    dataIndex: 'groupMembers_dictText'
  },
  {
    title: '启动状态',
    align: "center",
    dataIndex: 'groupState',
    customRender: ({text}) => {
      return render.renderSwitch(text, [{text: '是', value: 'Y'}, {text: '否', value: 'N'}])
    },
  },
  {
    title: '创建日期',
    align: "center",
    dataIndex: 'createTime'
  },
  {
    title: '更新日期',
    align: "center",
    dataIndex: 'updateTime'
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: "小组名称",
    field: 'groupName',
    component: 'Input',
    colProps: {span: 6},
  },
  {
    label: "小组成员",
    field: 'groupMembers',
    component: 'JSelectUserByDept',
    colProps: {span: 6},
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '小组名称',
    field: 'groupName',
    component: 'Input',
    required: true,
  },
  {
    label: '小组成员',
    field: 'groupMembers',
    component: 'JSelectUserByDept',
    componentProps: {
      labelKey: 'realname',
    },
    required: true,
  },
  {
    label: '启动状态',
    field: 'groupState',
    component: 'JSwitch',
    componentProps: {},
    defaultValue: 'Y',
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
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
