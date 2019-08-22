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

      <div class="addWaterFall">
        <a-modal title="添加App首页瀑布流推荐" v-model="visible_add" :destroyOnClose="true" @ok="submitAdd">
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
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-col>
            </div>
          </a-row>
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
        </a-modal>
      </div>

      <div class="changeWaterFall">
        <a-modal
          title="修改App首页瀑布流推荐"
          v-model="visible_change"
          :destroyOnClose="true"
          @ok="submitChange"
        >
          <a-row>
            <div class="inputPart">
              <a-col class="gutter-row" :span="6">
                <div class="inputName">
                  <span>*</span>分类：
                </div>
              </a-col>
              <a-col class="gutter-row" :span="18">
                <a-select style="width: 100%" v-model="form_change.category_id" disabled>
                  <a-select-option
                    :value="item.category_id"
                    v-for="(item,index) in typeArr"
                    :key="index"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-col>
            </div>
          </a-row>
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
        </a-modal>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "countDown",
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
          dataIndex: "mobile_home_recommend_id",
          key: "mobile_home_recommend_id"
        },
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
      loading: false,
      // 增加的模态框
      visible_add: false,
      visible_change: false,
      // 新增表单
      form_add: {
        category_id: "",
        active: "1"
      },
      // 修改的表单
      form_change: {
        category_id: "",
        active: "",
        mobile_home_recommend_id: ""
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
      if (this.checking(this.form_add)) {
        this.$post(
          "/mobileHomeRecommend/addMobileHomeRecommendInfo",
          this.form_add
        ).then(res => {
          // console.log(res);
          if (res.code == "0") {
            this.openNotification("success", "成功", "添加成功！");
            this.visible_add = false;
            Object.assign(this.form_add, {
              category_id: "",
              active: "1"
            });
            this.getList();
          } else {
            this.openNotification("error", "警告", res.message);
          }
        });
      }
    },
    // 验证
    checking(obj) {
      if ("category_id" in obj) {
        if (obj.category_id == "") {
          this.openNotification("warning", "警告", "请选择分类！");
          return false;
        }
      }
      if ("active" in obj) {
        if (obj.active == "") {
          this.openNotification("warning", "警告", "请选择是否显示！");
          return false;
        }
      }
      return true;
    },
    change(text) {
      this.form_change.active = text.active == false ? "0" : "1";
      this.form_change.mobile_home_recommend_id = text.mobile_home_recommend_id;
      this.form_change.category_id = text.category_id;
      this.visible_change = true;
    },
    submitChange() {
      if (this.checking(this.form_change)) {
        this.$post(
          "/mobileHomeRecommend/updateMobileHomeRecommendInfo",
          this.form_change
        ).then(res => {
          if (res.code == "0") {
            this.openNotification("success", "成功", "修改成功！");
            this.visible_change = false;
            this.getList();
          } else {
            this.openNotification("error", "警告", res.message);
          }
        });
      }
    },
    // 获取列表
    getList() {
      let data = {
        lang_id: this.$store.state.langId
      };
      this.$post("/mobileHomeRecommend/getMobileHomeRecommendList", data).then(
        res => {
          // console.log(res);
          if (res.code == "0") {
            let arr = JSON.parse(JSON.stringify(res.data));
            arr.forEach(element => {
              element.add_date = moment(element.add_date).format(
                "YYYY-MM-DD hh:mm:ss"
              );
            });
            this.attributeList = arr;
          }
        }
      );
    },
    // 获取分类信息
    getTypeInfo() {
      this.$post("/category/getCategoryAllList", {
        lang_id: this.$store.state.langId
      }).then(res => {
        // console.log(res);
        this.typeArr = res.data;
      });
    },
    submitDel(text) {
      let _this = this;
      this.$confirm({
        title: "删除?",
        content: "确认删除这条信息吗？",
        onOk() {
          let data = {
            mobile_home_recommend_id: text.mobile_home_recommend_id
          };
          _this
            .$post("/mobileHomeRecommend/removeMobileHomeRecommend", data)
            .then(res => {
              if (res.code == "0") {
                _this.openNotification("success", "成功", "删除成功！");
                _this.getList();
              } else {
                _this.openNotification("error", "失败", res.message);
              }
            });
        }
      });
    },
    openNotification(type, title, txt) {
      this.$notification[type]({
        message: title,
        description: txt
      });
    }
  }
};
</script>
<style scoped>
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



