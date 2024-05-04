<template>
  <div class="landing-page q-pa-md q-gutter-md">
    <!-- Primeiro bloco -->
    <q-page class="q-pa-md">
      <div class="q-gutter-md">
        <div class="left-content">
          <h1 class="text-h3">Bem vindo à Ceres</h1>
          <p>Feito para quem ama plantas</p>
          <q-list separator inset-class="no-border">
            <q-item v-for="(item, index) in items" :key="index">
              <q-item-section>
                <q-item-label>
                  <q-icon name="las la-dot-circle" />
                  {{ item }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-btn @click="criarConta" label="Criar Conta" color="primary" class="q-mt-md" />
        </div>
      </div>
    </q-page>

    <!-- Segundo bloco -->
    <q-page class="q-pa-md">
      <div class="q-gutter-md">
        <q-img src="../imagens/Jiboia.png" basic />
      </div>
    </q-page>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        'Últimas notícias sobre plantas',
        'Gerencie suas plantas',
        'Entenda mais sobre seus cuidados',
        'Crie seu projeto de paisagismo'
      ]
    }
  },
  methods: {
    criarConta () {
      // Adicione aqui a lógica para criar uma conta
    }
  }
}
</script>

<style scoped>
.landing-page {
  display: flex;
  justify-content: center;
  align-items: center;
}

.left-content {
  max-width: 100%;
}

.full-width {
  width: 100%;
}

.q-page {
  flex: 1;
}

.q-img {
  max-width: 100%;
  height: auto;
}

.no-border .q-item--inset {
  border:none;
}
</style>
