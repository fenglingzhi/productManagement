<template>
    <div class="producetAdd">
        <form action="http://192.168.0.18:8081/zorafanERP/import/importActivityCategoryProduct" id="form1" method="post"  enctype="multipart/form-data">
            <div class="secondTitle">
                <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                    BANNER活动分类产品导入：
                </a-col>
                <a-col class="gutter-row" :span="3">
                    <a-row>
                        <a-col class="gutter-row" :offset="12" :span="12">
                            <!--<a-button type="primary"  @click="saveProductInfor()">保存</a-button>-->
                            <input type="submit" class="subForm" value="上传">
                        </a-col>
                    </a-row>
                </a-col>
            </div>
            <a-row class="gutter-row">
                <a-col class="gutter-row" :span="6">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">*分类：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
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
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">*选择文件：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="12">
                                <input type="file" name="myFile" ><br/>
                                <input type="hidden" v-model="categoryId" name="category_id" ><br/>
                                <a href="#">csv文件模板下载</a>
                        </a-col>
                    </div>
                </a-col>
            </a-row>
        </form>
<div style="height: 80px;"></div>

        <form action="http://192.168.0.18:8081/zorafanERP/import/importGeneralCategoryProduct" id="form2" method="post"  enctype="multipart/form-data">
            <div class="secondTitle">
                <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                    普通分类产品导入 ：
                </a-col>
                <a-col class="gutter-row" :span="3">
                    <a-row>
                        <a-col class="gutter-row" :offset="12" :span="12">
                            <input type="submit" class="subForm"  value="上传">
                        </a-col>
                    </a-row>
                </a-col>
            </div>
            <a-row class="gutter-row">
                <a-col class="gutter-row" :span="6">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">*选择分类：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
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
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName">*选择文件：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="12">
                            <input type="file" name="myFile" ><br/>
                            <input type="hidden" v-model="selectedKeys" name="category_id" ><br/>
                            <a href="#">csv文件模板下载</a>
                        </a-col>
                    </div>
                </a-col>
            </a-row>
        </form>


    </div>
</template>
<script>
    var vm =this
    import router from '../../router'
    import store from '../../store'
    import $ from 'jquery'
    import  'jquery-form'
    const treeData = []

    export default {
        components:{
        },
        methods: {
            onExpand (expandedKeys) {
                this.expandedKeys = expandedKeys
                this.autoExpandParent = false
            },

            onSelect (selectedKeys, info) {
                this.selectedKeys = selectedKeys[0]
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
                vm.$message.success(data.message);
            });
            $("#form2").ajaxForm(function(data){
                vm.$message.success(data.message);
            });

            this.getCategoryAllList({lang_id:this.$store.state.langId,is_banner:1})
            this.getCollection()
        },
        data() {
            return {
                expandedKeys: [],
                autoExpandParent: true,
                selectedKeys: '',
                treeData,
                categoryList:[]
                ,categoryId:''
            }
        } ,
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