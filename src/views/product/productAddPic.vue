<template>
  <!--<div class="producetAdd">-->
    <!--<div class="secondTitle">-->
                <!--<a-col class="gutter-row" :span="21" style="padding-top: 13px;">-->
                    <!--图片：-->
                <!--</a-col>-->
                <!--<a-col class="gutter-row" :span="3">-->
                    <!--<a-row>-->
                        <!--<a-col class="gutter-row" :span="12">-->
                            <!--<a-button type="primary">保存</a-button>-->
                        <!--</a-col>-->
                        <!--<a-col class="gutter-row" :span="12">-->
                            <!--<a-button >取消</a-button>-->
                        <!--</a-col>-->
                    <!--</a-row>-->
                <!--</a-col>-->
    <!--</div>-->



      <!--<a-row>-->
          <!--<a-col class="gutter-row" :span="8">-->
              <!--<div class="inputPart">-->
                  <!--<a-col class="gutter-row" :span="4">-->
                      <!--<div class="inputName">研发样图：</div>-->
                  <!--</a-col>-->
                  <!--<a-col class="gutter-row" :span="20">-->
                      <!--<div class="clearfix">-->
                          <!--<a-upload-->
                                  <!--action="//jsonplaceholder.typicode.com/posts/"-->
                                  <!--listType="picture-card"-->
                                  <!--:fileList="fileList"-->
                                  <!--@preview="handlePreview"-->
                                  <!--@change="handleChange"-->
                          <!--&gt;-->
                              <!--<div v-if="fileList.length < 1">-->
                                  <!--<a-icon type="plus" />-->
                                  <!--<div class="ant-upload-text">Upload</div>-->
                              <!--</div>-->
                          <!--</a-upload>-->
                          <!--<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">-->
                              <!--<img alt="example" style="width: 100%" :src="previewImage" />-->
                          <!--</a-modal>-->
                      <!--</div>-->
                  <!--</a-col>-->
              <!--</div>-->
          <!--</a-col>-->

      <!--</a-row>-->

      <!--<div class="secondTitle">-->
          <!--<a-col class="gutter-row" :span="21" style="padding-top: 13px;">-->
              <!--图片列表：-->
          <!--</a-col>-->
      <!--</div>-->
      <!--<a-table :columns="columns"-->
               <!--:dataSource="productListData"-->
               <!--:pagination="pagination"-->
               <!--:loading="loading"-->
               <!--align="center"-->
               <!--@change="handleTableChange"-->
               <!--:rowSelection="rowSelection"-->
               <!--:scroll="{ x: 1500 }">-->
          <!--<span slot="action" slot-scope="text, record">-->
              <!--<a href="javascript:;">修改{{text.id}}</a>-->
              <!--<a-divider type="vertical"></a-divider>-->
              <!--<a href="javascript:;">删除{{text.id}}</a>-->
          <!--</span>-->
          <!--<span slot="img_" slot-scope="text, record">-->
              <!--<img :src="text.image_url" alt="" height="32px;" style="border:1px solid #ccc;" v-if="text.image_url !== ''">-->
          <!--</span>-->
          <!--<a slot="active" slot-scope="text, record" style="text-align: center">-->
              <!--&lt;!&ndash;{{record}}&ndash;&gt;-->
              <!--<a-icon type="check" style="color: green" v-if="text == '1'" @click="change_active({product_id:record.product_id,status:'100'})"></a-icon>-->
              <!--<a-icon type="close" style="color: red" v-if="text == '0'" @click="change_active({product_id:record.product_id,status:'100'})"></a-icon>-->
          <!--</a>-->
      <!--</a-table>-->

<!--{{fileList}}-->

  <!--</div>-->
</template>
<script>
    import router from '../../router'
    import store from '../../store'
    import $ from 'jquery'


    const columns = [
        {title: '操作', key: 'action', fixed: 'left', scopedSlots: { customRender: 'action' },},
        { title: '图片',  key: 'image_url',scopedSlots: { customRender: 'img_' },},

        { title: '商品ID', dataIndex: 'product_id', key: 'product_id'},
        { title: '商品名称', dataIndex: 'name', key: 'name'},
        { title: 'upc码', dataIndex: 'upc', key: 'upc'},
        { title: '是否在售', dataIndex: 'active', key: 'active', align: 'center' ,scopedSlots: { customRender: 'active' },},
    ];
    const productListData = [{
        active: "1",
        add_date: "2019-06-28",
        description: "123",
        description_short: "123",
        image_url: "https://image1.zorafan.com/o_img/2019/06/11/1-4-mini.jpg",
        name: "新增商品名称",
        product_code: "CAT0001",
        product_id: 6,
        product_type: "1",
        upc: "UPC0001",
        upd_date: "2019-06-28",
    }];

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
            onChange(date, dateString) {
                console.log(date, dateString);
            }
        } ,
        mounted() {
            store.commit('changeStore',{key:'title',val:'新增产品'});
        },
        data() {
            return {
                productListData,
                columns,
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