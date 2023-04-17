<template>
  <div class="row">
    <nav class="nav">
      <div>
        <h1 class="nav__title">
          <router-link to="/" style="margin-right: 10px;">Статьи</router-link>
          <router-link to="/news">Новости</router-link>
          <b-button variant="success" :to="{ path: '/add', name: 'add'}">
            Добавить статью
          </b-button>
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
        <button v-for="label in labels" class="nav__item" :key="label" @click="navBack">
          <i class="nav__item--icon"></i>
          <span class="nav__item--label">{{ label }}</span>
        </button>
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
