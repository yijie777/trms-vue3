<template>
  <div id="terminal" ref="terminal"></div>
</template>
<script>
import { Terminal } from "xterm"
import { FitAddon } from 'xterm-addon-fit'
import "xterm/css/xterm.css"
import {store} from '@/store/'
import Stomp from 'stompjs'
import {getToken} from "@/utils/auth";
import md5 from "crypto-js/md5";
import {unref} from "vue";
import {useUserStore} from "@/store/modules/user";
export default {
  data() {
    return {
      term: "", // 保存terminal实例
      rows: 40,
      cols: 100,
      stompClient: ''
    }
  },
  mounted() {
    this.initSocket()
  },
  methods: {
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

      let sockUrl = 'ws://localhost:8080/jeecg-boot/web-terminal'
      let socket = new WebSocket(sockUrl)
      // var url = window._CONFIG['domianURL'].replace("https://","ws://").replace("http://","ws://")+"/web-terminal"
      // var url = window._CONFIG['domianURL'].replace("https://","ws://").replace("http://","ws://")+"/websocket/e9ca23d68d884d4ebb19d07889727dae_597a1e98c4c81120b00a9633b05d5043"
      // let socket = new WebSocket(url);
      // let token = getToken();
      //将登录token生成一个短的标识
      // let wsClientId = md5(token);
      // const userStore = useUserStore();
      // let userId = unref(userStore.getUserInfo).id + "_" + wsClientId;
      // console.log(userId)
// 监听连接事件
//       socket.addEventListener('open', function(event) {
//         console.log("Connected to server");
//       });

// 监听消息事件
//       socket.addEventListener('message', function(event) {
//         console.log('Message from server ', event);
//       });

      // 获取STOMP子协议的客户端对象
      _this.stompClient = Stomp.over(socket)

      // 向服务器发起websocket连接
      this.stompClient.connect({}, (res) => {
        _this.initXterm()
        console.log("start subscribe")
        _this.stompClient.subscribe('/topic/1024', (frame) => {
          _this.writeShell(frame.body)
        })
        console.log("start sentFirst")
        _this.sentFirst()
        console.log("end sentFirst")
      }, (err) => {
        console.log('失败：' + err)
      })
      _this.stompClient.debug = null


    },
    sendShell (data) {
      let _bar = {
        operate:'command',
        command: data,
        userId: 1024
      }
      this.stompClient.send('/msg', {}, JSON.stringify(_bar))
    },
    writeShell(data) {
      this.term.write(data)
    },
    // 连接建立，首次发送消息连接 ssh
    sentFirst () {
      let _bar = {
        operate:'connect',
        host: '192.168.160.100',
        port: 11022,
        username: 'root',
        password: '123456',
        userId: 1024
      }
      this.stompClient.send('/msg', {}, JSON.stringify(_bar))
    }
  }
}
</script>
