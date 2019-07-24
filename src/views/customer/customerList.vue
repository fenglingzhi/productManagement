<template>
  <div class="customerList">
    客户信息
    <div class="hrLine"></div>
    <div>
      <!--<div style="margin-bottom: 16px">-->
        <!--<a-button type="primary">-->
          <!--Reload-->
        <!--</a-button>-->
        <!--<span style="margin-left: 8px">-->
        <!--&lt;!&ndash;<template v-if="hasSelected">&ndash;&gt;-->
          <!--&lt;!&ndash;&lt;!&ndash;{{`Selected ${selectedRowKeys.length} items`}}&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;</template>&ndash;&gt;-->
      <!--</span>-->
      <!--</div>-->
      <a-table :columns="columns"
               :dataSource="productListData"
               :pagination="pagination"
               :loading="loading"
               align="center"
               @change="handleTableChange"
               :rowSelection="rowSelection"
               :scroll="{ x: 1500 }">
          <span slot="action" slot-scope="text, record">
              <a @click="edit(record.product_id)">修改{{record.product_id}}</a>

              <a-divider type="vertical"></a-divider>
              <a @click="deleteProduct({product_id:record.product_id})">删除{{record.product_id}}</a>
          </span>
        <span slot="img_" slot-scope="text, record">
              <img :src="text.image_url" alt="" height="32px;" style="border:1px solid #ccc;" v-if="text.image_url !== ''">
          </span>
        <a slot="newsletter" slot-scope="text, record" style="text-align: center">
          <!--{{record}}-->
          <a-icon type="check" style="color: green" v-if="text === '1'" @click="change_active({product_id:record.product_id,active:'0'})"></a-icon>
          <a-icon type="close" style="color: red" v-if="text === '0'" @click="change_active({product_id:record.product_id,active:'1'})"></a-icon>
        </a>
        <a slot="optin" slot-scope="text, record" style="text-align: center">
          <!--{{record}}-->
          <a-icon type="check" style="color: green" v-if="text === '1'" @click="change_active({product_id:record.product_id,active:'0'})"></a-icon>
          <a-icon type="close" style="color: red" v-if="text === '0'" @click="change_active({product_id:record.product_id,active:'1'})"></a-icon>
        </a>
      </a-table>
    </div>
  </div>
</template>
<script>
    import router from '../../router';
    import store from '../../store'
    const columns = [
        {title: '操作', key: 'action', scopedSlots: { customRender: 'action' },},
        { title: '生日', dataIndex: 'birthday', key: 'birthday'},
        { title: '称呼', dataIndex: 'name', key: 'name'},
        { title: '是否接受电子订阅',  key: 'newsletter',scopedSlots: { customRender: 'newsletter' },},
        { title: '名', dataIndex: 'firstname', key: 'firstname'},
        { title: '添加时间', dataIndex: 'add_date', key: 'add_date'},
        { title: '付款最多天数', dataIndex: 'max_payment_days', key: 'max_payment_days'},
        { title: '允许未付金额', dataIndex: 'outstanding_allow_amount', key: 'outstanding_allow_amount'},
        { title: 'cod拒签次数', dataIndex: 'cod_reject', key: 'cod_reject'},
        { title: '是否接受推销', dataIndex: 'optin', key: 'optin', align: 'center' ,scopedSlots: { customRender: 'optin' },},
        { title: '状态', dataIndex: 'active', key: 'active', align: 'center' ,scopedSlots: { customRender: 'optin' },},
        { title: '个人信息的完善', dataIndex: 'completed', key: 'completed'},
        { title: '上一次修改密码时间', dataIndex: 'last_passwd_gen', key: 'last_passwd_gen'},
        { title: '姓', dataIndex: 'lastname', key: 'lastname'},
        { title: '客户风险等级', dataIndex: 'risk_id', key: 'risk_id'},
        { title: '电子邮件', dataIndex: 'email', key: 'email'},
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
                }
            }
        },
        methods: {
            //状态选择
            handleChange(value) {
                console.log(`selected ${value}`);
                this.search_data.active = value
            }
            //新增商品
            ,add_product(){
                store.commit('changeStore',{key:'addProductContent',val:'productAddInformatica'});
                store.commit('changeStore',{key:'addProductCurrent',val:'0'});
                router.push('/productAdd')
                store.commit('changeStore',{key:'isEdit',val:false});

            }
            // 获取商品列表
            ,getList(data){
                this.loading = true;
                this.$post('/customer/getCustomerListPageInfo',data).then((reData)=>{
                    this.productListData=reData.data.dataList
                    this.pagination.total=reData.data.page.totalResultSize
                    this.loading = false
                })
            }
            //表格分页
            ,handleTableChange(pagination){
                console.log(pagination.defaultPageSize)
                this.getList({currentPage:pagination.current,page_size:pagination.defaultPageSize})
            }
            //搜索产品
            ,search_product(data){
                let vm = this;
                // console.log('111111111111111',this.search_data)
                this.$post('/product/getProductListPage',data).then((reData)=>{

                    this.productListData=reData.data.dataList
                    this.pagination.total=reData.data.page.totalResultSize
                    this.loading = false
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
                    router.push('/productAdd')
                    store.commit('changeStore',{key:'goods_id',val:id});
                    store.commit('changeStore',{key:'isEdit',val:true});
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
                        this.getList({page:1,page_size:this.pagination.defaultPageSize});
                    }
                })
            }
            //删除商品
            ,deleteProduct(data){
                this.$post('/product/deleteProduct',data).then((reData)=>{
                    if(reData.code === '0'){
                        this.getList(data);
                    }
                })
            }
        },
        mounted() {
            var vm = this
            store.commit('changeStore',{key:'title',val:'产品列表'});
            vm.getList({currentPage:1,pageSize:vm.pagination.defaultPageSize})
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