import {defHttp} from "@/utils/http/axios";

enum RoleApi {
  restart = '/trms/ssh/restart',
  reset = '/trms/ssh/reset',
  test1 = '/websocket1/test1',
  test2 = '/trms/ssh/test2',
  edit = '/trms/trmsStudentCourse/edit',
  trmsStudentCourseList = '/trms/trmsStudentCourse/list',
}


export const restart = (params) => defHttp.get(({
  url: RoleApi.restart + "?name=" + params
}))

export const reset = (params) => defHttp.get(({url: RoleApi.reset + "?name=" + params}))

export const edit = (params) => defHttp.post(({url: RoleApi.edit, params}))
export const oneClickDeployment = (params) => defHttp.post(({url: RoleApi.test1, params}))
export const automaticCorrection = (params) => defHttp.post(({url: RoleApi.test2, params}))
export const trmsStudentCourseList = (params) => defHttp.get(({
  url: RoleApi.trmsStudentCourseList,
  params
}))
