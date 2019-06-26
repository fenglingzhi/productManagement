import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import crm from './views/crm.vue'
import ceshi from './views/ceshi.vue'
import login from './views/login.vue'







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
                        //复购率查询
                        path: '/ceshi',
                        name: 'ceshi',
                        component: ceshi
                    }


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
