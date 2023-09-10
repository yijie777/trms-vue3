import {defineStore} from 'pinia';
import {store} from '/@/store';



interface ContainerInfo {
  host: String;
  hostname: String;
  id: String;
  password: String;
  port: String;
  status: String;
  username: String
  portBindings: Object,
  lan:String
}

export const useContainerStore = defineStore({
  id: 'container',
  state: (): ContainerInfo => ({
    host: "",
    hostname: "",
    id: "",
    password: "",
    port: "",
    status: "",
    username: "",
    portBindings: {},
    lan:""
  }),

  getters: {
    getHost(): String {
      return this.host;
    },
    getHostname(): String {
      return this.hostname;
    },
    getId(): String {
      return this.id;
    },
    getPassword(): String {
      return this.password;
    },
    getPort(): String {
      return this.port;
    },
    getStatus(): String {
      return this.status;
    },
    getUsername(): String {
      return this.username;
    },
    getPortBindings(): Object {
      return this.portBindings;
    },
    getLan(): Object {
      return this.lan;
    },
  },
  actions: {

    setHost(params: String): void {
      this.host = params;
    },
    setHostname(params: String): void {
      this.hostname = params;
    },
    setId(params: String): void {
      this.id = params;
    },
    setPassword(params: String): void {
      this.password = params;
    },
    setPort(params: String): void {
      this.port = params;
    },
    setStatus(params: String): void {
      this.status = params;
    },
    setUsername(params: String): void {
      this.username = params;
    },
    setPortBindings(params: String): void {
      this.portBindings = params;
    },
    setLan(params: String): void {
      this.lan = params;
    },
  },

});

export function useContainerWithOut() {
  return useContainerStore(store);
}
