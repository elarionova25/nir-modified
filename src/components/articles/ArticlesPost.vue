<template>
  <div>
    <transition name="post">
      <article v-if="allReady" class="post">
        <b-button
          variant="link"
          :to="{path: '/', name: 'feed'}">
          <b-icon-caret-left/>
          Назад
        </b-button>
        <header class="post__header">
          <h2 class="post__title">{{ currentPost.title }}</h2>

          <h3 class="post__meta">Автор <router-link class="post__author"
                                                    :to="`/by/${kebabify(currentPost.author)}`">{{ currentPost.author }}</router-link>
            <span class="post__sep"></span>
            <time>{{ prettyDate(currentPost.published) }}</time>
          </h3>

          <blockquote class="post__subtitle">Информационная безопасность</blockquote>
        </header>

        <section class="post__body rte" v-html="content"></section>

      </article>
    </transition>
    <QuestionsModal
      v-show="isShowQuestionModal"
      :question="question"
      @on-close="isShowQuestionModal = false"
    />
  </div>
</template>

<script>
import VueDisqus from 'vue-disqus/VueDisqus'
import { kebabify, prettyDate } from '../../helpers'
import QuestionsModal from '../QuestionsModal.vue';
import {supabase} from '../../lib/supabaseClient';

export default {
  name: 'blog-post',
  resource: 'BlogPost',
  components: { QuestionsModal, VueDisqus },
  props: { post: String },

  data() {
    return {
      currentPost: {},
      question: {
        text: '',
        correctAnswer: null,
        options: {}
      },
      content: '',
      ready: false,
      results: [],
      isShowQuestionModal: false
    }
  },

  computed: {
    allReady() {
      return this.ready && this.question && this.post;
    }
  },

  watch: {
    post(to, from) {
      if (to === from || !this.post) return;

      this.fetchData(to);
    },
    '$route' (to, from) {
      if (this.results.length === 0 && to.name === 'feed') {
        this.showModal();
      }
    }
  },

  methods: {
    kebabify,
    prettyDate,
    showModal() {
      this.isShowQuestionModal = true;
    },
    // handleBackButton() {
    //   if (!this.isAnswered) {
    //     this.showModal();
    //   }
    // },

    async getPosts (to) {
      await supabase.from('posts')
        .select('*')
        .eq('id', to)
        .then((post) => {
          this.currentPost = post.data[0];
        });
    },

    async getQuestions () {
      await supabase.from('questions')
        .select('*')
        .eq('id', this.currentPost.question_id)
        .then((question) => {
          this.question.id = question.data[0].id;
          this.question.text = question.data[0].text;
          this.question.correctAnswer = question.data[0].correct_answer;
        });
    },

    async getAnswers () {
      await supabase.from('answers')
        .select('*')
        .eq('question_id', this.currentPost.question_id)
        .then((answers) => {
          this.question.options = answers.data.map((item) => {
            return {
              value: item.id,
              text: item.option
            }
          });
        });
    },

    async getAnsweredQuestions (userId) {
      await supabase.from('answered_questions')
        .select('*')
        .eq('question_id', this.currentPost.question_id)
        .eq('user_id', userId)
        .then((response) => {
          this.results = response.data;
          this.ready = true;
        })
    },

    async fetchData(to) {
      await this.getPosts(to).catch((e) => {
        throw Error(e)
      })
      this.content = '<p>' + this.currentPost.content.split('\n\n').join('</p><p>') + '</p>';

      await this.getQuestions()

      await this.getAnswers().catch((e) => {
        throw Error(e)
      })

      let userId = localStorage.getItem('user_id');

      await this.getAnsweredQuestions(userId).catch((e) => {
        throw Error(e)
      });
    }
  },

  mounted() {
    // window.onpopstate = event => {
    //   this.handleBackButton();
    // }

    if (!this.post) {
      this.ready = true;
      return;
    }

    this.fetchData(this.post);
  }
}
</script>
