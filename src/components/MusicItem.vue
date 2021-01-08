<template>
  <ul class="newMuiscList">
    <router-link to="/" tag="li" v-for="rem in newMusicList" :key="rem.id">
      <div class="left">
        <div class="musicName">{{ rem.name }}</div>
        <div class="musicMassage">
          <span v-show="rem.song.privilege.maxbr > 320000"></span>
          {{ rem.song.artists[0].name }}-{{ rem.name }}
        </div>
      </div>
      <div class="right">
        <span></span>
      </div>
    </router-link>
  </ul>
</template>
<script>
export default {
  name: "MusicItem",
  props: {
    newMusicList: Array,
  },
};
</script>
<style lang="less" scope>
ul.newMuiscList {
  // display:flex;
  padding-left: 10px;
  li {
    display: flex;
    padding: 6px 0px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    div.left {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: normal;
      .musicName {
        font-size: 17px;
      }
      .musicMassage {
        font-size: 12px;
        color: #888;
        span {
          display: inline-block;
          width: 12px;
          height: 8px;
          margin-right: 4px;
          background: url("../assets/img/index_icon_2x.png") no-repeat -0px -0px;
          background-size: 166px 97px;
        }
      }
    }
    div.right {
      padding: 0 10px;
      display: flex;
      align-items: center;
      span {
        display: block;
        width: 22px;
        height: 22px;
        background: url("../assets/img/index_icon_2x.png") no-repeat -24px -0px;
        background-size: 166px 97px;
      }
    }
  }
}
</style>