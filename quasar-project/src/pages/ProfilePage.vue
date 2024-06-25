<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div v-if="user">
          <h2>Bem-vindo, {{ user.nome }}!</h2>
          <q-separator />
          <div v-if="user.user_role === 'ADMIN'">
            <h3>Painel de Administrador</h3>
            <p>Você possui permissões de administrador.</p>
            <div class="q-mt-md">
              <q-btn
                color="primary"
                label="Adicionar Planta"
                @click="openAdicionarPlantaDialog"
                class="q-mr-sm"
              />
              <q-btn
                color="secondary"
                label="Criar Notícia"
                @click="openCriarNoticiaDialog"
              />
            </div>
          </div>
          <div v-else>
            <h3>Painel de Usuário</h3>
            <p>Bem-vindo ao seu painel de usuário.</p>
          </div>
        </div>
        <q-btn @click="handleLogout" color="negative" label="Sair" class="q-mt-md" />
      </q-card-section>
    </q-card>

    <!-- Diálogo para Adicionar Planta -->
    <q-dialog v-model="adicionarPlantaDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Adicionar Planta</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input v-model="novaplanta.nome" label="Nome" dense />
          <q-input v-model="novaplanta.nome_cientifico" label="Nome Científico" dense />
          <q-input v-model="novaplanta.descricao" label="Descrição" type="textarea" dense />
          <q-input v-model="novaplanta.origem" label="Origem" dense />
          <q-input v-model="novaplanta.cuidados" label="Cuidados" type="textarea" dense />
          <q-select
            v-model="novaplanta.categoria"
            :options="categorias"
            label="Categoria"
            dense
            options-dense
            emit-value
            map-options
          />
          <q-input v-model="novaplanta.dataregistro" label="Data de Registro" type="date" dense />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Adicionar" @click="adicionarPlanta" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Diálogo para Criar Notícia -->
    <q-dialog v-model="criarNoticiaDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Criar Notícia</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input v-model="noticia.titulo" label="Título" dense />
          <q-input v-model="noticia.conteudo" label="Conteúdo" type="textarea" dense />
          <q-input v-model="noticia.dataPublicacao" label="Data de Publicação" type="date" dense />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Criar" @click="criarNoticia" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const user = ref(null)
const router = useRouter()
const adicionarPlantaDialog = ref(false)
const criarNoticiaDialog = ref(false)

const categorias = [
  { label: 'BRIOFITA', value: 'BRIOFITA' },
  { label: 'PTERIDOFITA', value: 'PTERIDOFITA' },
  { label: 'GIMNOSPERMA', value: 'GIMNOSPERMA' },
  { label: 'ANGIOSPERMA', value: 'ANGIOSPERMA' },
  { label: 'HERBACEA', value: 'HERBACEA' },
  { label: 'ARBUSTO', value: 'ARBUSTO' },
  { label: 'ARVORE', value: 'ARVORE' },
  { label: 'TREPADEIRA', value: 'TREPADEIRA' },
  { label: 'SUCULENTA', value: 'SUCULENTA' },
  { label: 'CACTO', value: 'CACTO' },
  { label: 'ORQUIDEA', value: 'ORQUIDEA' },
  { label: 'BROMELIA', value: 'BROMELIA' },
  { label: 'AEROFITA', value: 'AEROFITA' },
  { label: 'HIDROFITA', value: 'HIDROFITA' },
  { label: 'XEROFITA', value: 'XEROFITA' },
  { label: 'LITOFITA', value: 'LITOFITA' },
  { label: 'EPIFITA', value: 'EPIFITA' },
  { label: 'CAMPESTRE', value: 'CAMPESTRE' },
  { label: 'RIPICOLA', value: 'RIPICOLA' },
  { label: 'PARASITA', value: 'PARASITA' },
  { label: 'CARNIVORA', value: 'CARNIVORA' },
  { label: 'AQUATICA', value: 'AQUATICA' },
  { label: 'LAGUNAR', value: 'LAGUNAR' },
  { label: 'FLORESTAL', value: 'FLORESTAL' },
  { label: 'CAMPONESA', value: 'CAMPONESA' }
]

const novaplanta = ref({
  nome: '',
  nome_cientifico: '',
  descricao: '',
  origem: '',
  cuidados: '',
  dataregistro: '',
  categoria: ''
})

const noticia = ref({
  titulo: '',
  conteudo: '',
  dataPublicacao: '',
  idusuario: JSON.parse(localStorage.getItem('userData')).id
})

onMounted(() => {
  const userData = localStorage.getItem('userData')
  if (!userData) {
    router.push('/login')
  } else {
    user.value = JSON.parse(userData)
  }
})

function handleLogout () {
  localStorage.removeItem('userToken')
  localStorage.removeItem('userData')
  router.push('/home')
  setTimeout(() => {
    window.location.reload()
  }, 100)
}

function openAdicionarPlantaDialog () {
  adicionarPlantaDialog.value = true
}

function openCriarNoticiaDialog () {
  criarNoticiaDialog.value = true
}

async function adicionarPlanta () {
  try {
    const token = localStorage.getItem('userToken')
    const response = await api.post('http://50.16.160.89:8080/planta/criar', novaplanta.value, {
      headers: { Authorization: `Bearer ${token}` }
    })

    if (response.status === 200 || response.status === 201) {
      $q.notify({
        type: 'positive',
        message: 'Planta criada com sucesso!',
        position: 'top'
      })
    } else {
      $q.notify({
        type: 'negative',
        message: 'Não foi possível criar a planta.',
        position: 'top'
      })
    }
  } catch (error) {
    console.error('Erro ao criar planta:', error)
    $q.notify({
      type: 'negative',
      message: 'Não foi possível criar a planta.',
      position: 'top'
    })
  }
}

async function criarNoticia () {
  try {
    const token = localStorage.getItem('userToken')
    const response = await api.post('http://50.16.160.89:8080/noticia/criar', noticia.value, {
      headers: { Authorization: `Bearer ${token}` }
    })

    if (response.status === 200 || response.status === 201) {
      $q.notify({
        type: 'positive',
        message: 'Notícia criada com sucesso!',
        position: 'top'
      })
    } else {
      $q.notify({
        type: 'negative',
        message: 'Não foi possível criar a notícia.',
        position: 'top'
      })
    }
  } catch (error) {
    console.error('Erro ao criar notícia:', error)
    $q.notify({
      type: 'negative',
      message: 'Não foi possível criar a notícia.',
      position: 'top'
    })
  }
}
</script>

<style scoped>
h2, h3 {
  margin: 0;
  padding: 10px 0;
}
</style>
