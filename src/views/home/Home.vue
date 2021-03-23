<template>
  <div id="home">
    <!-- 头部 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 轮播图 -->
    <!-- 父组件向子组件传递参数用 v-bind:（声明的对象）=（传递的参数） 来接收 -->
    <home-swiper :banners = "banners"></home-swiper>
    <!-- 推荐信息 -->
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView"

import { getHomeMultidata } from "@/network/home";

export default {
  name: "Home",
  data() {
    return {
      // 轮播图保存的数据
      banners: [],
      // 中间插图部分保存的数据
      recommends: [],
    };
  },
  
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  created() {
    // 1、请求多个数据 
    getHomeMultidata().then((res) => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
      console.log(res);
    });
  },
};
</script>

<style scoped>
.home-nav {
  /* 这个是css的变量，在assets文件夹里base.css文件中定义的 */
  background-color: var(--color-tint);
  color: #fff;
}
</style>
