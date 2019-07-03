<template>
    <div>
         <a-row class="secondTitle" v-if="operation_name == 'edit'">
            <a-col :span="20">
                <span style="font-size:16px;font-weight:bold;line-height:32px;">编辑</span>
            </a-col>
            <a-col :span="4" style="display:flex;flex-direction:row-reverse;">
                <a-button type="primary" @click="save_classify">保存</a-button>
            </a-col>
        </a-row>
        <a-row class="secondTitle" v-if="operation_name == 'add'">
            <a-col :span="20">
                <span style="font-size:16px;font-weight:bold;line-height:32px;">新增</span>
            </a-col>
            <a-col :span="4" style="display:flex;flex-direction:row-reverse;">
                <a-button type="primary" @click="add_classify">保存</a-button>
            </a-col>
        </a-row>
        <a-row class="row-padding">
            <a-col :span="5"><span style="color:red;">*</span>名称</a-col>
            <a-col :span="19">
                <a-input placeholder="请输入名称" v-model="name" />
            </a-col>
        </a-row>
        <a-row class="row-padding">
            <a-col :span="5">显示</a-col>
            <a-col :span="19">
                <a-radio-group v-model="active" buttonStyle="solid">
                    <a-radio-button value="1">是</a-radio-button>
                    <a-radio-button value="0">否</a-radio-button>
                </a-radio-group>
            </a-col>
        </a-row>
        <a-row class="row-padding" v-if="operation_name == 'add'">
            <a-col :span="5">是否成为banner图</a-col>
            <a-col :span="19">
                <a-radio-group v-model="isBanner" buttonStyle="solid">
                    <a-radio-button value="1">是</a-radio-button>
                    <a-radio-button value="0">否</a-radio-button>
                </a-radio-group>
            </a-col>
        </a-row>
        <a-row class="row-padding">
            <a-col :span="5">上级分类</a-col>
            <a-col :span="19">
                <a-tree-select
                    style="width: 300px"
                    :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                    placeholder='Please select'
                    treeDefaultExpandAll
                    @change="onChange"
                    :value = "value"
                >
                    <a-tree-select-node v-for="item in classify_list" :value='item.key.toString()' :title='item.title' :key='item.key'>
                        <a-tree-select-node v-for="item1 in item.children" :value='item1.key.toString()' :title='item1.title' :key='item1.key' :disabled="(item1.key ==select_classify_all.key) && operation_name == 'edit'">
                            <a-tree-select-node v-for="item2 in item1.children" :value='item2.key.toString()' :title='item2.title' :key='item2.key' :disabled="(item1.key ==select_classify_all.key || item2.key ==select_classify_all.key) && operation_name == 'edit'">
                                <a-tree-select-node v-for="item3 in item2.children" :value='item3.key.toString()' :title='item3.title' :key='item3.key' :disabled="(item1.key ==select_classify_all.key || item2.key ==select_classify_all.key || item3.key ==select_classify_all.key) && operation_name == 'edit'">
                                    <a-tree-select-node v-for="item4 in item3.children" :value='item4.key.toString()' :title='item4.title' :key='item4.key' :disabled="(item1.key ==select_classify_all.key || item2.key ==select_classify_all.key || item3.key ==select_classify_all.key ||item4.key ==select_classify_all.key) && operation_name == 'edit'">
                                    </a-tree-select-node>
                                </a-tree-select-node>
                            </a-tree-select-node>
                        </a-tree-select-node>
                    </a-tree-select-node>
                    
                </a-tree-select>
            </a-col>
        </a-row>
        <a-row class="row-padding">
            <a-col :span="5">描述</a-col>
            <a-col :span="19">
                <tinymce-editor ref="editor" v-model="description"></tinymce-editor>
            </a-col>
        </a-row>
        <a-row class="row-padding">
            <a-col :span="5">类目封面图片</a-col>
            <a-col :span="19">
                <a-upload
                    name="avatar"
                    listType="picture-card"
                    class="avatar-uploader"
                    :showUploadList="false"
                    :beforeUpload="beforeUpload"
                >
                    <img v-if="imageUrl" :src="imageUrl" alt="avatar" style="width:100%;" />
                    <div v-else>
                        <a-icon :type="loading ? 'loading' : 'plus'" />
                        <div class="ant-upload-text">Upload</div>
                    </div>
                </a-upload>
            </a-col>
        </a-row>
        <a-row class="row-padding">
            <a-col :span="5">Meta标题</a-col>
            <a-col :span="19">
                <a-input placeholder="请输入Meta标题" v-model="metaTitle" />
            </a-col>
        </a-row>
        <a-row class="row-padding">
            <a-col :span="5">Meta说明</a-col>
            <a-col :span="19">
                <a-textarea placeholder="Basic usage" :rows="4" v-model="metaDescription"/>
            </a-col>
        </a-row>
        <a-row class="row-padding">
            <a-col :span="5">Meta关键词</a-col>
            <a-col :span="19">
                <template v-for="(tag, index) in tags">
                    <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
                        <a-tag :key="tag" :closable="closablebool" :afterClose="() => handleClose(tag)">
                        {{`${tag.slice(0, 20)}...`}}
                        </a-tag>
                    </a-tooltip>
                    <a-tag v-else :key="tag" :closable="closablebool"  :afterClose="() => handleClose(tag)">
                        {{tag}}
                    </a-tag>
                </template>
                <a-input
                    v-if="inputVisible"
                    ref="input"
                    type="text"
                    size="small"
                    :style="{ width: '78px' }"
                    :value="inputValue"
                    @change="handleInputChange"
                    @blur="handleInputConfirm"
                    @keyup.enter="handleInputConfirm"
                    />
                <a-tag v-else @click="showInput" style="background: #fff; borderStyle: dashed;">
                <a-icon type="plus" /> New Tag
                </a-tag>


            </a-col>
        </a-row>
        <a-row class="row-padding">
            <a-col :span="5">Meta友好链接</a-col>
            <a-col :span="19">
                <a-input placeholder="请输入Meta友好链接" v-model="linkRewrite" />
            </a-col>
        </a-row>
        <!-- <a-row>
            <a-col :span="5">访问组</a-col>
            <a-col :span="19">
                
            </a-col>
        </a-row> -->
    </div>
</template>
<script>

import TinymceEditor from '../../components/tinymce-editor'
import { constants } from 'crypto';
export default {
    data(){
        return{
            name:'',        //名称
            active:'1',     //是否显示
            parentId:'',    //父类ID
            value:'',       //父类ID
            loading: false,
            description:'', //描述 
            imageUrl: '',   //图片base64码
            metaTitle:'',   //meta标题
            metaDescription:'', //meta详情
            linkRewrite:'',     //友情链接
            tags:[],        //meta标签
            inputVisible: false,
            inputValue: '',
            closablebool:true,
            isBanner:'1',

        }
    },
    props:["classify_list","select_classify_all","operation_name"],
    components:{TinymceEditor},
    mounted(){
        if(this.operation_name == 'edit'){
            console.log(this.select_classify_all)
            this.name = this.select_classify_all.title;
            this.active = this.select_classify_all.active.toString();
            this.parentId = this.select_classify_all.parentId;
            this.value = this.select_classify_all.parentId.toString();
            this.description = this.select_classify_all.description;
            this.imageUrl = 'http://static1.kapeixi.cn/'+ this.select_classify_all.categoryUrl;
            this.metaTitle = this.select_classify_all.metaTitle;
            this.metaDescription = this.select_classify_all.metaDescription;
            this.linkRewrite = this.select_classify_all.linkRewrite;
            this.tags = this.select_classify_all.metaKeywords == '' ? [] : this.select_classify_all.metaKeywords .split(",");
        }else if(this.operation_name == 'add'){
            console.log(this.select_classify_all)
            this.parentId = this.select_classify_all.key;
            this.value = this.select_classify_all.key.toString();
        }
       
    },
    methods:{
        // 属性选择修改选择
        onChange (value) {
            console.log(value)
            this.value = value
            console.log(this.select_classify_all.parentId)
        },
        // 图片上传之前
        beforeUpload (file) {
            const isJPG = file.type.indexOf("image") != -1 ;
            if (!isJPG) {
                this.$message.error('You can only upload image file!')
            }

            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isLt2M) {
                this.$message.error('Image must smaller than 2MB!')
            }
            var reader = new FileReader();
            reader.readAsDataURL(file); 
            let _that = this;
            reader.onloadend = function () {
                _that.imageUrl = reader.result;
            }    
            return false;
        },
        handleClose (removedTag) {
            const tags = this.tags.filter(tag => tag !== removedTag)
            console.log(tags)
            this.tags = tags
        },

        showInput () {
            this.inputVisible = true
            this.$nextTick(function () {
                this.$refs.input.focus()
            })
        },

        handleInputChange (e) {
            console.log(e.target.value)
            this.inputValue = e.target.value
        },

        handleInputConfirm () {
            const inputValue = this.inputValue
            let tags = this.tags
            if (inputValue && tags.indexOf(inputValue) === -1) {
                tags = [...tags, inputValue]
            }
            console.log(tags)
            Object.assign(this, {
                tags,
                inputVisible: false,
                inputValue: '',
            })
        },
        // 编辑保存分类
        save_classify(){
            console.log("保存");
            let data = {};
            data.categoryId = this.select_classify_all.key;
            data.parentId = this.value;
            data.langId = 1;
            data.name = this.name;
            data.description = this.description;
            data.linkRewrite = this.linkRewrite;
            data.metaTitle = this.metaTitle;
            data.metaKeywords = this.tags.join(",");
            data.metaDescription = this.metaDescription;
            if(this.imageUrl != undefined && this.imageUrl != ''){
                data.categoryImgStr = this.imageUrl;
            }   
            data.active = this.active;
            this.$post("/category/update", data).then(reData => {
                if (reData.code == 0) {
                   
                } else {
                this.$message.error(reData.message);
                }
            });
        },
        // 新增分类
        add_classify(){
            console.log("新增");
            let data = {};
            data.parentId = this.value;
            data.langId = 1;
            data.name = this.name;
            data.description = this.description;
            data.linkRewrite = this.linkRewrite;
            data.metaTitle = this.metaTitle;
            data.metaKeywords = this.tags.join(",");
            data.metaDescription = this.metaDescription;
            data.isBanner = this.isBanner;
            data.position = '99';
            if(this.imageUrl != undefined && this.imageUrl != ''){
                data.categoryImgStr = this.imageUrl;
            }   
            data.active = this.active;
            console.log(data);
            this.$post("/category/add", data).then(reData => {
                if (reData.code == 0) {
                   
                } else {
                this.$message.error(reData.message);
                }
            });

        }
    }
}
</script>
<style>
    .avatar-uploader > .ant-upload {
        width: 128px;
        height: 128px;
    }
    .ant-upload-select-picture-card i {
        font-size: 32px;
        color: #999;
    }

    .ant-upload-select-picture-card .ant-upload-text {
        margin-top: 8px;
        color: #666;
    }
    .row-padding{
        padding:10px 0;
    }
</style>
