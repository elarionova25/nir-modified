<template>
  <main class="blog" :class="{ 'blog--reading': this.post }">
    <blog-nav :content="content" :filters="filters" :navs="navs" :query="query"/>
    <blog-feed :filters="filters" :query="query"/>
    <blog-post :post="post"/>
    <blog-footer/>
    <Modal
      :is-show="isModalVisible"
      @close="closeModal"
      @continue="continueModal"
    />
  </main>
</template>

<script>
import BlogNav from '../Nav.vue'
import BlogFeed from './ArticlesFeed.vue'
import BlogPost from './ArticlesPost.vue'
import BlogFooter from './ArticlesFooter.vue'
import Modal from '../Modal.vue';

export default {
  name: 'blog',
  components: { Modal, BlogNav, BlogFeed, BlogPost, BlogFooter },
  resource: 'Blog',
  props: {
    post: String,
    author: String
  },

  data() {
    return {
      isModalVisible: true,
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

  methods: {
    closeModal() {
      this.isModalVisible = false;
    },
    continueModal() {
      this.isModalVisible = false;
      setTimeout(() => {
        this.isModalVisible = true;
      }, 100);
    }
  },

  watch: {
    '$route.name' (to, from) {
      if (to !== from) this.navs++
    }
  },

  mounted() {
    this.$getResource('blog')
      .then(x => {
        // use pace hook to know when rendering is ready
      })
  }
}
</script>
