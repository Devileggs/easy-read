<template>
  <div class="main">
       
       <router-view></router-view>
    <footer-nav v-if="$route.meta.TabBarShow"></footer-nav> 

  </div>
</template>
<script>
  import footerNav from "./components/FooterNavComz.vue";
  
  export default {
            
        components:{
           footerNav,
        }
  }
</script>

<style lang="less" scoped>
 @import "./assets/css/base.css";

</style>