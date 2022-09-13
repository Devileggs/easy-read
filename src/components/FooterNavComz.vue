<template>
  <div class="home">
    <!-- <router-view></router-view> -->
    <TabBar :tabData="tabbarList" />
  </div>
</template>

<script>
import TabBar from "../components/TabBar.vue";
export default {
  name: "HomeView",
  components: {
    TabBar,
  },
  data() {
    return {
      tabbarList: [
        {
          title: "书架",
          path: { name: "home" },
          normal: require("../../src/assets/imgs/bookshelf.png"),
          active: require("../../src/assets/imgs/bookshelf-black.png"),
        },
        {
          title: "书城",
          path: { name: "bookmark" },
          normal: require("../../src/assets/imgs/booktown.png"),
          active: require("../../src/assets/imgs/booktown-black.png"),
        },
        {
          title: "分类",
          path: { name: "clssityfy" },
          normal: require("../../src/assets/imgs/classify.png"),
          active: require("../../src/assets/imgs/classify-black.png"),
        },
        {
          title: "我的",
          path: { name: "host" },
          normal: require("../../src/assets/imgs/mine.png"),
          active: require("../../src/assets/imgs/mine-black.png"),
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
</style>