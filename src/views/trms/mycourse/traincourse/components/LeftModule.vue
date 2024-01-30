<template>
  <div>

    <a-menu v-model:selectedKeys="current" mode="horizontal"
            @select="select"
            style="padding-left: 30px"
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
    <ScrollContainer class="mt-4 doc-op" v-if="key==='DocOP'">
      <template v-for="index in 1" :key="index">
        <vue-office-docx class="scroll" v-if="this.docx!=''" :src="docx" @rendered="rendered"/>
        <vue-office-pdf class="scroll" v-if="this.pdf!=''" :src="pdf" @rendered="rendered"/>
      </template>
    </ScrollContainer>

    <a-layout-content class="a-layout-content">



      <div v-if="key==='FastOrder'" class="order-op">

        <a-alert message="文件下载"/>
        <a-button type="primary" class="my-4 mr-2" size="large" @click="handleDownByResource"> 资源下载
        </a-button>
        <a-button type="primary" class="my-4  mr-2 marginRight10" size="large"
                  @click="handleDownByDocument"> 文档下载
        </a-button>
        <a-alert message="SSH相关操作"/>

        <a-button @click="createContainer" class="my-4 mr-2" size="large" type="primary" disabled>
          创建HA
        </a-button>
        <a-button @click="oneClickDeployment" class="my-4 mr-2" size="large" type="primary">一键启动HA
        </a-button>
        <a-button @click="automaticCorrection" class="my-4 mr-2" size="large" type="primary">
          检验组件是否启动
        </a-button>
        <a-button @click="reconnect" class="my-4 mr-2" size="large" type="primary">重连</a-button>
      </div>
      <div class="mt-4 " >
        <ScrollContainer v-if="key==='ServerInfo'" >
          <template v-for="index in 1" :key="index">
            <ServerInfo v-for='containerInfo in containerList'
                        :key='containerInfo.id'
                        :width="500"
                        :title="containerInfo.hostname+'   '+containerInfo.lan"
                        class="server-info-title"> <!-- 添加类到ServerInfo组件 -->

              <template v-slot:title>
                <a-tag color="green">running</a-tag>
                <a-button @click="startContainer(containerInfo)" class="a-button">连接</a-button>
                <a-button @click="startContainer(containerInfo)" class="a-button">重置</a-button>
                <a-button @click="startContainer(containerInfo)" class="a-button">重启</a-button>
              </template>

              <template v-slot:main>
                <ScrollContainer class="my-scroll-container">
                  <ul class="p-3">
                    <template v-for="key in Object.keys(containerInfo.portBindings)" :key="key">
                      <li class="p-2 li-port-bindings"> <!-- 添加类到列表项 -->
                        内部端口：{{ key }} / 外部端口：{{ containerInfo.portBindings[key] }}
                      </li>
                    </template>
                  </ul>
                </ScrollContainer>
              </template>
            </ServerInfo>

          </template>
        </ScrollContainer>
      </div>


      <div v-if="key==='Submit'" class="submit-op">
        <JCodeEditor v-model:value="value" language="java" height="300px"></JCodeEditor>
        <JUpload ref="uploadRef" v-model:value="uploadModalValue"/>
        <a-button @click="submit" class="my-4 mr-2" size="large" type="primary">提交</a-button>

      </div>


    </a-layout-content>
  </div>


</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {MailOutlined, AppstoreOutlined, FullscreenExitOutlined} from '@ant-design/icons-vue';
import ServerInfo from "@/views/trms/mycourse/traincourse/components/ServerInfo.vue";
import {
  createHA,
  oneClickDeployment,
  automaticCorrection,
} from "@/views/demo/myRole/role.api";
import {useContainerStore} from '@/store/modules/containers'
import Icon from "@/components/Icon";
import {ScrollContainer} from "@/components/Container";
import VueOfficeDocx from '@vue-office/docx'
import VueOfficePdf from '@vue-office/pdf'
import {getFileAccessHttpUrl} from "@/utils/common/compUtils";
import {downloadByUrl} from "@/utils/file/download";
import {BasicUpload} from "@/components/Upload";
import JUpload from "@/components/Form/src/jeecg/components/JUpload/JUpload.vue";
import {JUploadModal} from "@/components/Form/src/jeecg/components/JUpload";
import JCodeEditor from "@/components/Form/src/jeecg/components/JCodeEditor.vue";

interface ContainerInfo {
  host: string;
  hostname: string;
  id: string;
  password: string;
  port: string;
  status: string;
  username: string;
  portBindings: object;
  lan: string
}

export default defineComponent({
  components: {
    JCodeEditor,
    JUploadModal,
    JUpload,
    BasicUpload,
    ScrollContainer,
    FullscreenExitOutlined,
    Icon,
    ServerInfo,
    MailOutlined,
    AppstoreOutlined,
    useContainerStore,
    VueOfficeDocx,
    VueOfficePdf
  },
  created() {

  },
  data() {
    return {
      value: "",
      uploadModalValue: "",
      current: ['ServerInfo'],
      containerList: Array<ContainerInfo>(),
      sshInfo: {
        host: "",
        password: "123456",
        username: "root",
        operate: "connect",
        port: "",
      },
      key: "ServerInfo",
      docx: '',
      pdf: '',
      fileList: []
    }
  },
  props: {
    sc: {},
  },
  mounted() {
    this.init()
    console.log(this.containerList)
    if (this.sc.course.documentUrl.includes('docx')) {
      this.docx = getFileAccessHttpUrl(this.sc.course.documentUrl)
    } else if (this.sc.course.documentUrl.includes('pdf')) {
      this.pdf = getFileAccessHttpUrl(this.sc.course.documentUrl)
    }
  },
  methods: {
    submit() {
      console.log(this.value)
      console.log(this.uploadModalValue)
    },
    handleDownByResource() {
      downloadByUrl({
        url: getFileAccessHttpUrl(this.sc.course.resourceUrl),
        target: '_self',
      });
    },
    handleDownByDocument() {
      downloadByUrl({
        url: getFileAccessHttpUrl(this.sc.course.documentUrl),
        target: '_self',
      });
    },
    rendered() {
      console.log("渲染完成")
    },
    createContainer() {
      createHA({
        id: this.sc.studentId,
        tag: "v3",
        network: "100net"
      })
    },

    oneClickDeployment() {
      this.sshInfo.operate = "START_HA"
      oneClickDeployment(this.sshInfo)
    },

    automaticCorrection() {
      this.sshInfo.operate = "CHECK_HA_MASTER"
      automaticCorrection(this.sshInfo)
    },

    reconnect() {
      this.$emit('initTerminal');
    },
    startContainer(containerInfo) {
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
      this.key = e.key
    },
    init() {
      console.log(this.sc.id)
      for (const recordsKey in this.sc.docker) {

        let portBind = {}
        let public_22 = "22"
        let portBinds = this.sc.docker[recordsKey].HostConfig.PortBindings
        for (var key in portBinds) {
          let port = key.replaceAll("/tcp", "")
          portBind[port] = portBinds[key][0]['HostPort']
          if (port === '22') {
            public_22 = portBinds[key][0]['HostPort']
          }
        }

        this.containerList.push({
          host: '192.168.160.100',
          // host: '101.35.193.165',
          username: 'root',
          password: '123456',
          id: this.sc.studentId,
          port: public_22,
          hostname: this.sc.docker[recordsKey].Config.Hostname,
          status: this.sc.docker[recordsKey].State.Status,
          portBindings: portBind,
          lan: this.sc.docker[recordsKey].NetworkSettings.Networks[this.sc.docker[recordsKey].HostConfig.NetworkMode].IPAddress
        })
      }
      this.sshInfo.host = this.containerList[0].host
      this.sshInfo.username = this.containerList[0].username
      this.sshInfo.password = this.containerList[0].password
      this.sshInfo.port = this.containerList[0].port

    }
  },

});
</script>

<style scoped>
.a-layout-content {
  padding: 0 50px;
}

.my-scroll-container {
  padding: 24px;
  height: 200px;
}

.doc-op {
  padding: 24px;
  height: 800px;
}

.order-op {
  padding: 24px;
  min-height: 800px;
  background-color: #fff;
  margin-top: 16px;
}

.submit-op {
  padding: 24px;
  min-height: 800px;
  background-color: #fff;
}

/* ServerInfo 标题样式 */
.server-info-title {
  background-image: url(/src/assets/trms/bk.png);
  color: #111111;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold; /* 加粗文字 */
}

/* 按钮样式 */
.a-button {
  background-color: #59b3e3; /* 深蓝色背景 */
  color: white; /* 白色文字 */
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  font-weight: bold; /* 加粗文字 */
  margin-right: 5px;
}

/* 列表项样式 */
.li-port-bindings {
  border: 1px solid #007bff; /* 蓝色边框 */
  color: #333; /* 暗色文字，以增加可读性 */
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 3px;
  font-size: 0.9em; /* 略微减小字号 */
}


</style>
