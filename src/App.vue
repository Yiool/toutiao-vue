<template>
  <div id="app">
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="nav-bar">
      <nav-bar></nav-bar>
    </div>
  </div>
</template>

<script>
import navBar from "./components/navBar"
export default {
  name: 'app',
  data() {
    return {
      channelDates: [],
      firstPageDatas: []
    }
  },
  components: {
    navBar
  },
}
</script>

<style lang="less" scoped>
#app {
  height: 100%;
  overflow: hidden;
  background: #fff;
  .content {
    width: 100%;
    height: 100%;
    // padding-top: 70px;
    padding-bottom: 40px;
    // overflow: auto;
  }

  .nav-bar {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index:999;
  }
}
</style>
