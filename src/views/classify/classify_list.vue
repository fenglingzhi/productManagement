<template>
  <div class="classify">
    <a-row>
      <a-col :span="4" style="border-right: 1px solid rgb(232, 232, 232);">
        <a-input-search style="margin-bottom: 8px" placeholder="Search" @change="onChange"/>
        <a-tree
            class="draggable-tree"
            :defaultExpandedKeys="expandedKeys"
            draggable
            @dragenter="onDragEnter"
            @drop="onDrop"
            :treeData="classify_list"
        ></a-tree>
      </a-col>
      <a-col :span="20">col-20</a-col>
    </a-row>
  </div>
</template>
<script>

import router from "../../router";
import store from "../../store";
import $ from "jquery";

export default {
  name: "classify",
  data() {
    return {
      classify_list: [
        {
          title: "0-0",
          key: "0-0",
        },
      ],
      expandedKeys: ["0-0", "0-0-0", "0-0-0-0"]
    };
  },
  components: {},
  watch: {},
  mounted() {
      this.classify_data_init();
  },
  methods: {
    // 初始化获取分类数据
    classify_data_init(){
        let data = {
            langId:1,
        }
        this.$fetch('/category/getAllCategoryList',data).then((reData)=>{
            console.log(reData);
            if(reData.code == 0){
                this.classify_list = JSON.parse(JSON.stringify(reData.data).replace(/name/g,"title").replace(/childCategoryList/g,"children").replace(/categoryId/g,"key"))
                console.log(this.classify_list)
            }else{
                this.$message.error(reData.message);
            }
        })
    },
    
    // 搜索框监听事件
    onChange() {
        console.log("searchChange");
    },

    // 树形结构拖动
    onDragEnter(info) {
        console.log("onDragEnter");
        // console.log(info);
        // expandedKeys 需要受控时设置
        // this.expandedKeys = info.expandedKeys
    },

    // 树形结构拖动结束
    onDrop(info) {
        console.log("onDrop");
        const dropKey = info.node.eventKey;
        const dragKey = info.dragNode.eventKey;
        const dropPos = info.node.pos.split("-");
        const dropPosition =
            info.dropPosition - Number(dropPos[dropPos.length - 1]);
        const loop = (data, key, callback) => {
            data.forEach((item, index, arr) => {
            if (item.key === key) {
                return callback(item, index, arr);
            }
            if (item.children) {
                return loop(item.children, key, callback);
            }
            });
        };
        const data = [...this.classify_list];

        // Find dragObject
        let dragObj;
        loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });

        if (!info.dropToGap) {
            // Drop on the content
            loop(data, dropKey, item => {
            item.children = item.children || [];
            // where to insert 示例添加到尾部，可以是随意位置
            item.children.push(dragObj);
            });
        } else if (
            (info.node.children || []).length > 0 && // Has children
            info.node.expanded && // Is expanded
            dropPosition === 1 // On the bottom gap
        ) {
            loop(data, dropKey, item => {
            item.children = item.children || [];
            // where to insert 示例添加到尾部，可以是随意位置
            item.children.unshift(dragObj);
            });
        } else {
            let ar;
            let i;
            loop(data, dropKey, (item, index, arr) => {
            ar = arr;
            i = index;
            });
            if (dropPosition === -1) {
            ar.splice(i, 0, dragObj);
            } else {
            ar.splice(i + 1, 0, dragObj);
            }
        }
        this.classify_list = data;
    },
  }
  
};
</script>
<style scoped>
</style>