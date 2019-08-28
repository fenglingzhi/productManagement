<template>
  <div class="producetList">
    <a-row>
      <a-col class="gutter-row" :span="6">
          <div class="inputPart">
            <a-col class="gutter-row" :span="8">
              <div class="inputName">产品SKU：</div>
            </a-col>
            <a-col class="gutter-row" :span="16">
              <a-input placeholder="请输入产品编号" v-model="search_data.product_code" />
            </a-col>
          </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="8">
            <div class="inputName">产品名称 ：</div>
          </a-col>
          <a-col class="gutter-row" :span="16">
            <a-input placeholder="请输入产品名称" v-model="search_data.name"/>
          </a-col>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="8">
            <div class="inputName">状态：</div>
          </a-col>
          <a-col class="gutter-row" :span="16">
            <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange">
              <a-select-option value="">请选择</a-select-option>
              <a-select-option value="1">是</a-select-option>
              <a-select-option value="0">否</a-select-option>
            </a-select>
          </a-col>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="8">
            <div class="inputName">分类：</div>
          </a-col>
          <a-col :span="16">
            <a-tree-select
                    style="width: 100%"
                    :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                    :treeData="treeData"
                    placeholder='选择分类'
                    treeDefaultExpandAll
                    allowClear
                    @change="selectTreeValue"
            ></a-tree-select>
          </a-col>
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="8">
            <div class="inputName"> 创建时间：</div>
          </a-col>
          <a-col class="gutter-row" :span="16">
            <a-range-picker @change="onChange" />
          </a-col>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="8">
            <div class="inputName"> 成本价：</div>
          </a-col>
          <a-col class="gutter-row" :span="7">
            <a-input placeholder="最大成本价" v-model="search_data.costPiceMax"/>
          </a-col>
          <a-col class="gutter-row" :span="2" style="text-align: center">
            —
          </a-col>
          <a-col class="gutter-row" :span="7">
            <a-input placeholder="最小成本价" v-model="search_data.costPiceMin"/>
          </a-col>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="8">
            <div class="inputName"> 零售价：</div>
          </a-col>
          <a-col class="gutter-row" :span="7">
            <a-input placeholder="最大零售价" v-model="search_data.retailPriceMax"/>
          </a-col>
          <a-col class="gutter-row" :span="2" style="text-align: center">
            —
          </a-col>
          <a-col class="gutter-row" :span="7">
            <a-input placeholder="最小零售价" v-model="search_data.retailPriceMin"/>
          </a-col>
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="8">
          </a-col>
          <a-col class="gutter-row" :span="16">
            <a-row>
              <a-col class="gutter-row" :span="10">
                <a-button type="primary" @click="add_product()">新增</a-button>
              </a-col>
              <a-col class="gutter-row" :span="10">
                <a-button type="primary" @click="search_product(search_data)">搜索</a-button>
              </a-col>
              <a-col class="gutter-row" :span="6">
                <!--<a-button type="primary">导出</a-button>-->
              </a-col>
            </a-row>
          </a-col>
        </div>
      </a-col>
    </a-row>
    <div class="hrLine"></div>
    <div>
      <a-table :columns="columns"
               :dataSource="productListData"
               :pagination="pagination"
               :loading="loading"
               align="center"
               @change="handleTableChange"
               :scroll="{ x: 1500 }">
          <span slot="action" slot-scope="text, record">
              <a @click="edit(record.product_id)">修改</a>
              <a-divider type="vertical"></a-divider>
              <a-popconfirm
                    v-if="productListData.length"
                    title="请确认删除"
                    @confirm="() => deleteProduct({product_id:record.product_id})">
                <a @click="">删除</a>
              </a-popconfirm>
          </span>
        <span slot="img_" slot-scope="text, record">
              <img :src="text.image_url" @click="showPic(record.image_url)" alt="" height="60px;" style="border:1px solid #ccc;" v-if="text.image_url !== ''" >
          </span>
        <a slot="active" slot-scope="text, record" style="text-align: center">
          <a-icon type="check" style="color: green" v-if="text === '1'" @click="change_active({product_id:record.product_id,active:'0'})"></a-icon>
          <a-icon type="close" style="color: red" v-if="text === '0'" @click="change_active({product_id:record.product_id,active:'1'})"></a-icon>
        </a>
        <span slot="product_type" slot-scope="text, record" style="text-align: center">
          <span v-if="text === '0'">一般商品</span>
          <span v-if="text === '1'">已存在商品</span>
          <span v-if="text === '2'">虚拟商品</span>
        </span>
        <span slot="position" slot-scope="text, record" style="text-align: center">
          <a-input v-model="record.position"
                   @blur="change_position({position:record.position,product_id:record.product_id,category_id:search_data.category_id})"
                   style="text-align: center;width: 100px;"></a-input>
        </span>
      </a-table>
    </div>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script>
    import router from '../../router';
    import store from '../../store'
    const columns = [
        {title: '操作', key: 'action', scopedSlots: { customRender: 'action' },},
        { title: '商品ID', dataIndex: 'product_id', key: 'product_id'},
        { title: '商品名称', dataIndex: 'name', key: 'name'},
        { title: '图片',  key: 'image_url',scopedSlots: { customRender: 'img_' },},
        { title: '商品类型', dataIndex: 'product_type', key: 'product_type',scopedSlots: { customRender: 'product_type' },},
        { title: 'upc码', dataIndex: 'upc', key: 'upc'},
        { title: '商品SKU码', dataIndex: 'product_code', key: 'product_code'},
        { title: '商品库存', dataIndex: 'good_qty', key: 'good_qty'},
        { title: '添加时间', dataIndex: 'add_date', key: 'add_date'},
        { title: '是否在售', dataIndex: 'active', key: 'active', align: 'center' ,scopedSlots: { customRender: 'active' },},
        { title: '折扣价格', dataIndex: 'sale_price', key: 'sale_price'},
        { title: '零售价格', dataIndex: 'retail_price', key: 'retail_price'},
        { title: '原价', dataIndex: 'cost_price', key: 'cost_price'},
        { title: '排序', dataIndex: 'position', key: 'position', align: 'center' ,scopedSlots: { customRender: 'position' },},
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
                    ,sale_price:''
                    ,retail_price:''
                    ,cost_price:''
                    ,image_url:''
                    ,good_qty:''
                    ,category_id: '1'
                }
                ,previewImage:''
                ,previewVisible:false
                ,treeData:[]
            }
        },
        methods: {
            //状态选择
            handleChange(value) {
                console.log(`selected ${value}`);
                this.search_data.active = value
            }
            //商品排序
            ,change_position(data){
                this.$post('/productCategory/updateProductCategoryPosition',data).then((reData)=>{
                    console.log(reData)
                    if(reData.code == '0'){
                        this.getList({currentPage:this.pagination.current,page_size:this.pagination.defaultPageSize,category_id:this.search_data.category_id})
                    }
                })
            }
            //图片展示
            ,showPic(url){
                this.previewImage=url
                this.previewVisible=true

            }
            //图片展示取消
            ,handleCancel () {
                this.previewVisible = false
            }
            //选择树values
            ,selectTreeValue(value){
                this.search_data.category_id = value
                console.log(value)
            }
            //获取树形分类
            ,getTreeList(){
                this.$post('/category/getAllCategoryTree',{lang_id:store.state.langId}).then((reData)=>{
                    this.treeData = reData.data
                    // this.treeData = JSON.parse(JSON.stringify(reData.data).toString())
                    this.treeData.forEach(function (v,i) {
                        v.value = v.value.toString();
                        v.children.forEach(function (value) {
                            value.value = value.value.toString();
                        })
                    });
                })
            }
            //新增商品
            ,add_product(){
                store.commit('changeStore',{key:'addProductContent',val:'productAddInformatica'});
                store.commit('changeStore',{key:'addProductCurrent',val:'0'});
                store.commit('changeStore',{key:'goods_id',val:''});
                router.push('/productAdd')
                store.commit('changeStore',{key:'isEdit',val:false});
                store.commit('changeStore',{key:'isEditCombin',val:false});

            }
            // 获取商品列表
            ,getList(data){
                this.loading = true;
                this.$post('/product/getProductListPage',data).then((reData)=>{
                    this.productListData=reData.data.dataList
                    this.pagination.total=reData.data.page.totalResultSize
                    this.loading = false
                })
            }
            //表格分页
            ,handleTableChange(pagination){
                console.log(pagination.defaultPageSize)
                this.getList({currentPage:pagination.current,page_size:pagination.defaultPageSize,category_id:this.search_data.category_id})
            }
            //搜索产品
            ,search_product(data){
                this.$post('/product/getProductListPage',data).then((reData)=>{
                    if(reData.code === '0'){
                        this.productListData=reData.data.dataList
                        this.pagination.total=reData.data.page.totalResultSize
                        this.loading = false
                        this.$notification.open({
                            message: reData.message,
                        });
                    } else {
                        this.$notification.open({
                            message: reData.message,
                        });
                    }
                })
            }
            //编辑
            ,edit(id) {
                store.commit('changeStore',{key:'addProductContent',val:'productAddInformatica'});
                store.commit('changeStore',{key:'addProductCurrent',val:'0'});
                let data={
                    product_id:id,
                    lang_id:this.$store.state.langId
                }
                this.$post('/product/getProductInfoById',data).then((reData)=>{
                    store.commit('changeStore',{key:'oldData',val:reData.data});
                    store.commit('changeStore',{key:'goods_id',val:id});
                    store.commit('changeStore',{key:'isEdit',val:true});
                    router.push('/productAdd')

                })
            }
            //时间选择
            ,onChange(date, dateString) {
                this.search_data.createTime = dateString.slice(0,2)
            }
            //更改商品状态
            ,change_active(data){
                this.$post('/product/editDisableProduct',data).then((reData)=>{
                    if(reData.code === '0'){
                        this.getList({currentPage:this.pagination.current,page_size:this.pagination.defaultPageSize,category_id:this.search_data.category_id});
                    }
                })
            }
            //删除商品
            ,deleteProduct(data){
                this.$post('/product/deleteProduct',data).then((reData)=>{
                    if(reData.code === '0'){
                        this.getList({currentPage:this.pagination.current,page_size:this.pagination.defaultPageSize,category_id:this.search_data.category_id});
                        this.$notification.open({
                            message: reData.message,
                        });
                    } else {
                        this.$notification.open({
                            message: reData.message,
                        });
                    }
                })
            }
        },
        mounted() {
            var vm = this
            // store.commit('changeStore',{key:'title',val:'产品列表'});
            vm.getList({currentPage:1,page_size:vm.pagination.defaultPageSize,category_id:this.search_data.category_id})
            vm.getTreeList();
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