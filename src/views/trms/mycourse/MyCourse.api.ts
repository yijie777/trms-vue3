import {defHttp} from "@/utils/http/axios";

enum MyCourseApi {
  list = '/trms/trmsStudentCourse/list',
}

export const list = (params) => defHttp.get(({url: MyCourseApi.list, params}))

