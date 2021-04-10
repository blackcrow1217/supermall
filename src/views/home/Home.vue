<template>
  <div id="home" class="wrapper">
    <!-- 头部 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 商品列表的选项卡 -->
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    ></tab-control>
    <!-- scroll是滚动插件 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <!-- 父组件向子组件传递参数用 v-bind:（声明的对象）=（传递的参数） 来接收 -->
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <!-- 推荐信息 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- 本周流行 -->
      <feature-view></feature-view>
      <!-- 商品列表的选项卡 -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <!-- 商品列表 -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 返回顶部，.native修饰可以监听到组件  isShowBackTop动态设置按钮是否隐藏-->
    <back-top @click.native="backClick" v-show="isShowBackTop"> </back-top>
  </div>
</template>

<script>
// 公共组件
import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backtop/BackTop";
// 子组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

// 额外的方法
import { getHomeMultidata, getHomeGoods } from "@/network/home";
// 导入防抖函数
import { debounce } from "@/common/utils";

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
      isShowBackTop: false,
      // 获取选项卡上面内容的高度
      tabOffsetTop: 0,
      isTabFixed: false,
      // 保存离开组件的时的位置
      saveY: 0,
    };
  },

  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    HomeSwiper,
    RecommendView,
    FeatureView,
    BackTop,
  },
  // 生命周期函数 - 创建后
  created() {
    // 1.调用多个数据方法
    this.getHomeMultidata();
    // 2、调用商品数据方法
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  // 生命周期函数 - 销毁后
  destroyed() {
    console.log("组件销毁后显示");
  },
  // 生命周期钩子函数 - keep-alive组件激活时使用
  activated() {
    // 离开当前页面返回时回到当前位置
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
    // console.log("xxxxx");
  },
  // 生命周期钩子函数 - keep-alive组件停用时使用
  deactivated() {
    // 记录离开当前页面时的位置，方便再次回到页面记录时的位置
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log(this.saveY);
  },
  mounted() {
    // 3.监听item图片加载防止出现上拉出现卡顿（item与图片的高度不一致导致）
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
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
      // 切换两个选项卡同步状态
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 调用Scroll中的返回顶部方法
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    // 接收子组件发送的contentScroll事件
    contentScroll(position) {
      // console.log(position);
      // 1.判断是否显示返回顶部按钮
      // 因为position.y轴都是负数，负负得正，大于1000就显示出返回顶部按钮
      this.isShowBackTop = -position.y > 1000;

      // 2.判断选项卡是否显示吸顶效果
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    // 上啦加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    // 获取选项卡上面内容的高度来做吸顶效果
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.$refs.tabControl2.$el.offsetTop);
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
        // 调用scroll里面上啦加载更多方法
        this.$refs.scroll.finishPullUp();
      });
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
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
  position: relative;
  z-index: 9;
}
.content {
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
