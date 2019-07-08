<template>
    <div class="producetAdd">
        <div class="secondTitle">
            <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                产品属性：
            </a-col>
            <a-col class="gutter-row" :span="3">
                <a-row>
                    <a-col class="gutter-row" :offset="12" :span="12">
                        <a-button type="primary"  @click="saveEiderInfor()">保存</a-button>
                    </a-col>
                </a-row>
            </a-col>
        </div>
        <a-row>
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="6">
                        <div class="inputName">尺码选择：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="18">
                        <div class="choseLists">
                            <a-checkbox-group :options="sizeListO"  @change="onChangeSize" />
                        </div>
                    </a-col>
                </div>
            </a-col>

            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="6">
                        <div class="inputName">颜色选择：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="18">
                        <div class="choseLists">

                            <a-checkbox-group :options="colorListO"  @change="onChangeColor" />

                        </div>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <div class="secondTitle">
            <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                新增组合：
            </a-col>
            <a-col class="gutter-row" :span="3">
                <a-row>
                    <a-col class="gutter-row" :offset="12" :span="12">
                    </a-col>
                </a-row>
            </a-col>
        </div>
        <a-table :columns="columns"
                 :dataSource="tabListCopy"
                 align="center"
                 :scroll="{ x: 1000 }">
          <span slot="action" slot-scope="text, record,index">
              <span v-show="!text.unit_id" style="color: #1890ff;cursor: pointer" @click="del(index)">删除</span>
          </span>
            <span slot="unit_code" slot-scope="text, record">
              <a-input v-model="text.unit_code" placeholder=""/>
          </span>
            <span slot="ean13" slot-scope="text, record">
              <a-input v-model="text.ean13" placeholder=""/>
          </span>
            <span slot="unit_code" slot-scope="text, record">
              <a-input v-model="text.unit_code" placeholder=""/>
          </span>
            <span slot="upc" slot-scope="text, record">
              <a-input v-model="text.upc" placeholder=""/>
          </span>

            <a slot="isDefault" slot-scope="text, record,index" style="text-align: center">
                <a-icon type="check" style="color: green" v-if="text.is_default == '1'" @click="change_active('0',index)"></a-icon>
                <a-icon type="close" style="color: red" v-if="text.is_default == '0'" @click="change_active('1',index)"></a-icon>
            </a>
        </a-table>

        <div class="secondTitle">
            <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                已有组合：
            </a-col>
            <a-col class="gutter-row" :span="3">
                <a-row>
                    <a-col class="gutter-row" :offset="12" :span="12">
                    </a-col>
                </a-row>
            </a-col>
        </div>
        <a-table :columns="columns"
                 :dataSource="tabList"
                 align="center"
                 :scroll="{ x: 1000 }">
          <span slot="action" slot-scope="text, record,index">
              <span v-show="!text.unit_id" style="color: #1890ff;cursor: pointer" @click="del(index)">删除</span>
          </span>
            <span slot="unit_code" slot-scope="text, record">
              <a-input v-model="text.unit_code" placeholder=""/>
          </span>
            <span slot="ean13" slot-scope="text, record">
              <a-input v-model="text.ean13" placeholder=""/>
          </span>
            <span slot="unit_code" slot-scope="text, record">
              <a-input v-model="text.unit_code" placeholder=""/>
          </span>
            <span slot="upc" slot-scope="text, record">
              <a-input v-model="text.upc" placeholder=""/>
          </span>

            <a slot="isDefault" slot-scope="text, record,index" style="text-align: center">
                <a-icon type="check" style="color: green" v-if="text.is_default == '1'" @click="change_active('0',index)"></a-icon>
                <a-icon type="close" style="color: red" v-if="text.is_default == '0'" @click="change_active('1',index)"></a-icon>
            </a>
        </a-table>





    </div>
</template>
<script>
    var vm =this
    import router from '../../router'
    import store from '../../store'
    import $ from 'jquery'
    import TinymceEditor from '../../components/tinymce-editor'

    const columns = [
        {title: '操作', key: 'action', scopedSlots: { customRender: 'action' },},
        { title: '属性商品名称', dataIndex: 'unit_name', key: 'unit_name'},
        { title: '属性商品码', key: 'unit_code', scopedSlots: { customRender: 'unit_code' }},
        { title: 'ean13', key: 'ean13', scopedSlots: { customRender: 'ean13' }},
        { title: 'upc码', key: 'upc', scopedSlots: { customRender: 'upc' }},
        { title: '是否默认', align: 'center' ,scopedSlots: { customRender: 'isDefault' },},
        { title: '颜色ID', dataIndex: 'color_id', key: 'color_id'},
        { title: '尺码ID', dataIndex: 'size_id', key: 'size_id'},

    ];
    export default {
        components:{
            TinymceEditor
        },
        methods: {
            handleChangeSelect(value) {
                this.postData.currencyId=value
            },

            onChangeSize (checkedValues) {
                var vm =this
                vm.sizeList=[]
                vm.sizeListO.forEach(function(val, index) {
                    checkedValues.forEach(function(valB, indexB) {
                        if(val.value==valB){
                            vm.sizeList.push({
                                value:valB,
                                label:val.label
                            })
                        }
                    });
                });
                // this.sizeList.push(checkedValues)
                console.log('checked = ', checkedValues)

                this.makeList()

            },
            onChangeColor (checkedValues) {
                var vm =this
                vm.colorList=[]
                vm.colorListO.forEach(function(val, index) {
                    checkedValues.forEach(function(valB, indexB) {
                        if(val.value==valB){
                            vm.colorList.push({
                                value:valB,
                                label:val.label
                            })
                        }
                    });
                });
                // this.colorList.push(checkedValues)
                this.makeList()
            },
            change_active(statu,index){
                this.tabListCopy.forEach(function(val, index) {
                    val.is_default="0"
                });
                this.tabListCopy[index].is_default=statu
            },
            makeList(){
                var vm = this
                vm.tabListCopy=[]
                vm.sizeList.forEach(function(val, index) {
                    vm.colorList.forEach(function(valc, indexc) {
                        if(val.val!=''&&valc.val!='' ){
                            var sizeName=''
                            var colorName=''
                            vm.sizeListO.forEach(function(valB, indexB) {
                                if(val.val==valB.attribute_id){
                                    colorName= valB.attribute_name
                                }
                            });
                            vm.colorListO.forEach(function(valB, indexB) {
                                if(valc.val==valB.attribute_id){
                                    sizeName= valB.attribute_name
                                }
                            });
                            vm.tabListCopy.push(
                                {
                                    product_id:vm.$store.state.goods_id,
                                    unit_name:val.label+"-"+valc.label,
                                    unit_code:'',
                                    ean13:'',
                                    upc:'',
                                    is_default:'0',
                                    color_id:valc.value,
                                    size_id:val.value,
                                }
                            )


                        }

                    });
                });

                // if(vm.tabList.length!=0){
                //     vm.tabList[0].is_default=1
                // }
                // this.colorList = this.unique1(this.colorList)
                // this.sizeList = this.unique1(this.sizeList)
            },

            getData(){
                var vm = this
                this.$fetch('/property/getPropertyById',{property_id:1,parent_id:1}).then((reData)=>{
                    reData.data.forEach(function(val, indexc) {
                        if(val.parent_id!=0){
                            vm.colorListO.push({value:val.attribute_id,label:val.attribute_name,disabled:false})
                        }
                    });
                })
                this.$fetch('/property/getPropertyById',{property_id:2,parent_id:2}).then((reData)=>{
                    reData.data.forEach(function(val, indexc) {
                        if(val.parent_id!=0){
                            vm.sizeListO.push({value:val.attribute_id,label:val.attribute_name,disabled:false})
                        }
                    });
                })
                setTimeout(function () {
                    vm.getTabData()
                },1000)

            },
            getTabData(){
                this.$post('/productUnit/getProductUnitList',{product_id:this.$store.state.goods_id}).then((reData)=>{
                    let dataF =  reData.data.dataList
                    let dataD= this.colorListO
                    let dataE= this.sizeListO

                    for(let i=0;i<dataF.length;i++){
                        // this.colorList.push({val:dataF[i].color_id,status:true})
                        // this.sizeList.push({val:dataF[i].sizeList,status:true})
                        for(let b=0;b<dataD.length;b++ ){
                            if(dataD[b].value==dataF[i].color_id){
                                this.colorListO[b].disabled=true
                                let isIn= true
                                this.colorList.forEach(function(val, index) {
                                    if(val.value==dataF[i].color_id){
                                        isIn = false
                                    }
                                });
                                if(isIn){
                                    this.colorList.push({value:dataF[i].color_id,label:dataD[b].label})
                                }
                            }
                        }
                        for(let b=0;b<dataE.length;b++ ){
                            if(dataE[b].value==dataF[i].size_id){
                                this.sizeListO[b].disabled=true
                                let isIn= true
                                this.sizeList.forEach(function(val, index) {
                                    if(val.value==dataF[i].size_id){
                                        isIn = false
                                    }
                                });
                                if(isIn){
                                    this.sizeList.push({value:dataF[i].size_id,label:dataE[b].label})
                                }


                            }
                        }

                        this.tabList.push({
                            ean13: dataF[i].ean13,
                            unit_name: dataF[i].unit_name,
                            is_default: dataF[i].is_default,
                            product_id:dataF[i].product_id,
                            unit_code:dataF[i].unit_code,
                            unit_id: dataF[i].unit_id,
                            size_id:dataF[i].size_id,
                            color_id:dataF[i].color_id,
                            upc: dataF[i].upc,
                        })
                    }
                    // this.colorList = this.unique1(this.colorList)
                    // this.sizeList = this.unique1(this.sizeList)

                })



            },
            unique1(arr){
                var hash=[];
                for (var i = 0; i < arr.length; i++) {
                    if(hash.indexOf(arr[i])==-1){
                        hash.push(arr[i]);
                    }
                }
                return hash;
            },
            del(index){
                this.tabListCopy.splice(index,1)
            },
            saveEiderInfor(){
                // store.commit('changeStore',{key:'loading',val:true});
                let isAll = true
                // this.tabList.forEach(function(val, index) {
                //     for(let key in val){
                //         if(val[key]==""){
                //             console.log(key)
                //             isAll =false
                //         }
                //     }
                // });
               var postData =  this.tabList.concat(this.tabListCopy)
                console.log(postData)
                if (isAll){
                    var vm =this
                    $.ajax({
                        dataType:'JSON',
                        type: 'POST',
                        url: vm.$store.state.baseURL+'/productUnit/editProductUnit' ,
                        data: {unitList:JSON.stringify(postData)} ,
                        // traditional: true,
                        success: function (reData) {
                            vm.$notification.open({
                                message: '提醒',
                                description: reData.message,
                                onClick: () => {
                                    console.log('ok');
                                },
                            })
                            store.commit('changeStore',{key:'addProductContent',val:'productAddPic'});
                            store.commit('changeStore',{key:'addProductCurrent',val:'6'});


                        } ,

                    });

                }else {
                    store.commit('changeStore',{key:'loading',val:false});
                    this.$notification.open({
                        message: '提醒',
                        description: '请把信息填写完整再提交！',
                        onClick: () => {
                            console.log('ok');
                        },
                    })
                }
            }
            ,
            saveProductInfor(){
                // store.commit('changeStore',{key:'loading',val:true});
                let isAll = true
                // this.tabList.forEach(function(val, index) {
                //     for(let key in val){
                //         if(val[key]==""){
                //             console.log(key)
                //             isAll =false
                //         }
                //     }
                // });

                if (isAll){
                    var vm =this
                    $.ajax({
                        dataType:'JSON',
                        type: 'POST',
                        url: vm.$store.state.baseURL+'/productUnit/addProductUnit' ,
                        data: {unitList:JSON.stringify(vm.tabList)} ,
                        // traditional: true,
                        success: function (reData) {
                            vm.$notification.open({
                                message: '提醒',
                                description: reData.message,
                                onClick: () => {
                                    console.log('ok');
                                },
                            })
                        } ,

                    });

                }else {
                    store.commit('changeStore',{key:'loading',val:false});

                    this.$notification.open({
                        message: '提醒',
                        description: '请把信息填写完整再提交！',
                        onClick: () => {
                            console.log('ok');
                        },
                    })
                }
            }
        } ,
        mounted() {
            // alert(this.$store.state.goods_id)
            // this.postData.productId = this.$store.state.goods_id
            this.getData()
        },
        data() {
            return {
                columns,
                productId:'',
                sizeListO:[],
                colorListO:[],
                sizeList:[],
                colorList:[],
                tabListCopy:[],
                tabList:[
                    // {
                    //     product_id:'',
                    //     title:'',
                    //     unit_code:'',
                    //     ean13:'',
                    //     upc:'',
                    //     is_default:'',
                    //     color_id:'',
                    //     size_id:'',
                    //     unit_name:''
                    // }
                ],
            }
        } ,
        watch: {
            "$store.state.goods_id"() {
                this.productId =  this.$store.state.goods_id;
            }
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
    .secondTitle{
        text-align: left;
        font-size: 16px;
        font-weight: bold;
        width: 100%;
        border-bottom: 1px solid #999;
        margin-bottom: 24px;
        padding-bottom: 12px;
        box-shadow: 0 0 black;
        height: 50px;
    }
    .ant-upload-select-picture-card i {
        font-size: 32px;
        color: #999;
    }

    .ant-upload-select-picture-card .ant-upload-text {
        margin-top: 8px;
        color: #666;
    }
    .choseLists{
        height: 150px;
        overflow: auto;
    }
    .ant-checkbox-group{
        width: 100%;
    }
</style>