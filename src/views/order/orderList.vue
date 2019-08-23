<template>
  <div class="orderList">
    <div class="high-search">
      <a-form class="ant-advanced-search-form" @submit="handleSearch" id="orderList-search">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="订单id">
              <a-input placeholder="请输入订单id" v-model.trim="form_search.order_id" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="易仓id">
              <a-input placeholder="请输入易仓id" v-model.trim="form_search.ycang_order_id" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="支付方式">
              <!-- <a-input placeholder="请输入支付方式" v-model.trim="form_search.payment" /> -->
              <a-select v-model="form_search.payment" style="width:174px;">
                <a-select-option value="9">请选择支付方式</a-select-option>
                <a-select-option value="Cod">Cod</a-select-option>
                <a-select-option value="Stripe">Stripe</a-select-option>
                <a-select-option value="Paypal">Paypal</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="支付金额">
              <a-input placeholder="请输入金额" v-model.trim="form_search.total_paid" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="币种">
              <a-select v-model="form_search.iso_code" style="width:174px;">
                <a-select-option value="9">请选择币种</a-select-option>
                <a-select-option
                  :value="item.iso_code"
                  v-for="item in iso_code_arr"
                  :key="item.currency_id"
                >{{item.iso_code}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="客户邮箱">
              <a-input placeholder="请输入邮箱" v-model.trim="form_search.email" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="国家">
              <!-- <a-input placeholder="请输入国家" v-model="form_search.country_id" /> -->
              <a-select v-model="form_search.country_id" style="width:174px;">
                <a-select-option value="999">请选择国家</a-select-option>
                <a-select-option
                  :value="item.country_id"
                  v-for="item in country_name_arr"
                  :key="item.name"
                >{{item.name}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="订单创建时间">
              <!-- <a-input placeholder="输入订单创建时间" v-model="form_search.add_date" /> -->
              <a-date-picker
                format="YYYY-MM-DD hh:mm:ss"
                showTime
                v-model="form_search.add_date"
                style="width:174px"
              ></a-date-picker>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="订单状态">
              <!-- <a-input placeholder="输入订单状态" v-model="form_search.order_state_name" /> -->
              <a-select v-model="form_search.order_state_name" style="width:174px;">
                <a-select-option value="9">请选择订单状态</a-select-option>
                <a-select-option
                  :value="item.name"
                  v-for="(item,index) in order_state_name"
                  :key="index"
                >{{item.name}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="有效单">
              <a-select v-model="form_search.valid" style="width:174px;">
                <a-select-option value="9">请选择</a-select-option>
                <a-select-option value="1">是</a-select-option>
                <a-select-option value="0">否</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8" :style="{ paddingLeft: '111px' }">
            <a-button type="primary" html-type="submit">搜索</a-button>
            <a-button :style="{ marginLeft: '47px' }" @click="handleReset">清空</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="hrLine"></div>
    <div>
      <a-table
        :columns="columns"
        :dataSource="productListData"
        :pagination="pagination"
        :loading="loading"
        align="center"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="searchFun({order_id:record.order_id})">查看</a>
        </span>
      </a-table>
    </div>

    <div class="editCustomerGender">
      <a-modal title="查看客户信息" v-model="visible_search" @ok="submitSearch" :destroyOnClose="true">
        <a-card
          :bordered="false"
          :headStyle="{'padding': 0,'font-size': '16px','color':'red'}"
          :bodyStyle="{padding: '15px'}"
          style="margin-top: -20px;font-size: 14px;"
        >
          <!-- <a-row>
            <a-col :span="12">
              <p>添加时间：{{orderListDetail}}</p>
            </a-col>
            <a-col :span="12">
            <p>平台类型：{{customerCartInfo.cartInfo.mobile_type}}</p>
            </a-col>
            <a-col :span="12">
            <p>币种标识：{{customerCartInfo.cartInfo.sign}}</p>
            </a-col>
            <a-col :span="12">
            <p>收货地址id：{{customerCartInfo.cartInfo.address_delivery_id}}</p>

            </a-col>
            <a-col :span="12">
            <p>物流id：{{customerCartInfo.cartInfo.carrier_id}}</p>

            </a-col>
            <a-col :span="12">
            <p>购物车id：{{customerCartInfo.cartInfo.cart_id}}</p>

            </a-col>
            <a-col :span="12">
            <p>更新时间：{{customerCartInfo.cartInfo.upd_date}}</p>

            </a-col>
            <a-col :span="12">
            <p>发票地址id：{{customerCartInfo.cartInfo.address_invoice_id}}</p>

            </a-col>
            <a-col :span="12">
            <p>是否启用小数点：{{customerCartInfo.cartInfo.decimals}}</p>

            </a-col>
            <a-col :span="12">
            <p>客户id：{{customerCartInfo.cartInfo.customer_id}}</p>

            </a-col>
            <a-col :span="12">
            <p>汇率：{{customerCartInfo.cartInfo.conversion_rate}}</p>

            </a-col>
            <a-col :span="12">
            <p>订单id：{{customerCartInfo.cartInfo.order_id}}</p>

            </a-col>
            <a-col :span="12">
            <p>币种id：{{customerCartInfo.cartInfo.currency_id}}</p>

            </a-col>
            <a-col :span="12">
            <p>下单时间：{{customerCartInfo.cartInfo.order_date}}</p>
            </a-col>
          </a-row>-->
        </a-card>
      </a-modal>
    </div>
  </div>
</template>
<script>
import router from "../../router";
import store from "../../store";
import moment from "moment";
export default {
  computed: {
    count() {
      return this.expand ? 11 : 7;
    }
  },
  data() {
    return {
      form_search: {
        order_id: "", //订单id
        ycang_order_id: "", //易仓id
        payment: "9", //支付方式
        total_paid: "", //支付金额
        iso_code: "9", //币种
        email: "", //邮箱
        country_id: "999", //国家
        add_date: null, //订单创建时间
        order_state_name: "9", //订单状态
        valid: "9" //有效订单
      },
      productListData: [],
      columns: [
        {
          title: "操作",
          dataIndex: "action",
          key: "action",
          scopedSlots: { customRender: "action" }
        },
        { title: "订单id", dataIndex: "order_id", key: "order_id" },
        {
          title: "易仓编号",
          dataIndex: "ycang_order_id",
          key: "ycang_order_id"
        },
        { title: "支付方式", dataIndex: "payment", key: "payment" },
        {
          title: "支付金额(不含税)",
          dataIndex: "total_paid_tax_excl",
          key: "total_paid_tax_excl"
        },
        { title: "币种", dataIndex: "iso_code", key: "iso_code" },
        // { title: "客户id", dataIndex: "customer_id", key: "customer_id" },
        { title: "客户邮箱", dataIndex: "email", key: "email" },
        { title: "运送国家", dataIndex: "country_name", key: "country_name" },
        {
          title: "订单创建时间",
          dataIndex: "add_date",
          key: "add_date"
        },
        {
          title: "订单状态",
          dataIndex: "order_state_name",
          key: "order_state_name"
        },
        { title: "有效单", dataIndex: "valid", key: "valid" }
      ],
      visible_search: false,
      loading: false,
      pagination: {
        pageSize: 10,
        total: 0,
        currentPage: 1
      },
      fabricList: [],
      orderListDetail: {},
      searchObj: {},
      iso_code_arr: [],
      country_name_arr: [],
      order_state_name: []
    };
  },
  methods: {
    // 高级搜素
    handleSearch(e) {
      e.preventDefault();
      this.searchObj = {};
      for (const key in this.form_search) {
        if (
          this.form_search[key] != "" &&
          this.form_search[key] != null &&
          this.form_search[key] != "9" &&
          this.form_search[key] != "999"
        ) {
          // this.searchObj[key] = this.form_search[key];
          this.$set(this.searchObj, key, this.form_search[key]);
        }
      }
      // 序列时间
      if ("add_date" in this.searchObj) {
        this.searchObj.add_date = moment(this.searchObj.add_date).format("x");
      }
      // console.log(this.searchObj);
      this.getList(
        {
          currentPage: this.pagination.currentPage,
          // currentPage: 1,
          pageSize: this.pagination.pageSize
        },
        this.searchObj
      );
    },
    handleReset() {
      // 重置表单
      Object.assign(this.form_search, {
        order_id: "",
        ycang_order_id: "",
        payment: "9",
        total_paid: "",
        iso_code: "9",
        email: "",
        country_id: "999",
        add_date: null,
        order_state_name: "9",
        valid: "9"
      });
    },
    moment,
    //查看详情
    searchFun(data) {
      this.getListDetail(data);
      this.visible_search = true;
    },
    submitSearch() {
      this.visible_search = false;
    },
    // 获取订单信息列表
    getList(pageObj, searchObj = {}) {
      let data = Object.assign({}, pageObj, searchObj);
      this.loading = true;
      this.$post("/order/getOrderInfoPage", data).then(reData => {
        let dataList = JSON.parse(JSON.stringify(reData.data.dataList));
        try {
          dataList.forEach(ele => {
            // 写是否是有效单
            ele.valid == 0 ? (ele.valid = "否") : (ele.valid = "是");
            //   写订单创建时间
            ele.add_date = moment(ele.add_date).format("YYYY-MM-DD hh:mm:ss");
          });
          this.productListData = dataList;
          // console.log(reData.data.page)
          this.pagination.total = reData.data.page.totalResultSize;
          this.loading = false;
        } catch (err) {
          this.productListData = [];
          this.pagination.total = reData.data.page.totalResultSize;
          this.loading = false;
        }
      });
    },
    // 获取客户信息详情
    getListDetail(data) {
      this.$post("/order/getOrderDetailInfo", data).then(reData => {
        console.log(reData);
        this.orderListDetail = reData.data;
      });
    },
    //表格分页事件
    handleTableChange(pagination) {
      // console.log(pagination);
      this.pagination.currentPage = pagination.current;
      this.getList(
        {
          currentPage: pagination.current,
          pageSize: pagination.pageSize
        },
        this.searchObj
      );
    },
    add_date_onchange(date, dateString) {
      this.form_search.add_date = Date.parse(dateString);
    }
  },
  mounted() {
    // store.commit("changeStore", { key: "title", val: "产品列表" });
    this.getList({ currentPage: 1, pageSize: this.pagination.pageSize });
    // 获取币种
    this.$post("/currency/getCurrencyListPage").then(res => {
      if (res.code == "0") {
        res.data.dataList.forEach(item => {
          // 筛选激活的币种
          if (item.active == "1") {
            this.iso_code_arr.push(item);
          }
        });
      } else {
        this.openNotification("error", "错误", "获取币种列表失败！");
      }
    });
    // 获取激活的国家列表
    this.$post("/country/getCountryList", {
      lang_id: this.$store.state.langId
    }).then(res => {
      if (res.code == "0") {
        this.country_name_arr = res.data;
      } else {
        this.openNotification("error", "错误", "获取国家列表失败！");
      }
    });
    // 获取订单状态的列表
    this.$post("/orderState/getOrderStateInfoList", {
      lang_id: this.$store.state.langId
    }).then(res => {
      if (res.code == "0") {
        console.log(res)
        this.order_state_name = res.data;
      } else {
        this.openNotification("error", "错误", "获取订单状态信息失败！");
      }
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
.orderList p {
  margin-bottom: 10px;
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
#orderList-search .ant-form-item-label {
  width: 100px;
}
</style>