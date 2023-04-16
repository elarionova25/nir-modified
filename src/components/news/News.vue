<template>
    <div>
      <blog-nav :content="content" :filters="filters" :navs="navs"/>
    </div>
</template>

<script>
import BlogNav from '../Nav.vue';

export default {
  name: 'News',
  components: {BlogNav},
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
  }
}
</script>

<style scoped>

</style>
