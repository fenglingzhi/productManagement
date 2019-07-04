<template>
    <div class="productAttribute">
        <a-row>
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="6">
                        <div class="inputName">属性名称：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="18">
                        <a-input placeholder="请输入属性名称" v-model="editAttributeInfo.attribute_name" />
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
                        <a-input placeholder="请输入属性值" v-model="editAttributeInfo.attribute_val"/>
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
                        <a-input placeholder="请输入属性排序" v-model="editAttributeInfo.attribute_seq"/>
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
                        <a-select style="width: 100%"  @change="handleChange" :value="editAttributeInfo.status">
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
                                <a-button type="primary" @click="commitAttributeCommit(editAttributeInfo)">提交</a-button>
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
                editAttributeInfo:{
                    add_date:'',
                    upd_date:'',
                    ids:'',
                    parent_id:'',
                    attribute_seq:'',
                    attribute_name:'',
                    attribute_val:'',
                    status:'',
                },
            }
        },
        methods: {
            //状态选择
            handleChange(value) {
                this.editAttributeInfo.status = value
            },
            //获取属性信息
            getAttributeInfo(data){
                this.$post('/property/getPropertyById',data).then((reData)=>{
                    if(reData.code === '0'){
                        console.log(reData.data)
                        this.editAttributeInfo.ids = reData.data[0].attribute_id;
                        this.editAttributeInfo.parent_id = reData.data[0].parent_id;
                        this.editAttributeInfo.attribute_name = reData.data[0].attribute_name;
                        this.editAttributeInfo.attribute_val = reData.data[0].attribute_val;
                        this.editAttributeInfo.attribute_seq = reData.data[0].attribute_seq;
                        this.editAttributeInfo.status = reData.data[0].status;
                        store.commit('changeStore',{key:'attribute_parent_id',val:reData.data[0].parent_id});
                        console.log(this.$store.state.attribute_parent_id)
                    } else {
                        this.$message.error(reData.message);
                    }
                })
            },
            //提交属性修改
            commitAttributeCommit(data){
                this.$post('/property/updateProperty',data).then((reData)=>{
                    if(reData.code === '0'){
                        this.$message.success(reData.message);
                        if(this.$store.state.attribute_parent_id === '0'){
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
            store.commit('changeStore',{key:'title',val:'修改属性'});
            this.getAttributeInfo({property_id:store.state.attribute_id})
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