<template>
  <div class="crm">


      <template>
          <div>

              <a-tabs
                      hideAdd
                      v-model="$store.state.activeKey"
                      type="editable-card"
                      @edit="onEdit"
              >
                  <a-tab-pane v-for="pane in panes" :tab="pane.title" :key="pane.key" :closable="pane.closable">
                      <!--{{pane.content}}-->
                      <componet :is="pane.content"></componet>
                  </a-tab-pane>
              </a-tabs>
          </div>
          {{$store.state.tabArray}}

      </template>







  </div>
</template>
<script>
    var vm = this
    import router from '../router';
    import store from '../store'
    import $ from 'jquery'
    import test1 from './ceshi'
    import test2 from './ceshi2'
    import test3 from './ceshi'
    import test4 from './ceshi2'
    import productList from './goods/productList'

    export default {

        components:{
            test1,test2,test3,test4,productList
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
                console.log(key)
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

                this.panes = panes
                this.activeKey = activeKey
                store.commit('changeStore',{key:'activeKey',val:activeKey});

                var oldPane = this.$store.state.tabArray
                console.log(oldPane)
                oldPane.forEach((item, index) => {
                    if(item.key == targetKey){
                        oldPane.splice(index,1)
                    }
                })
                store.commit('changeStore',{key:'tabArray',val:oldPane});
            },
        },
        watch: {
            "$store.state.activeKey"() {
                this.activeKey =  this.$store.state.activeKey;
            },
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