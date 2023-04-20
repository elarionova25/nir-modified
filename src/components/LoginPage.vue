<template>
  <div class="d-flex align-items-center justify-content-center" style="height: 600px;">
    <b-card border-variant="info" align="center" style="width: 600px;">
      <div class="row mb-2">
        <div class="col">
          <p class="h5">
            Пожалуйста, введите ФИО
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <b-form-input v-model="userFio"/>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <b-button
            :disabled="disabled"
            variant="primary"
            @click="addUser"
          >
            Отправить
          </b-button>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import {supabase} from '../lib/supabaseClient';

export default {
  name: 'LoginPage',
  data: () => ({
    userFio: '',
    isModified: false
  }),
  computed: {
    disabled() {
      return localStorage.getItem('user_id') != null;
    }
  },
  methods: {
    async addUser() {
      let user = {
        fio: this.userFio,
        loggined_in: new Date(),
        is_modified: this.isModified
      }
      try {
        let createdUser = await supabase.from('users')
          .insert(user)
          .select();
        localStorage.setItem('user_id', createdUser.data[0].id);
        await this.$router.push('/')
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>

<style scoped>

</style>
