// 商品列表外层组件
<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :key="item.lst" :goods-item = "item"></goods-list-item>
    <!-- {{ goods }} -->
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem"

export default {
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.goods{
  display: flex;
  flex-flow: wrap;
  justify-content: space-evenly;
}
</style>
