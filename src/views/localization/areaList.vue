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
                     :scroll="{ x: 1500 }">
              <span slot="action" slot-scope="text, record">
                  <a @click="editAttribute(text.zone_id,text.name,text.active)">修改</a>
                  <a-divider type="vertical"></a-divider>
                  <a @click="deleteProduct(text.zone_id)">删除</a>
              </span>
                <a slot="active" slot-scope="text, record" style="text-align: center">
                    <a-icon type="check" style="color: green" v-if="text.active == '1'" @click="change_active({zone_id:text.zone_id,active:'0'})"></a-icon>
                    <a-icon type="close" style="color: red" v-if="text.active == '0'" @click="change_active({zone_id:text.zone_id,active:'1'})"></a-icon>
                </a>
            </a-table>


            <div class="addCurrency">
                <a-modal
                        title="新增区域"
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
                                <div class="inputName">区域名称：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-input placeholder="" v-model="addCurrency.name" />
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
                                    <div class="inputName">区域名称：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="18">
                                    <a-input placeholder="" v-model="editCurrency.name" />
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
        { title: '区域ID', dataIndex: 'zone_id', key: 'zone_id'},
        { title: '区域名称', dataIndex: 'name', key: 'name'},
        { title: '是否启用', key: 'active',scopedSlots: { customRender: 'active' },},



    ];
    const attributeList = [];

    export default {
        data() {
            return {
                editCurrency:{
                    zone_id:'',
                    name:''
                    ,active:''
                },
                addCurrency:{
                     name:''
                    ,active:'1'
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
            handleChangeEdit(value){
                this.editCurrency.active = value
            },
            handleChangeAdd(value){
                this.addCurrency.active = value
            },
        //添加提交
        submitAdd() {
            this.$post('/zone/addZone',this.addCurrency).then((reData)=>{
                if(reData.code === '0'){
                    this.$message.success(reData.message, 3);
                    this.visible_add = false
                    this.addCurrency={
                            name:''
                            ,active:'1'
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
                this.$post('/zone/editZone',this.editCurrency).then((reData)=>{
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
            ,editAttribute(id,name,active){
                this.editCurrency = {
                    zone_id:id,
                    active:active.toString(),
                    name:name,
                }
                this.visible_edit = true
            }
            // 获取商品列表
            ,getList(data){
                this.loading = true;
                this.$post('/zone/getZoneListPage',data).then((reData)=>{
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
                this.$post('/zone/editActiveZone',data).then((reData)=>{
                    if(reData.code === '0'){
                        this.getList({currentPage:this.pagination.currentPage,page_size:this.pagination.defaultPageSize});
                    }else {
                        this.$message.error(reData.message);
                    }
                })
            }
            //删除
            ,deleteProduct(id){
                this.$post('/zone/deleteZone',{zone_id:id}).then((reData)=>{
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
            store.commit('changeStore',{key:'title',val:'区域列表'});
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