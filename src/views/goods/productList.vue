<template>
  <div class="producetList">
    <a-row>
      <a-col class="gutter-row" :span="6">
          <div class="inputPart">
            <a-col class="gutter-row" :span="6">
              <div class="inputName">产品编号：</div>
            </a-col>
            <a-col class="gutter-row" :span="18">
              <a-input placeholder="请输入产品编号" v-model="productId" />
            </a-col>
          </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
            <div class="inputName">产品名称 ：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-input placeholder="请输入产品名称" v-model="productName"/>
          </a-col>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
            <div class="inputName">shopify ID ：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-input placeholder="请输入shopify ID" v-model="shopifyId"/>
          </a-col>
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
            <div class="inputName"> 最大成本价：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-input placeholder="请输入最大成本价" v-model="costPiceMax"/>
          </a-col>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
            <div class="inputName"> 最小成本价：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-input placeholder="请输入最小成本价" v-model="costPiceMin"/>
          </a-col>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
            <div class="inputName"> 最大零售价：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-input placeholder="请输入最大零售价" v-model="costPiceMax"/>
          </a-col>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
            <div class="inputName"> 最小零售价：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-input placeholder="请输入最小零售价" v-model="costPiceMin"/>
          </a-col>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
            <div class="inputName">类别 ：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-input placeholder="请输入产品CP"/>
          </a-col>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
            <div class="inputName">基础价格 ：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-input placeholder="请输入产品CP"/>
          </a-col>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
            <div class="inputName">最终价格 ：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-input placeholder="请输入产品CP"/>
          </a-col>
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
            <div class="inputName">状态：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange">
              <a-select-option value="true">是</a-select-option>
              <a-select-option value="false">否</a-select-option>
            </a-select>
          </a-col>
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-row>
              <a-col class="gutter-row" :span="6">
                <a-button type="primary" @click="search_product(search_data)">搜索</a-button>
              </a-col>
              <a-col class="gutter-row" :span="6">
                <a-button type="primary" @click="choseWhich('/productAdd','新增产品')">新增</a-button>
              </a-col>
              <a-col class="gutter-row" :span="6">
                <a-button type="primary">导出</a-button>
              </a-col>
            </a-row>
          </a-col>
        </div>
      </a-col>
    </a-row>
    <div class="hrLine"></div>
    <a-table :columns="columns" :dataSource="productListData" :pagination="pagination"  :loading="loading"  @change="handleTableChange" :scroll="{ x: 1500 }">
          <span slot="action" slot-scope="text, record">
              <a href="javascript:;">修改{{text.id}}</a>
              <a-divider type="vertical" />
              <a href="javascript:;">删除</a>
          </span>
          <span slot="img_" slot-scope="text, record">
              <img :src="text.img_url" alt="" height="32px;" style="border:1px solid #ccc;">
          </span>
    </a-table>
  </div>
</template>
<script>
    import router from '../../router';
    import store from '../../store'
    const columns = [
        {title: '操作', key: 'action', fixed: 'left', scopedSlots: { customRender: 'action' },},
        { title: '编号', dataIndex: 'goods_seq', key: 'goods_seq'},
        { title: '商品名称', dataIndex: 'goods_name', key: 'goods_name'},
        { title: '图片', key: 'img_url', scopedSlots: { customRender: 'img_' },},
        { title: '商品编号', dataIndex: 'goods_id', key: 'goods_id'},
        { title: 'shopify ID', dataIndex: 'shopify_id', key: 'shopify_id'},
        { title: '零售价格', dataIndex: 'retail_price', key: 'retail_price'},
        { title: '成本价格', dataIndex: 'cost_price', key: 'cost_price'},
        { title: '创建时间', dataIndex: 'cTime', key: 'cTime'},
        { title: '更新时间', dataIndex: 'uTime', key: 'uTime'},
        { title: '状态', dataIndex: 'status', key: 'status'},

    ];
    const productListData = [];
    export default {
        data() {
            return {
                productListData,
                columns,
                loading: false,
                pagination:{
                    defaultPageSize:10,
                    total:1,
                }
                ,fabricList:[]
                ,search_data:{
                    productId:''
                    ,productName:''
                    ,status:''
                    ,shopifyId:''
                    ,costPiceMax:''
                    ,costPiceMin:''
                    ,retailPriceMax:''
                    ,retailPriceMin:''
                    ,createTimeMax:''
                    ,createTimeMin:''
                    ,pageSize:'10'
                }
            }
        },
        methods: {
            handleChange(value) {
                console.log(`selected ${value}`);
            }
            , choseWhich(url,title){
                router.push(url)
                store.commit('changeStore',{key:'title',val:title});
            }
            // 获取商品列表
            ,getList(data){
                this.loading = true
                this.$post('/product/getProductListPage',data).then((reData)=>{
                    this.productListData=reData.data.dataList
                    this.pagination.total=reData.data.page.totalResultSize
                    this.loading = false
                })
            }
            ,handleTableChange(pagination){
                console.log(pagination.defaultPageSize)
                this.getList({page:pagination.current,page_size:pagination.defaultPageSize})
            }
            //搜索产品
            ,search_product(data){
                let vm = this;
                this.$post('/product/getProductListPage',data).then((reData)=>{
                    this.productListData=reData.data.dataList
                    this.pagination.total=reData.data.page.totalResultSize
                    this.loading = false
                })
            }

        },
        mounted() {
            var vm = this
            // vm.getProductList();
            store.commit('changeStore',{key:'title',val:'产品列表'});
            this.getList({page:1,page_size:vm.pagination.defaultPageSize})
            // this.getFabricList()
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
</style>