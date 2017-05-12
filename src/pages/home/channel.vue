<template>
  <div id="channel">
    <div class="wraper" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
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
        <div class="guide" v-show="showGuide">
          <img src="./images/loading.gif" height="16" width="16">
        </div>
        
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
      },
      domDatas: {
        ulBox: null,
        contentBox: null,
        ulBoxHeight: 0,
        contentBoxHeight: 0,
        startNum: 10
      },
      showGuide:true,
      showLoading:false,
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
      //阻止浏览器窗口会跟随滑动的默认行为
      e.preventDefault();
      let ulBox = document.querySelector("#channel ul");
      this.touchDatas.el = ulBox;
      this.touchDatas.startY = e.touches[0].clientY;
    },
    touchmove: function (e) {
      e.preventDefault();
      this.getUlBox();
      this.getContentBox();
      this.touchDatas.endY = e.touches[0].clientY;
      this.touchDatas.distanceY = this.touchDatas.endY - this.touchDatas.startY;
      this.touchDatas.moveY = this.touchDatas.distanceY + this.touchDatas.currentY;
      if (this.touchDatas.moveY < this.touchDatas.maxY && this.touchDatas.moveY > (this.domDatas.contentBoxHeight - 70 - 40 - this.domDatas.ulBoxHeight - 30)) {
        this.touchDatas.el.style.transition = "none";
        this.touchDatas.el.style.transform = "translateY(" + this.touchDatas.moveY + "px)";
      }
    },
    touchend: function (e) {
      // console.log(this.$route.query.channel);
      let channel = this.$route.query.channel;
      e.preventDefault();
      if (this.touchDatas.moveY > 0) {
        this.touchDatas.el.style.transition = "all .3s";
        this.touchDatas.el.style.transform = "translateY(0)";
        this.touchDatas.currentY = 0;
      } if (this.touchDatas.moveY < (this.domDatas.contentBoxHeight - 70 - 40 - this.domDatas.ulBoxHeight)) {
        this.touchDatas.el.style.transition = "all .3s";
        this.touchDatas.currentY = this.domDatas.contentBoxHeight - 70 - 40 - this.domDatas.ulBoxHeight;
        this.getNewDatas(channel, this.domDatas.startNum);
      } else {
        this.touchDatas.currentY = this.touchDatas.moveY;
      }
      this.touchDatas.startY = 0;
      this.touchDatas.endY = 0;
      this.touchDatas.distanceY = 0;
    },
    getUlBox: function () {
      this.domDatas.ulBox = document.querySelector(".wraper ul");
      this.domDatas.ulBoxHeight = this.domDatas.ulBox.offsetHeight;
    },
    getContentBox: function () {
      this.domDatas.contentBox = document.querySelector("#app .content");
      this.domDatas.contentBoxHeight = this.domDatas.contentBox.offsetHeight;
    },
    getNewDatas: function (channel, start) {
      const APP_KEY = "1643de435f1495f7";
      this.axios.get('/api/get?channel=' + channel + '&start=' + start + '&num=10&appkey=1643de435f1495f7').then((response) => {
        let resultArr = response.data.result.list;
        let len = resultArr.length;
        //将获取到的数据加到props数组中，触发dom更新
        for(let i=0;i<len;i++){
          this.channelDatas.push(resultArr[i]);
        }
        this.domDatas.startNum += 10;
        //数据加载成功后，做回退运动
        this.touchDatas.el.style.transform = "translateY(" + (this.domDatas.contentBoxHeight - 70 - 40 - this.domDatas.ulBoxHeight) + "px)";
      });


    }
  },

}
</script>

<style lang="less" scoped>
#channel ul {
  position:relative;
  width: 100%;
  height:auto;
  padding: 10px;
  padding-top: 0;
  z-index:1;
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
.wraper {
  position: relative;
  .guide,.wraper .loading {
    width:100%;
    text-align:center;
    position:absolute;
    left:0;
    bottom:-15px;
  }
}
</style>