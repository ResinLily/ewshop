<template>
  <div id="goods">
    <GoodsItem v-for="item in goods" :product="item" :key="item"></GoodsItem>


  </div>
</template>

<script>
import GoodsItem from "./GoodsItem";

export default {
  name: "GoodsList",
  props:{
    goods:{
      type:Array,
      default(){
        return [];
      }
    }
  },
  components:{
    GoodsItem
  }
}
</script>

<style scoped lang="less">
#goods{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 5px;
  margin-bottom: 50px;
}

</style>