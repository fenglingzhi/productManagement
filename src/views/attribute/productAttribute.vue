<template>
    <div class="productAttribute">
        <div>
            <div style="margin-bottom: 16px">
                <a-button type="primary" @click="addAttribute()">
                    新增
                </a-button>
                <a-button type="primary" @click="deleteAllAttribute({ids:deleteAllData,status:'200'})" style="margin-left: 20px;">
                    批量删除
                </a-button>
                <a-button type="primary" @click="returnAttribute()" style="margin-left: 20px;" v-show="addAttributeInfo.parent_id != 0">
                    返回
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
                  <a @click="editAttribute(record.attribute_id)">修改</a>
                  <a-divider type="vertical"></a-divider>

                  <a @click="deleteProduct({status:0,ids:record.attribute_id})">删除</a>
              </span>
              <span slot="redirect" slot-scope="text, record">
                  <a @click="select_attribute_child(record.attribute_id)">{{record.attribute_name}}</a>
              </span>
                <a slot="active" slot-scope="text, record" style="text-align: center">
                    <a-icon type="check" style="color: green" v-if="text === '1'" @click="change_active({product_id:record.product_id,active:'0'})"></a-icon>
                    <a-icon type="close" style="color: red" v-if="text === '0'" @click="change_active({product_id:record.product_id,active:'1'})"></a-icon>
                </a>
            </a-table>
        </div>
        <div class="addproductAttribute">
            <a-modal
                    title="新增属性信息"
                    v-model="visible_add"
                    :destroyOnClose="true"
                    @ok="addAttributeCommit(addAttributeInfo)"
            >
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">属性名称：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输入属性名称" v-model="addAttributeInfo.attribute_name" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">属性值 ：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输入属性值" v-model="addAttributeInfo.attribute_val"/>
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">属性排序 ：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输入属性排序" v-model="addAttributeInfo.attribute_seq"/>
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">属性状态：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-select defaultValue="请选择" style="width: 100%"  @change="handleChangeadd">
                                <a-select-option value="100">启用</a-select-option>
                                <a-select-option value="400">禁用</a-select-option>
                            </a-select>
                        </a-col>
                    </div>
                </a-row>
            </a-modal>
        </div>
        <div class="editproductAttribute">
            <a-modal
                    title="新增属性信息"
                    v-model="visible_add"
                    :destroyOnClose="true"
                    @ok="editAttributeCommit(addAttributeInfo)"
            >
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">属性名称：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输入属性名称" v-model="addAttributeInfo.attribute_name" />
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">属性值 ：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输入属性值" v-model="addAttributeInfo.attribute_val"/>
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">属性排序 ：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="请输入属性排序" v-model="addAttributeInfo.attribute_seq"/>
                        </a-col>
                    </div>
                </a-row>
                <a-row>
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">属性状态：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-select defaultValue="请选择" style="width: 100%"  @change="handleChangeEdit" :value="addAttributeInfo.status">
                                <a-select-option value="100">启用</a-select-option>
                                <a-select-option value="400">禁用</a-select-option>
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
        {title: '操作', key: 'action', fixed: 'left', scopedSlots: { customRender: 'action' },},
        { title: '属性名称', dataIndex: 'attribute_name', key: 'attribute_name', scopedSlots: { customRender: 'redirect' },},
        { title: '属性排序值', dataIndex: 'attribute_seq', key: 'attribute_seq'},
    ];
    const attributeList = [];
    //表格复选框
    // const
    export default {
        data() {
            return {
                attributeList,
                router,
                columns,
                store,
                visible_add: false,
                visible_edit: false,
                visible_search: false,
                loading: false,
                pagination:{
                    defaultPageSize:10,
                    total:1,
                },
                deleteAllData:'',
                rowSelection:{
                    onChange: (selectedRowKeys, selectedRows) => {
                        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                        let deleteAllData = ''
                        selectedRows.forEach(function (val,index) {
                            deleteAllData += val.attribute_id + (index === selectedRows.length -1 ? '' : ',')
                        })
                        this.deleteAllData = deleteAllData
                    },
                },
                addAttributeInfo:{
                    parent_id:'0',
                    attribute_name:'',
                    attribute_seq:'',
                    attribute_val:'',
                    status:'',
                    lang_id:store.state.langId
                },
                flag:0
            }
        },
        methods: {
            //新增属性
            addAttribute(){
                this.visible_add = true;
            }
            //新增属性选择
            ,handleChangeadd(value) {
                this.addAttributeInfo.status = value
            }
            ,handleChangeEdit(){
                this.addAttributeInfo.status = value
            }
            //提交属性新增
            ,addAttributeCommit(data){
                this.$post('/property/addProperty',data).then((reData)=>{
                    if(reData.code === '0'){
                        if(this.addAttributeInfo.parent_id === 0){
                            this.visible_add = false;
                            this.getList({parent_id:0,pageSize:this.pagination.defaultPageSize,lang_id:store.state.langId})
                        } else {
                            this.visible_add = false;
                            this.getList({parent_id:this.addAttributeInfo.parent_id,pageSize:this.pagination.defaultPageSize,lang_id:store.state.langId})
                        }

                    } else {
                        this.$message.error(reData.message);
                    }
                })
            }
            //修改属性
            ,editAttribute(data){
                this.visible_edit = true;
                this.$post('/property/getPropertyById',{
                    property_id:data,
                    parent_id:this.addAttributeInfo.parent_id,
                    lang_id:store.state.langId
                }).then((reData)=>{
                    if(reData.code === '0'){
                        console.log(reData.data)
                        // this.editAttributeInfo.ids = reData.data[0].attribute_id;
                        // this.editAttributeInfo.parent_id = reData.data[0].parent_id;
                        // this.editAttributeInfo.attribute_name = reData.data[0].attribute_name;
                        // this.editAttributeInfo.attribute_val = reData.data[0].attribute_val;
                        // this.editAttributeInfo.attribute_seq = reData.data[0].attribute_seq;
                        // this.editAttributeInfo.status = reData.data[0].status;
                        // store.commit('changeStore',{key:'attribute_parent_id',val:reData.data[0].parent_id});
                        console.log(this.$store.state.attribute_parent_id)
                    } else {
                        this.$message.error(reData.message);
                    }
                })
            }
            ,editAttributeCommit(){

            }
            // 获取属性列表
            ,getList(data){
                this.loading = true;
                this.$post('/property/getPropertyListPage',data).then((reData)=>{
                    this.attributeList=reData.data.dataList
                    this.pagination.total=reData.data.page.totalResultSize
                    this.loading = false
                })
            }
            //表格分页
            ,handleTableChange(pagination){
                console.log(pagination.defaultPageSize)
                this.getList({page:pagination.current,page_size:pagination.defaultPageSize})
            }
            //删除商品
            ,deleteProduct(data){
                this.$post('/property/deleteProperty',data).then((reData)=>{
                    if(reData.code === '0'){
                        this.getList({parent_id:0,lang_id:store.state.langId});
                    } else {
                        this.$message.error(reData.message);
                    }
                })
            }
            //批量删除
            ,deleteAllAttribute(data){
                this.$post('/property/deleteProperty',data).then((reData)=>{
                    if(reData.code === '0'){
                        this.$message.success(reData.message);
                        this.getList({parent_id:0,lang_id:store.state.langId});
                    } else {
                        this.$message.error(reData.message);
                    }
                })
            }
            //选择子属性
            ,select_attribute_child(data){
                this.addAttributeInfo.parent_id = data;
                console.log(data)
                if(this.flag === 0){
                    this.getList({parent_id:data,pageSize:this.pagination.defaultPageSize,lang_id:store.state.langId})
                    this.flag = 1;
                }
            }
            //返回父属性列表
            ,returnAttribute(){
                this.flag = 0;
                this.addAttributeInfo.parent_id = 0;
                this.getList({parent_id:0,pageSize:this.pagination.defaultPageSize,lang_id:store.state.langId})
            }
        },
        mounted() {
            var vm = this;
            store.commit('changeStore',{key:'title',val:'属性列表'});
            vm.getList({parent_id:0,pageSize:vm.pagination.defaultPageSize,lang_id:store.state.langId})
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
    .show_text{
        line-height: 32px;
    }
</style>