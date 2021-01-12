<template>
  <div class="recommend">
    <Title>推荐歌单</Title>
    <ul class="recommendList">
      <router-link
        v-for="rem in recommendMusicList"
        :key="rem.id"
        :to="`/playlist/${rem.id}`"
        tag="li"
      >
        <div>
          <img :src="rem.picUrl" />
          <span><i></i>{{rem.playCount|formatNum}}</span>
        </div>
        <p>{{ rem.name }}</p>
      </router-link>
    </ul>
    <Loading v-if="recommendMusicList.length <=0"></Loading>
    <Title>最新音乐</Title>
    <MusicItem :newMusicList="newMusicList"></MusicItem>
  </div>
</template>

<script>
import Title from "../components/Title";
import MusicItem from '../components/MusicItem';
import Loading from '../components/Loading'
export default {
  name: "Recommend",
  components: {
    Title,
    MusicItem,
    Loading
  },
  data() {
    return {
      recommendMusicList: [],
      newMusicList:[],
    };
  },
  beforeRouteEnter(to, from, next) {
    // 路由守卫，在路径进入之前获取数据
    next((vm) => {
      vm.$http("/personalized?limit=6").then((data) => {
        vm.recommendMusicList = data.data.result;
        // console.log(vm.recommendMusicList);
      }).catch(console.error());
      vm.$http('/personalized/newsong').then(data=>{
        vm.newMusicList = data.data.result;
      }).catch(console.error());
    });
  },
  filters: {
    formatNum(value){
      return (value/10000).toFixed(1)+"万";
    }
  },
};
</script>

<style lang="less" scope>
ul.recommendList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 24px;
  li {
    width: 33.3%;
    margin-top: 20px;
    div {
      position: relative;
      padding-right:2px ;
      span {
        position: absolute;
        right: 5px;
        top: 2px;
        padding-left: 13px;
        color: #fff;
        font-size: 12px;
        text-shadow: 1px 0 0 rgba(0, 0, 0, 0.15);
        &::before{
          content: "";
          display: inline-block;
          vertical-align: middle;
          width: 11px;
          height: 10px;
          padding: 1px;
          background: url("../assets/img/headset.svg")no-repeat;
          background-size: contain;
        }
      }
    }
    p {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      padding: 0px 2px 0px 6px;
      min-height: 30px;
      line-height: 1.5;
      font-size: 13px;
    }
  }
}
</style>