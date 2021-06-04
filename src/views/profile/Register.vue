<template>
  <div id="register">
    <Navbar>
      <!--    <template v-slot:left>&lt;</template>-->
      <template v-slot:default>用户注册</template>
    </Navbar>

    <div class="content">
      <van-form @submit="onSubmit">
        <van-field
            v-model="name"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="email"
            name="电子邮箱"
            label="电子邮箱"
            placeholder="电子邮箱"
            :rules="[{ required: true, message: '请填写电子邮箱' }]"
        />
        <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
            v-model="password_confirmation"
            type="password"
            name="确认密码"
            label="确认密码"
            placeholder="确认密码"
            :rules="[{ required: true, message: '请填写一致密码' }]"
        />
        <div style="margin: 60px;">
          <router-link to="/login" class="link-login">已有账号？立即登录</router-link>
          <van-button round block type="info" color="#44B883" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>

</template>

<script>
import Navbar from "components/common/navbar/Navbar";
import {ref, reactive, toRefs} from 'vue';
import {useRouter} from 'vue-router';
import {Notify, Toast} from 'vant';
import {register} from "network/user";


export default {
  name: "Register",
  components: {
    Navbar
  },
  setup() {
    const router = useRouter()

    const userInfo = reactive({
      name: '',
      password: '',
      password_confirmation: '',
      email: ''
    })
    const onSubmit = () => {
      //验证
      if (userInfo.password != userInfo.password_confirmation) {

        Notify('两次密码不一致！');
      }
      else {
        register(userInfo).then(res => {
            if (res.status == '201'){
                Toast.success('注册成功！');
                setTimeout(() =>{
                  router.push({path:'/login'})
                },1000)
            }

            userInfo.password_confirmation = '';
            userInfo.password = '';

        })
      }
    }

    return {
      ...toRefs(userInfo),
      onSubmit
    }
  }
}
</script>

<style scoped lang="less">
.content {
  margin-top: 100px;
  text-align: center;
}
.link-login{
  font-size: 12px;
  margin-bottom: 20px;
  color: #42b983;
  display: inline-block;
  text-align: center;
}
</style>