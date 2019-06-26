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
          <a-menu-item key="1-1" @click="choseWhich('/','productList','a1')" ><a-icon type="reconciliation" />商品</a-menu-item>
          <a-menu-item key="1-2" @click="choseWhich('/','test2','b1')" ><a-icon type="reconciliation" />test2</a-menu-item>
          <a-menu-item key="1-3" @click="choseWhich('/','test3','c1')" ><a-icon type="reconciliation" />test3</a-menu-item>
          <a-menu-item key="1-4" @click="choseWhich('/','test4','d1')" ><a-icon type="reconciliation" />test4</a-menu-item>

        </a-sub-menu>



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
        <div class="conRoom" :style="{ padding: '24px', background: '#fff', textAlign: 'left' }" >
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
                // router.push(url)
                var oldMenu= this.$store.state.tabArray
                oldMenu.push({ title: title, content:title,key: key})
                store.commit('changeStore',{key:'tabArray',val:oldMenu});
                store.commit('changeStore',{key:'activeKey',val:key});
                sessionStorage.setItem("crmMenuKey",key)
                console.log(this.$store.state.tabArray)
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
