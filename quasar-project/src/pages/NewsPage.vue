<template>
  <div class="news-page">
    <div class="news-header">
      <h1>Notícias</h1>
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Pesquisar notícias..." />
        <button @click="searchNews">Pesquisar
          <i class="fa fa-search"></i>
        </button>
      </div>
    </div>
    <div class="news-content">
      <div class="news-item" v-for="(news, index) in filteredNews" :key="index">
        <div class="news-image">
          <img src="../imagens/Rosa.jpg" alt="Ceres Botânica Logo" />
        </div>
        <div class="news-text">
          <h2 class="news-title">{{ news.titulo }}</h2>
          <p class="news-date">{{ formatDate(news.dataPostagem) }}</p>
          <div class="news-excerpt">
            <p>{{ news.excerptConteudo }}</p>
          </div>
          <a href="#" class="read-more" @click.prevent="showFullContent(news)">Ler mais</a>
        </div>
      </div>
    </div>
    <div class="news-footer">
      <div class="social-links">
        <a href="#" class="social-link">
          <i class="fab fa-facebook"></i>
        </a>
        <a href="#" class="social-link">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="#" class="social-link">
          <i class="fab fa-instagram"></i>
        </a>
      </div>
    </div>
    <div class="news-modal" v-if="showModal">
      <div class="modal-content">
        <span class="close-button" @click="closeModal">&times;</span>
        <h2>{{ selectedNews.titulo }}</h2>
        <p class="news-date">{{ formatDate(selectedNews.dataPostagem) }}</p>
        <p class="news-content">{{ selectedNews.conteudo }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      newsItems: [],
      searchQuery: '',
      showModal: false,
      selectedNews: null
    }
  },
  created () {
    this.fetchNews()
  },
  computed: {
    filteredNews () {
      if (this.searchQuery.trim() === '') {
        return this.newsItems
      }
      return this.newsItems.filter(news => {
        return news.titulo.toLowerCase().includes(this.searchQuery.toLowerCase())
      })
    }
  },
  methods: {
    async fetchNews () {
      try {
        const response = await axios.get('/api/v1/news')
        this.newsItems = response.data
      } catch (error) {
        console.error('Error fetching news:', error)
      }
    },
    formatDate (dateString) {
      const [datePart, timePart] = dateString.split('T')
      const [year, month, day] = datePart.split('-')
      const [hours, minutes, seconds] = timePart.split(':')

      const date = new Date(year, month - 1, day, hours, minutes, seconds)

      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
      return date.toLocaleString('pt-BR', options)
    },
    searchNews () {
      // Lógica de pesquisa de notícias
    },
    showFullContent (news) {
      this.selectedNews = news
      this.showModal = true
    },
    closeModal () {
      this.showModal = false
      this.selectedNews = null
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.search-bar {
  display: flex;
  align-items: center;
}

.search-bar input {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.search-bar button {
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  margin-left: 8px;
  cursor: pointer;
}

.news-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.news-item {
  display: flex;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.news-image {
  height: 200px;
  width: 300px;
  flex-shrink: 0;
  overflow: hidden;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-text {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.news-title {
  font-size: 18px;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-mask-image: linear-gradient(to right, black 80%, transparent 100%);
  mask-image: linear-gradient(to right, black 80%, transparent 100%);
}

.news-excerpt {
  flex: 1;
  overflow: hidden;
}

.news-excerpt p {
  font-size: 14px;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
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

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

.news-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  max-height: 80vh;
  position: relative;
  overflow-y: auto;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}
</style>
