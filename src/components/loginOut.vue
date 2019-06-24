<template>
    <div class="heads">
            <a-button @click="loginOut()">
                <a-icon type="logout" />
                退出
            </a-button>
    </div>
</template>

<script>
    export default {
        name: "loginOut",
        data(){
            return{
                userName:"",
            }
        },
        components: {

        },
        watch: {},
        mounted() {
            setTimeout(() => {
                this.userName = 'test';
            }, 200);
        },
        methods: {
            loginOut(){
                sessionStorage.removeItem("systemMenu");
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("cupshe_store_state");
                window.location.href=('http://open-test.kapeixi.cn/#/login');
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