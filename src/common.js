import router from './router';
import store from './store'
import axios from 'axios'
import {post,fetch,patch,put} from './http'
import $ from "jquery"
export default{
    linkTo:function(url){
        router.push(url)
    },
    choseSelect:function () {

    }


}