<template>
  <div class="news-page">
    <div class="news-header">
      <h1>Últimas Atualizações</h1>
    </div>

    <div class="news-content">
      <div class="news-item" v-for="(user, index) in newsItems" :key="index">
        <div class="user-info">
          <p>Login: {{ user.Id }}</p>
          <p>Senha: {{ user.senha }}</p>
          <button @click="showDetails(index)" class="read-more">Ler +</button>
        </div>
        <div v-if="user.showDetails">
          <!-- Aqui você pode adicionar o conteúdo detalhado -->
          <p>Detalhes: Aqui está o conteúdo detalhado para {{ user.Id }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      newsItems: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      try {
        const response = await axios.get('/api/v1/users')
        this.newsItems = response.data.data
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  }
}
</script>

<style scoped>
.news-page {
  background-color: #f0f0f0;
  padding: 40px;
}

.news-header {
  text-align: center;
  margin-bottom: 30px;
}

.news-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.news-item {
  display: flex;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.news-image {
  flex: 1;
  overflow: hidden;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-text {
  flex: 2;
  padding: 20px;
}

.news-text h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.news-text p {
  font-size: 14px;
  margin-bottom: 15px;
}

.read-more {
  color: #4caf50;
  text-decoration: none;
}

.news-footer {
  margin-top: 40px;
  text-align: center;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.social-link {
  color: #4caf50;
  font-size: 24px;
  text-decoration: none;
}
</style>
