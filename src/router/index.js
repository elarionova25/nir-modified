import Vue from 'vue'
import Router from 'vue-router'
import Blog from '../components'
import AddArticle from '../components/articles/AddArticle.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [{
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
  }, {
    path: '/add',
    name: 'add',
    component: AddArticle
  }
  ]
})
