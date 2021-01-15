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
    <transition name="packup" appear>
      <div class="playfull" v-show="currPlay">
        <h2 @click="isplayFull">
          <div>{{ songs.name }}-{{ songs.ar[0].name }}</div>
          <span></span>
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
              ref="audr"
              :src="`https://music.163.com/song/media/outer/url?id=${musicID}.mp3`"
              @play="playOrstop = true"
              @pause="playOrstop = false"
              @timeupdate="timeupdate"
            ></audio>
            <div class="progress">
              <span class="starTime">{{ allTimer }}</span>
              <div class="pg">
                <div class="xbor">
                  <div class="order" :style="{ width: logWidth }"></div>
                  <div class="O" :style="{ left: logWidth }"></div>
                </div>
                <div class="box" @click="dilatory"></div>
              </div>
              <span class="overTime">{{ newTimer }}</span>
            </div>
            <!-- 按钮 -->
            <div class="btn">
              <div class="topMusic" @click="topPlay"></div>
              <div
                class="play"
                @click="playOrstop = !playOrstop"
                :class="{ suspend: playOrstop }"
              ></div>
              <div class="nextMusic" @click="nextPlay"></div>
            </div>
          </div>
        </div>
      </div>
    </transition>
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
      // 改变进度条宽度
      logWidth: "0%",
      // 歌曲总时间
      allTimer: 0,
      // 歌曲当前播放进度
      newTimer: 0,
      // 控制歌曲暂停或播放
      playOrstop: false,
      // 存放上一首和下一首歌曲ID
      sun: {},
    };
  },
  beforemount() {},
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
      // 获取播放的上一首和下一首歌的ID
      let topID = this.$root.playingMusic.playingList;
      for (var i = 0; i < topID.length; i++) {
        // this.sun = {};
        if (topID[i] == this.musicID) {
          if (i != 0) {
            this.sun.prese = topID[i - 1];
          }
          if (i != topID.length - 1) {
            this.sun.next = topID[i + 1];
          }
          break;
          // console.log(this.sun);
        }
      }
      // 获取完毕，把接口转回
      // this.$http.defaults.baseURL = "http://musicapi.leanapp.cn/";
      return val;
    },
    // 改变播放状态
    playOrstop(isPlaying) {
      console.log(isPlaying);
      if (isPlaying) {
        this.$refs.audr.play();
      } else {
        this.$refs.audr.pause();
      }
    },
  },
  methods: {
    //   显示playFull
    playFull() {
      this.currPlay = true;
    },
    isplayFull() {
      this.currPlay = false;
    },
    timeupdate(event) {
      let audio = event.target;
      // 当前播放时间
      let currentTime = audio.currentTime;
      let d =
        parseInt((currentTime / 60) % 60) < 10
          ? "0" + parseInt((currentTime / 60) % 60)
          : parseInt((currentTime / 60) % 60);
      let s1 =
        parseInt(currentTime % 60) < 10
          ? "0" + parseInt(currentTime % 60)
          : parseInt(currentTime % 60);
      this.newTimer = d + ":" + s1;
      // 歌曲总时长
      let durationTime = audio.duration;
      let m =
        parseInt((durationTime / 60) % 60) < 10
          ? "0" + parseInt((durationTime / 60) % 60)
          : parseInt((durationTime / 60) % 60);
      let s2 =
        parseInt(durationTime % 60) < 10
          ? "0" + parseInt(durationTime % 60)
          : parseInt(durationTime % 60);
      this.allTimer = m + ":" + s2;
      // 计算歌曲总时长与当前进度比
      let percent = (currentTime / durationTime) * 100 + "%";
      this.logWidth = percent;
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
        if (i == this.lrc.length - 2) {
          this.lrcCurrent = i + 1;
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
    // 画圆
    circle(c, d) {
      let canvas = this.$refs.canvas;
      let cxt = canvas.getContext("2d");
      cxt.beginPath();
      cxt.strokeStyle = "red";
      cxt.fillStyle = "black";
      cxt.arc(25, 25, 19, 0, Math.PI * 2);
      cxt.stroke();
      cxt.fill();
      cxt.closePath();

      cxt.beginPath();
      cxt.strokeStyle = "blue";
      cxt.fillStyle = "black";
      cxt.arc(25, 25, 19, 0, Math.PI * 2 * (c / d));
      cxt.stroke();
      cxt.closePath();

      cxt.beginPath();
      cxt.fillStyle = "red";
      cxt.arc(25, 25, 5, 0, Math.PI * 2);
      cxt.fill();
      cxt.closePath();
    },
    // 拖拉改变歌曲进度
    dilatory(event) {
      // 获取鼠标点击坐标
      let e = event || window.event;
      let audio = this.$refs.audr;
      let x0 = e.offsetX;
      // 获取进度条父级总宽度
      let pg = document.querySelector(".pg");
      let boxwidth = parseInt(getComputedStyle(pg)["width"]);

      // 获取鼠标与总宽度的比例
      let newWidth = (x0 / boxwidth) * 100 + "%";
      this.logWidth = newWidth;
      // 歌曲总时长
      let durationTime = audio.duration;
      // 当前播放时间
      audio.currentTime = (x0 / boxwidth) * durationTime;
    },
    // 播放上一首
    topPlay() {
      this.$root.playingMusic.musicID = this.sun.prese;
    },
    // 播放下一首
    nextPlay() {
      this.$root.playingMusic.musicID = this.sun.next;
    },
  },
};
</script>
<style lang="less" scoped>
.packup-enter {
  opacity: 0;
}
.packup-enter-to {
  opacity: 1;
}
.packup-enter-active {
  transition: all 3s linear;
}
.playmusic {
  // position: sticky;
  position: fixed;
  margin-top: 50px;
  z-index: 56;
  bottom: 0;
  width: 100%;
  background-color: rgb(51, 51, 51);
  color: rgb(241, 240, 240);
  .playInfor {
    display: flex;
    height: 54px;
    border-top: 4px solid rgba(219, 3, 3, 0.596);
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
    height: 100vh;
    h2 {
      display: block;
      position: relative;
      padding: 10px;
      font-size: 20px;
      // margin-top: 55px;
      background: rgb(172, 3, 3);
      text-align: center;
      box-shadow: black 0px 7px 17px 0px;
      z-index: 9999;
      div {
        display: inline-block;
        height: 25px;
        width: 80%;
        overflow: hidden;
      }
      span {
        display: inline-block;
        float: right;
        width: 50px;
        height: 45px;
        background: url("../assets/img/向下.svg") no-repeat;
        background-size: 50px 40px;
      }
    }
    .lrc {
      width: 100vw;
      height: 100%;
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
        z-index: 3;
        audio {
          margin-top: 45px;
          width: 80%;
          height: 40px;
          border: 1px solid black;
          background-color: rgb(241, 240, 240);
        }
        .progress {
          display: flex;
          margin-top:20px;
          span {
            padding: 5px;
          }
          .pg {
            position: relative;
            height: 5px;
            width: 100%;
            line-height: 5px;
            margin: 12px 5px;
            background-color: rgb(173, 173, 173);
            .xbor {
              width: 100%;
              height: 5px;
              .order {
                // position: absolute;
                // top: 0;
                width: 0%;
                height: 5px;
                background-color: rgb(194, 62, 62);
              }
              .O {
                position: absolute;
                height: 10px;
                width: 10px;
                top: -2px;
                border: 1px solid rgb(87, 87, 87);
                border-radius: 50%;
                background-color: rgb(228, 255, 255);
              }
            }
            .box {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 5px;
              background-color: transparent;
            }
          }
        }
        .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          width: 100%;
          div {
            margin: 0px 10px;
          }
          .topMusic {
            width: 50px;
            height: 50px;
            background: url("../assets/img/shangyishou.svg") no-repeat;
            background-size: contain;
          }
          .play {
            width: 80px;
            height: 80px;
            background: url("../assets/img/zanting.svg") no-repeat;
            background-size: contain;
          }
          .suspend {
            width: 80px;
            height: 80px;
            background: url("../assets/img/bofang.svg") no-repeat;
            background-size: contain;
          }
          .nextMusic {
            width: 50px;
            height: 50px;
            background: url("../assets/img/xiayishou.svg") no-repeat;
            background-size: contain;
          }
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
@keyframes packUp {
  from {
  }
  to {
    height: 0;
  }
}
</style>