import Vue from 'vue'
import Router from 'vue-router'
import Blog from '../components'
import LoginPage from '../components/LoginPage.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [{
    path: '/login',
    name: 'login',
    component: LoginPage
  }, {
    path: '/',
    name: 'feed',
    component: Blog
  }, {
    path: '/by/:author',
    name: 'author',
    props: true,
    component: Blog
  }, {
    path: '/read/:post',
    name: 'post',
    props: true,
    component: Blog
  }
  ]
})
