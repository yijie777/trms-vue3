import {defHttp} from "@/utils/http/axios";

enum RoleApi {
  list = '/sys/role/list',
  dockerCreate = '/sys/docker/createMaster'
}

export const list = (params) => defHttp.get(({url: RoleApi.list, params}))
export const dockerCreate =  defHttp.get(({url: RoleApi.dockerCreate}))
