<template>
    <div class="producetList">

        <!--<div class="hrLine"></div>-->
        <div>
            <div style="margin-bottom: 16px">
                <a-button type="primary" @click="addCodM()">
                    新增
                </a-button>

                <span style="margin-left: 8px"></span>
            </div>
            <a-table :columns="columns"
                     :dataSource="attributeList"
                     :pagination="pagination"
                     :loading="loading"
                     align="center"
                     @change="handleTableChange"
                     :scroll="{ x: 1500 }">
              <span slot="action" slot-scope="text, record">
                  <a @click="editCod(text.cart_cod_id)">修改</a>
                  <!--<a-divider type="vertical"></a-divider>-->
                  <!-- <a @click="deleteProduct(text.cart_cod_id)">删除</a> -->
              </span>
                <a slot="active" slot-scope="text, record" style="text-align: center">
                    <a-icon type="check" style="color: green" v-if="text.active == '1'"></a-icon>
                    <a-icon type="close" style="color: red" v-if="text.active == '0'"></a-icon>
                </a>
            </a-table>

            <!--新增修改弹框-->
            <div class="addCurrency">
                <a-modal
                    title="COD信息"
                    v-model="visible_add"
                    :destroyOnClose = "true"
                    @ok="submitAdd(addCod.edit)"
                >
                        <a-row>
                            <div class="inputPart">
                                <a-col class="gutter-row" :span="9">
                                    <div class="inputName">*国家/地区：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="15">
                                    <a-select :defaultValue="addCod.country_id" style="width: 100%"  @change="getAddcountry">
                                       <a-select-option v-for="item in country" :value=item.country_id>{{item.name}}{{item.country_id}}</a-select-option>
                                    </a-select>
                                </a-col>
                            </div>
                        </a-row>

                         <a-row>
                            <div class="inputPart">
                                <a-col class="gutter-row" :span="9">
                                    <div class="inputName">*价格范围货币：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="15">
                                    <a-select :defaultValue="addCod.currency_id" style="width: 100%"  @change="getAddcurrency">
                                      <a-select-option v-for="item in currency" :value=item.currency_id>
                                          {{item.name}}{{item.currency_id}}
                                      </a-select-option>
                                    </a-select>
                                </a-col>
                            </div>
                        </a-row>

                        <a-row>
                            <div class="inputPart">
                                <a-col class="gutter-row" :span="9">
                                    <div class="inputName">*价格范围（min）：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="15">
                                    <a-input placeholder="" maxlength="10" v-model="addCod.price_min" />
                                </a-col>
                            </div>
                        </a-row>
                        <a-row>
                            <div class="inputPart">
                                <a-col class="gutter-row" :span="9">
                                    <div class="inputName">*价格范围（max）：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="15">
                                    <a-input placeholder="" maxlength="10" v-model="addCod.price_max"/>
                                </a-col>
                            </div>
                        </a-row>

                        <a-row>
                            <div class="inputPart">
                                <a-col class="gutter-row" :span="9">
                                    <div class="inputName">*PayPal折扣（百分比%）：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="15">
                                    <a-input placeholder="" maxlength="10" v-model="addCod.paypal_rate" />
                                </a-col>
                            </div>
                        </a-row>

                        <a-row>
                            <div class="inputPart">
                                <a-col class="gutter-row" :span="9">
                                    <div class="inputName">*信用卡折扣（百分比%）：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="15">
                                    <a-input placeholder="" maxlength="10" v-model="addCod.cc_rate" />
                                </a-col>
                            </div>
                        </a-row>

                        <a-row>
                            <div class="inputPart">
                                <a-col class="gutter-row" :span="9">
                                    <div class="inputName">*是否显示：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="15">
                                    <a-select :defaultValue="addCod.active" style="width: 100%"  @change="getAddactive">
                                        <a-select-option value="1">是</a-select-option>
                                        <a-select-option value="0">否</a-select-option>
                                    </a-select>
                                </a-col>
                            </div>
                        </a-row>

                </a-modal>
            </div>
        </div>
    </div>
</template>
<script>
    import router from '../../router';
    import store from '../../store'
    const columns = [
        { title: 'id', key: 'cart_cod_id', dataIndex: 'cart_cod_id', fixed: 'left'},
        { title: '操作', key: 'action',scopedSlots: { customRender: 'action' },},
        { title: '国家/地区', dataIndex: 'country_name', key: 'country_name'},
        { title: '货币', dataIndex: 'currency_name', key: 'currency_name'},
        { title: '价格范围（min）', dataIndex: 'price_min', key: 'price_min'},
        { title: '价格范围（max）', dataIndex: 'price_max', key: 'price_max'},
        { title: 'paypal折扣(%)', dataIndex: 'paypal_rate', key: 'paypal_rate'},
        { title: '信用卡折扣(%)', dataIndex: 'cc_rate', key: 'cc_rate'},
        { title: '添加时间', dataIndex: 'add_date', key: 'add_date'},
        { title: '是否启用', key: 'active',scopedSlots: { customRender: 'active' },},
        
    ];
    const attributeList = [];

    export default {
        data() {
            return {
                country:[],
                currency:[],
                addCod:{
                    country_id:'',
                    currency_id:'',
                    price_min:'',
                    price_max:'',
                    paypal_rate:'',
                    cc_rate:'',
                    active:'1',
                    edit:false
                },
                visible_add:false,
                visible_edit:false,

                attributeList,
                store,
                columns,
                loading: false,
                pagination:{
                    currentPage:1,
                    defaultPageSize:10,
                    total:1,
                }, 
                deleteAllData:'',
            }
        },
        methods: {
            // 添加Cod
            addCodM(mm){
                this.visible_add = true;
                if(mm){

                }else{
                    this.addCod = {
                        country_id:'',
                        currency_id:'',
                        price_min:'',
                        price_max:'',
                        paypal_rate:'',
                        cc_rate:'',
                        active:'1',
                        edit:false
                    }
                }
                this.get_counrtys();
                this.get_currency();
            },

            // 获取国家信息
            get_counrtys(){
                let vm = this;
                this.$post('/country/getCountryListPage',{lang_id:store.state.langId,pageSize:'10000'}).then((reData)=>{
                    vm.country = reData.data.dataList.slice(0)
                });
            },
            // 获取币种信息
            get_currency(){
                let vm = this;
                this.$post('/currency/getCurrencyListPage',{pageSize:'10000'}).then((reData)=>{
                    vm.currency = reData.data.dataList.slice(0)
                });
            },
            getAddcurrency(value){
                this.addCod.currency_id = value
            },

            //国家选择
            getAddcountry(value) {
                this.addCod.country_id = value
            },
            getAddactive(value){
                this.addCod.active = value
            },
            // 修改cod内容
            editCod(id){
                var that = this;
                this.$post('/cartCod/getCartCODInfoOne',{cart_cod_id:id}).then((reData)=>{
                   console.log(reData)
                   this.addCod = reData.data;
                   this.addCod.edit = true;
                   this.addCod.active= reData.data.active.toString()
                   this.addCodM(this.addCod.edit)
                })
            },

            //添加提交
            submitAdd(edit) {
                if (edit) {
                    this.submitEdit()
                } else {
                    this.$post('/cartCod/addCartCODInfo',this.addCod).then((reData)=>{
                        console.log("返回结果",reData)
                        if(reData.code === '0'){
                            this.$notification.open({
                                message: '添 加',
                                duration: 3,
                                description: reData.message,
                                onClick: () => {
                                    console.log('ok');
                                },
                            })
                            // this.$message.success(reData.message, 3);
                            this.visible_add = false
                            this.addCod={
                                active:'1'
                            }
                            this.getList({lang_id:store.state.langId,currentPage:this.pagination.currentPage,pageSize:this.pagination.defaultPageSize});
    
                        } else {
                            this.$notification.open({
                                message: '添 加',
                                duration: 3,
                                description: reData.message,
                                onClick: () => {
                                    console.log('ok');
                                },
                            })
                            // this.$message.error(reData.message);
                            this.visible_add = false
                        }
                    })
                }
            }
            //修改提交
            ,submitEdit() {
                this.$post('/cartCod/updateCartCODInfo',this.addCod).then((reData)=>{
                    if(reData.code === '0'){
                        this.$notification.open({
                            message: '修 改',
                            duration: 3,
                            description: reData.message,
                            onClick: () => {
                                console.log('ok');
                            },
                        })
                        // this.$message.success(reData.message, 3);
                        this.visible_add = false
                        this.addCod={
                            active:'1'
                        }
                        this.getList({lang_id:store.state.langId,currentPage:this.pagination.currentPage,pageSize:this.pagination.defaultPageSize});

                    } else {
                        this.$notification.open({
                            message: '修 改',
                            duration: 3,
                            description: reData.message,
                            onClick: () => {
                                console.log('ok');
                            },
                        })
                        // this.$message.error(reData.message);
                        this.visible_add = false
                    }
                })
            },
            // 获取商品列表
            getList(data){
                this.loading = true;
                this.$post('/cartCod/getCartCODInfoPage',data).then((reData)=>{
                    console.log(reData)
                    this.attributeList=reData.data.dataList
                    this.pagination.total=reData.data.page.totalResultSize
                    this.loading = false
                })
            }
            //表格分页
            ,handleTableChange(pagination){
                this.pagination.currentPage = pagination.current
                this.getList({lang_id:store.state.langId,currentPage:pagination.current,pageSize:pagination.defaultPageSize})
            }

            //删除商品
            ,deleteProduct(data){
                this.$post('/property/deleteProperty',data).then((reData)=>{
                    if(reData.code === '0'){
                        this.getList({parent_id:store.state.attribute_child_id});
                    } else {
                        this.$notification.open({
                            message: '删 除',
                            duration: 3,
                            description: reData.message,
                            onClick: () => {
                                console.log('ok');
                            },
                        })
                        // this.$message.error(reData.message);
                    }
                })
            }

        },
        mounted() {
            var vm = this;
            // store.commit('changeStore',{key:'title',val:'币种列表'});
            vm.getList({lang_id:store.state.langId,currentPage:vm.pagination.current,pageSize:vm.pagination.defaultPageSize})
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