<template>
    <div class="producetList">

        <!--<div class="hrLine"></div>-->
        <div>
            <div style="margin-bottom: 16px">
                <a-button type="primary" @click="addAttribute(store.state.attribute_child_id)">
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
                    >
              <span slot="action" slot-scope="text, record">
                  <a @click="editAttribute(text.currency_id)">修改</a>
                  <a-divider type="vertical"></a-divider>
                  <a @click="deleteProduct(text.currency_id)">删除</a>
              </span>
                <a slot="isUse" slot-scope="text, record" style="text-align: center">
                    <div style="width: 100%;text-align: left" v-if="text.decimals == 1">是</div>
                    <div style="width: 100%;text-align: left" v-if="text.decimals == 0">否</div>
                </a>
                <a slot="active" slot-scope="text, record" style="text-align: center">
                    <a-icon type="check" style="color: green" v-if="text.active == '1'" @click="change_active({currency_id:text.currency_id,active:'0'})"></a-icon>
                    <a-icon type="close" style="color: red" v-if="text.active == '0'" @click="change_active({currency_id:text.currency_id,active:'1'})"></a-icon>
                </a>
            </a-table>


            <div class="addCurrency">
                <a-modal
                        title="新增货币"
                        v-model="visible_add"
                        :destroyOnClose = "true"
                        @ok="submitAdd"
                >
                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">是否启用：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-select defaultValue="1" style="width: 100%"  @change="handleChangeAdd">
                                    <a-select-option value="1">启用</a-select-option>
                                    <a-select-option value="0">不启用</a-select-option>
                                </a-select>
                            </a-col>
                        </div>
                    </a-row>
                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">货币名称：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-input placeholder="" v-model="addCurrency.name" />
                            </a-col>
                        </div>
                    </a-row>

                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">国家码 ：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-input placeholder="" v-model="addCurrency.iso_code" />
                            </a-col>
                        </div>
                    </a-row>
                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">国际数字码 ：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-input placeholder="" v-model="addCurrency.iso_code_num" />
                            </a-col>
                        </div>
                    </a-row>
                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">币种符号 ：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-input placeholder="" v-model="addCurrency.sign" />
                            </a-col>
                        </div>
                    </a-row>

                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">是否启用小数：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-select :defaultValue="addCurrency.decimals" style="width: 100%"  @change="decimalsChangeAdd">
                                    <a-select-option value=1>启用</a-select-option>
                                    <a-select-option value=0>不启用</a-select-option>
                                </a-select>
                            </a-col>
                        </div>
                    </a-row>


                    <!--<a-row>-->
                        <!--<div class="inputPart">-->
                            <!--<a-col class="gutter-row" :span="6">-->
                                <!--<div class="inputName">小数保留几位：</div>-->
                            <!--</a-col>-->
                            <!--<a-col class="gutter-row" :span="18">-->
                                <!--<a-input placeholder="" v-model="addCurrency.decimals" />-->
                            <!--</a-col>-->
                        <!--</div>-->
                    <!--</a-row>-->
                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">汇率：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-input placeholder="" v-model="addCurrency.conversion_rate" />
                            </a-col>
                        </div>
                    </a-row>
                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">位置序号：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-input placeholder="" v-model="addCurrency.position" />
                            </a-col>
                        </div>
                    </a-row>


                </a-modal>
            </div>
            <div class="editCurrency">
                <a-modal
                        title="修改信息"
                        v-model="visible_edit"
                        :destroyOnClose = "true"
                        @ok="submitEdit"
                >

                        <a-row>
                            <div class="inputPart">
                                <a-col class="gutter-row" :span="6">
                                    <div class="inputName">是否启用：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="18">
                                    <a-select :defaultValue="editCurrency.active" style="width: 100%"  @change="handleChangeEdit">
                                        <a-select-option value="1">启用</a-select-option>
                                        <a-select-option value="0">不启用</a-select-option>
                                    </a-select>
                                </a-col>
                            </div>
                        </a-row>
                        <a-row>
                            <div class="inputPart">
                                <a-col class="gutter-row" :span="6">
                                    <div class="inputName">货币名称：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="18">
                                    <a-input placeholder="" v-model="editCurrency.name" />
                                </a-col>
                            </div>
                        </a-row>

                        <a-row>
                            <div class="inputPart">
                                <a-col class="gutter-row" :span="6">
                                    <div class="inputName">国家码 ：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="18">
                                    <a-input placeholder="" v-model="editCurrency.iso_code" />
                                </a-col>
                            </div>
                        </a-row>
                        <a-row>
                            <div class="inputPart">
                                <a-col class="gutter-row" :span="6">
                                    <div class="inputName">国际数字码 ：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="18">
                                    <a-input placeholder="" v-model="editCurrency.iso_code_num" />
                                </a-col>
                            </div>
                        </a-row>
                        <a-row>
                            <div class="inputPart">
                                <a-col class="gutter-row" :span="6">
                                    <div class="inputName">币种符号 ：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="18">
                                    <a-input placeholder="" v-model="editCurrency.sign" />
                                </a-col>
                            </div>
                        </a-row>

                        <a-row>
                            <div class="inputPart">
                                <a-col class="gutter-row" :span="6">
                                    <div class="inputName">是否启用小数：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="18">
                                    <a-select :defaultValue="editCurrency.decimals" style="width: 100%"  @change="decimalsChangeEdit">
                                        <a-select-option value="1">启用</a-select-option>
                                        <a-select-option value="0">不启用</a-select-option>
                                    </a-select>
                                </a-col>
                            </div>
                        </a-row>


                        <!--<a-row>-->
                            <!--<div class="inputPart">-->
                                <!--<a-col class="gutter-row" :span="6">-->
                                    <!--<div class="inputName">小数保留几位：</div>-->
                                <!--</a-col>-->
                                <!--<a-col class="gutter-row" :span="18">-->
                                    <!--<a-input placeholder="" v-model="editCurrency.decimals" />-->
                                <!--</a-col>-->
                            <!--</div>-->
                        <!--</a-row>-->
                        <a-row>
                            <div class="inputPart">
                                <a-col class="gutter-row" :span="6">
                                    <div class="inputName">汇率：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="18">
                                    <a-input placeholder="" v-model="editCurrency.conversion_rate" />
                                </a-col>
                            </div>
                        </a-row>
                        <a-row>
                            <div class="inputPart">
                                <a-col class="gutter-row" :span="6">
                                    <div class="inputName">位置序号：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="18">
                                    <a-input placeholder="" v-model="editCurrency.position" />
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
        {title: '操作', key: 'action', fixed: 'left', scopedSlots: { customRender: 'action' },},
        { title: '币种名称', dataIndex: 'name', key: 'name'},
        { title: '国际码', dataIndex: 'iso_code', key: 'iso_code'},
        { title: '国际码数字', dataIndex: 'iso_code_num', key: 'iso_code_num'},
        { title: '币种符号', dataIndex: 'sign', key: 'sign'},
        { title: '是否启用小数' , key: 'isUse', scopedSlots: { customRender: 'isUse' }},
        { title: '汇率', dataIndex: 'conversion_rate', key: 'conversion_rate'},
        { title: '排序', dataIndex: 'position', key: 'position'},
        { title: '是否启用', key: 'active',scopedSlots: { customRender: 'active' },},



    ];
    const attributeList = [];

    export default {
        data() {
            return {
                editCurrency:{
                    currency_id:'20',
                    name:'121'
                    ,iso_code:'23'
                    ,iso_code_num:'22'
                    ,sign:'121'
                    ,decimals:'12'
                    ,conversion_rate:'45'
                    ,active:'0'
                    ,position:'54'
                },
                addCurrency:{
                    name:''
                    ,iso_code:''
                    ,iso_code_num:''
                    ,sign:''
                    ,decimals:''
                    ,conversion_rate:''
                    ,active:'1'
                    ,position:''
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
                //表格复选框
                rowSelection:{
                    onChange: (selectedRowKeys, selectedRows) => {
                        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                        let deleteAllData = '';
                        selectedRows.forEach(function (val,index) {
                            deleteAllData += val.attribute_id + (index === selectedRows.length -1 ? '' : ',')
                        })
                        this.deleteAllData = deleteAllData;
                    },
                }
            }
        },
        methods: {
            // 获取单条数据
            getData(data){
                this.$post('/currency/getCurrencyInfo',data).then((reData)=>{
                    this.editCurrency = reData.data
                    this.visible_edit = true
                    this.editCurrency.decimals = reData.data.decimals.toString()

                })
            },
            decimalsChangeEdit(value){
                this.editCurrency.decimals = value

            },
            decimalsChangeAdd(value){
                this.addCurrency.decimals = value
            },
            handleChangeEdit(value){
                this.editCurrency.active = value
            },
            handleChangeAdd(value){
                this.addCurrency.active = value
            },
        //添加提交
        submitAdd() {
            this.$post('/currency/addCurrency',this.addCurrency).then((reData)=>{
                if(reData.code === '0'){
                    this.$message.success(reData.message, 3);
                    this.visible_add = false
                    this.addCurrency={
                            name:''
                            ,iso_code:''
                            ,iso_code_num:''
                            ,sign:''
                            ,decimals:''
                            ,conversion_rate:''
                            ,active:'1'
                            ,position:''
                    },
                    this.getList({currentPage:this.pagination.currentPage,pageSize:this.pagination.defaultPageSize});

                } else {
                    this.$message.error(reData.message);
                    this.visible_add = false
                }
            })
        }
        //修改提交
        ,submitEdit() {
                this.$post('/currency/editCurrency',this.editCurrency).then((reData)=>{
                    if(reData.code === '0'){
                        this.$message.success(reData.message, 3);
                        this.visible_edit = false
                        this.getList({currentPage:this.pagination.currentPage,pageSize:this.pagination.defaultPageSize});
                    } else {
                        this.$message.error(reData.message);
                        this.visible_edit = false
                    }
                })
        },
            //新增属性
            addAttribute(){
                this.visible_add = true
            }
            //修改属性
            ,editAttribute(currency_id){
               this.getData({currency_id:currency_id})
            }
            // 获取商品列表
            ,getList(data){
                this.loading = true;
                this.$post('/currency/getCurrencyListPage',data).then((reData)=>{
                    this.attributeList=reData.data.dataList
                    this.pagination.total=reData.data.page.totalResultSize
                    this.loading = false
                })
            }
            //表格分页
            ,handleTableChange(pagination){
                this.pagination.currentPage = pagination.current
                this.getList({currentPage:pagination.current,pageSize:pagination.defaultPageSize})
            }

            //更改商品状态
            ,change_active(data){
                this.$post('/currency/editActiveCurrency',data).then((reData)=>{
                    if(reData.code === '0'){
                        this.getList({currentPage:this.pagination.currentPage,page_size:this.pagination.defaultPageSize});
                    }else {
                        this.$message.error(reData.message);
                    }
                })
            }
            //删除商品
            ,deleteProduct(data){
                this.$post('/currency/deleteCurrency',{currency_id:data}).then((reData)=>{
                    if(reData.code === '0'){
                        this.getList({currentPage:this.pagination.currentPage,page_size:this.pagination.defaultPageSize});
                    } else {
                        this.$message.error(reData.message);
                    }
                })
            }

        },
        mounted() {
            var vm = this;
            store.commit('changeStore',{key:'title',val:'币种列表'});
            vm.getList({currentPage:vm.pagination.current,pageSize:vm.pagination.defaultPageSize})
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