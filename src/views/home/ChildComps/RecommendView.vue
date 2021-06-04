<template>
  <div id="recommend">
    <div class="recommend-item" v-for="item in recommends.splice(0,4)" :key="item.id">
<!--      <a href="" @click.prevent="goDetail(item.id)">-->
        <router-link :to="'/detail/?id='+item.id">
          <img v-lazy="item.cover_url" alt="">
          <div>{{item.title}}</div>
        </router-link>
<!--      </a>-->
    </div>

  </div>
</template>

<script>
import {useRouter} from 'vue-router'
export default {
name: "RecommendView",
  props:{
    recommends:{
      type:Array,
      default(){

        return [];
      }
    }
  },
  setup(){





  }
}
</script>

<style scoped lang="less">
#recommend{
  display: flex;
  width: 100%;
  text-align: center;
  padding: 15px 0 30px;
  border-bottom: 8px solid #EEE;
  font-size: 12px;
   .recommend-item{
     flex: 1;
     img{
       width: 70px;
       height: 70px;
       margin-bottom: 10px;
     }
   }
}
</style>