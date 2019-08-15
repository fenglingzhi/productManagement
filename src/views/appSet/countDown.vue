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

      <div class="addCountDown">
        <a-modal title="新增APP首页促销倒计时" v-model="visible_add" :destroyOnClose="true" @ok="submitAdd">
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
                  <span>*</span>开始时间：
                </div>
              </a-col>
              <a-col class="gutter-row" :span="18">
                <a-date-picker
                  format="YYYY-MM-DD HH:mm:ss"
                  showTime
                  @change="start_stamp_onchange"
                  style="width:100%;"
                />
              </a-col>
            </div>
          </a-row>
          <a-row>
            <div class="inputPart">
              <a-col class="gutter-row" :span="6">
                <div class="inputName">
                  <span>*</span>结束时间：
                </div>
              </a-col>
              <a-col class="gutter-row" :span="18">
                <a-date-picker
                  format="YYYY-MM-DD HH:mm:ss"
                  showTime
                  @change="end_stamp_onchange"
                  style="width:100%;"
                />
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
          <a-row v-if="!isAllRight">
            <div class="inputPart">
              <p class="worning">请填写相应内容</p>
            </div>
          </a-row>
        </a-modal>
      </div>

      <div class="changeCountDown">
        <a-modal
          title="新增APP首页促销倒计时"
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
                  <span>*</span>开始时间：
                </div>
              </a-col>
              <a-col class="gutter-row" :span="18">
                <a-date-picker
                  format="YYYY-MM-DD HH:mm:ss"
                  showTime
                  style="width:100%;"
                  :defaultValue="moment(form_change.start_stamp,'x')"
                  @change="start_stamp_onchange_change"
                />
              </a-col>
            </div>
          </a-row>
          <a-row>
            <div class="inputPart">
              <a-col class="gutter-row" :span="6">
                <div class="inputName">
                  <span>*</span>结束时间：
                </div>
              </a-col>
              <a-col class="gutter-row" :span="18">
                <a-date-picker
                  format="YYYY-MM-DD HH:mm:ss"
                  showTime
                  style="width:100%;"
                  :defaultValue="moment(form_change.end_stamp,'x')"
                  @change="end_stamp_onchange_change"
                />
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
          dataIndex: "mobile_home_promotion_countdown_id",
          key: "mobile_home_promotion_countdown_id"
        },
        {
          title: "开始时间",
          dataIndex: "start_stamp_string",
          key: "start_stamp_string"
        },
        {
          title: "结束时间",
          dataIndex: "end_stamp_string",
          key: "end_stamp_string"
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
        active: "1",
        end_stamp: "",
        start_stamp: ""
      },
      // 是否显示校验提示
      isAllRight: true,
      // 修改的表单
      form_change: {
        start_stamp: "",
        end_stamp: "",
        category_id: "",
        active: "",
        mobile_home_promotion_countdown_id: ""
      },
      start_stamp_default: "",
      end_stamp_default: ""
    };
  },
  mounted() {
    this.getTypeInfo();
    this.getList();
  },
  methods: {
    moment,
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
      if (this.form_add.start_stamp == "") {
        this.isAllRight = false;
        return false;
      }
      if (this.form_add.end_stamp == "") {
        this.isAllRight = false;
        return false;
      }
      this.isAllRight = true;
      // console.log(this.form_add);
      this.$post(
        "/mobilePromotionCountdown/addMobilePromotionCountdownInfo",
        this.form_add
      ).then(res => {
        // console.log(res);
        if (res.code == "0") {
          this.visible_add = false;
          this.getList();
        }
      });
    },
    change(text) {
      // console.log(text)
      this.form_change.start_stamp = text.start_stamp;
      this.form_change.end_stamp = text.end_stamp;
      this.form_change.category_id = text.category_id;
      this.form_change.active = text.active == false ? "0" : "1";
      this.form_change.mobile_home_promotion_countdown_id =
        text.mobile_home_promotion_countdown_id;
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
        "/mobilePromotionCountdown/updateMobilePromotionCountdownInfo",
        this.form_change
      ).then(res => {
        if (res.code == "0") {
          this.visible_change = false;
          this.getList();
        }
      });
    },
    // 获取列表
    getList() {
      let data = {
        lang_id: this.$store.state.langId
      };
      this.$post(
        "/mobilePromotionCountdown/getMobilePromotionCountdownList",
        data
      ).then(res => {
        // console.log(res);
        let arr = JSON.parse(JSON.stringify(res.data));
        arr.forEach(element => {
          // element.add_date = this.timeParse(element.add_date);
          element.add_date = moment(element.add_date).format(
            "YYYY-MM-DD hh:mm:ss"
          );
          // element.start_stamp_string = this.timeParse(element.start_stamp);
          element.start_stamp_string = moment(element.start_stamp).format(
            "YYYY-MM-DD hh:mm:ss"
          );
          // element.end_stamp_string = this.timeParse(element.end_stamp);
          element.end_stamp_string = moment(element.end_stamp).format(
            "YYYY-MM-DD hh:mm:ss"
          );
        });
        this.attributeList = arr;
      });
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
      let data = {
        mobile_home_promotion_countdown_id:
          text.mobile_home_promotion_countdown_id
      };
      this.$post(
        "/mobilePromotionCountdown/removeMobilePromotionCountdown",
        data
      ).then(res => {
        if (res.code == "0") {
          this.getList();
        }
      });
    },
    start_stamp_onchange(date, dateString) {
      this.form_add.start_stamp = Date.parse(dateString);
    },
    end_stamp_onchange(date, dateString) {
      this.form_add.end_stamp = Date.parse(dateString);
    },
    start_stamp_onchange_change(date, dateString) {
      this.form_change.start_stamp = Date.parse(dateString);
    },
    end_stamp_onchange_change(date, dateString) {
      this.form_change.end_stamp = Date.parse(dateString);
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



