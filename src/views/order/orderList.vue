<template>
    <div class="orderList">
        客户信息
        <div class="hrLine"></div>
        <div>
            <a-table :columns="columns"
                     :dataSource="productListData"
                     :pagination="pagination"
                     :loading="loading"
                     align="center"
                     @change="handleTableChange"
                     :rowSelection="rowSelection"
                     :scroll="{ x: 3800 }">
          <span slot="action" slot-scope="text, record">
              <a @click="searchFun({order_id:record.order_id})">查看</a>
          </span>
            </a-table>
        </div>
        <div class="editCustomerGender">
            <a-modal
                    title="查看订单信息"
                    v-model="visible_search"
                    @ok="submitSearch"
                    :destroyOnClose="true"
            >
                <a-card :bordered="false"
                        :headStyle="{'padding': 0,'font-size': '16px','color':'red'}"
                        :bodyStyle="{padding: '15px'}"
                        style="margin-top: -20px;font-size: 14px;">
                    <a-row>
                        <a-col :span="12">
                            <p>添加时间：{{orderListDetail}}</p>
                        </a-col>
                        <!--<a-col :span="12">-->
                            <!--<p>平台类型：{{customerCartInfo.cartInfo.mobile_type}}</p>-->
                        <!--</a-col>-->
                        <!--<a-col :span="12">-->
                            <!--<p>币种标识：{{customerCartInfo.cartInfo.sign}}</p>-->

                        <!--</a-col>-->
                        <!--<a-col :span="12">-->
                            <!--<p>收货地址id：{{customerCartInfo.cartInfo.address_delivery_id}}</p>-->

                        <!--</a-col>-->
                        <!--<a-col :span="12">-->
                            <!--<p>物流id：{{customerCartInfo.cartInfo.carrier_id}}</p>-->

                        <!--</a-col>-->
                        <!--<a-col :span="12">-->
                            <!--<p>购物车id：{{customerCartInfo.cartInfo.cart_id}}</p>-->

                        <!--</a-col>-->
                        <!--<a-col :span="12">-->
                            <!--<p>更新时间：{{customerCartInfo.cartInfo.upd_date}}</p>-->

                        <!--</a-col>-->
                        <!--<a-col :span="12">-->
                            <!--<p>发票地址id：{{customerCartInfo.cartInfo.address_invoice_id}}</p>-->

                        <!--</a-col>-->
                        <!--<a-col :span="12">-->
                            <!--<p>是否启用小数点：{{customerCartInfo.cartInfo.decimals}}</p>-->

                        <!--</a-col>-->
                        <!--<a-col :span="12">-->
                            <!--<p>客户id：{{customerCartInfo.cartInfo.customer_id}}</p>-->

                        <!--</a-col>-->
                        <!--<a-col :span="12">-->
                            <!--<p>汇率：{{customerCartInfo.cartInfo.conversion_rate}}</p>-->

                        <!--</a-col>-->
                        <!--<a-col :span="12">-->
                            <!--<p>订单id：{{customerCartInfo.cartInfo.order_id}}</p>-->

                        <!--</a-col>-->
                        <!--<a-col :span="12">-->
                            <!--<p>币种id：{{customerCartInfo.cartInfo.currency_id}}</p>-->

                        <!--</a-col>-->
                        <!--<a-col :span="12">-->
                            <!--<p>下单时间：{{customerCartInfo.cartInfo.order_date}}</p>-->
                        <!--</a-col>-->
                    </a-row>
                </a-card>
            </a-modal>
        </div>
    </div>
</template>
<script>
    import router from '../../router';
    import store from '../../store';
    import moment from 'moment'
    const columns = [
        {title: '操作',dataIndex: 'action', key: 'action', scopedSlots: { customRender: 'action' },},
        { title: '支付金额(不含税)', dataIndex: 'total_paid_tax_excl', key: 'total_paid_tax_excl'},
        { title: 'cod服务费用', dataIndex: 'total_cod_service', key: 'total_cod_service'},
        { title: 'COD订单', dataIndex: 'is_cod', key: 'is_cod'},
        { title: '优惠卷的折扣金额', dataIndex: 'total_discounts', key: 'total_discounts'},
        { title: '有效单', dataIndex: 'valid', key: 'valid'},
        { title: '包含支付方式优惠后的总金额', dataIndex: 'total_paid_paymethod_incl', key: 'total_paid_paymethod_incl'},
        { title: '总支付金额', dataIndex: 'total_paid', key: 'total_paid'},
        { title: '含税的运费', dataIndex: 'total_shipping_tax_incl', key: 'total_shipping_tax_incl'},
        { title: '不含税的产品总价', dataIndex: 'total_products_wt', key: 'total_products_wt'},
        { title: '运费', dataIndex: 'total_shipping', key: 'total_shipping',},
        { title: '运送国家', dataIndex: 'country_name', key: 'country_name',},
        { title: '支付方式', dataIndex: 'payment', key: 'payment',},
        { title: '货币汇率', dataIndex: 'conversion_rate', key: 'conversion_rate'},
        { title: '客户邮箱', dataIndex: 'email', key: 'email'},
        { title: '包含税的折扣金额', dataIndex: 'total_discounts_tax_incl', key: 'total_discounts_tax_incl'},
        { title: '订单状态', dataIndex: 'order_state_name', key: 'order_state_name'},
        { title: '不包含支付方式优惠后的总金额', dataIndex: 'total_paid_paymethod_excl', key: 'total_paid_paymethod_excl'},
        { title: '当前状态', dataIndex: 'current_state', key: 'current_state'},
        { title: '不含税的运费', dataIndex: 'total_shipping_tax_excl', key: 'total_shipping_tax_excl'},
        { title: '易仓编号', dataIndex: 'ycang_order_id', key: 'ycang_order_id'},
        { title: '追踪代码', dataIndex: 'shipping_number', key: 'shipping_number'},
        { title: '实际收到的钱', dataIndex: 'total_paid_real', key: 'total_paid_real'},
        { title: '支付的折扣百分比', dataIndex: 'paymethod_rate', key: 'paymethod_rate'},
        { title: '包含税的支付金额', dataIndex: 'total_paid_tax_incl', key: 'total_paid_tax_incl'},
        { title: '客户id', dataIndex: 'customer_id', key: 'customer_id'},
        { title: '订单id', dataIndex: 'order_id', key: 'order_id'},
        { title: '产品总价', dataIndex: 'total_products', key: 'total_products'},
        { title: '币种id', dataIndex: 'currency_id', key: 'currency_id'},
        { title: '小数点保留几位', dataIndex: 'round_mode', key: 'round_mode'},
        { title: '不含税的折扣金额', dataIndex: 'total_discounts_tax_excl', key: 'total_discounts_tax_excl'},

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
                visible_search: false,
                loading: false,
                pagination:{
                    defaultPageSize:10,
                    total:1,
                }
                ,fabricList:[]
                ,orderListDetail:{}
            }
        },
        methods: {
            moment,
            //性别
            handleChange(value) {
                console.log(`selected ${value}`);
                this.addCustomerInfo.genderId = value
            }
            //查看详情
            ,searchFun(data){
                this.getListDetail(data);
                this.visible_search = true;
            }
            ,submitSearch(){
                this.visible_search = false;
            }
            // 获取客户信息列表
            ,getList(data){
                this.loading = true;
                this.$post('/order/getOrderInfoPage',data).then((reData)=>{
                    this.productListData=reData.data.dataList
                    this.pagination.total=reData.data.page.totalResultSize
                    this.loading = false
                })
            }
            // 获取客户信息详情
            ,getListDetail(data){
                this.$post('/order/getOrderDetailInfo',data).then((reData)=>{
                    this.orderListDetail = reData.data;
                    // console.log(this.addCustomerInfo.birthday)
                })
            }
            //表格分页
            ,handleTableChange(pagination){
                console.log(pagination.defaultPageSize)
                this.getList({currentPage:pagination.current,page_size:pagination.defaultPageSize})
            }
            //搜索产品
            ,search_product(data){
                this.$post('/product/getProductListPage',data).then((reData)=>{

                    this.productListData=reData.data.dataList
                    this.pagination.total=reData.data.page.totalResultSize
                    this.loading = false
                })
            }
            //时间选择
            ,onChange(date, dateString) {
                console.log(dateString)
                this.addCustomerInfo.birthday = dateString
            }
            //更改商品状态
            ,change_active(data){
                this.$post('/product/editDisableProduct',data).then((reData)=>{
                    if(reData.code === '0'){
                        this.getList({page:1,page_size:this.pagination.defaultPageSize});
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
    .show_text{
        line-height: 32px;
    }
</style>