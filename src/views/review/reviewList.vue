<template>
    <div class="reviewList">
        <a-row>
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="6">
                        <div class="inputName">评论ID：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="18">
                        <a-input placeholder="请输入评论ID" v-model="search_data.commentId" />
                    </a-col>
                </div>
            </a-col>
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="6">
                        <div class="inputName">Email ：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="18">
                        <a-input placeholder="请输入email" v-model="search_data.email"/>
                    </a-col>
                </div>
            </a-col>
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="6">
                        <div class="inputName">SKU ：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="18">
                        <a-input placeholder="请输入SKU" v-model="search_data.product_code"/>
                    </a-col>
                </div>
            </a-col>
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="6">
                        <div class="inputName">评论状态：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="18">
                        <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange">
                            <a-select-option value="">请选择</a-select-option>
                            <a-select-option value="1">显示</a-select-option>
                            <a-select-option value="0">隐藏</a-select-option>
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
                                <a-button type="primary" @click="search_product(search_data)">搜索</a-button>
                            </a-col>
                        </a-row>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <div class="hrLine"></div>
        <div>
            <a-table :columns="columns"
                     :dataSource="productListData"
                     :pagination="pagination"
                     :loading="loading"
                     align="center"
                     @change="handleTableChange"
                     :scroll="{ x: 1500 }">
          <span slot="action" slot-scope="text, record">
              <a @click="edit(record.product_id)">修改</a>

              <a-divider type="vertical"></a-divider>
              <a @click="deleteProduct({product_id:record.product_id})">删除{{record.product_id}}</a>
          </span>
                <span slot="img_" slot-scope="text, record">
              <img :src="text.image_url" alt="" height="32px;" style="border:1px solid #ccc;" v-if="text.image_url !== ''">
          </span>
                <span slot="score" slot-scope="text, record">
                    <a-rate  v-model='record.score' disabled></a-rate>
                </span>

                <a slot="active" slot-scope="text, record" style="text-align: center">
                    <!--{{record}}-->
                    <a-icon type="check" style="color: green" v-if="text === '1'" @click="change_active({commentId:record.comment_id,active:'0'})"></a-icon>
                    <a-icon type="close" style="color: red" v-if="text === '0'" @click="change_active({commentId:record.comment_id,active:'1'})"></a-icon>
                </a>
            </a-table>
        </div>
    </div>
</template>
<script>
    import router from '../../router';
    import store from '../../store'
    const columns = [
        { title: '评论ID', dataIndex: 'comment_id', key: 'comment_id'},
        { title: 'Email', dataIndex: 'email', key: 'email'},
        { title: '标题', dataIndex: 'title', key: 'title'},
        { title: 'SKU', dataIndex: 'product_code', key: 'product_code'},
        { title: '描述', dataIndex: 'description', key: 'description'},
        { title: '评分', dataIndex: 'score', key: 'score', align: 'center' ,scopedSlots: { customRender: 'score' },},
        { title: '添加时间', dataIndex: 'add_date', key: 'add_date'},
        { title: '状态', dataIndex: 'active', key: 'active', align: 'center' ,scopedSlots: { customRender: 'active' },},
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
                productListData,
                columns,
                rowSelection,
                loading: false,
                pagination:{
                    defaultPageSize:10,
                    total:1,
                }
                ,fabricList:[]
                ,search_data:{
                    commentId:''
                    ,customerId:''
                    ,active:''
                    ,productId:''
                    ,email:''
                    ,
                }
            }
        },
        methods: {
            //状态选择
            handleChange(value) {
                console.log(`selected ${value}`);
                this.search_data.active = value
            }
            // 获取评论列表
            ,getList(data){
                this.loading = true;
                this.$post('/productComment/getProductCommentPage',data).then((reData)=>{
                    this.productListData=reData.data.result
                    this.pagination.total=reData.data.page.totalResultSize
                    this.loading = false
                })
            }
            //表格分页
            ,handleTableChange(pagination){
                console.log(pagination.defaultPageSize)
                this.getList({currentPage:pagination.current,page_size:pagination.defaultPageSize})
            }
            //搜索评论
            ,search_product(data){
                this.$post('/productComment/getProductCommentPage',data).then((reData)=>{
                    this.productListData=reData.data.result
                    this.pagination.total=reData.data.page.totalResultSize
                    this.loading = false
                })
            }
            //更改评论状态
            ,change_active(data){
                this.$post('/productComment/updateProductCommentActive',data).then((reData)=>{
                    if(reData.code === '0'){
                        this.getList({page:1,page_size:this.pagination.defaultPageSize});
                    }
                })
            }
        },
        mounted() {
            var vm = this
            store.commit('changeStore',{key:'title',val:'产品列表'});
            vm.getList({currentPage:1,page_size:vm.pagination.defaultPageSize})
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