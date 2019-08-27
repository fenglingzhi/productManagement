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
                   <a @click="editCod(text.role_id)">修改</a>
                   <a-divider type="vertical"></a-divider>
                    <a-popconfirm
                               title="请确认删除"
                               @confirm="() => deleteProduct(text.role_id)">
                       <a>删除</a>
                    </a-popconfirm>
                  <!-- <a @click="deleteProduct(text.role_id)">删除</a> -->
                </span>
                <a slot="active" slot-scope="text, record" style="text-align: center">
                    <a-icon type="check" style="color: green" v-if="text.active == '1'"></a-icon>
                    <a-icon type="close" style="color: red" v-if="text.active == '0'"></a-icon>
                </a>
            </a-table>

            <!--新增修改弹框-->
            <div class="addCurrency">
                <a-modal
                    title="角色信息"
                    v-model="visible_add"
                    :destroyOnClose = "true"
                    @ok="submitAdd(addCod.edit)"
                >
                  <a-row>
                      <div class="inputPart">
                        <a-col class="gutter-row" :span="7">
                          <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>名称：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="15">
                          <a-input placeholder="" maxlength="32" v-model="addCod.role_name" />
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
        { title: '角色id', key: 'role_id', dataIndex: 'role_id', fixed: 'left'},
        { title: '操作', key: 'action',scopedSlots: { customRender: 'action' },},
        { title: '角色名称', dataIndex: 'role_name', key: 'role_name'},
        { title: '添加时间', dataIndex: 'add_date', key: 'add_date'},
        { title: '更新时间', dataIndex: 'upd_date', key: 'upd_date'},
        { title: '是否禁用', key: 'active',scopedSlots: { customRender: 'active' },},
    ];
    const attributeList = [];
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
                addCod:{
                    role_name:'',
                    edit:false
                },
                visible_add:false,
                visible_edit:false,
                rowSelection,
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
                      active:'0',
                      edit:false
                    }
                }
            },

            // 修改cod内容
            editCod(id){
                var that = this;
                this.$post('/role/getRoleInfoList',{role_id:id}).then((reData)=>{
                   console.log(reData)
                   this.addCod = reData.data[0];
                   this.addCod.edit = true;
                   this.addCod.active= reData.data[0].active.toString()
                   this.addCodM(this.addCod.edit)
                })
            },

            //添加提交
            submitAdd(edit) {
                var flag = this.checkRes(this.addCod)
                if(flag == false){
                    return
                }
                if (edit) {
                    this.submitEdit()
                } else {
                    this.$post('/role/addRoleInfo',this.addCod).then((reData)=>{
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
                                active:'0',
                                edit:false
                            }
                            this.getList({currentPage:this.pagination.currentPage,pageSize:this.pagination.defaultPageSize});
    
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
                console.log(this.addCod)
                this.$post('/role/updateRoleInfo',this.addCod).then((reData)=>{
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
                            active:'0',
                            edit:false
                        }
                        this.getList({currentPage:this.pagination.currentPage,pageSize:this.pagination.defaultPageSize});

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
            // 获取列表
            getList(data){
                this.loading = true;
                this.$post('/role/getRoleInfoPage',data).then((reData)=>{
                    console.log(reData)
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

            //删除
            ,deleteProduct(id){
                this.$post('/role/removeRoleInfo',{role_id:id}).then((reData)=>{
                    if(reData.code === '0'){
                        this.$notification.open({
                            message: '删 除',
                            duration: 3,
                            description: reData.message,
                            onClick: () => {
                                console.log('ok');
                            },
                        })
                    //    this.$message.success(reData.message);
                       this.getList({currentPage:this.pagination.currentPage,pageSize:this.pagination.defaultPageSize});
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
            },
             // 添加时的校验数据
            checkRes(data){
                if(data.role_name === '' || data.role_name === null){
                    this.$notification.open({
                        message: '添 加',
                        duration: 3,
                        description: "请填写名称",
                        onClick: () => {
                            console.log('ok');
                        },
                    })
                    // this.$message.error("请填写名称");
                    return false
                }
            }
        },
        mounted() {
            var vm = this;
            // store.commit('changeStore',{key:'title',val:'币种列表'});
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