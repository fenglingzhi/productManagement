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
                     :scroll="{ x: 1400 }">
              <span slot="action" slot-scope="text, record">
                  <a @click="searchFun({address_id:record.address_id,lang_id:$store.state.langId})">修改</a>
                  <a-divider type="vertical"></a-divider>
                  <a-popconfirm
                          v-if="productListData.length"
                          title="请确认删除"
                          @confirm="() => deleteFun({address_id:record.address_id})">
                    <a>删除</a>
                  </a-popconfirm>
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
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName"><span style="color:red;">*</span>联系电话：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="16">
                            <a-input placeholder="请输联系电话" v-model="addCustomerAddressData.phone" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName"><span style="color:red;">*</span>客户邮箱：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="16">
                            <a-input placeholder="请输客户邮箱" v-model="addCustomerAddressData.email" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName"><span style="color:red;">*</span>身份证：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="16">
                            <a-input placeholder="沙特身份证" v-model="addCustomerAddressData.national_id" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName"><span style="color:red;">*</span>名：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="16">
                            <a-input placeholder="请输名" v-model="addCustomerAddressData.firstname" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName"><span style="color:red;">*</span>姓：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="16">
                            <a-input placeholder="请输姓" v-model="addCustomerAddressData.lastname" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">公司：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="16">
                            <a-input placeholder="请输公司" v-model="addCustomerAddressData.company" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName"><span style="color:red;">*</span>国家：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="16">
                            <a-select defaultValue="请选择" style="width: 100%" @change="handleChangeCountry">
                                <a-select-option v-for="item in country" :value=item.country_id>{{item.name}}{{item.country_id}}</a-select-option>
                            </a-select>
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName"><span style="color:red;">*</span>省/州：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="16">
                            <a-select defaultValue="请选择" v-if="!state_flag" style="width: 100%" @change="handleChangeState">
                                <a-select-option v-for="item in state" :value=item.state_id>{{item.name}}</a-select-option>
                            </a-select>
                            <a-input placeholder="请输城省/州" v-model="addCustomerAddressData.state_id" v-if="state_flag" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName"><span style="color:red;">*</span>城市：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="16">
                            <a-select defaultValue="请选择" v-if="!city_flag" style="width: 100%" @change="handleChangeCity">
                                <a-select-option v-for="item in city" :value=item.city_id>{{item.name}}</a-select-option>
                            </a-select>
                            <a-input placeholder="请输城市" v-if="city_flag" v-model="addCustomerAddressData.city" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName"><span style="color:red;">*</span>地址别名：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="16">
                            <a-input placeholder="请输地址别名" v-model="addCustomerAddressData.alias" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName"><span style="color:red;">*</span>地址1：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="16">
                            <a-input placeholder="请输地址1" v-model="addCustomerAddressData.address1" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">地址2：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="16">
                            <a-input placeholder="请输地址2" v-model="addCustomerAddressData.address2" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName"><span style="color:red;">*</span>邮件编码：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="16">
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
                                <a-select-option v-for="item in country" :value=item.country_id>{{item.name}}</a-select-option>
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
                                      :value="addCustomerAddressData.city"
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
        { title: '地址id', dataIndex: 'address_id', key: 'address_id'},
        { title: '名', dataIndex: 'firstname', key: 'firstname'},
        { title: '姓', dataIndex: 'lastname', key: 'lastname'},
        { title: '地址1', dataIndex: 'address1', key: 'address1'},
        { title: '地址2', dataIndex: 'address2', key: 'address2'},
        { title: '邮政编码', dataIndex: 'postcode', key: 'postcode'},
        { title: '城市', dataIndex: 'city', key: 'city'},
        { title: '省/州', dataIndex: 'stateid_name', key: 'stateid_name'},
        { title: '国家', dataIndex: 'country_name', key: 'country_name'},
        { title: '联系电话', dataIndex: 'phone', key: 'phone'},

        // { title: '中间名', dataIndex: 'middlename', key: 'middlename'},
        // { title: '街道', dataIndex: 'street', key: 'street'},
        // { title: '状态', dataIndex: 'active', key: 'active'},
        // { title: '是否默认', dataIndex: 'is_default', key: 'is_default'},
        // { title: '添加时间', dataIndex: 'add_date', key: 'add_date'},
        // { title: '更新时间', dataIndex: 'upd_date', key: 'upd_date'},
        // { title: '别名', dataIndex: 'alias', key: 'alias'},
        // { title: '公司', dataIndex: 'company', key: 'company'},
        // { title: '备用电话', dataIndex: 'alertnate_phone', key: 'alertnate_phone'},
        // { title: '沙特身份证', dataIndex: 'national_id', key: 'national_id'},
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
                    // other:'',
                    address_id:'1'
                }
                ,country:[]
                ,state:[]
                ,state_flag:false
                ,city:[]
                ,city_flag:false
            }
        },
        methods: {
            //更新地址详情
            searchFun(data){
                this.addCustomerAddressData.address_id = data.address_id
                this.$post('/address/getAddressInfoList',data).then((reData)=>{
                    if(reData.code === '0'){
                        this.addCustomerAddressData.phone=reData.data[0].phone;
                        this.addCustomerAddressData.email=reData.data[0].email;
                        this.addCustomerAddressData.national_id=reData.data[0].national_id;
                        this.addCustomerAddressData.alias=reData.data[0].alias;
                        this.addCustomerAddressData.firstname=reData.data[0].firstname;
                        this.addCustomerAddressData.lastname=reData.data[0].lastname;
                        this.addCustomerAddressData.company=reData.data[0].company;
                        this.addCustomerAddressData.address1=reData.data[0].address1;
                        this.addCustomerAddressData.address2=reData.data[0].address2;
                        this.addCustomerAddressData.postcode=reData.data[0].postcode;
                        this.addCustomerAddressData.state_id=reData.data[0].state_id;
                        this.addCustomerAddressData.country_id=reData.data[0].country_id;
                        this.addCustomerAddressData.email=reData.data[0].email;
                        this.addCustomerAddressData.city=reData.data[0].city_name;
                        // this.addCustomerAddressData.other=reData.data[0].other;
                    }
                }).then(()=>{
                    this.$post('/country/getCountryList',{lang_id:store.state.langId}).then((reData)=>{
                        this.country = reData.data.slice(0)
                    })
                }).then(()=>{
                    this.$post('/state/getStateList',{country_id:this.addCustomerAddressData.country_id}).then((reData)=>{
                        if(reData.data == ''){
                            this.state_flag = true;
                            this.city_flag = true;
                        } else {
                            this.state_flag = false;
                            this.state = reData.data.slice(0)
                        }
                    });
                }).then(()=>{
                    this.$post('/city/getCityList',{state_id:this.addCustomerAddressData.state_id,country_id:this.addCustomerAddressData.country_id}).then((reData)=>{
                        if(reData.data == ''){
                            this.city_flag = true;
                        } else {
                            this.city_flag = false;
                            this.city = reData.data.slice(0)
                        }
                    });
                });
                this.visible_update = true;
            }
            //新增地址
            ,add_product(){
                let vm = this;
                this.visible_add = true
                this.addCustomerAddressData.phone='';
                this.addCustomerAddressData.email='';
                this.addCustomerAddressData.national_id='';
                this.addCustomerAddressData.alias='';
                this.addCustomerAddressData.firstname='';
                this.addCustomerAddressData.lastname='';
                this.addCustomerAddressData.company='';
                this.addCustomerAddressData.address1='';
                this.addCustomerAddressData.address2='';
                this.addCustomerAddressData.city='';
                this.addCustomerAddressData.postcode='';
                this.addCustomerAddressData.state_id='';
                this.addCustomerAddressData.country_id='';
                this.addCustomerAddressData.email='';
                this.$post('/country/getCountryList',{lang_id:store.state.langId}).then((reData)=>{
                    vm.country = reData.data.slice(0)
                });
            }
            //国家选择
            ,handleChangeCountry(value) {
                this.addCustomerAddressData.country_id = value
                this.$post('/state/getStateList',{country_id:value}).then((reData)=>{
                    console.log(reData)
                    if(reData.data == ''){
                        this.state_flag = true
                        this.city_flag = true
                    } else {
                        this.state_flag = false
                        this.state = reData.data.slice(0)
                    }
                });
            }
            //州选择
            ,handleChangeState(value) {
                this.addCustomerAddressData.state_id = value
                this.$post('/city/getCityList',{state_id:value,country_id:this.addCustomerAddressData.country_id}).then((reData)=>{
                    if(reData.data == ''){
                        this.city_flag = true
                    } else {
                        this.city_flag = false
                        this.city = reData.data.slice(0)
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
            //获取地址列表
            ,getList(data){
                this.loading = true;
                this.$post('/address/getAddressPage',data).then((reData)=>{
                    this.productListData=reData.data.dataList;
                    // this.pagination.total=reData.data.page.totalResultSize
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
                if(this.addCustomerAddressData.phone === ''){
                    this.$notification.open({
                        message: '警告',
                        description: '请填电话号码'
                    });
                    return false;
                } else if(this.addCustomerAddressData.email === ''){
                    this.$notification.open({
                        message: '警告',
                        description: '请填写邮箱'
                    });
                    return false;
                } else if(this.addCustomerAddressData.national_id === ''){
                    this.$notification.open({
                        message: '警告',
                        description: '请填写身份证'
                    });
                    return false;
                } else if(this.addCustomerAddressData.firstname === ''){
                    this.$notification.open({
                        message: '警告',
                        description: '请填写名'
                    });
                    return false;
                } else if(this.addCustomerAddressData.lastname === ''){
                    this.$notification.open({
                        message: '警告',
                        description: '请填写姓'
                    });
                    return false;
                } else if(this.addCustomerAddressData.country_id === ''){
                    this.$notification.open({
                        message: '警告',
                        description: '请填写国家'
                    });
                    return false;
                } else if(this.addCustomerAddressData.state_id === ''){
                    this.$notification.open({
                        message: '警告',
                        description: '请填写省'
                    });
                    return false;
                } else if(this.addCustomerAddressData.city === ''){
                    this.$notification.open({
                        message: '警告',
                        description: '请填写城市'
                    });
                    return false;
                } else if(this.addCustomerAddressData.alias === ''){
                    this.$notification.open({
                        message: '警告',
                        description: '请填写地址别名'
                    });
                    return false;
                } else if(this.addCustomerAddressData.address1 === ''){
                    this.$notification.open({
                        message: '警告',
                        description: '请填写地址1'
                    });
                    return false;
                } else if(this.addCustomerAddressData.postcode === ''){
                    this.$notification.open({
                        message: '警告',
                        description: '请填写邮编'
                    });
                    return false;
                } else {
                    this.$post('/address/addAddressInfo',this.addCustomerAddressData).then((reData)=>{
                        if(reData.code === '0'){
                            this.visible_add = false
                            this.getList({lang_id:store.state.langId});
                        } else {
                            this.$message.error(reData.message);
                            // this.visible_add = false
                        }
                    })
                }

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
            vm.getList({lang_id:store.state.langId})
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