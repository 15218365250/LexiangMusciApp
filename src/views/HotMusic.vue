<template>
  <div class="hotmusic">
    <div class="bgHot">
      <div class="conte">
        <div class="bg"></div>
        <p>更新日期:&nbsp;01月07日</p>
      </div>
    </div>
    <ul></ul>
  </div>
</template>
<script>
export default {
  name: "HotMousic",
  data(){
      return{
          updataTime:null,
          hotMusicid:[]
      }
  },
  beforeRouteEnter (to, from, next) {
      next(vm=>{
          vm.$http('playlist/detail?id=3778678').then(data=>{
              let idList=data.data.playlist.trackIds;
              for(let i=0;i<20;i++){
                vm.hotMusicid.push(idList[i].id);
              }
          })
      })
  }
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
      p{
          color: #ffffff;
          font-size: 12px;
          margin-top: 10px;
      }
    }
  }
}
</style>