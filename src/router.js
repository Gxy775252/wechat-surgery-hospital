import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'task',
      component: () => import('./views/MissionSquare.vue'),
      beforeEnter: (to, from, next) => {
        document.title = '任务广场'
        next()
      }
    }
  ]
})
