<template>
  <div class="p-2">
    <!--    <BasicTable @register="registerTable">-->
    <!--      <template #tableTitle>-->
    <!--        <a-button type="primary" preIcon="ant-design:plus" @click="onAdd">新增</a-button>-->
    <!--      </template>-->
    <!--      <template #action="{record}">-->
    <!--        <TableAction :actions="getTableActions(record)"></TableAction>-->
    <!--      </template>-->
    <!--    </BasicTable>-->
    <!--    <RoleModal @register="registerModal" @success="onSuccess"></RoleModal>-->

    <a-button @click="createContainer" size="large">创建docker容器</a-button>
    <Terminal :sshInfo="sshInfo"></Terminal>
  </div>
</template>

<script lang="ts">
import type {ActionItem} from '/@/components/Table';
import {BasicTable, TableAction} from '/@/components/Table';
import {useListPage} from '@/hooks/system/useListPage';
import {dockerCreate, list} from "@/views/demo/myRole/role.api";
import RoleModal from "@/views/demo/myRole/RoleModal.vue";
import {useModal} from "@/components/Modal";
import Terminal from "@/views/demo/myRole/Terminal.vue";
import {ref} from 'vue';

export default {
  name: 'MyRole',
  computed: {},
  components: {Terminal, BasicTable, RoleModal, TableAction},
  setup() {
    const sshInfo = ref({
      operate: 'connect',
      host: '101.35.193.165',
      port: 55555,
      username: 'root',
      password: '123456',
      userId: 1024
    })

    const {tableContext} = useListPage({
      tableProps: {
        api: list,
        columns: [
          {
            title: '角色名',
            dataIndex: 'roleName',
          },
          {
            title: '角色名',
            dataIndex: 'roleCode',
          },
        ]
      }
    })

    const [registerTable, {reload}] = tableContext
    const [registerModal, {openModal}] = useModal()

    function onAdd() {
      openModal(true, {a: 1})
    }

    function onEdit(record) {
      openModal(true, {isUpdate: true, record})
    }

    async function createContainer() {
      console.log(123)
      await dockerCreate(320)
    }

    function onSuccess() {
      reload()
    }

    function getTableActions(record): ActionItem[] {
      return [
        {
          label: '编辑',
          onClick: () => onEdit(record)
        }
      ]
    }

    return {
      registerTable,
      onAdd,
      registerModal,
      createContainer,
      onSuccess,
      getTableActions,
      sshInfo,
    }
  },

};
</script>

<style scoped></style>
