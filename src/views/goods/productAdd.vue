<template>
  <div class="producetAdd">
    <div class="secondTitle">
                <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                    产品信息：
                </a-col>
                <a-col class="gutter-row" :span="3">
                    <a-row>
                        <a-col class="gutter-row" :span="12">
                            <a-button type="primary" @click="saveProductInfor()">保存</a-button>
                        </a-col>
                        <a-col class="gutter-row" :span="12">
                            <a-button >取消</a-button>
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
                    <div class="inputName">*商品UPC码：</div>
                </a-col>
                <a-col class="gutter-row" :span="18">
                    <a-input v-model="postData.goodsUPC" placeholder=""/>
                </a-col>
            </div>
        </a-col>
      <a-col class="gutter-row" :span="6">
          <div class="inputPart">
              <a-col class="gutter-row" :span="6">
                  <div class="inputName">商品类型：</div>
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
                      <div class="inputName">是否启用：</div>
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
                      <div class="inputName">产品详情：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="22">
                      <tinymce-editor v-model="postData.goodsDetails"
                                      :disabled="disabled"
                                      ref="editor"></tinymce-editor>
                      <!--<button @click="disabled = true">禁用</button>-->
                  </a-col>
              </div>
          </a-col>
      </a-row>





      <div class="secondTitle">
          <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
              图片：
          </a-col>
      </div>


      <a-row>
          <a-col class="gutter-row" :span="8">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="4">
                      <div class="inputName">研发样图：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="20">
                      <div class="clearfix">
                          <a-upload
                                  action="//jsonplaceholder.typicode.com/posts/"
                                  listType="picture-card"
                                  :fileList="fileList"
                                  @preview="handlePreview"
                                  @change="handleChange"
                          >
                              <div v-if="fileList.length < 1">
                                  <a-icon type="plus" />
                                  <div class="ant-upload-text">Upload</div>
                              </div>
                          </a-upload>
                          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                              <img alt="example" style="width: 100%" :src="previewImage" />
                          </a-modal>
                      </div>
                  </a-col>
              </div>
          </a-col>

          <a-col class="gutter-row" :span="8">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="4">
                      <div class="inputName">自助拍摄：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="20">
                      <div class="clearfix">
                          <a-upload
                                  action="//jsonplaceholder.typicode.com/posts/"
                                  listType="picture-card"
                                  :fileList="fileList"
                                  @preview="handlePreview"
                                  @change="handleChange"
                          >
                              <div v-if="fileList.length < 3">
                                  <a-icon type="plus" />
                                  <div class="ant-upload-text">Upload</div>
                              </div>
                          </a-upload>
                          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                              <img alt="example" style="width: 100%" :src="previewImage" />
                          </a-modal>
                      </div>
                  </a-col>
              </div>
          </a-col>

          <a-col class="gutter-row" :span="8">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="4">
                      <div class="inputName">模特拍摄：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="20">
                      <div class="clearfix">
                          <a-upload
                                  action="//jsonplaceholder.typicode.com/posts/"
                                  listType="picture-card"
                                  :fileList="fileList"
                                  @preview="handlePreview"
                                  @change="handleChange"
                          >
                              <div v-if="fileList.length < 3">
                                  <a-icon type="plus" />
                                  <div class="ant-upload-text">Upload</div>
                              </div>
                          </a-upload>
                          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                              <img alt="example" style="width: 100%" :src="previewImage" />
                          </a-modal>
                      </div>
                  </a-col>
              </div>
          </a-col>

      </a-row>

      <div class="secondTitle">
          <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
              花板：
          </a-col>
      </div>

      <a-row>
          <a-col class="gutter-row" :span="8">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="4">
                      <div class="inputName">压缩包：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="8">
                      <template>
                          <a-upload name="file" :multiple="true" action="//jsonplaceholder.typicode.com/posts/" :headers="headers" @change="handleChangeZip">
                              <a-button>
                                  <a-icon type="upload" /> Click to Upload
                              </a-button>
                          </a-upload>
                      </template>
                  </a-col>
              </div>
          </a-col>



      </a-row>


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
            onChangeIsUse(value){
                this.postData.isDisabled=value
            },
            handleCancel () {
                this.previewVisible = false
            },
            handlePreview (file) {
                this.previewImage = file.url || file.thumbUrl
                this.previewVisible = true
            },
            handleChange ({ fileList }) {
                this.fileList = fileList
            },
            handleChangeZip(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    this.$message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    this.$message.error(`${info.file.name} file upload failed.`);
                }
            },
            onChange(date, dateString) {
                console.log(date, dateString);
            },
            saveProductInfor(){
                let isAll = false
                for(let key  in this.postData){
                    console.log(key + '---' + this.postData[key])
                    if(this.postData[key]==""){
                        isAll =false
                    }else {
                        isAll =true
                    }
                }

                if (isAll){
                    this.$post('/product/addProduct',this.postData).then((reData)=>{
                        console.log(reData)
                    })


                    // alert()

                }else {
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