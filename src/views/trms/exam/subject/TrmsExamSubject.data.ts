import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '科目名称',
    align: "center",
    sorter: true,
    dataIndex: 'subjectName'
  },
  {
    title: '创建日期',
    align: "center",
    sorter: true,
    dataIndex: 'createTime'
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '科目名称',
    field: 'subjectName',
    component: 'Input',
    required:true,
  },
	// TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
