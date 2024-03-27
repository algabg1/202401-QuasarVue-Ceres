<template>
  <q-page padding>
    <q-table
      title="Treats"
      :rows="posts"
      :columns="columns"
      row-key="name"
    />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { api } from 'boot/axios'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    // as linhas são os conteúdos, os dados de retorno
    const posts = ref([])

    // as colunas são os identificadores do json
    const columns = [
      { name: 'id', field: 'id', label: 'ID', sortable: true, align: 'left' },
      { name: 'title', field: 'title', label: 'TITLE', sortable: true, align: 'left' },
      { name: 'views', field: 'views', label: 'VIEWS', sortable: true, align: 'left' }
    ]

    const getPosts = async () => {
      try {
        const response = api.get('')
      } catch (error) {
        
      }
    }

    return {
      posts,
      columns
    }
  }
})
</script>
