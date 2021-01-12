<template>
  <div class="hotmusic">
    <div class="bgHot">
      <div class="conte">
        <div class="bg"></div>
        <p>更新日期:&nbsp;{{ updataTime | formatDate }}</p>
      </div>
    </div>
    <!-- <MusicItem :newMusicList="hotMusicid"></MusicItem> -->
    <!-- 加载歌曲列表 -->
    <div>
      <ul class="newMuiscList">
        <li v-for="(v, k) in hotMusicid" :key="v.id" @click="play(v.id)">
          <div class="left">
            <div class="keyword" :class="{ con: k <= 2 }">
              {{ k + 1 >= 10 ? k + 1 : "0" + (k + 1) }}
            </div>
            <div class="Mc">
              <div class="musicName">{{ v.name }}</div>
              <div class="musicMassage">
                <span v-show="v.song.privilege.maxbr > 320000"></span>
                {{ v.song.artists[0].name }}-{{ v.name }}
              </div>
            </div>
          </div>
          <div class="right">
            <span></span>
          </div>
        </li>
      </ul>
    </div>
    <div @click="appList(20)" class="addMuch">{{ mltext }}</div>
    <!-- 加载错误显示动画 -->
    <Loading v-if="hotMusicid.length <= 0"></Loading>
  </div>
</template>
<script>
import Loading from "../components/Loading";
export default {
  name: "HotMousic",
  data() {
    return {
      updataTime: new Date(),
      hotMusicid: [],
      listId: null,
      num: 0,
      mltext: "加载更多...",
      toffo: true,
    };
  },
  components: {
    Loading,
  },
  computed: {},
  methods: {
    appList() {
      let con = 20;
      // 取出20首歌曲
      let vm = this;
      for (let i = vm.num; i < vm.num + con && i < vm.listId.length; i++) {
        vm.$http("/song/detail?ids=" + vm.listId[i].id).then((data) => {
          // 获取歌曲名称
          let ditname = data.data.songs[0].name;
          // 自行构建于MuiscItem插件获取的歌曲data结构一致
          let ListData = {
            id: data.data.songs[0].id,
            name: ditname,
            song: {
              artists: data.data.songs[0].ar,
              privilege: {
                maxbr: data.data.privileges[0].maxbr,
              },
            },
          };
          // 把数据push进hotMusicid
          vm.hotMusicid.push(ListData);
        });
      }
      vm.num += con++;
      if (vm.hotMusicid.length >= vm.listId.length) {
        vm.mltext = "已显示全部歌曲";
      }
    },
    play(id){
      this.$root.playingMusic.musicID = id;
      this.$root.playingMusic.outplay = true;
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.toffo) {
        return false;
      } else {
        vm.hotMusicid = [];
        vm.listId = null;
        vm.num = 0;
      }
      vm.$http("playlist/detail?id=3778678")
        .then((data) => {
          // 获取歌曲ID
          let idList = data.data.playlist.trackIds;
          vm.listId = idList;
          // vm.hotMusicid = [];
          vm.appList();
          // 更新日期
          vm.updataTime = data.data.playlist.updateTime;
        }).catch(console.error());
        vm.toffo = false;
    });
  },
  filters: {
    // 更新日期函数
    formatDate(value) {
      let d = new Date(value);
      let month = d.getMonth() + 1;
      return (month < 10 ? "0" + month : month) + "月" + d.getDate() + "日";
    },
  },
};
</script>

<style lang="less" scope>
.hotmusic {
  .bgHot {
    padding-top: 38.9%;
    background: url("../assets/img/hot_music_bg_2x.jpg") no-repeat;
    background-size: contain;
    position: relative;
    .conte {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 20px;
      .bg {
        width: 142px;
        height: 67px;
        background: url("../assets/img/index_icon_2x.png") no-repeat;
        background-position: -24px -30px;
        background-size: 166px 97px;
      }
      p {
        color: #ffffff;
        font-size: 12px;
        margin-top: 10px;
      }
    }
  }
  ul.newMuiscList {
    // display:flex;
    padding-left: 10px;
    li {
      display: flex;
      overflow: hidden;
      padding: 6px 0px;
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
        .con {
          color: red;
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
  .addMuch {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: rgb(214, 42, 42);
    color: azure;
  }
}
</style>