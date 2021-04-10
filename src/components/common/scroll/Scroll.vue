// 滚动组件封装
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  // a.事件传递监听滚动位置
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      observeDOM: true,
      click: true,
      // b.赋值方便传递出去
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    // 2.监听滚动的位置
    // 用if判断来提高性能
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        // console.log(position);
        // 吧scroll事件发送到父组件
        this.$emit("scroll", position);
      });
    }
    // 3.监听scroll滚动到底部来实现上拉加载更多
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // console.log("已经监听到");
        // 吧监听事件发送到父组件home中来实现加载更更多
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    // 封装返回顶部方法
    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo(x, y, (time = 300));
    },
    // 上啦加载更多方法
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    // 离开页面回到页面时的位置
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>

<style></style>
