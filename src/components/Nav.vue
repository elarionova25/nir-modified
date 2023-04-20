<template>
  <div class="row">
    <nav class="nav">
      <div>
        <h1 class="nav__title">
          <router-link to="/" style="margin-right: 10px;">Статьи</router-link>
        </h1>
      </div>
      <div style="margin-left: auto" v-if="currentRouteName === 'feed'">
        <b-input-group size="lg" style="width: 250px">
          <template #prepend>
            <b-input-group-text><b-icon-search/></b-input-group-text>
          </template>
          <b-form-input v-model="query.search"></b-form-input>
        </b-input-group>
      </div>
      <transition-group tag="menu" name="nav__item" class="nav__menu ml-3" style="text-align: right">
        <b-button v-for="label in labels"
                  variant="success"
                  class="p-2"
                  :key="label"

                  @click="navBack">
          <b-icon-caret-left/>
          <span class="m-0">{{ label }}</span>
        </b-button>
      </transition-group>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'blog-nav',
  props: {
    navs: Number,
    content: Object,
    filters: {
      type: Object,
      default: () => {}
    },
    query: {
      type: Object,
      default: {}
    }
  },

  computed: {
    labels() {
      return Object.keys(this.filters)
        .map(filter => this.content.labels[filter])
    },
    currentRouteName() {
      return this.$route.name;
    }
  },

  methods: {
    navBack() {
      if (this.navs && !this.filters.author) this.$router.go(-1)
      else this.$router.push('/')
    }
  }
}
</script>
