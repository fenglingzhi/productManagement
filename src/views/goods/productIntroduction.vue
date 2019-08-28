<template>
    <div class="producetAdd">
        <form :action="$store.state.baseURL+'/import/importActivityCategoryProduct'" id="form1" method="post"  enctype="multipart/form-data">
            <div class="secondTitle">
                <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                    BANNER活动分类产品导入：
                </a-col>
                <a-col class="gutter-row" :span="3">
                    <a-row>
                        <a-col class="gutter-row" :offset="12" :span="12">
                            <!--<a-button type="primary"  @click="saveProductInfor()">保存</a-button>-->
                            <input type="submit" @click="subForm1()" class="subForm" value="上传">
                        </a-col>
                    </a-row>
                </a-col>
            </div>
            <a-row class="gutter-row">
                <a-col class="gutter-row" :span="6">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="8">
                            <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>分类：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="16">
                            <a-select  style="width: 100%" defaultValue="请选择分类" @change="handleChangeSelect">
                                <a-select-option v-for="item in categoryList" :value="item.category_id">{{item.name}}</a-select-option>
                            </a-select>
                        </a-col>
                    </div>
                </a-col>
            </a-row>
            <a-row>
                <a-col class="gutter-row" :span="6">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="8">
                            <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>选择文件：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="12">
                                <input type="file" class="file1" name="myFile" ><br/>
                                <input type="hidden" v-model="categoryId" name="category_id" ><br/>
                                <a target="_blank" href="http://192.168.0.18:82/import/import.xls">文件模板下载</a>
                        </a-col>
                    </div>
                </a-col>
            </a-row>
        </form>
<div style="height: 80px;"></div>

        <form :action="$store.state.baseURL+'/import/importGeneralCategoryProduct'" id="form2" method="post"  enctype="multipart/form-data">
            <div class="secondTitle">
                <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                    普通分类产品导入 ：
                </a-col>
                <a-col class="gutter-row" :span="3">
                    <a-row>
                        <a-col class="gutter-row" :offset="12" :span="12">
                            <input type="submit" class="subForm" @click="subForm2()" value="上传">
                        </a-col>
                    </a-row>
                </a-col>
            </div>
            <a-row class="gutter-row">
                <a-col class="gutter-row" :span="6">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="8">
                            <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>选择分类：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="16">
                            <template>
                                <a-tree
                                        @expand="onExpand"
                                        :expandedKeys="expandedKeys"
                                        @select="onSelect"
                                        :autoExpandParent="autoExpandParent"
                                        :treeData="treeData"
                                >
                                </a-tree>
                            </template>
                        </a-col>
                    </div>
                </a-col>
            </a-row>
            <a-row>
                <a-col class="gutter-row" :span="6">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="8">
                            <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>选择文件：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="12">
                            <input type="file" class="file2" name="myFile" ><br/>
                            <input type="hidden" v-model="selectedKeys" name="category_id" ><br/>
                            <a target="_blank" href="http://192.168.0.18:82/import/import.xls">文件模板下载</a>
                        </a-col>
                    </div>
                </a-col>
            </a-row>
        </form>


        <div style="height: 80px;"></div>

        <form :action="$store.state.baseURL+'/import/importModifyProduct'" id="form3" method="post"  enctype="multipart/form-data">
            <div class="secondTitle">
                <a-col class="gutter-row" :span="18" style="padding-top: 13px;">
                    更新产品表 ：
                </a-col>
                <a-col class="gutter-row" :span="6">
                    <a-row>
                        <a-col class="gutter-row" :offset="10" :span="8">
                            <div  class="subForm" style="line-height: 30px;" @click="showProducts()">缓存商品</div>
                        </a-col>
                        <a-col class="gutter-row" :span="4">
                            <input type="submit" class="subForm" @click="subForm3()" value="上传">
                        </a-col>

                    </a-row>
                </a-col>
            </div>
            <a-row>
                <a-col class="gutter-row" :span="6">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="8">
                            <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>选择文件：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="12">
                            <input type="file" class="file3" name="myFile"><br/>
                            <a target="_blank" href="http://192.168.0.18:82/import/product_import.xls">文件模板下载</a>
                        </a-col>
                    </div>
                </a-col>
            </a-row>
        </form>
        <div style="height: 80px;"></div>

        <form :action="$store.state.baseURL+'/import/importProductTag'" id="form4" method="post"  enctype="multipart/form-data">
            <div class="secondTitle">
                <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                    TAG标签产品导入：
                </a-col>
                <a-col class="gutter-row" :span="3">
                    <a-row>
                        <a-col class="gutter-row" :offset="12" :span="12">
                            <input type="submit" @click="subForm4()" class="subForm" value="上传">
                        </a-col>
                    </a-row>
                </a-col>
            </div>
            <a-row class="gutter-row">
                <a-col class="gutter-row" :span="6">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="8">
                            <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>Tag标签：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="16">
                            <a-select  style="width: 100%" defaultValue="请选择标签" @change="handleChangeSelect4">
                                <a-select-option v-for="item in tagList" :value="item.tag_id">{{item.name}}</a-select-option>
                            </a-select>
                        </a-col>
                    </div>
                </a-col>
            </a-row>
            <a-row>
                <a-col class="gutter-row" :span="6">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="8">
                            <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>选择文件：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="12">
                            <input type="file" class="file1" name="myFile" ><br/>
                            <input type="hidden" v-model="tagId" name="tag_id" ><br/>
                            <a href="http://192.168.0.18:82/import/import.xls">文件模板下载</a>
                        </a-col>
                    </div>
                </a-col>
            </a-row>
        </form>


        <a-modal
                title="选择上传的商品"
                width="1100px"
                v-model="visible_post"
                :loading="loading"
                :destroyOnClose = "true"
                @ok="submitAddProducts"
        >

            <!--<a-row>-->
                <!--<div class="inputPart">-->
                    <!--<a-col class="gutter-row" :span="3">-->
                        <!--<div class="inputName"><span style="color: red;margin-right: 5px;">*</span>是否已上传：</div>-->
                    <!--</a-col>-->
                    <!--<a-col class="gutter-row" :span="9">-->
                        <!--<a-select v-model="isPast" style="width: 100%"   @change="makeChange">-->
                            <!--<a-select-option value="0">是</a-select-option>-->
                            <!--<a-select-option value="1">否</a-select-option>-->
                        <!--</a-select>-->
                    <!--</a-col>-->
                <!--</div>-->
            <!--</a-row>-->
            <a-table :rowSelection="rowSelection"  rowKey="import_id"  @change="handleTableChange"  :pagination="pagination" :scroll="{ x: 5000 }":columns="columns"  :dataSource="data">
                <span slot="active" v-if="text!=0" slot-scope="text" >已上传</span>
                <span slot="active" v-else slot-scope="text" >未上传</span>
            </a-table>



        </a-modal>

    </div>
</template>
<script>

    var vm =this
    import router from '../../router'
    import store from '../../store'
    import $ from 'jquery'
    import  'jquery-form'
    const treeData = []


    const columns = [
        {
        title: '状态',
        dataIndex: 'active',
        scopedSlots: { customRender: 'active' },
    },{
        title: '产品名称',
        dataIndex: 'name',
    }, {
        title: '产品code码',
        dataIndex: 'product_code',
    }, {
        title: 'SKU',
        dataIndex: 'unit_code',
    }, {
        title: '价格($)',
        dataIndex: 'price',
    }, {
        title: '属性产品重量(kg)',
        dataIndex: 'unit_weight',
    }, {
        title: '产品库存数量',
        dataIndex: 'good_qty',
    }, {
        title: '颜色',
        dataIndex: 'color',
    }, {
        title: 'ean码',
        dataIndex: 'ean13',
    }, {
        title: '产品简述',
        dataIndex: 'description_short',
    }, {
        title: '描述',
        dataIndex: 'description',
    }, {
        title: '前台尺寸',
        dataIndex: 'size_guide',
    }, {
        title: 'meta_keywords',
        dataIndex: 'meta_keywords',
    }, {
        title: 'meta_descprition',
        dataIndex: 'meta_descprition',
    }, {
        title: 'tag标签',
        dataIndex: 'tag',
    }, {
        title: 'cost price',
        dataIndex: 'cost_price',
    }, {
        title: '优惠开始时间',
        dataIndex: 'discount_start_time',
    }, {
        title: '优惠结束时间',
        dataIndex: 'discount_end_time',
    }, {
        title: '新品优惠折扣',
        dataIndex: 'product_discount',
    }, {
        title: 'meta title',
        dataIndex: 'meta_title',
    }, {
        title: '一级分类',
        dataIndex: 'category_one',
    }, {
        title: '二级分类',
        dataIndex: 'category_two',
    }, {
        title: '三级分类',
        dataIndex: 'category_three',
    }, {
        title: '属性产品upc',
        dataIndex: 'upc',
    }, {
        title: '属性产品size',
        dataIndex: 'size',
    }, {
        title: '中东站SKU',
        dataIndex: 'dolor_unit_code',
    }];
    const data = [];
    export default {
        components:{
        },
        methods: {
            makeChange(){
                this.pagination.currentPage=1
                this.getTableList({currentPage:this.pagination.currentPage,pageSize:this.pagination.defaultPageSize})
            },
            submitAddProducts(){
                if(this.choseRow.length==0){
                    this.$notification.open({
                        message: '提醒',
                        duration: 2,
                        description: "请先选择要上传的商品！",
                        onClick: () => {
                            console.log('ok');
                        },
                    })
                }else {
                    let import_ids=''
                    this.choseRow.forEach(function (value) {
                        import_ids=import_ids+value.import_id+','
                    })
                    this.$post('/import/importOfficialData',{import_ids:import_ids}).then((reData)=>{
                        if(reData.code=="0"){

                    this.$notification.open({
                        message: '成功',
                        duration: 2,
                        description: "成功上传商品！",
                        onClick: () => {
                            console.log('ok');
                        },
                    })
                    this.getTableList({currentPage:this.pagination.currentPage,pageSize:this.pagination.defaultPageSize})

                        }else {
                            this.$notification.open({
                                message: '提醒',
                                duration: 2,
                                description:reData.message,
                                onClick: () => {
                                    console.log('ok');
                                },
                            })
                        }
                    })

                }
            }
            ,handleTableChange(pagination){
                this.pagination.currentPage = pagination.current
                this.getTableList({currentPage:pagination.current,pageSize:this.pagination.defaultPageSize})
            },
            getTableList(data){
            this.$post('/import/getImportTempPage',data).then((reData)=>{
                if(reData.code=="0"){
                    this.visible_post=true
                    this.data=reData.data.dataList
                    this.pagination.total=reData.data.page.totalResultSize
                    this.loading = false
                }else {
                    this.$message.error(reData.message);
                }
            })

        },
            showProducts(){

                this.getTableList({currentPage:1,pageSize:this.pagination.defaultPageSize})
            },
            subForm1(){
                if(this.categoryId ==''){
                    this.$message.error('请先选择分类');

                }else if($(".file1").val()==''){
                    this.$message.error('请选择文件');
                }
            },
            subForm2(){
                if(this.selectedKeys ==''){
                    this.$message.error('请先选择分类');

                }else if($(".file2").val()==''){
                    this.$message.error('请选择文件');
                }
            },
            subForm3(){
                if($(".file3").val()==''){
                    this.$message.error('请选择文件');
                }
            },
            subForm4(){
                if(this.tagId ==''){
                    this.$message.error('请先选择分类');
                }else if($(".file4").val()==''){
                    this.$message.error('请选择文件');
                }
            },
            onExpand (expandedKeys) {
                this.expandedKeys = expandedKeys
                this.autoExpandParent = false
            },

            onSelect (selectedKeys, info) {
                this.selectedKeys = selectedKeys[0]
            },


            handleChangeSelect4(val){
                this.tagId= val
            },
            handleChangeSelect(val){
                this.categoryId = val
            }
            ,getCategoryAllList(data){
                this.$post('/category/getCategoryAllList',data).then((reData)=>{
                    if(reData.code=="0"){
                       this.categoryList = reData.data
                    }else {
                        this.$message.error(reData.message);
                    }
                })

            }
            ,getTagAllList(data){

                this.$post('/productTag/getProductTagList',data).then((reData)=>{
                    if(reData.code=="0"){
                        this.tagList = reData.data
                    }else {
                        this.$message.error(reData.message);
                    }
                })
            }
            ,getCollection(){
                    this.$fetch('/category/getAllCategoryTree',{lang_id:this.$store.state.langId}).then((reData)=>{
                        this.treeData = JSON.parse(JSON.stringify(reData.data).replace(/name/g,"title").replace(/categoryId/g,"key"))
                     })
            }
        } ,
        mounted() {
            var vm =this
            /** 验证文件是否导入成功  */
            $("#form1").ajaxForm(function(data){
                if(vm.categoryId!=''){
                    if(data.code=='0'){
                        vm.$message.success(data.message);
                    }else {
                        vm.$message.error(data.message);
                    }
                }

            });
            $("#form2").ajaxForm(function(data){
                if(vm.selectedKeys!=''){
                    if(data.code=='0'){
                        vm.$message.success(data.message);
                    }else {
                        vm.$message.error(data.message);
                    }
                }


            });
            $("#form3").ajaxForm(function(data){
                    if(data.code=='0'){
                        vm.$message.success(data.message);
                    }else {
                        vm.$message.error(data.message);
                    }

            });
            $("#form4").ajaxForm(function(data){
                if(vm.tagId!=''){
                    if(data.code=='0'){
                        vm.$message.success(data.message);
                    }else {
                        vm.$message.error(data.message);
                    }
                }
            });
            this.getCategoryAllList({lang_id:this.$store.state.langId,is_banner:1})
            this.getTagAllList({lang_id:this.$store.state.langId})
            this.getCollection()
        },
        data() {
            return {
                isPast:"1",
                choseRow:[],
                loading: false,
                pagination:{
                    currentPage:1,
                    defaultPageSize:7,
                    total:1,
                },
                data,
                columns,
                visible_post:false,
                tagList:[],
                expandedKeys: [],
                autoExpandParent: true,
                selectedKeys: '',
                treeData,
                categoryList:[]
                ,categoryId:''
                ,tagId:''
            }
        } ,
        computed: {
            rowSelection() {

                const { selectedRowKeys } = this;
                console.log(this)
                return {
                onChange: (selectedRowKeys, selectedRows) => {
                        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                        this.choseRow=selectedRows
                    },
                    getCheckboxProps: record => ({
                        props: {
                            disabled: record.active == '1', // Column configuration not to be checked
                            // name: record.name,
                        }
                    }),
                }
            }
        },
        watch: {
            "$store.state.goods_id"() {

            }
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
    .secondTitle{
        text-align: left;
        font-size: 16px;
        font-weight: bold;
        width: 100%;
        border-bottom: 1px solid #999;
        margin-bottom: 24px;
        padding-bottom: 12px;
        box-shadow: 0 0 black;
        height: 50px;
    }
    .ant-upload-select-picture-card i {
        font-size: 32px;
        color: #999;
    }

    .ant-upload-select-picture-card .ant-upload-text {
        margin-top: 8px;
        color: #666;
    }
    .subForm{
        line-height: 1.499;
        display: inline-block;
        font-weight: 400;
        text-align: center;
        touch-action: manipulation;
        cursor: pointer;
        background-image: none;
        border: 1px solid transparent;
        white-space: nowrap;
        padding: 0 15px;
        font-size: 14px;
        border-radius: 4px;
        height: 32px;
        user-select: none;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        position: relative;
        background-color: #1890ff;
        border-color: #1890ff;
        text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
        color: white;
    }

</style>