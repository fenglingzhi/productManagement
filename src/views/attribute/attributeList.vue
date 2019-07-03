<template>
    <div class="producetList">

        <!--<div class="hrLine"></div>-->
        <div>
            <div style="margin-bottom: 16px">
                <a-button type="primary" @click="addAttribute(store.state.attribute_child_id)">
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
                  <a href="javascript:;">修改{{text.id}}</a>
                  <a-divider type="vertical"></a-divider>
                  <a @click="deleteProduct({status:0,ids:record.attribute_id})">删除{{record.product_id}}</a>
              </span>
                <span slot="redirect" slot-scope="text, record">
                  <a>{{record.attribute_name}}</a>
              </span>
                <a slot="active" slot-scope="text, record" style="text-align: center">
                    <!--{{record}}-->
                    <a-icon type="check" style="color: green" v-if="text === '1'" @click="change_active({product_id:record.product_id,active:'0'})"></a-icon>
                    <a-icon type="close" style="color: red" v-if="text === '0'" @click="change_active({product_id:record.product_id,active:'1'})"></a-icon>
                </a>
            </a-table>
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
                attributeList,
                store,
                columns,
                rowSelection,
                loading: false,
                pagination:{
                    defaultPageSize:10,
                    total:1,
                }
            }
        },
        methods: {
            //新增属性
            addAttribute(data){
                store.commit('changeStore',{key:'attribute_parent_id',val:data});
                router.push('/addAttribute')
            }
            // 获取商品列表
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

            //更改商品状态
            ,change_active(data){
                this.$post('/product/editDisableProduct',data).then((reData)=>{
                    if(reData.code === '0'){
                        this.getList({page:1,page_size:this.pagination.defaultPageSize});
                    }
                })
            }
            //删除商品
            ,deleteProduct(data){
                this.$post('/property/deleteProperty',data).then((reData)=>{
                    if(reData.code === '0'){
                        this.getList({parent_id:store.state.attribute_child_id});
                    } else {
                        this.$message.error(reData.message);
                    }
                })
            }
        },
        mounted() {
            var vm = this;
            store.commit('changeStore',{key:'title',val:'产品列表'});
            vm.getList({parent_id:store.state.attribute_child_id,pageSize:vm.pagination.defaultPageSize})
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