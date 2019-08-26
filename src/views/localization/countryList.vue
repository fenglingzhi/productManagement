<template>
    <div class="producetList">
        <a-row>
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="7">
                        <div class="inputName">国家ID：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="16">
                        <a-input placeholder="请输入国家ID" v-model="search_data.country_id" />
                    </a-col>
                </div>
            </a-col>
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="7">
                        <div class="inputName">国家名称 ：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="16">
                        <a-input placeholder="请输入国家名称" v-model="search_data.name"/>
                    </a-col>
                </div>
            </a-col>
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="7">
                        <div class="inputName">国际码 ：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="16">
                        <a-input placeholder="请输入国际码" maxlength="3" v-model="search_data.iso_code"/>
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
                    <a-col class="gutter-row" :span="5">
                    </a-col>
                    <a-col class="gutter-row" :span="19">
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
        <!--<div class="hrLine"></div>-->
        <div>

            <a-table :columns="columns"
                     :dataSource="attributeList"
                     :pagination="pagination"
                     :loading="loading"
                     align="center"
                     @change="handleTableChange"
                    >
              <span slot="action" slot-scope="text, record">
                  <a @click="editAttribute(text.name,text.iso_code,text.call_prefix,text.lang_id,text.active,text.country_id,text.zone_id,text.position)">修改</a>
                  <!--<a-divider type="vertical"></a-divider>-->
                      <!--<a-popconfirm-->
                              <!--title="请确认删除"-->
                              <!--@confirm="() => deleteProduct(text.country_id)">-->
                <!--<a @click="">删除</a>-->
              <!--</a-popconfirm>-->
                  <!--<a @click="deleteProduct(text.country_id)">删除</a>-->
              </span>

                <span slot="contains_states" slot-scope="text, record" style="text-align: center">
                    <div style="width: 100%;text-align: left" v-if="text.contains_states == true">是</div>
                    <div style="width: 100%;text-align: left" v-if="text.contains_states ==false">否</div>
                </span>

                <a slot="active" slot-scope="text, record" style="text-align: center">
                    <a-icon type="check" style="color: green" v-if="text.active == '1'" @click="change_active({country_id:text.country_id,active:'0'})"></a-icon>
                    <a-icon type="close" style="color: red" v-if="text.active == '0'" @click="change_active({country_id:text.country_id,active:'1'})"></a-icon>
                </a>
            </a-table>


            <div class="addCurrency">
                <a-modal
                        title="新增国家"
                        v-model="visible_add"
                        :destroyOnClose = "true"
                        @ok="submitAdd"
                >
                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>是否启用：</div>
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
                                <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>国家名字 ：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-input placeholder="" v-model="addCurrency.name" />
                            </a-col>
                        </div>
                    </a-row>
                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>区域：</div>
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
                                <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>国际码 ：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-input placeholder="" v-model="addCurrency.iso_code" />
                            </a-col>
                        </div>
                    </a-row>
                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>国际区号 ：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-input placeholder="" type="number" v-model="addCurrency.call_prefix" />
                            </a-col>
                        </div>
                    </a-row>
                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>位置顺序 ：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-input placeholder="" type="number" v-model="addCurrency.position" />
                            </a-col>
                        </div>
                    </a-row>
                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>语言：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-select defaultValue="请选择语言" style="width: 100%"  @change="hangeLang_id">
                                    <a-select-option v-for="item in langList" :value="item.lang_id">{{item.name}}</a-select-option>
                                </a-select>
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
                                    <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>是否启用：</div>
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
                                    <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>国家名字 ：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="18">
                                    <a-input placeholder="" type="email" v-model="editCurrency.name" />
                                </a-col>
                            </div>
                        </a-row>
                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>区域：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-select :defaultValue="editCurrency.zone_id " style="width: 100%"  @change="handleChangeZoneEdit">
                                    <a-select-option v-for="item in zoneList" :value="item.zone_id">{{item.name}}</a-select-option>
                                </a-select>
                            </a-col>
                        </div>
                    </a-row>
                        <a-row>
                            <div class="inputPart">
                                <a-col class="gutter-row" :span="6">
                                    <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>国际码 ：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="18">
                                    <a-input placeholder="" v-model="editCurrency.iso_code" />
                                </a-col>
                            </div>
                        </a-row>
                        <a-row>
                            <div class="inputPart">
                                <a-col class="gutter-row" :span="6">
                                    <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>国际区号 ：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="18">
                                    <a-input placeholder="" type="number" v-model="editCurrency.call_prefix" />
                                </a-col>
                            </div>
                        </a-row>
                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>位置顺序 ：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-input placeholder="" type="number" v-model="editCurrency.position" />
                            </a-col>
                        </div>
                    </a-row>
                        <a-row>
                            <div class="inputPart">
                                <a-col class="gutter-row" :span="6">
                                    <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>语言：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="18">
                                    <a-select :defaultValue="editCurrency.lang_id" style="width: 100%"  @change="hangeLang_idEdit">
                                        <a-select-option v-for="item in langList" :value="item.lang_id">{{item.name}}</a-select-option>
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
        {title: '操作', key: 'action', fixed: 'left', scopedSlots: { customRender: 'action' },},
        { title: '国家ID', dataIndex: 'country_id', key: 'country_id'},
        { title: '国家名称', dataIndex: 'name', key: 'name'},
        { title: '国际区号', dataIndex: 'call_prefix', key: 'call_prefix'},
        // { title: '是否设置省/州', key: 'contains_states', scopedSlots: { customRender: 'contains_states' },},
        { title: '国际码', dataIndex: 'iso_code', key: 'iso_code'},
        // { title: '排序', dataIndex: 'position', key: 'position'},
        { title: '是否启用', key: 'active',scopedSlots: { customRender: 'active' },},
    ];
    const attributeList = [];

    export default {
        data() {
            return {
                search_data:{
                    country_id:'',
                    name:'',
                    iso_code:'',
                    call_prefix:'',
                    active:'',

                },
                langList:[],
                zoneList:[],
                editCurrency:{
                    zone_id:'',
                    country_id:'',
                    name:'',
                    iso_code:'',
                    call_prefix:'',
                    lang_id:'',
                    active:'1',
                    position:''
                },
                addCurrency:{
                    name:'',
                    zone_id:'',
                    iso_code:'',
                    call_prefix:'',
                    lang_id:'1',
                    active:'1',
                    position:''

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
                },
            }
        },
        filter:{
            toString:function (val) {
                return val.toString()
            }
        }
        ,
        methods: {
            search_product(){
                this.getList({currentPage:1,pageSize:this.pagination.defaultPageSize,country_id:this.search_data.country_id,name:this.search_data.name,iso_code:this.search_data.iso_code,active:this.search_data.active,lang_id:this.$store.state.langId})
            },
            hangeLang_id(value){
                this.addCurrency.lang_id = value
            },
            hangeLang_idEdit(value){
                this.editCurrency.lang_id = value

            },
            handleChangeZoneEdit(value){
                this.editCurrency.zone_id = value

            },
            handleChangeZoneAdd(value){
                this.addCurrency.zone_id = value
            },
            handleChangeEdit(value){
                this.editCurrency.active = value
            },
            handleChangeAdd(value){
                this.addCurrency.active = value
            }
            ,checkoutNull(data){
                var isNull =false
                Object.keys(data).forEach(function(key){
                    if(data[key]===''){
                        isNull = true
                    }
                });
                return isNull
            },

            //添加提交
        submitAdd() {
            if(this.checkoutNull(this.addCurrency)){
                this.$notification.open({
                    message: '提醒',
                    duration: 2,
                    description: "请填写所有标*信息再提交！",
                    onClick: () => {
                        console.log('ok');
                    },
                })
            }else {
                this.$post('/country/addCountry',this.addCurrency).then((reData)=>{
                    if(reData.code === '0'){
                        this.$message.success(reData.message, 3);
                        this.visible_add = false
                        this.addCurrency={
                            zone_id:'',
                            name:'',
                            iso_code:'',
                            call_prefix:'',
                            lang_id:'',
                            active:'1',
                            position:''
                        },
                            this.getList({currentPage:this.pagination.currentPage,pageSize:this.pagination.defaultPageSize,lang_id:this.$store.state.langId});

                    } else {
                        this.$message.error(reData.message);
                        this.visible_add = false
                    }
                })
            }

        }
        //修改提交
        ,submitEdit() {
                if(this.checkoutNull(this.editCurrency)){
                    this.$notification.open({
                        message: '提醒',
                        duration: 2,
                        description: "请填写所有标*信息再提交！",
                        onClick: () => {
                            console.log('ok');
                        },
                    })
                }else {
                    this.$post('/country/editCountry',this.editCurrency).then((reData)=>{
                        if(reData.code === '0'){
                            this.$message.success(reData.message, 3);
                            this.visible_edit = false
                            this.getList({currentPage:this.pagination.currentPage,pageSize:this.pagination.defaultPageSize,lang_id:this.$store.state.langId});
                        } else {
                            this.$message.error(reData.message);
                            this.visible_edit = false
                        }
                    })

                }
        },
            //新增属性
            addAttribute(){
                this.visible_add = true
                this.addCurrency={
                    zone_id:'',
                    name:'',
                    iso_code:'',
                    call_prefix:'',
                    lang_id:'',
                    active:'1',
                    position:''
                }
            }
            //修改属性
            ,editAttribute(name,iso_code,call_prefix,lang_id,active,country_id,zone_id,position){
                this.editCurrency = {
                    zone_id:zone_id,
                    active:active.toString(),
                    call_prefix:call_prefix,
                    country_id:country_id,
                    iso_code:iso_code,
                    position:position,
                    lang_id:lang_id,
                    name:name,
                }
                this.visible_edit = true
            }
            // 获取商品列表
            ,getList(data){
                this.loading = true;
                this.$post('/country/getCountryListPage',data).then((reData)=>{
                    this.attributeList=reData.data.dataList
                    this.pagination.total=reData.data.page.totalResultSize
                    this.loading = false
                })
            }
            ,getZoneList(){
                this.$post('/zone/getZoneList').then((reData)=>{
                    this.zoneList = reData.data
                })
            }
            ,getLangeList(){
                this.$post('/lang/getLangList').then((reData)=>{
                    this.langList = reData.data
                })
            }
            //表格分页
            ,handleTableChange(pagination){
                this.pagination.currentPage = pagination.current
                this.getList({currentPage:pagination.current,pageSize:pagination.defaultPageSize,country_id:this.search_data.country_id,name:this.search_data.name,iso_code:this.search_data.iso_code,active:this.search_data.active,lang_id:this.$store.state.langId})
            }

            //更改商品状态
            ,change_active(data){
                this.$post('/country/editActiveCountry',data).then((reData)=>{
                    if(reData.code === '0'){
                        this.getList({currentPage:this.pagination.currentPage,page_size:this.pagination.defaultPageSize,lang_id:this.$store.state.langId});
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
            store.commit('changeStore',{key:'title',val:'区域列表'});
            vm.getList({currentPage:1,pageSize:vm.pagination.defaultPageSize,lang_id:this.$store.state.langId})
            this.getZoneList()
            this.getLangeList()
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