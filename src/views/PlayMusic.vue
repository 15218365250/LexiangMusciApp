<template>
  <div class="playmusic" v-show="this.$root.playingMusic.outplay"> 
    <div class="playInfor">
      <i>
        <img :src="songs.al.picUrl" />
      </i>
      <i @click="playFull">{{ songs.name }}-{{ songs.ar[0].name }}</i>
      <i>
        <canvas ref="canvas" width="50px" height="50px"></canvas>
      </i>
    </div>
    <div class="playfull" v-show="currPlay">
      <h2 @click="isplayFull">
        {{ songs.name }}-{{ songs.ar[0].name }}
        <span>收起</span>
      </h2>
      <div class="lrc">
        <div class="shade"></div>
        <div class="rotate">
          <div>
            <img :src="songs.al.picUrl" />
          </div>
        </div>
        <div class="lyricsText" ref="songText">
          <ul class="Td">
            <li
              v-for="(tc, i) in lrc"
              :key="i"
              :class="{ act: lrcCurrent == i }"
            >
              {{ tc.lyric }}
            </li>
          </ul>
        </div>
        <div>
          <audio
            autoplay
            controls
            :src="`https://music.163.com/song/media/outer/url?id=${musicID}.mp3`"
            @timeupdate="timeupdate"
          ></audio>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PlayMusic",
  props: ["musicID"],
  data() {
    return {
      // 歌手
      songs: {
        al: {
          picUrl: "",
        },
        name: null,
        ar: [{ name: "" }],
      },
      // 歌词
      lrc: [],
      //   判断是否跳转播放详情页
      currPlay: false,
      //歌词改变样式变量
      lrcCurrent: 0,
    };
  },
  mounted() {
    this.circle();
  },
  watch: {
    musicID(val) {
      this.$http("/song/detail?ids=" + val).then((data) => {
        // 根据歌曲ID获取歌曲的相关信息
        this.songs = data.data.songs[0];
        document.querySelector(
          ".lrc"
        ).style.background = `url(${this.songs.al.picUrl})no-repeat`;
      });
      //因为数据不同获取不到歌词，所以临时改变接口请求
      // this.$http.defaults.baseURL = "http://music.kele8.cn";
      this.$http("/lyric?id=" + val).then((lrcdata) => {
        // 获取歌词
        let lrc = lrcdata.data.lrc;
        let lyric = lrc.lyric;
        // this.lrc = lyric;
        // console.log(lrc);
        // 对获取到的歌词进行切割
        let lrcArry = lyric.split(/\n/);
        //[0:00.000] 歌词
        let reg = /\[(\d+):(\d+\.\d+)\](.+)?/;
        this.lrc = lrcArry.map((lc) => {
          reg.test(lc);
          return {
            time: parseInt(RegExp.$1 * 60) + parseFloat(RegExp.$2),
            lyric: RegExp.$3,
          };
        });
      });
      // 获取完毕，把接口转回
      // this.$http.defaults.baseURL = "http://musicapi.leanapp.cn/";
      return val;
    },
  },
  methods: {
    //   显示playFull
    playFull() {
      this.currPlay = true;
    },
    isplayFull() {
      this.currPlay = false;
      console.log(1234);
    },
    timeupdate(event) {
      let audio = event.target;
      // 当前播放时间
      let currentTime = audio.currentTime;
      // 歌曲总时长
      let durationTime = audio.duration;
      // 遍历歌词和时间信息
      for (var i = 0; i < this.lrc.length; i++) {
        // 获取歌词时间
        let musicTime = this.lrc[i].time;
        // 不经过转换会以字符串形式拼接
        let j = parseInt(i) + 1;
        if (currentTime >= musicTime && currentTime < this.lrc[j].time) {
          this.lrcCurrent = i;
          break;
        }
      }
      let songText = this.$refs.songText;
      let sar = songText.querySelector("ul");
      //获取ul的自定义ref的父节点
      let farterH = songText;
      // 获取ul的行高（每次歌词移动的距离 ）
      let sarlink = parseFloat(getComputedStyle(sar, null)["lineHeight"]);
      // 把当前歌词拖拉到中间位置改变样式
      let sHeigh =
        parseFloat(getComputedStyle(farterH, null)["height"]) / 2 - sarlink;
      // 歌词移动
      sar.style.transform = `translateY(${
        -(this.lrcCurrent * sarlink) + sHeigh
      }px)`;

      // 画圆进度
      this.circle(currentTime, durationTime);
    },
    //   画圆
    circle(c, d) {
      let canvas = this.$refs.canvas;
      let cxt = canvas.getContext("2d");
      cxt.beginPath();
      cxt.strokeStyle = "red";
      cxt.fillStylr = "#ffffff";
      cxt.arc(25, 25, 19, 0, Math.PI * 2);
      cxt.stroke();
      cxt.fill();
      cxt.closePath();

      cxt.beginPath();
      cxt.strokeStyle = "blue";
      cxt.arc(25, 25, 19, 0, Math.PI * 2 * (c / d));
      cxt.stroke();
      cxt.closePath();
    },
  },
};
</script>
<style lang="less">
.playmusic {
  position: sticky;
  // position: fixed;
  bottom: 0;
  width: 100%;
  background-color: rgb(51, 51, 51);
  color: rgb(241, 240, 240);
  .playInfor {
    display: flex;
    height: 100%;
    i {
      display: inline-block;
      &:first-of-type {
        border-radius: 50%;
        overflow: hidden;
        margin: 5px;
        width: 40px;
        height: 40px;
        animation: rollimg 5s linear infinite;
        img {
          width: 100%;
          height: 40px;
        }
      }
      &:nth-child(2) {
        margin-left: 10px;
        line-height: 40px;
        flex: 1;
        text-align: center;
        height: 40px;
      }
    }
  }
  .playfull {
    h2 {
      display: block;
      position: relative;
      padding: 10px;
      background: rgb(165, 48, 48);
      text-align: center;
      box-shadow: black 0px 7px 17px 0px;
      z-index: 9999;
      span {
        display: inline-block;
        float: right;
        width: 45px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        border-radius: 5px;
        background: #000;
      }
    }
    .lrc {
      width: 100vw;
      height: 80vh;
      padding-top: 20px;
      color: #ffff;
      background-color: #7e7d7d;
      position: relative;
      z-index: 1;
      .shade {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 2;
      }
      .rotate {
        margin: 0px auto;
        display: flex;
        width: 260px;
        height: 260px;
        background: url("../assets/img/disc-plus.png") no-repeat;
        background-size: contain;
        div {
          width: 100%;
          height: 62%;
          margin: 50px;
          border-radius: 50%;
          overflow: hidden;
          animation: rollimg 20s linear infinite;
          img {
            width: 100%;
          }
        }
      }
      .lyricsText {
        margin-top: 20px;
        width: 100%;
        height: 100px;
        overflow: hidden;
        position: relative;
        text-align: center;
        ul.Td {
          line-height: 25px;
          li.act {
            color: rgb(170, 27, 27);
          }
        }
      }
      div {
        width: 100%;
        text-align: center;
        position: relative;
        z-index:3;
        audio {
          margin-top: 45px;
          width: 80%;
          height: 40px;
          border: 1px solid black;
          background-color: rgb(241, 240, 240);
        }
      }
    }
  }
}
@keyframes rollimg {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>