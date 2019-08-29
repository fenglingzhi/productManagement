<template>
    <div class="customerAddress">
        <a-row>
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="8">
                        <div class="inputName"> Cart ID：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="16">
                        <a-input placeholder="请输入购物车ID" v-model="addCustomerAddressData.cart_id" />
                    </a-col>
                </div>
            </a-col>
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="8">
                        <div class="inputName"> 订单ID：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="16">
                        <a-input placeholder="请输入订单号ID" v-model="addCustomerAddressData.order_id" />
                    </a-col>
                </div>
            </a-col>
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="8">
                        <div class="inputName">Email ：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="16">
                        <a-input placeholder="请输入客户email" v-model="addCustomerAddressData.email"/>
                    </a-col>
                </div>
            </a-col>
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="8">
                        <div class="inputName">Cart 金额 ：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="16">
                        <a-input placeholder="请输入购物车金额" v-model="addCustomerAddressData.total_amount"/>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="8">
                        <div class="inputName"> 注册时间：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="16">
                        <a-range-picker @change="onChange" />
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
                                <a-button type="primary" @click="search_product(addCustomerAddressData)">搜索</a-button>
                            </a-col>
                        </a-row>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <div>
            <a-table :columns="columns"
                     :dataSource="productListData"
                     :pagination="pagination"
                     :loading="loading"
                     align="center"
                     @change="handleTableChange">
              <span slot="action" slot-scope="text, record">
                  <a @click="searchFun({cart_id:record.cart_id,lang_id:$store.state.langId})">查看</a>
              </span>
                <span slot="img_" slot-scope="text, record">
                  <img :src="text.image_url" alt="" height="32px;" style="border:1px solid #ccc;" v-if="text.image_url !== ''">
              </span>
            </a-table>
        </div>
        <div class="updateCustomerAddress">
            <a-modal
                    title="查看客户购物车"
                    v-model="visible_update"
                    @ok="submitAddressUpdate"
            >
                <a-card title="购物车信息"
                        :bordered="false"
                        headStyle="padding: 0;font-size: 16px;"
                        bodyStyle="padding: 15px;"
                        style="margin-top: -20px;font-size: 14px;">
                    <a-row>
                        <a-col :span="12">
                            <p>添加时间：{{customerCartInfo.cartInfo.add_date}}</p>
                        </a-col>
                        <a-col :span="12">
                            <p>平台类型：{{customerCartInfo.cartInfo.mobile_type}}</p>
                        </a-col>
                        <a-col :span="12">
                            <p>币种标识：{{customerCartInfo.cartInfo.sign}}</p>

                        </a-col>
                        <a-col :span="12">
                            <p>收货地址id：{{customerCartInfo.cartInfo.address_delivery_id}}</p>

                        </a-col>
                        <a-col :span="12">
                            <p>物流id：{{customerCartInfo.cartInfo.carrier_id}}</p>

                        </a-col>
                        <a-col :span="12">
                            <p>购物车id：{{customerCartInfo.cartInfo.cart_id}}</p>

                        </a-col>
                        <a-col :span="12">
                            <p>更新时间：{{customerCartInfo.cartInfo.upd_date}}</p>

                        </a-col>
                        <a-col :span="12">
                            <p>发票地址id：{{customerCartInfo.cartInfo.address_invoice_id}}</p>

                        </a-col>
                        <a-col :span="12">
                            <p>是否启用小数点：{{customerCartInfo.cartInfo.decimals}}</p>

                        </a-col>
                        <a-col :span="12">
                            <p>客户id：{{customerCartInfo.cartInfo.customer_id}}</p>

                        </a-col>
                        <a-col :span="12">
                            <p>汇率：{{customerCartInfo.cartInfo.conversion_rate}}</p>

                        </a-col>
                        <a-col :span="12">
                            <p>订单id：{{customerCartInfo.cartInfo.order_id}}</p>

                        </a-col>
                        <a-col :span="12">
                            <p>币种id：{{customerCartInfo.cartInfo.currency_id}}</p>

                        </a-col>
                        <a-col :span="12">
                            <p>下单时间：{{customerCartInfo.cartInfo.order_date}}</p>
                        </a-col>
                    </a-row>
                </a-card>
                <a-card title="客户详情信息"
                        :bordered="false"
                        headStyle="padding: 0;font-size: 16px;"
                        bodyStyle="padding: 15px;"
                        style="margin-top: -20px;font-size: 14px;">
                    <a-row>
                        <a-col :span="12">
                            <p>有效订单设置：{{customerCartInfo.customerDetail.valid_order_sum}}</p>
                        </a-col>
                        <a-col :span="12">
                            <p>注册以来所有花销：{{customerCartInfo.customerDetail.total_amount}}</p>
                        </a-col>
                        <a-col :span="12">
                            <p>最后下单时间：{{customerCartInfo.customerDetail.Account_registration_date}}</p>
                        </a-col>
                        <a-col :span="12">
                            <p>客户id：{{customerCartInfo.customerDetail.customer_id}}</p>
                        </a-col>
                    </a-row>
                </a-card>
                <a-card title="产品详情信息"
                        :bordered="false"
                        headStyle="padding: 0;font-size: 16px;"
                        bodyStyle="padding: 15px;"
                        style="margin-top: -20px;font-size: 14px;">
                    <a-row v-for="item in customerCartInfo.productDetail">
                        <!--{{item}}-->
                        <a-col :span="12">
                            <p>库存：{{item.good_qty}}</p>
                        </a-col>
                        <a-col :span="12">
                            <p>购物车id：{{item.cart_id}}</p>
                        </a-col>
                        <a-col :span="12">
                            <p>数量：{{item.quantity}}</p>
                        </a-col>
                        <a-col :span="12">
                            <p>商品数量id：{{item.product_unit_id}}</p>
                        </a-col>
                        <!--<a-col :span="12">-->
                            <!--<p>：{{customerCartInfo.cartInfo.active}}</p>-->
                        <!--</a-col>-->
                        <!--<a-col :span="12">-->
                            <!--<p>：{{customerCartInfo.cartInfo.bad_qty}}</p>-->
                        <!--</a-col>-->
                        <!--<a-col :span="12">-->
                            <!--<p>：{{customerCartInfo.cartInfo.id}}</p>-->
                        <!--</a-col>-->
                        <a-col :span="12">
                            <p>折扣价（实际售价）：{{item.sale_price}}</p>
                        </a-col>
                        <!--<a-col :span="12">-->
                            <!--<p>：{{customerCartInfo.cartInfo.retail_price}}</p>-->
                        <!--</a-col>-->
                        <!--<a-col :span="12">-->
                            <!--<p>：{{customerCartInfo.cartInfo.cost_price}}</p>-->
                        <!--</a-col>-->
                    </a-row>
                </a-card>
                <a-card title="订单总价"
                        :bordered="false"
                        headStyle="padding: 0;font-size: 16px;"
                        bodyStyle="padding: 15px;"
                        style="margin-top: -20px;font-size: 14px;">
                    <a-row>
                        <a-col :span="12">
                            <p>总价：{{customerCartInfo.total_amount}}</p>
                        </a-col>
                    </a-row>
                </a-card>
            </a-modal>
        </div>
    </div>
</template>
<script>
    import router from '../../router';
    import store from '../../store'
    const columns = [
        {title: '操作', key: 'action', scopedSlots: { customRender: 'action' },},
        { title: '购物车id', dataIndex: 'cart_id', key: 'cart_id'},
        { title: '订单id', dataIndex: 'order_id', key: 'order_id'},
        { title: '用户邮件', dataIndex: 'email', key: 'email'},
        { title: '总价', dataIndex: 'total_amount', key: 'total_amount'},
        { title: '添加时间', dataIndex: 'add_date', key: 'add_date'},
        // { title: '更新时间', dataIndex: 'upd_date', key: 'upd_date'},
        // { title: '沙特身份证', dataIndex: 'national_id', key: 'national_id'},
        // { title: '平台类型', dataIndex: 'mobile_type', key: 'mobile_type'},
        // { title: '货币sign', dataIndex: 'sign', key: 'sign'},
        // { title: '语言id', dataIndex: 'lang_id', key: 'lang_id'},
        // { title: '小数点保留几位', dataIndex: 'decimals', key: 'decimals'},
        // { title: '客户id', dataIndex: 'customer_id', key: 'customer_id'},
        // { title: '汇率', dataIndex: 'conversion_rate', key: 'conversion_rate'},
        // { title: '物流id', dataIndex: 'carrier_id', key: 'carrier_id'},
        // { title: '币种id', dataIndex: 'currency_id', key: 'currency_id'},
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
                visible_add: false,
                visible_edit: false,
                visible_update:false,
                productListData,
                columns,
                rowSelection,
                loading: false,
                pagination:{
                    currentPage:'1',
                    defaultPageSize:10,
                    total:1,
                }
                ,addCustomerAddressData:{
                    phone:'',
                    email:'',
                    national_id:'',
                    alias:'',
                    firstname:'',
                    lastname:'',
                    company:'',
                    address1:'',
                    address2:'',
                    city:'',
                    postcode:'',
                    state_id:'',
                    country_id:'',
                    other:'',
                    address_id:'',
                    birthday:'',
                    order_id:'',
                    cart_id:'',
                    total_amount:'',
                }
                ,country:[]
                ,state:[]
                ,state_flag:false
                ,city:[]
                ,city_flag:false
                ,customerCartInfo:{
                    cartInfo:{
                        add_date:'',
                        mobile_type:'',
                        sign:'',
                        address_delivery_id:'',
                        carrier_id:'',
                        cart_id:'',
                        upd_date:'',
                        address_invoice_id:'',
                        decimals:'',
                        customer_id:'',
                        conversion_rate:'',
                        order_id:'',
                        currency_id:'',
                        order_date:'',
                        state_name:'',
                    },
                    customerDetail:{
                        valid_order_sum:'',
                        total_amount:'',
                        Account_registration_date:'',
                        customer_id:'',
                    },
                    total_amount:'',
                    productDetail:{
                        // productDetail:'',
                        // cart_id:'',
                        // quantity:'',
                        // product_unit_id:'',
                        // active:'',
                        // bad_qty:'',
                        // id:'',
                        // sale_price:'',
                        // retail_price:'',
                        // cost_price:'',
                    }
                }
            }
        },
        methods: {
            //产看购物车详情
            searchFun(data){
                this.$post('/cart/getCartDetailInfo',data).then((reData)=>{
                    this.customerCartInfo.cartInfo = reData.data.cartInfo
                    this.customerCartInfo.customerDetail = reData.data.customerDetail
                    this.customerCartInfo.total_amount = reData.data.total_amount
                    this.customerCartInfo.productDetail = reData.data.productDetail

                    console.log(this.customerCartInfo.customerDetail )
                })
                this.visible_update = true;
            }
            //时间选择
            ,onChange(date, dateString) {
                console.log(dateString)
                this.addCustomerInfo.birthday = dateString
            }
            //搜索产品
            ,search_product(){
                this.$post('/cart/getCartInfoPage',{
                    lang_id:store.state.langId,
                    currentPage:this.pagination.currentPage,
                    pageSize:this.addCustomerAddressData.defaultPageSize,
                    email:this.addCustomerAddressData.email,
                    birthday:this.addCustomerAddressData.birthday,
                    order_id:this.addCustomerAddressData.order_id,
                    cart_id:this.addCustomerAddressData.cart_id,
                    total_amount:this.addCustomerAddressData.total_amount,
                }).then((reData)=>{
                    this.productListData=reData.data.dataList
                    this.pagination.currentPage = reData.data.page.currentPage
                    this.pagination.total=reData.data.page.totalResultSize
                    this.loading = false
                })
            }
            //新增地址
            ,add_product(){
                let vm = this;
                this.visible_add = true
                this.$post('/country/getCountryListPage',{lang_id:store.state.langId,pageSize:'10000'}).then((reData)=>{
                    vm.country = reData.data.dataList.slice(0)
                });
            }
            //国家选择
            ,handleChangeCountry(value) {
                this.addCustomerAddressData.country_id = value
                this.$post('/state/getStateListPage',{country_id:value,pageSize:'10000'}).then((reData)=>{
                    if(reData.data.dataList == null){
                        this.state_flag = true
                        this.city_flag = true
                    } else {
                        this.state_flag = false
                        this.state = reData.data.dataList.slice(0)
                    }
                });
            }
            //州选择
            ,handleChangeState(value) {
                this.addCustomerAddressData.state_id = value
                this.$post('/city/getCityListPage',{state_id:value,pageSize:'10000'}).then((reData)=>{
                    if(reData.data.dataList == null){
                        this.city_flag = true
                    } else {
                        this.city_flag = false
                        this.city = reData.data.dataList.slice(0)
                    }
                });
            }
            //城市选择
            ,handleChangeCity(value) {
                console.log(`selected ${value}`);
                this.addCustomerAddressData.city = value
            }
            //编辑
            ,editFun(langId,genderId) {
                this.$post('/gender/getGenderList',{langId:langId,genderId:genderId}).then((reData)=>{
                    this.addCustomerGenderData.name = reData.data[0].name;
                    this.addCustomerGenderData.genderId = reData.data[0].gender_id.toString();
                    this.addCustomerGenderData.langId = reData.data[0].lang_id;
                });
                console.log(this.addCustomerGenderData)
                this.visible_edit = true;
            }
            // 获取购物车列表
            ,getList(data){
                this.loading = true;
                this.$post('/cart/getCartInfoPage',data).then((reData)=>{
                    this.productListData=reData.data.dataList;
                    this.pagination.total=reData.data.page.totalResultSize
                    this.loading = false
                })
            }
            //表格分页
            ,handleTableChange(pagination){
                console.log(pagination.defaultPageSize)
                this.getList({currentPage:pagination.current,page_size:pagination.defaultPageSize})
            }
            //删除商品
            ,deleteFun(data){
                this.$post('/address/removeAddressInfo',data).then((reData)=>{
                    if(reData.code === '0'){
                        this.getList({lang_id:store.state.langId});
                    }
                })
            }
            //提交新增地址
            ,submitAddress() {
                console.log(this.addCustomerAddressData)
                this.$post('/address/addAddressInfo',this.addCustomerAddressData).then((reData)=>{
                    if(reData.code === '0'){
                        this.visible_add = false
                        this.getList({lang_id:store.state.langId});
                    } else {
                        this.$message.error(reData.message);
                        // this.visible_add = false
                    }
                })
            },
            //提交更新地址
            submitAddressUpdate() {
                let vm = this;
                console.log(this.addCustomerGenderData)
                // console.log(e);
                // vm.getList({langId:store.state.langId})
                this.$post('/address/updateAddressInfo',this.addCustomerAddressData).then((reData)=>{
                    if(reData.code === '0'){
                        this.visible_update = false
                        this.getList({lang_id:store.state.langId});
                    } else if(reData.code === '10012'){
                        this.$message.error(reData.message);
                        this.visible_update = false
                    }
                })
            },
        },
        mounted() {
            var vm = this
            // store.commit('changeStore',{key:'title',val:'产品列表'});
            vm.getList()
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
    .show_text{
        line-height: 32px;
    }
</style>