<template>
  <a-locale-provider :locale="zh_CN">

  <a-layout id="components-layout-demo-fixed-sider">
    <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
      <div class="logo" @click="logo()">
        <img src="../assets/logos.png" width="100" alt="">
      </div>
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="menuKey"  :selectedKeys="$store.state.menuKey"     :defaultOpenKeys="['1']" :style="{ textAlign: 'left' }">
        <a-menu-item key="0" @click="choseWhich('首页','index','0')"><a-icon type="home" /><span>首页</span></a-menu-item>
        <a-sub-menu key="1">
          <span slot="title"><a-icon type="snippets" /><span>商品管理</span></span>
          <a-menu-item key="1-1" @click="choseWhich('商品管理','productWrap','1-1')" ><a-icon type="reconciliation" />商品管理</a-menu-item>
          <a-menu-item key="1-3" @click="choseWhich('分类管理','classify_list','1-3')" ><a-icon type="reconciliation" />分类管理</a-menu-item>
          <a-menu-item key="1-4" @click="choseWhich('属性管理','attributeWrap','1-4')" ><a-icon type="reconciliation" />属性管理</a-menu-item>
          <a-menu-item key="1-5" @click="choseWhich('评论管理','reviewList','1-5')" ><a-icon type="reconciliation" />评论管理</a-menu-item>
          <a-menu-item key="1-6" @click="choseWhich('Banner设置','banner_set','1-6')" ><a-icon type="reconciliation" />Banner设置</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="2">
          <span slot="title"><a-icon type="snippets" /><span>客户管理</span></span>
          <a-menu-item key="2-1" @click="choseWhich('客户信息','productWrap','1-1')" ><a-icon type="reconciliation" />客户信息</a-menu-item>
          <a-menu-item key="2-3" @click="choseWhich('分类管理','classify_list','1-3')" ><a-icon type="reconciliation" />分类管理</a-menu-item>
          <a-menu-item key="2-4" @click="choseWhich('属性管理','attributeWrap','1-4')" ><a-icon type="reconciliation" />属性管理</a-menu-item>
          <a-menu-item key="2-5" @click="choseWhich('评论管理','reviewList','1-5')" ><a-icon type="reconciliation" />评论管理</a-menu-item>
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
            choseWhich(title,content,key){
                // router.push(url)
                var newKey = []
                newKey.push(key)
                store.commit('changeStore',{key:'menuKey',val:newKey});


                var oldMenu= this.$store.state.tabArray
                var isAddTab = true
                oldMenu.forEach((item, index) => {
                    if(item.key == key){
                        isAddTab=false
                    }
                })
                if(isAddTab){
                    oldMenu.push({ title: title, content:content,key: key})
                    store.commit('changeStore',{key:'tabArray',val:oldMenu});
                }
                store.commit('changeStore',{key:'activeKey',val:key});

                // sessionStorage.setItem("crmMenuKey",key)
            }
            ,logo(){
                window.location.href=('http://open-test.kapeixi.cn/#/');
            }
        },
        mounted() {
            $(".conRoom").css('min-height',$(window).height()-60)
           // this.menuKey.push(sessionStorage.getItem("crmMenuKey"))
        },
        watch: {
            "$store.state.activeKey"() {
                this.choseWhich(1,1,this.$store.state.activeKey)
                this.menuKey.splice(0,this.menuKey,length)
                // this.menuKey.push(this.$store.state.activeKey)
            },

        },
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
