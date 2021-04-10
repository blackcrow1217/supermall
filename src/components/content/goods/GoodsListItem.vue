// 商品列表小组件
<template>
  <div class="goods-item" @click="itemClick">
    <!-- @load 是vue中封装好的监听图片加载事件-->
    <img :src="goodsItem.show.img" alt="" @load="imageLoad" />
    <div class="goods-info">
      <!-- 商品描述 -->
      <p>{{ goodsItem.title }}</p>
      <!-- 商品价格 -->
      <span class="price">{{ goodsItem.price }}</span>
      <!-- 商品收藏 -->
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    // 监听item图片加载
    imageLoad() {
      this.$bus.$emit("itemImageLoad");
    },
    // 跳转到详情页
    itemClick() {
      this.$router.push('/Detail/' + this.goodsItem.iid)
    },
  },
};
</script>

<style>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  /* 超出部分隐藏 */
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  /* 超出部分显示省略号 */
  text-overflow: ellipsis;
  /* 文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止 */
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: #ff5777;
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
