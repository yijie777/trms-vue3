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
    <a-button @click="t1" size="large">一键启动HA</a-button>
    <a-button @click="t2" size="large">检测Master</a-button>
    <a-button @click="t3" size="large">重连</a-button>
    <Page style="height: 1000px"></Page>

    <!--    <Terminal :sshInfo="sshInfo"></Terminal>-->


  </div>
</template>

<script lang="ts">
import type {ActionItem} from '/@/components/Table';
import {BasicTable, TableAction} from '/@/components/Table';
import {useListPage} from '@/hooks/system/useListPage';
import {dockerCreate, list, test1, test2} from "@/views/demo/myRole/role.api";
import RoleModal from "@/views/demo/myRole/RoleModal.vue";
import {useModal} from "@/components/Modal";
import Terminal from "@/views/demo/myRole/Terminal.vue";
import {ref} from 'vue';
import Page from "@/views/demo/myRole/Page.vue";

export default {
  name: 'MyRole',
  computed: {},
  components: {Page, Terminal, BasicTable, RoleModal, TableAction},
  setup() {
    // const sshInfo = ref({
    //   operate: 'connect',
    //   host: '101.35.193.165',
    //   port: 55555,
    //   username: 'root',
    //   password: '123456',
    //   userId: 1024
    // })
    let sshInfo = ref({
      operate: 'connect',
      host: '192.168.160.100',
      port: 11022,
      username: 'root',
      password: '123456',
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
      await dockerCreate(sshInfo.value)
    }

    async function t1() {
      sshInfo.value.operate = "START_HA"
      await test1(sshInfo.value)
    }

    function t2() {
      sshInfo.value.operate = "CHECK_HA_MASTER"
      test2(sshInfo.value)
    }

    function t3() {

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
      t1,
      t2,
      t3,
    }
  },

};
</script>

<style scoped></style>
