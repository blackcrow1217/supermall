<template>
  <div id="home">
    <!-- 头部 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 轮播图 -->
    <!-- 父组件向子组件传递参数用 v-bind:（声明的对象）=（传递的参数） 来接收 -->
    <home-swiper :banners="banners"></home-swiper>
    <!-- 推荐信息 -->
    <recommend-view :recommends="recommends"></recommend-view>
    <!-- 本周流行 -->
    <feature-view></feature-view>
    <!-- 商品列表的选项卡 -->
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
    ></tab-control>
    <!-- 商品列表 -->
    <goods-list :goods="showGoods"></goods-list>
  </div>
</template>

<script>
// 公共组件
import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";

// 子组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

// 额外的方法
import { getHomeMultidata, getHomeGoods } from "@/network/home";

export default {
  name: "Home",
  data() {
    return {
      // 轮播图保存的数据
      banners: [],
      // 中间插图部分保存的数据
      recommends: [],
      // 商品保存的数据
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      // 控制选项卡是否是新款，流行，精选
      currentType: "pop",
    };
  },

  components: {
    NavBar,
    TabControl,
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  created() {
    // 1.调用多个数据方法
    this.getHomeMultidata();
    // 2、调用商品数据方法
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    /* 
      事件监听相关方法    
    */
    tabClick(index) {
      // 根据打印下标得到 pop = 0， new = 1， sell = 2
      // 判断当前下标是多少来切换选项卡
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1: 
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },

    /* 
      网络请求相关方法
    */
    // 1.请求多个数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        // console.log(res);
      });
    },
    // 2.请求商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
}
.home-nav {
  /* 这个是css的变量，在assets文件夹里base.css文件中定义的 */
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  /* 粘性定位，导航栏固定在某个位置 */
  position: sticky;
  top: 44px;
}
</style>
