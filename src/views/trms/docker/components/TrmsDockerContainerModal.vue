<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="800" @ok="handleSubmit">
      <BasicForm @register="registerForm" ref="formRef"/>
  <!-- 子表单区域 -->
    <a-tabs v-model:activeKey="activeKey" animated @change="handleChangeTabs">
      <a-tab-pane tab="网络信息" key="trmsDockerNetworkSettings" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="trmsDockerNetworkSettings"
          :loading="trmsDockerNetworkSettingsTable.loading"
          :columns="trmsDockerNetworkSettingsTable.columns"
          :dataSource="trmsDockerNetworkSettingsTable.dataSource"
          :height="340"
          :disabled="formDisabled"
          :rowNumber="true"
          :rowSelection="true"
          :toolbar="true"
          />
      </a-tab-pane>
      <a-tab-pane tab="端口映射" key="trmsDockerContainerPorts" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="trmsDockerContainerPorts"
          :loading="trmsDockerContainerPortsTable.loading"
          :columns="trmsDockerContainerPortsTable.columns"
          :dataSource="trmsDockerContainerPortsTable.dataSource"
          :height="340"
          :disabled="formDisabled"
          :rowNumber="true"
          :rowSelection="true"
          :toolbar="true"
          />
      </a-tab-pane>
    </a-tabs>
  </BasicModal>
</template>

<script lang="ts" setup>
    import {ref, computed, unref,reactive} from 'vue';
    import {BasicModal, useModalInner} from '/@/components/Modal';
    import {BasicForm, useForm} from '/@/components/Form/index';
    import { JVxeTable } from '/@/components/jeecg/JVxeTable'
    import { useJvxeMethod } from '/@/hooks/system/useJvxeMethods.ts'
    import {formSchema,trmsDockerNetworkSettingsJVxeColumns,trmsDockerContainerPortsJVxeColumns} from '../TrmsDockerContainer.data';
    import {saveOrUpdate,queryTrmsDockerNetworkSettings,queryTrmsDockerContainerPorts} from '../TrmsDockerContainer.api';
    import { VALIDATE_FAILED } from '/@/utils/common/vxeUtils'
    // Emits声明
    const emit = defineEmits(['register','success']);
    const isUpdate = ref(true);
    const formDisabled = ref(false);
    const refKeys = ref(['trmsDockerNetworkSettings', 'trmsDockerContainerPorts', ]);
    const activeKey = ref('trmsDockerNetworkSettings');
    const trmsDockerNetworkSettings = ref();
    const trmsDockerContainerPorts = ref();
    const tableRefs = {trmsDockerNetworkSettings, trmsDockerContainerPorts, };
    const trmsDockerNetworkSettingsTable = reactive({
          loading: false,
          dataSource: [],
          columns:trmsDockerNetworkSettingsJVxeColumns
    })
    const trmsDockerContainerPortsTable = reactive({
          loading: false,
          dataSource: [],
          columns:trmsDockerContainerPortsJVxeColumns
    })
    //表单配置
    const [registerForm, {setProps,resetFields, setFieldsValue, validate}] = useForm({
        //labelWidth: 150,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: {span: 24}
    });
     //表单赋值
    const [registerModal, {setModalProps, closeModal}] = useModalInner(async (data) => {
        //重置表单
        await reset();
        setModalProps({confirmLoading: false,showCancelBtn:data?.showFooter,showOkBtn:data?.showFooter});
        isUpdate.value = !!data?.isUpdate;
        formDisabled.value = !data?.showFooter;
        if (unref(isUpdate)) {
            //表单赋值
            await setFieldsValue({
                ...data.record,
            });
             requestSubTableData(queryTrmsDockerNetworkSettings, {id:data?.record?.id}, trmsDockerNetworkSettingsTable)
             requestSubTableData(queryTrmsDockerContainerPorts, {id:data?.record?.id}, trmsDockerContainerPortsTable)
        }
        // 隐藏底部时禁用整个表单
       setProps({ disabled: !data?.showFooter })
    });
    //方法配置
    const [handleChangeTabs,handleSubmit,requestSubTableData,formRef] = useJvxeMethod(requestAddOrEdit,classifyIntoFormData,tableRefs,activeKey,refKeys);

    //设置标题
    const title = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

    async function reset(){
      await resetFields();
      activeKey.value = 'trmsDockerNetworkSettings';
      trmsDockerNetworkSettingsTable.dataSource = [];
      trmsDockerContainerPortsTable.dataSource = [];
    }
    function classifyIntoFormData(allValues) {
         let main = Object.assign({}, allValues.formValue)
         return {
           ...main, // 展开
           trmsDockerNetworkSettingsList: allValues.tablesValue[0].tableData,
           trmsDockerContainerPortsList: allValues.tablesValue[1].tableData,
         }
       }
    //表单提交事件
    async function requestAddOrEdit(values) {
        try {
            setModalProps({confirmLoading: true});
            //提交表单
            await saveOrUpdate(values, isUpdate.value);
            //关闭弹窗
            closeModal();
            //刷新列表
            emit('success');
        } finally {
            setModalProps({confirmLoading: false});
        }
    }
</script>

<style lang="less" scoped>
	/** 时间和数字输入框样式 */
    :deep(.ant-input-number){
		width: 100%
	}

	:deep(.ant-calendar-picker){
		width: 100%
	}
</style>