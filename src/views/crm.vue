<template>
  <div class="crm">
      <template>
          <a-spin :spinning="$store.state.loading">
              <div class="spin-content">
                  <div>
                      <a-tabs
                              hideAdd
                              v-model="$store.state.activeKey"
                              type="editable-card"
                              @edit="onEdit"
                              @tabClick="changeTab"


                      >
                          <a-tab-pane v-for="pane in panes" :tab="pane.title"   :key="pane.key" :closable="pane.closable">
                              <componet :is="pane.content"></componet>
                          </a-tab-pane>
                      </a-tabs>
                  </div>
              </div>
          </a-spin>
      </template>
  </div>
</template>
<script>
    var vm = this
    import router from '../router';
    import store from '../store'
    import $ from 'jquery'
    import productList from './product/productList'
    import productAdd from './product/productAdd.vue'
    import classify_list from './classify/classify_list'
    import attributeWrap from './attribute/attributeWrap'
    import index from './index'
    import productWrap from './product/productWrap'
    import reviewList from './review/reviewList'
    import banner_set from './banner_set/banner_set'
    import customerList from './customer/customerList'
    import customerGender from './customer/customerGender'
    import customerCart from './customer/customerCart'
    import customerAddress from './customer/customerAddress'
    import currencyList from './localization/currencyList'
    import areaList from './localization/areaList'
    import countryList from './localization/countryList'
    import stateList from './localization/stateList'
    import langList from './localization/langList'
    import cityList from './localization/cityList'
    import taxList from './localization/taxList'

    import logisticList from './logistics/logisticList'
    import productIntroduction from './goods/productIntroduction'
    import codList from './cart/codList'
    import setBannerIndex from './appSet/setBannerIndex'
    import hotWords from './appSet/hotWords'
    import classify from './appSet/classify'
    import setBannerNotice from './appSet/setBannerNotice'
    import waterFall from './appSet/waterFall'
    import countDown from './appSet/countDown'
    import orderList from './order/orderList'
    import orderStatus from './order/orderStatus'
    import cartRules from './cart/cartRules'
    import productAttribute from './attribute/productAttribute'
    import employee from './administration/employee'
    import role from './administration/role'


    export default {

        components:{
            productList,
            productAdd,
            classify_list,
            attributeWrap,
            index,
            productWrap,
            reviewList,
            customerList,
            customerGender,
            customerCart,
            customerAddress,
            banner_set,
            currencyList,
            areaList,
            countryList,
            stateList,
            langList,
            cityList,
            logisticList,
            productIntroduction,
            codList,
            setBannerIndex,
            hotWords,
            classify,
            setBannerNotice,
            waterFall,
            countDown,
            role,
            employee,
            orderList,
            orderStatus,
            cartRules,
            productAttribute,
            taxList
        },
        data () {
            return {
                activeKey: this.$store.state.activeKey,
                panes:this.$store.state.tabArray,
            }
        },
        mounted() {

        },
        methods: {
            callback (key) {

            },
            changeTab(key){
                this.$store.state.tabArray.forEach(function(val, index) {
                    if(val.key==key){
                        store.commit('changeStore',{key:'title',val:val.title});

                    }
                });
            },
            onEdit (targetKey, action) {

                this[action](targetKey)
            },
            remove (targetKey) {
                let activeKey = this.$store.state.activeKey
                let lastIndex
                this.$store.state.tabArray.forEach((pane, i) => {
                    if (pane.key === targetKey) {
                        lastIndex = i - 1
                    }
                })
                const panes = this.$store.state.tabArray.filter(pane => pane.key !== targetKey)
                if (lastIndex >= 0 && activeKey === targetKey) {
                    activeKey = panes[lastIndex].key
                }

                store.commit('changeStore',{key:'tabArray',val:panes});
                store.commit('changeStore',{key:'activeKey',val:activeKey});

                this.panes = panes
                this.activeKey = activeKey
                store.commit('changeStore',{key:'activeKey',val:activeKey});


            },
        },
        watch: {
            // "$store.state.activeKey"() {
            //     this.activeKey =  this.$store.state.activeKey;
            // },
            // "$store.state.tabArray"() {
            //     this.panes =  this.$store.state.panes;
            // }
        },
    }
</script>
<style scoped>
.ant-tabs-nav *{
    text-align: left !important;
}
</style>