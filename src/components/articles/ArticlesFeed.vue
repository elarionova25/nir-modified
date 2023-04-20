<template>
  <div>
    <transition-group tag="ul" :name="transition"  class="blog__feed">
      <li v-for="post in feed" class="preview" :key="post.id">
        <figure class="preview__figure mb-0" :class="figureClass" :style="getBgImg(post.image)">
          <transition name="v--fade">
            <figcaption v-if="!reading || $device.phone" class="preview__details">
              <router-link class="preview__title"
                           :to="`/read/${post.id}`"
                           @click.native="scrollTo(0, 220, scrollDelay)">
                {{ post.title }}
              </router-link>

              <div class="preview__meta">
                <time class="preview__published">
                  {{ prettyDate(post.published) }}
                </time>

                <router-link class="preview__author"
                             :to="`/by/${kebabify(post.author)}`"
                             @click.native="scrollTo(0, 220, scrollDelay)">
                  {{ post.author }}
                </router-link>
              </div>
            </figcaption>
          </transition>
        </figure>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { scrollTo, kebabify, prettyDate } from '../../helpers'
import {supabase} from '../../lib/supabaseClient';

export default {
  name: 'blog-feed',
  resource: 'BlogFeed',

  props: {
    filters: {
      type: Object,
      default: () => {}
    },
    query: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      posts: [],
      transition: 'preview-appear'
    }
  },

  mounted() {
    this.fetchData()
  },

  computed: {
    reading() { return this.filters.post },
    scrollDelay() { return (this.$device.phone) ? 0 : 560 },
    figureClass() {
      return { 'preview__figure--mobile': this.$device.phone && this.reading }
    },
    feed() {
      const filterBy = {
        post: (filter, { id }) => filter === id,
        author: (filter, { author }) => filter === this.kebabify(author)
      }

      if (this.query.search) {
        let found = [];
        this.posts.forEach((item) => {
          if (item.title.indexOf(this.query.search) !== -1) {
            found.push(item);
          }
        });
        return found;
      }

      if (!Object.keys(this.filters).length) return this.posts

      return this.posts.filter(post => {
        return Object.keys(this.filters).every(filter => {
          return filterBy[filter](this.filters[filter], post)
        })
      })
    }
  },

  methods: {
    scrollTo,
    kebabify,
    prettyDate,
    getBgImg(src) {
      return { backgroundImage: `url(${src})` }
    },
    stackPosts(posts) {
      let interval
      const stack = () => {
        this.posts.push(posts.shift())

        if (!posts.length) {
          this.transition = 'preview'
          clearInterval(interval)
        }
      }

      interval = setInterval(stack, 125)
    },

    async fetchData() {
      let data = null;
      try {
        await supabase.from('posts')
          .select('*')
          .order('id')
          .then((response) => {
            data = response.data;
          })
        ;
      } catch (e) {
        console.log(e)
      }
      if (!Object.keys(this.filters).length) {
        this.stackPosts(data)
      } else {
        this.posts = data;
        this.transition = 'preview'
      }
    }
  }
}
</script>
