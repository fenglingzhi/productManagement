<template>
    <div class="producetAdd">
        <div class="secondTitle">
            <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                产品属性:
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
            <a-col class="gutter-row" :span="8">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="6">
                        <div class="inputName">尺码选择：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="16">
                        <div class="choseLists">
                            <a-checkbox-group :options="sizeListO"  @change="onChangeSize" />
                        </div>
                    </a-col>
                </div>
            </a-col>

            <a-col class="gutter-row" :span="8">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="6">
                        <div class="inputName">颜色选择：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="16">
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
                 >
          <span slot="action" slot-scope="text, record,index">
              <span v-show="!text.unit_id" style="color: #1890ff;cursor: pointer" @click="del(index)">删除</span>
          </span>
            <span slot="unit_code" slot-scope="text, record">
              <a-input v-model="text.unit_code" placeholder=""/>
          </span>

            <span slot="unit_weight" slot-scope="text, record">
              <a-input v-model="text.unit_weight" type="number" placeholder=""/>
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
            <span slot="good_qty" slot-scope="text, record">
              <a-input v-model="text.good_qty" type="number" placeholder=""/>
          </span>
            <span slot="img" slot-scope="text, record,index">
              <img width="40" height="30" @click="showPic(text.image_visit_url)" :src="text.image_visit_url"  alt="">
              <span v-if="text.image_visit_url==''" style="color: rgb(24, 144, 255);cursor: pointer;position: absolute;margin: 0;" @click="addPIc(index)">选择图片</span>
              <span v-else style="color: rgb(24, 144, 255);cursor: pointer;position: absolute;margin: 6px 6px;"  @click="addPIc(index)">选择图片</span>

          </span>
            <a slot="isDefault" slot-scope="text, record,index" style="text-align: center">
                <a-icon type="check" style="color: green" v-if="text.is_default == '1'" @click="change_active1('0',index)"></a-icon>
                <a-icon type="close" style="color: red" v-if="text.is_default == '0'" @click="change_active1('1',index)"></a-icon>
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
        <a-table :columns="columns2"
                 :dataSource="tabList"
                 align="center"
                 :scroll="{ x: 1000 }">
          <span slot="action" slot-scope="text, record,index">
              <span v-show="!text.unit_id" style="color: #1890ff;cursor: pointer" @click="del(index)">删除</span>
          </span>
            <span slot="unit_code" slot-scope="text, record">
              <a-input v-model="text.unit_code" placeholder=""/>
          </span>
            <span slot="unit_weight" slot-scope="text, record">
              <a-input v-model="text.unit_weight" type="number" placeholder=""/>
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
            <span slot="good_qty" slot-scope="text, record">
              <a-input v-model="text.good_qty" type="number" placeholder=""/>
          </span>
            <span slot="img" slot-scope="text, record,index">
              <img width="40" height="30" @click="showPic(text.image_url)" v-if="text.image_url!=''" :src="text.image_url" alt="">
              <span  style="color: rgb(24, 144, 255);cursor: pointer;position: absolute;margin: 6px 6px;" @click="addPIcOld(index)">选择图片</span>
          </span>

            <a slot="isDefault" slot-scope="text, record,index" style="text-align: center">
                <a-icon type="check" style="color: green" v-if="text.is_default == '1'" @click="change_active2('0',index)"></a-icon>
                <a-icon type="close" style="color: red" v-if="text.is_default == '0'" @click="change_active2('1',index)"></a-icon>
            </a>
        </a-table>

        <a-modal :visible="previewVisible" :footer="null"  @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>



        <a-modal     title="选择图片"
                     :destroyOnClose = "true"
                     :footer="null"
                     width="1000px"
                     :visible="choseVisible"
                     @cancel="handleCancel">

            <img class="showChoseImg" @click="choseImg(item.image_id,item.image_visit_url)" v-for="item in imgList" alt="example" :src="item.image_visit_url" />
        </a-modal>


        <a-modal     title="选择图片"
                     :destroyOnClose = "true"
                     :footer="null"
                     width="1000px"
                     :visible="choseVisibleOld"
                     @cancel="handleCancel">

            <img  class="showChoseImg" @click="choseImgOld(item.image_id,item.image_visit_url)" v-for="item in imgList" alt="example"  :src="item.image_visit_url" />
        </a-modal>

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
        { title: '商品重量(kg)', key: 'unit_weight', scopedSlots: { customRender: 'unit_weight' }},
        { title: 'ean13', key: 'ean13', scopedSlots: { customRender: 'ean13' }},
        { title: 'upc码', key: 'upc', scopedSlots: { customRender: 'upc' }},
        { title: '数量', key: 'good_qty', scopedSlots: { customRender: 'good_qty' }},
        { title: '图片', align: 'center' ,width:120,scopedSlots: { customRender: 'img' },},

        { title: '是否默认', align: 'center' ,scopedSlots: { customRender: 'isDefault' },},
        // { title: '颜色ID', dataIndex: 'color_id', key: 'color_id'},
        // { title: '尺码ID', dataIndex: 'size_id', key: 'size_id'},

    ];
    const columns2 = [
        // {title: '操作', key: 'action', scopedSlots: { customRender: 'action' },},
        { title: '属性商品名称', dataIndex: 'unit_name', key: 'unit_name'},
        { title: '属性商品码', key: 'unit_code', scopedSlots: { customRender: 'unit_code' }},
        { title: '商品重量(kg)', key: 'unit_weight', scopedSlots: { customRender: 'unit_weight' }},
        { title: 'ean13', key: 'ean13', scopedSlots: { customRender: 'ean13' }},
        { title: 'upc码', key: 'upc', scopedSlots: { customRender: 'upc' }},
        { title: '数量', key: 'good_qty', scopedSlots: { customRender: 'good_qty' }},
        { title: '图片', align: 'center' ,width:120,scopedSlots: { customRender: 'img' },},

        { title: '是否默认', align: 'center' ,scopedSlots: { customRender: 'isDefault' },},
        // { title: '颜色ID', dataIndex: 'color_id', key: 'color_id'},
        // { title: '尺码ID', dataIndex: 'size_id', key: 'size_id'},

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

                let sizeData = []
                vm.sizeListO.forEach(function(val, index) {
                    checkedValues.forEach(function(valB, indexB) {
                        if(val.value==valB){
                            sizeData.push({
                                value:valB,
                                label:val.label
                            })
                        }
                    });
                });
                vm.sizeList=vm.sizeListCopy.concat(sizeData)
                // this.sizeList.push(checkedValues)
                console.log('checked = ', checkedValues)

                this.makeList()

            },
            onChangeColor (checkedValues) {
                var vm =this
                let colorData = []
                vm.colorListO.forEach(function(val, index) {
                    checkedValues.forEach(function(valB, indexB) {
                        if(val.value==valB){
                            colorData.push({
                                value:valB,
                                label:val.label
                            })
                        }
                    });
                });
                vm.colorList=vm.colorListCopy.concat(colorData)
                // this.colorList.push(checkedValues)
                this.makeList()
            },
            change_active1(statu,index){
                this.tabList.forEach(function(val, index) {
                    val.is_default="0"
                });
                this.tabListCopy.forEach(function(val, index) {
                    val.is_default="0"
                });
                this.tabListCopy[index].is_default=statu
            },
            change_active2(statu,index){
                this.tabList.forEach(function(val, index) {
                    val.is_default="0"
                });
                this.tabListCopy.forEach(function(val, index) {
                    val.is_default="0"
                });
                this.tabList[index].is_default=statu
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
                                    unit_weight:'',
                                    ean13:'',
                                    upc:'',
                                    good_qty:'',
                                    image_id:'',
                                    image_visit_url:'',
                                    is_default:'0',
                                    color_id:valc.value,
                                    size_id:val.value,
                                }
                            )
                        }

                    });
                });
                // vm.tabListCopy.forEach(function(vala, indexa) {
                //     vm.tabList.forEach(function(valb, indexb) {
                //         console.log("tabListCopy  +"+vala.unit_name, indexa)
                //         console.log("tabList      +"+valb.unit_name, indexb)
                //
                //         if(vala.unit_name==valb.unit_name){
                //                 vm.tabListCopy.splice(indexa,1)
                //         }
                //     })
                // })
                let a = vm.tabListCopy
                let b = vm.tabList
                let objb = {};
                b.forEach((e,i) =>{
                    objb[e.unit_name] = e;
                })
                let result = a.reduce((acc, e, i) => {
                    if (!objb[e.unit_name]){
                        acc.push(e);
                    }
                    return acc;
                },[])
                vm.tabListCopy = result


                // if(vm.tabList.length!=0){
                //     vm.tabList[0].is_default=1
                // }
                // this.colorList = this.unique1(this.colorList)
                // this.sizeList = this.unique1(this.sizeList)
            },
            getData(){
                var vm = this
                this.$fetch('/property/getPropertyListById',{property_id:1,parent_id:1,lang_id:this.$store.state.langId}).then((reData)=>{
                    reData.data.forEach(function(val, indexc) {
                        if(val.parent_id!=0){
                            vm.colorListO.push({value:val.attribute_id,label:val.attribute_name,disabled:false})
                        }
                    });
                })
                this.$fetch('/property/getPropertyListById',{property_id:2,parent_id:2,lang_id:this.$store.state.langId}).then((reData)=>{
                    reData.data.forEach(function(val, indexc) {
                        if(val.parent_id!=0){
                            vm.sizeListO.push({value:val.attribute_id,label:val.attribute_name,disabled:false})
                        }
                    });
                })
                setTimeout(function () {
                    vm.getTabData()
                },1000)
                this.makeList()
            },
            getTabData(){
                this.tabList=[]
              this.colorList=[]
                this.sizeList=[]

                this.$post('/productUnit/getProductUnitList',{product_id:this.$store.state.goods_id}).then((reData)=>{
                    let dataF =  reData.data.dataList
                    let dataD= this.colorListO
                    let dataE= this.sizeListO
                    dataD.forEach(function(val, indexc) {
                        dataD[indexc].disabled=false
                    });
                    dataE.forEach(function(val, indexc) {
                        dataE[indexc].disabled=false
                    });
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
                        this.sizeListCopy=  this.sizeList
                        this.colorListCopy=  this.colorList

                        this.tabList.push({
                            ean13: dataF[i].ean13,
                            unit_name: dataF[i].unit_name,
                            is_default: dataF[i].is_default,
                            product_id:dataF[i].product_id,
                            unit_code:dataF[i].unit_code,
                            unit_weight:dataF[i].unit_weight,
                            unit_id: dataF[i].unit_id,
                            size_id:dataF[i].size_id,
                            image_url:dataF[i].image_url,
                            image_id:dataF[i].image_id,

                            good_qty:dataF[i].good_qty,
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


                var vm =this
                var isAllOk=false
                for(let i=0;i<postData.length;i++){
                    Object.keys(postData[i]).forEach(function(key){
                        if(postData[i][key]===''){
                            isAllOk = true
                        }
                    });
                }
                console.log(postData)
                if (!isAllOk){
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
                            if(reData.code==0){
                                // store.commit('changeStore',{key:'addProductContent',val:'productAddPic'});
                                // store.commit('changeStore',{key:'addProductCurrent',val:'6'});
                            }
                        } ,

                    });

                }else {
                    store.commit('changeStore',{key:'loading',val:false});
                    this.$notification.open({
                        message: '提醒',
                        description: '请把每条组合的所有信息填写完整再提交！',
                        onClick: () => {
                            console.log('ok');
                        },
                    })
                }
            },
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
            },
            getImgdata(){
                this.$post('/productImage/getProductImage',{productId:this.$store.state.goods_id,langId:this.$store.state.langId}).then((reData)=>{
                    console.log(reData)
                    this.imgList=reData.data


                })
            },
            showPic(url){
                this.previewImage=url
                this.previewVisible=true
            },
            handleCancel(){
                this.previewVisible=false
                this.choseVisible=false
                this.choseVisibleOld=false
            },
            addPIc(index){
                this.imgIndex = index
                this.choseVisible = true
                // this.tabListCopy[index].image_id=data
            },
            addPIcOld(index){
                this.imgIndex = index
                this.choseVisibleOld = true
            },
            choseImg(image_id,image_visit_url){
                this.tabListCopy[this.imgIndex].image_id = image_id
                this.tabListCopy[this.imgIndex].image_visit_url = image_visit_url
                this.choseVisible = false

            },
            choseImgOld(image_id,image_url){
                this.tabList[this.imgIndex].image_id = image_id
                this.tabList[this.imgIndex].image_url = image_url
                this.choseVisibleOld = false

            }


        } ,
        mounted() {
            // alert(this.$store.state.goods_id)
            // this.postData.productId = this.$store.state.goods_id
            this.getData()
            this.getImgdata()

        },
        data() {
            return {
                imgList:[],
                imgIndex:'',
                choseVisibleOld:false,
                choseVisible:false,
                previewVisible:false,
                columns,columns2,
                productId:'',
                sizeListO:[],
                colorListO:[],
                sizeList:[],
                colorList:[],
                sizeListCopy:[],
                colorListCopy:[],
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



            "$store.state.addProductCurrent"() {
                console.log(this.$store.state.addProductContent)
                if(this.$store.state.addProductContent=='productCombination'){
                    this.getImgdata()
                    this.getTabData()

                }
            },
            "$store.state.goods_id"() {
                this.productId =  this.$store.state.goods_id;
            },
            "$store.state.isEdit"() {
                if( this.$store.state.isEdit == true){
                    this.getTabData()
                }
            }
        },
    }
</script>
<style scoped>
    .showChoseImg{
        width: 15%;
        margin: 10px;
        border: 2px solid #adadaa;
    }
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