<template>
  <div class="orderStatus">
    <div class="high-search">
      <a-form class="ant-advanced-search-form" @submit="handleSearch" id="orderStatus-search">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="状态编号">
              <a-input placeholder="请输入状态编号" v-model.trim="form_search.order_state_id" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="状态名称">
              <a-input placeholder="请输入状态名称" v-model.trim="form_search.name" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="是否给客户发邮件">
              <a-select v-model="form_search.send_email" style="width:174px;">
                <a-select-option value="9">请选择</a-select-option>
                <a-select-option value="1">是</a-select-option>
                <a-select-option value="0">否</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <!-- <a-col :span="8">
            <a-form-item label="邮件模板">
              <a-input placeholder="请输入模板名称" v-model.trim="form_search.template" />
            </a-form-item>
          </a-col> -->
          <a-col :span="8" :style="{ paddingLeft: '100px'  }">
            <a-button type="primary" html-type="submit" :style="{ marginLeft: '42px' }">搜索</a-button>
            <!-- <a-button :style="{ marginLeft: '46px' }" @click="handleReset">清空</a-button> -->
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="hrLine"></div>
    <div>
      <div style="margin: 16px 0">
        <a-button type="primary" @click="add_product()">新增</a-button>
      </div>
      <a-table
        :columns="columns"
        :dataSource="productListData"
        :pagination="pagination"
        :loading="loading"
        align="center"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record">
          {{record.customer_id}}
          <!--<a @click="searchFun({customer_id:record.customer_id})">查看</a>-->
          <!--<a-divider type="vertical"></a-divider>-->
          <a @click="editFun({order_state_id:record.order_state_id,lang_id:record.lang_id})">修改</a>
          <a-divider type="vertical"></a-divider>
          <a @click="deleteProduct({order_state_id:record.order_state_id})">删除</a>
        </span>
        <span slot="name" slot-scope="text,record" :style="{color:record.color}">{{text}}</span>
        <a slot="send_email" slot-scope="text" style="text-align: center">
          <a-icon type="check" style="color: green" v-if="text === '1'"></a-icon>
          <a-icon type="close" style="color: red" v-if="text === '0'"></a-icon>
        </a>
      </a-table>
    </div>

    <div class="addCustomerGender">
      <a-modal
        title="订单状态新增"
        v-model="visible_add"
        :destroyOnClose="true"
        @ok="submitAdd"
        width="650px"
      >
        <a-row>
          <div class="inputPart">
            <a-col class="gutter-row" :span="8">
              <div class="inputName">
                <span>*</span>状态名称：
              </div>
            </a-col>
            <a-col class="gutter-row" :span="16">
              <a-input placeholder="请输入状态名称" v-model="addStatueInfo.name" />
            </a-col>
          </div>
        </a-row>
        <a-row>
          <div class="inputPart">
            <a-col class="gutter-row" :span="8">
              <div class="inputName">
                <span>*</span>颜色：
              </div>
            </a-col>
            <a-col class="gutter-row" :span="16">
              <!-- <a-input placeholder="请输入颜色" v-model="addStatueInfo.color" /> -->
              <chrome-picker v-model="addStatueInfo.color_obj"></chrome-picker>
            </a-col>
          </div>
        </a-row>
        <a-row>
          <div class="inputPart">
            <a-col class="gutter-row" :span="8">
              <div class="inputName">
                <span>*</span>是否可以删除：
              </div>
            </a-col>
            <a-col class="gutter-row" :span="16">
              <a-select defaultValue="请选择" style="width: 100%" @change="handleChange_status">
                <a-select-option value="0">可删</a-select-option>
                <a-select-option value="1">不可删</a-select-option>
              </a-select>
            </a-col>
          </div>
        </a-row>
        <a-row>
          <div class="inputPart">
            <a-col class="gutter-row" :span="8">
              <div class="inputName">
                <span>*</span>标记为有效订单：
              </div>
            </a-col>
            <a-col class="gutter-row" :span="16">
              <a-select defaultValue="请选择" style="width: 100%" @change="handleChange_order">
                <a-select-option value="1">是</a-select-option>
                <a-select-option value="0">否</a-select-option>
              </a-select>
            </a-col>
          </div>
        </a-row>
        <a-row>
          <div class="inputPart">
            <a-col class="gutter-row" :span="8">
              <div class="inputName">
                <span>*</span>标记为运输状态：
              </div>
            </a-col>
            <a-col class="gutter-row" :span="16">
              <a-select defaultValue="请选择" style="width: 100%" @change="handleChange_shipped">
                <a-select-option value="1">是</a-select-option>
                <a-select-option value="0">否</a-select-option>
              </a-select>
            </a-col>
          </div>
        </a-row>
        <a-row>
          <div class="inputPart">
            <a-col class="gutter-row" :span="8">
              <div class="inputName">
                <span>*</span>标记为支付状态 ：
              </div>
            </a-col>
            <a-col class="gutter-row" :span="16">
              <a-select defaultValue="请选择" style="width: 100%" @change="handleChange_pay">
                <a-select-option value="1">是</a-select-option>
                <a-select-option value="0">否</a-select-option>
              </a-select>
            </a-col>
          </div>
        </a-row>
        <a-row>
          <div class="inputPart">
            <a-col class="gutter-row" :span="8">
              <div class="inputName">
                <span>*</span>发送邮件：
              </div>
            </a-col>
            <a-col class="gutter-row" :span="16">
              <a-select defaultValue="请选择" style="width: 100%" @change="handleChange_sendEmail">
                <a-select-option value="1">是</a-select-option>
                <a-select-option value="0">否</a-select-option>
              </a-select>
            </a-col>
          </div>
        </a-row>
        <a-row>
          <div class="inputPart" v-if="addStatueInfo.send_email=='1'">
            <a-col class="gutter-row" :span="8">
              <div class="inputName">
                <span>*</span>模板名称名称：
              </div>
            </a-col>
            <a-col class="gutter-row" :span="16">
              <a-input placeholder="请输入模板名称名称" v-model="addStatueInfo.template" />
            </a-col>
          </div>
        </a-row>
      </a-modal>
    </div>
    <div class="addCustomerGender">
      <a-modal
        title="订单状态修改"
        v-model="visible_edit"
        :destroyOnClose="false"
        @ok="submitEdit"
        width="650px"
      >
        <a-row>
          <div class="inputPart">
            <a-col class="gutter-row" :span="8">
              <div class="inputName">
                <span>*</span>状态名称：
              </div>
            </a-col>
            <a-col class="gutter-row" :span="16">
              <a-input placeholder="请输入状态名称" v-model="addStatueInfo.name" />
            </a-col>
          </div>
        </a-row>
        <a-row>
          <div class="inputPart">
            <a-col class="gutter-row" :span="8">
              <div class="inputName">
                <span>*</span>颜色：
              </div>
            </a-col>
            <a-col class="gutter-row" :span="16">
              <!-- <a-input placeholder="请输入颜色" v-model="addStatueInfo.color" /> -->
              <chrome-picker v-model="addStatueInfo.color_obj"></chrome-picker>
            </a-col>
          </div>
        </a-row>
        <a-row>
          <div class="inputPart">
            <a-col class="gutter-row" :span="8">
              <div class="inputName">
                <span>*</span>是否可以删除：
              </div>
            </a-col>
            <a-col class="gutter-row" :span="16">
              <a-select
                defaultValue="请选择"
                style="width: 100%"
                @change="handleChange_status"
                :value="addStatueInfo.unremoveable"
              >
                <a-select-option value="0">可删</a-select-option>
                <a-select-option value="1">不可删</a-select-option>
              </a-select>
            </a-col>
          </div>
        </a-row>
        <a-row>
          <div class="inputPart">
            <a-col class="gutter-row" :span="8">
              <div class="inputName">
                <span>*</span>标记为有效订单：
              </div>
            </a-col>
            <a-col class="gutter-row" :span="16">
              <a-select
                defaultValue="请选择"
                style="width: 100%"
                @change="handleChange_order"
                :value="addStatueInfo.logable"
              >
                <a-select-option value="1">是</a-select-option>
                <a-select-option value="0">否</a-select-option>
              </a-select>
            </a-col>
          </div>
        </a-row>
        <a-row>
          <div class="inputPart">
            <a-col class="gutter-row" :span="8">
              <div class="inputName">
                <span>*</span>标记为运输状态：
              </div>
            </a-col>
            <a-col class="gutter-row" :span="16">
              <a-select
                defaultValue="请选择"
                style="width: 100%"
                @change="handleChange_shipped"
                :value="addStatueInfo.shipped"
              >
                <a-select-option value="1">是</a-select-option>
                <a-select-option value="0">否</a-select-option>
              </a-select>
            </a-col>
          </div>
        </a-row>
        <a-row>
          <div class="inputPart">
            <a-col class="gutter-row" :span="8">
              <div class="inputName">
                <span>*</span>标记为支付状态 ：
              </div>
            </a-col>
            <a-col class="gutter-row" :span="16">
              <a-select
                defaultValue="请选择"
                style="width: 100%"
                @change="handleChange_pay"
                :value="addStatueInfo.paid"
              >
                <a-select-option value="1">是</a-select-option>
                <a-select-option value="0">否</a-select-option>
              </a-select>
            </a-col>
          </div>
        </a-row>
        <a-row>
          <div class="inputPart">
            <a-col class="gutter-row" :span="8">
              <div class="inputName">
                <span>*</span>发送邮件：
              </div>
            </a-col>
            <a-col class="gutter-row" :span="16">
              <a-select
                defaultValue="请选择"
                style="width: 100%"
                @change="handleChange_sendEmail"
                :value="addStatueInfo.send_email"
              >
                <a-select-option value="1">是</a-select-option>
                <a-select-option value="0">否</a-select-option>
              </a-select>
            </a-col>
          </div>
        </a-row>
        <a-row>
          <div class="inputPart" v-if="addStatueInfo.send_email=='1'">
            <a-col class="gutter-row" :span="8">
              <div class="inputName">
                <span>*</span>模板名称：
              </div>
            </a-col>
            <a-col class="gutter-row" :span="16">
              <a-input placeholder="请输入模板名称名称" v-model="addStatueInfo.template" />
            </a-col>
          </div>
        </a-row>
      </a-modal>
    </div>
  </div>
</template>
<script>
import router from "../../router";
import store from "../../store";
import moment from "moment";
import { Chrome } from "vue-color";
const columns = [
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
    scopedSlots: { customRender: "action" }
  },
  { title: "状态编号", dataIndex: "order_state_id", key: "order_state_id" },
  {
    title: "状态名称",
    dataIndex: "name",
    key: "name",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "发送邮件",
    dataIndex: "send_email",
    key: "send_email",
    scopedSlots: { customRender: "send_email" }
  },
  { title: "模板名称", dataIndex: "template", key: "template" }
];
const productListData = [];
export default {
  data() {
    return {
      form_search: {
        order_state_id: "",
        name: "",
        send_email: "9",
        template: ""
      },
      productListData,
      columns,
      dateFormat: "YYYY/MM/DD",
      visible_add: false,
      visible_edit: false,
      visible_search: false,
      loading: false,
      //   分页信息
      pagination: {
        pageSize: 10,
        total: 1,
        current: 1
      },
      fabricList: [],
      genderIdList: [],
      addStatueInfo: {
        lang_id: "",
        name: "",
        color: "",
        unremoveable: "",
        logable: "",
        shipped: "",
        paid: "",
        send_email: "",
        template: "",
        order_state_id: "",
        color_obj: ""
      },
      searchObj: {}
    };
  },
  components: {
    "chrome-picker": Chrome
  },
  methods: {
    moment,
    //可删除状态
    handleChange_status(value) {
      console.log(`selected ${value}`);
      this.addStatueInfo.unremoveable = value;
    },
    //有效订单
    handleChange_order(value) {
      console.log(`selected ${value}`);
      this.addStatueInfo.logable = value;
    },
    //运输状态
    handleChange_shipped(value) {
      console.log(`selected ${value}`);
      this.addStatueInfo.shipped = value;
    },
    //支付状态
    handleChange_pay(value) {
      console.log(`selected ${value}`);
      this.addStatueInfo.paid = value;
    },
    //发送邮件
    handleChange_sendEmail(value) {
      console.log(`selected ${value}`);
      this.addStatueInfo.send_email = value;
    },
    //新增商品
    add_product() {
      this.addStatueInfo.send_email = "";
      //   清掉form数据
      this.addStatueInfo.name = "";
      this.addStatueInfo.color = "";
      this.visible_add = true;
    },
    //编辑
    editFun(data) {
      // 获取详情
      this.$post("/orderState/getOrderStateInfoOne", data).then(reData => {
        if (reData.code === "0") {
          // console.log(this.addStatueInfo);
          this.addStatueInfo.lang_id = reData.data.lang_id;
          this.addStatueInfo.name = reData.data.name;
          this.addStatueInfo.color_obj = reData.data.color;
          this.addStatueInfo.color = reData.data.color;
          this.addStatueInfo.unremoveable = reData.data.unremoveable;
          this.addStatueInfo.logable = reData.data.logable;
          this.addStatueInfo.shipped = reData.data.shipped;
          this.addStatueInfo.paid = reData.data.paid;
          this.addStatueInfo.send_email = reData.data.send_email;
          this.addStatueInfo.template = reData.data.template;
          this.addStatueInfo.order_state_id = reData.data.order_state_id;
          this.visible_edit = true;
        }
      });
    },
    // 验证
    checking(obj) {
      if ("name" in obj) {
        if (obj.name == "") {
          this.openNotification("warning", "警告", "请输入状态名称！");
          return false;
        }
      }
      if ("color" in obj) {
        if (obj.color == "") {
          this.openNotification("warning", "警告", "请输入颜色！");
          return false;
        }
      }
      if ("unremoveable" in obj) {
        if (obj.unremoveable == "") {
          this.openNotification("warning", "警告", "请选择是否可以删除！");
          return false;
        }
      }
      if ("logable" in obj) {
        if (obj.logable == "") {
          this.openNotification(
            "warning",
            "警告",
            "请选择是否标记为有效订单！"
          );
          return false;
        }
      }
      if ("shipped" in obj) {
        if (obj.shipped == "") {
          this.openNotification("warning", "警告", "请选择是否标记运输状态！");
          return false;
        }
      }
      if ("paid" in obj) {
        if (obj.paid == "") {
          this.openNotification("warning", "警告", "请选择是否标记支付状态！");
          return false;
        }
      }
      if ("send_email" in obj) {
        if (obj.send_email == "") {
          this.openNotification("warning", "警告", "请选择是否发送邮件！");
          return false;
        }
        if (obj.send_email == "1" && obj.template == "") {
          this.openNotification("warning", "警告", "请填写模板名称！");
          return false;
        }
      }
      return true;
    },
    // 消息提示
    openNotification(type, title, txt) {
      this.$notification[type]({
        message: title,
        description: txt
      });
    },
    //查看详情
    searchFun(data) {
      this.getListDetail(data);
      this.visible_search = true;
    },
    //添加提交
    submitAdd() {
      this.addStatueInfo.lang_id = this.$store.state.langId;
      // 颜色赋值
      try {
        this.addStatueInfo.color = this.addStatueInfo.color_obj.hex8;
      } catch (error) {}
      // console.log(this.addStatueInfo);
      if (this.checking(this.addStatueInfo)) {
        this.$post("/orderState/addOrderStateInfo", this.addStatueInfo).then(
          reData => {
            if (reData.code === "0") {
              this.visible_add = false;
              this.getList({
                currentPage: this.pagination.current,
                pageSize: this.pagination.pageSize,
                lang_id: store.state.langId
              });
              //   清掉form数据
              this.addStatueInfo.name = "";
              this.addStatueInfo.color = "";
              this.openNotification("success", "成功", "添加成功！");
            } else {
              this.openNotification("error", "失败", reData.message);
              this.visible_add = false;
            }
          }
        );
      }
    },
    //修改提交
    submitEdit() {
      // 颜色赋值
      if (typeof this.addStatueInfo.color_obj == "string") {
        this.addStatueInfo.color = this.addStatueInfo.color_obj;
      } else {
        this.addStatueInfo.color = this.addStatueInfo.color_obj.hex8;
      }
      // console.log(this.addStatueInfo);
      if (this.checking(this.addStatueInfo)) {
        this.$post("/orderState/updateOrderStateInfo", this.addStatueInfo).then(
          reData => {
            if (reData.code === "0") {
              this.visible_edit = false;
              this.getList({
                currentPage: this.pagination.current,
                pageSize: this.pagination.pageSize,
                lang_id: store.state.langId
              });
              this.openNotification("success", "成功", "修改成功！");
            } else {
              this.openNotification("error", "失败", reData.message);
              this.visible_edit = false;
            }
          }
        );
      }
    },
    //查看提交
    submitSearch() {
      this.visible_search = false;
    },
    // 获取列表
    getList(pageObj, searchObj = {}) {
      let data = Object.assign({}, pageObj, searchObj);
      this.loading = true;
      this.$post("/orderState/getOrderStateInfoPage", data).then(reData => {
        if (reData.code == "0") {
          this.productListData = reData.data.dataList;
          this.pagination.total = reData.data.page.totalResultSize;
          this.pagination.current = reData.data.page.currentPage;
          this.loading = false;
        } else {
          this.productListData = [];
          this.pagination.total = 0;
          this.pagination.current = 1;
          this.loading = false;
        }
      });
    },
    //表格分页
    handleTableChange(pagination) {
      // console.log(pagination);
      this.getList(
        {
          currentPage: pagination.current,
          pageSize: pagination.pageSize,
          lang_id: store.state.langId
        },
        this.searchObj
      );
    },
    //删除商品
    deleteProduct(data) {
      let _this = this;
      this.$confirm({
        title: "删除?",
        content: "确认删除这条信息吗？",
        onOk() {
          _this.$post("/orderState/removeOrderStateInfo", data).then(reData => {
            if (reData.code === "0") {
              _this.openNotification("success", "成功", "删除成功");
              _this.getList({
                currentPage: _this.pagination.current,
                pageSize: _this.pagination.pageSize,
                lang_id: store.state.langId
              });
            } else {
              _this.openNotification("error", "失败", reData.message);
            }
          });
        }
      });
    },
    // 高级搜索
    handleSearch(e) {
      e.preventDefault();
      this.searchObj = {};
      for (const key in this.form_search) {
        if (
          this.form_search[key] != "" &&
          this.form_search[key] != null &&
          this.form_search[key] != "9"
        ) {
          this.$set(this.searchObj, key, this.form_search[key]);
        }
      }
      this.getList(
        {
          currentPage: 1,
          pageSize: this.pagination.pageSize,
          lang_id: store.state.langId
        },
        this.searchObj
      );
    },
    //重置
    handleReset() {
      // 重置表单
      Object.assign(this.form_search, {
        order_state_id: "",
        name: "",
        send_email: "9",
        template: ""
      });
    }
  },
  mounted() {
    // store.commit("changeStore", { key: "title", val: "产品列表" });
    this.getList({
      pageSize: this.pagination.pageSize,
      lang_id: store.state.langId,
      currentPage: this.pagination.current
    });
  }
};
</script>
<style scoped>
.inputName {
  text-align: right;
  line-height: 34px;
}
.ant-row {
  margin: 10px 0;
}
.hrLine {
  width: 120%;
  height: 30px;
  margin-left: -30px;
  background: #f0f2f5;
}
.show_text {
  line-height: 32px;
}
.ant-advanced-search-form {
  padding: 0px;
}

.ant-advanced-search-form .ant-form-item {
  display: flex;
  margin: 0;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}
</style>
<style>
#orderStatus-search .ant-form-item-label {
  width: 130px;
}
.inputName span {
  color: red;
  margin-right: 5px;
}
</style>