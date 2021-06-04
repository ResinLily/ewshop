<template>
  <div>
    <Navbar>
      <!--    <template v-slot:left>&lt;</template>-->
      <template v-slot:default>购物车</template>
    </Navbar>
    <div class="cart-box">
      <div class="cart-body">
        <van-checkbox-group @change="groupChange" v-model="result">
          <van-checkbox
              :name="item.id"
              v-for="(item,index) in list" :key="index"
          >
            <van-swipe-cell>
              <van-card
                  :num="item.num"
                  :price="item.goods.price"
                  :desc="item.goods.description"
                  :title="item.goods.title"
                  class="goods-card"
                  :thumb="item.goods.cover_url"
              >
                <template #tags>
                  <van-tag plain type="danger">新品</van-tag>
                  <van-tag plain type="danger">热销</van-tag>
                </template>
                <template #footer>
                  <van-stepper :min="1" :max="item.goods.stock" v-model="item.num" theme="round" button-size="22"
                               :name="item.id" disable-input
                               @change="onChange"
                  />
                </template>
              </van-card>

              <template #right>
                <van-button square text="删除" type="danger" class="delete-button" @click="deleteGood(item.id)"/>
              </template>
            </van-swipe-cell>
          </van-checkbox>

        </van-checkbox-group>
      </div>
      <div class="cart-footer">
        <van-submit-bar :price="total * 100" @submit="onSubmit" button-text="提交订单">
          <van-checkbox @click="allChecked" v-model:checked="checked">全选</van-checkbox>
          <!--        <template #tip>-->
          <!--          你的收货地址不支持同城送, <span @click="onClickEditAddress">修改地址</span>-->
          <!--        </template>-->
        </van-submit-bar>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "components/common/navbar/Navbar";
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {ref, reactive, toRefs, onMounted, computed} from 'vue'
import {getCart, deleteCartItem, checkedCart, modifyCart} from "network/cart";
import {Toast} from 'vant'

export default {
  name: "Cart",
  setup() {
    const router = useRouter();
    const store = useStore();
    //数据模型
    const state = reactive({
      list: [],
      result: [],
      checked: true
    })

    //初始化购物车数据
    const init = () => {
      Toast.loading({message: '加载中...', forbidClick: true})

      getCart('include=goods').then(res => {

        console.log(res.data);
        state.list = res.data
        state.result = res.data.filter(n => n.is_checked == 1).map(item => item.id)
        // console.log(state.result);


        Toast.clear()
      })

    }
    onMounted(() => {

      init();
    })

    //异步改变购物车数量
    const onChange = (num, detail) => {
      // console.log(value);
      console.log(detail);

      modifyCart(detail.name, {num: num}).then(res => {

        state.list.forEach(item => {
          if (item.id === detail.name) {
            item.num = num;
          }
        })
      })

      Toast.clear();
    }

    //复选框
    const groupChange = (result) => {
      if (result.length == state.list.length) {
        state.checked = true;
      } else {
        state.checked = false;
      }
      state.result = result
      //改变数据中的选中状态
      checkedCart({cart_ids: result})
    }

    //全选
    const allChecked = () => {
      if (!state.checked) {
        console.log(state.checked);
        state.result = state.list.map(item => item.id)
        // state.checked = true;

      } else {
        state.result = [];
        // state.checked = false;
        // console.log(state.checked);
      }
    }

    const deleteGood = (id) => {
      deleteCartItem(id).then(res => {

        init();
        //改变store中数量
        store.dispatch('updateCart');
      })
    }

    //计算总价
    const total = computed(() => {

      let sum = 0;
      state.list.filter(item => state.result.includes(item.id)).forEach(item => {

        sum += parseInt(item.num) * parseFloat(item.goods.price)
      })

      return sum;
    })
    //创建订单
    const onSubmit = () => {

      if (state.result.length == 0) {
        Toast.fail('请选择商品');
        return;

      } else {
        router.push({path:'/createOrder'});

      }
    }

    return {
      ...toRefs(state),
      onChange,
      groupChange,
      allChecked,
      deleteGood,
      total,
      onSubmit
    }
  },
  components: {
    Navbar
  }
}
</script>

<style lang="less">
.cart-box {
  padding-left: 2px;

  width: 100%;
  margin-top: 46px;
  margin-bottom: 100px;

  .van-checkbox__label {
    width: 100%;
  }

  .goods-card {
    background-color: white;

  }

  .delete-button {
    height: 100%;
  }

  .cart-footer {
    .van-submit-bar {
      position: fixed;
      bottom: 49px;
      left: 0;
      z-index: 0;
    }
  }
}
</style>