<template>
    <div class="customerAddress">
        <div>
            <div style="margin: 16px 0">
                <a-button type="primary" @click="add_product($store.state.langId)">新增</a-button>
            </div>
            <a-table :columns="columns"
                     :dataSource="productListData"
                     :pagination="pagination"
                     :loading="loading"
                     align="center"
                     @change="handleTableChange"
                     :scroll="{ x: 1600 }">
              <span slot="action" slot-scope="text, record">
                  <a @click="searchFun({cart_id:record.cart_id,lang_id:$store.state.langId})">查看</a>
              </span>
                <span slot="img_" slot-scope="text, record">
                  <img :src="text.image_url" alt="" height="32px;" style="border:1px solid #ccc;" v-if="text.image_url !== ''">
              </span>
            </a-table>
        </div>
        <div class="addCustomerAddress">
            <a-modal
                    title="新增客户地址"
                    :destroyOnClose="true"
                    v-model="visible_add"
                    @ok="submitAddress"
            >
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">联系电话：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输联系电话" v-model="addCustomerAddressData.phone" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">客户邮箱：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输客户邮箱" v-model="addCustomerAddressData.email" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">身份证：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="沙特身份证" v-model="addCustomerAddressData.national_id" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">地址别名：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输地址别名" v-model="addCustomerAddressData.alias" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">名：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输名" v-model="addCustomerAddressData.firstname" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">姓：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输姓" v-model="addCustomerAddressData.lastname" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">公司：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输公司" v-model="addCustomerAddressData.company" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">国家id：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-select defaultValue="请选择" style="width: 100%" @change="handleChangeCountry">
                                <a-select-option v-for="item in country" :value=item.country_id>{{item.name}}{{item.country_id}}</a-select-option>
                            </a-select>
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">州id：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-select defaultValue="请选择" v-if="!state_flag" style="width: 100%" @change="handleChangeState">
                                <a-select-option v-for="item in state" :value=item.state_id>{{item.name}}</a-select-option>
                            </a-select>
                            <a-input placeholder="请输城省/州" v-model="addCustomerAddressData.state_id" v-if="state_flag" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">城市：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-select defaultValue="请选择" v-if="!city_flag" style="width: 100%" @change="handleChangeCity">
                                <a-select-option v-for="item in city" :value=item.city_id>{{item.name}}</a-select-option>
                            </a-select>
                            <a-input placeholder="请输城市" v-if="city_flag" v-model="addCustomerAddressData.city" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">地址1：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输地址1" v-model="addCustomerAddressData.address1" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">地址2：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输地址2" v-model="addCustomerAddressData.address2" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">邮件编码：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输邮件编码" v-model="addCustomerAddressData.postcode" />
                        </a-col>
                    </div>
                </a-row>
            </a-modal>
        </div>
        <div class="updateCustomerAddress">
            <a-modal
                    title="更新客户地址"
                    v-model="visible_update"
                    @ok="submitAddressUpdate"
            >
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">联系电话：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输联系电话" v-model="addCustomerAddressData.phone" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">客户邮箱：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输客户邮箱" v-model="addCustomerAddressData.email" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">身份证：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="沙特身份证" v-model="addCustomerAddressData.national_id" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">地址别名：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输地址别名" v-model="addCustomerAddressData.alias" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">名：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输名" v-model="addCustomerAddressData.firstname" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">姓：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输姓" v-model="addCustomerAddressData.lastname" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">公司：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输公司" v-model="addCustomerAddressData.company" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">国家id：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-select :defaultValue="addCustomerAddressData.country_name"
                                      style="width: 100%"
                                      :value="addCustomerAddressData.country_id"
                                      @change="handleChangeCountry">
                                <a-select-option v-for="item in country" :value=item.country_id>{{item.name}}{{item.country_id}}</a-select-option>
                            </a-select>
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">州id：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-select defaultValue="请选择"
                                      v-if="!state_flag"
                                      style="width: 100%"
                                      :value="addCustomerAddressData.state_id"
                                      @change="handleChangeState">
                                <a-select-option v-for="item in state" :value=item.state_id>{{item.name}}</a-select-option>
                            </a-select>
                            <a-input placeholder="请输城省/州" v-model="addCustomerAddressData.state_name" v-if="state_flag" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">城市：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-select defaultValue="请选择"
                                      v-if="!city_flag"
                                      style="width: 100%"
                                      :value="addCustomerAddressData.city_id"
                                      @change="handleChangeCity">
                                <a-select-option v-for="item in city" :value=item.city_id>{{item.name}}</a-select-option>
                            </a-select>
                            <a-input placeholder="请输城市" v-if="city_flag" v-model="addCustomerAddressData.city" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">地址1：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输地址1" v-model="addCustomerAddressData.address1" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">地址2：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输地址2" v-model="addCustomerAddressData.address2" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">邮件编码：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输邮件编码" v-model="addCustomerAddressData.postcode" />
                        </a-col>
                    </div>
                </a-row>
            </a-modal>
        </div>
    </div>
</template>
<script>
    import router from '../../router';
    import store from '../../store'
    const columns = [
        {title: '操作', key: 'action', scopedSlots: { customRender: 'action' },},
        { title: '沙特身份证', dataIndex: 'national_id', key: 'national_id'},
        { title: '添加时间', dataIndex: 'add_date', key: 'add_date'},
        { title: '平台类型', dataIndex: 'mobile_type', key: 'mobile_type'},
        { title: '货币sign', dataIndex: 'sign', key: 'sign'},
        { title: '语言id', dataIndex: 'lang_id', key: 'lang_id'},
        { title: '物流id', dataIndex: 'carrier_id', key: 'carrier_id'},
        { title: '购物车id', dataIndex: 'city', key: 'city'},
        { title: '更新时间', dataIndex: 'upd_date', key: 'upd_date'},
        { title: '总价', dataIndex: 'total_amount', key: 'total_amount'},
        { title: '小数点保留几位', dataIndex: 'decimals', key: 'decimals'},
        { title: '客户id', dataIndex: 'customer_id', key: 'customer_id'},
        { title: '汇率', dataIndex: 'conversion_rate', key: 'conversion_rate'},
        { title: '订单id', dataIndex: 'order_id', key: 'order_id'},
        { title: '币种id', dataIndex: 'currency_id', key: 'currency_id'},
        { title: '用户邮件', dataIndex: 'email', key: 'email'},
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
                    address_id:''
                }
                ,country:[]
                ,state:[]
                ,state_flag:false
                ,city:[]
                ,city_flag:false
            }
        },
        methods: {
            //产看购物车详情
            searchFun(data){
                this.$post('/cart/getCartDetailInfo',data).then((reData)=>{
                    console.log(reData.data)
                })
                // this.visible_update = true;
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
            store.commit('changeStore',{key:'title',val:'产品列表'});
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
</style>