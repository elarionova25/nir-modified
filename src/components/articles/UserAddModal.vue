<template>
    <div>
      <transition name="modal-fade">
        <div class="modal-backdrop">
          <div class="modal-user">
            <header class="modal-header">
              <slot name="header">
                <h2>Пожалуйста, введите ФИО</h2>
              </slot>
            </header>
            <body class="modal-body">
            <div class="mb-2 mt-2">
              <b-form-input v-model="userFio"/>
            </div>
            <div class="mt-4">
              <b-button
                variant="primary"
                @click="addUser"
              >
                Отправить
              </b-button>
            </div>
            </body>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
import {supabase} from '../../lib/supabaseClient';

export default {
  name: 'UserAddModal',
  props: {
    isModified: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    userFio: null
  }),
  methods: {
    close () {
      this.$emit('on-close');
    },

    async addUser() {
      let user = {
        fio: this.userFio,
        loggined_in: new Date(),
        is_modified: this.isModified
      }
      let createdUser = null;
      try {
        createdUser = await supabase.from('users').insert(user).select();
      } catch (e) {
        console.log(e);
      }
      // let createdUser = await supabase.from('users').insert(user).select();
      localStorage.setItem('user_id', createdUser.data[0].id);
      this.close();
    }
  }
}
</script>

<style scoped>

</style>
