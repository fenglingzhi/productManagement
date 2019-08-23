<template>
    <div class="productAttribute">
        <div>
            <div style="margin-bottom: 16px">
                <a-button type="primary" @click="addAttribute()">
                    新增
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
                     :scroll="{ x: 1500 }">
              <span slot="action" slot-scope="text, record">
                  <a @click="editAttribute(record.attribute_id)">修改</a>
                  <a-divider type="vertical"></a-divider>

              <a-popconfirm
                          v-if="attributeList.length"
                          title="请确认删除"
                          @confirm="() => deleteProduct({status:0,ids:record.attribute_id})">
                <a @click="">删除</a>
              </a-popconfirm>

              </span>
              <span slot="redirect" slot-scope="text, record">
                  <a @click="select_attribute_child(record.attribute_id)" v-if="addAttributeInfo.parent_id == '0'">{{record.attribute_name}}</a>
                  <a class="" disabled v-if="addAttributeInfo.parent_id != '0'" style="color:#000000a6">{{record.attribute_name}}</a>
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
                    title="修改属性信息"
                    v-model="visible_edit"
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
                    currentPage:'1',
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
                    lang_id:store.state.langId,
                    ids:'',
                },
                flag:0,
                disabled:true
            }
        },
        methods: {
            //新增属性
            addAttribute(){
                this.visible_add = true;
                this.addAttributeInfo.attribute_name = '';
                this.addAttributeInfo.attribute_seq = '';
                this.addAttributeInfo.attribute_val = '';
                this.addAttributeInfo.status = '';
            }
            //新增属性选择
            ,handleChangeadd(value) {
                this.addAttributeInfo.status = value
            }
            //编辑属性选择
            ,handleChangeEdit(value){
                this.addAttributeInfo.status = value
            }
            //提交属性新增
            ,addAttributeCommit(data){
                if(data.attribute_name === ''){
                    this.$notification.open({
                        message: '警告',
                        description: '请填写属性名称'
                    });
                    return false;
                } else if(data.attribute_seq === ''){
                    this.$notification.open({
                        message: '警告',
                        description: '请填写属性排序'
                    });
                    return false;
                } else if(data.attribute_val === ''){
                    this.$notification.open({
                        message: '警告',
                        description: '请填写属性值'
                    });
                    return false;
                }else if(data.status === ''){
                    this.$notification.open({
                        message: '警告',
                        description: '请填写属性状态'
                    });
                    return false;
                } else {
                    this.$post('/property/addProperty',data).then((reData)=>{
                        if(reData.code === '0'){
                            if(this.addAttributeInfo.parent_id === 0){
                                this.visible_add = false;
                                this.getList({
                                    parent_id:0,
                                    currentPage:this.pagination.currentPage,
                                    pageSize:this.pagination.defaultPageSize,
                                    lang_id:store.state.langId
                                })
                            } else {
                                this.visible_add = false;
                                this.getList({
                                    parent_id:this.addAttributeInfo.parent_id,
                                    currentPage:this.pagination.currentPage,
                                    pageSize:this.pagination.defaultPageSize,
                                    lang_id:store.state.langId
                                })
                            }

                        } else {
                            this.$notification.open({
                                message: reData.message,
                            });
                        }
                    })
                }
                // if(this.addAttributeInfo.parent_id)
                console.log(this.checkForm(this.addAttributeInfo))


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
                        this.addAttributeInfo.ids = reData.data[0].attribute_id;
                        this.addAttributeInfo.parent_id = reData.data[0].parent_id;
                        this.addAttributeInfo.attribute_name = reData.data[0].attribute_name;
                        this.addAttributeInfo.attribute_val = reData.data[0].attribute_val;
                        this.addAttributeInfo.attribute_seq = reData.data[0].attribute_seq;
                        this.addAttributeInfo.status = reData.data[0].status;
                        console.log(this.$store.state.attribute_parent_id)
                    } else {
                        this.$notification.open({
                            message: reData.message,
                        });
                    }
                })
            }
            //提交修改属性
            ,editAttributeCommit(data){
                this.$post('/property/updateProperty',data).then((reData)=>{
                    if(reData.code === '0'){
                        this.$notification.open({
                            message: reData.message,
                        });
                        this.visible_edit = false;
                        this.getList({parent_id:data.parent_id,pageSize:this.pagination.defaultPageSize,lang_id:store.state.langId})
                    } else {
                        this.$notification.open({
                            message: reData.message,
                        });
                    }
                })
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
                this.getList({
                    parent_id:this.addAttributeInfo.parent_id,
                    currentPage:pagination.current,
                    pageSize:pagination.defaultPageSize,
                    lang_id:store.state.langId
                })
            }
            //删除商品
            ,deleteProduct(data){
                this.$post('/property/deleteProperty',data).then((reData)=>{
                    if(reData.code === '0'){
                        this.getList({
                            parent_id:this.addAttributeInfo.parent_id,
                            pageSize:this.pagination.defaultPageSize,
                            lang_id:store.state.langId
                        })
                    } else {
                        this.$notification.open({
                            message: reData.message,
                        });
                    }
                })
            }
            //选择子属性
            ,select_attribute_child(data){
                this.addAttributeInfo.parent_id = data;
                console.log(data)
                if(this.flag === 0){
                    this.getList({
                        parent_id:data,
                        pageSize:this.pagination.defaultPageSize,
                        lang_id:store.state.langId
                    })
                    this.flag = 1;
                }
            }
            //返回父属性列表
            ,returnAttribute(){
                this.flag = 0;

                this.getList({
                    parent_id:0,
                    pageSize:this.pagination.defaultPageSize,
                    lang_id:store.state.langId
                })
                this.addAttributeInfo.parent_id = 0;
            }
            //表单校验
            ,checkForm(obj){

            }

        },
        mounted() {
            var vm = this;
            // store.commit('changeStore',{key:'title',val:'属性列表'});
            vm.getList({
                parent_id:0,
                currentPage:this.pagination.currentPage,
                pageSize:vm.pagination.defaultPageSize,
                lang_id:store.state.langId
            })
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