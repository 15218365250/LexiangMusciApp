<template>
  <div class="search">
    <form action="">
      <div class="seek">
        <i></i>
        <input
          type="text"
          v-model="keyword"
          placeholder="搜索歌曲、歌手、专辑"
        />
      </div>
    </form>
    <HotSearch v-show="showSuggets" :hotsList="hotsList" @hotIn="hotIn"></HotSearch>
    <SearchList :suggets="suggets" v-show="showSuggets" @Searchwords="Searchwords" />
    <MusicItem :newMusicList="searAllchList" v-show="showsearAllchList" :turff="tuff"></MusicItem>
  </div>
</template>
<script>
import SearchList from "../components/SearchList";
import MusicItem from "../components/MusicItem";
import HotSearch from "../components/HotSearch"
export default {
  name: "Search",
  data() {
    return {
      keyword: "",// 搜索显示内容
      suggets: [],// 存放获取到的搜索相关内容
      searAllchList: [],// 存放搜索到的data
      hotsList:[],//存放热搜歌曲
      tuff: 2,// 判断显示动画
      showSuggets: true,// 判断显示提示列表
      showsearAllchList: false,// 判断显示搜索内容列表
    };
  },
  methods: {
    // 更改输入框内容
    Searchwords(word) {
      this.keyword = word;
      this.showsearAllchList=true
      this.showSuggets = false;
      this.$http("/search?keywords=" + word).then((data) => {
        if (data.data.code == 200) {
          let result = data.data.result;
          this.searAllchList = result.songs.map((v) => {
            return {
              name: v.name,
              id: v.id,
              song: {
                artists: v.artists,
                privilege: {
                  maxbr: 100,
                },
              },
            };
          });
        }
      });
      console.log(this.searAllchList);
    },
    hotIn(val){
      this.keyword = val;
    }
  },
  watch: {
    keyword(keyWord) {
      if(this.suggets.length < 0){
        this.tuff = 1;
      }
      this.$http("/search/suggest?keywords=" + keyWord).then((data) => {
        if (data.data.code == 200 && data.data.result.order) {
          let result = data.data.result;
          let re = result.order.reduce((prev, v) => {
            let rev = result[v];
            return prev.concat(rev);
          }, []);
          this.suggets = re;
        }
        // 判断输入框是否有输入，没有输入则清空列表
        if (keyWord == "") {
          this.suggets = [];
          this.searAllchList = [];
        }
      });
    },
  },
  components: {
    SearchList,
    MusicItem,
    HotSearch
  },
  beforeRouteEnter (to, from, next) {
    next(vm=>{
      vm.$http('/search/hot').then(data=>{
        // 获取热搜data
        vm.hotsList = data.data.result.hots;
      })
    })
  }
};
</script>
<style lang="less">
form {
  padding: 15px 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  .seek {
    display: flex;
    position: relative;
    width: 100%;
    height: 30px;
    padding: 0 30px;
    box-sizing: border-box;
    background: #ebecec;
    border-radius: 30px;
    i {
      position: absolute;
      left: 0;
      top: 9px;
      margin: 0 8px;
      display: inline-block;
      width: 13px;
      height: 13px;
      vertical-align: middle;
      background: url("../assets/img/search.svg") no-repeat;
      background-size: contain;
    }
    input {
      display: inline-block;
      border: none;
      outline: none;
      width: 100%;
      height: 30px;
      line-height: 18px;
      background: rgba(0, 0, 0, 0);
      font-size: 14px;
      color: #333;
    }
  }
}
</style>