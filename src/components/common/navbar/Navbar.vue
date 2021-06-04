<template>
  <div id="nav-bar">
    <div class="left" @click="GoBack"><slot name="left">
      <img src="~assets/images/left.png" alt="">
    </slot></div>
    <div class="center"><slot>EWShop</slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
import {useRouter} from 'vue-router'
export default {
name: "Navbar",
  setup(){

      const router = useRouter();
      const GoBack = () =>{
        router.go(-1);
      }
      return{
        GoBack
      }
  }
}
</script>

<style scoped lang="less">
#nav-bar{
  display: flex;
  background-color: var(--color-tint);
  color: #FFFFFF;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
  height: 45px;
  line-height: 45px;
  text-align: center;
  box-shadow: 0 2px 0px rgba(100,100,100,0.1);
  .left,.right{
    width: 60px;
  }
  .left img{
    width: 45px;
    padding: 12px;
  }
  .center{
    flex:1
  }
}
</style>