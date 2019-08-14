<template>
    <div class="producetAdd">
        <div class="secondTitle">
            <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                产品价格：
            </a-col>
            <a-col class="gutter-row" :span="3">
                <a-row>
                    <a-col class="gutter-row" :offset="12" :span="12">
                        <a-button type="primary"  @click="saveProductInfor()">保存</a-button>
                    </a-col>
                </a-row>
            </a-col>
        </div>
        <a-row>
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="6">
                        <div class="inputName">*货币种类：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="18">
                        <a-select  style="width: 100%" defaultValue="1" @change="handleChangeSelect">
                            <a-select-option value="1">美元</a-select-option>
                            <a-select-option value="2">欧元</a-select-option>
                            <a-select-option value="3">港币</a-select-option>
                        </a-select>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="6">
                        <div class="inputName">*成本价格：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="18">
                        <a-input v-model="postData.cost_price" placeholder=""/>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="6">
                        <div class="inputName">*零售价格：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="18">
                        <a-input v-model="postData.retail_price" placeholder=""/>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="6">
                        <div class="inputName">*折扣价格：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="18">
                        <a-input v-model="postData.sale_price" placeholder=""/>
                    </a-col>
                </div>
            </a-col>

        </a-row>
        <!--<a-row>-->
            <!--<a-col class="gutter-row" :span="6">-->
                <!--<div class="inputPart">-->
                    <!--<a-col class="gutter-row" :span="6">-->
                        <!--<div class="inputName">*商品标签：</div>-->
                    <!--</a-col>-->
                    <!--<a-col class="gutter-row" :span="18">-->
                        <!--<a-input v-model="postData.rateId" placeholder=""/>-->
                    <!--</a-col>-->
                <!--</div>-->
            <!--</a-col>-->
        <!--</a-row>-->
{{postData}}
    </div>
</template>
<script>
    var vm =this
    import router from '../../router'
    import store from '../../store'
    import $ from 'jquery'
    import TinymceEditor from '../../components/tinymce-editor'
    export default {
        components:{
            TinymceEditor
        },
        methods: {
            handleChangeSelect(value) {
                this.postData.currency_Id=value
            },
            onChange(date, dateString) {
                console.log(date, dateString);
            },
            saveProductInfor(){
                // store.commit('changeStore',{key:'loading',val:true});
                this.postData.product_id=this.$store.state.goods_id
                console.log()
                let isAll = true
                // for(let key  in this.postData){
                //     if(this.postData[key]==""){
                //         isAll =false
                //     }
                // }

                if (isAll){
                    this.$post('/product/updateProductPrice',this.postData).then((reData)=>{
                        console.log(reData)
                        store.commit('changeStore',{key:'loading',val:false});
                        this.$notification.open({
                            message: '提醒',
                            description: reData.message,
                            onClick: () => {
                                console.log('ok');
                            },
                        })
                        if(reData.code == 0){
                            // store.commit('changeStore',{key:'goods_id',val:reData.data.goods_id });
                            setTimeout(function () {
                                store.commit('changeStore',{key:'addProductContent',val:'productEngineOptimization'});
                                store.commit('changeStore',{key:'addProductCurrent',val:'2'});
                            },1000)

                        }
                    })
                }else {
                    store.commit('changeStore',{key:'loading',val:false});

                    this.$notification.open({
                        message: '提醒',
                        description: '请把信息填写完整再提交！',
                        onClick: () => {
                            console.log('ok');
                        },
                    })
                }
            }
        } ,
        mounted() {
            if(this.$store.state.isEdit){
                var Data = this.$store.state.oldData.prdBase
                console.log(Data)
                // this.postData.currency_Id = Data.currencyId
                this.postData.cost_price = Data.cost_price
                this.postData.retail_price = Data.retail_price
                this.postData.sale_price = Data.sale_price
                // store.commit('changeStore',{key:'langId',val: Data.lang_id});

            }
        },
        data() {
            return {
                postData:{
                    product_id:'',
                    currency_id:'1',
                    cost_price:'',
                    retail_price:'',
                    sale_price:'',
                    // rateId:'',
                }
            }
        } ,
        watch: {
            "$store.state.goods_id"() {
                // this.postData.productId =  this.$store.state.goods_id;
            }
        },
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

</style>