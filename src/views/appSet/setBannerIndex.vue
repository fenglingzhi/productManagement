<template>
  <div class="banner">
    <a-button type="primary" @click="visible_add=true">新增</a-button>
    <a-table
      :columns="columns"
      :dataSource="attributeList"
      :pagination="false"
      :loading="loading"
      align="center"
    >
      <span slot="action" slot-scope="text">
        <a @click="goSee(text)">查看</a>
      </span>
    </a-table>

    <!-- 添加banner -->
    <div class="add">
      <a-modal
        title="banner添加"
        v-model="visible_add"
        :destroyOnClose="true"
        width="900px"
        @ok="submitAdd"
      >
        <a-row>
          <div class="inputPart">
            <a-col class="gutter-row" :span="6">
              <div class="inputName">*选择图片：</div>
            </a-col>
            <a-col class="gutter-row" :span="18">
              <input type="file" id="image"/>
            </a-col>
          </div>
        </a-row>
        <a-row>
          <div class="inputPart">
            <a-col class="gutter-row" :span="6">
              <div class="inputName">*是否显示：</div>
            </a-col>
            <a-col class="gutter-row" :span="18">
              <a-select defaultValue="1" style="width: 100%" v-model="form_add.active">
                <a-select-option value="1">是</a-select-option>
                <a-select-option value="0">否</a-select-option>
              </a-select>
            </a-col>
          </div>
        </a-row>
        <a-row>
          <div class="inputPart">
            <a-col class="gutter-row" :span="6">
              <div class="inputName">*图片类型：</div>
            </a-col>
            <a-col class="gutter-row" :span="18">
              <a-select defaultValue="1" style="width: 100%" v-model="form_add.image_type">
                <a-select-option
                  :value="item.image_type"
                  v-for="(item,index) in attributeList"
                  :key="index"
                >{{item.content}}</a-select-option>
              </a-select>
            </a-col>
          </div>
        </a-row>
        <a-row>
          <div class="inputPart">
            <a-col class="gutter-row" :span="6">
              <div class="inputName">*分类：</div>
            </a-col>
            <a-col class="gutter-row" :span="18">
              <a-select style="width: 120px" v-model="form_add.category_id">
                <a-select-option
                  :value="item.category_id"
                  v-for="(item,index) in typeArr"
                  :key="index"
                >{{item.meta_title}}</a-select-option>
              </a-select>
            </a-col>
          </div>
        </a-row>
        <a-row>
          <div class="inputPart">
            <a-col class="gutter-row" :span="6">
              <div class="inputName">*排序：</div>
            </a-col>
            <a-col class="gutter-row" :span="18">
              <a-input placeholder v-model="form_add.position" />
            </a-col>
          </div>
        </a-row>
        <a-row v-if="!isAllRight">
          <div class="inputPart">
            <p class="worning">请填写相应内容</p>
          </div>
        </a-row>
      </a-modal>
    </div>

    <div class="detail">
      <a-modal
        title="banner详情"
        v-model="visible_detail"
        :destroyOnClose="true"
        width="900px"
        @ok="visible_detail=false"
      >
        <a-table
          :columns="columns_detail"
          :dataSource="attributeList_detail"
          :pagination="false"
          :loading="loading"
          align="center"
        >
          <span slot="action_detail" slot-scope="text">
            <a>修改</a>
            <a-divider type="vertical"></a-divider>
            <a @click="goDel(text)">删除</a>
          </span>
          <a slot="image_url" slot-scope="text" :href="text.image_url" target="_blank">
            <img :src="text.image_url" alt />
          </a>
          <a slot="active" slot-scope="text" style="text-align: center">
            <a-icon type="check" style="color: green" v-if="text.active==true"></a-icon>
            <a-icon type="close" style="color: red" v-if="text.active!=true"></a-icon>
          </a>
        </a-table>
      </a-modal>
    </div>
    <!-- 
    <div class="modify">
      <a-modal title="banner修改" v-model="visible_modify" :destroyOnClose="true" width="900px">
        <a-table
          :columns="columns_detail"
          :dataSource="attributeList_detail"
          :pagination="false"
          :loading="loading"
          align="center"
        >
          <span slot="action_detail" slot-scope="text, record">
            <a>修改</a>
            <a-divider type="vertical"></a-divider>
            <a @click="goDel(text)">删除</a>
          </span>
          <a slot="image_url" slot-scope="text" :href="text.image_url" target="_blank">
            <img :src="text.image_url" alt />
          </a>
          <a slot="active" slot-scope="text, record" style="text-align: center">
            <a-icon type="check" style="color: green" v-if="text.active==true"></a-icon>
            <a-icon type="close" style="color: red" v-if="text.active!=true"></a-icon>
          </a>
        </a-table>
      </a-modal>
    </div>-->
  </div>
</template>

<script>
import { Promise } from "q";
import func from "../../../vue-temp/vue-editor-bridge";
export default {
  name: "setBannerIndex",
  data() {
    return {
      columns: [
        {
          title: "操作",
          key: "action",
          fixed: "left",
          scopedSlots: { customRender: "action" }
        },
        {
          title: "id",
          dataIndex: "id",
          key: "id"
        },
        {
          title: "类型",
          dataIndex: "content",
          key: "content"
        }
      ],
      // 数据
      attributeList: [
        { id: "1", image_type: "1", content: "CAROUSEL BANNER(轮播图)" },
        { id: "2", image_type: "2", content: "TRIPLE VERTICAL BANNER(3张)" },
        { id: "3", image_type: "3", content: "DOUBLE SQUARE BANNER(2张)" },
        { id: "4", image_type: "4", content: "LEFT ONE RIGHT TWO(左1)" },
        { id: "5", image_type: "5", content: "LEFT ONE RIGHT TWO(右上)" },
        { id: "6", image_type: "6", content: "LEFT ONE RIGHT TWO(右下)" },
        { id: "7", image_type: "7", content: "QUARTETTE VERTICAL BANNER(四张)" }
      ],
      // detail数据
      columns_detail: [
        {
          title: "操作",
          key: "action_detail",
          fixed: "left",
          scopedSlots: { customRender: "action_detail" }
        },
        {
          title: "id",
          key: "mobile_banner_id",
          dataIndex: "mobile_banner_id"
        },
        {
          title: "排序",
          key: "position",
          dataIndex: "position"
        },
        {
          title: "图片",
          key: "image_url",
          scopedSlots: { customRender: "image_url" }
        },
        {
          title: "分类",
          key: "category_id",
          dataIndex: "category_id"
        },
        {
          title: "显示",
          key: "active",
          scopedSlots: { customRender: "active" }
        },
        {
          title: "添加时间",
          key: "add_date",
          dataIndex: "add_date"
        }
      ],
      attributeList_detail: [],
      loading: false,
      // banner详情模态框控制
      visible_detail: false,
      // 修改的模态框
      visible_modify: false,
      // 新增的模态框
      visible_add: false,
      // 添加图片的表单
      form_add: {
        image_base_str: "",
        active: "1",
        image_type: "",
        category_id: "",
        position: ""
      },
      typeArr: [], //分类的数组
      // 控制提示信息显示
      isAllRight: true
    };
  },
  mounted() {
    this.getTypeInfo();
  },
  methods: {
    // 查看详情
    goSee(text) {
      this.attributeList_detail = [];
      this.getDetail(text.image_type, text.id).then(res => {
        console.log(res);
        if (res.message === "查询成功") {
          let arr = JSON.parse(JSON.stringify(res.data));
          arr.forEach(element => {
            element.add_date = this.timeParse(element.add_date);
          });
          this.attributeList_detail = arr;
          this.visible_detail = true;
        } else {
          alert("查询失败，请重试！");
        }
      });
    },
    getDetail(image_type, id) {
      let data = {
        image_type: image_type,
        banner_id: id
      };
      return this.$post("/mobileBanner/getMobileBannerList", data);
    },
    // 时间格式化
    timeParse(time) {
      var commonTime = "";
      if (time) {
        var unixTimestamp = new Date(time * 1);
        commonTime = unixTimestamp.toLocaleString();
      }
      return commonTime;
    },
    // 删除具体图片
    goDel(text) {
      let data = {
        mobile_banner_id: text.mobile_banner_id
      };
      this.$post("/mobileBanner/removeMobileBannerInfo", data).then(res => {
        // 成功就删除本地的数据
        if (res.data == 1) {
          // 删除本地
          this.attributeList_detail.forEach((item, index) => {
            if (item.mobile_banner_id == data.mobile_banner_id) {
              this.$set(this.attributeList_detail.splice(index, 1));
            }
          });
        } else {
          alert("删除失败！");
        }
      });
    },
    // 获取分类信息
    getTypeInfo() {
      this.$post("/category/getCategoryAllList", {
        lang_id: this.$store.state.langId
      }).then(res => {
        this.typeArr = res.data;
      });
    },
    // 确定提交
    submitAdd() {
      const ele = document.getElementById("image");
      // this.fileTransform(ele);
      // 验证成功之后发请求
      // if (this.checking(this.form_add)) {
      //   this.isAllRight = true;
      //   this.$post("/mobileBanner/addMobileBannerInfo", this.form_add).then(
      //     res => {
      //       console.log(res);
      //     }
      //   );
      // } else {
      //   this.isAllRight = false;
      // }
    },
    // 验证
    checking(obj) {
      if ("image_base_str" in obj) {
        if (obj.image_base_str == "") {
          return false;
        }
      }
      if ("active" in obj) {
        if (obj.active == "") {
          return false;
        }
      }
      if ("image_type" in obj) {
        if (obj.image_type == "") {
          return false;
        }
      }
      if ("category_id" in obj) {
        if (obj.category_id == "") {
          return false;
        }
      }
      if ("position" in obj) {
        if (obj.position == "") {
          return false;
        }
      }
      return true;
    },
    // 上传的文件转换
    // fileTransform(ele) {
    //   // 上传的文件转换
    //   let reader = new FileReader();
    //   let allowImgFileSize = 2100000; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
    //   let file = ele.files[0];
    //   let _this = this;
    //   if (file) {
    //     // 转换成base64
    //     let imgUrlBase64 = reader.readAsDataURL(file);
    //     reader.onload = function() {
    //       if (
    //         allowImgFileSize != 0 &&
    //         allowImgFileSize < reader.result.length
    //       ) {
    //         alert("上传失败，请上传不大于2M的图片！");
    //       } else {
    //         //将编码写入表单
    //         _this.form_add.image_base_str = reader.result;
    //       }
    //     };
    //   }
    // },
  }
};
</script>


