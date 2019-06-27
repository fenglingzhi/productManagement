import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      title:'张三（运营部）',
      shopTableChange:{
          showName:'test',
          shopData:{}
      },
      tabArray:[
          { title: "销售概况", content:'productList',key: "home",closable: false ,defaultActiveKey:true}
          ],

      activeKey:'home',
      menuKey:[],
      goods_id:'',
      addProductContent:'productAddInformatica',
      addProductCurrent:'0',
      loading:false
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
