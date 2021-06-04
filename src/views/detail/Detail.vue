<template>
  <div id="detail">
    <Navbar>
      <!--    <template v-slot:left>&lt;</template>-->
      <template v-slot:default>商品详情:{{ id }}</template>

    </Navbar>

    <van-image
        width="100%"
       style="margin-top: 50px"
        lazy-load
        :src="detail.cover_url"
    />

    <van-card style="text-align: left"
        :num="detail.stock"
        :price="detail.price+'.00'"
        :desc="detail.description"
        title="detail.title"
    >
      <template #tags>
        <van-tag plain type="danger">新品</van-tag>
        <van-tag plain type="danger">推荐</van-tag>
      </template>
      <template #footer>
        <van-button type="warning" @click="handAddCart">加入购物车</van-button>
        <van-button type="danger" @click="goCart">立即购买</van-button>
      </template>
    </van-card>

    <van-tabs v-model="active" style="margin-bottom: 55px">
      <van-tab title="概述">
        <div class="content"  v-html="detail.details">

        </div>
      </van-tab>
      <van-tab title="热评"></van-tab>
      <van-tab title="相关图书">

        <GoodsList :goods="like_goods"></GoodsList>
      </van-tab>

    </van-tabs>
  </div>
</template>

<script>
import Navbar from "components/common/navbar/Navbar";
import GoodsList from "components/content/goods/GoodsList";
import {useRoute, useRouter} from 'vue-router';
import {ref, onMounted,reactive,toRefs} from 'vue';
import {useStore} from 'vuex'
import {getDetail} from "network/detail";
import {addCart} from "network/cart";
import {Toast} from 'vant'

export default {
  name: "Detail",
  components: {
    Navbar,
    GoodsList
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    let active = ref(1);

    //商品id
    let id = ref(0);
    let book = reactive({
      detail:{},
      like_goods:[],
    })

    onMounted(()=>{
      //得到上级页面传的商品id
      id.value = route.query.id;
      //获取商品详细信息
      getDetail(id.value).then(res =>{
        console.log(res);
        book.detail = res.goods;
        book.like_goods = res.like_goods;

      })


    })
  //添加购物车
    const handAddCart = () =>{
        addCart({goods_id:book.detail.id,num:1}).then(res =>{
          if (res.status == '201' || res.status == '204'){
            Toast.success('添加成功');
            store.dispatch('updateCart')

          }
        })
    }
//立即购买
    const goCart = () =>{
      addCart({goods_id:book.detail.id,num:1}).then(res =>{
        if (res.status == '201' || res.status == '204'){

          Toast.success('添加成功');
          store.dispatch('updateCart')
          router.push({path:'/cart'})


        }
      })
    }
    return {
      id,
      ...toRefs(book),
      active,
      handAddCart,
      goCart
    }
  }
}
</script>

<style lang="less">

#detail{
  .content{
    padding: 10px;
    img{
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
    }
  }
}

</style>