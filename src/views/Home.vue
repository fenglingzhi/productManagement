<template>
  <a-locale-provider :locale="zh_CN">

  <a-layout id="components-layout-demo-fixed-sider">
    <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
      <div class="logo" @click="logo()">
        <img src="../assets/logos.png" width="100" alt="">
      </div>
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="menuKey"      :defaultOpenKeys="['1']" :style="{ textAlign: 'left' }">
        <a-sub-menu
                key="1"
        >
          <span slot="title"><a-icon type="snippets" /><span>报表管理</span></span>
          <a-menu-item key="1-1" @click="choseWhich('/','复购率查询','1-1')" ><a-icon type="reconciliation" />复购率查询</a-menu-item>
        </a-sub-menu>
        <!--<a-sub-menu-->
                <!--key="2"-->
        <!--&gt;-->
          <!--<span slot="title"><a-icon type="rocket" /><span>产品管理</span></span>-->
          <!--<a-menu-item key="2-1" @click="choseWhich('/productList','产品列表','2-1')" ><a-icon type="calendar" />产品列表</a-menu-item>-->
          <!--<a-menu-item key="2-2" @click="choseWhich('/tableHead','尺码表头设置','2-2')" ><a-icon type="file-add" />尺码表头设置</a-menu-item>-->

        <!--</a-sub-menu>-->
          <!--<a-sub-menu-->
                  <!--key="3"-->
          <!--&gt;-->
              <!--<span slot="title"><a-icon type="rocket" /><span>邮件管理</span></span>-->
              <!--<a-menu-item key="3-1" @click="choseWhich('/emailList','产品列表','3-1')" ><a-icon type="calendar" />邮件模板列表</a-menu-item>-->

          <!--</a-sub-menu>-->


      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px' }">
      <a-row style="    padding: 22px 16px 0px 16px;">
        <a-col :span="12">
          <div class="modelName">{{$store.state.title}}</div>
        </a-col>
        <a-col :span="12">
          <div class="loginOut">
            <loginOut></loginOut>
          </div>
        </a-col>
      </a-row>

      <!--<div class="modelName">{{$store.state.title}}</div>-->
      <!--<a-layout-header :style="{ background: '#fff', padding: 0 }" />-->
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div class="conRoom" :style="{ padding: '24px', background: '#fff', textAlign: 'center' }" >
          <router-view/>
        </div>

      </a-layout-content>
      <!--<a-layout-footer :style="{ textAlign: 'center' }">-->
       <!--CUPSHE ERP ©2019 Created by Technology Department-->

      <!--</a-layout-footer>-->
    </a-layout>
  </a-layout>


  </a-locale-provider>

</template>

<script>
    import $ from 'jquery'
    import router from '../router';
    import store from '../store'
    import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
    import moment from 'moment';
    import loginOut from '../components/loginOut'
    import 'moment/locale/zh-cn';
    moment.locale('zh-cn');

    export default {
        name: "",
        components: {
            loginOut
        },
        data() {
            return {
                zh_CN,
                menuKey:[]
            }
        },
        methods: {
            choseWhich(url,title,key){
                router.push(url)
                sessionStorage.setItem("crmMenuKey",key)
                store.commit('changeStore',{key:'title',val:title});
            }
            ,logo(){
                window.location.href=('http://open-test.kapeixi.cn/#/');
            }
        },
        mounted() {
            $(".conRoom").css('min-height',$(window).height()-60)
           this.menuKey.push(sessionStorage.getItem("crmMenuKey"))
        }
    }
</script>
<style scoped>
    #components-layout-demo-fixed-sider .logo {
        height: 32px;
        background: rgb(255, 255, 255);
        margin: 16px;
    }
    .modelName{
      font-size: 22px;
      width: 100%;
      text-align: left;
    }
    .loginOut{
      float: right;
    }
</style>
