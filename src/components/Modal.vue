<template>
  <b-modal v-model="isShow"
           :no-close-on-backdrop="true"
           :no-close-on-esc="true"
           :hide-header-close="true"
           centered>
    <template #modal-header>
      <p class="mb-1 font-weight-bold h5">
        Здравствуйте!
      </p>
    </template>
    <div class="mb-2 mt-2">
      <p class="mb-1 h5" v-if="counter < 6">
        Это приложение реализовано в рамках научно-исследовательской работы для исследования влияния интерфейсов на информационно психологическую безопасность.
        <br><br>
        Большое спасибо, что принимаете в ней участие!
      </p>
      <p class="mb-1 h5" v-else>
        Это приложение реализовано в рамках научно-исследовательской работы для исследования влияния интерфейсов. Сейчас ваш компьютер будет заражен, а данные на дисках зашифрованы.
        <br><br>
        Вы согласны?
      </p>
    </div>
    <template #modal-footer>
      <div class="w-100 d-flex justify-content-end">
        <b-button
          v-if="counter < 6"
          class="m-2"
          variant="success"
          @click="more"
        >
          ОК
        </b-button>
        <b-button
          v-if="counter === 6"
          class="m-2"
          variant="success"
          @click="finalClose"
        >
          ОК
        </b-button>
        <b-button
          variant="secondary"
          class="m-2"
          @click="more"
        >
          Отмена
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>

import {supabase} from '../lib/supabaseClient';

export default {
  name: 'Modal',
  props: {
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      counter: 0
    }
  },
  methods: {
    more() {
      if (this.counter === 6) {
        this.$emit('close');
      } else {
        this.isShow = false;
        this.counter++;
        setTimeout(() => {
          this.isShow = true;
        }, 100);
      }
    },
    async finalClose() {
      let update = {
        id: localStorage.getItem('user_id'),
        is_clicked_ok: true
      }
      await supabase.from('users')
        .upsert(update);
      this.close();
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>

</style>
