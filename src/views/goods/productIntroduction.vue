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
                <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                    更新产品表 ：
                </a-col>
                <a-col class="gutter-row" :span="3">
                    <a-row>
                        <a-col class="gutter-row" :offset="12" :span="12">
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
                            <a target="_blank" href="http://ar-test.kapeixi.cn/admincpx2018/import/product_import.xls">csv文件模板下载</a>
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