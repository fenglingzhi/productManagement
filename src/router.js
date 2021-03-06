import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import crm from './views/crm.vue'
import login from './views/login.vue'
import productList from './views/product/productList.vue'
import productAdd from './views/product/productAdd'
import currencyList from './views/localization/currencyList'
import areaList from './views/localization/areaList'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
            {
                //复购率查询
                path: '/',
                name: 'crm',
                component: crm,
                children: [
                    {
                        //商品列表
                        path: '/productList',
                        name: 'productList',
                        component: productList
                    },
                    {
                        //商品添加

                        path: '/productAdd',
                        name: 'productAdd',
                        component: productAdd
                    },
                    {
                        //货币
                        path: '/currencyList',
                        name: 'currencyList',
                        component: currencyList
                    },{
                        //区域
                        path: '/areaList',
                        name: 'areaList',
                        component: areaList
                    },
                ]
            }


      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    }
  ]
})
