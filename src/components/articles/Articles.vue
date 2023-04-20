<template>
  <main class="blog" :class="{ 'blog--reading': this.post }">
    <blog-nav :content="content" :filters="filters" :navs="navs" :query="query"/>
    <blog-feed :filters="filters" :query="query"/>
    <blog-post :post="post"/>
    <blog-footer/>
    <user-add-modal
      :isShow="isShowUserAddModal"
      :is-modified="isModified"
      @on-close="isShowUserAddModal = false"
    />
  </main>
</template>

<script>
import BlogNav from '../Nav.vue'
import BlogFeed from './ArticlesFeed.vue'
import BlogPost from './ArticlesPost.vue'
import BlogFooter from './ArticlesFooter.vue'
import UserAddModal from './UserAddModal.vue';

export default {
  name: 'blog',
  components: { UserAddModal, BlogNav, BlogFeed, BlogPost, BlogFooter },
  resource: 'Blog',
  props: {
    post: String,
    author: String
  },

  data() {
    return {
      isShowUserAddModal: false,
      isModified: false,
      navs: 0,
      title: '',
      labels: {
        post: '',
        author: ''
      },
      query: {
        search: ''
      }
    }
  },

  computed: {
    content() {
      return { title: this.title, labels: this.labels }
    },
    filters() {
      let filters = {}

      if (this.post) filters.post = this.post
      if (this.author) filters.author = this.author

      return filters
    }
  },

  watch: {
    '$route.name' (to, from) {
      if (to !== from) this.navs++
    }
  },

  methods: {
    isLoggedIn() {
      if (localStorage.getItem('user_id') === null) {
        this.isShowUserAddModal = true;
      }
    }
  },

  mounted() {
    this.isLoggedIn();
    this.$getResource('blog')
      .then(x => {
        // use pace hook to know when rendering is ready
      })
  }
}
</script>
