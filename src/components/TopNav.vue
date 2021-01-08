<template>
  <div class="box">
    <div class="logoPg">
      <span></span>
      <input type="text" />
    </div>
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
  z-index: 100;
}
.logoPg {
  display: flex;
  background-color: #242424;
  padding: 10px;
  text-align: center;
  span {
    display: inline-block;
    width: 85px;
    height: 25px;
    margin-right: 5px;
    background: url("../assets/img/topbar.png") no-repeat 3px -7px;
    background-size: 120px 120px;
  }
  input {
    flex: 1;
    display: inline-block;
    outline: none;
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