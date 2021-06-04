<template>
  <div>
    <Navbar>
      <!--    <template v-slot:left>&lt;</template>-->
      <template v-slot:default>商品分类</template>
    </Navbar>

    <div id="mainBox">
<!--      顶部-->
      <div class="orderTab">
        <van-tabs v-model="active" @click="tabClick">
          <van-tab title="销量排序"></van-tab>
          <van-tab title="价格排序"></van-tab>
          <van-tab title="评论排序"></van-tab>

        </van-tabs>

      </div>
<!--侧边栏-->
      <van-collapse class="leftMenu" v-model="activeName" accordion>
        <van-collapse-item v-for="(item,index) in categories" :key="index" :title="item.name" :name="item.name">

          <van-sidebar v-model="activeKey">
            <van-sidebar-item v-for="sub in item.children" :title="sub.name" :key="sub.id" @click="getGoods(sub.id)"/>
          </van-sidebar>

        </van-collapse-item>

      </van-collapse>

<!--商品-->
      <div class="goodsList">
        <div class="content">
          <van-card
              v-for="item in showGoods" :key="item.id"
              @click="itemClick(item.id)"
              :num="item.comments_count"
              :price="item.price"
              :desc="item.updated_at"
              :title="item.title"
              :thumb="item.cover_url"
              :lazy-load="true"
          />
        </div>
      </div>
    </div>
    <BackTop @backTop="backTop" v-show="isTabFixed"></BackTop>
  </div>
</template>

<script>
import Navbar from "components/common/navbar/Navbar";
import BackTop from "components/common/backtop/BackTop";
import {ref, reactive, onMounted,computed,watchEffect,nextTick} from 'vue';
import {useRouter} from 'vue-router'
import {getCategory} from "network/cateGory";
import {getCategoryGoods} from "../../network/cateGory";
import BetterScroll from 'better-scroll'

export default {
  name: "Category",
  setup() {
    const router = useRouter();
    let activeName = ref(1);
    let activeKey = ref(0);
    let categories = ref([]);
    let active = ref(2);

    let isTabFixed = ref(false);
    //滚动对象
    let betterScroll = reactive({});

    //排序ID
    let currentOrder = ref('sales');
    //分类ID
    let currentId = ref(0);
    //数据模型
    const goods = reactive({
      sales:{page:1,list:[]},
      price:{page:1,list:[]},
      comments_count:{page:1,list:[]}
    })

    const showGoods = computed(() =>{
      return goods[currentOrder.value].list
    })

    const init = () =>{
       getCategoryGoods('sales',currentId.value).then(res =>{

         goods.sales.list = res.goods.data;


       })
      getCategoryGoods('price',currentId.value).then(res =>{

         goods.price.list = res.goods.data;


       })
      getCategoryGoods('comments_count',currentId.value).then(res =>{

         goods.comments_count.list = res.goods.data;

       })
    }

    //创建betterScroll对象

    onMounted(() => {

      getCategory().then(res => {

        categories.value = res.categories;

      })
      getCategoryGoods('sales',currentId.value).then(res =>{

        goods.sales.list = res.goods.data;
      })

      betterScroll = new BetterScroll(document.querySelector('.goodsList'), {
        probeType: 3,
        click: true,
        pullUpLoad: true, //上拉加载更多


      });
      // 触发滚动
      betterScroll.on('scroll', (position) => {

        // console.log(position.y);
        isTabFixed.value = (-position.y) > 300;

      })

      //上拉加载更多
      betterScroll.on('pullingUp', () => {
        // console.log('shanglajiazai');
        const page = goods[currentOrder.value].page + 1;
        getCategoryGoods(currentOrder.value,currentId.value,page).then(res =>{

          goods[currentOrder.value].list.push(...res.goods.data);
          goods[currentOrder.value].page += 1;


          // console.log(res.goods.data);
        })



        //完成上拉后等数据加载完成
        betterScroll.finishPullUp();
        //重新计算高度
        nextTick(() => {
          //重新计算高度
          betterScroll && betterScroll.refresh()
        })
      })

    })
    //监听变化
    watchEffect(() => {
      nextTick(() => {
        //重新计算高度
        betterScroll && betterScroll.refresh()
      })
    })

    //排序
    const tabClick = (index) =>{
      let orders = ['sales','price','comments_count'];
      currentOrder.value = orders[index];

      getCategoryGoods(currentOrder.value,currentId.value).then(res =>{

        goods[currentOrder.value].list = res.goods.data;

        nextTick(() => {
          //重新计算高度
          betterScroll && betterScroll.refresh()
        })
        console.log(res.goods.data);
      })



    }
    //通过分类得到商品
    const getGoods = (id) =>{

      currentId.value = id;
      init();
      // console.log(id);
    }
    //回到顶部x
    const backTop = () =>{
      betterScroll.scrollTo(0, 0, 500)
    }

    return {
      activeKey,
      activeName,
      categories,
      active,
      currentOrder,
      currentId,
      goods,
      tabClick,
      getGoods,
      showGoods,
      betterScroll,
      isTabFixed,
      backTop,
      itemClick:(id)=>{

        router.push({path:'/detail',query:{id}})

      }
    }
  },
  components: {
    Navbar,
    BackTop
  }
}
</script>

<style scoped lang="less">
#mainBox {
  margin-top: 45px;
  //display: flex;
  .orderTab {
    //background: red;
    //width: 100%;
    //height: 50px;
    position: fixed;
    z-index: 20;
    top: 45px;
    right: 0;
    left: 130px;
  }

  .leftMenu {
    //background: green;
    width: 130px;
    //height: 200px;
    position: fixed;
    top: 95px;
    left: 0;
  }

  .goodsList {
    //flex: 1;
    //background: blue;


    height: 100vh;
    position: absolute;
    top: 100px;
    left: 130px;
    right: 0;
    padding: 10px;
    text-align: left!important;

    .content{
      margin-bottom: 50px;
    }



  }
}
.van-card__thumb{
  width: 68px !important;
}

</style>