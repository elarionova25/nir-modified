<template>
  <b-modal v-model="isShow" :no-close-on-backdrop="true" centered>
    <template #modal-header>
      <p class="mb-1 font-weight-bold h5">
        Пожалуйста, введите ФИО
      </p>
    </template>
    <div>
      <b-form-input v-model="userFio"/>
    </div>
    <template #modal-footer>
      <div class="w-100">
        <b-button
          variant="primary"
          @click="addUser"
        >
          Отправить
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import {supabase} from '../../lib/supabaseClient';

export default {
  name: 'UserAddModal',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    isModified: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    userFio: null
  }),
  methods: {
    close() {
      this.$emit('on-close');
    },

    async addUser() {
      console.log(1)
      let user = {
        fio: this.userFio,
        loggined_in: new Date(),
        is_modified: this.isModified
      }
      console.log(2)
      try {
        let createdUser = await supabase.from('users')
          .insert(user)
          .select();
        console.log(createdUser)
        localStorage.setItem('user_id', createdUser.data[0].id);
        console.log(localStorage.getItem('user_id'))
      } catch (e) {
        console.log(e);
      }
      this.close();
    }
  }
}
</script>

<style scoped>

</style>
