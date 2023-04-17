import Vue from 'vue'
import Router from 'vue-router'
import Articles from './components/articles/Articles.vue'
import News from './components/news/News.vue';
import AddArticle from './components/articles/AddArticle.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [{
    path: '/',
    name: 'feed',
    component: Articles
  }, {
    path: '/by/:author',
    name: 'author',
    props: true,
    component: Articles
  }, {
    path: '/read/:post',
    name: 'post',
    props: true,
    component: Articles
  }, {
    path: '/news',
    name: 'news',
    component: News
  }, {
    path: '/add',
    name: 'add',
    component: AddArticle
  }
  ]
})
