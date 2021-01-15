<template>
  <div class="comment">
    <ul>
      <li v-for="(v, i) in commentData.comments" :key="i">
        <div class="useImg">
          <a href=""><img :src="`${v.user.avatarUrl}`" /></a>
        </div>
        <div class="useSy">
          <div class="one">
            <span>{{ v.user.nickname }}</span
            ><i v-show="v.user.vipType == 11"></i>
          </div>
          <div class="time">{{ v.time | sumTimer }}</div>
          <div class="tow">
            <p>{{ v.content }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Comment",
  props: ["commentData"],
  watch: {
    commentData(val) {
      console.log(val);
      console.log(this.commentData);
    },
  },
  filters: {
    sumTimer(time) {

      let day = new Date(time);
      // 小时
      let h = day.getHours() <10 ? "0"+ day.getHours():day.getHours();
      // 分钟
      let m =day.getMinutes() <10 ? "0"+ day.getMinutes():day.getMinutes();
      let Time = h+':'+ m;
      return Time;
    },
  },
};
</script>
<style lang="less">
.comment {
  ul {
    li {
      display: flex;
      padding-top: 10px;
      width: 100%;
      border: 1px solid rgba(0, 0, 0, 0.05);
      background-color: rgba(0, 0, 0, 0.05);
      .useImg {
        flex: none;
        height: 35px;
        margin: 0 10px;
        a {
          position: relative;
          display: block;
          color: #507daf;
          text-decoration: none;
          img {
            display: block;
            border-radius: 50%;
            width: 30px;
            height: 30px;
          }
        }
      }
      .useSy {
        padding-right: 10px;
        padding-bottom: 11px;
        padding-left: 10px;
        -webkit-flex: auto;
        -webkit-box-flex: 1;
        flex: auto;
        width: 0;
        .one {
          font-size: 10px;
          margin: 5px 0;
          i {
            flex: 0 0 auto;
            width: 32px;
            height: 11px;
            margin: 0 5px;
            display: inline-block;
            background: url("../assets/img/vip.png") no-repeat;
            background-size: contain;
          }
        }
        .time{
          font-size: 12px;
          color: rgb(167, 165, 165);
        }
        .tow{
          margin-top: 4px;
          border: 1px solid black;
          padding: 6px;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>