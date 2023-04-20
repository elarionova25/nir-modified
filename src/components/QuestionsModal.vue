<template>
  <b-modal
    v-model="isShow"
    :no-close-on-backdrop="true"
    centered
    :header-bg-variant="'warning'"
  >
    <template #modal-header>
        <p class="mb-1 font-weight-bold h5">
          Ответьте на вопрос
        </p>
    </template>
    <div class="mb-2">
      {{ question.text }}
    </div>
    <div class="mb-2 mt-2">
      <b-form-select v-model="selected" :options="question.options"/>
    </div>
    <template #modal-footer>
      <div class="w-100">
        <b-button
          variant="primary"
          @click="checkAnswer"
        >
          Ответить
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import {supabase} from '../lib/supabaseClient';

export default {
  name: 'QuestionsModal',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
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
        console.log(e)
      }

      this.close();
    }
  }
}
</script>

<style scoped>

</style>
