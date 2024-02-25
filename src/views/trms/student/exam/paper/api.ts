import { defHttp } from '/@/utils/http/axios';


enum Api {
  subjectList = '/trms/trmsExamSubject/list',
  paperList='/trms/trmsExamPaper/list'
}

/**
 * 列表接口
 * @param params
 */
export const subjectList = (params) => defHttp.get({ url: Api.subjectList, params });
export const paperList = (params) => defHttp.get({ url: Api.paperList, params });
