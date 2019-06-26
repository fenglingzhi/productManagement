<template>
    <div class="goods_list">
        <div class="goods_search">
            <a-row>
                <a-col :span="2" class="search_text">编号：</a-col>
                <a-col :span="2"><a-input placeholder="Basic usage"/></a-col>
                <a-col :span="2" class="search_text">名称：</a-col>
                <a-col :span="2"><a-input placeholder="Basic usage"/></a-col>
                <a-col :span="2" class="search_text">shopify ID：</a-col>
                <a-col :span="2"><a-input placeholder="Basic usage"/></a-col>
                <a-col :span="2" class="search_text">参考：</a-col>
                <a-col :span="2"><a-input placeholder="Basic usage"/></a-col>
                <a-col :span="2" class="search_text">类别：</a-col>
                <a-col :span="2"><a-input placeholder="Basic usage"/></a-col>
                <a-col :span="2" class="search_text">基础价格：</a-col>
                <a-col :span="2"><a-input placeholder="Basic usage"/></a-col>
            </a-row>
            <a-row style="margin-top: 20px;">
                <a-col :span="2" class="search_text">最终价格：</a-col>
                <a-col :span="2"><a-input placeholder="Basic usage"/></a-col>
                <a-col :span="2" class="search_text">数量：</a-col>
                <a-col :span="2"><a-input placeholder="Basic usage"/></a-col>
                <a-col :span="2" class="search_text">状态：</a-col>
                <a-col :span="2">
                    <a-select defaultValue="lucy" style="width: 120px" @change="handleChange">
                        <a-select-option value="true">是</a-select-option>
                        <a-select-option value="false">否</a-select-option>
                    </a-select>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "goodslist",
        components: {},
        data() {
            return {

            }
        },
        methods: {
            handleChange(value) {
                console.log(`selected ${value}`);
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>
    .search_text{
        line-height: 32px;
        text-align: right;
    }
</style>