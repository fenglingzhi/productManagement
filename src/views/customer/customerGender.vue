<template>
    <div class="customerGender">
        客户信息
        <div class="hrLine"></div>
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
                     :scroll="{ x: 1500 }">
              <span slot="action" slot-scope="text, record">
                  <a @click="editFun(record.lang_id,record.gender_id)">修改</a>
                  <a-divider type="vertical"></a-divider>
                  <a-popconfirm
                          v-if="productListData.length"
                          title="请确认删除"
                          @confirm="() => deleteFun({langId:record.lang_id,genderId:record.gender_id})">
                    <a>删除</a>
                  </a-popconfirm>

              </span>
                    <span slot="img_" slot-scope="text, record">
                  <img :src="text.image_url" alt="" height="32px;" style="border:1px solid #ccc;" v-if="text.image_url !== ''">
              </span>
            </a-table>
        </div>
        <div class="addCustomerGender">
            <a-modal
                    title="新增称呼"
                    v-model="visible_add"
                    @ok="submitGender"
            >
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName"><span style="color:red;">*</span>称呼：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输入称呼" v-model="addCustomerGenderData.name" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName"><span style="color:red;">*</span>状态：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange" :value="addCustomerGenderData.genderId">
                                <a-select-option value="">请选择</a-select-option>
                                <a-select-option value="1">男</a-select-option>
                                <a-select-option value="2">女</a-select-option>
                                <a-select-option value="3">中性</a-select-option>
                            </a-select>
                        </a-col>
                    </div>
                </a-row>
            </a-modal>
        </div>
        <div class="editCustomerGender">
            <a-modal
                    title="修改称呼"
                    v-model="visible_edit"
                    @ok="submitGender_e"
            >
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName"><span style="color:red;">*</span>称呼：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输入称呼" v-model="addCustomerGenderData.name" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName"><span style="color:red;">*</span>状态：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-select defaultValue="请选择"
                                      style="width: 100%"
                                      @change="handleChange"
                                      :value="addCustomerGenderData.genderId">
                                <!--<a-select-option value="">请选择</a-select-option>-->
                                <a-select-option value="1">男</a-select-option>
                                <a-select-option value="2">女</a-select-option>
                                <a-select-option value="3">中性</a-select-option>
                            </a-select>
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
        { title: '名称', dataIndex: 'name', key: 'name'},
        { title: '语言', dataIndex: 'langName', key: 'langName'},
        { title: '称呼', dataIndex: 'gender_id', key: 'gender_id'},
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
                productListData,
                columns,
                rowSelection,
                loading: false,
                pagination:{
                    defaultPageSize:10,
                    total:1,
                }
                ,addCustomerGenderData:{
                    name:''
                    ,genderId:''
                    ,langId:store.state.langId
                }
            }
        },
        methods: {
            //状态选择
            handleChange(value) {
                console.log(`selected ${value}`);
                this.addCustomerGenderData.genderId = value
            }
            //新增商品
            ,add_product(){
                this.visible_add = true;
                this.addCustomerGenderData.name = '';
                this.addCustomerGenderData.genderId = '';
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
            // 获取商品列表
            ,getList(data){
                this.loading = true;
                this.$post('/gender/getGenderList',data).then((reData)=>{
                    this.productListData=reData.data
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
                this.$post('/gender/deleteGenderInfo',data).then((reData)=>{
                    if(reData.code === '0'){
                        this.getList({langId:data.langId});
                    }
                })
            }
            //提交称呼
            ,submitGender(e) {
                console.log(this.addCustomerGenderData)
                if(this.addCustomerGenderData.name === ''){
                    this.$notification.open({
                        message: '警告',
                        description: '请填写名称'
                    });
                    return false;
                } else if(this.addCustomerGenderData.genderId === ''){
                    this.$notification.open({
                        message: '警告',
                        description: '请选择性别'
                    });
                    return false;
                } else {
                    this.$post('/gender/addGenderInfo',this.addCustomerGenderData).then((reData)=>{
                        if(reData.code === '0'){
                            this.visible_add = false
                            this.getList({langId:store.state.langId});
                        } else if(reData.code === '10012'){
                            this.$notification.open({
                                message: reData.message,
                            });
                            this.visible_add = false
                        }
                    })
                }
                // console.log(e);
            },
            submitGender_e() {
                let vm = this;
                console.log(this.addCustomerGenderData)
                // console.log(e);
                // vm.getList({langId:store.state.langId})
                this.$post('/gender/updateGenderInfo',this.addCustomerGenderData).then((reData)=>{
                    if(reData.code === '0'){
                        this.visible_edit = false
                        this.getList({langId:store.state.langId});
                    } else if(reData.code === '10012'){
                        this.$message.error(reData.message);
                        this.visible_edit = false
                    }
                })
            },
        },
        mounted() {
            var vm = this
            // store.commit('changeStore',{key:'title',val:'产品列表'});
            vm.getList({langId:store.state.langId})
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