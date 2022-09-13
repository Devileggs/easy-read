<template>
  <div class="tabbar">
    <van-tabbar v-model="active" @click="handleChange" fixed router>
      <van-tabbar-item
        v-for="(item, index) in tabData"
        :icon="item.icon"
        :to="item.path"
        :key="index"
      >
        <span :class="$route.name === tabData[index].path.name ? active : ''">{{
          item.title
        }}</span>
        <template slot="icon">
          <img :src="$route.name === tabData[index].path.name ? item.active : item.normal" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  props: {
    tabData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    handleChange(val) {
      this.$emit("change", val);
    },
  }
};
</script>

<style lang="less" scoped>
.van-tabbar {
   z-index: 150;
}
.active_tab img {
  width: 3rem;
  height: 3rem;
}
.van-tabbar-item--active {
  color: #2c2c2c;
}
</style>