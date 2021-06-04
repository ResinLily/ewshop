<template>
  <div id="tab-control">
    <div class="tab-control-item" :class="{active:index == currentIndex}"
         v-for="(item,index) in titles"
         @click="itemClick(index)"
         :key="index">
      <span>{{ item }}</span>
    </div>


  </div>
</template>

<script>
import {ref} from 'vue'
export default {
  name: "tabControl",
  props:{
    titles:{
      type:Array,
      default(){
        return [];

      }
    }
  },
  setup(props,{emit}){
    let currentIndex = ref(0);
    const itemClick = (index)=>{

        currentIndex.value = index;
        emit('tabClick',index);
    }

    return{
      currentIndex,
      itemClick
    }
  }
}
</script>

<style scoped lang="less">
#tab-control {
  display: flex;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  background-color: #FFF;
  width: 100%;
  position: sticky;
  top: 45px;
  z-index: 6;

  .tab-control-item {
    flex: 1;

    span {
      padding: 4px;
    }
  }

  .active {
    color: var(--color-high-text);

    span {
      border-bottom: 3px solid var(--color-tint);
    }
  }
}

</style>