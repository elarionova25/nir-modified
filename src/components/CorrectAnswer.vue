<template>
  <div>
    <transition name="modal-fade">
      <div class="modal-backdrop">
        <div class="modal" style="background-color: #87b687">
          <header class="modal-header">
            <button
              type="button"
              class="btn-close"
              @click="close"
            >
              x
            </button>
          </header>

          <body class="modal-body">
            <div class="mb-2">
              Правильный ответ!
            </div>
          </body>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'CorrectAnswer',
  methods: {
    close() {
      this.$emit('on-close');
    }
  }
}
</script>

<style scoped>

</style>
