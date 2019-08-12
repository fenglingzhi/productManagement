<template>
    <div class="producetAdd">
            <div class="secondTitle">
                <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                    区域 ：
                </a-col>
                <a-col class="gutter-row" :span="3">
                    <a-row>
                        <a-col class="gutter-row" :offset="12" :span="12">
                            <!--<a-button type="primary"  @click="see()">查看</a-button>-->
                        </a-col>
                    </a-row>
                </a-col>
            </div>


        <a-table :columns="columns1"
                 :dataSource="listData1"
                 :pagination="false"
                 align="center"
                 @change="handleTableChange"
                 >
          <span slot="action" slot-scope="text, record">
              <a @click="getHasSetCountryList(record.zone_id)">查看</a>
          </span>
        </a-table>
        <div class="hrLine"></div>
        <div class="secondTitle">
            <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                已设置区域 ：
            </a-col>
            <a-col class="gutter-row" :span="3">
                <a-row>
                    <a-col class="gutter-row" :offset="12" :span="12">
                        <a-button type="primary"  @click="add4()" >新增</a-button>
                    </a-col>
                </a-row>
            </a-col>
        </div>
        <a-table :columns="columns3"
                 :dataSource="listData3"
                 :pagination="false"
                 align="center"
                 @change="handleTableChange"
        >
          <span slot="action" slot-scope="text, record">
              <a @click="edit(record.carrier_id)">编辑</a>
                 <a-divider type="vertical"></a-divider>
              <a @click="edit(record.carrier_id)">删除</a>
          </span>
        </a-table>
        <div class="hrLine"></div>
        <div class="secondTitle">
            <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                其他国家设置 ：
            </a-col>
            <a-col class="gutter-row" :span="3">
                <a-row>
                    <a-col class="gutter-row" :offset="12" :span="12">
                        <a-button type="primary"  @click="add5()">新增</a-button>
                    </a-col>
                </a-row>
            </a-col>
        </div>
        <a-table :columns="columns3"
                 :dataSource="listData3"
                 :pagination="false"
                 align="center"
                 @change="handleTableChange"
        >
          <span slot="action" slot-scope="text, record">
              <a @click="edit(record.carrier_id)">编辑</a>
                 <a-divider type="vertical"></a-divider>
              <a @click="edit(record.carrier_id)">删除</a>
          </span>
        </a-table>




        <!--区域查看弹框-->
        <a-modal
                title="物流设置"
                width="1200px"
                :visible="visible"
                footer=""
                @ok="handleOk"
                @cancel="handleCancel"
        >
            <div class="secondTitle">
                <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                    已设置国家 ：
                </a-col>
                <a-col class="gutter-row" :span="3">
                    <a-row>
                        <a-col class="gutter-row" :offset="12" :span="12">
                            <a-button type="primary"  @click="add2()">新增</a-button>
                        </a-col>
                    </a-row>
                </a-col>
            </div>
            <a-table :columns="columns2"
                     :dataSource="listData4"
                     :pagination="pagination1"
                     align="center"
                     @change="handleTableChange"
            >
          <span slot="action" slot-scope="text, record">
              <a @click="edit(record.carrier_id)">修改</a>
              <a-divider type="vertical"></a-divider>
              <a @click="edit(record.carrier_id)">删除</a>
          </span>

          <!--<span slot="c_min" slot-scope="text, record">-->
                <!--<span v-if="text.c_type">{{text.c_min}}kg</span>-->
          <!--</span>-->
          <!--<span slot="c_max" slot-scope="text, record">-->

          <!--</span>-->
          <!--<span slot="shipping_price" slot-scope="text, record">-->

          <!--</span>-->
            </a-table>


            <div class="secondTitle">
                <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                    已设置省/州 ：
                </a-col>
                <a-col class="gutter-row" :span="3">
                    <a-row>
                        <a-col class="gutter-row" :offset="12" :span="12">
                            <a-button type="primary"  @click="add3()">新增</a-button>
                        </a-col>
                    </a-row>
                </a-col>
            </div>
            <a-table :columns="columns4"
                     :dataSource="listData5"
                     :pagination="pagination2"
                     align="center"
                     @change="handleTableChange"
            >
          <span slot="action" slot-scope="text, record">
              <a @click="edit(record.carrier_id)">修改</a>
              <a-divider type="vertical"></a-divider>
              <a @click="edit(record.carrier_id)">删除</a>
          </span>

                <!--<span slot="c_min" slot-scope="text, record">-->
                <!--<span v-if="text.c_type">{{text.c_min}}kg</span>-->
                <!--</span>-->
                <!--<span slot="c_max" slot-scope="text, record">-->

                <!--</span>-->
                <!--<span slot="shipping_price" slot-scope="text, record">-->

                <!--</span>-->
            </a-table>

        </a-modal>
        <!--设置区域物流费用弹框-->
        <a-modal
                title="设置区域物流费用"
                width="900px"
                :visible="visible4"
                @ok="handleOk"
                @cancel="handleCancel3"
        >
            <a-row>
                <a-col class="gutter-row" :span="24">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">前台显示内容 ：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="" />
                        </a-col>
                    </div>
                </a-col>
            </a-row>
            <a-row>
                <a-col class="gutter-row" :span="24">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">类型：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange">
                                <a-select-option value="">请选择</a-select-option>
                                <a-select-option value="1">重量（kg）</a-select-option>
                                <a-select-option value="0">金额（$）</a-select-option>
                            </a-select>
                        </a-col>
                    </div>
                </a-col>
            </a-row>
            <a-row>
                <a-col class="gutter-row" :span="24">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">最大值 ：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="" />
                        </a-col>
                    </div>
                </a-col>
            </a-row>
            <a-row>
                <a-col class="gutter-row" :span="24">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">最小值 ：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="" />
                        </a-col>
                    </div>
                </a-col>
            </a-row>
            <a-row>
                <a-col class="gutter-row" :span="24">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">运费 ：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="" />
                        </a-col>
                    </div>
                </a-col>
            </a-row>
            <a-row>
                <a-col class="gutter-row" :span="24">
                    <div class="inputPart" style="padding: 0px 8px 6px 22px">
                        <a-col class="gutter-row" :span=3>
                            <div class="inputName">选择区域 ：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">

                            <a-row>
                                <a-checkbox
                                        :indeterminate="indeterminate"
                                        @change="onCheckAllChange3"
                                        :checked="checkAll"
                                >
                                    Check all
                                </a-checkbox>
                            </a-row>
                            <div class="choseCountrys" style="height: 300px;overflow: auto">
                                <a-row>
                                    <a-checkbox-group :options="zoneList"    v-model="checkedList" @change="onChange" />
                                </a-row>

                            </div>

                        </a-col>
                    </div>
                </a-col>
            </a-row>



        </a-modal>

        <!--设置其他国家物流费用弹框-->
        <a-modal
                title="设置其他国家物流费用"
                width="900px"
                :visible="visible5"
                @ok="handleOk"
                @cancel="handleCancel5"
        >
            <a-row>
                <a-col class="gutter-row" :span="24">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">前台显示内容 ：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="" />
                        </a-col>
                    </div>
                </a-col>
            </a-row>
            <a-row>
                <a-col class="gutter-row" :span="24">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">类型：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange">
                                <a-select-option value="">请选择</a-select-option>
                                <a-select-option value="1">重量（kg）</a-select-option>
                                <a-select-option value="0">金额（$）</a-select-option>
                            </a-select>
                        </a-col>
                    </div>
                </a-col>
            </a-row>
            <a-row>
                <a-col class="gutter-row" :span="24">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">最大值 ：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="" />
                        </a-col>
                    </div>
                </a-col>
            </a-row>
            <a-row>
                <a-col class="gutter-row" :span="24">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">最小值 ：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="" />
                        </a-col>
                    </div>
                </a-col>
            </a-row>
            <a-row>
                <a-col class="gutter-row" :span="24">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">运费 ：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="" />
                        </a-col>
                    </div>
                </a-col>
            </a-row>
        </a-modal>
        <!--设置国家物流费用弹框-->
        <a-modal
                title="设置国家物流费用"
                width="900px"
                :visible="visible2"
                @ok="handleOk"
                @cancel="handleCancel2"
        >
            <a-row>
                <a-col class="gutter-row" :span="24">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">前台显示内容 ：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="" />
                        </a-col>
                    </div>
                </a-col>
            </a-row>
            <a-row>
                <a-col class="gutter-row" :span="24">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">类型：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange">
                                <a-select-option value="">请选择</a-select-option>
                                <a-select-option value="1">重量（kg）</a-select-option>
                                <a-select-option value="0">金额（$）</a-select-option>
                            </a-select>
                        </a-col>
                    </div>
                </a-col>
            </a-row>
            <a-row>
                <a-col class="gutter-row" :span="24">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">最大值 ：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="" />
                        </a-col>
                    </div>
                </a-col>
            </a-row>
            <a-row>
                <a-col class="gutter-row" :span="24">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">最小值 ：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="" />
                        </a-col>
                    </div>
                </a-col>
            </a-row>
            <a-row>
                <a-col class="gutter-row" :span="24">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">运费 ：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="" />
                        </a-col>
                    </div>
                </a-col>
            </a-row>
            <a-row>
                <a-col class="gutter-row" :span="24">
                    <div class="inputPart" style="padding: 0px 8px 6px 22px">
                        <a-col class="gutter-row" :span=3>
                            <div class="inputName">选择国家 ：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">

                            <a-row>
                                <a-checkbox
                                        :indeterminate="indeterminate"
                                        @change="onCheckAllChange"
                                        :checked="checkAll"
                                >
                                    Check all
                                </a-checkbox>
                            </a-row>
                            <div class="choseCountrys" style="height: 300px;overflow: auto">
                                <a-row>
                                    <a-checkbox-group :options="plainOptions"    v-model="checkedList" @change="onChange" />
                                </a-row>

                            </div>

                        </a-col>
                    </div>
                </a-col>
            </a-row>



        </a-modal>
        <!--设置省，州物流费用弹框-->
        <a-modal
                title="设置省/州物流费用"
                width="900px"
                :visible="visible3"
                @ok="handleOk"
                @cancel="handleCancel2"
        >
            <a-row>
                <a-col class="gutter-row" :span="24">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">前台显示内容 ：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="" />
                        </a-col>
                    </div>
                </a-col>
            </a-row>
            <a-row>
                <a-col class="gutter-row" :span="24">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">国家：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange">
                                <a-select-option v-for="item in countryList" :value="item.country_id">{{item.name}}</a-select-option>
                            </a-select>
                        </a-col>
                    </div>
                </a-col>
            </a-row>
            <a-row>
                <a-col class="gutter-row" :span="24">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">类型：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange">
                                <a-select-option value="">请选择</a-select-option>
                                <a-select-option value="1">重量（kg）</a-select-option>
                                <a-select-option value="0">金额（$）</a-select-option>
                            </a-select>
                        </a-col>
                    </div>
                </a-col>
            </a-row>
            <a-row>
                <a-col class="gutter-row" :span="24">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">最大值 ：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="" />
                        </a-col>
                    </div>
                </a-col>
            </a-row>
            <a-row>
                <a-col class="gutter-row" :span="24">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">最小值 ：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="" />
                        </a-col>
                    </div>
                </a-col>
            </a-row>
            <a-row>
                <a-col class="gutter-row" :span="24">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">运费 ：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-input placeholder="" />
                        </a-col>
                    </div>
                </a-col>
            </a-row>
            <a-row>
                <a-col class="gutter-row" :span="24">
                    <div class="inputPart" style="padding: 0px 8px 6px 22px">
                        <a-col class="gutter-row" :span=3>
                            <div class="inputName">选择国家 ：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">

                            <a-row>
                                <a-checkbox
                                        :indeterminate="indeterminate"
                                        @change="onCheckAllChange2"
                                        :checked="checkAll"
                                >
                                    Check all
                                </a-checkbox>
                            </a-row>
                            <div class="choseCountrys" style="height: 300px;overflow: auto">
                                <a-row>
                                    <a-checkbox-group :options="stateList"    v-model="checkedList" @change="onChange" />
                                </a-row>

                            </div>

                        </a-col>
                    </div>
                </a-col>
            </a-row>



        </a-modal>

    </div>
</template>
<script>

    var vm =this
    import router from '../../router'
    import store from '../../store'
    import $ from 'jquery'
    import  'jquery-form'
    const plainOptions = [
        {
        'label': '组一1',
        'value': 11
    }, {
        'label': '组一2',
        'value': 12
    }, {
        'label': '组一2',
        'value': 12
    }, {
        'label': '组一2',
        'value': 12
    }, {
        'label': '组一2',
        'value': 12
    }, {
        'label': '组一2',
        'value': 12
    }, {
        'label': '组一2',
        'value': 12
    }, {
        'label': '组一2',
        'value': 12
    }, {
        'label': '组一2',
        'value': 12
    }, {
        'label': '组一2',
        'value': 12
    }, {
        'label': '组一2',
        'value': 12
    }, {
        'label': '组一2',
        'value': 12
    }, {
        'label': '组一2',
        'value': 12
    }, {
        'label': '组一2',
        'value': 12
    }, {
        'label': '组一2',
        'value': 12
    }, {
        'label': '组一2',
        'value': 12
    }, {
        'label': '组一2',
        'value': 12
    }, {
        'label': '组一2',
        'value': 12
    }, {
        'label': '组一2',
        'value': 12
    }, {
        'label': '组一2',
        'value': 12
    }, {
        'label': '组一2',
        'value': 12
    }, {
        'label': '组一2',
        'value': 12
    }, {
        'label': '组一2',
        'value': 12
    }, {
        'label': '组一2',
        'value': 12
    }, {
        'label': '组qaswd asw adw一2',
        'value': 13
    }, {
        'label': '组一adsw adsw aaaaaaaaa2',
        'value': 14
    }, {
        'label': 'aadads 组一2',
        'value': 15
    }, {
        'label': '组ad 一2',
        'value': 16
    }]
    const defaultCheckedList = [16, 15]
    const columns1 = [
        {title: '操作', key: 'action',width:80, scopedSlots: { customRender: 'action' },},
        { title: '编号', align:'center', dataIndex: 'zone_id',width:120, key: 'zone_id'},
        { title: '区域名称', align:'center',dataIndex: 'name', key: 'name'},
    ];
    const columns2 = [
        {title: '操作', key: 'action',width:160, scopedSlots: { customRender: 'action' },},
        { title: '编号', align:'center', dataIndex: 'carrier_id',width:120, key: 'carrier_id'},
        { title: '国家', align:'center',dataIndex: 'country_name', key: 'country_name'},
        { title: '前台显示', align:'center',dataIndex: 'name', key: 'name'},
        { title: '最小值', align:'center',dataIndex: 'c_min', key: 'c_min'},
        { title: '最大值', align:'center',dataIndex: 'c_max', key: 'c_max'},
        { title: '运费', align:'center',dataIndex: 'shipping_price', key: 'shipping_price'},
        { title: '是否是其他', align:'center',dataIndex: 'c_other', key: 'c_other'},

    ];
    const columns4 = [
        {title: '操作', key: 'action',width:160, scopedSlots: { customRender: 'action' },},
        { title: '编号', align:'center', dataIndex: 'carrier_id',width:120, key: 'carrier_id'},
        { title: '（省/州）名称', align:'center',dataIndex: 'state_name', key: 'state_name'},
        { title: '前台显示', align:'center',dataIndex: 'name', key: 'name'},
        { title: '最小值', align:'center',dataIndex: 'c_min', key: 'c_min'},
        { title: '最大值', align:'center',dataIndex: 'c_max', key: 'c_max'},
        { title: '运费', align:'center',dataIndex: 'shipping_price', key: 'shipping_price'},
        { title: '是否是其他', align:'center',dataIndex: 'c_other', key: 'c_other'},

    ];
    const columns3 = [
        {title: '操作', key: 'action',width:80, scopedSlots: { customRender: 'action' },},
        { title: '编号', align:'center', dataIndex: 'carrier_id',width:120, key: 'carrier_id'},
        { title: '前台显示', align:'center',dataIndex: 'name', key: 'name'},
        { title: '最小值', align:'center',dataIndex: 'c_min', key: 'c_min'},
        { title: '最大值', align:'center',dataIndex: 'c_max', key: 'c_max'},
        { title: '运费', align:'center',dataIndex: 'shipping_price', key: 'shipping_price'},

    ];
    const listData1 =[]
    const listData2 =[]
    const listData3 =[]
    const listData4 =[]
    const listData5 =[]

    export default {
        components:{
        },
        methods: {
            handleChange(value){
                // alert(value)
                this.checkedList=[]
                this.getStateList(value)
            },
            seeArea(){
                this.visible = true
            },
            handleCancel(){
                this.visible = false
            },
            handleCancel2(){
                this.visible2 = false
                this.visible3 = false
            },
            handleCancel3(){
                this.visible4 = false
            },
            handleCancel5(){
                this.visible5 = false
            },
            add(){
                this.visible = true
                this.checkedList=[]
            },
            add2(){
                this.checkedList=[]
                this.visible2 = true
            },
            add3(){
                this.checkedList=[]
                this.getCountryList()
                this.visible3 = true

            },
            add4(){
                this.checkedList=[]
                this.visible4 = true
            },
            add5(){
                this.checkedList=[]
                this.visible5 = true
            },
            edit(id){

            },
            handleOk(){

            },
            getCarrierZoneAndOtherList(){
                this.$post('/carrier/getCarrierZoneAndOtherList').then((reData)=>{
                    this.listData1=reData.data.zoneList
                    this.listData2=reData.data.zoneCarrierList
                    this.listData3=reData.data.otherCarrierList
                    this.zoneList = JSON.parse(JSON.stringify(reData.data.zoneList).replace(/name/g,"label").replace(/zone_id/g,"value"))

                })
            },
        // 获取已设置国家列表
        getHasSetCountryList(zoneId){
            this.loading = true;
            this.$post('/carrier/getCarrierCountryAndStateList',{zone_id:zoneId,lang_id:this.$store.state.langId}).then((reData)=>{
                this.listData4=reData.data.countryCarrierList
                this.listData5=reData.data.stateCarrierList
                this.pagination1.total=reData.data.countryCarrierList.length
                this.pagination2.total=reData.data.stateCarrierList.length
                this.loading = false
                this.visible = true
            })
        },

            // 获取启用的国家列表
            getCountryList(){
                this.$post('/country/getCountryList',{lang_id:this.$store.state.langId}).then((reData)=>{
                    this.countryList=reData.data
                })
            },
            // 获取启用省，州的列表
            getStateList(countryId){
                this.$post('/state/getStateList',{country_id:countryId,lang_id:this.$store.state.langId}).then((reData)=>{
                    this.stateList=reData.data
                    this.stateList = JSON.parse(JSON.stringify(reData.data).replace(/name/g,"label").replace(/state_id/g,"value"))
                })
            }
        //表格分页
        ,handleTableChange(pagination){
            this.pagination.currentPage = pagination.current
            this.getList({currentPage:pagination.current,pageSize:this.pagination.defaultPageSize,active:1})
        },
            onChange (checkedList) {
                this.indeterminate = !!checkedList.length && (checkedList.length < plainOptions.length)
                this.checkAll = checkedList.length === plainOptions.length
                console.log( checkedList )
            },
            onCheckAllChange (e) {
                let allVaule=[]
                this.plainOptions.forEach(function(val, index) {
                    allVaule.push(val.value)
                })
                Object.assign(this, {
                    checkedList: e.target.checked ? allVaule : [],
                    indeterminate: false,
                    checkAll: e.target.checked,
                })
                console.log(this.checkedList)

            },
            onCheckAllChange2 (e) {
                let allVaule=[]
                this.stateList.forEach(function(val, index) {
                    allVaule.push(val.value)
                })
                Object.assign(this, {
                    checkedList: e.target.checked ? allVaule : [],
                    indeterminate: false,
                    checkAll: e.target.checked,
                })
                console.log(this.checkedList)

            },
            onCheckAllChange3 (e) {
                let allVaule=[]
                this.zoneList.forEach(function(val, index) {
                    allVaule.push(val.value)
                })
                Object.assign(this, {
                    checkedList: e.target.checked ? allVaule : [],
                    indeterminate: false,
                    checkAll: e.target.checked,
                })
                console.log(this.checkedList)

            },

        } ,
        mounted() {
            var vm =this
            // this.getList({currentPage:1,pageSize:this.pagination.defaultPageSize,active:1})
            this.getCarrierZoneAndOtherList()
        },
        data() {
            return {
                zoneList:[],
                stateList:[],
                countryList:[],
                checkedList: defaultCheckedList,
                indeterminate: true,
                checkAll: false,
                plainOptions,
                visible:false,
                visible2:false,
                visible3:false,
                visible4:false,
                visible5:false,
                listData1,
                listData2,
                listData3,
                listData4,
                listData5,
                columns1,
                columns2,
                columns3,
                columns4,
                loading: false,
                pagination1:{
                    defaultPageSize:6,
                    total:1,
                },
                pagination2:{
                    defaultPageSize:6,
                    total:1,
                }
            }
        } ,
        watch: {
            "$store.state.goods_id"() {

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


</style>