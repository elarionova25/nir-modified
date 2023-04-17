<template>
  <div class="m-4" style="display:flex; justify-content: center">
    <div>
      <b-button class="mr-1" size="sm" variant="link" :to="{path: '/', name: 'feed'}">
        <b-icon-caret-left />
        Назад
      </b-button>
    </div>
    <div class="mt-5" style="width: 50%;">
      <h2 class="nav__title mb-3">Добавление статьи</h2>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          id="input-group-1"
          label="ID статьи:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.feed.id"
            placeholder="Введите ID"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-1"
          label="Название статьи:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.feed.title"
            placeholder="Введите название"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Изображение:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.feed.image"
            placeholder="Вставьте ссылку на изображение"
            required
          ></b-form-input>
        </b-form-group>
        <b-img v-if="form.feed.image" :src="form.feed.image" class="mb-2" style="width: 30%"></b-img>

        <b-form-group id="input-group-2" label="Текст статьи:" label-for="input-2">
          <b-form-textarea
            id="textarea"
            v-model="form.post.content"
            placeholder="Введите текст статьи"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>

        <b-button type="submit" variant="primary">Добавить</b-button>
        <b-button type="reset" variant="danger">Сбросить</b-button>
      </b-form>
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form.feed }}</pre>
        <pre class="m-0">{{ form.post }}</pre>
      </b-card>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AddArticle',
  data() {
    return {
      form: {
        feed: {
          title: '',
          image: '',
          published: '',
          author: 'lol',
          id: ''
        },
        post: {
          content: ''
        }
      },
      show: true
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset(event) {
      event.preventDefault()
      this.form.feed.title = ''
      this.form.feed.image = ''
      this.form.feed.published = ''
      this.form.feed.author = 'lol'
      this.form.feed.id = ''
      this.form.post.content = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style scoped>

</style>
