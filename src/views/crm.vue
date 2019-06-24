<template>
  <div class="crm">
    <div class="secondTitle">
                <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                    查询条件：
                </a-col>
                <a-col class="gutter-row" :span="3">
                    <a-row>
                        <a-col class="gutter-row" offset="12" :span="12">
                            <a-button type="primary" @click="search()">查询/下载</a-button>
                        </a-col>

                    </a-row>
                </a-col>
    </div>

      <template>
          <div>
              <a-tabs defaultActiveKey="1" @change="callback" :style="{textAlign:'left'}">
                  <a-tab-pane tab="按照年份维度" key="1">
                      <a-row>
                          <a-col class="gutter-row" :span="6">
                              <div class="inputPart">
                                  <a-col class="gutter-row" :span="6">
                                      <div class="inputName">起始年份：</div>
                                  </a-col>
                                  <a-col class="gutter-row" :span="18">
                                      <a-select defaultValue="请选择" style="width: 100%" @change="handleChangeSelectStar">
                                          <a-select-option value="2015">2015</a-select-option>
                                          <a-select-option value="2016">2016</a-select-option>
                                          <a-select-option value="2017">2017</a-select-option>
                                          <a-select-option value="2018">2018</a-select-option>
                                          <a-select-option value="2019">2019</a-select-option>
                                      </a-select>
                                  </a-col>
                              </div>
                          </a-col>
                      </a-row>
                      <a-row>
                          <a-col class="gutter-row" :span="6">
                              <div class="inputPart">
                                  <a-col class="gutter-row" :span="6">
                                      <div class="inputName">结束年份：</div>
                                  </a-col>
                                  <a-col class="gutter-row" :span="18">
                                      <a-select defaultValue="请选择" style="width: 100%" @change="handleChangeSelectEnd">
                                          <a-select-option value="2015">2015</a-select-option>
                                          <a-select-option value="2016">2016</a-select-option>
                                          <a-select-option value="2017">2017</a-select-option>
                                          <a-select-option value="2018">2018</a-select-option>
                                          <a-select-option value="2019">2019</a-select-option>
                                      </a-select>
                                  </a-col>
                              </div>
                          </a-col>
                      </a-row>

                  </a-tab-pane>
                  <a-tab-pane tab="按照半年维度" key="2">
                      <a-row>
                          <a-col class="gutter-row" :span="6">
                              <div class="inputPart">
                                  <a-col class="gutter-row" :span="6">
                                      <div class="inputName">选择年份：</div>
                                  </a-col>
                                  <a-col class="gutter-row" :span="18">
                                      <a-select defaultValue="请选择" style="width: 100%" @change="handleChangeSelectStar">
                                          <a-select-option value="2015">2015</a-select-option>
                                          <a-select-option value="2016">2016</a-select-option>
                                          <a-select-option value="2017">2017</a-select-option>
                                          <a-select-option value="2018">2018</a-select-option>
                                          <a-select-option value="2019">2019</a-select-option>
                                      </a-select>
                                  </a-col>
                              </div>
                          </a-col>
                      </a-row>
                  </a-tab-pane>
                  <a-tab-pane tab="按照季度维度" key="3" forceRender>
                      <a-row>
                          <a-col class="gutter-row" :span="6">
                              <div class="inputPart">
                                  <a-col class="gutter-row" :span="6">
                                      <div class="inputName">选择年份：</div>
                                  </a-col>
                                  <a-col class="gutter-row" :span="18">
                                      <a-select defaultValue="请选择" style="width: 100%" @change="handleChangeSelectYear">
                                          <a-select-option value="2015">2015</a-select-option>
                                          <a-select-option value="2016">2016</a-select-option>
                                          <a-select-option value="2017">2017</a-select-option>
                                          <a-select-option value="2018">2018</a-select-option>
                                          <a-select-option value="2019">2019</a-select-option>
                                      </a-select>
                                  </a-col>
                              </div>
                          </a-col>
                      </a-row>

                      <a-row>
                          <a-col class="gutter-row" :span="6">
                              <div class="inputPart">
                                  <a-col class="gutter-row" :span="6">
                                      <div class="inputName">起始季度：</div>
                                  </a-col>
                                  <a-col class="gutter-row" :span="18">
                                      <a-select defaultValue="请选择" style="width: 100%" @change="handleChangeSelectStar">
                                          <a-select-option value="1">第一季度</a-select-option>
                                          <a-select-option value="2">第二季度</a-select-option>
                                          <a-select-option value="3">第三季度</a-select-option>
                                          <a-select-option value="4">第四季度</a-select-option>
                                      </a-select>
                                  </a-col>
                              </div>
                          </a-col>
                      </a-row>
                      <a-row>
                          <a-col class="gutter-row" :span="6">
                              <div class="inputPart">
                                  <a-col class="gutter-row" :span="6">
                                      <div class="inputName">结束季度：</div>
                                  </a-col>
                                  <a-col class="gutter-row" :span="18">
                                      <a-select defaultValue="请选择" style="width: 100%" @change="handleChangeSelectEnd">
                                          <a-select-option value="1">第一季度</a-select-option>
                                          <a-select-option value="2">第二季度</a-select-option>
                                          <a-select-option value="3">第三季度</a-select-option>
                                          <a-select-option value="4">第四季度</a-select-option>
                                      </a-select>
                                  </a-col>
                              </div>
                          </a-col>
                      </a-row>
                  </a-tab-pane>
                  <a-tab-pane tab="按照月份维度" key="4">
                      <a-row>
                          <a-col class="gutter-row" :span="6">
                              <div class="inputPart">
                                  <a-col class="gutter-row" :span="6">
                                      <div class="inputName">选择年份：</div>
                                  </a-col>
                                  <a-col class="gutter-row" :span="18">
                                      <a-select defaultValue="请选择" style="width: 100%" @change="handleChangeSelectYear">
                                          <a-select-option value="2015">2015</a-select-option>
                                          <a-select-option value="2016">2016</a-select-option>
                                          <a-select-option value="2017">2017</a-select-option>
                                          <a-select-option value="2018">2018</a-select-option>
                                          <a-select-option value="2019">2019</a-select-option>
                                      </a-select>
                                  </a-col>
                              </div>
                          </a-col>
                      </a-row>

                      <a-row>
                          <a-col class="gutter-row" :span="6">
                              <div class="inputPart">
                                  <a-col class="gutter-row" :span="6">
                                      <div class="inputName">起始月份：</div>
                                  </a-col>
                                  <a-col class="gutter-row" :span="18">
                                      <a-select defaultValue="请选择" style="width: 100%" @change="handleChangeSelectStar">
                                          <a-select-option value="1">一月</a-select-option>
                                          <a-select-option value="2">二月</a-select-option>
                                          <a-select-option value="3">三月</a-select-option>
                                          <a-select-option value="4">四月</a-select-option>
                                          <a-select-option value="5">五月</a-select-option>
                                          <a-select-option value="6">六月</a-select-option>
                                          <a-select-option value="7">七月</a-select-option>
                                          <a-select-option value="8">八月</a-select-option>
                                          <a-select-option value="9">九月</a-select-option>
                                          <a-select-option value="10">十月</a-select-option>
                                          <a-select-option value="11">十一月</a-select-option>
                                          <a-select-option value="12">十二月</a-select-option>
                                      </a-select>
                                  </a-col>
                              </div>
                          </a-col>
                      </a-row>
                      <a-row>
                          <a-col class="gutter-row" :span="6">
                              <div class="inputPart">
                                  <a-col class="gutter-row" :span="6">
                                      <div class="inputName">结束月份：</div>
                                  </a-col>
                                  <a-col class="gutter-row" :span="18">
                                      <a-select defaultValue="请选择" style="width: 100%" @change="handleChangeSelectEnd">
                                          <a-select-option value="1">一月</a-select-option>
                                          <a-select-option value="2">二月</a-select-option>
                                          <a-select-option value="3">三月</a-select-option>
                                          <a-select-option value="4">四月</a-select-option>
                                          <a-select-option value="5">五月</a-select-option>
                                          <a-select-option value="6">六月</a-select-option>
                                          <a-select-option value="7">七月</a-select-option>
                                          <a-select-option value="8">八月</a-select-option>
                                          <a-select-option value="9">九月</a-select-option>
                                          <a-select-option value="10">十月</a-select-option>
                                          <a-select-option value="11">十一月</a-select-option>
                                          <a-select-option value="12">十二月</a-select-option>
                                      </a-select>
                                  </a-col>
                              </div>
                          </a-col>
                      </a-row>
                  </a-tab-pane>
              </a-tabs>
          </div>
      </template>






      <!--<div class="secondTitle">-->
          <!--<a-col class="gutter-row" :span="21" style="padding-top: 13px;">-->
              <!--查询结果：-->
          <!--</a-col>-->
      <!--</div>-->
      <!--<div style="margin-top: 60px" v-if="loading">-->
          <!--<a-spin tip="正在查询中，请耐心等待" size="large">-->
              <!--<div class="spin-content">-->
              <!--</div>-->
          <!--</a-spin>-->
      <!--</div>-->
      <!--<a-row v-if="resultData">-->
          <!--<a-col class="gutter-row" :span="24">-->
              <!--<div class="inputPart">-->
                  <!--<a-col class="gutter-row" :span="2">-->
                      <!--<a-button type="primary" icon="download"  href="http://static1.kapeixi.cn/static1/2019/03/06/20190306171346_20190306171346.doc">Download</a-button>-->
                  <!--</a-col>-->
                  <!--<a-col class="gutter-row" :span="20" :style="{textAlign:'left','line-height':'34px','text-indent':'10px'}">-->
                      <!--20190524.xlx（356.3K）-->
                  <!--</a-col>-->
              <!--</div>-->
          <!--</a-col>-->
      <!--</a-row>-->
      <!--<div v-if="tipShow">-->
          <!--暂无查询结果-->
      <!--</div>-->




  </div>
</template>
<script>
    import router from '../router';
    import store from '../store'
    import $ from 'jquery'


    var vm = this

    var searchData;
   var baseURL ='http://erp-test.kapeixi.cn'
    export default {
        methods: {
            handleChangeSelectStar(value) {
                if(this.tableKey==1){
                    this.yearData.star=value
                    this.searchData=baseURL+'/crm/repurchase/exportrepurchase?start_year='+this.yearData.star+"&end_year="+this.yearData.end+"&type="+this.tableKey
                }else if(this.tableKey==2){
                    this.halfYearData.star=value
                    this.searchData=baseURL+'/crm/repurchase/exportrepurchase?year='+this.halfYearData.star+"&h_year="+this.halfYearData.star+"&type="+this.tableKey
                }else if(this.tableKey==3){
                    this.quarterData.star=value
                    this.searchData=baseURL+'/crm/repurchase/exportrepurchase?start_quarter='+this.quarterData.star+"&end_quarter="+this.quarterData.end+"&type="+this.tableKey+"&year="+this.quarterData.year
                }else if(this.tableKey==4){
                    this.MonthData.star=value
                    this.searchData=baseURL+'/crm/repurchase/exportrepurchase?start_month='+this.MonthData.star+"&end_month="+this.MonthData.end+"&year="+this.MonthData.year+"&type="+this.tableKey
                }

            }
            ,handleChangeSelectEnd(value) {
                if(this.tableKey==1){
                    this.yearData.end=value
                    this.searchData=baseURL+'/crm/repurchase/exportrepurchase?start_year='+this.yearData.star+"&end_year="+this.yearData.end+"&type="+this.tableKey
                }else if(this.tableKey==2){
                    this.halfYearData.end=value
                    this.searchData=baseURL+'/crm/repurchase/exportrepurchase?year='+this.halfYearData.star+"&h_year="+this.halfYearData.star+"&type="+this.tableKey
                }else if(this.tableKey==3){
                    this.quarterData.end=value
                    this.searchData=baseURL+'/crm/repurchase/exportrepurchase?start_quarter='+this.quarterData.star+"&end_quarter="+this.quarterData.end+"&type="+this.tableKey+"&year="+this.quarterData.year
                }else if(this.tableKey==4){
                    this.MonthData.end=value
                    this.searchData=baseURL+'/crm/repurchase/exportrepurchase?start_month='+this.MonthData.star+"&end_month="+this.MonthData.end+"&type="+this.tableKey+"&year="+this.MonthData.year

                }

            },
            handleChangeSelectYear(value){
              if(this.tableKey==3){
                    this.quarterData.year=value
                  this.searchData=baseURL+'/crm/repurchase/exportrepurchase?start_quarter='+this.quarterData.star+"&end_quarter="+this.quarterData.end+"&type="+this.tableKey+"&year="+this.quarterData.year
                }else if(this.tableKey==4){
                    this.MonthData.year=value
                    this.searchData=baseURL+'/crm/repurchase/exportrepurchase?start_month='+this.MonthData.star+"&end_month="+this.MonthData.end+"&year="+this.MonthData.year+"&type="+this.tableKey
                }

            },
            onChange(date, dateString) {
                // console.log(date, dateString);
            }
            ,search(){



                var star=0;
                var end=0;
                if(this.tableKey==1){
                    star=this.yearData.star
                    end= this.yearData.end
                    if(this.yearData.star==''||this.yearData.end==''){
                        this.$notification.open({
                            message: '提醒',
                            description: '请选择查询条件',
                            onClick: () => {
                                console.log('ok');
                            },
                        });
                        return
                    }
                }else if(this.tableKey==2){
                    if(this.halfYearData.star==''){
                        this.$notification.open({
                            message: '提醒',
                            description: '请选择查询条件',
                            onClick: () => {
                                console.log('ok');
                            },
                        });
                        return
                    }
                }else if(this.tableKey==3){
                    star=this.quarterData.star
                    end= this.quarterData.end
                    if(this.quarterData.star==''||this.quarterData.end==''||this.quarterData.year==''){
                        this.$notification.open({
                            message: '提醒',
                            description: '请选择查询条件',
                            onClick: () => {
                                console.log('ok');
                            },
                        });
                        return
                    }
                }else if(this.tableKey==4){
                    star=this.MonthData.star
                    end= this.MonthData.end
                    if(this.MonthData.star==''||this.MonthData.end==''||this.MonthData.year==''){
                        this.$notification.open({
                            message: '提醒',
                            description: '请选择查询条件',
                            onClick: () => {
                                console.log('ok');
                            },
                        });
                        return
                    }

                }
                if(parseInt(star) >parseInt(end)){
                    this.$notification.open({
                        message: '提醒',
                        description: '开始时间不能大于结束时间',
                        onClick: () => {
                            console.log('ok');
                        },
                    });
                }else {
                    window.open(this.searchData);
                }
            }
            ,callback (key) {
                this.tableKey=key
                if(key==1){
                    this.searchData=baseURL+'/crm/repurchase/exportrepurchase?start_year='+this.yearData.star+"&end_year="+this.yearData.end+"&type="+this.tableKey
                }else if (key==2){
                    this.searchData=baseURL+'/crm/repurchase/exportrepurchase?year='+this.halfYearData.star+"&h_year="+this.halfYearData.star+"&type="+this.tableKey
                }else if (key==3){
                    this.searchData=baseURL+'/crm/repurchase/exportrepurchase?start_quarter='+this.quarterData.star+"&end_quarter="+this.quarterData.end+"&type="+this.tableKey+"&year="+this.quarterData.year
                }else if (key==4){
                    this.searchData=baseURL+'/crm/repurchase/exportrepurchase?start_month='+this.MonthData.star+"&end_month="+this.MonthData.end+"&type="+this.tableKey+"&year="+this.MonthData.year
                }


            },
        } ,
        mounted() {
            store.commit('changeStore',{key:'title',val:'复购率查询'});
            this.searchData=baseURL+'/crm/repurchase/exportrepurchase?start_year='+this.yearData.star+"&end_year="+this.yearData.end+"&type="+this.tableKey;
            this.end=this.yearData.end
            this.star=this.yearData.star

        },
        data() {
            return {
                star:'',
                end:'',
                tableKey:1,
                loading:false,
                resultData:false,
                tipShow:true,
                yearData:{star:'',end:''},
                halfYearData:{star:'',end:''},
                quarterData:{star:'',end:'',year:""},
                MonthData:{star:'',end:'',year:""},
                searchData:"",
            }
        }
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