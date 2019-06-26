<template>
  <div class="crm">


      <template>
          <div>

              <a-tabs
                      hideAdd
                      v-model="$store.state.activeKey"
                      type="editable-card"
                      @edit="onEdit"
                      :tabClick="changeTab">
                  <a-tab-pane v-for="pane in panes" :tab="pane.title" :key="pane.key" :closable="pane.closable">
                      <!--{{pane.content}}-->
                      <componet :is="pane.content"></componet>
                  </a-tab-pane>
              </a-tabs>
          </div>
      </template>







  </div>
</template>
<script>
    var vm = this
    import router from '../router';
    import store from '../store'
    import $ from 'jquery'
    import productList from './goods/productList'

    export default {

        components:{
            productList
        },
        data () {
            // const panes =this.$store.state.tabArray
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
                console.log(targetKey)

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