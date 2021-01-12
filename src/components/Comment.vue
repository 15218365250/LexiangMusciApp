<template>
  <div class="comment">
    <ul>
      <li v-for="(v, i) in commentData.comments" :key="i">
        <div class="useImg">
          <a href=""><img :src="`${v.user.avatarUrl}`" /></a>
        </div>
        <div class="useSy">
          <div class="one"><p>{{v.user.nickname}}</p></div>
          <div class="tow"><p>{{v.content}}</p></div>
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
      console.log("2", val);
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
      background-color:rgba(0, 0, 0, .05);
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
        .one{
            font-size: 10px;
            margin: 5px 0;
        }
        .tow{

        }
      }
    }
  }
}
</style>