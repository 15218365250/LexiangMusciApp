<template>
  <div id="app" class="top">
    <TopNav></TopNav>
    <!-- 路由配置显示的组件 -->
    <keep-alive>
      <router-view/>
    </keep-alive>
  <PlayMusic :musicID="$root.playingMusic.musicID"></PlayMusic>
  </div>
</template>

<script>
import TopNav from "./components/TopNav";
// import Loading from './components/Loading'
import PlayMusic from "./views/PlayMusic"
export default {
  components: {
    TopNav,
    // Loading
    PlayMusic
  },
};
</script>

<style>
</style>
