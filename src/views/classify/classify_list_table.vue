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
          :dataSource="table_data"
          :loading="loading"
          :pagination="pagination"
          :childrenColumnName="childrenColumnName"
          
        >
             <span slot="position" slot-scope="record">
                <input type="text" v-model="record.position" @blur="change_position(record)" style="text-align:center;border:1px solid #ccc;">
            </span>
             <span slot="active" slot-scope="record">
                <span v-if="record.active == '0'" style="cursor: pointer;color:red;" @click="show_active(record)"><a-icon type="close" /></span>
                <span v-if="record.active == '1'" style="cursor: pointer;color:green;" @click="show_active(record)"><a-icon type="check" /></span>
            </span>
            <span slot="isBanner" slot-scope="record">
                <span v-if="record.isBanner == '0'" style="cursor: pointer;color:red;" @click="show_isBanner(record)"><a-icon type="close" /></span>
                <span v-if="record.isBanner == '1'" style="cursor: pointer;color:green;" @click="show_isBanner(record)"><a-icon type="check" /></span>
            </span>
            <span slot="description" slot-scope="record">
                <span v-html="record.description"></span>
            </span>
            <span slot="operation" slot-scope="record">
                <a-popconfirm
                        v-if="table_data.length"
                        title="请确认删除"
                        @confirm="() => del_classify(record)">
                    <a disabled v-if="record.child_num">删除</a>
                    <a v-if="!record.child_num">删除</a>
              </a-popconfirm>

            </span>
        </a-table>
    </div>
</template>
<script>
// 表格行数据
const columns = [
  {
    title: "编号",
    dataIndex: "categoryId",
    align:"center",
    width: "10%"
  },
  {
    title: "名称",
    dataIndex: "name",
    align:"center",
    width: "15%"
  },
  {
    title: "描述",
    align:"center",

    scopedSlots: { customRender: 'description' },
  },
  {
    title: "位置",
    align:"center",
    scopedSlots: { customRender: 'position' },
  },
  {
    title: "显示",
    align:"center",
    scopedSlots: { customRender: 'active' },
  },
  {
    title: "是否为banner活动",
    align:"center",
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
            table_data:[],
        }
    },
    props:["select_classify","select_classify_key"],
    watch: {
        select_classify_key(newVal,oldVal){
            this.select_classify_table_init();
        }
    },
    mounted() {
        setTimeout(() => {
            this.select_classify_table_init();
        }, 500);
        
    },
    methods: {
        select_classify_table_init(){
            let data ={
                lang_id:this.$store.state.langId,
                parent_id:this.select_classify_key,
            };
            this.$post("/category/getCategoryList", data).then(reData => {
                if (reData.code == 0) {
                    this.table_data = reData.data.slice(0,reData.data.length);
                    this.table_data.forEach(function(item){
                        item.key =item.categoryId;
                    })
                } else {
                    this.$message.error(reData.message);
                    this.loading = false;
                }
            });
        },
        // 修改position参数
        change_position(value){
            this.loading = true;
            let data ={};
            data.categoryId = value.categoryId
            data.position = value.position;
            data.langId = 1;
            this.$post("/category/update", data).then(reData => {
                if (reData.code == 0) {
                    this.$message.success("修改成功");
                    this.select_classify_table_init()
                     this.loading = false;
                    this.$emit("update_classify","delete");
                } else {
                    this.$message.error(reData.message);
                    this.loading = false;
                }
            });
        },
        // 新增
        addNew_classify(){
            this.$emit("router_add_classify")
        },
        // 删除
        del_classify(value){
            this.loading = true;
            let data ={};
            data.categoryId = value.categoryId
            this.$post("/category/remove", data).then(reData => {
                if (reData.code == 0) {
                    this.$emit("update_classify","delete");
                    this.select_classify.splice(this.select_classify.indexOf(value),1)
                    this.$message.success("删除成功");
                    this.select_classify_table_init();
                    this.loading = false;
                } else {
                    this.$message.error(reData.message);
                    this.loading = false;
                }
            });
        },
        // 修改显示
        show_active(value){
            this.loading = true;
            let data ={};
            data.categoryId = value.categoryId;
            data.langId = 1;
            if(value.active){
                data.active = 0;
            }else{
                data.active = 1;
            }
            this.$post("/category/update", data).then(reData => {
                if (reData.code == 0) {

                    if(value.active){
                        value.active = 0;
                    }else{
                        value.active = 1;
                    }
                    this.$message.success("修改成功");
                     this.loading = false;
                //    this.$emit("update_classify","edit");
                } else {
                    this.$message.error(reData.message);
                    this.loading = false;
                }
            });
        },
        // 修改 是否为banner活动
        show_isBanner(value){
            this.loading = true;
            let data ={};
            data.categoryId = value.categoryId;
            data.langId = 1;
            if(value.isBanner){
                data.isBanner = 0;
            }else{
                data.isBanner = 1;
            }
            this.$post("/category/update", data).then(reData => {
                if (reData.code == 0) {
                    if(value.isBanner){
                        value.isBanner = 0;
                    }else{
                        value.isBanner = 1;
                    }
                    this.$message.success("修改成功");
                     this.loading = false;
                //    this.$emit("update_classify","edit");
                } else {
                    this.$message.error(reData.message);
                    this.loading = false;
                }
            });
        }

    }
}
</script>
<style scope>
    p{
        margin: 0;
    }
</style>