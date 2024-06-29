<template>
  <div class="news-page">
    <div class="news-header">
      <h1>Notícias da Ceres Botânica</h1>
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Pesquisar notícias..." />
        <button @click="searchNews">
          <i class="fas fa-search"></i> Pesquisar
        </button>
      </div>
    </div>
    <div class="news-content">
      <div class="news-item" v-for="news in filteredNews" :key="news.idNoticia">
        <div class="news-image">
          <img :src="news.imagemUrl || 'src/imagens/Rosa.jpg'" :alt="news.titulo" />
        </div>
        <div class="news-text">
          <h2 class="news-title">{{ news.titulo }}</h2>
          <p class="news-date">{{ formatDate(news.dataPublicacao) }}</p>
          <div class="news-excerpt">
            <p>{{ getExcerpt(news.conteudo) }}</p>
          </div>
          <a href="#" class="read-more" @click.prevent="showFullContent(news)">Ler mais</a>
        </div>
      </div>
    </div>
    <div class="news-footer">
      <div class="social-links">
        <a href="#" class="social-link"><i class="fab fa-facebook"></i></a>
        <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
        <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
      </div>
    </div>
    <div class="news-modal" v-if="showModal" @click.self="closeModal">
      <div class="modal-content">
        <span class="close-button" @click="closeModal">&times;</span>
        <h2>{{ selectedNews.titulo }}</h2>
        <p class="news-content">{{ selectedNews.conteudo }}</p>
        <p class="news-date">{{ formatDate(selectedNews.dataPublicacao) }}</p>
        <div class="comments-section">
          <h3>Comentários</h3>
          <div v-if="selectedNews.comentarios.length">
            <div
              class="comment"
              :class="index % 2 === 0 ? 'light-background' : 'dark-background'"
              v-for="(comment, index) in selectedNews.comentarios"
              :key="comment.idcomentario"
            >
              <p class="comment-author">{{ comment.nomeUsuario }}</p>
              <p>{{ comment.conteudo }}</p>
            </div>
          </div>
          <div v-else>
            <p>Seja o primeiro a comentar!</p>
          </div>
          <div v-if="isUserLoggedIn">
            <textarea v-model="newComment" placeholder="Adicione um comentário"></textarea>
            <button @click="addComment">Comentar</button>
          </div>
          <div v-else>
            <p>Você precisa estar logado para comentar.</p>
          </div>
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
      newsItems: [],
      searchQuery: '',
      showModal: false,
      selectedNews: null,
      newComment: '',
      isUserLoggedIn: false,
      userToken: ''
    }
  },
  created () {
    this.fetchNews()
    this.checkUserLoggedIn()
  },
  computed: {
    filteredNews () {
      if (this.searchQuery.trim() === '') {
        return this.newsItems
      }
      return this.newsItems.filter(news =>
        news.titulo.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  },
  methods: {
    async fetchNews () {
      try {
        const response = await axios.get('{API_BASE_URL}:8080/noticia/noticias')
        this.newsItems = response.data
      } catch (error) {
        console.error('Erro ao buscar notícias:', error)
      }
    },
    formatDate (dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
      return new Date(dateString).toLocaleDateString('pt-BR', options)
    },
    getExcerpt (content) {
      return content.length > 150 ? content.slice(0, 150) + '...' : content
    },
    searchNews () {
      // A pesquisa é feita automaticamente pelo computed property filteredNews
    },
    showFullContent (news) {
      this.selectedNews = news
      this.showModal = true
    },
    closeModal () {
      this.showModal = false
      this.selectedNews = null
      this.newComment = ''
    },
    checkUserLoggedIn () {
      const token = localStorage.getItem('userToken')
      this.isUserLoggedIn = !!token
      if (token) {
        this.userToken = token
        // eslint-disable-next-line dot-notation
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
    },
    async addComment () {
      if (this.newComment.trim() === '') {
        return
      }
      try {
        const userData = JSON.parse(localStorage.getItem('userData'))
        const response = await axios.post('{API_BASE_URL}:8080/comentario/adicionar', {
          idUsuario: userData.id,
          idNoticia: this.selectedNews.idNoticia,
          conteudo: this.newComment
        }, {
          headers: {
            // eslint-disable-next-line quote-props
            'Authorization': `Bearer ${this.userToken}`
          }
        })
        const newComment = {
          ...response.data,
          nomeUsuario: userData.nome,
          conteudo: this.newComment
        }
        this.selectedNews.comentarios.push(newComment)
        this.newComment = ''
      } catch (error) {
        console.error('Erro ao adicionar comentário:', error)
      }
    }
  }
}
</script>

<style scoped>
.news-page {
  background-color: #f0f0f0;
  padding: 40px;
  font-family: Arial, sans-serif;
}

.news-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.news-header h1 {
  color: #333;
  font-size: 2.5em;
}

.search-bar {
  display: flex;
  align-items: center;
}

.search-bar input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 250px;
}

.search-bar button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  margin-left: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.news-content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.news-item {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.news-item:hover {
  transform: translateY(-5px);
}

.news-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.news-text {
  padding: 20px;
}

.news-title {
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #333;
}

.news-date {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 10px;
}

.news-excerpt p {
  font-size: 1em;
  color: #444;
  line-height: 1.6;
}

.read-more {
  display: inline-block;
  margin-top: 15px;
  color: #4caf50;
  text-decoration: none;
  font-weight: bold;
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
  transition: color 0.3s ease;
}

.social-link:hover {
  color: #45a049;
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
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  color: #666;
  cursor: pointer;
}

.comments-section {
  margin-top: 30px;
}

.comments-section h3 {
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #333;
}

.comment {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
}

.comment-author {
  font-weight: bold;
  margin-bottom: 5px;
}

.light-background {
  background-color: #f9f9f9;
}

.dark-background {
  background-color: #ececec;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  margin-top: 10px;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 10px;
}
</style>
