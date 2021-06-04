<template>
  <div id="login">
    <Navbar>
      <!--    <template v-slot:left>&lt;</template>-->
      <template v-slot:default>用户登陆</template>
    </Navbar>

    <div class="content">
      <van-form @submit="onSubmit">
        <van-field
            v-model="email"
            name="邮箱"
            label="邮箱"
            placeholder="邮箱"
            :rules="[{ required: true, message: '请填写邮箱' }]"
        />

        <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />

        <div style="margin: 60px;">
          <router-link to="/register" class="link-register">没有账号？立即注册</router-link>
          <van-button round block type="info" color="#44B883" native-type="submit">登录</van-button>
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
import {login} from "network/user";
import {useStore} from 'vuex'


export default {
  name: "Login",
  components: {
    Navbar
  },
  setup() {

    const store = useStore();
    const router = useRouter()
    //用户模型
    const userInfo = reactive({
      email: '',
      password: ''
    })
    const onSubmit = () => {
      //
      login(userInfo).then(res => {
        //将token保存到本地window.localStorage setItem(key,value) getItem(key)
        window.localStorage.setItem('token', res.access_token)

        //在vuex中 isLogin
        store.commit('setIsLogin',true)

        Toast.success('登陆成功')
        userInfo.email = '';
        userInfo.password = '';

        setTimeout(() => {

           router.go(-1);

        }, 500)
      })
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

.link-register {
  font-size: 12px;
  margin-bottom: 20px;
  color: #42b983;
  display: inline-block;
  text-align: center;
}
</style>