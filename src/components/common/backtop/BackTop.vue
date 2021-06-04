<template>
  <div id="backTop" @click="backTop">

  </div>
</template>

<script>
export default {
  name: "BackTop",
  setup(props, {emit}) {
    return {
      backTop:()=>{
        emit('backTop')
      }
    }
  }
}
</script>

<style scoped>
#backTop {
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 80px;
  right: 10px;
  z-index: 10;
  box-shadow: 5px 5px 5px #888888;
  border-radius: 50%;
  background: #FCFCFC url("~assets/images/up.png") no-repeat center center;


}
</style>