<template>
    <a-row>
        <a-col :span="3">
            <div class="addProductSteps">
                <div class="addProductStep" v-for="(item,index) in liList" v-on:click="choseStep(index,item.key)" v-bind:class="{addProductStepChosed:index==$store.state.addProductCurrent}">{{item.title}}</div>
            </div>
        </a-col>
        <a-col :span="21">
            <!--<componet :is="$store.state.addProductContent"></componet>-->
            <productAddInformatica v-show="$store.state.addProductContent == 'productAddInformatica'"></productAddInformatica>
            <productAddPrice v-show="$store.state.addProductContent == 'productAddPrice'"></productAddPrice>
            <productAddCollection v-show="$store.state.addProductContent == 'productAddCollection'"></productAddCollection>
            <productAddPic v-show="$store.state.addProductContent == 'productAddPic'"></productAddPic>
            <productCombination v-show="$store.state.addProductContent == 'productCombination' && $store.state.isEdit"></productCombination>
            <productEngineOptimization v-show="$store.state.addProductContent == 'productEngineOptimization'"></productEngineOptimization>
            <productNum v-show="$store.state.addProductContent == 'productNum'"></productNum>
            <productCombinationNew v-show="$store.state.addProductContent == 'productCombination' && !$store.state.isEdit"></productCombinationNew>

        </a-col>

    </a-row>

</template>
<script>
    var vm =this
    import router from '../../router'
    import store from '../../store'
    import $ from 'jquery'

    import TinymceEditor from '../../components/tinymce-editor'
    import productAddInformatica from './productAddInformatica'
    import productAddCollection from '../goods/productAddCollection'

    import productAddPrice from './productAddPrice'
    import productAddPic from './productAddPic'
    import productCombination from './productCombination'
    import productCombinationNew from './productCombination1'

    import productEngineOptimization from './productEngineOptimization'
    import productNum from './productNum'





    export default {
        components:{
            TinymceEditor,
            productAddInformatica,
            productAddPrice,
            productAddCollection,
            productAddPic,
            productCombination,
            productEngineOptimization,
            productNum,
            productCombinationNew
        },
        methods: {
            // handleChangeSelect(value) {
            //     this.postData.goodsType=value
            // },
            // onChangeIsUse(value){
            //     this.postData.isDisabled=value
            // },
            getOldData(){
                // let data={
                //     product_id:this.$store.state.goods_id,
                //     lang_id:this.$store.state.langId
                // }
                // this.$post('/product/getProductInfoById',data).then((reData)=>{
                //     store.commit('changeStore',{key:'oldData',val:reData.data});
                // })


            },

            onChange(date, dateString) {
                console.log(date, dateString);
            },
            choseStep(index,key){
                store.commit('changeStore',{key:'addProductCurrent',val:index});
                store.commit('changeStore',{key:'addProductContent',val:key});
            }
        } ,
        mounted() {
            if(this.$store.state.isEdit){
                this.getOldData()
            }
        },
        data() {
            return {

                headers: {
                    authorization: 'authorization-text',
                },
                current:0,
                liList:[
                    {title:'信息',key:'productAddInformatica'},
                    {title:'价格',key:'productAddPrice'},
                    {title:'搜索引擎优化',key:'productEngineOptimization'},
                    {title:'分类',key:'productAddCollection'},
                    {title:'组合',key:'productCombination'},
                    // {title:'数量',key:'productNum'},
                    {title:'图片',key:'productAddPic'},
                ]
                ,disabled: false

            }
        }
    }
</script>
<style scoped>
  .inputName{
    text-align: right;
    line-height: 34px;
  }
  .ant-row{
    margin: 10px 0;
  }
  .hrLine{
    width: 120%;
    height: 30px;
    margin-left: -30px;
    background: #f0f2f5;
  }
  .secondTitle{
      text-align: left;
      font-size: 16px;
      font-weight: bold;
      width: 100%;
      border-bottom: 1px solid #999;
      margin-bottom: 24px;
      padding-bottom: 12px;
      box-shadow: 0 0 black;
      height: 50px;
  }
  .ant-upload-select-picture-card i {
      font-size: 32px;
      color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
      margin-top: 8px;
      color: #666;
  }
    .addProductStep{
        position: relative;
        display: block;
        padding: 10px 15px;
        margin-bottom: -1px;
        background-color: #fff;
        border: 1px solid #ddd;
        cursor: pointer;
    }
  .addProductSteps{
      padding-right: 36px;
      margin: 16px 0;
  }
  .addProductStepChosed {
      position: relative;
      display: block;
      padding: 10px 15px;
      margin-bottom: -1px;
      background-color: #1890ff;
      border: 1px solid #ddd;
      color: white;
  }
</style>