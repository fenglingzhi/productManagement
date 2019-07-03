<template>
    <div class="classify_list_table">
        <a-row class="secondTitle">
            <a-col :span="20">
                <span style="font-size:16px;font-weight:bold;line-height:32px;">下级列表</span>
            </a-col>
            <a-col :span="4" style="display:flex;flex-direction:row-reverse;">
                <a-button type="primary" @click="addNew_classify">新增</a-button>
            </a-col>
        </a-row>
        <a-table
          :columns="columns"
          :dataSource="select_classify"
          :loading="loading"
          :pagination="pagination"
          :childrenColumnName="childrenColumnName"
        >
             <span slot="active" slot-scope="active">
                <span v-if="active == 0">隐藏</span>
                <span v-if="active == 1">显示</span>
            </span>
            <span slot="isBanner" slot-scope="isBanner">
                <span v-if="isBanner == 0">否</span>
                <span v-if="isBanner == 1">是</span>
            </span>
            <span slot="operation" slot-scope="record">
                <a @click="del_classify(record)">删除</a>
            </span>
        </a-table>
    </div>
</template>
<script>
// 表格行数据
const columns = [
  {
    title: "编号",
    dataIndex: "key",
    width: "10%"
  },
  {
    title: "名称",
    dataIndex: "title",
    width: "20%"
  },
  {
    title: "描述",
    dataIndex: "description"
  },
  {
    title: "位置",
    dataIndex: "position"
  },
  {
    title: "显示",
    dataIndex: "active",
    scopedSlots: { customRender: 'active' },
  },
  {
    title: "是否为banner活动",
    dataIndex: "isBanner",
    scopedSlots: { customRender: 'isBanner' },
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' },
  }
];

import router from "../../router";
import store from "../../store";
export default {
    name:'classify_list_table',
    data(){
        return{
            loading: false,
            columns,
            pagination: false,
            childrenColumnName: "false",
        }
    },
    props:["select_classify"],
    watch: {},
    mounted() {
    
    },
    methods: {
        addNew_classify(){
            this.$emit("router_add_classify")
        },
        del_classify(value){
            console.log("删除1");
            let data ={};
            data.categoryId = value.categoryId
            this.$post("/category/remove", data).then(reData => {
                if (reData.code == 0) {
                   
                } else {
                this.$message.error(reData.message);
                }
            });
        }
    }
}
</script>
<style scope>
    
</style>