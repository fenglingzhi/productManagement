<template>
    <div class="orderStatus">
        客户信息
        <div class="hrLine"></div>
        <div>
            <div style="margin: 16px 0">
                <a-button type="primary" @click="add_product()">
                    新增
                </a-button>
            </div>
            <a-table :columns="columns"
                     :dataSource="productListData"
                     :pagination="pagination"
                     :loading="loading"
                     align="center"
                     @change="handleTableChange"
                     :rowSelection="rowSelection"
                     :scroll="{ x: 1600 }">
                      <span slot="action" slot-scope="text, record">
                          {{record.customer_id}}
                          <!--<a @click="searchFun({customer_id:record.customer_id})">查看</a>-->
                          <!--<a-divider type="vertical"></a-divider>-->
                          <a @click="editFun({order_state_id:record.order_state_id,lang_id:record.lang_id})">修改</a>
                          <a-divider type="vertical"></a-divider>
                          <a @click="deleteProduct({order_state_id:record.order_state_id})">删除</a>
                      </span>
                    <a slot="unremoveable" slot-scope="text, record" style="text-align: center">
                        <!--{{record}}-->
                        <a-icon type="check" style="color: green" v-if="text === '1'" @click="change_active({product_id:record.product_id,active:'0'})"></a-icon>
                        <a-icon type="close" style="color: red" v-if="text === '0'" @click="change_active({product_id:record.product_id,active:'1'})"></a-icon>
                    </a>
                    <a slot="shipped" slot-scope="text, record" style="text-align: center">
                        <!--{{record}}-->
                        <a-icon type="check" style="color: green" v-if="text === '1'" @click="change_active({product_id:record.product_id,active:'0'})"></a-icon>
                        <a-icon type="close" style="color: red" v-if="text === '0'" @click="change_active({product_id:record.product_id,active:'1'})"></a-icon>
                    </a>
                    <a slot="paid" slot-scope="text, record" style="text-align: center">
                        <!--{{record}}-->
                        <a-icon type="check" style="color: green" v-if="text === '1'" @click="change_active({product_id:record.product_id,active:'0'})"></a-icon>
                        <a-icon type="close" style="color: red" v-if="text === '0'" @click="change_active({product_id:record.product_id,active:'1'})"></a-icon>
                    </a>
                    <a slot="logable" slot-scope="text, record" style="text-align: center">
                        <!--{{record}}-->
                        <a-icon type="check" style="color: green" v-if="text === '1'" @click="change_active({product_id:record.product_id,active:'0'})"></a-icon>
                        <a-icon type="close" style="color: red" v-if="text === '0'" @click="change_active({product_id:record.product_id,active:'1'})"></a-icon>
                    </a>
                    <a slot="send_email" slot-scope="text, record" style="text-align: center">
                        <!--{{record}}-->
                        <a-icon type="check" style="color: green" v-if="text === '1'" @click="change_active({product_id:record.product_id,active:'0'})"></a-icon>
                        <a-icon type="close" style="color: red" v-if="text === '0'" @click="change_active({product_id:record.product_id,active:'1'})"></a-icon>
                    </a>
            </a-table>
        </div>
        <div class="addCustomerGender">
            <a-modal
                    title="新增订单信息"
                    v-model="visible_add"
                    :destroyOnClose="true"
                    @ok="submitAdd"
            >
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">状态名称：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输入状态名称" v-model="addStatueInfo.name" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">颜色：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输入颜色" v-model="addStatueInfo.color" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">不可删除当前状态：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange_status">
                                <a-select-option  value="0">可删</a-select-option>
                                <a-select-option  value="1">不可删</a-select-option>
                            </a-select>
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">标记为有效订单：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange_order">
                                <a-select-option  value="1">是</a-select-option>
                                <a-select-option  value="0">否</a-select-option>
                            </a-select>
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">标记为运输状态：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange_shipped">
                                <a-select-option  value="1">是</a-select-option>
                                <a-select-option  value="0">否</a-select-option>
                            </a-select>
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">标记为支付状态 ：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange_pay">
                                <a-select-option  value="1">是</a-select-option>
                                <a-select-option  value="0">否</a-select-option>
                            </a-select>
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">发送邮件：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange_sendEmail">
                                <a-select-option  value="1">是</a-select-option>
                                <a-select-option  value="0">否</a-select-option>
                            </a-select>
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart" v-show="addStatueInfo.send_email">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">模板名称名称：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输入模板名称名称" v-model="addStatueInfo.template" />
                        </a-col>
                    </div>
                </a-row>
            </a-modal>
        </div>
        <div class="addCustomerGender">
            <a-modal
                    title="更新订单信息"
                    v-model="visible_edit"
                    :destroyOnClose="false"
                    @ok="submitEdit"
            >
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">状态名称：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输入状态名称" v-model="addStatueInfo.name" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">颜色：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输入颜色" v-model="addStatueInfo.color" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">不可删除当前状态：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange_status" :value="addStatueInfo.unremoveable">
                                <a-select-option  value="0">可删</a-select-option>
                                <a-select-option  value="1">不可删</a-select-option>
                            </a-select>
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">标记为有效订单：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange_order" :value="addStatueInfo.logable">
                                <a-select-option  value="1">是</a-select-option>
                                <a-select-option  value="0">否</a-select-option>
                            </a-select>
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">标记为运输状态：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange_shipped" :value="addStatueInfo.shipped">
                                <a-select-option  value="1">是</a-select-option>
                                <a-select-option  value="0">否</a-select-option>
                            </a-select>
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">标记为支付状态 ：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange_pay" :value="addStatueInfo.paid">
                                <a-select-option  value="1">是</a-select-option>
                                <a-select-option  value="0">否</a-select-option>
                            </a-select>
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">发送邮件：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange_sendEmail" :value="addStatueInfo.send_email">
                                <a-select-option  value="1">是</a-select-option>
                                <a-select-option  value="0">否</a-select-option>
                            </a-select>
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart" v-if="addStatueInfo.send_email">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">模板名称名称：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输入模板名称名称" v-model="addStatueInfo.template" />
                        </a-col>
                    </div>
                </a-row>
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
        { title: '模板名称', dataIndex: 'template', key: 'template'},
        { title: '删除', dataIndex: 'unremoveable', key: 'unremoveable',scopedSlots: { customRender: 'unremoveable' },},
        { title: '标记为运输状态', dataIndex: 'shipped', key: 'shipped',scopedSlots: { customRender: 'shipped' },},
        { title: '颜色', dataIndex: 'color', key: 'color'},
        { title: '标记为支付状态', dataIndex: 'paid', key: 'paid',scopedSlots: { customRender: 'paid' },},
        { title: '状态名称', dataIndex: 'name', key: 'name'},
        { title: '发送邮件', dataIndex: 'send_email', key: 'send_email',scopedSlots: { customRender: 'send_email' },},
        { title: '标记为有效订单', dataIndex: 'logable', key: 'logable',scopedSlots: { customRender: 'logable' },},
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
                dateFormat: 'YYYY/MM/DD',
                visible_add: false,
                visible_edit: false,
                visible_search: false,
                loading: false,
                pagination:{
                    defaultPageSize:10,
                    total:1,
                }
                ,fabricList:[]
                ,genderIdList:[]
                ,addStatueInfo:{
                    lang_id:''
                    ,name:''
                    ,color:''
                    ,unremoveable:''
                    ,logable:''
                    ,shipped:''
                    ,paid:''
                    ,send_email:''
                    ,template:''
                    ,order_state_id:''
                }
            }
        },
        methods: {
            moment,
            //可删除状态
            handleChange_status(value) {
                console.log(`selected ${value}`);
                this.addStatueInfo.unremoveable = value
            }
            //有效订单
            ,handleChange_order(value) {
                console.log(`selected ${value}`);
                this.addStatueInfo.logable = value
            }
            //运输状态
            ,handleChange_shipped(value) {
                console.log(`selected ${value}`);
                this.addStatueInfo.shipped = value
            }
            //支付状态
            ,handleChange_pay(value) {
                console.log(`selected ${value}`);
                this.addStatueInfo.paid = value
            }
            //发送邮件
            ,handleChange_sendEmail(value) {
                console.log(`selected ${value}`);
                this.addStatueInfo.send_email = value
            }
            //新增商品
            ,add_product(){
                this.addStatueInfo.send_email = '';
                this.visible_add = true
            }
            //编辑
            ,editFun(data) {
                // 获取详情
                this.$post('/orderState/getOrderStateInfoOne',data).then((reData)=>{
                    if(reData.code === '0'){
                        console.log(this.addStatueInfo);
                        this.addStatueInfo.lang_id=reData.data.lang_id;
                        this.addStatueInfo.name=reData.data.name;
                        this.addStatueInfo.color=reData.data.color;
                        this.addStatueInfo.unremoveable=reData.data.unremoveable;
                        this.addStatueInfo.logable=reData.data.logable;
                        this.addStatueInfo.shipped=reData.data.shipped;
                        this.addStatueInfo.paid=reData.data.paid;
                        this.addStatueInfo.send_email=reData.data.send_email;
                        this.addStatueInfo.template=reData.data.template;
                        this.addStatueInfo.order_state_id=reData.data.order_state_id;
                        this.visible_edit = true;
                    }

                })

            }
            //查看详情
            ,searchFun(data){
                this.getListDetail(data);
                this.visible_search = true;
            }
            //添加提交
            ,submitAdd() {
                this.addStatueInfo.lang_id = this.$store.state.langId;
                console.log(this.addStatueInfo)
                this.$post('/orderState/addOrderStateInfo',this.addStatueInfo).then((reData)=>{
                    if(reData.code === '0'){
                        this.visible_add = false
                        this.getList({currentPage:1,pageSize:this.pagination.defaultPageSize,lang_id:store.state.langId});
                    } else {
                        this.$message.error(reData.message);
                        this.visible_add = false
                    }
                })
            }
            //修改提交
            ,submitEdit() {
                console.log(this.addStatueInfo);
                this.$post('/orderState/updateOrderStateInfo',this.addStatueInfo).then((reData)=>{
                    if(reData.code === '0'){
                        this.visible_edit = false
                        this.getList({currentPage:1,pageSize:this.pagination.defaultPageSize,lang_id:store.state.langId});
                    } else {
                        this.$message.error(reData.message);
                        this.visible_edit = false
                    }
                })
            }
            //查看提交
            ,submitSearch(){
                this.visible_search = false
            }
            // 获取列表
            ,getList(data){
                this.loading = true;
                this.$post('/orderState/getOrderStateInfoPage',data).then((reData)=>{
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
                this.$post('/product/getProductListPage',data).then((reData)=>{

                    this.productListData=reData.data.dataList
                    this.pagination.total=reData.data.page.totalResultSize
                    this.loading = false
                })
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
                this.$post('/orderState/removeOrderStateInfo',data).then((reData)=>{
                    if(reData.code === '0'){
                        this.getList({currentPage:1,pageSize:this.pagination.defaultPageSize,lang_id:store.state.langId});
                    }
                })
            }
        },
        mounted() {
            var vm = this
            store.commit('changeStore',{key:'title',val:'产品列表'});
            vm.getList({currentPage:1,pageSize:vm.pagination.defaultPageSize,lang_id:store.state.langId})
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