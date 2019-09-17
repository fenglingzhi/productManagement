<template>
  <div class="customerList">
      <a-row>
          <a-col class="gutter-row" :span="6">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="8">
                      <div class="inputName">客户ID：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="16">
                      <a-input placeholder="请输入客户ID" v-model="addCustomerInfo.customerId" />
                  </a-col>
              </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="8">
                      <div class="inputName">Email ：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="16">
                      <a-input placeholder="请输入email" v-model="addCustomerInfo.email"/>
                  </a-col>
              </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="8">
                      <div class="inputName">称呼：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="16">
                      <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange">
                          <a-select-option value="">请选择</a-select-option>
                          <a-select-option value="1">男</a-select-option>
                          <a-select-option value="2">女</a-select-option>
                          <a-select-option value="3">中性</a-select-option>
                      </a-select>
                  </a-col>
              </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="8">
                      <div class="inputName">启用：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="16">
                      <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange_s">
                          <a-select-option value="">请选择</a-select-option>
                          <a-select-option value="1">禁用</a-select-option>
                          <a-select-option value="0">正常</a-select-option>
                      </a-select>
                  </a-col>
              </div>
          </a-col>

      </a-row>
      <a-row>
          <a-col class="gutter-row" :span="6">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="8">
                      <div class="inputName">简报：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="16">
                      <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange_e">
                          <a-select-option value="">请选择</a-select-option>
                          <a-select-option value="1">是</a-select-option>
                          <a-select-option value="0">否</a-select-option>
                      </a-select>
                  </a-col>
              </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="8">
                      <div class="inputName">推销：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="16">
                      <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange_p">
                          <a-select-option value="">请选择</a-select-option>
                          <a-select-option value="1">是</a-select-option>
                          <a-select-option value="0">否</a-select-option>
                      </a-select>
                  </a-col>
              </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="8">
                      <div class="inputName"> 注册时间：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="16">
                      <a-range-picker @change="onChange" />
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
                          <a-col class="gutter-row" :span="10">
                              <a-button type="primary" @click="add_product()">
                                  新增
                              </a-button>
                          </a-col>
                          <a-col class="gutter-row" :span="10">
                              <a-button type="primary" @click="search_product()">搜索</a-button>
                          </a-col>
                      </a-row>
                  </a-col>
              </div>
          </a-col>
      </a-row>
      <a-table :columns="columns"
               :dataSource="productListData"
               :pagination="pagination"
               :loading="loading"
               align="center"
               @change="handleTableChange">
          <span slot="action" slot-scope="text, record">
              <a @click="searchFun({customer_id:record.customer_id})">查看</a>
              <a-divider type="vertical"></a-divider>
              <a @click="editFun({customer_id:record.customer_id})">修改</a>
              <a-divider type="vertical"></a-divider>
              <a-popconfirm
                      v-if="productListData.length"
                      title="请确认删除"
                      @confirm="() => deleteProduct({customer_id:record.customer_id})">
                <a>删除</a>
              </a-popconfirm>

          </span>
        <a slot="newsletter" slot-scope="text, record" style="text-align: center">
          <a-icon type="check" style="color: green" v-if="text === '1'" @click="change_active({customer_id:record.customer_id,newsletter:'0'})"></a-icon>
          <a-icon type="close" style="color: red" v-if="text === '0'" @click="change_active({customer_id:record.customer_id,newsletter:'1'})"></a-icon>
        </a>
          <a slot="active" slot-scope="text, record" style="text-align: center">
              <a-icon type="check" style="color: green" v-if="text === '1'" @click="change_active({customer_id:record.customer_id,active:'0'})"></a-icon>
              <a-icon type="close" style="color: red" v-if="text === '0'" @click="change_active({customer_id:record.customer_id,active:'1'})"></a-icon>
          </a>
        <a slot="optin" slot-scope="text, record" style="text-align: center">
          <a-icon type="check" style="color: green" v-if="text === '1'" @click="change_active({customer_id:record.customer_id,optin:'0'})"></a-icon>
          <a-icon type="close" style="color: red" v-if="text === '0'" @click="change_active({customer_id:record.customer_id,optin:'1'})"></a-icon>
        </a>
      </a-table>
      <div class="addCustomerGender">
          <a-modal
                  title="新增客户信息"
                  v-model="visible_add"
                  :destroyOnClose="true"
                  @ok="submitAdd"
          >
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName"><span style="color:red;">*</span>称呼：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange">
                              <a-select-option  v-for="(item,index) in genderIdList" :value=item.gender_id :key="index">{{item.name}}</a-select-option>
                          </a-select>
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName"><span style="color:red;">*</span>名：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-input placeholder="请输入名" v-model="addCustomerInfo.firstname" />
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName"><span style="color:red;">*</span>姓：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-input placeholder="请输入姓" v-model="addCustomerInfo.lastname" />
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName"><span style="color:red;">*</span>邮箱：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-input placeholder="请输入邮箱地址" type="email" v-model="addCustomerInfo.email" />
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName"><span style="color:red;">*</span>密码：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-input placeholder="请输入密码" type="password" v-model="addCustomerInfo.passwd" />
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName"><span style="color:red;">*</span>生日：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-date-picker @change="onChange" />
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName"><span style="color:red;">*</span>状态：</div>
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
                          <div class="inputName"><span style="color:red;">*</span>订阅：</div>
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
                          <div class="inputName"><span style="color:red;">*</span>推销：</div>
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
                  :destroyOnClose="true"
                  @cancel="edit_cancel"
          >
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName"><span style="color:red;">*</span>称呼：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange" :value="addCustomerInfo.genderId">
                              <a-select-option  v-for="(item,index) in genderIdList" :value=item.gender_id :key="index">{{item.name}}</a-select-option>
                          </a-select>
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName"><span style="color:red;">*</span>名：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-input placeholder="请输入名" v-model="addCustomerInfo.firstname" />
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName"><span style="color:red;">*</span>姓：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-input placeholder="请输入姓" v-model="addCustomerInfo.lastname" />
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName"><span style="color:red;">*</span>邮箱：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-input placeholder="请输入邮箱地址" v-model="addCustomerInfo.email" />
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName"><span style="color:red;">*</span>密码：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-input placeholder="请输入密码" type="password" v-model="addCustomerInfo.passwd" />
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName"><span style="color:red;">*</span>生日：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-date-picker
                                  format="YYYY-MM-DD"
                                  :value="moment(addCustomerInfo.birthday)"
                                  @change="onChange">
                          </a-date-picker>
                          <!--<a-date-picker :defaultValue="moment(addCustomerInfo.birthday, dateFormat)" :format="dateFormat" />-->
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName"><span style="color:red;">*</span>状态：</div>
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
                          <div class="inputName"><span style="color:red;">*</span>订阅：</div>
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
                          <div class="inputName"><span style="color:red;">*</span>推销：</div>
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
                  @ok="submitSearch"
                  :destroyOnClose="true"
          >
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">称呼：</div>
                      </a-col>
                      <a-col class="gutter-row show_text" :span="18">
                          <!--<a-select defaultValue="请选择" style="width: 100%" disabled="disabled" @change="handleChange" :value="addCustomerInfo.genderId">-->
                              <!--<a-select-option  v-for="item in genderIdList" :value=item.gender_id>{{item.name}}</a-select-option>-->
                          <!--</a-select>-->
                          <span v-for="(item,index) in genderIdList" v-if="item.gender_id == addCustomerInfo.genderId" v-text="item.name" :key="index"></span>
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">名：</div>
                      </a-col>
                      <a-col class="gutter-row show_text" :span="18">
                          {{addCustomerInfo.firstname}}
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">姓：</div>
                      </a-col>
                      <a-col class="gutter-row show_text" :span="18">
                          {{addCustomerInfo.lastname}}
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">邮箱地址：</div>
                      </a-col>
                      <a-col class="gutter-row show_text" :span="18">
                          {{addCustomerInfo.email}}
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">生日：</div>
                      </a-col>
                      <a-col class="gutter-row show_text" :span="18">
                          {{addCustomerInfo.birthday}}
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">状态：</div>
                      </a-col>
                      <a-col class="gutter-row show_text" :span="18">
                          <span v-text="addCustomerInfo.active == 1 ? '是' : '否'"></span>
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">接受电子订阅：</div>
                      </a-col>
                      <a-col class="gutter-row show_text" :span="18">
                          <span v-text="addCustomerInfo.newsletter == 1 ? '是' : '否'"></span>
                      </a-col>
                  </div>
              </a-row>
              <a-row>
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">接受推销：</div>
                      </a-col>
                      <a-col class="gutter-row show_text" :span="18">
                          <span v-text="addCustomerInfo.optin == 1 ? '是' : '否'"></span>
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
        { title: '客户id', dataIndex: 'customer_id', key: 'customer_id'},
        { title: '称呼', dataIndex: 'name', key: 'name'},
        { title: '电子邮件', dataIndex: 'email', key: 'email'},
        { title: '是否启用', dataIndex: 'active', key: 'active', align: 'center' ,scopedSlots: { customRender: 'active' },},
        { title: '是否订阅电子简报', dataIndex: 'newsletter', key: 'newsletter', align: 'center' ,scopedSlots: { customRender: 'newsletter' },},
        { title: '是否接受推销', dataIndex: 'optin', key: 'optin', align: 'center' ,scopedSlots: { customRender: 'optin' },},
        { title: '注册时间', dataIndex: 'add_date', key: 'add_date'},
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
                    currentPage:'1',
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
                    ,customerId:''
                }
            }
        },
        methods: {
            moment,
            handleChange(value) {
                console.log(`selected ${value}`);
                this.addCustomerInfo.genderId = value
            }
            ,handleChange_s(value) {
                console.log(`selected ${value}`);
                this.addCustomerInfo.active = value
            }
            ,handleChange_e(value) {
                console.log(`selected ${value}`);
                this.addCustomerInfo.newsletter = value
            }
            ,handleChange_p(value) {
                console.log(`selected ${value}`);
                this.addCustomerInfo.optin = value
            }
            ,add_product(){
                this.visible_add = true
                this.addCustomerInfo.active = "";
                this.addCustomerInfo.birthday = "";
                this.addCustomerInfo.customerId = "";
                this.addCustomerInfo.email = "";
                this.addCustomerInfo.firstname = "";
                this.addCustomerInfo.genderId = "";
                this.addCustomerInfo.lastname = "";
                this.addCustomerInfo.newsletter = "";
                this.addCustomerInfo.optin = "";
                this.addCustomerInfo.passwd = "";
            }
            ,editFun(data) {
                this.$post('/customer/getCustomerList',data).then((reData)=>{
                    this.addCustomerInfo.genderId=reData.data[0].gender_id;
                    this.addCustomerInfo.firstname=reData.data[0].firstname;
                    this.addCustomerInfo.lastname=reData.data[0].lastname;
                    this.addCustomerInfo.email=reData.data[0].email;
                    this.addCustomerInfo.passwd='';
                    this.addCustomerInfo.birthday=Date.parse(reData.data[0].birthday);
                    this.addCustomerInfo.active=reData.data[0].active;
                    this.addCustomerInfo.newsletter=reData.data[0].newsletter;
                    this.addCustomerInfo.optin=reData.data[0].optin;
                    this.addCustomerInfo.customerId = data.customer_id;
                    console.log(this.addCustomerInfo.birthday)
                    this.visible_edit = true;
                })

            }
            ,searchFun(data){
                this.getListDetail(data);
                this.visible_search = true;
            }
            ,submitAdd() {
                console.log(this.addCustomerInfo)
                if(this.addCustomerInfo.genderId === ''){
                    this.$notification.open({
                        message: '警告',
                        description: '请填选择性别'
                    });
                    return false;
                } else if(this.addCustomerInfo.firstname === ''){
                    this.$notification.open({
                        message: '警告',
                        description: '请填写名'
                    });
                    return false;
                } else if(this.addCustomerInfo.lastname === ''){
                    this.$notification.open({
                        message: '警告',
                        description: '请填写姓'
                    });
                    return false;
                } else if(this.addCustomerInfo.email === ''){
                    this.$notification.open({
                        message: '警告',
                        description: '请填写电子邮件'
                    });
                    return false;
                } else if(this.addCustomerInfo.passwd === ''){
                    this.$notification.open({
                        message: '警告',
                        description: '请填写密码'
                    });
                    return false;
                } else if(this.addCustomerInfo.birthday === ''){
                    this.$notification.open({
                        message: '警告',
                        description: '请填写生日'
                    });
                    return false;
                } else if(this.addCustomerInfo.active === ''){
                    this.$notification.open({
                        message: '警告',
                        description: '请选择是否启用'
                    });
                    return false;
                } else if(this.addCustomerInfo.newsletter === ''){
                    this.$notification.open({
                        message: '警告',
                        description: '请选择电子订阅'
                    });
                    return false;
                } else if(this.addCustomerInfo.optin === ''){
                    this.$notification.open({
                        message: '警告',
                        description: '请选择推销'
                    });
                    return false;
                } else {
                    this.$post('/customer/addCustomerInfo',this.addCustomerInfo).then((reData)=>{
                        if(reData.code === '0'){
                            this.visible_add = false
                            this.getList({
                                lang_id:store.state.langId,
                                currentPage:this.pagination.currentPage,
                                pageSize:this.pagination.defaultPageSize
                            });
                        } else {
                            this.$message.error(reData.message);
                            this.visible_add = false
                        }
                    })
                }

            }
            ,submitEdit() {
                console.log(this.addCustomerInfo);
                this.$post('/customer/updateCustomerInfo',this.addCustomerInfo).then((reData)=>{
                    if(reData.code === '0'){
                        this.visible_edit = false
                        this.addCustomerInfo.customerId = '';
                        this.addCustomerInfo.email = '';
                        this.addCustomerInfo.genderId = '';
                        this.addCustomerInfo.active = '';
                        this.addCustomerInfo.newsletter = '';
                        this.addCustomerInfo.optin = '';
                        this.addCustomerInfo.birthday = '';
                        this.getList({
                            lang_id:store.state.langId,
                            currentPage:this.pagination.currentPage,
                            pageSize:this.pagination.defaultPageSize
                        });
                    } else {
                        this.$message.error(reData.message);
                        this.visible_add = false
                    }
                })
            }
            ,submitSearch(){
                this.visible_search = false
            }
            ,getList(data){
                this.loading = true;
                this.$post('/customer/getCustomerListPageInfo',data).then((reData)=>{
                    this.productListData=reData.data.dataList
                    this.pagination.total=reData.data.page.totalResultSize
                    this.pagination.currentPage = reData.data.page.currentPage
                    this.loading = false
                })
            }
            ,getListDetail(data){
                this.$post('/customer/getCustomerList',data).then((reData)=>{
                    this.addCustomerInfo.genderId=reData.data[0].gender_id;
                    this.addCustomerInfo.firstname=reData.data[0].firstname;
                    this.addCustomerInfo.lastname=reData.data[0].lastname;
                    this.addCustomerInfo.email=reData.data[0].email;
                    this.addCustomerInfo.passwd=reData.data[0].passwd;
                    this.addCustomerInfo.birthday=reData.data[0].birthday;
                    this.addCustomerInfo.active=reData.data[0].active;
                    this.addCustomerInfo.newsletter=reData.data[0].newsletter;
                    this.addCustomerInfo.optin=reData.data[0].optin;
                    console.log(this.addCustomerInfo.birthday)
                })
            }
            ,handleTableChange(pagination){
                console.log(pagination.defaultPageSize)
                this.getList({
                    lang_id:store.state.langId,
                    currentPage:pagination.current,
                    page_size:pagination.defaultPageSize
                })
            }
            ,edit_cancel(){
                this.addCustomerInfo.customerId = '';
                this.addCustomerInfo.email = '';
                this.addCustomerInfo.genderId = '';
                this.addCustomerInfo.active = '';
                this.addCustomerInfo.newsletter = '';
                this.addCustomerInfo.optin = '';
                this.addCustomerInfo.birthday = '';
            }
            ,search_product(){
                this.$post('/customer/getCustomerListPageInfo',{
                    lang_id:store.state.langId,
                    currentPage:this.pagination.currentPage,
                    pageSize:this.pagination.defaultPageSize,
                    gender_id:this.addCustomerInfo.genderId,
                    email:this.addCustomerInfo.email,
                    add_date:this.addCustomerInfo.birthday,
                    active:this.addCustomerInfo.active,
                    newsletter:this.addCustomerInfo.newsletter,
                    optin:this.addCustomerInfo.optin,
                    customer_id:this.addCustomerInfo.customerId,
                }).then((reData)=>{
                    this.productListData=reData.data.dataList
                    this.pagination.currentPage = reData.data.page.currentPage
                    this.pagination.total=reData.data.page.totalResultSize
                    this.loading = false
                })

            }
            ,onChange(date, dateString) {
                console.log(dateString)
                this.addCustomerInfo.birthday = dateString
            }
            ,change_active(data){
                this.$post('/customer/setCustomerStatus',data).then((reData)=>{
                    if(reData.code === '0'){
                        this.getList({
                            lang_id:store.state.langId,
                            currentPage:this.pagination.currentPage,
                            pageSize:this.pagination.defaultPageSize

                        });
                    }
                })
            }
            ,deleteProduct(data){
                this.$post('/customer/removeCustomerInfo',data).then((reData)=>{
                    if(reData.code === '0'){
                        this.getList({
                            lang_id:store.state.langId,
                            currentPage:this.pagination.currentPage,
                            pageSize:this.pagination.defaultPageSize
                        });
                        this.openNotification("success", "成功", "删除成功！");
                    }
                })
            }
            ,getGender(){
                this.$post('/gender/getGenderList',{langId:store.state.langId}).then((reData)=>{
                    this.genderIdList=reData.data.slice(0)
                });
            }
        },
        mounted() {
            var vm = this
            // store.commit('changeStore',{key:'title',val:'产品列表'});
            vm.getList({
                lang_id:store.state.langId,
                currentPage:1,
                pageSize:vm.pagination.defaultPageSize
            })
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
    .show_text{
        line-height: 32px;
    }
</style>