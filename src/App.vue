<template>
  <div id="app" class="top">
    <TopNav></TopNav>
    <!-- 路由配置显示的组件 -->
    <router-view/>
  </div>
</template>

<script>
import TopNav from './components/TopNav'
export default {
  components:{
    TopNav
  }
}
</script>

<style>

</style>
