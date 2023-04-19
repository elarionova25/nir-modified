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
import {supabase} from '../../lib/supabaseClient';

export default {
  name: 'blog-post',
  resource: 'BlogPost',
  components: { CorrectAnswer, QuestionsModal, VueDisqus },
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
      commentsReady: false,
      ready: false,
      isAnswered: false,
      isShowQuestionModal: false,
      isShowCorrectAnswerModal: false
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
    },
    async fetchData(to) {
      await supabase.from('posts').select('*').eq('id', to)
        .then((post) => {
          this.currentPost = post.data[0];
          this.ready = true;
        });
      this.content = '<p>' + this.currentPost.content.split('\n\n').join('</p><p>') + '</p>';

      await supabase.from('questions').select('*').eq('id', this.currentPost.question_id)
        .then((question) => {
          this.question.text = question.data[0].text;
          this.question.correctAnswer = question.data[0].correct_answer;
        });

      await supabase.from('answers').select('*').eq('question_id', this.currentPost.question_id)
        .then((answers) => {
          this.question.options = answers.data.map((item) => {
            return {
              value: item.id,
              text: item.option
            }
          });
        });
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

    this.fetchData(this.post);
  }
}
</script>
