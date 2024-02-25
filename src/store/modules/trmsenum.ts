interface TrmsEnum {
  key: number;
  value: string;
  name?: string;
}

interface ExamPaper {
  paperTypeEnum: TrmsEnum[];
}

interface Question {
  typeEnum: TrmsEnum[];
  editUrlEnum: TrmsEnum[];
}

interface ExamState {
  examPaper: ExamPaper;
  question: Question;
}

interface State {
  exam: ExamState;
}

// initial state
const state: State = {
  exam: {
    examPaper: {
      paperTypeEnum: [{ key: 1, value: '固定试卷' }, { key: 4, value: '时段试卷' }, { key: 6, value: '任务试卷' }]
    },
    question: {
      typeEnum: [{ key: 1, value: '单选题' }, { key: 2, value: '多选题' }, { key: 3, value: '判断题' }, { key: 4, value: '填空题' }, { key: 5, value: '简答题' }],
      editUrlEnum: [{ key: 1, value: '/exam/question/edit/singleChoice', name: '单选题' },
        { key: 2, value: '/exam/question/edit/multipleChoice', name: '多选题' },
        { key: 3, value: '/exam/question/edit/trueFalse', name: '判断题' },
        { key: 4, value: '/exam/question/edit/gapFilling', name: '填空题' },
        { key: 5, value: '/exam/question/edit/shortAnswer', name: '简答题' }]
    }
  }
}

// getters
const getters = {
  enumFormat: (state: State) => (array: Trmsenum[], key: number): string | null => {
    return format(array, key);
  }
}

// actions
const actions = {}

// mutations
const mutations = {}

const format = function (array: Trmsenum[], key: number): string | null {
  for (let item of array) {
    if (item.key === key) {
      return item.value;
    }
  }
  return null;
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
