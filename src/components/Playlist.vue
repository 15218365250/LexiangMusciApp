<template>
  <div>
    <div class="hearBg">
      <div
        class="bg"
        :style="{ backgroundImage: 'url(' + playlist.coverImgUrl + ')' }"
      ></div>
      <div class="textMag">
        <div>{{ playlist.name }}</div>
        <div>{{ playlist.updateFrequency }}</div>
        <div>
          <p>{{ spl[0] }}</p>
          <p>{{ spl[1] }}</p>
        </div>
      </div>
    </div>
    <h3>歌曲列表</h3>
    <!-- 加载歌曲列表 -->
    <div class="wer">
      <ul class="newMuiscList">
        <li v-for="(v, k) in newMusicList" :key="k" @click="play(v.id)">
          <div class="left">
            <div class="keyword">
              {{ k + 1 >= 10 ? k + 1 : "0" + (k + 1) }}
            </div>
            <div class="Mc">
              <div class="musicName">{{ v.name }}</div>
              <div class="musicMassage">
                <span v-show="v.song.privilege.maxbr > 320000"></span>
                {{ v.song.artists }}-{{ v.name }}
              </div>
            </div>
          </div>
          <div class="right">
            <span></span>
          </div>
        </li>
      </ul>
    </div>
    <h3>精彩评论</h3>
    <Comment :commentData="commentData"></Comment>
  </div>
</template>
<script>
// import MusicItem from "./MusicItem";
import Comment from "./Comment";
export default {
  name: "Playlist",
  props: ["playlistID"],
  data() {
    return {
      // 歌单
      newMusicList: [],
      // 封面
      playlist: {},
      spl: [],
      //评论数据
      commentData:[]
    };
  },
  components: {
    // MusicItem,
    Comment,
  },
  methods: {
    play(val) {
      //   console.log(val)
      this.$root.playingMusic.musicID = val;
      this.$root.playingMusic.outplay = true;
    },
  },
  beforeRouteEnter(from, to, next) {
    next((vm) => {
      vm.$http("/playlist/detail?id=" + vm.playlistID).then((res) => {
        // console.log(res);
        let playlist = res.data.playlist;
        vm.playlist = playlist;
        vm.spl = playlist.description.split("。");
        let ListData = null;
        // console.log(playlist.tracks[0].al.id)
        //backgroundCoverUrl 图片 name description
        for (let i = 0; i < playlist.tracks.length; i++) {
          // 自行构建于MuiscItem插件获取的歌曲data结构一致
          ListData = {
            id: playlist.trackIds[i].id,
            name: playlist.tracks[i].al.name,
            song: {
              artists: playlist.tracks[i].ar[0].name,
              privilege: {
                maxbr: 100,
              },
            },
          };
          vm.newMusicList.push(ListData);
        }
        // console.log(ListData);
      });
      // 获取歌单评论信息
      vm.$http("/comment/playlist?id=" + vm.playlistID).then((res) => {
        vm.commentData = res.data;
        // console.log("1",vm.commentData)
      });
    });
  },
  beforeRouteLeave(to, from, next) {
    this.newMusicList = [];
    next();
  },
};
</script>
<style lang="less" scope>
.hearBg {
  display: flex;
  position: relative;
  padding: 40px 20px;
  overflow: hidden;
  height: 200px;
  width: 100%;
  div.bg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    // z-index: 1;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .textMag {
    width: 100%;
    height: 130px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // z-index: 22;
    color: #fff;
    div {
      &:nth-child(1) {
        font-size: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin: 30px 0px 0px 20px;
        padding-right: 10px;
      }
      &:nth-child(2) {
        padding-left: 3px;
        padding-right: 3px;
        margin-top: 10px;
        margin-left: 20px;
        display: inline-block;
        background-color: hsla(0, 0%, 100%, 0.2);
        border-radius: 2px;
        font-size: 10px;
        color: hsla(0, 0%, 100%, 0.6);
      }
      &:nth-child(3) {
        margin: 20px 0px 0px 20px;
        padding-right: 10px;
        font-size: 14px;
        color: hsla(0, 0%, 100%, 0.8);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        p {
          margin-top: 5px;
        }
      }
    }
  }
}
h3 {
  display: block;
  margin-top: 5px;
  padding: 5px 10px;
  border-left: 4px solid rgb(190, 8, 8);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
.wer {
  ul.newMuiscList {
    // display:flex;
    padding-left: 10px;
    li {
      display: flex;
      overflow: hidden;
      padding: 10px 0px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      div.left {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: normal;
        display: flex;
        .keyword {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 17px;
          margin-right: 10px;
        }
        .Mc {
          flex: 1;
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
}
</style>