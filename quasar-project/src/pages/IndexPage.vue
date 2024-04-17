<template>
  <div class="news-page">
    <div class="news-header">
      <h1>Últimas Atualizações</h1>
    </div>

    <div class="news-content">
      <div class="news-item" v-for="news in newsItems" :key="news.id">
        <div class="news-image">
          <img :src="news.image" :alt="news.title">
        </div>
        <div class="news-text">
          <h3>{{ news.title }}</h3>
          <p>{{ news.description }}</p>
          <a :href="news.link" class="read-more">Leia mais</a>
        </div>
      </div>
    </div>

    <div class="news-footer">
      <div class="social-links">
        <a href="#" class="social-link">
          <i class="fab fa-tiktok"></i>
        </a>
        <a href="#" class="social-link">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="#" class="social-link">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="#" class="social-link">
          <i class="fab fa-instagram"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newsItems: [
        {
          id: 1,
          image: '../imagens/Rosa.jpg',
          title: 'Tendências de Paisagismo Urbano: Como as Cidades Estão Integrando Mais Áreas Verdes',
          description: 'A medida que as cidades crescem e se desenvolvem, a necessidade de espaços verdes dentro do ambiente urbano aumenta.',
          link: '#'
        },
        {
          id: 2,
          image: '../imagens/Rosa.jpg',
          title: 'As Melhores Plantas para Purificar o Ar de Sua Casa, Segundo Especialistas',
          description: 'Com o aumento da preocupação com a qualidade do ar em ambientes fechados, muitas pessoas estão recorrendo a plantas...',
          link: '#'
        },
        {
          id: 3,
          image: '../imagens/Rosa.jpg',
          title: 'Cinco Dicas Essenciais para Manter suas Plantas de Interior Saudáveis Durante o Inverno',
          description: 'Com a chegada do inverno, muitos entusiastas de plantas de interior se preocupam em manter seus preciosos vegetais verdes...',
          link: '#'
        },
        {
          id: 4,
          image: '../imagens/Rosa.jpg',
          title: 'Projeto Inovador Transforma Telhados em Jardins Sustentáveis em Áreas Urbanas',
          description: 'Uma iniciativa interessante está transformando telhados em espaços verdes e sustentáveis, trazendo benefícios...',
          link: '#'
        },
        {
          id: 5,
          image: '../imagens/Rosa.jpg',
          title: 'Estudo Revela os Benefícios Psicológicos de Ter Plantas de Interior no Ambiente de Trabalho',
          description: 'Uma pesquisa recente destaca os efeitos positivos que a presença de plantas no local de trabalho pode ter...',
          link: '#'
        }
      ]
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
