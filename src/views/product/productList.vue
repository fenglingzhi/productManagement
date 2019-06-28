<template>
  <div class="producetList">
    <a-row>
      <a-col class="gutter-row" :span="6">
          <div class="inputPart">
            <a-col class="gutter-row" :span="6">
              <div class="inputName">产品编号：</div>
            </a-col>
            <a-col class="gutter-row" :span="18">
              <a-input placeholder="请输入产品编号" v-model="search_data.product_code" />
            </a-col>
          </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
            <div class="inputName">产品名称 ：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-input placeholder="请输入产品名称" v-model="search_data.name"/>
          </a-col>
        </div>
      </a-col>
      <!--<a-col class="gutter-row" :span="6">-->
        <!--<div class="inputPart">-->
          <!--<a-col class="gutter-row" :span="6">-->
            <!--<div class="inputName">shopify ID ：</div>-->
          <!--</a-col>-->
          <!--<a-col class="gutter-row" :span="18">-->
            <!--<a-input placeholder="请输入shopify ID" v-model="search_data.shopifyId"/>-->
          <!--</a-col>-->
        <!--</div>-->
      <!--</a-col>-->
        <a-col class="gutter-row" :span="6">
            <div class="inputPart">
                <a-col class="gutter-row" :span="6">
                    <div class="inputName"> 商品创建时间：</div>
                </a-col>
                <a-col class="gutter-row" :span="18">
                    <a-range-picker @change="onChange" />
                </a-col>
            </div>
        </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
            <div class="inputName">状态：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange">
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
            <div class="inputName"> 最大成本价：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-input placeholder="请输入最大成本价" v-model="search_data.costPiceMax"/>
          </a-col>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
            <div class="inputName"> 最小成本价：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-input placeholder="请输入最小成本价" v-model="search_data.costPiceMin"/>
          </a-col>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
            <div class="inputName"> 最大零售价：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-input placeholder="请输入最大零售价" v-model="search_data.retailPriceMax"/>
          </a-col>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
            <div class="inputName"> 最小零售价：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-input placeholder="请输入最小零售价" v-model="search_data.retailPriceMin"/>
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
    <a-table :columns="columns"
             :dataSource="productListData"
             :pagination="pagination"
             :loading="loading"
             @change="handleTableChange"
             :rowSelection="rowSelection"
             :scroll="{ x: 1500 }">
          <span slot="action" slot-scope="text, record">
              <a href="javascript:;">修改{{text.id}}</a>
              <a-divider type="vertical" />
              <!--<a @click="delete_product({productId:'',status:''})">删除</a>-->
              <a-popconfirm
                    v-if="productListData.length"
                    title="Sure to delete?"
                    @confirm="() => delete_product(columns)">
                <a href="javascript:;">Delete</a>
              </a-popconfirm>
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
        { title: '商品ID', dataIndex: 'product_id', key: 'product_id'},
        { title: '商品名称', dataIndex: 'name', key: 'name'},
        { title: '商品类型', dataIndex: 'product_type', key: 'product_type'},
        { title: '商品简介', dataIndex: 'description_short', key: 'description_short'},
        { title: 'upc码', dataIndex: 'upc', key: 'upc'},
        { title: '商品SKU码', dataIndex: 'product_code', key: 'product_code'},
        { title: '商品详情', dataIndex: 'description', key: 'description'},
        { title: '添加时间', dataIndex: 'add_date', key: 'add_date'},
        { title: '是否在售', dataIndex: 'active', key: 'active'},
        // { title: '编号', dataIndex: 'goods_seq', key: 'goods_seq'},
        // { title: '商品名称', dataIndex: 'goods_name', key: 'goods_name'},
        // { title: '图片', key: 'img_url', scopedSlots: { customRender: 'img_' },},
        // { title: '商品编号', dataIndex: 'goods_id', key: 'goods_id'},
        // { title: 'shopify ID', dataIndex: 'shopify_id', key: 'shopify_id'},
        // { title: '零售价格', dataIndex: 'retail_price', key: 'retail_price'},
        // { title: '成本价格', dataIndex: 'cost_price', key: 'cost_price'},
        // { title: '创建时间', dataIndex: 'cTime', key: 'cTime'},
        // { title: '更新时间', dataIndex: 'uTime', key: 'uTime'},
        // { title: '状态', dataIndex: 'status', key: 'status'},
    ];
    const productListData = [];
    //表格复选框
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
    };
    export default {
        data() {
            return {
                productListData,
                columns,
                rowSelection,
                loading: false,
                pagination:{
                    defaultPageSize:10,
                    total:1,
                }
                ,fabricList:[]
                ,search_data:{
                    product_code:''
                    ,name:''
                    ,active:''
                    ,shopifyId:''
                    ,costPiceMax:''
                    ,costPiceMin:''
                    ,retailPriceMax:''
                    ,retailPriceMin:''
                    ,createTime:[]
                    ,pageSize:'10'
                }
            }
        },
        methods: {
            //状态选择
            handleChange(value) {
                console.log(`selected ${value}`);
                this.search_data.active = value
            }
            ,choseWhich(url,title){
                router.push(url)
                store.commit('changeStore',{key:'title',val:title});
            }
            // 获取商品列表
            ,getList(data){
                this.loading = true
                this.$post('/product/getProductListPage',data).then((reData)=>{
                    console.log(reData.data.dataList)
                    this.productListData=reData.data.dataList
                    this.pagination.total=reData.data.page.totalResultSize
                    this.loading = false
                })
            }
            //表格分页
            ,handleTableChange(pagination){
                console.log(pagination.defaultPageSize)
                this.getList({page:pagination.current,page_size:pagination.defaultPageSize})
            }
            //搜索产品
            ,search_product(data){
                console.log('111111111111',data)
                let vm = this;
                this.$post('/product/getProductListPage',data).then((reData)=>{
                    this.productListData=reData.data.dataList
                    this.pagination.total=reData.data.page.totalResultSize
                    this.loading = false
                })
            }
            //时间选择
            ,onChange(date, dateString) {
                this.search_data.createTime = dateString.slice(0,2)
                console.log('22222222',this.search_data.createTime)
            }
            //删除产品
            ,delete_product (key,data) {
                // this.$post('/product/deleteProduct',data).then((reData)=>{
                //     this.productListData=reData.data.dataList
                //     this.pagination.total=reData.data.page.totalResultSize
                //     this.loading = false
                // })
                // const productListData = [...this.productListData]
                // this.productListData = productListData.filter(item => item.key !== key)
                console.log('sdfasdfasdf',this.productListData)
            },

        },
        mounted() {
            var vm = this
            // vm.getProductList();
            store.commit('changeStore',{key:'title',val:'产品列表'});
            vm.getList({page:1,page_size:vm.pagination.defaultPageSize})
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