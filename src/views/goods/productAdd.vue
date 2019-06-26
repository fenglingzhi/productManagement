<template>
  <div class="producetAdd">
    <div class="secondTitle">
                <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                    产品信息：
                </a-col>
                <a-col class="gutter-row" :span="3">
                    <a-row>
                        <a-col class="gutter-row" :span="12">
                            <a-button type="primary">保存</a-button>
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
              <div class="inputName">*CP号：</div>
            </a-col>
            <a-col class="gutter-row" :span="18">
              <a-input placeholder="请输入产品名称"/>
            </a-col>
          </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
          <div class="inputPart">
              <a-col class="gutter-row" :span="6">
                  <div class="inputName">单位类型：</div>
              </a-col>
              <a-col class="gutter-row" :span="18">
                  <a-select defaultValue="请选择" style="width: 100%" @change="handleChangeSelect">
                      <a-select-option value="件">件</a-select-option>
                  </a-select>
              </a-col>
          </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
          <div class="inputPart">
              <a-col class="gutter-row" :span="6">
                  <div class="inputName">上架时间：</div>
              </a-col>
              <a-col class="gutter-row" :span="18">
                <a-date-picker @change="onChange" :style="{width: '100%'}"/>
              </a-col>
          </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
            <div class="inputName">设计师 ：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-select defaultValue="请选择" style="width: 100%" @change="handleChangeSelect">
              <a-select-option value="Jack">Jack</a-select-option>
              <a-select-option value="Tom">Tom</a-select-option>
            </a-select>
          </a-col>
        </div>
      </a-col>
    </a-row>

      <a-row>
          <a-col class="gutter-row" :span="6">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="6">
                      <div class="inputName">面料选择：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="18">
                      <a-select defaultValue="请选择" style="width: 100%" @change="handleChangeSelect">
                          <a-select-option value="100%纯棉">100%纯棉</a-select-option>
                          <a-select-option value="80%纯棉">80%纯棉</a-select-option>
                          <a-select-option value="棉麻混合">棉麻混合</a-select-option>

                      </a-select>
                  </a-col>
              </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="6">
                      <div class="inputName">开发时间：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="18">
                      <a-date-picker @change="onChange" :style="{width: '100%'}"/>
                  </a-col>
              </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="6">
                      <div class="inputName">*产品名称：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="18">
                      <a-input placeholder="请输入产品名称"/>
                  </a-col>
              </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="6">
                      <div class="inputName">尺码：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="18">
                      <a-input placeholder="请输入尺码"/>
                  </a-col>
              </div>
          </a-col>
      </a-row>


      <a-row>
          <a-col class="gutter-row" :span="6">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="6">
                      <div class="inputName">研发报价：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="18">
                      <a-input placeholder="请输入研发报价"/>
                  </a-col>
              </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="6">
                      <div class="inputName">颜色：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="18">
                      <a-input placeholder="请输入颜色"/>
                  </a-col>
              </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="6">
                      <div class="inputName">净重（kg）：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="18">
                      <a-input placeholder="请输入净重"/>
                  </a-col>
              </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="6">
                      <div class="inputName">供应商：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="18">
                      <a-select defaultValue="请选择" style="width: 100%" @change="handleChangeSelect">
                          <a-select-option value="100%纯棉">卡佩西</a-select-option>
                          <a-select-option value="80%纯棉">圣罗兰</a-select-option>
                          <a-select-option value="棉麻混合">zare</a-select-option>
                      </a-select>
                  </a-col>
              </div>
          </a-col>
      </a-row>



      <a-row>
          <a-col class="gutter-row" :span="6">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="6">
                      <div class="inputName">供应商名称：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="18">
                      <a-input placeholder="请输入供应商名称"/>
                  </a-col>
              </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="6">
                      <div class="inputName">尺寸：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="6">
                      <a-input placeholder="请输入长"/>
                  </a-col>
                  <a-col class="gutter-row" :span="6">
                      <a-input placeholder="请输入宽"/>
                  </a-col>
                  <a-col class="gutter-row" :span="6">
                      <a-input placeholder="请输入高"/>
                  </a-col>
              </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="6">
                      <div class="inputName">工厂报价：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="18">
                      <a-input placeholder=""/>
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
    import router from '../router';
    import store from '../store'
    import $ from 'jquery'
    export default {
        methods: {
            handleChangeSelect(value) {
                console.log(`selected ${value}`);
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
            }
        } ,
        mounted() {
            store.commit('changeStore',{key:'title',val:'新增产品'});
        },
        data() {
            return {
                previewVisible: false,
                previewImage: '',
                fileList: [],
                headers: {
                    authorization: 'authorization-text',
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