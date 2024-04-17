<template>
  <q-page class="about-page">
    <div class="about-header">
      <div class="about-header-bg"></div>
      <div class="about-header-content">
        <h1>
          <q-img
            src="../imagens/CeresBotanica.png"
            alt="Ceres Botânica Logo"
            class="about-logo-img"
          />
          Sobre a Ceres Botânica
        </h1>
      </div>
    </div>

    <div class="about-content">
      <div class="about-text">
        <p>
          A Ceres Botânica é uma empresa apaixonada pelo mundo das plantas, dedicada a
          educar e inspirar as pessoas sobre a beleza e os benefícios da natureza.
        </p>
        <p>
          Com uma equipe de especialistas em botânica, oferecemos informações
          detalhadas sobre uma ampla variedade de espécies, cuidados específicos,
          dicas de cultivo sustentável e curiosidades fascinantes sobre o
          maravilhoso reino vegetal.
        </p>
        <p>
          Nosso objetivo é promover um estilo de vida mais conectado com a
          natureza, incentivando o cultivo e a apreciação das plantas em todas as
          suas formas e variedades.
        </p>
      </div>
      <div class="about-image">
        <q-img src="../imagens/Oquidea.jpg" alt="Orquídea" class="about-img-shadow" />
      </div>
    </div>

    <div class="about-footer">
      <p><i class="fas fa-seedling"></i> O projeto Ceres Botânica surgiu em uma aula da faculdade e transformou vidas! <i class="fas fa-seedling"></i></p>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<style lang="scss">
.about-page {
  padding: 40px;

  .about-header {
    position: relative;
    margin-bottom: 40px;

    .about-header-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom, rgba(163, 177, 138, 0.9), rgba(163, 177, 138, 0.6));
      z-index: -1;
      border-radius: 8px;
    }

    .about-header-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      z-index: 1;

      .about-logo {
        max-width: 200px;
        margin-bottom: 20px;
      }

      h1 {
        font-size: 36px;
        font-weight: bold;
        color: #fff;
      }
    }
  }

  .about-content {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;

    .about-text {
      flex: 2;
      margin-right: 40px;

      p {
        font-size: 18px;
        line-height: 1.8;
        margin-bottom: 20px;
        color: #444;
      }
    }

    .about-image {
      flex: 1;
      max-width: 400px;

      img.about-img-shadow {
        width: 100%;
        height: auto;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      }
    }
  }

  .about-footer {
    text-align: center;
    font-size: 18px;
    color: #666;

    i {
      margin: 0 5px;
      font-size: 24px;
      color: #a3b18a;
    }
  }
}
</style>
