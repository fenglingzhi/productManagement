<template>
    <div class="producetAdd">
        <div class="secondTitle">
            <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                产品分类：
            </a-col>
            <a-col class="gutter-row" :span="3">
                <a-row>
                    <a-col class="gutter-row" :offset="12" :span="12">
                        <a-button type="primary"  @click="saveProductInfor()">保存</a-button>
                    </a-col>
                </a-row>
            </a-col>
        </div>
        <a-row>
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="6">
                        <div class="inputName">*默认分类：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="18">
                        <a-select  style="width: 100%" defaultValue="1" @change="handleChangeSelect">
                            <a-select-option value="1">比基尼</a-select-option>
                            <a-select-option value="2">连体裤</a-select-option>
                            <a-select-option value="3">长腿裤</a-select-option>
                        </a-select>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <!--<a-row>-->
            <!--<a-col class="gutter-row" :span="6">-->
                <!--<div class="inputPart">-->
                    <!--<a-col class="gutter-row" :span="6">-->
                        <!--<div class="inputName">*默认分类：</div>-->
                    <!--</a-col>-->
                    <!--<a-col class="gutter-row" :span="18">-->
                        <!--<a-input v-model="postData.costPrice" placeholder=""/>-->
                    <!--</a-col>-->
                <!--</div>-->
            <!--</a-col>-->
        <!--</a-row>-->
        <a-row>
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="6">
                        <div class="inputName">*分类选择：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="18">

                        <template>
                            <a-tree
                                    checkable
                                    @expand="onExpand"
                                    :expandedKeys="expandedKeys"
                                    :autoExpandParent="autoExpandParent"
                                    v-model="checkedKeys"
                                    :checkStrictly='true'
                                    @select="onSelect"
                                    :selectedKeys="selectedKeys"
                                    :treeData="treeData"
                            />
                        </template>
                    </a-col>
                </div>
            </a-col>
        </a-row>


        <!--<a-row>-->
            <!--<a-col class="gutter-row" :span="6">-->
                <!--<div class="inputPart">-->
                    <!--<a-col class="gutter-row" :span="6">-->
                        <!--<div class="inputName">*商品标签：</div>-->
                    <!--</a-col>-->
                    <!--<a-col class="gutter-row" :span="18">-->
                        <!--<a-input v-model="postData.rateId" placeholder=""/>-->
                    <!--</a-col>-->
                <!--</div>-->
            <!--</a-col>-->
        <!--</a-row>-->


    </div>
</template>
<script>
    var vm =this
    import router from '../../router'
    import store from '../../store'
    import $ from 'jquery'
    import TinymceEditor from '../../components/tinymce-editor'
    const treeData = [{
        title: '0-0',
        key: '0-0',
        children: [{
            title: '0-0-0',
            key: '0-0-0',
            children: [
                { title: '0-0-0-0', key: '0-0-0-0' },
                { title: '0-0-0-1', key: '0-0-0-1' },
                { title: '0-0-0-2', key: '0-0-0-2' },
            ],
        }, {
            title: '0-0-1',
            key: '0-0-1',
            children: [
                { title: '0-0-1-0', key: '0-0-1-0' },
                { title: '0-0-1-1', key: '0-0-1-1' },
                { title: '0-0-1-2', key: '0-0-1-2' },
            ],
        }, {
            title: '0-0-2',
            key: '0-0-2',
        }],
    }, {
        title: '0-1',
        key: '0-1',
        children: [
            { title: '0-1-0-0', key: '0-1-0-0' },
            { title: '0-1-0-1', key: '0-1-0-1' },
            { title: '0-1-0-2', key: '0-1-0-2' },
        ],
    }, {
        title: '0-2',
        key: '0-2',
    }]
    export default {
        components:{
            TinymceEditor
        },
        methods: {

            onExpand (expandedKeys) {
                console.log('onExpand', expandedKeys)
                // if not set autoExpandParent to false, if children expanded, parent can not collapse.
                // or, you can remove all expanded children keys.
                this.expandedKeys = expandedKeys
                this.autoExpandParent = false
            },
            onCheck (checkedKeys) {
                console.log('onCheck', checkedKeys)
                this.checkedKeys = checkedKeys
            },
            onSelect (selectedKeys, info) {
                console.log('onSelect', info)
                this.selectedKeys = selectedKeys
            },


            handleChangeSelect(value) {
                this.postData.currencyId=value
            },
            onChange(date, dateString) {
                console.log(date, dateString);
            },
            saveProductInfor(){
                store.commit('changeStore',{key:'loading',val:true});
                let isAll = true
                for(let key  in this.postData){
                    if(this.postData[key]==""){
                        isAll =false
                    }
                }

                if (isAll){
                    this.$post('/product/updateProductPrice',this.postData).then((reData)=>{
                        console.log(reData)
                        store.commit('changeStore',{key:'loading',val:false});
                        this.$notification.open({
                            message: '提醒',
                            description: reData.message,
                            onClick: () => {
                                console.log('ok');
                            },
                        })
                        if(reData.code == 0){
                            store.commit('changeStore',{key:'goods_id',val:reData.data.goods_id });
                            setTimeout(function () {
                                store.commit('changeStore',{key:'addProductContent',val:'productAddPrice'});
                                store.commit('changeStore',{key:'addProductCurrent',val:'2'});
                            },2000)

                        }
                    })
                }else {
                    store.commit('changeStore',{key:'loading',val:false});

                    this.$notification.open({
                        message: '提醒',
                        description: '请把信息填写完整再提交！',
                        onClick: () => {
                            console.log('ok');
                        },
                    })
                }
            }
        } ,
        mounted() {
            // alert(this.$store.state.goods_id)
            // this.postData.productId = this.$store.state.goods_id
        },
        data() {
            return {
                expandedKeys: ['0-0-0', '0-0-1'],
                autoExpandParent: true,
                checkedKeys: [],
                selectedKeys: [],
                treeData,
                postData:{
                    productId:'',
                    currencyId:'1',
                    costPrice:'',
                    retailPrice:'',
                    salePrice:'',
                    // rateId:'',
                }
            }
        } ,
        watch: {
            "$store.state.goods_id"() {
                this.postData.productId =  this.$store.state.goods_id;
            },
            checkedKeys(val) {
                console.log('onCheck', val)
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

</style>