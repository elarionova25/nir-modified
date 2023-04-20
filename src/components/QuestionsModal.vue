<template>
  <div>
    <transition name="modal-fade">
      <div class="modal-backdrop">
        <div class="modal-question">
          <header class="modal-header">
            <slot name="header">
              Пожалуйста, ответьте на вопрос
            </slot>
          </header>
          <body class="modal-body">
          <div class="mb-2">
            {{ question.text }}
          </div>
          <div class="mb-2 mt-2">
            <b-form-select v-model="selected" :options="question.options"/>
          </div>
          <div class="mt-4">
            <b-button
              variant="primary"
              @click="checkAnswer"
            >
              Ответить
            </b-button>
          </div>
          </body>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {supabase} from '../lib/supabaseClient';

export default {
  name: 'QuestionsModal',
  props: {
    question: {
      type: Object,
      default: {}
    }
  },
  data: () => ({
    selected: null
  }),
  methods: {
    close() {
      this.$emit('on-close');
    },
    async checkAnswer() {
      if (this.selected === this.question.correctAnswer) {
        this.$emit('on-right-answer');
      }
      let result = {
        user_id: localStorage.getItem('user_id'),
        question_id: this.question.id,
        is_right: this.selected === this.question.correctAnswer
      }
      try {
        await supabase.from('answered_questions')
          .insert(result)
          .then()
      } catch (e) {
        throw Error(e)
      }

      this.close();
    }
  }
}
</script>

<style scoped>

</style>
