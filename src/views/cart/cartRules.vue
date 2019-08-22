<template>
    <div class="producetList">

        <div>
            <div style="margin-bottom: 16px">
                <a-button type="primary" @click="addCodM()">
                    新增
                </a-button>
                <span style="margin-left: 8px"></span>
            </div>
            <a-table :columns="columns"
                     :dataSource="attributeList"
                     :pagination="pagination"
                     :loading="loading"
                     align="center"
                     @change="handleTableChange"
                     :rowSelection="rowSelection" 
                     :scroll="{ x: 2500 }">
              <span slot="action" slot-scope="text, record">
                   <a @click="editCod(text.discount_id)">修改</a>
                   <a-divider type="vertical"></a-divider>
                   <a-popconfirm
                               title="请确认删除"
                               @confirm="() => deleteProduct(text.discount_id,text)">
                       <a>删除</a>
                    </a-popconfirm>
                  <!-- <a @click="deleteProduct(text.discount_id,text)">删除</a> -->
              </span>
                <!-- 状态 -->
                <a slot="active" slot-scope="text, record" style="text-align: center">
                  <a-icon type="check" style="color: green" v-if="text.active == '1'"></a-icon>
                  <a-icon type="close" style="color: red" v-if="text.active == '0'"></a-icon>
                </a>
                <!-- 是否免运费 -->
                <a slot="freight" slot-scope="text, record" style="text-align: center">
                  <a-icon type="check" style="color: green" v-if="text.free_shipping == '1'"></a-icon>
                  <a-icon type="close" style="color: red" v-if="text.free_shipping == '0'"></a-icon>
                </a>
                <!-- 金额是否包含税 -->
                <a slot="includetax" slot-scope="text, record" style="text-align: center">
                  <a-icon type="check" style="color: green" v-if="text.minimum_amount_tax == '1'"></a-icon>
                  <a-icon type="close" style="color: red" v-if="text.minimum_amount_tax == '0'"></a-icon>
                </a>
                <!-- 是否开启国家限制 -->
                <a slot="countryRes" slot-scope="text, record" style="text-align: center">
                  <a-icon type="check" style="color: green" v-if="text.country_restriction == '1'"></a-icon>
                  <a-icon type="close" style="color: red" v-if="text.country_restriction == '0'"></a-icon>
                </a>
                <!-- 是否开启产品限制 -->
                <a slot="productRes" slot-scope="text, record" style="text-align: center">
                  <a-icon type="check" style="color: green" v-if="text.product_restriction == '1'"></a-icon>
                  <a-icon type="close" style="color: red" v-if="text.product_restriction == '0'"></a-icon>
                </a>
                <!-- 优惠券是否包含税 -->
                <a slot="reductionTax" slot-scope="text, record" style="text-align: center">
                  <a-icon type="check" style="color: green" v-if="text.reduction_tax == '1'"></a-icon>
                  <a-icon type="close" style="color: red" v-if="text.reduction_tax == '0'"></a-icon>
                </a>
                <!-- 金额是否包含运费 -->
                <a slot="amount" slot-scope="text, record" style="text-align: center">
                  <a-icon type="check" style="color: green" v-if="text.minimum_amount_shipping == '1'"></a-icon>
                  <a-icon type="close" style="color: red" v-if="text.minimum_amount_shipping == '0'"></a-icon>
                </a>
            </a-table>

            <!--新增修改弹框-->
            <div class="addCurrency">
                <a-modal
                    title="购物车信息"
                    width="800px" 
                    v-model="visible_add"
                    :destroyOnClose = "true"
                    @ok="submitAdd(addCod.edit)"
                    @cancel="closeModle"
                >
                <a-tabs defaultActiveKey="1" @change="callback">
                        <a-tab-pane tab="信息" key="1">
                        <div style="width:80%;margin:0 auto">
                            <a-row>
                                <div class="inputPart">
                                    <a-col class="gutter-row" :span="8">
                                        <div class="inputName">*名称：</div>
                                    </a-col>
                                    <a-col class="gutter-row" :span="16">
                                        <a-input placeholder="" v-model="addCod.name" />
                                    </a-col>
                                </div>
                            </a-row>
                            <a-row>
                                <div class="inputPart">
                                    <a-col class="gutter-row" :span="8">
                                        <div class="inputName">详情：</div>
                                    </a-col>
                                    <a-col class="gutter-row" :span="16">
                                        <a-textarea :rows="3" v-model="addCod.description"></a-textarea>
                                    </a-col>
                                </div>
                            </a-row>
                            <a-row>
                                <div class="inputPart">
                                    <a-col class="gutter-row" :span="8">
                                        <div class="inputName">*唯一折扣卷码：</div>
                                    </a-col>
                                    <a-col class="gutter-row" :span="16">
                                        <a-input placeholder="" v-model="addCod.code" />
                                    </a-col>
                                </div>
                            </a-row>
                            <a-row>
                                <div class="inputPart">
                                    <a-col class="gutter-row" :span="8">
                                        <div class="inputName">*状态：</div>
                                    </a-col>
                                    <a-col class="gutter-row" :span="16">
                                        <a-select :defaultValue="addCod.active" style="width: 100%"  @change="getAddactive">
                                            <a-select-option value="1">是</a-select-option>
                                            <a-select-option value="0">否</a-select-option>
                                        </a-select>
                                    </a-col>
                                </div>
                            </a-row>
                            <a-row>
                            <div class="inputPart">
                                <a-col class="gutter-row" :span="8">
                                    <div class="inputName">*有效期：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="16">
                                    <div class="date-pick">
                                    <a-date-picker
                                        showTime
                                        :format="format"
                                        placeholder="Start"
                                        :defaultValue='moment(addCod.date_from,format)'
                                        @change="startDate"
                                    />
                                    <a-date-picker
                                        showTime
                                        :format="format"
                                        placeholder="End"
                                        :defaultValue='moment(addCod.date_to,format)'
                                        @change="endDate"
                                    />
                                    </div>
                                </a-col>
                            </div>
                            </a-row>
                            <a-row>
                            <div class="inputPart">
                                <a-col class="gutter-row" :span="8">
                                    <div class="inputName">*折扣卷总量：</div>
                                </a-col>
                                <a-col class="gutter-row" :span="16">
                                    <a-input placeholder="" v-model="addCod.quantity" />
                                </a-col>
                            </div>
                            </a-row>
                            <a-row>
                                <div class="inputPart">
                                    <a-col class="gutter-row" :span="8">
                                        <div class="inputName">*每个用户可用数量：</div>
                                    </a-col>
                                    <a-col class="gutter-row" :span="16">
                                        <a-input placeholder="" v-model="addCod.quantity_per_user" />
                                    </a-col>
                                </div>
                            </a-row>
                           
                        </div>
                        </a-tab-pane>
                        <a-tab-pane tab="条件" key="2" forceRender>
                            <div style="width:80%;margin:0 auto">
                                <a-row>
                                    <div class="inputPart">
                                        <a-col class="gutter-row" :span="8">
                                            <div class="inputName">单一客户的限制：</div>
                                        </a-col>
                                        <a-col class="gutter-row" :span="16">
                                            <a-input placeholder="" type="email" v-model="addCod.customer_id" />
                                        </a-col>
                                    </div>
                                </a-row>
                                <a-row>
                                    <div class="inputPart">
                                        <a-col class="gutter-row" :span="8">
                                            <div class="inputName">是否开启国家限制：</div>
                                        </a-col>
                                        <a-col class="gutter-row" :span="16">
                                            <a-select :defaultValue="addCod.country_restriction" style="width: 100%"  @change="limitCurrency">
                                                <a-select-option value="0">否</a-select-option>
                                                <a-select-option value="1">是</a-select-option>
                                            </a-select>
                                        </a-col>
                                    </div>
                                </a-row>
                                <a-row v-if="addCod.country_restriction == 1">
                                    <div class="inputPart">
                                        <a-col class="gutter-row" :span="8">
                                            <div class="inputName">限制国家选择：</div>
                                        </a-col>
                                        <a-col class="gutter-row" :span="16">
                                            <a-select 
                                            :defaultValue="addCod.countries_ids" 
                                            style="width: 100%" 
                                            mode="multiple" 
                                            @change="getAddcountry">
                                                <a-select-option v-for="item in country" :value=item.country_id>{{item.name}}{{item.country_id}}</a-select-option>
                                            </a-select>
                                        </a-col>
                                    </div>
                                </a-row>
                                <a-row>
                                    <div class="inputPart">
                                        <a-col class="gutter-row" :span="8">
                                            <div class="inputName">是否开启产品限制：</div>
                                        </a-col>
                                        <a-col class="gutter-row" :span="16">
                                            <a-select :defaultValue="addCod.product_restriction" style="width: 100%"  @change="limitProduct">
                                                <a-select-option value="0">否</a-select-option>
                                                <a-select-option value="1">是</a-select-option>
                                            </a-select>
                                        </a-col>
                                    </div>
                                </a-row>
                                <div v-if="addCod.product_restriction == 1">
                                    <a-row>
                                        <div class="inputPart" style="display: flex;justify-content: flex-end;align-items: center;">
                                            <a-col class="gutter-row" :span="16">
                                                <span>购物车必须至少包含</span>
                                                <a-input type="text" style="width:100px" v-model="limitPN"/>
                                                <span>个符合以下规则的产品</span>
                                            </a-col>
                                        </div>
                                    </a-row>
                                    <a-row>
                                        <div class="inputPart">
                                            <a-col class="gutter-row" :span="8">
                                                <div class="inputName">添加规则：</div>
                                            </a-col>
                                            <a-col class="gutter-row" :span="16">
                                                <a-select 
                                                :defaultValue="limitType" 
                                                style="width: 100%"  
                                                mode="multiple"
                                                @change="limitTypef">
                                                    <a-select-option value="0">产品</a-select-option>
                                                    <a-select-option value="1">分类</a-select-option>
                                                </a-select>
                                            </a-col>
                                        </div>
                                    </a-row>
                                    <a-row v-if="limitProductf">
                                        <div class="inputPart limitProduct">
                                            <a-col class="gutter-row" :span="8">
                                                <div class="inputName">限制产品：</div>
                                            </a-col>
                                            <a-col class="gutter-row" :span="16">
                                                <a-select 
                                                    :defaultValue="addCod.products_ids" 
                                                    mode="multiple" 
                                                    style="width: 100%"  
                                                    @change="selProducts">
                                                    <a-select-option v-for="item in products" :value=item.product_id>
                                                        {{item.name}}{{item.product_id}}
                                                    </a-select-option>
                                                </a-select>
                                            </a-col>
                                        </div>
                                    </a-row>
                                    <a-row v-if="limitProductf">
                                        <div class="inputPart">
                                            <a-col class="gutter-row" :span="8">
                                                <div class="inputName">产品限制数量：</div>
                                            </a-col>
                                            <a-col class="gutter-row" :span="16">
                                                <a-input placeholder="" readonly v-model="addCod.products_quantity" style="cursor: not-allowed;"/>
                                            </a-col>
                                        </div>
                                    </a-row>
                                    <!-- 分类 -->
                                    <a-row v-if="limitPtype">
                                        <div class="inputPart limitProduct">
                                            <a-col class="gutter-row" :span="8">
                                                <div class="inputName">限制产品分类：</div>
                                            </a-col>
                                            <a-col class="gutter-row" :span="16">
                                                <a-select 
                                                :defaultValue="addCod.categories_ids" 
                                                style="width: 100%"  
                                                mode="multiple" 
                                                @change="selCategories">
                                                    <a-select-option v-for="item in categories" :value=item.category_id>
                                                        {{item.name}}{{item.category_id}}
                                                    </a-select-option>
                                                </a-select>
                                            </a-col>
                                        </div>
                                    </a-row>

                                    <a-row v-if="limitPtype">
                                        <div class="inputPart">
                                            <a-col class="gutter-row" :span="8">
                                                <div class="inputName">限制产品分类数量：</div>
                                            </a-col>
                                            <a-col class="gutter-row" :span="16">
                                                <a-input placeholder="" readonly v-model="addCod.categories_quantity" style="cursor: not-allowed;"/>
                                            </a-col>
                                        </div>
                                    </a-row>
                                </div>
                                <a-row>
                                    <div class="inputPart">
                                        <a-col class="gutter-row" :span="8">
                                            <div class="inputName">*满足金额使用：</div>
                                        </a-col>
                                        <a-col class="gutter-row" :span="16">
                                            <a-input placeholder="" v-model="addCod.minimum_amount" />
                                        </a-col>
                                    </div>
                                </a-row>
                                <a-row>
                                    <div class="inputPart">
                                        <a-col class="gutter-row" :span="8">
                                            <div class="inputName">*金额是否包含税：</div>
                                        </a-col>
                                        <a-col class="gutter-row" :span="16">
                                            <a-select :defaultValue="addCod.minimum_amount_tax" style="width: 100%"  @change="amountTax">
                                                <a-select-option value="0">否</a-select-option>
                                                <a-select-option value="1">是</a-select-option>
                                            </a-select>
                                        </a-col>
                                    </div>
                                </a-row>
                                <a-row>
                                    <div class="inputPart">
                                        <a-col class="gutter-row" :span="8">
                                            <div class="inputName">*币种：</div>
                                        </a-col>
                                        <a-col class="gutter-row" :span="16">
                                            <a-select :defaultValue="addCod.minimum_amount_currency" style="width: 100%"  @change="selCurrency">
                                            <a-select-option v-for="item in currency" :value=item.currency_id>
                                                {{item.name}}{{item.currency_id}}
                                            </a-select-option>
                                            </a-select>
                                        </a-col>
                                    </div>
                                </a-row>
                                <a-row>
                                    <div class="inputPart">
                                        <a-col class="gutter-row" :span="8">
                                        <div class="inputName">*金额是否包运费：</div>
                                        </a-col>
                                        <a-col class="gutter-row" :span="16">
                                            <a-select :defaultValue="addCod.minimum_amount_shipping" style="width: 100%"  @change="amountShipp">
                                                <a-select-option value="0">否</a-select-option>
                                                <a-select-option value="1">是</a-select-option>
                                            </a-select>
                                        </a-col>
                                    </div>
                                </a-row>
                            </div>
                        </a-tab-pane>
                        <a-tab-pane tab="操作" key="3">
                        <div style="width:80%;margin:0 auto">
                            <a-row>
                                <div class="inputPart">
                                    <a-col class="gutter-row" :span="8">
                                    <div class="inputName">是否免运费：</div>
                                    </a-col>
                                    <a-col class="gutter-row" :span="16">
                                        <a-select :defaultValue="addCod.free_shipping" style="width: 100%"  @change="freeShipp">
                                            <a-select-option value="0">否</a-select-option>
                                            <a-select-option value="1">是</a-select-option>
                                        </a-select>
                                    </a-col>
                                </div>
                            </a-row>
                            <a-row style="display:flex">
                                <div class="inputPart" style="width: 100%;display: flex;align-items: center;">
                                    <a-col class="gutter-row" :span="8">
                                        <div class="inputName">优惠类型：</div>
                                    </a-col>
                                    <a-col class="gutter-row" :span="16">
                                        <div>
                                            <a-radio-group @change="reductChange" v-model="reductType">
                                                <a-radio :value="1">百分比</a-radio>
                                                <a-radio :value="2">金额</a-radio>
                                            </a-radio-group>
                                        </div>
                                    </a-col>
                                </div>
                            </a-row>
                           
                            <a-row v-if="reductType == 1">
                                <div class="inputPart">
                                    <a-col class="gutter-row" :span="8">
                                        <div class="inputName">百分比优惠值：</div>
                                    </a-col>
                                    <a-col class="gutter-row" :span="16">
                                        <a-input placeholder="" v-model="addCod.reduction_percent" />
                                    </a-col>
                                </div>
                            </a-row>
                            <a-row v-if="reductType == 2">
                                <div class="inputPart">
                                    <a-col class="gutter-row" :span="8">
                                        <div class="inputName">金额优惠值：</div>
                                    </a-col>
                                    <a-col class="gutter-row" :span="16">
                                        <a-input placeholder="" v-model="addCod.reduction_amount" />
                                    </a-col>
                                </div>
                            </a-row>
                            <a-row v-if="reductType == 2">
                                <div class="inputPart">
                                    <a-col class="gutter-row" :span="8">
                                    <div class="inputName">优惠券是否包含税：</div>
                                    </a-col>
                                    <a-col class="gutter-row" :span="16">
                                        <a-select :defaultValue="addCod.reduction_tax" style="width: 100%"  @change="reductTax">
                                            <a-select-option value="0">否</a-select-option>
                                            <a-select-option value="1">是</a-select-option>
                                        </a-select>
                                    </a-col>
                                </div>
                            </a-row>
                            <a-row v-if="reductType == 2">
                                <div class="inputPart">
                                    <a-col class="gutter-row" :span="8">
                                        <div class="inputName">优惠券币种：</div>
                                    </a-col>
                                    <a-col class="gutter-row" :span="16">
                                        <a-select :defaultValue="addCod.reduction_currency" style="width: 100%"  @change="reductCurrency">
                                        <a-select-option v-for="item in currency" :value=item.currency_id>
                                            {{item.name}}{{item.currency_id}}
                                        </a-select-option>
                                        </a-select>
                                    </a-col>
                                </div>
                            </a-row>
                        </div>
                        </a-tab-pane>
                    </a-tabs>
                </a-modal>
            </div>
        </div>
    </div>
</template>
<script>
    import moment from 'moment';
    import router from '../../router';
    import store from '../../store'
    const columns = [
        { title: '编号', key: 'discount_id', dataIndex: 'discount_id', fixed: 'left'},
        { title: '操作', key: 'action',scopedSlots: { customRender: 'action' },},
        { title: '名称', dataIndex: 'name', key: 'name'},
        { title: '用户可用数量', dataIndex: 'quantity_per_user', key: 'quantity_per_user'},
        { title: '折扣劵总量', dataIndex: 'quantity', key: 'quantity'},
        { title: '唯一折扣券码', dataIndex: 'code', key: 'code'},
        { title: '添加时间', dataIndex: 'add_date', key: 'add_date'},
        { title: '是否免运费', scopedSlots: { customRender: 'freight' }, key: 'free_shipping'},
        { title: '详情', dataIndex: 'description', key: 'description'},
        { title: '币种', dataIndex: 'minimum_amount_currency', key: 'minimum_amount_currency'},
        { title: '金额是否包含税',scopedSlots: { customRender: 'includetax' }, key: 'minimum_amount_tax'},
        { title: '百分比优惠值', dataIndex: 'reduction_percent', key: 'reduction_percent'},
        { title: '有效期起始', dataIndex: 'date_from', key: 'date_from'},
        { title: '有效期截止', dataIndex: 'date_to', key: 'date_to'},
        { title: '满足金额使用', dataIndex: 'minimum_amount', key: 'minimum_amount'},
        { title: '是否开启国家限制', scopedSlots: { customRender: 'countryRes' }, key: 'country_restriction'},
        { title: '金额优惠值', dataIndex: 'reduction_amount', key: 'reduction_amount'},
        { title: '是否开启产品限制', scopedSlots: { customRender: 'productRes' }, key: 'product_restriction'},
        { title: '优惠券是否包含税', scopedSlots: { customRender: 'reductionTax' }, key: 'reduction_tax'},
        { title: '金额是否包含运费', scopedSlots: { customRender: 'amount' }, key: 'minimum_amount_shipping'},
        { title: '状态', key: 'active',scopedSlots: { customRender: 'active' },},
       
    ];
    const attributeList = [];
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
                format:'YYYY-MM-DD HH:mm:ss',
                endOpen: false,
                edit:false,
                country:[],
                currency:[],
                reductType:'',
                limitType:[],
                limitPN:'0',
                limitPtype:false,
                limitProductf:false,
                products:[], //产品
                categories:[], //分类
                addCod:{
                  name:'',
                  description:'',
                  code:'',
                  active:'1',
                  customer_id:'',
                  date_from:'2019-08-08 17:00:09',
                  date_to:'2019-08-09 17:00:09',
                  minimum_amount:'',
                  minimum_amount_tax:'',
                  minimum_amount_currency:'',
                  minimum_amount_shipping:'',
                  quantity:'',
                  quantity_per_user:'',
                  country_restriction:'0',
                  countries_ids:[],
                  product_restriction:'0',
                  products_ids:[],
                  categories_ids:[],
                  products_quantity:'',
                  categories_quantity:'',
                  free_shipping:'0',
                  reduction_percent:'',
                  reduction_amount:'',
                  reduction_tax:'',
                  reduction_currency:'',
                  edit:false
                },
                visible_add:false,
                visible_edit:false,
                rowSelection,
                attributeList,
                store,
                columns,
                loading: false,
                pagination:{
                    currentPage:1,
                    defaultPageSize:10,
                    total:1,
                }, 
                deleteAllData:'',
            }
        },
        methods: {
            moment,
            // 添加Cod
            addCodM(mm){
              this.visible_add = true;
               if(mm){

                }else{
                    this. limitType = []
                    this.limitPtype = false;
                    this.limitProductf = false;
                    this.reductType = '';
                    this.addCod = {
                        name:'',
                        description:'',
                        code:'',
                        active:'1',
                        customer_id:'',
                        date_from:'2019-08-08 17:00:09',
                        date_to:'2019-08-09 17:00:09',
                        minimum_amount:'',
                        minimum_amount_tax:'0',
                        minimum_amount_currency:'',
                        minimum_amount_shipping:'0',
                        quantity:'',
                        quantity_per_user:'',
                        country_restriction:'0',
                        countries_ids:[],
                        product_restriction:'0',
                        products_ids:[],
                        categories_ids:[],
                        products_quantity:'',
                        categories_quantity:'',
                        free_shipping:'0',
                        reduction_percent:'',
                        reduction_amount:'',
                        reduction_tax:'0',
                        reduction_currency:'',
                    }
                }
              this.get_counrtys()
              this.get_currency()
              this.getProducts()
              this.getCategories()
            },
            callback (key) {
                console.log(key)
            },
            // 优惠类型
            reductChange(e){
                this.reductType = e.target.value;
            },
            // 关闭弹框
            closeModle(){
                this.limitType = []
                this.limitPtype = false;
                this.limitProductf = false;
                this.reductType = '';
            },
            // 获取国家信息
            get_counrtys(){
                let vm = this;
                this.$post('/country/getCountryListPage',{lang_id:store.state.langId,pageSize:'10000'}).then((reData)=>{
                    vm.country = reData.data.dataList.slice(0)
                });
            },
            // 获取币种信息
            get_currency(){
                let vm = this;
                this.$post('/currency/getCurrencyListPage',{pageSize:'10000'}).then((reData)=>{
                    vm.currency = reData.data.dataList.slice(0)
                });
            },
            // 获得产品信息
            getProducts(){
               let vm = this;
                this.$post('/product/getProductListPage',{pageSize:'10000'}).then((reData)=>{
                    vm.products = reData.data.dataList;
                });
            },
            // 获得分类产品信息
            getCategories(){
              let vm = this;
              this.$post('/category/getCategoryAllList',{lang_id:store.state.langId,is_banner:'0'}).then((reData)=>{
                 console.log(reData)
                  vm.categories = reData.data;
              });
            },
            // 获得币种
            getAddcurrency(value){
                this.addCod.currency_id = value
            },
            // 条件-币种选择
            selCurrency(value){
              this.addCod.minimum_amount_currency = value
            },
            // 选择状态
            getAddactive(value){
                this.addCod.active = value;
            },
            //国家选择
            getAddcountry(value) {
                value=value.join(',');
                value.toString();
                this.addCod.countries_ids = value;
                console.log(this.addCod.countries_ids)
            },
            // 是否限制国家选择
            limitCurrency(value){
               this.addCod.country_restriction = value;
            },
            // 是否限制产品
            limitProduct(value){
                this.addCod.product_restriction = value;
            },
            // 选择产品
            selProducts(value){
                value=value.join(',');
                value.toString();
                this.addCod.products_ids = value;
            },
            // 选择限制产品类型
            limitTypef(value){
                let vm = this;
                console.log(value);
                this.checKLimitPtyoe(value);
                vm.limitType = value;
            },
            // 限制产品校验
            checKLimitPtyoe(value){
                var vm = this;
                if (value.length == 1) {
                    if(value[0] === '0'){
                        vm.limitProductf = true;
                        vm.limitPtype = false;
                        vm.addCod.products_quantity = vm.limitPN;
                    }else if(value[0] === '1'){
                        vm.limitPtype = true;
                        vm.limitProductf = false;
                        vm.addCod.categories_quantity = vm.limitPN;
                    }
                }else if(value.length == 2){
                    vm.limitPtype = true;
                    vm.limitProductf = true;
                    vm.addCod.products_quantity = vm.limitPN;
                    vm.addCod.categories_quantity = vm.limitPN;
                }else{
                    vm.limitPtype = false;
                    vm.limitProductf = false;
                    vm.addCod.categories_quantity = '';
                    vm.addCod.categories_quantity = '';
                }
            },
            // 选择分类产品
            selCategories(value){
                value=value.join(',');
                value.toString();
                this.addCod.categories_ids = value;
            },
            // 金额是否含税
            amountTax(value){
                this.addCod.minimum_amount_tax = value;
            },
            // 金额是否包含运费
            amountShipp(value){
                this.addCod.minimum_amount_shipping = value;
            },
            // 是否免运费
            freeShipp(value){
               this.addCod.free_shipping = value;
            },
            // 优惠券是否包含税
            reductTax(value){
                this.addCod.reduction_tax = value
            },
            // 优惠币种
            reductCurrency(value){
               this.addCod.reduction_currency = value;
            },
            // 日期选择器
            startDate(date,dateString){
               console.log(dateString)
               this.addCod.date_from = dateString;
            },
            // 日期结束选项
            endDate(date,dateString){
                this.addCod.date_to = dateString;
            },

            // 修改cod内容
            editCod(id){
                var that = this;
                this.$post('/discount/getDiscountList',{discount_id:id}).then((reData)=>{
                   console.log(reData)
                   this.addCod = reData.data[0];
                   this.addCod.edit = true;
                   if(this.addCod.customer_id == 0){
                        this.addCod.customer_id = "";
                   }
                   this.addCod.active= reData.data[0].active.toString()
                   this.addCod.minimum_amount_tax= reData.data[0].minimum_amount_tax.toString()
                   this.addCod.minimum_amount_shipping= reData.data[0].minimum_amount_shipping.toString()
                   this.addCod.product_restriction= reData.data[0].product_restriction.toString()
                   this.addCod.reduction_tax= reData.data[0].reduction_tax.toString()
                   this.addCod.free_shipping= reData.data[0].free_shipping.toString()
                   this.addCod.country_restriction= reData.data[0].country_restriction.toString()
                   this.addCodM(this.addCod.edit)
                })
            },

            //添加提交
            submitAdd(edit) {
                var vm = this;
                var flag = this.checkRes(this.addCod)
                if(flag == false){
                    return
                }
                if (edit) {
                    this.submitEdit()
                } else {
                    if(this.reductType === '' || this.reductType == 1){
                        delete this.addCod.reduction_amount;
                        delete this.addCod.reduction_currency;
                    }else{
                        delete this.addCod.reduction_percent;
                    }
                    if(this.addCod.customer_id == ''){
                        this.addCod.customer_id = 0;
                    }
                    this.$post('/discount/addDiscountInfo',this.addCod).then((reData)=>{
                        console.log("返回结果",reData)
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
                            this.addCod={
                                name:'',
                                description:'',
                                code:'',
                                active:'1',
                                customer_id:'',
                                date_from:'2019-08-08 17:00:09',
                                date_to:'2019-08-09 17:00:09',
                                minimum_amount:'',
                                minimum_amount_tax:'0',
                                minimum_amount_currency:'',
                                minimum_amount_shipping:'0',
                                quantity:'',
                                quantity_per_user:'',
                                country_restriction:'0',
                                countries_ids:'',
                                product_restriction:'0',
                                products_ids:'',
                                categories_ids:[],
                                products_quantity:'',
                                categories_quantity:'',
                                free_shipping:'0',
                                reduction_percent:'',
                                reduction_amount:'',
                                reduction_tax:'0',
                                reduction_currency:'',
                            }
                            this.getList({currentPage:vm.pagination.current,pageSize:vm.pagination.defaultPageSize});
    
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
                            this.visible_add = true
                        }
                    })
                }
            }
            //修改提交
            ,submitEdit() {
                var vm = this;
                if(this.reductType === '' || this.reductType == 1){
                    delete this.addCod.reduction_amount;
                    delete this.addCod.reduction_currency;
                }else{
                    delete this.addCod.reduction_percent;
                }
                if(this.addCod.customer_id == ''){
                    this.addCod.customer_id = 0;
                }
                this.$post('/discount/updateDiscountInfo',this.addCod).then((reData)=>{
                    console.log(reData)
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
                        this.addCod={
                            name:'',
                            description:'',
                            code:'',
                            active:'1',
                            customer_id:'',
                            date_from:'2019-08-08 17:00:09',
                            date_to:'2019-08-09 17:00:09',
                            minimum_amount:'',
                            minimum_amount_tax:'0',
                            minimum_amount_currency:'',
                            minimum_amount_shipping:'0',
                            quantity:'',
                            quantity_per_user:'',
                            country_restriction:'0',
                            countries_ids:'',
                            product_restriction:'0',
                            products_ids:'',
                            categories_ids:[],
                            products_quantity:'',
                            categories_quantity:'',
                            free_shipping:'0',
                            reduction_percent:'',
                            reduction_amount:'',
                            reduction_tax:'0',
                            reduction_currency:'',
                        }
                        this.getList({currentPage:vm.pagination.current,pageSize:vm.pagination.defaultPageSize});
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
            // 获取商品列表
            getList(data){
                this.loading = true;
                this.$post('/discount/getDiscountPage',data).then((reData)=>{
                    console.log(reData)
                    this.attributeList=reData.data.dataList
                    this.pagination.total=reData.data.page.totalResultSize
                    this.loading = false
                })
            }
            //表格分页
            ,handleTableChange(pagination){
                this.pagination.currentPage = pagination.current
                this.getList({currentPage:pagination.current,pageSize:pagination.defaultPageSize})
            }

            //删除商品
            ,deleteProduct(data,r){
                 var vm = this;
                console.log(data,r)
                // return
                this.$post('/discount/deleteDiscountInfo',{discount_id:data}).then((reData)=>{
                    console.log(reData)
                    if(reData.code === '0'){
                        this.getList({currentPage:vm.pagination.current,pageSize:vm.pagination.defaultPageSize});
                    } else {
                        this.$notification.open({
                            message: '删 除',
                            duration: 3,
                            description: reData.message,
                            onClick: () => {
                                console.log('ok');
                            },
                        })
                        // this.$message.error(reData.message);
                    }
                })
            },
            // 添加时的校验数据
            checkRes(data){
                if(data.name === '' || data.name === null){
                    this.$message.error("请填写名称");
                    return false
                }
                if(data.code === '' || data.code === null){  
                    this.$message.error("请填写唯一折扣码");
                    return false
                }
                if(data.minimum_amount === '' || data.minimum_amount === null){
                    console.log(data,data.minimum_amount)
                    this.$message.error("请填写满足金额使用数据");
                    return false
                }
                if(data.minimum_amount_currency === '' || data.minimum_amount_currency === null){
                    this.$message.error("请填写币种");
                    return false
                }
                if(data.quantity === '' || data.quantity === null){
                    this.$message.error("请填写折扣劵总量");
                    return false
                }
                if(data.quantity_per_user === '' || data.quantity_per_user === null){
                    this.$message.error("请填写每个用户可用数量");
                    return false
                }
            }

        },
        mounted() {
            var vm = this;
            // store.commit('changeStore',{key:'title',val:'购物车'});
            vm.getList({currentPage:vm.pagination.current,pageSize:vm.pagination.defaultPageSize})
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
    .date-pick{
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
    .btnGroup{
      text-align: center;
    }
    .btnGroup button{
      margin: 10px
    }
    /* .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td{
        text-align:center;
    } */
    .limitProduct .ant-select-selection__rendered ul li .ant-select-selection__choice__content {
        display: none;
        max-width:20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>