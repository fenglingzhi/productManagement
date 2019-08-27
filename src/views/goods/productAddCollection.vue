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
        <a-row class="gutter-row">
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="8">
                        <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>默认分类：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="16">
                        <a-select  style="width: 100%" defaultValue="1" @change="handleChangeSelect">
                            <a-select-option value="1">比基尼</a-select-option>
                            <a-select-option value="2">连体裤</a-select-option>
                            <a-select-option value="3">长腿裤</a-select-option>
                        </a-select>
                    </a-col>
                </div>
            </a-col>
        </a-row>

        <a-row>
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="8">
                        <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>分类选择：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="16">

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
                                    :defaultExpandAll='true'
                            />
                        </template>
                    </a-col>
                </div>
            </a-col>
        </a-row>




    </div>
</template>
<script>
    var vm =this
    import router from '../../router'
    import store from '../../store'
    import $ from 'jquery'
    import TinymceEditor from '../../components/tinymce-editor'
    const treeData = []
    export default {
        components:{
            TinymceEditor
        },
        methods: {
            acTiveArrStringFun(obj) {
                var arr = [];
                if (obj != null && obj.length != 0) {
                    for (var i = 0; i < obj.length; i++) {
                        arr.push(obj[i]);
                    }
                }
                return arr.toString();
            },

            onExpand (expandedKeys) {
                console.log('onExpand', expandedKeys)
                // if not set autoExpandParent to false, if children expanded, parent can not collapse.
                // or, you can remove all expanded children keys.
                this.expandedKeys = expandedKeys
                this.autoExpandParent = false
            },
            onCheck (checkedKeys) {
                this.checkedKeys = checkedKeys
            },
            onSelect (selectedKeys, info) {
                console.log('onSelect', info)
                this.selectedKeys = selectedKeys
            },


            handleChangeSelect(value) {
                this.postData.currencyId=value
            },
            saveProductInfor(){

                for(let i=0;i<this.checkedKeys.checked.length;i++){
                    if(i==0){
                        this.postData.categoryIds=this.checkedKeys.checked[i]
                    }else {
                        this.postData.categoryIds=this.postData.categoryIds+','+this.checkedKeys.checked[i]

                    }
                }

                this.postData.productId=this.$store.state.goods_id;
                if(this.postData.categoryIds==''){
                    this.$notification.open({
                        message: '提醒',
                        duration: 2,
                        description: "至少选择一个分类",
                        onClick: () => {
                            console.log('ok');
                        },
                    })
                } else{
                    store.commit('changeStore',{key:'loading',val:true});

                    // if(this.checkedKeys.checked.length>0){


                    // }

                    this.$fetch('/productCategory/updateProductCategory',this.postData).then((reData)=>{
                        console.log(reData)
                        store.commit('changeStore',{key:'loading',val:false});
                        store.commit('changeStore',{key:'addProductContent',val:'productCombination'});
                        store.commit('changeStore',{key:'addProductCurrent',val:'4'});

                        this.$notification.open({
                            message: '提醒',
                            description: reData.message,
                            onClick: () => {
                                console.log('ok');
                            },
                        })

                    })
                }


            }
            ,checked(jsontree){
                var newData = this.checkedKeys.checked
                if ((typeof jsontree == 'object') && (jsontree.constructor== Object.prototype.constructor)) {
                    var arrey = [];
                    arrey.push(jsontree);
                }
                else arrey = jsontree;
                for (var i = 0; i < arrey.length; i++) {
                    var jn = arrey[i];
                    if (jn.status == "1") {
                        newData.push(jn.key)
                        this.checkedKeys.checked = newData
                        // return;
                    }
                    if (jn.children && jn.children.length > 0) {
                        this.checked(jn.children);
                    }
                }
            }
            ,getCollection(){

                if(this.$store.state.isEdit){
                    this.$fetch('/category/getAllCategoryTree',{product_id:this.$store.state.goods_id,lang_id:this.$store.state.langId}).then((reData)=>{
                        // console.log(reData)
                        this.treeData = JSON.parse(JSON.stringify(reData.data).replace(/name/g,"title").replace(/categoryId/g,"key"))
                        // if(this.$store.state.isEdit){
                            this.checked(this.treeData)
                        // }
                    })
                }else {
                    this.$fetch('/category/getAllCategoryTree',{lang_id:this.$store.state.langId}).then((reData)=>{
                        this.treeData = JSON.parse(JSON.stringify(reData.data).replace(/name/g,"title").replace(/categoryId/g,"key"))
                    })
                }



            }
        } ,
        mounted() {
            // alert(this.$store.state.goods_id)
            // this.postData.productId = this.$store.state.goods_id
            this.getCollection()

        },
        data() {
            return {
                expandedKeys: [],
                autoExpandParent: true,
                checkedKeys: {checked:[]},
                selectedKeys: [],
                treeData,
                postData:{
                    productId:'',
                    categoryIds:''
                }
            }
        } ,
        watch: {
            "$store.state.goods_id"() {
                this.postData.productId =  this.$store.state.goods_id;
                this.getCollection()
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