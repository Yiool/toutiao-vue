<template>
  <div class="container">
    <div class="header clearfix">
      <div class="logo fl">
        <img src="./images/logo.png">
      </div>
      <div class="search fr">
        <input type="text" placeholder="请输入想要搜索的内容">
      </div>
    </div>
    <div class="tabs">
      <div class="title" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
        <ul class="">
          <li v-for="(item,i) in tabsTitle" @click="switchChannel(item)">
            <router-link :to="{path:'/home/channel',query:{channel:item}}">{{item}}</router-link>
          </li>
        </ul>
      </div>
      <div class="detail-content">
        <!-- <keep-alive> -->
          <router-view :channelDatas='sendDatas'></router-view>
        <!-- </keep-alive> -->
      </div>
    </div>
  </div>
</template>

<script>
let startX = 0,
  endX = 0,
  maxX = 0 + 30,
  minX = 320 - 618 - 30,
  distanceX = 0,
  currentX = 0,
  needMove,
  isMove = false;

export default {
  data() {
    return {
      tabsTitle: [],
      tabsContent: [],
      sendDatas: []  
    }
  },
  methods: {
    switchChannel(channel) {
      console.log(channel);
      const APP_KEY = "1643de435f1495f7";
      this.axios.get('/api/get?channel=' + channel + '&start=0&num=10&appkey=1643de435f1495f7').then((response) => {
        let resultArr = response.data.result.list;
        this.sendDatas = resultArr;
        console.log(this.sendDatas);
      });
    },
    touchstart(e) {
      this.getWidth();
      startX = e.touches[0].pageX;
    },
    touchmove(e) {
      let ulBox = document.querySelector(".title ul");
      endX = e.touches[0].pageX;
      distanceX = endX - startX;
      needMove = distanceX + currentX;
      if (needMove < maxX && needMove > minX) {
        ulBox.style.transition = "none";
        ulBox.style.transform = "translateX(" + needMove + "px)";
      }
    },
    touchend(e) {
      let ulBox = document.querySelector(".title ul");
      if (needMove >= 0) {
        ulBox.style.transition = "all .3s";
        ulBox.style.transform = "translateX(0)";
        currentX = 0;
      } else if (needMove <= -298) {
        ulBox.style.transition = "all .3s";
        ulBox.style.transform = "translateX(-260px)";
        currentX = -260;
      } else {
        currentX = needMove;
      }

      startX = 0;
      endX = 0;
      distanceX = 0;
    },
    getWidth() {
      let ulWidth = 0;
      let ulBox = document.querySelector(".title ul");
      let lis = document.querySelectorAll(".title li");
      let lisLen = lis.length;
      for (let i = 0; i < lisLen; i++) {
        ulWidth += lis[i].offsetWidth;
      }
      ulBox.style.width = ulWidth + "px";
    }
  },
  created() {
    //数据接口固定参数
    const APP_KEY = "1643de435f1495f7";
    const DEFAULT_CHANNEL = "头条";

    //请求tabBars标题数据
    if (this.tabsTitle.length === 0) {
      this.axios.get('/api/channel', {
        params: {
          appkey: APP_KEY
        }
      }).then((response) => {
        this.tabsTitle = response.data.result
      })
    }

    // 请求默认第一页的数据
    this.switchChannel(DEFAULT_CHANNEL);
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: .4rem;
  padding: 3px 5px;
  line-height: .4rem;
  background: #F17070;
  .logo img {
    width: .7rem;
  }
  .search {
    text-align: center;
    input {
      width: 200px;
      height: 25px;
      padding-left: 10px;
      border-radius: 5px;
      position: relative;
      top: -3px;
    }
  }
}

.tabs {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .title {
    height: 29px;
    line-height: 30px;
    background: #eee;
    overflow: hidden;
    position: relative;
    z-index: 9;
    li {
      float: left;
      padding: 0 8px;
    }
    li a.router-link-exact-active {
      color: #F17070;
    }
  }
}
</style>