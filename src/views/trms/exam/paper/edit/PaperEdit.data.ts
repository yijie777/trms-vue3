import {BasicColumn} from '/@/components/Table';
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
    dataIndex: 'difficult',
  },
  {
    title: '题干',
    align: "center",
    dataIndex: 'stem',
    slots: {customRender: 'htmlSlot'},
  },
  {
    title: '创建时间',
    align: "center",
    sorter: true,
    dataIndex: 'createTime'
  },
];
