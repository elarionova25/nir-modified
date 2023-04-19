<template>
  <div>
    <transition name="post">
      <article v-if="allReady" class="post">
        <b-button
          v-if="isAnswered"
          variant="link"
          :to="{path: '/', name: 'feed'}">
          <b-icon-caret-left/>
          Назад
        </b-button>
        <b-button v-else variant="link" @click="showModal()">
          <b-icon-caret-left/>
          Назад
        </b-button>
        <header class="post__header">
          <h2 class="post__title">{{ title }}</h2>

          <h3 class="post__meta">Автор <router-link class="post__author"
                                                    :to="`/by/${kebabify(author)}`">{{ author }}</router-link>
            <span class="post__sep"></span>
            <time>{{ prettyDate(published) }}</time>
          </h3>

          <blockquote class="post__subtitle">{{ description }}</blockquote>
        </header>

        <section class="post__body rte" v-html="content"></section>

      </article>
    </transition>
    <QuestionsModal
      v-if="isShowQuestionModal"
      :isAnswered="isAnswered"
      :question="question"
      @on-close="isShowQuestionModal = false"
      @on-answered="isAnswered=true"
      @on-right-answer="isShowCorrectAnswerModal=true"
    />
    <CorrectAnswer
      v-if="isShowCorrectAnswerModal"
      @on-close="isShowCorrectAnswerModal = false"
    />
  </div>
</template>

<script>
import VueDisqus from 'vue-disqus/VueDisqus'
import { kebabify, prettyDate } from '../../helpers'
import QuestionsModal from '../QuestionsModal.vue';
import CorrectAnswer from '../CorrectAnswer.vue';

export default {
  name: 'blog-post',
  resource: 'BlogPost',
  components: { CorrectAnswer, QuestionsModal, VueDisqus },
  props: { post: String },

  data() {
    return {
      title: '',
      author: '',
      content: '',
      published: '',
      description: '',
      question: {},
      commentsReady: false,
      ready: false,
      isAnswered: false,
      isShowQuestionModal: false,
      isShowCorrectAnswerModal: false
    }
  },
  created: function () {
    console.log(12121212121)
    // `this` указывает на экземпляр vm
    window.onhashchange = function() {
      console.log('HERERERERERERERERER')
    };

    // console.log('Значение a: ' + this.a)
  },

  computed: {
    allReady() {
      return this.ready && this.question && this.post;
    }
  },

  watch: {
    post(to, from) {
      if (to === from || !this.post) return;

      this.$getResource('post', to)
        .then((post) => {
          this.ready = true;
        });
    }
  },

  methods: {
    kebabify,
    prettyDate,
    showModal() {
      this.isShowQuestionModal = true;
    },
    handleBackButton() {
      if (!this.isAnswered) {
        this.showModal();
      }
    }
  },

  mounted() {
    window.onpopstate = event => {
      this.handleBackButton();
    }

    if (!this.post) {
      this.ready = true;
      return;
    }

    this.$getResource('post', this.post)
      .then(() => {
        this.ready = true;
      });
  }
}
</script>
