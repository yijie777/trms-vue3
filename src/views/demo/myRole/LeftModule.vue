<template>
  <div style="margin: 0px;padding: 0px">
    <a-layout-header style="margin: 0px;padding: 0px">
      <a-menu v-model:selectedKeys="current" mode="horizontal" theme="light"
              @select="select" style="height: 50px;width: 100%;"
      >

        <a-menu-item key="DocOP">
          <template #icon>
            <mail-outlined/>
          </template>
          文档操作
        </a-menu-item>
        <a-menu-item key="FastOrder">
          <template #icon>
            <appstore-outlined/>
          </template>
          快捷指令
        </a-menu-item>

        <a-menu-item key="ServerInfo">
          <template #icon>
            <appstore-outlined/>
          </template>
          服务器信息
        </a-menu-item>
        <a-menu-item key="Submit">
          <template #icon>
            <appstore-outlined/>
          </template>
          在线提交
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 3px;">
      <div :style="{ background: '#fff', minHeight: '900px' }"
      >
        <ServerInfo v-for='containerInfo in containerList'
                    :key='containerInfo.id'
                    :title="containerInfo.hostname">
          <template v-slot:main>
            <div>
              <a-button @click="startContainer(containerInfo)">启动</a-button>

             {{containerInfo.portBindings}}
            </div>
          </template>
        </ServerInfo>
      </div>
    </a-layout-content>
  </div>


</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {MailOutlined, AppstoreOutlined, SettingOutlined} from '@ant-design/icons-vue';
import ServerInfo from "@/views/demo/myRole/ServerInfo.vue";
import {trmsStudentCourseList} from "@/views/demo/myRole/role.api";


interface ContainerInfo {
  host: string | undefined;
  hostname: string | undefined;
  id: string | undefined;
  password: string | undefined;
  port: string | undefined;
  status: string | undefined;
  username: string | undefined
  portBindings: object
}


export default defineComponent({
  components: {
    ServerInfo,
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
  },
  data() {
    return {
      current: ['mail'],
      containerList: Array<ContainerInfo>()
    }
  },
  props: {
    course_id: {
      type: String,
    },
    stu_id: {
      type: String,
    },

  },
  mounted() {
    this.init()
  },
  methods: {
    startContainer(containerInfo){

    },
    select(e) {
      console.log(e)
    },
    init() {
      trmsStudentCourseList({course_id: this.course_id, studentId: this.stu_id}).then((res => {
        for (const recordsKey in res.records[0].docker) {
          // console.log(res.records[0].docker[recordsKey])
          let portBind = {}
          let public_22 = "22"
          let portBinds = res.records[0].docker[recordsKey].HostConfig.PortBindings
          for (var key in portBinds) {
            let port = key.replaceAll("/tcp", "")
            portBind[port] = portBinds[key][0]['HostPort']
            if (port === '22') {
              public_22 = portBinds[key][0]['HostPort']
            }

          }

          this.containerList.push({
            host: '192.168.160.100',
            username: 'root',
            password: '123456',
            id: this.stu_id,
            port: public_22,
            hostname: res.records[0].docker[recordsKey].Config.Hostname,
            status: res.records[0].docker[recordsKey].State.Status,
            portBindings: portBind
          })
        }
        console.log(this.containerList)
      }))
    }
  },

});
</script>

<style scoped>

</style>
