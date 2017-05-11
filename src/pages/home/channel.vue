<template>
  <div id="channel">
    <div class="wraper" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
      <p v-show="channelDatas.length === 0 ">loading...</p>
      <ul>
        <li v-for="(item,i) in channelDatas" :key="i">
          <div class="news-detail">
            <h3>{{item.title}}</h3>
            <div class="extra">
              <span class="news-from">{{item.src}}</span>
              <span class="news-time">{{item.time}}</span>
            </div>
          </div>
          <div class="news-pic">
            <img :src='item.pic' alt="">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      touchDatas: {
        startY: 0,
        endY: 0,
        maxY: 50,
        distanceY: 0,
        currentY: 0,
        moveY: 0,
        el: null
      }
    }
  },
  props: {
    channelDatas: {
      type: Array,
      default: [],
    }
  },
  methods: {
    touchstart: function (e) {
      let ulBox = document.querySelector("#channel ul");
      this.touchDatas.el = ulBox;
      // console.log(this.touchDatas.el);
      this.touchDatas.startY = e.touches[0].clientY;
    },
    touchmove: function (e) {
      this.touchDatas.endY = e.touches[0].clientY;
      this.touchDatas.distanceY = this.touchDatas.endY - this.touchDatas.startY;
      this.touchDatas.moveY = this.touchDatas.distanceY + this.touchDatas.currentY;
      if (this.touchDatas.moveY < this.touchDatas.maxY) {
        this.touchDatas.el.style.transition = "none";
        this.touchDatas.el.style.transform = "translateY(" + this.touchDatas.moveY + "px)";
      }

    },
    touchend: function (e) {
      if (this.touchDatas.moveY > 0) {
        this.touchDatas.el.style.transition = "all .3s";
        this.touchDatas.el.style.transform = "translateY(0)";
        this.touchDatas.currentY = 0;
      } else {
        this.touchDatas.currentY = this.touchDatas.moveY;
      }
      this.touchDatas.startY = 0;
      this.touchDatas.endY = 0;
      this.touchDatas.distanceY = 0;

    }
  },
  created() {

  },
  watch: {
    '$route': function (to, from) {
      // console.log(to,from); 
      // this.channelDatas = [];
    }
  }
}
</script>

<style lang="less" scoped>
#channel ul {
  width: 100%;
  padding: 10px;
  padding-top: 0;
  li {
    display: flex;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    .news-detail {
      flex: 1;
      margin-right: 5px;
      h3 {
        font-size: 14px;
        line-height: 30px;
        font-weight: 400;
        color: #000;
      }
      .extra {
        font-size: 12px;
        color: #999;
      }
    }
    .news-pic {
      width: 65px;
      height: 45px;
      img {
        width: 65px;
        height: 45px;
      }
    }
  }
}
</style>