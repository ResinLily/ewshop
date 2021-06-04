<template>
  <div id="profile">
    <Navbar>
      <!--    <template v-slot:left>&lt;</template>-->
      <template v-slot:default>个人中心</template>
    </Navbar>
    <div class="user-box">

      <div class="user-info">
        <div class="info">
          <img src="~assets/images/user.png" alt="">
          <div class="user-desc">
            <span>昵称:{{ user.name }}</span>
            <span>登录名:{{ user.email }}</span>
            <span class="name">个性签名:123123</span>
          </div>
        </div>
      </div>
      <ul class="user-list">
        <li class="van-hairline-bottom" >
          <span>我的收藏</span>
          <van-icon name="arrow"/>
        </li>
        <li class="van-hairline-bottom" @click="goTo('/order')">
          <span>我的订单</span>
          <van-icon name="arrow"/>
        </li>
        <li class="van-hairline-bottom" @click="goTo('/address')">
          <span>地址管理</span>
          <van-icon name="arrow"/>
        </li>
        <li class="van-hairline-bottom">
          <span>账号管理</span>
          <van-icon name="arrow"/>
        </li>
        <li class="van-hairline-bottom">
          <span>关于我们</span>
          <van-icon name="arrow"/>
        </li>


      </ul>

    </div>

    <div class="logout">
      <van-button style="margin-top: 60px" @click="logout" round block color="#44BA80">退出登录</van-button>
    </div>
    <van-icon name="arrow" />
  </div>
</template>

<script>
// import 'vant/lib/icon/local.css';
import Navbar from "components/common/navbar/Navbar";
import {loginOut, getUser} from "network/user";
import {Toast} from 'vant';

import {ref, reactive, toRefs, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'

export default {
  name: "Profile",
  setup() {
    const store = useStore();
    const router = useRouter();
    //状态
    const state = reactive({
      user:{}
    })

    onMounted(() =>{

      getUser().then(res =>{
        state.user = res;
      })
    })


    const logout = () => {

      loginOut().then(res => {

        if (res.status == '204') {
          Toast.success('退出成功')

          //清除token
          window.localStorage.setItem('token', '')
          store.commit('setIsLogin', false)

          setTimeout(() => {

            router.push({path: '/login'});
          }, 500)
        }
      })
    }
    //跳转方法
    const goTo = (path, query) =>{
      router.push({path ,query:query || {} });
    }
    return {
      logout,
      ...toRefs(state),
      goTo
    }
  },
  components: {
    Navbar
  }
}
</script>

<style  lang="less">
#profile{
  background: #FCFCFC;
  //height: 100vh;
  .user-box {
    margin-top: 50px;
    font-size: 14px;

    .user-info {
      width: 94%;
      height: 115px;
      background: linear-gradient(91deg,#44BA80,#c6c8ca);
      margin: 60px auto;
      padding: 20px 20px 0 20px;
      border-radius: 2%;
      .info {
        display: flex;
        width: 100%;
        height: 100%;


        img {
          width: 60px;
          height: 60px;
          vertical-align: middle;

        }
        .user-desc{

          margin-left: 10px;
          flex: 1;
          span{
            margin-bottom: 10px;
            display: block;
            text-align: left;
          }
        }
      }
    }

    .user-list{
      padding: 0 8px;
      margin-top: 40px;
      li{
        padding-left: 5px;
        padding-right: 5px;
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        position: relative;
        .van-icon-arrow{
          width: 40px;
          height: 40px;
          margin: 13px;
        }

        margin:10px 0 !important;
        background: #FFFFFF;
        border-radius: 3px;
      }
    }
  }
  .logout{
    padding: 0 60px 60px 60px;
  }
}
</style>