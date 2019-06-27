<template>
  <div class="login">
    
    <div class="video_container" style="position: absolute;height: 100vh;overflow: hidden;width:100%;">
        <div class="vide_filter" :style="fixStyle" style="position:absolute;height:100vh;background: rgba(0, 0, 0, 0.4);width:100%;z-index: 9;"></div>

        <video loop="loop" :style="fixStyle" autoplay="autoplay" muted="muted" style="position:absolute;width:100%;">
            <source src="http://www.kapeixi.cn//statics/web/video/video.mp4" type="video/mp4"/>
            浏览器不支持 video 标签，建议升级浏览器。
        </video>

        <!-- <div class="poster hidden" style=" z-index: 0;position: absolute;">
            <img :style="fixStyle" src="http://www.kapeixi.cn/statics/kapeixi/img/side2.jpg" alt="" style="margin:0;!important">
        </div> -->
    </div>
    <div class="login_form">
        <a-form layout="horizontal" :form="form" @submit="handleSubmit">
        <div class="components-input-demo-presuffix login_form_userName">
            <a-form-item :validate-status="userNameError() ? 'error' : ''" :help="userNameError() || ''" >
                <a-input v-decorator="['userName',{rules: [{ required: true, message: '请输入用户名!' }]}]" placeholder="用户名">
                    <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
                    <a-icon v-if="form.getFieldValue('userName')" slot="suffix" type="close-circle" @click="userNameEmitEmpty" />
                </a-input>
            </a-form-item>
        </div>
        <div class="components-input-demo-presuffix login_form_passWord">
            <a-form-item :validate-status="passwordError() ? 'error' : ''" :help="passwordError() || ''" >
                <a-input v-decorator="[ 'password', {rules: [{ required: true, message: '请输入密码!' }]}]" type="password" placeholder="密码" >
                    <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
                    <a-icon v-if="form.getFieldValue('password')" slot="suffix" type="close-circle" @click="passWordEmitEmpty" />
                </a-input>
            </a-form-item>
        </div>
        <div class="login_form_err">
            <span v-if="err_show">用户名或密码错误!</span>
        </div>
        <div class="login_form_remember_forgot">
            <a-checkbox @change="remember_change" class="login_form_remember" :checked="remember_checbox" style="color:#fff;" >记住密码</a-checkbox>
            <span class="login_form_forgot" @click="router_forgotPassword">忘记密码？</span>
        </div>
        <div class="login_form_login">
            <a-form-item>
                <a-button type="primary" html-type="submit" block :disabled="hasErrors(form.getFieldsError())" style="word-spacing: 40px;">
                    登录
                </a-button>
            </a-form-item>
        </div>
        <div class="login_form_register">
            <span style="color:#fff;">或</span>
            <span @click="router_register">立即注册!</span>
        </div>
        </a-form>
    </div>
    
  </div>
</template>

<script>
// import api from "@/utils/api";
// import md5 from 'js-md5'
// import axios from 'axios'

function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export default {
  name: "login",
  data(){
      return{
          err_show:false,
          remember_checbox:false,
          hasErrors,
          form: this.$form.createForm(this),
          fixStyle:'',
      }
  },
  components: {

  },
  watch: {

  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });

    let cupshe_user = JSON.parse(localStorage.getItem("cupshe_user"));
      if(cupshe_user){
        this.form.setFieldsValue({
            userName: cupshe_user.userName,
            password: cupshe_user.password,
        });
        this.remember_checbox = true;
      }
       window.onresize = () => {
        const windowWidth = document.body.clientWidth;
        const windowHeight = document.body.clientHeight;
        const windowAspectRatio = windowHeight / windowWidth;
        let videoWidth;
        let videoHeight;

        if (windowAspectRatio < 0.5625) {
          videoWidth = windowWidth
          videoHeight = videoWidth * 0.5625
          this.fixStyle = {
            height: windowWidth * 0.5625 + 'px',
            width: windowWidth + 'px',
            'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
            'margin-left': 'initial'
          }
        } else {
          videoHeight = windowHeight
          videoWidth = videoHeight / 0.5625
          this.fixStyle = {
            height: windowHeight + 'px',
            width: windowHeight / 0.5625 + 'px',
            'margin-left': (windowWidth - videoWidth) / 2 + 'px',
            'margin-bottom': 'initial'
          }
        }
       }
        window.onresize()
  },
  methods: {
    //username清空
    userNameEmitEmpty () {
        this.form.resetFields('userName','')
        this.form.validateFields();
    }, 

    // password清空
    passWordEmitEmpty () {
        this.form.resetFields('password','')
         this.form.validateFields();
    },

    // remember me 多选按钮change事件
    remember_change(e){
        console.log(`${e.target.checked}`)
        this.remember_checbox = !this.remember_checbox;
    },

    // 忘记密码跳转
    router_forgotPassword(){

    },

    // 注册跳转
    router_register(){

    },

    userNameError () {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('userName') && getFieldError('userName');
    },

    // Only show error after a field is touched.
    passwordError () {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('password') && getFieldError('password');
    },

     // 登录事件表单提交
    handleSubmit  (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        let data ={
            loginName:values.userName,
            // password:md5(values.password)
            loginPwd:values.password
        }
        if (!err) {
            let that = this;
            // 记住密码
            if(that.remember_checbox){
                localStorage.setItem("cupshe_user",JSON.stringify(values))
            }else{
                localStorage.removeItem("cupshe_user")
            }
            this.$post('/dologin',data).then((reData)=>{
                console.log(reData);
            }).then((err)=>{
                console.log(err);
            })

        }
      });
      
    },
  }
};
</script>
<style>
    .login{
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login_form{
        width: 420px;
        padding: 20px;
        z-index: 99;
    }
    .login_form_passWord{

    }
    .login_form_err{
        color: red;
        margin-top:5px;
    }
    .login_form_remember_forgot{
        margin-top:40px;
        display: flex;
        justify-content: space-between
    }
    .login_form_remember{
        font-weight: 600;
    }
    .login_form_forgot{
        color:#1585ff;
        font-weight: 600;
        cursor: pointer;
    }
    .login_form_login{
        margin-top:16px;
    }
    .login_form_register{
        margin-top:18px;
    }
    .login_form_register span:nth-child(2){
        margin:0 4px;
        color:#1585ff;
        font-weight: 600;
        cursor: pointer;
    }

    .components-input-demo-presuffix .anticon-close-circle {
        cursor: pointer;
        color: #ccc;
        transition: color 0.3s;
        font-size: 12px;
    }
    .components-input-demo-presuffix .anticon-close-circle:hover {
        color: #999;
    }
    .components-input-demo-presuffix .anticon-close-circle:active {
        color: #666;
    }
</style>
