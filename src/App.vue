<template>
  <router-view id="app"/>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    if (localStorage.getItem('user_id') === null) {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss">
@import './sass/app';
//@import '../node_modules/bootstrap/dist/css/bootstrap.css';
//@import '../node_modules/bootstrap-vue/src/components/modal/index.scss';
@import '../node_modules/bootstrap/dist/css/bootstrap.css';
@import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
</style>
