<template>
  <div class="p-2">123
    <BasicTable @register="registerTable"></BasicTable>
  </div>
  <a-button @click="dockerCreate">创建docker容器</a-button>
</template>

<script lang="ts">
import {BasicTable} from '/@/components/Table';
import {useListPage} from '@/hooks/system/useListPage';
import {dockerCreate, list} from "@/views/demo/myRole/role.api";

export default {
  name: 'MyRole',
  computed: {
    dockerCreate() {
      return dockerCreate
    }
  },
  components: {BasicTable},
  setup() {
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
    console.log(list)
    const [registerTable, {}] = tableContext
    function createContainer() {
    }

    return {
      registerTable,
      createContainer,
    }
  },

};
</script>

<style scoped></style>
