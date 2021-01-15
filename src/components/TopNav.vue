<template>
  <div class="box">
    <router-link class="logoPg" to="/search">
      <span></span>
      <div><p>下载App</p></div>
    </router-link>
    <div class="nav">
      <ul class="topnav">
        <li><router-link tag="a" to="/">推荐音乐</router-link></li>
        <li><router-link tag="a" to="/hotList">热歌榜</router-link></li>
        <li><router-link tag="a" to="/search">搜索</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopNav",
};
</script>


<style lang="less" scope>
.box {
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 50;
}
.logoPg {
  display: flex;
  text-decoration: none;
  background-color: #3b3939;
  padding: 10px;
  text-align: center;
  span {
    display: inline-block;
    width: 120px;
    height: 40px;
    margin-right: 5px;
    background: url("../assets/img/topbar.png") no-repeat 3px -7px;
    background-size: 170px 170px;
  }
  div {
    flex: 1;
    display: inline-block;
    line-height: 40px;
    p {
      float: right;
      font-size: 6px;
      color: rgb(238, 237, 237);
      border-radius: 5px;
      padding: 0 5px;
      background-color: rgb(197, 5, 5);
      text-align: right;
    }
  }
}
.topnav {
  display: flex;
  background: #ffffff;
  border-bottom: 1px solid #ddd;
  li {
    flex: 1;
    line-height: 40px;
    font-size: 15px;
    font-weight: 400;
    text-align: center;
    a {
      display: inline-block;
      text-decoration: none;
      color: #000;
      &.router-link-exact-active {
        color: rgb(238, 4, 4);
        border-bottom: 2px solid red;
      }
    }
  }
}
</style>