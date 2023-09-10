<template>
  <div>
    <div id="terminal" ref="terminal" v-if="restart"></div>
    <div id="terminal" ref="terminal" v-if="!restart"></div>
  </div>

</template>
<script>
import { Terminal } from "xterm"
import { FitAddon } from 'xterm-addon-fit'
import "xterm/css/xterm.css"
import Stomp from 'stompjs'
import {getUserData} from "@/views/system/usersetting/UserSetting.api";
import {useContainerStore} from '@/store/modules/containers'

export default {
  data() {
    return {
      term: "", // 保存terminal实例
      rows: 50,
      cols: 50,
      stompClient: '',
      sshInfo: {},
      restart:true
    }
  },
  components:{
    useContainerStore
  },
  mounted() {
    getUserData().then((  res => {
      if (res.success) {
        if (res.result) {
          this.sshInfo.userId=res.result.id
          // this.update()
          // this.initSocket()
        }
      }
    }))
  },
  methods: {
    init(){
      this.update()
      this.restart=!this.restart
      if(this.stompClient)this.stompClient.disconnect()
      this.initSocket();

    },
    update() {
      let useContainerStore1 = useContainerStore();
      this.sshInfo.port = useContainerStore1.getPort
      this.sshInfo.username= useContainerStore1.getUsername
      this.sshInfo.host= useContainerStore1.getHost
      this.sshInfo.password= useContainerStore1.getPassword
      console.log(this.sshInfo)
    },
    initXterm() {
      let _this = this
      let term = new Terminal({
        rendererType: "canvas", //渲染类型
        rows: _this.rows, //行数
        cols: _this.cols, // 不指定行数，自动回车后光标从下一行开始
        convertEol: true, //启用时，光标将设置为下一行的开头
        // scrollback: 50, //终端中的回滚量
        disableStdin: false, //是否应禁用输入
        // cursorStyle: "underline", //光标样式
        cursorBlink: true, //光标闪烁
        theme: {
          foreground: "#ECECEC", //字体
          background: "#000000", //背景色
          cursor: "help", //设置光标
          lineHeight: 20
        }
      })
      // 创建terminal实例
      term.open(this.$refs["terminal"])
      // 换行并输入起始符 $
      term.prompt = _ => {
        term.write("\r\n\x1b[33m$\x1b[0m ")
      }
      // term.prompt()
      // canvas背景全屏
      const fitAddon = new FitAddon()
      term.loadAddon(fitAddon)
      fitAddon.fit()

      window.addEventListener("resize", resizeScreen)
      function resizeScreen() {
        try {
          fitAddon.fit()
        } catch (e) {
          console.log("e", e.message)
        }
      }
      _this.term = term
      _this.runFakeTerminal()
    },
    runFakeTerminal() {
      let term = this.term
      if (term._initialized) return
      // 初始化
      term._initialized = true
      term.writeln("Welcome to \x1b[1;32m docker container\x1b[0m.")
      term.writeln('This is Web Terminal of Modb; Good Good Study, Day Day Up.')
      // term.prompt()
      // term.prompt = () => {
      //   term.write("\r\n$ ");
      // };
      term.onData(key => {  // 输入与粘贴的情况
        this.sendShell(key)
      })
    },
    initSocket() {
      let _this = this
      // 建立连接对象
      let sockUrl = window._CONFIG['domianURL'].replace("https://","ws://").replace("http://","ws://")+"/web-terminal?"+this.sshInfo.userId
      // let sockUrl = 'ws://localhost:8080/jeecg-boot/web-terminal?1024'
      let socket = new WebSocket(sockUrl)
      // var url = window._CONFIG['domianURL'].replace("https://","ws://").replace("http://","ws://")+"/websocket/e9ca23d68d884d4ebb19d07889727dae_597a1e98c4c81120b00a9633b05d5043"


      // 获取STOMP子协议的客户端对象
      _this.stompClient = Stomp.over(socket)

      // 向服务器发起websocket连接
      this.stompClient.connect({}, (res) => {
        _this.initXterm()
        _this.stompClient.subscribe('/topic/'+this.sshInfo.userId, (frame) => {
          _this.writeShell(frame.body)
        })
        _this.sentFirst()
      }, (err) => {
        console.log('失败：' + err)
      })
      _this.stompClient.debug = null


    },
    sendShell (data) {
      let _bar = {
        operate:'command',
        command: data,
        userId: this.sshInfo.userId
      }
      this.stompClient.send('/msg', {}, JSON.stringify(_bar))
    },
    writeShell(data) {
      this.term.write(data)
    },
    // 连接建立，首次发送消息连接 ssh
    sentFirst () {
      this.sshInfo.operate="connect"
      let _bar = this.sshInfo
      this.stompClient.send('/msg', {}, JSON.stringify(_bar))
    },

  }
}
</script>
