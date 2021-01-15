<template>
  <div>
    <ul class="newMuiscList">
      <li to="/"  v-for="rem in newMusicList" :key="rem.id" @click="play(rem.id)">
        <div class="left">
          <div class="musicName">{{ rem.name }}</div>
          <div class="musicMassage">
            <span v-show="rem.song.privilege.maxbr > 320000"></span>
            {{ rem.song.artists[0].name }}-{{ rem.name }}
          </div>
        </div>
        <div class="right">
          <span ></span> 
        </div>
      </li>
    </ul>
    <div class="kong"></div>
    <Loading v-show="turff == 1" />
  </div>
</template>
<script>
import Loading from "./Loading";
export default {
  name: "MusicItem",
  props: {
    newMusicList: Array,
    turff: Number,
  },
  methods: {
    play(id){
      this.$root.playingMusic.musicID =id;
      this.$root.playingMusic.outplay = true;

      // 循环音乐数据获取对应列表全部id
      let allMusicId = [];
      for(let i=0;i<this.newMusicList.length;i++){
        allMusicId.push(this.newMusicList[i].id);
      }
      this.$root.playingMusic.playingList = allMusicId;
    }
  },
  components: {
    Loading,
  },
};
</script>
<style lang="less" scoped>
ul.newMuiscList {
  // display:flex;
  padding-left: 10px;
  li {
    display: flex;
    padding: 10px 0px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    div.left {
      flex: 1;
      .musicName {
        font-size: 17px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; //想要的行数
        -webkit-box-orient: vertical;
      }
      .musicMassage {
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; //想要的行数
        -webkit-box-orient: vertical;
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