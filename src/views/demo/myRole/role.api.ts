import {defHttp} from "@/utils/http/axios";

enum RoleApi {
  list = '/sys/role/list',
  dockerCreate = '/trms/docker/createHA',
  save = '/sys/role/add',
  edit = '/sys/role/edit',
  test1 = '/websocket1/test1',
  test2 = '/trms/ssh/test2',
  trmsStudentCourseList = '/trms/trmsStudentCourse/list',
}

export const list = (params) => defHttp.get(({url: RoleApi.list, params}))

export const createHA = (params) => defHttp.post(({url: RoleApi.dockerCreate, params}))
export const add = (params) => defHttp.post(({url: RoleApi.save, params}))
export const edit = (params) => defHttp.post(({url: RoleApi.edit, params}))

export const test1 = (params) => defHttp.post(({url: RoleApi.test1, params}))
export const test2 = (params) => defHttp.post(({url: RoleApi.test2, params}))
export const trmsStudentCourseList = (params) => defHttp.get(({url: RoleApi.trmsStudentCourseList, params}))
