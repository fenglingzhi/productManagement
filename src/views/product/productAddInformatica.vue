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
                                <a-input v-model="postData.product_code" placeholder=""/>
                            </a-col>
                        </div>
                    </a-col>
                    <a-col class="gutter-row" :span="6">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">*商品名称：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-input v-model="postData.name" placeholder=""/>
                            </a-col>
                        </div>
                    </a-col>
                    <a-col class="gutter-row" :span="6">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">*UPC码：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-input v-model="postData.upc" placeholder=""/>
                            </a-col>
                        </div>
                    </a-col>
                </a-row>
                <a-row>
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
                                <div class="inputName">*商品标签 ：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <!--<a-input v-model="postData.product_label" placeholder=""/>-->

                                <template>
                                    <div>
                                        <template v-for="(tag, index) in tags">
                                            <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
                                                <a-tag :key="tag" :closable="index !== 0" :afterClose="() => handleClose(tag)">
                                                    {{`${tag.slice(0, 20)}...`}}
                                                </a-tag>
                                            </a-tooltip>
                                            <a-tag v-else :key="tag" :closable="index !== 0" :afterClose="() => handleClose(tag)">
                                                {{tag}}
                                            </a-tag>
                                        </template>
                                        <a-input
                                                v-if="inputVisible"
                                                ref="input"
                                                type="text"
                                                size="small"
                                                :style="{ width: '78px' }"
                                                :value="inputValue"
                                                @change="handleInputChange"
                                                @blur="handleInputConfirm"
                                                @keyup.enter="handleInputConfirm"
                                        />
                                        <a-tag v-else @click="showInput" style="background: #fff; borderStyle: dashed;">
                                            <a-icon type="plus" /> New Tag
                                        </a-tag>
                                    </div>
                                </template>


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


                </a-row>


                <a-row>
                    <a-col class="gutter-row" :span="6">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">*商品简介：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-textarea v-model="postData.description_short" placeholder="Basic usage" :rows="4"/>
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
                                <tinymce-editor v-model="postData.description"
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
            acTiveArrStringFun(obj) {
                var arr = [];
                if (obj != null && obj.length != 0) {
                    for (var i = 0; i < obj.length; i++) {
                        arr.push(obj[i]);
                    }
                }
                return arr.toString();
            },

            handleChangeSelect(value) {
                this.postData.product_type=value
            },
            onChangeIsUse(e){
                this.postData.active=String(e.target.value)
            },
            onChange(date, dateString) {
                console.log(date, dateString);
            },
            saveProductInfor(){
                // store.commit('changeStore',{key:'loading',val:true});
                this.postData.lang_id=this.$store.state.langId;
                this.postData.product_id = this.$store.state.goods_id;
                this.postData.product_label = this.acTiveArrStringFun(this.tags);

                let isAll = true
                // for(let key  in this.postData){
                //     if(this.postData[key]==""){
                //         isAll =false
                //     }
                // }
                if (isAll){
                    if(this.$store.state.isEdit){
                        this.$post('/product/editProduct',this.postData).then((reData)=>{
                            console.log(reData)
                            this.$notification.open({
                                message: '提醒',
                                description: reData.message,
                                onClick: () => {
                                    console.log('ok');
                                },
                            })
                            if(reData.code == 0){

                                setTimeout(function () {
                                    store.commit('changeStore',{key:'addProductContent',val:'productAddPrice'});
                                    store.commit('changeStore',{key:'addProductCurrent',val:'1'});
                                },1000)
                            }
                            store.commit('changeStore',{key:'loading',val:false});
                        })

                    }else {
                        delete this.postData.product_id
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
                                store.commit('changeStore',{key:'goods_id',val:reData.data.product_id });
                                setTimeout(function () {
                                    store.commit('changeStore',{key:'addProductContent',val:'productAddPrice'});
                                    store.commit('changeStore',{key:'addProductCurrent',val:'1'});
                                },1000)
                            }
                            store.commit('changeStore',{key:'loading',val:false});
                        })

                    }

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
            },


            handleClose (removedTag) {
                const tags = this.tags.filter(tag => tag !== removedTag)
                console.log(tags)
                this.tags = tags
            },

            showInput () {
                this.inputVisible = true
                this.$nextTick(function () {
                    this.$refs.input.focus()
                })
            },

            handleInputChange (e) {
                this.inputValue = e.target.value
            },


            handleInputConfirm () {
                const inputValue = this.inputValue
                let tags = this.tags
                if (inputValue && tags.indexOf(inputValue) === -1) {
                    tags = [...tags, inputValue]
                }
                console.log(tags)
                Object.assign(this, {
                    tags,
                    inputVisible: false,
                    inputValue: '',
                })
            }


        } ,
        mounted() {
            var vm=this;
            if(this.$store.state.isEdit){


                var Data = this.$store.state.oldData.prdBase
                this.postData.product_type = Data.product_type
                this.postData.name = Data.name
                this.postData.product_id = Data.product_id
                this.postData.upc = Data.upc
                this.postData.active = Data.active
                this.postData.product_label = Data.product_label
                this.postData.description_short = Data.description_short
                this.postData.description = Data.description
                this.postData.product_code = Data.product_code
                this.postData.lang_id = Data.lang_id
               var tagList =  this.$store.state.oldData.tagList

                tagList.forEach(function(val, index) {
                    vm.tags.push(val.name)
                });

                store.commit('changeStore',{key:'langId',val: Data.lang_id});


            }
        },
        data() {
            return {
                previewVisible: false,
                previewImage: '',
                fileList: [],
                headers: {
                    authorization: 'authorization-text',
                },


                tags: [],
                inputVisible: false,
                inputValue: ''
                ,disabled: false
                ,postData:{
                    product_type:"1",
                    name:"",
                    product_id:"",
                    upc:"",
                    active:'1',
                    product_label:[],
                    description_short:"",
                    description:"",
                    product_code:'',
                    lang_id:''
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