import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from "jquery"
import 'ant-design-vue/dist/antd.css'
import './plugins/ant-design-vue.js'
import common from './common'
import axios from 'axios'
import echarts from 'echarts'
import {post,fetch,patch,put} from './http'

//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;

Vue.prototype.common=common
Vue.prototype.axios=axios
Vue.config.productionTip = false

new Vue({
  router,
  store,$,echarts,
  render: h => h(App)
}).$mount('#app')
