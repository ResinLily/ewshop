<template>
<div id="address-box">
  <Navbar>
    <!--    <template v-slot:left>&lt;</template>-->
    <template v-slot:default>个人中心</template>
  </Navbar>

  <div class="address-item">
    <van-address-list
        v-model="chosenAddressId"
        :list="list"

        disabled-text="以下地址超出配送范围"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
    />
  </div>
</div>
</template>

<script>
import Navbar from "components/common/navbar/Navbar";
import {ref, reactive, toRefs, onMounted} from 'vue';
import {getAddressList} from "network/address";
import {useRouter, useRoute} from 'vue-router';
import {Toast} from 'vant';

export default {
  name: "Address",
  setup(){
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      chosenAddressId:'1',
      list: []
    })

    onMounted(() =>{
      Toast.loading({message: '加载中...', forbidClick: true})
      getAddressList().then(res =>{

        if (res.data.length == 0){

          state.list = [];
          return;
        }

        state.list = res.data.map(item =>{

          return{
            id: item.id,
            name: item.name,
            tel: item.phone,
            address:`${item.province} ${item.city} ${item.county} ${item.address}`,
            isDefault: !!item.is_default
          }
        })
        Toast.clear();
      })
    })

    const onAdd = () =>{
      router.push({path:'/addressedit',query:{type:'add'}})
    }

    const onEdit = (item) =>{
      router.push({path:'/addressedit',query:{type:'edit',addressId:item.id }})
    }

    // const select = (item) =>{
    //   router.push({path:'createorder',query:{ addressId: item.id }})
    // }
    return{
      ...toRefs(state),
      onAdd,
      onEdit,

    }
  },
  components:{
    Navbar
  }
}
</script>

<style lang="less">

#address-box{
  height: 300px;
  .van-radio__icon{
    display: none;

  }
  .address-item{
    margin-top: 45px;

    .van-button{
      background: var(--color-tint);
      border-color: var(--color-tint);
    }
  }
}
.van-address-list__bottom{
  bottom: 100px!important;
}
</style>