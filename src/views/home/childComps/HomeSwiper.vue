<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners" :key="item.image">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import Swiper from "@/components/common/swiper/Swiper";
import SwiperItem from "@/components/common/swiper/SwiperItem";
export default {
  data() {
    return {
      isLoad: false,
    };
  },
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
    SwiperItem,
  },
  methods: {
    // 获取选项卡上面的内容的高度用来做吸顶效果
    imageLoad() {
      if (!this.isLoad) {
        // console.log("我监听到了轮播图");
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    },
  },
};
</script>

<style></style>
