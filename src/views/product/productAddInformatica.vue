<template>
            <div class="producetAdd">
                <div class="secondTitle">
                    <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                        产品信息：
                    </a-col>
                    <a-col class="gutter-row" :span="3">
                        <a-row>
                            <!--<a-col class="gutter-row" :span="12">-->
                                <!--<a-button >取消</a-button>-->
                            <!--</a-col>-->
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
                                <div class="inputName">*商品编号：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-input v-model="postData.goodsId" placeholder=""/>
                            </a-col>
                        </div>
                    </a-col>
                    <a-col class="gutter-row" :span="6">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">*商品名称：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-input v-model="postData.goodsName" placeholder=""/>
                            </a-col>
                        </div>
                    </a-col>
                    <a-col class="gutter-row" :span="6">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">*UPC码：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-input v-model="postData.goodsUPC" placeholder=""/>
                            </a-col>
                        </div>
                    </a-col>
                    <a-col class="gutter-row" :span="6">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">*商品类型：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-select  style="width: 100%" defaultValue="1" @change="handleChangeSelect">
                                    <a-select-option value="1">一般商品</a-select-option>
                                    <a-select-option value="2">已存在商品组合</a-select-option>
                                    <a-select-option value="3">虚拟商品（服务，订票，下载的产品，等等）</a-select-option>
                                </a-select>
                            </a-col>
                        </div>
                    </a-col>
                </a-row>

                <a-row>
                    <a-col class="gutter-row" :span="6">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">*是否启用：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18" style="line-height: 30px">
                                <a-radio-group @change="onChangeIsUse" name="radioGroup" :defaultValue="1">
                                    <a-radio :value="0">启用</a-radio>
                                    <a-radio :value="1">禁止</a-radio>
                                </a-radio-group>
                            </a-col>
                        </div>
                    </a-col>

                    <a-col class="gutter-row" :span="6">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">*商品标签 ：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-input v-model="postData.goodsLabel" placeholder=""/>
                            </a-col>
                        </div>
                    </a-col>
                </a-row>


                <a-row>
                    <a-col class="gutter-row" :span="6">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">*商品简介：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-textarea v-model="postData.goodsDesc" placeholder="Basic usage" :rows="4"/>
                            </a-col>
                        </div>
                    </a-col>
                </a-row>

                <a-row>
                    <a-col class="gutter-row" :span="18">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="2">
                                <div class="inputName">*产品详情：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="22">
                                <tinymce-editor v-model="postData.goodsDetails"
                                                :disabled="disabled"
                                                ref="editor"></tinymce-editor>
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
                this.postData.goodsType=value
            },
            onChangeIsUse(e){
                this.postData.isDisabled=String(e.target.value)
            },
            onChange(date, dateString) {
                console.log(date, dateString);
            },
            saveProductInfor(){
                store.commit('changeStore',{key:'loading',val:true});
                let isAll = true
                for(let key  in this.postData){
                    if(this.postData[key]==""){
                        isAll =false
                    }
                }
                if (isAll){
                    this.$post('/product/addProduct',this.postData).then((reData)=>{
                        console.log(reData)
                        this.$notification.open({
                            message: '提醒',
                            description: reData.message,
                            onClick: () => {
                                console.log('ok');
                            },
                        })
                        if(reData.code == 0){
                            store.commit('changeStore',{key:'goods_id',val:reData.data.id });
                            setTimeout(function () {
                                store.commit('changeStore',{key:'addProductContent',val:'productAddPrice'});
                                store.commit('changeStore',{key:'addProductCurrent',val:'1'});
                            },1000)
                        }
                        store.commit('changeStore',{key:'loading',val:false});
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

        },
        data() {
            return {
                previewVisible: false,
                previewImage: '',
                fileList: [],
                headers: {
                    authorization: 'authorization-text',
                }
                ,disabled: false
                ,postData:{
                    goodsType:"1",
                    goodsName:"",
                    goodsId:"",
                    goodsUPC:"",
                    isDisabled:"0",
                    goodsLabel:"",
                    goodsDesc:"",
                    goodsDetails:"",
                }
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

</style>