import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      // mjf
      baseURL:'http://192.168.0.18:8081/zorafanERP',
      title:'运营部',
      shopTableChange:{
          showName:'test',
          shopData:{}
      },
      tabArray:[
          {
        title: "首页",
        content:'index',
        key: "0",
        closable: false ,
        defaultActiveKey:true
    }
    ],
      activeKey:'0',
      menuKey:[],
      goods_id:'1',
      addProductContent:'productAddInformatica',
      addProductCurrent:'0',
      loading:false,
      langId:1,
      isEdit:true,
      oldData:{},
      // mjf
      // YanM
      attribute_child_id:'',
      attribute_parent_id:'',
      attribute_id:''



      // YanM



      // yxj
  },
  mutations: {
      // mjf
       changeStore(state,data){
            state[data.key] = data.val
       }
       ,shopTableChangeStore(state,data){
          state.shopTableChange[data.key] = data.val
      }
      // ym



      // yxj

  },
  actions: {

  }
})
