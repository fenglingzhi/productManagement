<template>
    <div class="producetAdd">
        <a-button type="primary" @click="commitProductNum()" style="margin-bottom: 20px;">
            保存
        </a-button>
        <a-table :columns="columns"
                 :dataSource="tabList"
                 align="center"
                 :scroll="{ x: 1000 }">
            <span slot="productNum" slot-scope="text, record">
                <a-input v-model="text.productNum" placeholder=""/>
            </span>
        </a-table>
    </div>
</template>
<script>
    var vm =this
    import router from '../../router'
    import store from '../../store'
    import $ from 'jquery'

    const columns = [
        {title: '商品库存数量', key: 'productNum', scopedSlots: { customRender: 'productNum' },},
        { title: '属性商品名称', dataIndex: 'unit_name', key: 'unit_name'},
        { title: '属性商品码', dataIndex:'unit_code',key: 'unit_code',},
        { title: 'ean13',dataIndex:'ean13', key: 'ean13', },
        { title: 'upc码',dataIndex:'upc', key: 'upc', },
        { title: '颜色ID', dataIndex: 'color_id', key: 'color_id'},
        { title: '尺码ID', dataIndex: 'size_id', key: 'size_id'},
    ];
    export default {
        data() {
            return {
                columns,
                productId:'',
                tabList:[],
            }
        } ,
        components:{

        },
        methods: {
            getTabData(data){
                this.$post('/productUnit/getProductUnitList',data).then((reData)=>{
                    this.tabList = reData.data.dataList.slice(0)
                    console.log('222222222222222222',reData.data.dataList)
                    console.log('111111111111111111',this.tabList)
                })
            },
            commitProductNum(){
                let vm = this;
                $.ajax({
                    dataType:'JSON',
                    type: 'POST',
                    url: vm.$store.state.baseURL+'/productUnitStock/editProductUnitStock' ,
                    data: {unitList:JSON.stringify(vm.tabList)} ,
                    // traditional: true,
                    success: function (reData) {
                        vm.$notification.open({
                            message: '提醒',
                            description: reData.message,
                            onClick: () => {
                                console.log('ok');
                            },
                        })
                    } ,

                });
            }
        } ,
        mounted() {
            this.getTabData({product_id:this.$store.state.goods_id})
        },

        watch: {
            "$store.state.goods_id"() {
                this.productId =  this.$store.state.goods_id;
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
    .choseLists{
        height: 150px;
        overflow: auto;
    }
    .ant-checkbox-group{
        width: 100%;
    }
</style>