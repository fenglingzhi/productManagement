import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      title:'产品列表',
      shopTableChange:{
          showName:'test',
          shopData:{}
      },
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
