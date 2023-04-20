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
  methods: {
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
        console.log(localStorage.getItem('user_id'));
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
