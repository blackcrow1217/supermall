<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners" :key="item.image">
        <a :href="item.link">
          <img :src="item.image" alt="" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import Swiper from "@/components/common/swiper/Swiper";
import SwiperItem from "@/components/common/swiper/SwiperItem"
export default {
  props: {
    banners: {
      type: Array,
      // 类型是数组时，默认值必须是函数，返回一个数组
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style></style>
