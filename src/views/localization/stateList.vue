<template>
    <div class="producetList">

        <!--<div class="hrLine"></div>-->

        <a-row>
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="7">
                        <div class="inputName"> 省/州ID：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="16">
                        <a-input placeholder="请输入国家ID" v-model="search_data.state_id" />
                    </a-col>
                </div>
            </a-col>
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="7">
                        <div class="inputName">省/州名称 ：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="16">
                        <a-input placeholder="请输入省/州名称" v-model="search_data.name"/>
                    </a-col>
                </div>
            </a-col>
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="7">
                        <div class="inputName">国际码 ：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="16">
                        <a-input placeholder="请输入国际码" maxlenght="3" v-model="search_data.iso_code"/>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <a-row>


            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="7">
                        <div class="inputName">状态：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="16">
                        <a-select defaultValue="" style="width: 100%"  v-model="search_data.active">
                            <a-select-option value="">不限</a-select-option>
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
                    </a-col>
                    <a-col class="gutter-row" :span="18">
                        <a-row>
                            <a-col class="gutter-row" :span="6">
                                <a-button type="primary" @click="addAttribute()">新增</a-button>
                            </a-col>
                            <a-col class="gutter-row" :span="6">
                                <a-button type="primary" @click="search_product()">搜索</a-button>
                            </a-col>
                            <a-col class="gutter-row" :span="6">
                                <!--<a-button type="primary">导出</a-button>-->
                            </a-col>
                        </a-row>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <div>
            <!--<div style="margin-bottom: 16px">-->
                <!--<a-button type="primary" @click="addAttribute()">-->
                    <!--新增-->
                <!--</a-button>-->

                <!--<span style="margin-left: 8px"></span>-->
            <!--</div>-->
            <a-table :columns="columns"
                     :dataSource="attributeList"
                     :pagination="pagination"
                     :loading="loading"
                     align="center"
                     @change="handleTableChange">
              <span slot="action" slot-scope="text, record">
                  <a @click="editAttribute(text.state_id)">修改</a>
                  <!--<a-divider type="vertical"></a-divider>-->
                  <!--<a @click="deleteProduct(text.state_id)">删除</a>-->
              </span>

                <span slot="contains_states" slot-scope="text, record" style="text-align: center">
                    <div style="width: 100%;text-align: left" v-if="text.contains_states == true">是</div>
                    <div style="width: 100%;text-align: left" v-if="text.contains_states ==false">否</div>
                </span>

                <a slot="active" slot-scope="text, record" style="text-align: center">
                    <a-icon type="check" style="color: green" v-if="text.active == '1'" @click="change_active({state_id:text.state_id,active:'0'})"></a-icon>
                    <a-icon type="close" style="color: red" v-if="text.active == '0'" @click="change_active({state_id:text.state_id,active:'1'})"></a-icon>
                </a>
            </a-table>


            <div class="addCurrency">
                <a-modal
                        title="新增省/州"
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
                                <div class="inputName">名字 ：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-input placeholder="" v-model="addCurrency.name" />
                            </a-col>
                        </div>
                    </a-row>
                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">区域：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-select defaultValue="请选择区域" style="width: 100%"  @change="handleChangeZoneAdd">
                                    <a-select-option v-for="item in zoneList" :value="item.zone_id">{{item.name}}</a-select-option>
                                </a-select>
                            </a-col>
                        </div>
                    </a-row>
                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">国家：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-select defaultValue="请选择国家" style="width: 100%"  @change="handleChangeCountryAdd">
                                    <a-select-option v-for="item in countryList" :value="item.country_id">{{item.name}}</a-select-option>
                                </a-select>
                            </a-col>
                        </div>
                    </a-row>
                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">国际码 ：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-input placeholder="" v-model="addCurrency.iso_code" />
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
                                    <div class="inputName">名字 ：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="18">
                                    <a-input placeholder="" v-model="editCurrency.name" />
                                </a-col>
                            </div>
                        </a-row>
                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">区域：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-select  :defaultValue="editCurrency.zone_id"  style="width: 100%"  @change="handleChangeZoneEdit">
                                    <a-select-option v-for="item in zoneList" :value="item.zone_id">{{item.name}}</a-select-option>
                                </a-select>
                            </a-col>
                        </div>
                    </a-row>
                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">国家：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-select  :defaultValue="editCurrency.country_id"  style="width: 100%"  @change="handleChangeCountryEdit">
                                    <a-select-option v-for="item in countryList" :value="item.country_id">{{item.name}}</a-select-option>
                                </a-select>
                            </a-col>
                        </div>
                    </a-row>
                        <a-row>
                            <div class="inputPart">
                                <a-col class="gutter-row" :span="6">
                                    <div class="inputName">国际码 ：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="18">
                                    <a-input placeholder="" v-model="editCurrency.iso_code" />
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
        { title: '省/州id', dataIndex: 'state_id', key: 'state_id'},
        { title: '省/州名字', dataIndex: 'name', key: 'name'},
        { title: '省/州国际码', dataIndex: 'iso_code', key: 'iso_code'},
        { title: '所属区域', dataIndex: 'zone_name', key: 'zone_name'},
        { title: '所属国家', dataIndex: 'country_name', key: 'country_name'},
        { title: '是否启用', key: 'active',scopedSlots: { customRender: 'active' },},



    ];
    const attributeList = [];

    export default {
        data() {
            return {
                search_data:{
                    state_id:'',
                    name:'',
                    iso_code:'',
                    active:'',

                },
                zoneId:'',
                zoneList:[],
                countryList:[],
                editCurrency:{
                    zone_id:'',
                    country_id:'',
                    name:'',
                    iso_code:'',
                    lang_id:'',
                    active:'1'
                },
                addCurrency:{
                    name:'',
                    zone_id:'',
                    iso_code:'',
                    country_id:'',
                    lang_id:'1',
                    active:'1'
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
                    lang_id:'1'
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
            search_product(){
                this.getList({currentPage:1,pageSize:this.pagination.defaultPageSize,state_id:this.search_data.state_id,name:this.search_data.name,iso_code:this.search_data.iso_code,active:this.search_data.active})
            },
            hangeLang_id(value){
                this.addCurrency.lang_id = value
            },
            hangeLang_idEdit(value){
                this.editCurrency.lang_id = value

            },
            handleChangeZoneEdit(value){
                this.editCurrency.zone_id = value
                this.zoneId = value
                this.getCountryList()

            },
            handleChangeCountryEdit(value){
                this.editCurrency.country_id = value
            },
            handleChangeZoneAdd(value){
                this.addCurrency.zone_id= value
                this.zoneId = value
                this.getCountryList()


            },
            handleChangeCountryAdd(value){
                this.addCurrency.country_id	 = value
            },
            handleChangeEdit(value){
                this.editCurrency.active = value
            },
            handleChangeAdd(value){
                this.addCurrency.active = value
            },
        //添加提交
        submitAdd() {
            this.addCurrency.lang_id=this.$store.state.langId
            this.$post('/state/addState',this.addCurrency).then((reData)=>{
                if(reData.code === '0'){
                    this.$message.success(reData.message, 3);
                    this.visible_add = false
                    this.addCurrency={
                        name:'',
                        zone_id:'',
                        iso_code:'',
                        country_id:'',
                        lang_id:this.$store.state.langId,
                        active:'1'
                    },
                    this.getList({currentPage:this.pagination.currentPage,pageSize:this.pagination.defaultPageSize,lang_id:this.$store.state.langId,state_id:this.search_data.state_id,name:this.search_data.name,iso_code:this.search_data.iso_code,active:this.search_data.active});

                } else {
                    this.addCurrency={
                        name:'',
                        zone_id:'',
                        iso_code:'',
                        country_id:'',
                        lang_id:this.$store.state.langId,
                        active:'1'
                    },
                    this.$message.error(reData.message);
                    this.visible_add = false
                }
            })
        }
        //修改提交
        ,submitEdit() {
                this.editCurrency.lang_id=this.$store.state.langId
                this.$post('/state/editState',this.editCurrency).then((reData)=>{
                    if(reData.code === '0'){
                        this.$message.success(reData.message, 3);
                        this.visible_edit = false
                        this.getList({currentPage:this.pagination.currentPage,pageSize:this.pagination.defaultPageSize,lang_id:this.$store.state.langId,state_id:this.search_data.state_id,name:this.search_data.name,iso_code:this.search_data.iso_code,active:this.search_data.active});
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
            ,  // 获取单条数据
            getData(data){
                this.$post('/state/getStateInfo',data).then((reData)=>{
                    this.editCurrency = reData.data.stateInfo
                    // this.editCurrency.lang_id = data.lang_id
                    this.editCurrency.country_id= reData.data.stateInfo.country_id
                    this.editCurrency.active= reData.data.stateInfo.active.toString()
                    this.editCurrency.zone_id = reData.data.stateInfo.zone_id
                    this.visible_edit = true

                })
            }
            //修改属性
            ,editAttribute(state_id){
               this.getData({state_id:state_id,lang_id:this.$store.state.langId})

            }
            // 获取列表
            ,getList(data){
                this.loading = true;
                this.$post('/state/getStateListPage',data).then((reData)=>{
                    this.attributeList=reData.data.dataList
                    this.pagination.total=reData.data.page.totalResultSize
                    this.loading = false
                })
            }
            // 获取国家列表
            ,getCountryList(){
                this.$post('/country/getCountryList',{lang_id:this.$store.state.langId,zone_id:this.zoneId}).then((reData)=>{
                    this.countryList=reData.data
                })
            }
            // 获取区域列表
            ,getzoneList(){
                this.$post('/zone/getZoneList',{lang_id:this.$store.state.langId}).then((reData)=>{
                    this.zoneList=reData.data
                })
            }

            //表格分页
            ,handleTableChange(pagination){
                this.pagination.currentPage = pagination.current
                this.getList({currentPage:pagination.current,pageSize:pagination.defaultPageSize,lang_id:this.$store.state.langId,state_id:this.search_data.state_id,name:this.search_data.name,iso_code:this.search_data.iso_code,active:this.search_data.active})
            }

            //更改商品状态
            ,change_active(data){
                this.$post('/state/editActiveState',data).then((reData)=>{
                    if(reData.code === '0'){
                        this.getList({currentPage:this.pagination.currentPage,page_size:this.pagination.defaultPageSize,lang_id:this.$store.state.langId,state_id:this.search_data.state_id,name:this.search_data.name,iso_code:this.search_data.iso_code,active:this.search_data.active});
                    }else {
                        this.$message.error(reData.message);
                    }
                })
            }
            //删除
            ,deleteProduct(id){
                this.$post('/country/deleteCountry',{country_id:id}).then((reData)=>{
                    if(reData.code === '0'){
                        this.getList({currentPage:this.pagination.currentPage,page_size:this.pagination.defaultPageSize,lang_id:this.$store.state.langId});
                    } else {
                        this.$message.error(reData.message);
                    }
                })
            }

        },
        mounted() {
            var vm = this;
            // store.commit('changeStore',{key:'title',val:''});
            this.getCountryList()
            this.getzoneList()
            vm.getList({currentPage:1,pageSize:vm.pagination.defaultPageSize,lang_id:this.$store.state.langId})
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