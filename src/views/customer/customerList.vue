<template>
  <div class="customerList">
    客户信息
    <div class="hrLine"></div>
    <div>
      <div style="margin: 16px 0">
        <a-button type="primary" @click="add_product()">
          新增
        </a-button>
      </div>
      <a-table :columns="columns"
               :dataSource="productListData"
               :pagination="pagination"
               :loading="loading"
               align="center"
               @change="handleTableChange"
               :rowSelection="rowSelection"
               :scroll="{ x: 1800 }">
          <span slot="action" slot-scope="text, record">
              {{record.customer_id}}
              <a @click="searchFun({customer_id:record.customer_id})">查看</a>
              <a-divider type="vertical"></a-divider>
              <a @click="editFun({customer_id:record.customer_id})">修改</a>
              <a-divider type="vertical"></a-divider>
              <a @click="deleteProduct({customer_id:record.customer_id})">删除{{record.product_id}}</a>
          </span>
        <a slot="newsletter" slot-scope="text, record" style="text-align: center">
          <!--{{record}}-->
          <a-icon type="check" style="color: green" v-if="text === '1'" @click="change_active({product_id:record.product_id,active:'0'})"></a-icon>
          <a-icon type="close" style="color: red" v-if="text === '0'" @click="change_active({product_id:record.product_id,active:'1'})"></a-icon>
        </a>
          <a slot="active" slot-scope="text, record" style="text-align: center">
              <!--{{record}}-->
              <a-icon type="check" style="color: green" v-if="text === '1'" @click="change_active({product_id:record.product_id,active:'0'})"></a-icon>
              <a-icon type="close" style="color: red" v-if="text === '0'" @click="change_active({product_id:record.product_id,active:'1'})"></a-icon>
          </a>
        <a slot="optin" slot-scope="text, record" style="text-align: center">
          <!--{{record}}-->
          <a-icon type="check" style="color: green" v-if="text === '1'" @click="change_active({product_id:record.product_id,active:'0'})"></a-icon>
          <a-icon type="close" style="color: red" v-if="text === '0'" @click="change_active({product_id:record.product_id,active:'1'})"></a-icon>
        </a>
      </a-table>
    </div>
      <div class="addCustomerGender">
          <a-modal
                  title="新增客户信息"
                  v-model="visible_add"
                  @ok="submitAdd"
          >
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">称呼：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange">
                              <a-select-option  v-for="item in genderIdList" :value=item.gender_id>{{item.name}}</a-select-option>
                          </a-select>
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">名：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-input placeholder="请输入名" v-model="addCustomerInfo.firstname" />
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">姓：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-input placeholder="请输入姓" v-model="addCustomerInfo.lastname" />
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">邮箱地址：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-input placeholder="请输入邮箱地址" v-model="addCustomerInfo.email" />
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">密码：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-input placeholder="请输入密码" type="password" v-model="addCustomerInfo.passwd" />
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">生日：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-date-picker @change="onChange" />
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">状态：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange_s">
                              <a-select-option  value="1">是</a-select-option>
                              <a-select-option  value="0">否</a-select-option>
                          </a-select>
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">接受电子订阅：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange_e">
                              <a-select-option  value="1">是</a-select-option>
                              <a-select-option  value="0">否</a-select-option>
                          </a-select>
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">接受推销：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange_p">
                              <a-select-option  value="1">是</a-select-option>
                              <a-select-option  value="0">否</a-select-option>
                          </a-select>
                      </a-col>
                  </div>
              </a-row>
          </a-modal>
      </div>
      <div class="editCustomerGender">
          <a-modal
                  title="修改客户信息"
                  v-model="visible_edit"
                  @ok="submitEdit"
          >
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">称呼：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange" :value="addCustomerInfo.genderId">
                              <a-select-option  v-for="item in genderIdList" :value=item.gender_id>{{item.name}}</a-select-option>
                          </a-select>
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">名：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-input placeholder="请输入名" v-model="addCustomerInfo.firstname" />
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">姓：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-input placeholder="请输入姓" v-model="addCustomerInfo.lastname" />
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">邮箱地址：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-input placeholder="请输入邮箱地址" v-model="addCustomerInfo.email" />
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">密码：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-input placeholder="请输入密码" type="password" v-model="addCustomerInfo.passwd" />
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">生日：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-date-picker
                                  :defaultValue="moment(addCustomerInfo.birthday, dateFormat)"
                                  @change="onChange"
                                  :format="dateFormat" />
                          <!--<a-date-picker :defaultValue="moment(addCustomerInfo.birthday, dateFormat)" :format="dateFormat" />-->
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">状态：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange_s" v-model="addCustomerInfo.active">
                              <a-select-option value="1">是</a-select-option>
                              <a-select-option value="0">否</a-select-option>
                          </a-select>
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">接受电子订阅：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange_e" :value="addCustomerInfo.newsletter">
                              <a-select-option value="1">是</a-select-option>
                              <a-select-option value="0">否</a-select-option>
                          </a-select>
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">接受推销：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange_p" :value="addCustomerInfo.optin">
                              <a-select-option value=1>是</a-select-option>
                              <a-select-option value=0>否</a-select-option>
                          </a-select>
                      </a-col>
                  </div>
              </a-row>
          </a-modal>
      </div>
      <div class="searchCustomerGender">
          <a-modal
                  title="查看客户信息"
                  v-model="visible_search"
          >
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">称呼：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange">
                              <a-select-option  v-for="item in genderIdList" :value=item.gender_id>{{item.name}}</a-select-option>
                          </a-select>
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">名：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-input placeholder="请输入名" v-model="addCustomerInfo.firstname" />
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">姓：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-input placeholder="请输入姓" v-model="addCustomerInfo.lastname" />
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">邮箱地址：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-input placeholder="请输入邮箱地址" v-model="addCustomerInfo.email" />
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">密码：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-input placeholder="请输入密码" type="password" v-model="addCustomerInfo.passwd" />
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">生日：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-date-picker @change="onChange" />
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">状态：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange_s">
                              <a-select-option  value="1">是</a-select-option>
                              <a-select-option  value="0">否</a-select-option>
                          </a-select>
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">接受电子订阅：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange_e">
                              <a-select-option  value="1">是</a-select-option>
                              <a-select-option  value="0">否</a-select-option>
                          </a-select>
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">接受推销：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange_p">
                              <a-select-option  value="1">是</a-select-option>
                              <a-select-option  value="0">否</a-select-option>
                          </a-select>
                      </a-col>
                  </div>
              </a-row>
          </a-modal>
      </div>
  </div>
</template>
<script>
    import router from '../../router';
    import store from '../../store';
    import moment from 'moment'
    const columns = [
        {title: '操作',dataIndex: 'action', key: 'action', scopedSlots: { customRender: 'action' },},
        { title: '称呼', dataIndex: 'name', key: 'name'},
        { title: '名', dataIndex: 'firstname', key: 'firstname'},
        { title: '姓', dataIndex: 'lastname', key: 'lastname'},
        { title: '生日', dataIndex: 'birthday', key: 'birthday'},
        { title: '电子邮件', dataIndex: 'email', key: 'email'},
        { title: '添加时间', dataIndex: 'add_date', key: 'add_date'},
        { title: '付款最多天数', dataIndex: 'max_payment_days', key: 'max_payment_days'},
        { title: '允许未付金额', dataIndex: 'outstanding_allow_amount', key: 'outstanding_allow_amount'},
        { title: 'cod拒签次数', dataIndex: 'cod_reject', key: 'cod_reject'},
        { title: '是否接受推销', dataIndex: 'optin', key: 'optin', align: 'center' ,scopedSlots: { customRender: 'optin' },},
        { title: '是否接受电子订阅', dataIndex: 'newsletter', key: 'newsletter', align: 'center' ,scopedSlots: { customRender: 'newsletter' },},
        { title: '状态', dataIndex: 'active', key: 'active', align: 'center' ,scopedSlots: { customRender: 'active' },},
        { title: '个人信息的完善', dataIndex: 'completed', key: 'completed'},
        // { title: '上一次修改密码时间', dataIndex: 'last_passwd_gen', key: 'last_passwd_gen'},
        { title: '客户风险等级', dataIndex: 'risk_id', key: 'risk_id'},

    ];
    const productListData = [];
    //表格复选框
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
    };
    export default {
        data() {
            return {
                productListData,
                columns,
                rowSelection,
                dateFormat: 'YYYY/MM/DD',
                visible_add: false,
                visible_edit: false,
                visible_search: false,
                loading: false,
                pagination:{
                    defaultPageSize:10,
                    total:1,
                }
                ,fabricList:[]
                ,genderIdList:[]
                ,addCustomerInfo:{
                    genderId:''
                    ,firstname:''
                    ,lastname:''
                    ,email:''
                    ,passwd:''
                    ,birthday:''
                    ,active:''
                    ,newsletter:''
                    ,optin:''
                }
            }
        },
        methods: {
            moment,
            //性别
            handleChange(value) {
                console.log(`selected ${value}`);
                this.addCustomerInfo.genderId = value
            }
            //状态
            ,handleChange_s(value) {
                console.log(`selected ${value}`);
                this.addCustomerInfo.active = value
            }
            //接受电子订阅
            ,handleChange_e(value) {
                console.log(`selected ${value}`);
                this.addCustomerInfo.newsletter = value
            }
            //接受推销
            ,handleChange_p(value) {
                console.log(`selected ${value}`);
                this.addCustomerInfo.optin = value
            }
            //新增商品
            ,add_product(){
                this.visible_add = true
            }
            //编辑
            ,editFun(data) {
                this.visible_edit = true;
                this.getListDetail(data);
            }
            //查看详情
            ,searchFun(data){
                this.getListDetail(data);
                this.visible_search = true;
            }
            //添加提交
            ,submitAdd() {
                console.log(this.addCustomerInfo)
                this.$post('/customer/addCustomerInfo',this.addCustomerInfo).then((reData)=>{
                    if(reData.code === '0'){
                        this.visible_add = false
                        this.getList({currentPage:1,pageSize:this.pagination.defaultPageSize});
                    } else {
                        this.$message.error(reData.message);
                        this.visible_add = false
                    }
                })
            }
            //修改提交
            ,submitEdit() {
                // console.log(this.addCustomerInfo);
                // this.$post('/customer/updateCustomerInfo',this.addCustomerInfo).then((reData)=>{
                //     if(reData.code === '0'){
                //         this.visible_add = false
                //         this.getList({currentPage:1,pageSize:this.pagination.defaultPageSize});
                //     } else {
                //         this.$message.error(reData.message);
                //         this.visible_add = false
                //     }
                // })
            }
            // 获取客户信息列表
            ,getList(data){
                this.loading = true;
                this.$post('/customer/getCustomerListPageInfo',data).then((reData)=>{
                    this.productListData=reData.data.dataList
                    this.pagination.total=reData.data.page.totalResultSize
                    this.loading = false
                })
            }
            // 获取客户信息详情
            ,getListDetail(data){
                this.$post('/customer/getCustomerList',data).then((reData)=>{
                    this.addCustomerInfo.genderId=reData.data[0].gender_id;
                    this.addCustomerInfo.firstname=reData.data[0].firstname;
                    this.addCustomerInfo.lastname=reData.data[0].lastname;
                    this.addCustomerInfo.email=reData.data[0].email;
                    this.addCustomerInfo.passwd=reData.data[0].passwd;
                    this.addCustomerInfo.birthday=reData.data[0].birthday.toString();
                    this.addCustomerInfo.active=reData.data[0].active;
                    this.addCustomerInfo.newsletter=reData.data[0].newsletter;
                    this.addCustomerInfo.optin=reData.data[0].optin;
                    console.log(this.addCustomerInfo.birthday)
                })
            }
            //表格分页
            ,handleTableChange(pagination){
                console.log(pagination.defaultPageSize)
                this.getList({currentPage:pagination.current,page_size:pagination.defaultPageSize})
            }
            //搜索产品
            ,search_product(data){
                this.$post('/product/getProductListPage',data).then((reData)=>{

                    this.productListData=reData.data.dataList
                    this.pagination.total=reData.data.page.totalResultSize
                    this.loading = false
                })
            }
            //时间选择
            ,onChange(date, dateString) {
                console.log(dateString)
                this.addCustomerInfo.birthday = dateString
            }
            //更改商品状态
            ,change_active(data){
                this.$post('/product/editDisableProduct',data).then((reData)=>{
                    if(reData.code === '0'){
                        this.getList({page:1,page_size:this.pagination.defaultPageSize});
                    }
                })
            }
            //删除商品
            ,deleteProduct(data){
                this.$post('/customer/removeCustomerInfo',data).then((reData)=>{
                    if(reData.code === '0'){
                        this.getList({currentPage:1,pageSize:this.pagination.defaultPageSize});
                    }
                })
            }
            //获取性别列表
            ,getGender(){
                this.$post('/gender/getGenderList',{langId:store.state.langId}).then((reData)=>{
                    this.genderIdList=reData.data.slice(0)
                });
            }
        },
        mounted() {
            var vm = this
            store.commit('changeStore',{key:'title',val:'产品列表'});
            vm.getList({currentPage:1,pageSize:vm.pagination.defaultPageSize})
            vm.getGender();
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