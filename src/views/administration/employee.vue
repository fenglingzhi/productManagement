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
                     :rowSelection="rowSelection" 
                     :scroll="{ x: 1500 }">
                <span slot="action" slot-scope="text, record">
                  <a @click="editCod(text.employee_id)">修改</a>
                  <a-divider type="vertical"></a-divider>
                  <a-popconfirm
                               title="请确认删除"
                               @confirm="() => deleteProduct(text.employee_id)">
                       <a>删除</a>
                   </a-popconfirm>
                </span>
                <a slot="active" slot-scope="text, record" style="text-align: center">
                    <a-icon type="check" style="color: green" v-if="text.active == '1'"></a-icon>
                    <a-icon type="close" style="color: red" v-if="text.active == '0'"></a-icon>
                </a>
            </a-table>

            <!--新增修改弹框-->
            <div class="addCurrency">
                <a-modal
                    title="雇员信息"
                    v-model="visible_add"
                    :destroyOnClose = "true"
                    @ok="submitAdd(addCod.edit)"
                >
                        <a-row>
                            <div class="inputPart">
                                <a-col class="gutter-row" :span="9">
                                    <div class="inputName">*名：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="15">
                                    <a-input placeholder="" v-model="addCod.first_name" />
                                </a-col>
                            </div>
                        </a-row>
                        <a-row>
                            <div class="inputPart">
                                <a-col class="gutter-row" :span="9">
                                    <div class="inputName">*姓：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="15">
                                    <a-input placeholder="" v-model="addCod.last_name" />
                                </a-col>
                            </div>
                        </a-row>
                        <a-row>
                            <div class="inputPart">
                                <a-col class="gutter-row" :span="9">
                                    <div class="inputName">*电子邮件：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="15">
                                    <a-input placeholder="" v-model="addCod.email"/>
                                </a-col>
                            </div>
                        </a-row>

                        <a-row v-if="addCod.edit === false">
                            <div class="inputPart">
                                <a-col class="gutter-row" :span="9">
                                    <div class="inputName">密码：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="15">
                                    <a-input type="password" placeholder="" v-model="addCod.password" />
                                </a-col>
                            </div>
                        </a-row>
                        <a-row>
                            <div class="inputPart">
                                <a-col class="gutter-row" :span="9">
                                    <div class="inputName">*语言：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="15">
                                    <a-select :defaultValue="addCod.lang_id" style="width: 100%"  @change="getAddlang">
                                        <a-select-option v-for="item in lang" :value=item.lang_id>{{item.name}}{{item.country_id}}</a-select-option>
                                    </a-select>
                                </a-col>
                            </div>
                        </a-row>
                        <a-row>
                            <div class="inputPart">
                                <a-col class="gutter-row" :span="9">
                                    <div class="inputName">*角色：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="15">
                                    <a-select :defaultValue="addCod.role_id" style="width: 100%"  @change="getAddRole">
                                        <a-select-option v-for="item in role" :value=item.role_id>{{item.role_name}} {{item.role_id}}</a-select-option>
                                    </a-select>
                                </a-col>
                            </div>
                        </a-row>
                      
                        <a-row>
                            <div class="inputPart">
                                <a-col class="gutter-row" :span="9">
                                    <div class="inputName">是否禁用：</div>
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
        { title: '雇员id', key: 'employee_id', dataIndex: 'employee_id', fixed: 'left'},
        { title: '操作', key: 'action',scopedSlots: { customRender: 'action' },},
        { title: '名', dataIndex: 'first_name', key: 'first_name'},
        { title: '姓', dataIndex: 'last_name', key: 'last_name'},
        { title: '邮箱地址', dataIndex: 'email', key: 'email'},
        { title: '默认语言id', dataIndex: 'lang_id', key: 'lang_id'},
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
                lang:[],
                role:[],
                addCod:{
                    first_name:'',
                    last_name:'',
                    email:'',
                    lang_id:'',
                    role_id:'',
                    cc_rate:'',
                    active:'0',
                    password:'',
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
                    lastPageSize:''
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
                        first_name:'',
                        last_name:'',
                        email:'',
                        lang_id:'',
                        role_id:'',
                        cc_rate:'',
                        active:'0',
                        password:'',
                        edit:false
                    }
                }
                this.get_lang();
                this.get_role();
            },

            // 获取语言
            get_lang(){
                let vm = this;
                this.$post('/lang/getLangList',{}).then((reData)=>{
                    vm.lang = reData.data;
                });
            },
            // 获取角色信息
            get_role(){
                let vm = this;
                this.$post('/role/getRoleInfoPage',{pageSize:'10000'}).then((reData)=>{
                    console.log(reData)
                    vm.role = reData.data.dataList;
                });
            },
            // 角色选择
            getAddRole(value){
                this.addCod.role_id = value
            },

            //语言选择
            getAddlang(value) {
                this.addCod.lang_id = value
            },
            getAddactive(value){
                this.addCod.active = value
            },
            // 修改cod内容
            editCod(id){
                var that = this;
                this.$post('/employee/getEmployeeList',{employee_id:id}).then((reData)=>{
                   console.log(reData)
                   reData.data[0].role_id = this.addCod.role_id;
                   this.addCod = reData.data[0];
                   this.addCod.edit = true;
                   delete this.addCod.passwd;
                   this.addCod.active= reData.data[0].active.toString()
                   this.addCodM(this.addCod.edit)
                })
            },

            //添加提交
            submitAdd(edit) {
                console.log(this.addCod)
                var flag = this.checkRes(this.addCod)
                if(flag == false){
                    return
                }
                if (edit) {
                    this.submitEdit()
                } else {
                    this.$post('/employee/addEmployeeInfo',this.addCod).then((reData)=>{
                        console.log("返回结果",reData)
                        if(reData.code === '0'){
                            this.$notification.open({
                                message: '添 加',
                                duration: 2,
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
                                duration: 2,
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
                this.$post('/employee/updateEmployeeInfo',this.addCod).then((reData)=>{
                    if(reData.code === '0'){
                         this.$notification.open({
                            message: '修 改',
                            duration: 2,
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
                            duration: 2,
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
                this.$post('/employee/getEmployeeInfoPage',data).then((reData)=>{
                    console.log(reData)
                    this.attributeList=reData.data.dataList
                    if(reData.data.dataList.length == 1){
                        this.pagination.lastPageSize = 1;
                    }
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
                this.$post('/employee/removeEmployeeInfo',{employee_id:id}).then((reData)=>{
                    if(reData.code === '0'){
                        this.$notification.open({
                            message: '删 除',
                            duration: 2,
                            description: reData.message,
                            onClick: () => {
                                console.log('ok');
                            },
                        })
                    //  this.$message.success(reData.message);
                        if(this.pagination.lastPageSize == 1 && this.pagination.currentPage>=2){
                            this.pagination.currentPage = this.pagination.currentPage - 1
                        }
                       this.getList({currentPage:this.pagination.currentPage,pageSize:this.pagination.defaultPageSize});
                    } else {
                        this.$notification.open({
                            message: '删 除',
                            duration: 2,
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
                console.log(111,data)
                if(data.first_name === '' || data.first_name === null){
                    this.$message.error("请填写名");
                    return false
                }
                if(data.last_name === '' || data.last_name === null){  
                    this.$message.error("请填写姓");
                    return false
                }
                if(data.email === '' || data.email === null){
                    this.$message.error("请填写邮箱");
                    return false
                }
                if(data.lang_id === '' || data.lang_id === null){
                    this.$message.error("请填选择语言");
                    return false
                }
                if(data.role_id === '' || data.role_id === null){
                    this.$message.error("请填选择角色");
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