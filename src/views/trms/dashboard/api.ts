import { defHttp } from '/@/utils/http/axios';

enum Api {
  scc = '/trms/statistics/scCount',
  ic = '/trms/statistics/imageCount',
  qc = '/trms/statistics/questionCount',
  pc = '/trms/statistics/paperCount',
}

export const getSCCount = (params) => defHttp.get({ url: Api.scc, params }, { isTransformResponse: false });
export const getImageCount = (params) => defHttp.get({ url: Api.ic, params }, { isTransformResponse: false });
export const getQuestionCount = (params) => defHttp.get({ url: Api.qc, params }, { isTransformResponse: false });
export const getPaperCount = (params) => defHttp.get({ url: Api.pc, params }, { isTransformResponse: false });
