<template>
  <div id="home">
    <Navbar>
      <!--    <template v-slot:left>&lt;</template>-->
      <template v-slot:default>图书兄弟</template>
    </Navbar>
    <TabControl v-show='isTabFixed' @tabClick="tabClick" :titles="['畅销','新书','精选']"></TabControl>
    <!--    内容滚动-->
    <div class="wrapper">
      <div class="content">
        <div ref="banRef">
          <HomeSwiper  :banners="banners"></HomeSwiper>

          <RecommendView :recommends="recommends"></RecommendView>
        </div>

        <TabControl @tabClick="tabClick" :titles="['畅销','新书','精选']"></TabControl>

        <GoodsList :goods="showGoods"></GoodsList>
      </div>
    </div>

    <BackTop @backTop="backTop" v-show="isTabFixed"></BackTop>


  </div>
</template>

<script>
import Navbar from "components/common/navbar/Navbar";
import RecommendView from "./ChildComps/RecommendView";
import {getHomeAllData, getHomeGoods} from "network/home";
import {ref, reactive, onMounted, computed, watchEffect, nextTick} from 'vue';
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BetterScroll from 'better-scroll'
import BackTop from "components/common/backtop/BackTop";
import HomeSwiper from "./ChildComps/HomeSwiper";

export default {
  name: "Home",
  setup() {

    const recommends = ref([]);
    let isTabFixed = ref(false);
    let banRef = ref(null);

    //商品列表模型
    const goods = reactive({

      sales: {page: 1, list: []},
      new: {page: 1, list: []},
      recommend: {page: 1, list: []}
    });
    //选项卡
    let currentType = ref('sales');
    const showGoods = computed(() => {

      return goods[currentType.value].list;
    })
    let betterScroll = reactive({});

    let banners = ref([]);

    onMounted(() => {

      getHomeAllData().then(res => {
        //获取商品数据
        recommends.value = res.goods.data;
        //获取轮播图
        banners.value = res.slides;

      })

      getHomeGoods('sales').then(res => {
        goods.sales.list = res.goods.data;
      })
      getHomeGoods('recommend').then(res => {
        goods.recommend.list = res.goods.data;
      })
      getHomeGoods('new').then(res => {
        goods.new.list = res.goods.data;
      })

      //创建betterScroll对象
      betterScroll = new BetterScroll(document.querySelector('.wrapper'), {
        probeType: 3,
        click: true,
        pullUpLoad: true, //上拉加载更多


      });
      //触发滚动
      betterScroll.on('scroll', (position) => {

        // console.log(position.y);
        isTabFixed.value = (-position.y) >= banRef.value.offsetHeight;

      })

      //上拉加载更多
      betterScroll.on('pullingUp', () => {
        // console.log('shanglajiazai');
        const page = goods[currentType.value].page + 1;

        getHomeGoods(currentType.value, page).then(res => {
          goods[currentType.value].list.push(...res.goods.data)
          goods[currentType.value].page += 1;

        })

        //完成上拉后等数据加载完成
        betterScroll.finishPullUp();
        //重新计算高度
        betterScroll.refresh();
      })

    })

    const tabClick = (index) => {
      // temId.value = index;

      let types = ['sales', 'new', 'recommend'];
      currentType.value = types[index];

      nextTick(() => {
        //重新计算高度
        betterScroll && betterScroll.refresh()
      })
    }

    //监听变化
    watchEffect(() => {
      nextTick(() => {
        //重新计算高度
        betterScroll && betterScroll.refresh()
      })
    })
    //回到顶部x
    const backTop = () =>{
      betterScroll.scrollTo(0, 0, 500)
    }

    return {
      recommends,
      tabClick,
      goods,
      showGoods,
      isTabFixed,
      banRef,
      backTop,
      banners
    }
  },
  components: {
    Navbar,
    RecommendView,
    TabControl,
    GoodsList,
    BackTop,
    HomeSwiper

  }
}
</script>

<style scoped lang="less">
#home {
  height: 100vh;
  position: relative;

  .wrapper {
    position: absolute;
    top: 45px;
    bottom: 50px;
    left: 0;
    right: 0;
    overflow: hidden;
    //background: red;

  }


}

//.banners {
//
//  img {
//    width: 100%;
//    height: auto;
//    //margin-top: 45px;
//  }
//
//}
</style>