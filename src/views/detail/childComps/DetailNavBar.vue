<template>
  <!-- 详情页面导航栏 -->
  <nav-bar>
    <!-- 左边返回上一层部分 -->
    <div slot="left" class="back" @click="backClick">
      <img src="../../../assets/img/common/back.svg" alt="" />
    </div>
    <!-- 中间部分 -->
    <div slot="center" class="title">
      <div
        v-for="(item, index) in titles"
        :key="item.title"
        class="title-item"
        :class="{ active: index === currentIndex }"
        @click="titleClick(index)"
      >
        {{ item }}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    // 返回上一层
    backClick(){
      this.$router.go(-1)
    }
  },
};
</script>

<style>
.title {
  display: flex;
  /* font-size: 13px; */
  text-align: center;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back{
  margin-top: 5px;
}
</style>
