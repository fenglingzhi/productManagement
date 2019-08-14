<template>
  <div class="hotwords">
    <div class="add-btn">
      <a-button type="primary" @click="visible_add=true" id="add">新增</a-button>
      <a-table
        :columns="columns"
        :dataSource="attributeList"
        :pagination="false"
        :loading="loading"
        align="center"
      >
        <span slot="action" slot-scope="text">
          <a @click="change(text)">修改</a>
          <a-divider type="vertical"></a-divider>
          <a @click="submitDel(text)">删除</a>
        </span>
        <a slot="active" slot-scope="text" style="text-align: center">
          <a-icon type="check" style="color: green" v-if="text.active==true"></a-icon>
          <a-icon type="close" style="color: red" v-if="text.active!=true"></a-icon>
        </a>
      </a-table>

      <div class="addClassify">
        <a-modal title="新增热门分类" v-model="visible_add" :destroyOnClose="true" @ok="submitAdd">
          <a-row>
            <div class="inputPart">
              <a-col class="gutter-row" :span="6">
                <div class="inputName">
                  <span>*</span>是否显示：
                </div>
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
                <div class="inputName">
                  <span>*</span>分类：
                </div>
              </a-col>
              <a-col class="gutter-row" :span="18">
                <a-select style="width: 100%" v-model="form_add.category_id">
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
                <div class="inputName">
                  <span>*</span>排序：
                </div>
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

      <div class="changeClassify">
        <a-modal title="新增热门分类" v-model="visible_change" :destroyOnClose="true" @ok="submitChange">
          <a-row>
            <div class="inputPart">
              <a-col class="gutter-row" :span="6">
                <div class="inputName">
                  <span>*</span>是否显示：
                </div>
              </a-col>
              <a-col class="gutter-row" :span="18">
                <a-select defaultValue="1" style="width: 100%" v-model="form_change.active">
                  <a-select-option value="1">是</a-select-option>
                  <a-select-option value="0">否</a-select-option>
                </a-select>
              </a-col>
            </div>
          </a-row>
          <a-row>
            <div class="inputPart">
              <a-col class="gutter-row" :span="6">
                <div class="inputName">
                  <span>*</span>分类：
                </div>
              </a-col>
              <a-col class="gutter-row" :span="18">
                <a-select style="width: 100%" v-model="form_change.category_id">
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
                <div class="inputName">
                  <span>*</span>排序：
                </div>
              </a-col>
              <a-col class="gutter-row" :span="18">
                <a-input placeholder v-model="form_change.position" />
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
    </div>
  </div>
</template>

<script>
export default {
  name: "hotWords",
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
          dataIndex: "mobile_home_category_id",
          key: "mobile_home_category_id"
        },
        { title: "排序", dataIndex: "position", key: "position" },
        { title: "分类", dataIndex: "category_name", key: "category_name" },
        {
          title: "是否显示",
          key: "active",
          scopedSlots: { customRender: "active" }
        },
        {
          title: "添加时间",
          dataIndex: "add_date",
          key: "add_date"
        }
      ],
      // 具体数据
      attributeList: [],
      // 分类的数据
      typeArr: [],
      // 分页
      // pagination: {
      //   currentPage: 1,
      //   defaultPageSize: 100,
      //   total: 1
      // },
      loading: false,
      // 增加的模态框
      visible_add: false,
      visible_change: false,
      // 新增表单
      form_add: {
        position: "1",
        category_id: "",
        active: "1"
      },
      // 是否显示校验提示
      isAllRight: true,
      // 修改的表单
      form_change: {
        position: "",
        category_id: "",
        active: "",
        mobile_home_category_id: ""
      }
    };
  },
  mounted() {
    this.getTypeInfo();
    this.getList();
  },
  methods: {
    // 确定添加
    submitAdd() {
      if (this.form_add.category_id == "") {
        this.isAllRight = false;
        return false;
      }
      if (this.form_add.active == "") {
        this.isAllRight = false;
        return false;
      }
      this.isAllRight = true;
      this.$post(
        "/mobileHomeCategory/addMobileHomeCategoryInfo",
        this.form_add
      ).then(res => {
        if (res.data == 1) {
          this.visible_add = false;
          this.getList();
        }
      });
    },
    change(text) {
      console.log(text);
      this.form_change.position = text.position;
      this.form_change.category_id = text.category_id;
      this.form_change.active = text.active == false ? "0" : "1";
      this.form_change.mobile_home_category_id = text.mobile_home_category_id;
      // console.log(this.form_change);
      this.visible_change = true;
    },
    submitChange() {
      if (this.form_change.category_id == "") {
        this.isAllRight = false;
        return false;
      }
      if (this.form_change.active == "") {
        this.isAllRight = false;
        return false;
      }
      this.isAllRight = true;
      this.$post(
        "/mobileHomeCategory/updateMobileHomeCategoryInfo",
        this.form_change
      ).then(res => {
        if (res.data == 1) {
          this.visible_change = false;
          this.getList();
        }
      });
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
    // 获取列表
    getList() {
      let data = {
        lang_id: this.$store.state.langId
      };
      this.$post("/mobileHomeCategory/getMobileHomeCategoryList", data).then(
        res => {
          console.log(res);
          let arr = JSON.parse(JSON.stringify(res.data));
          arr.forEach(element => {
            element.add_date = this.timeParse(element.add_date);
          });
          this.attributeList = arr;
        }
      );
    },
    // 获取分类信息
    getTypeInfo() {
      this.$post("/category/getCategoryAllList", {
        lang_id: this.$store.state.langId
      }).then(res => {
        console.log(res);
        this.typeArr = res.data;
      });
    },
    submitDel(text) {
      let data = {
        mobile_home_category_id: text.mobile_home_category_id
      };
      this.$post("/mobileHomeCategory/removeMobileHomeCategory", data).then(
        res => {
          if (res.data == 1) {
            this.getList();
          }
        }
      );
    }
  }
};
</script>
<style scoped>
.worning {
  text-align: center;
  color: red;
}
#add {
  margin-bottom: 15px;
}
.inputPart {
  overflow: hidden;
  margin-bottom: 10px;
}
.inputName span {
  color: red;
  margin-right: 5px;
}
</style>



