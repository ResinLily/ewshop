<template>
  <div class="home">
    {{banner}}
  </div>
</template>

<script>
// @ is an alias to /src
import {ref,onMounted} from 'vue'
import {getHomeAllData} from "network/home";

export default {
  name: 'Home',
  setup() {

        const banner = ref([]);

    onMounted(() => {
      getHomeAllData().then(res =>{

        banner.value = res.slides;

      }).catch(err =>{

      })

    })
    return{
      banner
    }

  },
  components: {}
}
</script>
