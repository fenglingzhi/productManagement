<template>
    <div class="producetList">

        <!--<div class="hrLine"></div>-->
        <div>
            <div style="margin-bottom: 16px">
                <a-button type="primary" @click="addAttribute()">
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
                  <a @click="editAttribute(text.city_id)">修改</a>
                  <!--<a-divider type="vertical"></a-divider>-->
                  <!--<a @click="deleteProduct(text.city_id)">删除</a>-->
              </span>

                <span slot="contains_states" slot-scope="text, record" style="text-align: center">
                    <div style="width: 100%;text-align: left" v-if="text.contains_states == true">是</div>
                    <div style="width: 100%;text-align: left" v-if="text.contains_states ==false">否</div>
                </span>

                <a slot="active" slot-scope="text, record" style="text-align: center">
                    <a-icon type="check" style="color: green" v-if="text.active == '1'" @click="change_active({city_id:text.city_id,active:'0'})"></a-icon>
                    <a-icon type="close" style="color: red" v-if="text.active == '0'" @click="change_active({city_id:text.city_id,active:'1'})"></a-icon>
                </a>
            </a-table>


            <div class="addCurrency">
                <a-modal
                        title="新增城市"
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
                                <a-select defaultValue="1" style="width: 100%"   @change="handleChangeAdd">
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
                                <div class="inputName">国家：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-select defaultValue="请选择国家" style="width: 100%"  @change="handleChangeZoneAdd">
                                    <a-select-option v-for="item in countryList" :value="item.country_id">{{item.name}}</a-select-option>
                                </a-select>
                            </a-col>
                        </div>
                    </a-row>

                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">省/州：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-select defaultValue="请选择省/州" style="width: 100%"  @change="handleChangeStateAdd">
                                    <a-select-option v-for="item in stateList" :value="item.state_id">{{item.name}}</a-select-option>
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
                                <div class="inputName">国家：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-select :defaultValue="editCurrency.country_id" style="width: 100%"  @change="handleChangeZoneEdit">
                                    <a-select-option v-for="item in countryList" :value="item.country_id">{{item.name}}</a-select-option>
                                </a-select>
                            </a-col>
                        </div>
                    </a-row>

                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">省/州：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-select :defaultValue="editCurrency.state_id" style="width: 100%"  @change="handleChangeStatEdit">
                                    <a-select-option v-for="item in stateList" :value="item.state_id">{{item.name}}</a-select-option>
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
        { title: '城市id', dataIndex: 'city_id', key: 'city_id'},
        { title: '城市名字', dataIndex: 'name', key: 'name'},
        { title: '是否启用', key: 'active',scopedSlots: { customRender: 'active' },},



    ];
    const attributeList = [];

    export default {
        data() {
            return {
                stateList:[],
                countryList:[],
                editCurrency:{
                    city_id:'',
                    name:'',
                    state_id:'',
                    country_id:'',
                    lang_id:this.$store.state.langId,
                    active:'1'
                },
                addCurrency:{
                    name:'',
                    state_id:'',
                    country_id:'',
                    lang_id:this.$store.state.langId,
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
            hangeLang_id(value){
                this.addCurrency.lang_id = value
            },
            hangeLang_idEdit(value){
                this.editCurrency.lang_id = value

            },
            handleChangeZoneEdit(value){
                this.editCurrency.country_id = value
                this.getStateList(value)

            },
            handleChangeZoneAdd(value){
                this.addCurrency.country_id = value
                this.getStateList(value)
            },
            handleChangeStateAdd(value){
                this.addCurrency.state_id = value
            },
            handleChangeStatEdit(value){
                this.editCurrency.state_id = value
            },
            handleChangeEdit(value){
                this.editCurrency.active = value
            },
            handleChangeAdd(value){
                this.addCurrency.active = value
            },
            // handleChangeCountryEdit(value){
            //     this.editCurrency.country_id = value
            // },
            // handleChangeCountryAdd(value){
            //     this.addCurrency.country_id = value
            // },
        //添加提交
        submitAdd() {
            this.$post('/city/addCity',this.addCurrency).then((reData)=>{
                if(reData.code === '0'){
                    this.$message.success(reData.message, 3);
                    this.visible_add = false
                    this.addCurrency={
                        name:'',
                        state_id:'',
                        lang_id:this.$store.state.langId,
                        active:'1'
                    },
                    this.getList({currentPage:this.pagination.currentPage,pageSize:this.pagination.defaultPageSize,lang_id:this.$store.state.langId});

                } else {
                    this.$message.error(reData.message);
                    this.visible_add = false
                }
            })
        }
        //修改提交
        ,submitEdit() {
                this.$post('/city/editCity',this.editCurrency).then((reData)=>{
                    if(reData.code === '0'){
                        this.$message.success(reData.message, 3);
                        this.visible_edit = false
                        this.getList({currentPage:this.pagination.currentPage,pageSize:this.pagination.defaultPageSize,lang_id:this.$store.state.langId});
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
                this.$post('/city/getCityInfo',data).then((reData)=>{
                    this.getStateList(reData.data.country_id)
                    this.editCurrency = reData.data
                    // this.editCurrency.lang_id = data.lang_id
                    this.editCurrency.state_id= reData.data.state_id
                    this.editCurrency.active= reData.data.active.toString()
                    this.visible_edit = true

                })
            }
            //修改属性
            ,editAttribute(city_id){
               this.getData({city_id:city_id
                   // ,lang_id:this.$store.state.langId

               })

            }
            // 获取列表
            ,getList(data){
                this.loading = true;
                this.$post('/city/getCityListPage',data).then((reData)=>{
                    this.attributeList=reData.data.dataList
                    this.pagination.total=reData.data.page.totalResultSize
                    this.loading = false
                })
            }
            // 获取国家列表
            ,getCountryList(){
                this.$post('/country/getCountryList',{lang_id:this.$store.state.langId}).then((reData)=>{
                    this.countryList=reData.data
                })
            }
            // 根据国家获取省
            ,getStateList(country_id){
                this.$post('/state/getStateList',{country_id:country_id}).then((reData)=>{
                    this.stateList=reData.data
                })
            }
            //表格分页
            ,handleTableChange(pagination){
                this.pagination.currentPage = pagination.current
                this.getList({currentPage:pagination.current,pageSize:pagination.defaultPageSize,lang_id:this.$store.state.langId})
            }

            //更改商品状态
            ,change_active(data){
                this.$post('/city/editActiveCity',data).then((reData)=>{
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
            store.commit('changeStore',{key:'title',val:''});
            this.getCountryList()
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