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
                              :tabClick="changeTab"
                      >
                          <a-tab-pane v-for="pane in panes" :tab="pane.title" :key="pane.key" :closable="pane.closable">
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
    import customerList from './customer/customerList'
    import customerGender from './customer/customerGender'
    import customerCart from './customer/customerCart'
    import customerAddress from './customer/customerAddress'

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
            customerAddress
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
                store.commit('changeStore',{key:'activeKey',val:key});
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
                console.log(panes)
                console.log(activeKey)
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