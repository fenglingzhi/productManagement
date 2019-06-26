import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      title:'ADMIN',
      shopTableChange:{
          showName:'test',
          shopData:{}
      },
      tabArray:[
          // { title: "home", content:'test1',key: "home",closable: false ,defaultActiveKey:true}
          ],

      activeKey:'home',
      basicUrl:'http://erp-test.kapeixi.cn'

  },
  mutations: {
       changeStore(state,data){
            state[data.key] = data.val
       }
       ,shopTableChangeStore(state,data){
          state.shopTableChange[data.key] = data.val
      }
  },
  actions: {

  }
})
