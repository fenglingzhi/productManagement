<template>
    <div class="producetAdd">
        <div class="secondTitle">
            <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                搜索引擎优化：
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
            <a-col class="gutter-row" :span="8">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="6">
                        <div class="inputName">*语言：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="18">
                        <a-select  style="width: 100%" defaultValue="1" @change="handleChangeSelect">
                            <a-select-option value="1">美</a-select-option>
                        </a-select>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="gutter-row" :span="8">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="6">
                        <div class="inputName">*友好链接 ：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="18">
                        <a-input v-model="postData.linkRewrite" placeholder=""/>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="gutter-row" :span="8">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="6">
                        <div class="inputName">*meta标题：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="18">
                        <a-input v-model="postData.metaTitle" placeholder=""/>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="gutter-row" :span="8">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="6">
                        <div class="inputName">*meta关键字：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="18">
                        <a-input v-model="postData.metaKeyword" placeholder=""/>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="gutter-row" :span="8">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="6">
                        <div class="inputName">*meta详情：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="18">
                        <a-textarea v-model="postData.metaDescription" placeholder="Basic usage" :rows="4"/>
                    </a-col>
                </div>
            </a-col>

        </a-row>

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
                this.postData.langId=value
            },
            onChange(date, dateString) {
                console.log(date, dateString);
            },
            getData(){
                    let data={
                        productId:this.$store.state.goods_id,
                        langId:this.$store.state.langId
                    }
                    this.$post('/product/getProductSeo',data).then((reData)=>{
                        this.postData.productId = reData.data[0].product_id
                        this.postData.langId = reData.data[0].lang_id
                        this.postData.linkRewrite = reData.data[0].link_rewrite
                        this.postData.metaTitle = reData.data[0].meta_title
                        this.postData.metaKeyword= reData.data[0].meta_keyword
                        this.postData.metaDescription = reData.data[0].meta_description
                        store.commit('changeStore',{key:'langId',val: reData.data[0].lang_id});

                    })
            },
            saveProductInfor(){
                let isAll = true
                // for(let key  in this.postData){
                //     if(this.postData[key]==""){
                //         isAll =false
                //     }
                // }
                this.postData.productId =  this.$store.state.goods_id;
                if (isAll){
                    this.$post('/product/editProductSeo',this.postData).then((reData)=>{
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

                            store.commit('changeStore',{key:'addProductContent',val:'productAddCollection'});
                            store.commit('changeStore',{key:'addProductCurrent',val:'3'});

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
            // alert(this.$store.state.goods_id)
            // this.postData.productId = this.$store.state.goods_id
            if(this.$store.state.isEdit){
                    this.getData()
            }
        },
        data() {
            return {
                postData:{
                    productId:'',
                    langId:'1',
                    linkRewrite:'',
                    metaTitle:'',
                    metaKeyword:'',
                    metaDescription:'',
                }
            }
        } ,
        watch: {
            "$store.state.goods_id"() {
                this.postData.productId =  this.$store.state.goods_id;
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