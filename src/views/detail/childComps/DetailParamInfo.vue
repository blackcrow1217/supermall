// 商品详细参数
<template>
  <div class="aa">
    {{paramInfo.infos}}
    <img :src="paramInfo.image" alt="">

    {{paramInfo.sizes}}  
  </div>
 
</template>

<script>
export default {
props: {
  paramInfo: {
    type: Object,
    default() {
      return {}
    }
  }
}
}
</script>

<style>
.aa{
  background-color: #fff;
}
</style>