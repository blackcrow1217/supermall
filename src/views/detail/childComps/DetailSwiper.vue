// 详情页轮播图
<template>
  <swiper class="swiper-item">
    <swiper-item v-for="item in topImages" :key="item.top">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import Swiper from "@/components/common/swiper/Swiper";
import SwiperItem from "@/components/common/swiper/SwiperItem";
export default {
  components: {
    Swiper,
    SwiperItem,
  },
  // 父传子组建通信
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.swiper-item {
  height: 300px;
  overflow: hidden;
}
</style>
