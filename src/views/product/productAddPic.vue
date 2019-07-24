<template>
  <div class="producetAdd">
    <div class="secondTitle">
                <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                    图片：
                </a-col>
                <a-col class="gutter-row" :span="3">
                    <a-row>
                        <a-col class="gutter-row" :span="12">
                          <!--<a-button >取消</a-button>-->
                        </a-col>
                        <a-col class="gutter-row" :span="12">
                          <a-button type="primary" @click="save" >保存</a-button>
                        </a-col>
                    </a-row>
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

      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="6">
          <div class="inputPart">
            <a-col class="gutter-row" :span="6">
              <div class="inputName">*位置：</div>
            </a-col>
            <a-col class="gutter-row" :span="18">
              <a-select  style="width: 100%" defaultValue="0" @change="handleChangeSelect">
                <a-select-option value="0">all</a-select-option>
                <a-select-option v-for='item in selectData' :value="item">{{item}}</a-select-option>
              </a-select>
            </a-col>
              {{selectData}}
          </div>
        </a-col>
      </a-row>
    <a-row>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
            <div class="inputName">*是否展示：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-select  style="width: 100%" defaultValue="1" @change="handleChangeCoverSelect">
              <a-select-option value="1">是</a-select-option>
              <a-select-option value="0">否</a-select-option>

            </a-select>
          </a-col>
        </div>
      </a-col>
    </a-row>
        <a-row>
          <a-col class="gutter-row" :span="6">
            <div class="inputPart">
              <a-col class="gutter-row" :span="6">
                <div class="inputName">*Caption：</div>
              </a-col>
              <a-col class="gutter-row" :span="18">
                <a-input  v-model="postData.legend" placeholder=""/>
              </a-col>
            </div>
          </a-col>
        </a-row>

      <div class="secondTitle">
          <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
              图片列表：
          </a-col>
      </div>
      <a-table :columns="columns"
               :dataSource="productListData"
               :pagination="pagination"
               :loading="loading"
               align="center"
               >
          <span slot="action" slot-scope="text, record">
              <a @click="delPic(text.position)">删除{{text.position}}</a>
           </span>
          <span slot="image" slot-scope="text, record">
              <img :src="text.image_visit_url" alt="" height="32px;" style="border:1px solid #ccc;" v-if="text.image_visit_url !== ''">
          </span>
          <a slot="isShow" slot-scope="text, record" style="text-align: center">
              <!--{{record}}-->
              <a-icon type="check" style="color: green" v-if="text.cover" @click="change_active()"></a-icon>
              <a-icon type="close" style="color: red" v-if="!text.cover" @click="change_active()"></a-icon>
          </a>
      </a-table>

{{fileList}}

  </div>
</template>
<script>
    import router from '../../router'
    import store from '../../store'
    import $ from 'jquery'


    const columns = [
        {title: '操作', key: 'action', scopedSlots: { customRender: 'action' },},
        { title: '图片',  key: 'image',scopedSlots: { customRender: 'image' },},
        { title: 'Caption', dataIndex: 'legend', key: 'legend'},
        { title: '位置', dataIndex: 'position', key: 'position'},
        { title: '是否展示',  key: 'isShow',scopedSlots: { customRender: 'isShow' },},


    ];
    const productListData = [

    ];

    export default {
        methods: {
            delPic(postion){
                this.$post('/productImage/removeProductImage',
                    {
                        productId:this.$store.state.goods_id,
                        position:postion
                        // langId:this.$store.state.langId
                    }).then((reData)=>{
                   this.getdata()
                })
            },
            change_active(){

            },
            handleChangeSelect(value) {
                this.postData.position=value
            },
            handleChangeCoverSelect(value) {
                this.postData.cover=value
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
            onChange(date, dateString) {
                console.log(date, dateString);
            }
            ,getdata(){

                this.$post('/productImage/getProductImage',{productId:this.$store.state.goods_id,langId:this.$store.state.langId}).then((reData)=>{
                    console.log(reData)
                    this.productListData=reData.data
                    this.selectData=[]
                    for(let b=0;b<reData.data.length;b++ ){
                        this.selectData.push(b+1)
                    }

                })
            }
            ,save(){
                store.commit('changeStore',{key:'loading',val:true });

                this.postData.langId=this.$store.state.langId
                this.postData.productId=this.$store.state.goods_id
                this.postData.imageBaseStr=this.fileList[0].thumbUrl
                if(this.fileList[0].size>5242880){
                    this.$notification.open({
                        message: '图片超出5M',
                        description: reData.message,
                        onClick: () => {
                            console.log('ok');
                        },
                    })
                    store.commit('changeStore',{key:'loading',val:false });

                }else {
                    this.$post('/productImage/addProductImage',this.postData).then((reData)=>{
                        console.log(reData)
                        store.commit('changeStore',{key:'loading',val:false });

                        this.$notification.open({
                            message: '提醒',
                            description: reData.message,
                            onClick: () => {
                                console.log('ok');
                            },
                        })
                        this.getdata()
                        if(reData.code == 0){

                            store.commit('changeStore',{key:'goods_id',val:reData.data.id });
                            setTimeout(function () {
                                // store.commit('changeStore',{key:'addProductContent',val:'productAddPrice'});
                                // store.commit('changeStore',{key:'addProductCurrent',val:'1'});
                            },1000)
                        }
                        store.commit('changeStore',{key:'loading',val:false});
                    })
                }

            }
        } ,
        mounted() {
            store.commit('changeStore',{key:'title',val:'新增产品'});
            this.getdata()
        },
        data() {
            return {
                productListData,
                columns,
                selectData:[],
                previewVisible: false,
                previewImage: '',
                fileList: [],
                headers: {
                    authorization: 'authorization-text',
                },
                postData:{
                    productId:'',
                    position:'0',
                    imageBaseStr:'',
                    cover:'1',
                    legend:'',
                    langId:''
                },
                loading: false,
                pagination:{
                    defaultPageSize:10,
                    total:1,
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