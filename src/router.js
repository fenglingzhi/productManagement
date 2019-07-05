import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import crm from './views/crm.vue'
import login from './views/login.vue'
import productList from './views/product/productList.vue'
import attributeList from './views/attribute/attributeList'
import productAttribute from './views/attribute/productAttribute'
import addAttribute from './views/attribute/addAttribute'
import editAttribute from './views/attribute/editAttribute'
import productAdd from './views/product/productAdd'


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
                        //商品列表
                        path: '/productAdd',
                        name: 'productAdd',
                        component: productAdd
                    },
                    {
                        //属性父级列表
                        path: '/productAttribute',
                        name: 'productAttribute',
                        component: productAttribute,
                    },
                    {
                        //属性子级列表
                        path: '/attributeList',
                        name: 'attributeList',
                        component: attributeList
                    },
                    {
                        //增加属性
                        path: '/addAttribute',
                        name: 'addAttribute',
                        component: addAttribute
                    },
                    {
                        //修改属性
                        path: '/editAttribute',
                        name: 'editAttribute',
                        component: editAttribute
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
