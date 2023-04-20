<template>
  <div class="col d-flex justify-content-center align-item-center">
      <b-card>
        <div class="row">
          Пожалуйста, введите ФИО
        </div>
        <div class="row">
          <b-form-input v-model="userFio"/>
        </div>
        <div class="row">
          <b-button
            variant="primary"
            @click="addUser"
          >
            Отправить
          </b-button>
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
