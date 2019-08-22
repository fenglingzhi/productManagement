<template>
  <div class="classify_list">
    <a-row>
      <a-col :span="5" style="border-right: 1px solid rgb(232, 232, 232);padding:0 8px;">
        <div>
          <!-- <a-input-search style="margin-bottom:8px;" placeholder="Search" @change="onChange"/> -->
          <!--<a-tree-->
            <!--:defaultExpandedKeys="expandedKeys"-->
            <!--@expand="onExpand"-->
            <!--:expandedKeys="expandedKeys"-->
            <!--:autoExpandParent="autoExpandParent"-->
          <!--&gt;-->
          <a-tree
                  @expand="onExpand"
                  defaultExpandAll
          >
            <a-tree-node :key="item.key" v-for="item in classify_list">
              <div slot="title" @click="onSelect(item)" :style="showOperation == item.key ? 'background:#bae7ff':''">
                <!--<span v-if="item.title.indexOf(searchValue) > -1">-->
                  <!--<span v-text="item.title.substr(0, item.title.indexOf(searchValue))"></span>-->
                  <!--<span style="color: #f50" v-text="searchValue"></span>-->
                  <!--<span-->
                    <!--v-text="item.title.substr(item.title.indexOf(searchValue) + searchValue.length)"-->
                  <!--&gt;</span>-->
                <!--</span>-->
                <span v-text="item.title"></span>
                <!-- <div
                  style="display:inline-block;margin-left:25px;"
                  v-if="showOperation == item.key"
                >
                  <a v-on:click.stop="router_edit_classify(item)">编辑</a>
                </div> -->
              </div>
              <a-tree-node :key="item1.key" v-for="item1 in item.children">
                <div slot="title" @click="onSelect(item1)" :style="showOperation == item1.key ? 'background:#bae7ff':''">
                  <!--<span v-if="item1.title.indexOf(searchValue) > -1">-->
                    <!--<span v-text="item1.title.substr(0, item1.title.indexOf(searchValue))"></span>-->
                    <!--<span style="color: #f50" v-text="searchValue"></span>-->
                    <!--<span-->
                      <!--v-text="item1.title.substr(item1.title.indexOf(searchValue) + searchValue.length)"-->
                    <!--&gt;</span>-->
                  <!--</span>-->
                  <span  v-text="item1.title"></span>
                  <div
                    style="display:inline-block;margin-left:25px;"
                    v-if="showOperation == item1.key"
                  >
                    <a v-on:click.stop="router_edit_classify(item1)">编辑</a>
                  </div>
                </div>
                <a-tree-node :key="item2.key" v-for="item2 in item1.children">
                  <div slot="title" @click="onSelect(item2)" :style="showOperation == item2.key ? 'background:#bae7ff':''">
                    <!--<span v-if="item2.title.indexOf(searchValue) > -1">-->
                      <!--<span v-text="item2.title.substr(0, item2.title.indexOf(searchValue))"></span>-->
                      <!--<span style="color: #f50" v-text="searchValue"></span>-->
                      <!--<span-->
                        <!--v-text="item2.title.substr(item2.title.indexOf(searchValue) + searchValue.length)"-->
                      <!--&gt;</span>-->
                    <!--</span>-->
                    <span  v-text="item2.title"></span>
                    <div
                      style="display:inline-block;margin-left:25px;"
                      v-if="showOperation == item2.key"
                    >
                      <a v-on:click.stop="router_edit_classify(item2)">编辑</a>
                    </div>
                  </div>
                  <a-tree-node :key="item3.key" v-for="item3 in item2.children">
                    <div slot="title" @click="onSelect(item3)" :style="showOperation == item3.key ? 'background:#bae7ff':''">
                      <!--<span v-if="item3.title.indexOf(searchValue) > -1">-->
                        <!--<span v-text="item3.title.substr(0, item3.title.indexOf(searchValue))"></span>-->
                        <!--<span style="color: #f50" v-text="searchValue"></span>-->
                        <!--<span-->
                          <!--v-text="item3.title.substr(item3.title.indexOf(searchValue) + searchValue.length)"-->
                        <!--&gt;</span>-->
                      <!--</span>-->
                      <span  v-text="item3.title"></span>
                      <div
                        style="display:inline-block;margin-left:25px;"
                        v-if="showOperation == item3.key"
                      >
                        <a v-on:click.stop="router_edit_classify(item3)">编辑</a>
                      </div>
                    </div>
                    <a-tree-node :key="item4.key" v-for="item4 in item3.children">
                      <div slot="title" @click="onSelect(item4)" :style="showOperation == item4.key ? 'background:#bae7ff':''">
                        <!--<span v-if="item4.title.indexOf(searchValue) > -1">-->
                          <!--<span v-text="item4.title.substr(0, item4.title.indexOf(searchValue))"></span>-->
                          <!--<span style="color: #f50" v-text="searchValue"></span>-->
                          <!--<span-->
                            <!--v-text="item4.title.substr(item4.title.indexOf(searchValue) + searchValue.length)"-->
                          <!--&gt;</span>-->
                        <!--</span>-->
                        <span  v-text="item4.title"></span>
                        <div
                          style="display:inline-block;margin-left:25px;"
                          v-if="showOperation == item4.key"
                        >
                          <a v-on:click.stop="router_edit_classify(item4)">编辑</a>
                        </div>
                      </div>
                    </a-tree-node>
                  </a-tree-node>
                </a-tree-node>
              </a-tree-node>
            </a-tree-node>
          </a-tree>
        </div>
      </a-col>

      <a-col :span="19" style="padding-left:10px;">
        <classify_list_table
                :select_classify_key="select_classify_key"
                v-on:update_classify ="update_classify"
                v-on:router_add_classify="router_add_classify"
                :select_classify ="select_classify"
                v-if="operation_name =='table'">
        </classify_list_table>
        <classify_list_edit
                v-on:update_classify ="update_classify"
                :classify_list ="classify_list"
                :operation_name ="operation_name"
                :select_classify_all ="select_classify_all"
                v-if="operation_name =='edit' || operation_name =='add'">
        </classify_list_edit>
      </a-col>
    </a-row>

  </div>
</template>

<script>
//树形结构筛选
const getParentKey = (tree, value) => {
  let parentKey;
  if (tree.children) {
    if (tree.children.some(item => item.title.indexOf(value) > -1)) {
      parentKey = tree.key;
    } else {
      for (let i = 0; i < tree.children.length; i++) {
        let node = tree.children[i];
        if (getParentKey(node.children, value)) {
          parentKey = getParentKey(node.children, value);
        }
      }
    }
  }
  return parentKey;
};

import router from "../../router";
import store from "../../store";
import classify_list_table from './classify_list_table'
import classify_list_edit from './classify_list_edit'

export default {
  name: "classify_list",
  data() {
    return {
      expandedKeys: [],
      searchValue: "",
      autoExpandParent: true,
      classify_list: [
        {
          title: "home",
          key: "0",
          children: []
        }
      ],
      select_classify: [],
      select_classify_key:0,
      select_classify_all:{},
      showOperation: "0",
      operation_name:'',
    };
  },
  components: {classify_list_table,classify_list_edit},
  watch: {},
  mounted() {
    this.classify_data_init("init");
  },
  methods: {
    // 初始化获取分类数据
    classify_data_init(value) {
      let data = {
        lang_id: 1
      };
      this.$fetch("/category/getAllCategoryTree", data).then(reData => {
        if (reData.code == 0) {
            let homeData = [{title:"home",key:0,children:[]}];
            reData.data.forEach(function(item){
                homeData[0].children.push(item)
            })
            this.classify_list = homeData;
            if(value == "init"){
              this.select_classify = this.classify_list[0].children;
              this.operation_name = "table";
              this.select_classify_all = this.classify_list.slice(0,this.classify_list.length)[0];
            }
            
        } else {
          this.$message.error(reData.message);
        }
      });
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = true;
    },
    // 搜索框监听事件
    onChange(e) {
      let classify_list = this.classify_list.slice(
        0,
        this.classify_list.length
      );
      const value = e.target.value;
      const expandedKeys = classify_list
        .map(item => {
          return getParentKey(item, value);
        })
        .filter((item, i, self) => item && self.indexOf(item) === i);
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true
      });
    },
    // 树形结构选中事件
    onSelect(item) {
      this.select_classify = item.children.slice(0, item.children.length);
      this.select_classify_all = item;
      this.select_classify_key = item.key;
      this.showOperation = item.key;
      this.operation_name = "table";
    },
    // 分类编辑入口
    router_edit_classify(value){
       this.operation_name = "";
       setTimeout(() => {
           this.operation_name = "edit";
       }, 500);
       
    },
    // 分类新增入口
    router_add_classify(){
        this.operation_name = "add";
    },
    // 数据更新
    update_classify(value){
        if(value != 'delete'){
            this.operation_name = "table";
        }
        this.classify_data_init(value);
    },
  }
};
</script>
<style>
.secondTitle{
    text-align: left;
    font-size: 16px;
    font-weight: bold;
    width: 100%;
    border-bottom: 1px solid #999;
    margin-bottom: 24px;
    padding-bottom: 12px;
    -webkit-box-shadow: 0 0 black;
    box-shadow: 0 0 black;
    height: 50px;
}  
</style>