<template>
    <div class="productAttribute">
        <a-row>
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="6">
                        <div class="inputName">属性名称：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="18">
                        <a-input placeholder="请输入属性名称" v-model="addAttributeInfo.attribute_name" />
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="6">
                        <div class="inputName">属性值 ：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="18">
                        <a-input placeholder="请输入属性值" v-model="addAttributeInfo.attribute_val"/>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="6">
                        <div class="inputName">属性排序 ：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="18">
                        <a-input placeholder="请输入属性排序" v-model="addAttributeInfo.attribute_seq"/>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="6">
                        <div class="inputName">属性状态：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="18">
                        <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange">
                            <a-select-option value="100">启用</a-select-option>
                            <a-select-option value="400">禁用</a-select-option>
                        </a-select>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="6">
                    </a-col>
                    <a-col class="gutter-row" :span="18">
                        <a-row>
                            <a-col class="gutter-row" :span="6">
                                <a-button type="primary" @click="addAttributeCommit(addAttributeInfo)">提交</a-button>
                            </a-col>
                        </a-row>
                    </a-col>
                </div>
            </a-col>
        </a-row>
    </div>
</template>
<script>
    import router from '../../router';
    import store from '../../store'
    export default {
        data() {
            return {
                router,
                store,
                addAttributeInfo:{
                    parent_id:store.state.attribute_parent_id,
                    attribute_name:'',
                    attribute_seq:'',
                    attribute_val:'',
                    status:''
                }
            }
        },
        methods: {
            //状态选择
            handleChange(value) {
                this.addAttributeInfo.status = value
            },
            //提交属性新增
            addAttributeCommit(data){
                this.$post('/property/addProperty',data).then((reData)=>{
                    if(reData.code === '0'){
                        if(this.store.state.attribute_parent_id === '0'){
                            router.push('/productAttribute')
                        } else {
                            router.push('/attributeList')
                        }
                    } else {
                        this.$message.error(reData.message);
                    }
                })
            }
        },
        mounted() {
            store.commit('changeStore',{key:'title',val:'新增属性'});
        },

    }
</script>
<style scoped>
    .inputName{
        text-align: right;
        line-height: 34px;
    }
    .ant-row{
        margin: 10px 0;
    }
    .hrLine{
        width: 120%;
        height: 30px;
        margin-left: -30px;
        background: #f0f2f5;
    }
</style>