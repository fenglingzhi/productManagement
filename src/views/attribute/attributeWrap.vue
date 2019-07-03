<template>
    <div class="attribute_wrap">
        <router-view/>
    </div>
</template>
<script>
    import router from '../../router';
    import store from '../../store'


    export default {
        data() {
            return {
                router,
                store,
            }
        },
        methods: {


        },
        mounted() {
            this.router.push('/productAttribute')
        },

    }
</script>
<style scoped>

</style>