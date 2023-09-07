import {defHttp} from '/@/utils/http/axios';
import { useMessage } from "/@/hooks/web/useMessage";

const { createConfirm } = useMessage();

enum Api {
  list = '/trms/trmsDockerContainer/list',
  save='/trms/trmsDockerContainer/add',
  edit='/trms/trmsDockerContainer/edit',
  deleteOne = '/trms/trmsDockerContainer/delete',
  deleteBatch = '/trms/trmsDockerContainer/deleteBatch',
  importExcel = '/trms/trmsDockerContainer/importExcel',
  exportXls = '/trms/trmsDockerContainer/exportXls',
  trmsDockerNetworkSettingsList = '/trms/trmsDockerContainer/queryTrmsDockerNetworkSettingsByMainId',
  trmsDockerContainerPortsList = '/trms/trmsDockerContainer/queryTrmsDockerContainerPortsByMainId',
}
/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;

/**
 * 导入api
 */
export const getImportUrl = Api.importExcel;
/**
 * 子表单查询接口
 * @param params
 */
export const queryTrmsDockerNetworkSettings = Api.trmsDockerNetworkSettingsList
/**
 * 子表单查询接口
 * @param params
 */
export const queryTrmsDockerContainerPorts = Api.trmsDockerContainerPortsList
/**
 * 列表接口
 * @param params
 */
export const list = (params) =>
  defHttp.get({url: Api.list, params});

/**
 * 删除单个
 */
export const deleteOne = (params,handleSuccess) => {
  return defHttp.delete({url: Api.deleteOne, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}
/**
 * 批量删除
 * @param params
 */
export const batchDelete = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({url: Api.deleteBatch, data: params}, {joinParamsToUrl: true}).then(() => {
        handleSuccess();
      });
    }
  });
}
/**
 * 保存或者更新
 * @param params
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({url: url, params});
}
/**
 * 子表列表接口
 * @param params
 */
export const trmsDockerNetworkSettingsList = (params) =>
  defHttp.get({url: Api.trmsDockerNetworkSettingsList, params},{isTransformResponse:false});
/**
 * 子表列表接口
 * @param params
 */
export const trmsDockerContainerPortsList = (params) =>
  defHttp.get({url: Api.trmsDockerContainerPortsList, params},{isTransformResponse:false});
