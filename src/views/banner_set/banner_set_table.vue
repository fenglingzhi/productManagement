<template>
  <div>
    <a-table
      :columns="columns"
      :dataSource="data"
      :loading="loading"
      :pagination="pagination"
      :childrenColumnName="childrenColumnName"
    >
      <span slot="image" slot-scope="banner_item">
        <img :src="'http://static1.kapeixi.cn'+banner_item.image_url" alt="图片加载失败" />
      </span>
      <span slot="active" slot-scope="banner_item">
        <span v-if="banner_item.active == '0'"  @click="show_banner(banner_item)" style="cursor: pointer;color:red;">
          <a-icon type="close" />
        </span>
        <span v-if="banner_item.active == '1'" @click="show_banner(banner_item)" style="cursor: pointer;color:green;">
          <a-icon type="check" />
        </span>
      </span>
      <span slot="add_date" slot-scope="banner_item">
        <span
          v-text="new Date(banner_item.add_date + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ')"
        ></span>
      </span>
      <span slot="operation" slot-scope="banner_item">
        <a @click="edit_banner(banner_item)">编辑</a>
        &nbsp;|&nbsp;
        <a-popconfirm
                v-if="data.length"
                title="请确认删除"
                @confirm="() => delete_banner(banner_item)">
                <a>删除</a>
              </a-popconfirm>

      </span>
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: "id",
    dataIndex: "banner_id",
    align: "center"
  },
  {
    title: "图片",
    align: "center",
    scopedSlots: { customRender: "image" }
  },
  {
    title: "超链接",
    dataIndex: "banner_url",
    align: "center"
  },
  {
    title: "图片类型",
    dataIndex: "image_type",
    align: "center"
  },
  {
    title: "title1",
    dataIndex: "title_1",
    align: "center"
  },
  {
    title: "title2",
    dataIndex: "title_2",
    align: "center"
  },
  {
    title: "显示",
    align: "center",
    scopedSlots: { customRender: "active" }
  },
  {
    title: "添加时间",
    align: "center",
    scopedSlots: { customRender: "add_date" }
  },
  {
    title: "操作",
    scopedSlots: { customRender: "operation" }
  }
];
import router from "../../router";
import store from "../../store";
export default {
  name: "banner_set_table",
  data() {
    return {
      data: [],
      columns,
      pagination: false,
      childrenColumnName: "false",
      loading: false
    };
  },
  props: ["image_type"],
  mounted() {
    this.get_banner_list();
  },
  methods: {
    //   初始化banner 数据
    get_banner_list() {
      let data = {
        image_type: this.image_type
      };
      this.$post("/banner/getBannerList", data).then(reData => {
        if (reData.code == 0) {
          this.data = reData.data;
        } else {
          this.$message.error(reData.message);
          this.loading = false;
        }
      });
    },
    // 编辑事件
    edit_banner(item) {
      this.$emit("banner_edit", "edit", item);
    },
    //banner 删除事件
    delete_banner(item) {
      let _that = this;
      let data = {
          banner_id: item.banner_id
      };
      _that.$post("/banner/removeBannerInfo", data).then(reData => {
          if (reData.code == 0) {
              _that.get_banner_list();
              _that.$message.success('删除成功');
          } else {
              _that.$message.error(reData.message);
          }
      });
    },
    //显示切换事件
    show_banner(value){
      this.loading = true;
      let data ={};
      data.banner_id = value.banner_id;
      if(value.active == 1){
          data.active = 0;
      }else{
          data.active = 1;
      }
      this.$post("/banner/updateBannerInfo", data).then(reData => {
          if (reData.code == 0) {
              if(value.active == 1){
                  value.active = 0;
              }else{
                  value.active = 1;
              }
              this.$message.success("修改成功");
              this.loading = false;
          } else {
              this.$message.error(reData.message);
              this.loading = false;
          }
      });
    },
  }
};
</script>
<style>
</style>