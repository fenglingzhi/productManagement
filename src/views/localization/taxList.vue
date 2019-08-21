<template>
    <div class="producetList">

        <!--<div class="hrLine"></div>-->
        <div>
            <div class="secondTitle">
                <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                    国家税列表 ：
                </a-col>
                <a-col class="gutter-row" :span="3">
                    <a-row>
                        <a-col class="gutter-row" :offset="12" :span="12">
                            <a-button type="primary" @click="addcountryTax">
                                新增
                            </a-button>
                        </a-col>
                    </a-row>
                </a-col>
            </div>
            <a-table :columns="columns"
                     :dataSource="attributeList"
                     :pagination="pagination"
                     :loading="loading"
                     align="center"
                     @change="handleTableChange"
                    >
              <span slot="action" slot-scope="text, record">
                  <a @click="editAttribute(text.tax_id)">修改</a>
                  <a-divider type="vertical"></a-divider>
                  <a @click="deleteProduct(text.tax_id)">删除</a>
              </span>
                <a slot="isUse" slot-scope="text, record" style="text-align: center">
                    <div style="width: 100%;text-align: left" v-if="text.decimals == 1">是</div>
                    <div style="width: 100%;text-align: left" v-if="text.decimals == 0">否</div>
                </a>
                <a slot="active" slot-scope="text, record" style="text-align: center">
                    <a-icon type="check" style="color: green" v-if="text.active == '1'" @click="change_active({tax_id:text.tax_id,active:'0'})"></a-icon>
                    <a-icon type="close" style="color: red" v-if="text.active == '0'" @click="change_active({tax_id:text.tax_id,active:'1'})"></a-icon>
                </a>
            </a-table>


            <div class="hrLine"></div>
            <div class="secondTitle">
                <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                    省/州税列表 ：
                </a-col>
                <a-col class="gutter-row" :span="3">
                    <a-row>
                        <a-col class="gutter-row" :offset="12" :span="12">
                            <a-button type="primary" @click="addStateTax">
                                新增
                            </a-button>
                        </a-col>
                    </a-row>
                </a-col>
            </div>
            <a-table :columns="stateColumns"
                     :dataSource="attributeStateList"
                     :loading="loading"
                     align="center"
            >
                <span slot="action" slot-scope="text, record">
                  <a @click="stateEditAttribute(text.state_id)">修改</a>
                  <a-divider type="vertical"></a-divider>
                  <a @click="deleteStateProduct(text.tax_state_id)">删除</a>
                </span>
                <!-- <a slot="stateIsUse" slot-scope="text, record" style="text-align: center">
                    <div style="width: 100%;text-align: left" v-if="text.decimals == 1">是</div>
                    <div style="width: 100%;text-align: left" v-if="text.decimals == 0">否</div>
                </a> -->
                <a slot="active" slot-scope="text, record" style="text-align: center">
                    <a-icon type="check" style="color: green" v-if="text.active == '1'" @click="change_state_active({tax_state_id:text.tax_state_id,active:'0'})"></a-icon>
                    <a-icon type="close" style="color: red" v-if="text.active == '0'" @click="change_state_active({tax_state_id:text.tax_state_id,active:'1'})"></a-icon>
                </a>
            </a-table>

            <div class="addCurrency">
                <a-modal
                        title="国家税信息"
                        v-model="visible_add"
                        :destroyOnClose = "true"
                        @ok="submitAdd(addCurrency.edit)"
                >
                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">税率命：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-input placeholder="" v-model="addCurrency.name" />
                            </a-col>
                        </div>
                    </a-row>

                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">税率 ：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-input placeholder="" v-model="addCurrency.rate" />
                            </a-col>
                        </div>
                    </a-row>

                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">国家：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-select 
                                :defaultValue="addCurrency.country_id" 
                                style="width: 100%" 
                                @change="getAddcountry">
                                    <a-select-option v-for="item in country" :value=item.country_id>{{item.name}}{{item.country_id}}</a-select-option>
                                </a-select>
                            </a-col>
                        </div>
                    </a-row>

                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">是否启用：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-select :defaultValue="addCurrency.active" style="width: 100%"  @change="handleChangeAdd">
                                    <a-select-option value="1">是</a-select-option>
                                    <a-select-option value="0">否</a-select-option>
                                </a-select>
                            </a-col>
                        </div>
                    </a-row>
                </a-modal>

                <!-- 省州税 -->
                <a-modal
                    title="省州税信息"
                    v-model="stateVisible_add"
                    :destroyOnClose = "true"
                    @ok="submitAddState(addState.edit)"
                >
                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">税率命：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-input placeholder="" v-model="addState.name" />
                            </a-col>
                        </div>
                    </a-row>

                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">税率 ：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-input placeholder="" v-model="addState.rate" />
                            </a-col>
                        </div>
                    </a-row>

                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">国家：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-select 
                                :defaultValue="addState.country_id" 
                                style="width: 100%" 
                                @change="getAddstateCountry">
                                    <a-select-option v-for="item in country" :value=item.country_id>{{item.name}}{{item.country_id}}</a-select-option>
                                </a-select>
                            </a-col>
                        </div>
                    </a-row>
                     <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">省/州：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-select 
                                :defaultValue="addState.country_id" 
                                style="width: 100%" 
                                @change="selectState">
                                    <a-select-option v-for="item in state" :value=item.state_id>{{item.name}}{{item.state_id}}</a-select-option>
                                </a-select>
                            </a-col>
                        </div>
                    </a-row>
                    <a-row>
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="6">
                                <div class="inputName">是否启用：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="18">
                                <a-select :defaultValue="addState.active" style="width: 100%"  @change="handleChangeAdd">
                                    <a-select-option value="1">是</a-select-option>
                                    <a-select-option value="0">否</a-select-option>
                                </a-select>
                            </a-col>
                        </div>
                    </a-row>
                </a-modal>
            </div>
        </div>
    </div>
</template>
<script>
    import router from '../../router';
    import store from '../../store'
    const columns = [
        { title: '操作', key: 'action', fixed: 'left', scopedSlots: { customRender: 'action' },},
        { title: '税名', dataIndex: 'name', key: 'name'},
        { title: '税率', dataIndex: 'rate', key: 'rate'},
        { title: '是否启用', key: 'active',scopedSlots: { customRender: 'active' },},
    ];
    const stateColumns = [
        { title: '操作', key: 'action', fixed: 'left', scopedSlots: { customRender: 'action' },},
        { title: '税名', dataIndex: 'name', key: 'name'},
        { title: '税率', dataIndex: 'rate', key: 'rate'},
        { title: '是否启用', key: 'active',scopedSlots: { customRender: 'active' },},
    ];
    const attributeList = [];
    const attributeStateList = [];
    export default {
        data() {
            return {
                country:[],
                state:[],
                addCurrency:{
                    name:''
                    ,rate:''
                    ,iso_code_num:''
                    ,country_id:''
                    ,active:'1',
                    edit:false
                },
                addState:{
                    country_id:'',
                    state_id:'',
                    rate:'',
                    active:'1',
                    name:'',
                    edit:false
                },
                visible_add:false,
                stateVisible_add:false,
                attributeList,
                attributeStateList,
                store,
                columns,
                stateColumns,
                loading: false,
                pagination:{
                    currentPage:1,
                    defaultPageSize:10,
                    total:1,
                },
                deleteAllData:'',
                //表格复选框
                rowSelection:{
                    onChange: (selectedRowKeys, selectedRows) => {
                        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                        let deleteAllData = '';
                        selectedRows.forEach(function (val,index) {
                            deleteAllData += val.attribute_id + (index === selectedRows.length -1 ? '' : ',')
                        })
                        this.deleteAllData = deleteAllData;
                    },
                }
            }
        },
        methods: {
            // 新增国家税
            addcountryTax(mm){
                if(mm){

                }else{
                    this.addCurrency={
                        name:''
                        ,rate:''
                        ,iso_code_num:''
                        ,country_id:''
                        ,active:'1',
                        edit:false
                    }
                }
                this.visible_add = true
                this.getCountry();
            },
             // 新增省州税
            addStateTax(mm){
                if(mm){

                }else{
                    this.addState = {
                        country_id:'',
                        state_id:'',
                        rate:'',
                        active:'1',
                        name:'',
                        edit:false
                    }
                }
                this.stateVisible_add = true
                this.getCountry();
            },
            // 获取国家
            getCountry(){
                let vm = this;
                this.$post('/country/getCountryList',{lang_id:store.state.langId,pageSize:'10000'}).then((reData)=>{
                    vm.country = reData.data
                });
            },
            // 选择国家id
            getAddcountry(value){
                this.addCurrency.country_id = value;
            },
            // 选择州国家id
            getAddstateCountry(value){
                this.addState.country_id = value;
                this.getStateList(value);
            },
            // 获取省州
            getStateList(id){
                let vm = this;
                this.$post('/state/getStateList',{country_id:id}).then((reData)=>{
                    vm.state = reData.data
                });
            },
            selectState(value){
                this.addState.state_id = value;
            },
            decimalsChangeEdit(value){
                this.editCurrency.decimals = value
            },
            decimalsChangeAdd(value){
                this.addCurrency.decimals = value
            },
            handleChangeEdit(value){
                this.editCurrency.active = value
            },
            handleChangeAdd(value){
                this.addCurrency.active = value
            },
            //添加提交
            submitAdd(edit) {
                var flag = this.checkout(this.addCurrency)
                if(flag == false){
                    return
                }
                if(edit){
                    this.submitEdit()
                }else{
                    this.$post('/tax/addTax',this.addCurrency).then((reData)=>{
                        if(reData.code === '0'){
                            this.$notification.open({
                                message: '添 加',
                                duration: 3,
                                description: reData.message,
                                onClick: () => {
                                    console.log('ok');
                                },
                            })
                            // this.$message.success(reData.message, 3);
                            this.visible_add = false
                            this.addCurrency={
                                name:''
                                ,rate:''
                                ,iso_code_num:''
                                ,country_id:''
                                ,active:'1',
                                edit:false
                            },
                            this.getList({currentPage:this.pagination.currentPage,pageSize:this.pagination.defaultPageSize});

                        } else {
                            this.$notification.open({
                                message: '添 加',
                                duration: 3,
                                description: reData.message,
                                onClick: () => {
                                    console.log('ok');
                                },
                            })
                            // this.$message.error(reData.message);
                            this.visible_add = false
                        }
                    })
                }
                
            },
             //添加省州提交
            submitAddState(edit) {
                var flag = this.stateCheckout(this.addState)
                if(flag == false){
                    return
                }
                if(edit){
                    this.submitEditState()
                }else{
                    this.$post('/tax/addTaxState',this.addState).then((reData)=>{
                        if(reData.code === '0'){
                            this.$notification.open({
                                message: '添 加',
                                duration: 3,
                                description: reData.message,
                                onClick: () => {
                                    console.log('ok');
                                },
                            })
                            // this.$message.success(reData.message, 3);
                            this.visible_add = false
                            this.addState = {
                                country_id:'',
                                state_id:'',
                                rate:'',
                                active:'1',
                                name:'',
                                edit:false
                            }
                            this.getStataList({});

                        } else {
                            this.$notification.open({
                                message: '添 加',
                                duration: 3,
                                description: reData.message,
                                onClick: () => {
                                    console.log('ok');
                                },
                            })
                            // this.$message.error(reData.message);
                            this.visible_add = false
                        }
                    })
                }
                
            }
            //修改提交
            ,submitEdit() {
                this.$post('/tax/editTax',this.addCurrency).then((reData)=>{
                    if(reData.code === '0'){
                        this.$notification.open({
                            message: '修 改',
                            duration: 3,
                            description: reData.message,
                            onClick: () => {
                                console.log('ok');
                            },
                        })
                        // this.$message.success(reData.message, 3);
                        this.visible_add = false
                        this.getList({currentPage:this.pagination.currentPage,pageSize:this.pagination.defaultPageSize});
                    } else {
                        this.$notification.open({
                            message: '修 改',
                            duration: 3,
                            description: reData.message,
                            onClick: () => {
                                console.log('ok');
                            },
                        })
                        // this.$message.error(reData.message);
                        this.visible_add = false
                    }
                })
            },
              //州税修改提交
            submitEditState() {
                this.$post('/tax/editTaxState',this.addState).then((reData)=>{
                    if(reData.code === '0'){
                        this.$notification.open({
                            message: '修 改',
                            duration: 3,
                            description: reData.message,
                            onClick: () => {
                                console.log('ok');
                            },
                        })
                        // this.$message.success(reData.message, 3);
                        this.stateVisible_add = false
                        this.getStataList({});
                    } else {
                        this.$notification.open({
                            message: '修 改',
                            duration: 3,
                            description: reData.message,
                            onClick: () => {
                                console.log('ok');
                            },
                        })
                        // this.$message.error(reData.message);
                        this.stateVisible_add = false
                    }
                })
            },
            //新增属性
            addAttribute(){
                this.visible_add = true
            },
            // 州属性
            addAttributeState(){
                this.stateVisible_add = true;
            },
            //修改属性
            editAttribute(id){
               this.$post('/tax/getTaxListPage',{tax_id:id}).then((reData)=>{
                    this.addCurrency = reData.data.dataList[0];
                    this.addCurrency.edit = true;
                    this.addCurrency.active = this.addCurrency.active.toString()
                    this.addcountryTax(this.addCurrency.edit)
                })
            },
             //修改州属性
            stateEditAttribute(stateId){
               this.$post('/tax/getTaxStateList',{state_id:stateId}).then((reData)=>{
                   console.log(reData)
                    this.addState = reData.data[0];
                    this.addState.edit = true;
                    this.addState.active = this.addState.active.toString()
                    this.addStateTax(this.addState.edit)
                })
            }
            // 获取国家税列表
            ,getList(data){
                this.loading = true;
                this.$post('/tax/getTaxListPage',data).then((reData)=>{
                    console.log(reData)
                    this.attributeList=reData.data.dataList
                    this.pagination.total=reData.data.page.totalResultSize
                    this.loading = false
                })
            }
              // 获取省税列表
            ,getStataList(data){
                this.loading = true;
                this.$post('/tax/getTaxStateList',data).then((reData)=>{
                    console.log(reData)
                    this.attributeStateList=reData.data;
                    this.loading = false
                })
            }
            //表格分页
            ,handleTableChange(pagination){
                this.pagination.currentPage = pagination.current
                this.getList({currentPage:pagination.current,pageSize:pagination.defaultPageSize})
            }
            //更改商品状态
            ,change_active(data){
                this.$post('/tax/editTaxActive',data).then((reData)=>{
                    if(reData.code === '0'){
                        this.getList({currentPage:this.pagination.currentPage,page_size:this.pagination.defaultPageSize});
                    }else {
                        this.$notification.open({
                            message: '状态更改',
                            duration: 3,
                            description: reData.message,
                            onClick: () => {
                                console.log('ok');
                            },
                        })
                        // this.$message.error(reData.message);
                    }
                })
            }
             //更改州状态
            ,change_state_active(data){
                this.$post('/tax/editTaxStateActive',data).then((reData)=>{
                    if(reData.code === '0'){
                        this.getStataList({});
                    }else {
                        this.$notification.open({
                            message: '状态更改',
                            duration: 3,
                            description: reData.message,
                            onClick: () => {
                                console.log('ok');
                            },
                        })
                        // this.$message.error(reData.message);
                    }
                })
            }
            //删除商品
            ,deleteProduct(data){
                var that = this;
                this.$confirm({
                    title: '删 除',
                    content: '确认要删除信息',
                    onOk() {
                        that.$post('/tax/deleteTax',{tax_id:data}).then((reData)=>{
                            if(reData.code === '0'){
                                that.getList({currentPage:that.pagination.currentPage,page_size:that.pagination.defaultPageSize});
                            } else {
                                that.$message.error(reData.message);
                            }
                        })
                    },
                    onCancel() {},
                });
              
            }
              //删除州税
            ,deleteStateProduct(data){
                var that = this;
                this.$confirm({
                    title: '删 除',
                    content: '确认要删除信息',
                    onOk() {
                        that.$post('/tax/deleteTaxState',{tax_state_id:data}).then((reData)=>{
                            if(reData.code === '0'){
                                that.$notification.open({
                                    message: '删 除',
                                    duration: 2,
                                    description: reData.message,
                                    onClick: () => {
                                        console.log('ok');
                                    },
                                })
                                that.getStataList({});
                            } else {
                                that.$notification.open({
                                    message: '删 除',
                                    duration: 2,
                                    description: reData.message,
                                    onClick: () => {
                                        console.log('ok');
                                    },
                                })
                            }
                        })
                    },
                    onCancel() {},
                });
              
            },
            // 国家税添加校验
            checkout(data){
                 if(data.name === '' || data.name === null){
                    this.$message.error("请填写税率名");
                    return false
                }
                if(data.rate === '' || data.rate === null){  
                    this.$message.error("请填税率");
                    return false
                }
                if(data.country_id === '' || data.country_id === null){
                    this.$message.error("请填选择国家");
                    return false
                }
            },
              // 省州税添加校验
            stateCheckout(data){
                 if(data.name === '' || data.name === null){
                    this.$message.error("请填写税率名");
                    return false
                }
                if(data.rate === '' || data.rate === null){  
                    this.$message.error("请填税率");
                    return false
                }
                if(data.country_id === '' || data.country_id === null){
                    this.$message.error("请填选择国家");
                    return false
                }
                 if(data.state_id === '' || data.state_id === null){
                    this.$message.error("请填选择省/州");
                    return false
                }
            }

        },
        mounted() {
            var vm = this;
            store.commit('changeStore',{key:'title',val:'币种列表'});
            vm.getList({currentPage:vm.pagination.current,pageSize:vm.pagination.defaultPageSize})
            vm.getStataList({})
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