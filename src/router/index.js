import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
import Video from '@/pages/video/video'
import MinNews from '@/pages/minnews/minNews'
import Mine from '@/pages/mine/mine'
import Detail from '@/pages/home/detail'
import Channel from '@/pages/home/channel'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/home',
      name: 'Home',
      component: Home,
      redirect:"/home/channel",
      children:[{
        path:'channel',
        name:'Channel',
        component:Channel,
      }]
    },
    {
      path:'/',
      redirect:"/home"
    },
    {
      path: '/video',
      name: 'Video',
      component: Video
    },
    {
      path: '/minnews',
      name: 'Minnews',
      component: MinNews
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
