<template>
  <div class="wordList">
    <h5>热门搜索</h5>
    <ul>
      <li v-for="h in hotsList" :key="h.first" @click="hotIn(h.first)">{{ h.first }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "HotSearch",
  props: ["hotsList"],
  methods: {
     hotIn(val){
      this.$emit("hotIn",val);
    }
  },
};
</script>
<style lang="less" scoped>
.wordList {
  margin: 15px 5px;
  color: gray;
  ul {
    padding: 10px 0;
    li {
      display: inline-block;
      height: 32px;
      margin-right: 8px;
      margin-bottom: 8px;
      padding: 0 14px;
      font-size: 14px;
      line-height: 32px;
      color: #333;
      border: 1px solid rgba(0, 0, 0, .1);
      border-radius: 12px;
      box-shadow:transparent();
    }
  }
}
</style>