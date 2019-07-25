<template>
  <div>
    <div style="padding:10px;">
      <a-button type="primary" @click="showModal('add')">新增</a-button>
    </div>
    <a-collapse >
      <a-collapse-panel :header="item.title" :key="item.id" v-for="item in image_type_list">
        <banner_set_table v-on:banner_edit="showModal" :image_type="item.id" :ref="'update_banner'+item.id"></banner_set_table>
      </a-collapse-panel>
      <a-collapse-panel header="底部分类推荐" key="16">
        <a-row class="row-padding">
            <a-col :span="5"><span class="must_fill" style="color:red;">*</span>是否显示</a-col>
            <a-col :span="19">
                <a-select v-model="active" style="width:100%;">
                    <a-select-option value="0">不显示</a-select-option>
                    <a-select-option value="1">显示</a-select-option>
                </a-select>
            </a-col>
        </a-row>
        <a-row class="row-padding">
            <a-col :span="5"><span class="must_fill" style="color:red;">*</span>分类</a-col>
            <a-col :span="19">
                <a-select v-model="active" style="width:100%;">
                    <a-select-option value="0">不显示</a-select-option>
                    <a-select-option value="1">显示</a-select-option>
                </a-select>
            </a-col>
        </a-row>
      </a-collapse-panel>
    </a-collapse>

    <a-modal v-model="visible" :title="modal_Title" onOk="handleOk" onCancel="handleCancel" :disabled="loading">
      <template slot="footer">
        <a-button key="back" @click="handleCancel" >返回</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">上传</a-button>
      </template>
      <a-row class="row-padding" v-if="opera_type =='add'">
            <a-col :span="5"><span class="must_fill" style="color:red;">*</span>类目封面图片</a-col>
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
            <a-col :span="5"><span class="must_fill" style="color:red;">*</span>超链接</a-col>
            <a-col :span="19">
                <a-input placeholder="请输入超链接" v-model="banner_url" />
            </a-col>
        </a-row>
        <a-row class="row-padding">
            <a-col :span="5">顺序</a-col>
            <a-col :span="19">
                <a-input-number placeholder="请输入顺序" :min="0" :step="1" v-model="position" style="width:100%;" :formatter="value => `$ ${value}`.replace(/\D/g,'')"
      :parser="value => value.replace(/\D/g,'')" />
            </a-col>
        </a-row>
        <a-row class="row-padding">
            <a-col :span="5"><span class="must_fill" style="color:red;">*</span>是否显示</a-col>
            <a-col :span="19">
                <a-select v-model="active" style="width:100%;">
                    <a-select-option value="0">不显示</a-select-option>
                    <a-select-option value="1">显示</a-select-option>
                </a-select>
            </a-col>
        </a-row>
        <a-row class="row-padding">
            <a-col :span="5"><span class="must_fill" style="color:red;">*</span>图片类型</a-col>
            <a-col :span="19">
                <a-select v-model="image_type" style="width:100%;" :disabled="opera_type!='add'" @change="handleChange">
                    <a-select-option :value="item.id" v-for="item in image_type_list"><span v-text="item.name"></span></a-select-option>
                </a-select>
            </a-col>
        </a-row>
        <a-row class="row-padding">
            <a-col :span="5"><span class="must_fill" style="color:red;">*</span>title1</a-col>
            <a-col :span="19">
                <a-input placeholder="请输入title1" v-model="title1" />
            </a-col>
        </a-row>
        <a-row class="row-padding">
            <a-col :span="5"><span class="must_fill" style="color:red;">*</span>title2</a-col>
            <a-col :span="19">
                <a-input placeholder="请输入title2" v-model="title2" />
            </a-col>
        </a-row>
        <a-row class="row-padding" v-if="show_banner_place">
            <a-col :span="5"><span class="must_fill" style="color:red;">*</span>图片位置</a-col>
            <a-col :span="19">
                <a-select v-model="banner_place" style="width:100%;">
                    <a-select-option value="1">top</a-select-option>
                    <a-select-option value="2">left</a-select-option>
                    <a-select-option value="3">right</a-select-option>
                    <a-select-option value="4">bottom</a-select-option>
                    <a-select-option value="5">middle</a-select-option>
                </a-select>
            </a-col>
        </a-row>
        <a-row class="row-padding" v-if="show_banner_map">
            <a-col :span="5"><span class="must_fill" style="color:red;">*</span>map</a-col>
            <a-col :span="19">
                <a-textarea placeholder="Basic usage" :rows="2" v-model="banner_map"/>
            </a-col>
        </a-row>
    </a-modal>

  </div>
</template>
<script>
import banner_set_table from "../banner_set/banner_set_table";
import { setTimeout } from 'timers';
export default {
  name: "banner_set",
  data() {
    return {
      image_type_list: [
        { name: "顶部窄banner", id: 1, title: "首页第一行窄BANNER" },
        { name: "轮播主banner", id: 2, title: "首页第二行轮播BANNER" },
        { name: "一排两图banner", id: 3, title: "首页第三行左右两图BANNER" },
        { name: "中间窄banner", id: 4, title: "首页第四行窄BANNER" },
        { name: "宽banner", id: 5, title: "首页第五行宽BANNER" },
        { name: "一排三图banner", id: 6, title: "首页第六行左中右三图BANNER" },
        { name: "宽banner", id: 7, title: "首页第七行宽BANNER" },
        { name: "一排两图banner", id: 8, title: "首页第八行左右两图BANNER" },
        { name: "一排两图banner", id: 9, title: "首页第九行左右两图BANNER" },
        { name: "两排三图banner", id: 10, title: "首页第十行左右三图BANNER" },
        { name: "宽banner", id: 11, title: "首页第十一行宽BANNER" },
        { name: "宽banner", id: 12, title: "首页第十二行宽BANNER" },
        {name: "购物车小图标banner",id: 13,title: "首页第十三行购物车图标BANNER"},
        { name: "一排两图banner", id: 14, title: "首页第十四行左右两图BANNER" },
        { name: "底部窄banner", id: 15, title: "首页第十五行底部窄BANNER" }
      ],
      loading: false,
      visible: false,
      modal_Title:'新增',
      imageUrl: '',     //图片base64码
      banner_url:'',    //超链接
      position:'',      //顺序
      active:'1',       //状态 0为不显示，1为显示
      image_type:'',    //图片类型
      title1:'',        //标题1
      title2:'',        //标题2
      banner_place:'1', //图片所处位置
      banner_map:'',    //图片的热点映射
      opera_type:'',    
      show_banner_place:false,
      show_banner_map:false,
      edit_banner_id:'',
      error_fill:[],
    };
  },
  components: {
    banner_set_table
  },
  watch:{
      image_type(value,oldVal){
        if(value == 3 || value == 6 || value == 8 || value == 9 || value == 10 || value == 14){
            this.show_banner_place=true;
            this.show_banner_map=false;
        }else if(value == 13){
            this.show_banner_place=false;
            this.show_banner_map=true;
        }else{
            this.show_banner_place=false;
            this.show_banner_map=false;
        }
      }
  },
  mounted() {
      setTimeout(() => {
          this.image_type = 1;
      }, 500);
  },
  methods: {
    showModal(value,item) {
        this.opera_type = value;
        if(value == 'add'){
            this.imageUrl = '';
            this.banner_url = '';
            this.position = '';
            this.active = '1';
            this.image_type = 1;
            this.title1 = '';
            this.title2 = '';
        }else if(value == 'edit'){
            this.imageUrl = 'http://static1.kapeixi.cn' + item.image_url;
            this.banner_url = item.banner_url;
            this.position = item.position;
            this.active = item.active;
            this.image_type = item.image_type;
            this.title1 = item.title_1;
            this.title2 = item.title_2;
            this.banner_place = '3';
            this.edit_banner_id = item.banner_id;
        }
        this.visible = true;
    },
    handleOk(e) {
      this.loading = true;
      let _that = this;
      let data ={
          image_base_str:this.imageUrl,
          banner_url:this.banner_url,
          position:this.position,
          active:this.active,
          title_1:this.title1,
          title_2:this.title2,
          image_type:this.image_type,
      }
      if(this.image_type == 3 || this.image_type == 6 || this.image_type == 8 || this.image_type == 9 || this.image_type == 10 || this.image_type == 14){
           data.banner_place = this.banner_place
        }else if(this.image_type == 13){
            data.banner_map = this.banner_map
        }
        if(this.opera_type == 'add'){
            this.$post("/banner/addBannerInfo", data).then(reData => {
                if (reData.code == 0) {
                    this.$message.success('添加成功');
                    if(this.$refs[('update_banner'+data.image_type)]){
                        this.$refs[('update_banner'+data.image_type)][0].get_banner_list();
                    }
                    setTimeout(() => {
                        this.visible = false;
                        this.loading = false;
                    }, 1000);
                } else {
                    this.$message.error(reData.message);
                    this.loading = false;
                }
            });
        }else if(this.opera_type == 'edit'){
            data.banner_id = this.edit_banner_id;
            this.$post("/banner/updateBannerInfo", data).then(reData => {
                if (reData.code == 0) {
                    this.$message.success('编辑成功');
                    if(this.$refs[('update_banner'+data.image_type)]){
                       this.$refs[('update_banner'+data.image_type)][0].get_banner_list();
                    }
                    setTimeout(() => {
                        this.visible = false;
                        this.loading = false;
                    }, 1000);
                } else {
                    this.$message.error(reData.message);
                    this.loading = false;
                }
            });
        }

      
    },
    handleCancel(e) {
      this.visible = false;
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
    //图片类型选择
    handleChange(value){
        if(value == 3 || value == 6 || value == 8 || value == 9 || value == 10 || value == 14){
            this.show_banner_place=true;
            this.show_banner_map=false;
        }else if(value == 13){
            this.show_banner_place=false;
            this.show_banner_map=true;
        }else{
            this.show_banner_place=false;
            this.show_banner_map=false;
        }
    },
  }
};
</script>
<style>
.ant-upload.ant-upload-select-picture-card{
    width:50px;
    height: 50px;
}
.must_fill{
    color:red;
}
</style>