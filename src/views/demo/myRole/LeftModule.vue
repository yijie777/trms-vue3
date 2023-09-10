<template>
  <div>

    <a-layout-header>
      <a-menu v-model:selectedKeys="current" mode="horizontal" theme="dark"
              @select="select"
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
    <a-layout-content style="padding: 0 50px">

      <a-button @click="createContainer" size="large">创建docker容器</a-button>
      <a-button @click="t1" size="large">一键启动HA</a-button>
      <a-button @click="t2" size="large">检测Master</a-button>
      <a-button @click="t3" size="large">重连</a-button>

      <div :style="{ background: '#fff', padding: '24px', minHeight: '900px' }"
      >
        <ServerInfo v-for='containerInfo in containerList'
                    :key='containerInfo.id'
                    :title="containerInfo.hostname">
          <template v-slot:main>
            <div>
              <a-button @click="startContainer(containerInfo)">启动</a-button>

              {{ containerInfo.portBindings }}
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
import {createHA, test1, test2, trmsStudentCourseList} from "@/views/demo/myRole/role.api";
import {useContainerStore} from '@/store/modules/containers'
import {ref} from "vue/dist/vue";

interface ContainerInfo {
  host: string ;
  hostname: string ;
  id: string ;
  password: string ;
  port: string ;
  status: string ;
  username: string
  portBindings: object
}

export default defineComponent({
  components: {
    ServerInfo,
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
    useContainerStore
  },
  data() {
    return {
      current: ['mail'],
      containerList: Array<ContainerInfo>(),
      sshInfo:  {
        host: "",
        password:"132456",
        username:"root",
        operate:"connect",
        port:"22",
      }
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
    createContainer() {
      createHA({
        id: this.stu_id,
        tag: "v3",
        network: "100net"
      })
    },

    t1() {
      this.sshInfo.operate = "START_HA"
      console.log(this.sshInfo)
      test1(this.sshInfo)
    },

    t2() {
      this.sshInfo.operate = "CHECK_HA_MASTER"
      test2(this.sshInfo)
    },

    t3() {

    },
    startContainer(containerInfo) {
      console.log(containerInfo)
      let useContainerStore1 = useContainerStore();
      useContainerStore1.setHost(containerInfo.host)
      useContainerStore1.setPassword(containerInfo.password)
      useContainerStore1.setUsername(containerInfo.username)
      useContainerStore1.setHostname(containerInfo.hostname)
      useContainerStore1.setPort(containerInfo.port)
      useContainerStore1.setStatus(containerInfo.status)
      this.$emit('initTerminal');
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
        this.sshInfo.host=this.containerList[0].host
        this.sshInfo.username=this.containerList[0].username
        this.sshInfo.password=this.containerList[0].password
        this.sshInfo.port=this.containerList[0].port
      }))
    }
  },

});
</script>

<style scoped>

</style>
