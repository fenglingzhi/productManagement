<template>
    <div class="heads">
            <a-button @click="changeLange()">
                {{langeName}}
            </a-button>


        <a-modal
                title="语言切换"
                width="600px"
                :visible="isShow"
                :destroyOnClose="true"
                @ok="handleOk"
                @cancel="handleCancel"
        >
            <a-row>
                <a-col class="gutter-row" :span="24">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName">语言：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-select :defaultValue="defaultLang" style="width: 100%"  @change="handleChange">
                                <a-select-option v-for="item in langList" :value="item.lang_id" :name="item.name">{{item.name}}</a-select-option>
                            </a-select>
                        </a-col>
                    </div>
                </a-col>
            </a-row>
            <a-row>
                <a-col class="gutter-row" :span="24">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="4">
                            <div class="inputName"> 温馨提醒：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <div style="line-height: 33px;text-indent: 3px;color: red;">
                                切换语言前请保存已打开页面的信息，切换语将刷新页面
                            </div>
                        </a-col>
                    </div>
                </a-col>
            </a-row>


        </a-modal>
    </div>
</template>

<script>
    import store from '../store'
    import $ from 'jquery'

    export default {
        name: "loginOut",
        data(){
            return{
                defaultLang:'',
                name:'',
                langeName:'',
                langId:'',
                isShow:false,
                langList:[]
            }
        },
        components: {

        },
        watch: {},
        mounted() {
            var vm = this
            this.getLangList()


            setTimeout(function () {
                vm.langList.forEach(function(val) {
                    if(val.lang_id==vm.$store.state.langId){
                        vm.langeName = val.name
                    }
                });
            },1000)

        },
        methods: {

            handleOk(){
                var vm=this
                sessionStorage.setItem('langId',this.langId);
                store.commit('changeStore',{key:'langId',val:this.langId});
                this.isShow=false
                vm.langeName = vm.name
                this.defaultLang= Number(this.langId)

                setTimeout(function () {
                    location.reload();
                },500)
            },
            getLangList(){
                this.$post('/lang/getLangList').then((reData)=>{
                    this.langList=reData.data
                    if(sessionStorage.getItem('langId')){
                        store.commit('changeStore',{key:'langId',val:sessionStorage.getItem('langId')});
                        this.defaultLang=Number(sessionStorage.getItem('langId'))
                    }else {
                        store.commit('changeStore',{key:'langId',val:this.langList[0].lang_id.toString()});
                        sessionStorage.setItem('langId',this.langList[0].lang_id.toString());
                        this.defaultLang=Number(this.langList[0].lang_id)
                    }
                })
            },
            handleChange(value,name){
                this.langId=value
                this.name = name.data.attrs.name
            },
            handleCancel(){
                this.isShow=false
            },
            changeLange(){
                this.isShow=true
            },
        }
    };
</script>
<style >
    .heads{
        width: 100%;
        color: rgba(255, 255, 255, 0.65);
        background: #fff;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        padding:0px;
        align-items: center;
        box-shadow: 0 1px 4px rgba(0,21,41,.08);
        position: relative;
        border-radius: 5px;
    }
</style>