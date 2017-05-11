<template>
  <div class="v-navBar">
    <ul class="clearfix">
      <router-link v-for="(item,i) in navBar" :to="item.linkTo" tag="li" :key="i">
        <div class="icon">
          <span class="iconfont" :class="item.iconClass"></span>
        </div>
        <div>
          {{item.title}}
        </div>
        
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        navBar:[
          {
            title:"首页",
            linkTo:'/',
            iconClass:'icon-shouye'
          },
          {
            title:"视频",
            linkTo:'/video',
            iconClass:'icon-shipin'
          },
          {
            title:"微头条",
            linkTo:'/minnews',
            iconClass:'icon-qipao'
          },
          {
            title:"我的",
            linkTo:'/mine',
            iconClass:'icon-wo'
          },
        ]
      }
    }
  }
</script>


<style lang="less">
  .v-navBar {
    width: 100%;
    border-top: 1px solid #eee;
    text-align: center;
    background: #eee;
    ul {
      width: 100%;
      // padding: 3px 0;
      li {
        float: left;
        width: 25%;
        height: .4rem;
        line-height: .2rem;
        font-size: .12rem;
        .iconfont {
          font-size: .12rem;
        }
      }
      li.router-link-active {
        color: #F48C8C;
      }
    }
  } 
</style>