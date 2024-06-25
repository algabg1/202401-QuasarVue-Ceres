<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <h2 class="text-h4 q-mb-md">Plantas Cadastradas</h2>
      </div>
      <div class="col-12 col-md-6">
        <q-input v-model="searchTerm" label="Pesquisar plantas" dense>
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="col-12 col-md-6">
        <q-select
          v-model="selectedCategory"
          :options="categorias"
          label="Filtrar por categoria"
          dense
          emit-value
          map-options
        >
          <template v-slot:prepend>
            <q-icon name="filter_list" />
          </template>
        </q-select>
      </div>
      <div v-if="loading" class="col-12 flex flex-center">
        <q-spinner color="primary" size="3em" />
      </div>
      <template v-else-if="filteredPlantas.length">
        <div v-for="planta in filteredPlantas" :key="planta.id" class="col-12 col-sm-6 col-md-4">
          <q-card class="planta-card q-ma-sm">
            <q-card-section class="bg-green-1">
              <div class="row items-center no-wrap">
                <q-icon name="eco" size="2rem" color="green" class="q-mr-md" />
                <div>
                  <div class="text-h6">{{ planta.nome }}</div>
                  <div class="text-subtitle2">{{ planta.nome_cientifico }}</div>
                </div>
              </div>
            </q-card-section>

            <q-card-section class="bg-green-2">
              <div class="row items-center q-gutter-sm">
                <q-chip :color="getCategoryColor(planta.categoria)" text-color="white">
                  {{ planta.categoria }}
                </q-chip>
              </div>
            </q-card-section>

            <q-card-section class="bg-green-1">
              <q-item>
                <q-item-section avatar>
                  <q-icon name="description" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label overline>Descrição</q-item-label>
                  <q-item-label caption>{{ planta.descricao.substring(0, 100) }}...</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat color="primary" label="Visualizar" @click="visualizarPlanta(planta)" />
              <q-btn v-if="isAdmin" flat color="secondary" label="Editar" @click="editarPlanta(planta)" />
              <q-btn v-if="isAdmin" flat color="negative" label="Excluir" @click="confirmarExclusao(planta)" />
            </q-card-actions>
          </q-card>
        </div>
      </template>
      <div v-else class="col-12 text-center">
        <p>Nenhuma planta encontrada.</p>
      </div>
    </div>

    <q-dialog v-model="visualizarDialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="bg-green-2 text-white">
          <div class="text-h6">{{ plantaSelecionada.nome }}</div>
          <div class="text-subtitle2">{{ plantaSelecionada.nome_cientifico }}</div>
        </q-card-section>

        <q-card-section class="bg-blue-1 q-pa-md">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6">
              <q-item class="bg-yellow-1 rounded-borders q-mb-sm">
                <q-item-section avatar>
                  <q-icon name="category" color="orange" />
                </q-item-section>
                <q-item-section>
                  <q-item-label overline>Categoria</q-item-label>
                  <q-item-label class="text-weight-bold">{{ plantaSelecionada.categoria }}</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-12 col-sm-6">
              <q-item class="bg-red-1 rounded-borders q-mb-sm">
                <q-item-section avatar>
                  <q-icon name="event" color="red" />
                </q-item-section>
                <q-item-section>
                  <q-item-label overline>Data de Registro</q-item-label>
                  <q-item-label class="text-weight-bold">{{ formatDate(plantaSelecionada.dataregistro) }}</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-12">
              <q-item class="bg-green-1 rounded-borders q-mb-sm">
                <q-item-section avatar>
                  <q-icon name="description" color="green" />
                </q-item-section>
                <q-item-section>
                  <q-item-label overline>Descrição</q-item-label>
                  <q-item-label class="text-weight-medium">{{ plantaSelecionada.descricao }}</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-12">
              <q-item class="bg-purple-1 rounded-borders q-mb-sm">
                <q-item-section avatar>
                  <q-icon name="place" color="purple" />
                </q-item-section>
                <q-item-section>
                  <q-item-label overline>Origem</q-item-label>
                  <q-item-label class="text-weight-medium">{{ plantaSelecionada.origem }}</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-12">
              <q-item class="bg-blue-1 rounded-borders">
                <q-item-section avatar>
                  <q-icon name="spa" color="blue" />
                </q-item-section>
                <q-item-section>
                  <q-item-label overline>Cuidados</q-item-label>
                  <q-item-label class="text-weight-medium">{{ plantaSelecionada.cuidados }}</q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-black">
          <q-btn flat label="Fechar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Diálogo de Confirmação de Exclusão -->
    <q-dialog v-model="confirmarExclusaoDialog">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="negative" text-color="white" />
          <span class="q-ml-sm">Tem certeza que deseja excluir esta planta?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Excluir" color="negative" @click="excluirPlanta" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
// eslint-disable-next-line import/no-duplicates
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
// eslint-disable-next-line import/no-duplicates
import { date } from 'quasar'

const $q = useQuasar()
const plantas = ref([])
const loading = ref(true)
const searchTerm = ref('')
const selectedCategory = ref(null)
const visualizarDialog = ref(false)
const confirmarExclusaoDialog = ref(false)
const plantaSelecionada = ref({})

const user = ref(JSON.parse(localStorage.getItem('userData')))
const isAdmin = computed(() => user.value.user_role === 'ADMIN')

const categorias = [
  { label: 'Todas', value: null },
  { label: 'Briófita', value: 'BRIOFITA' },
  { label: 'Pteridófita', value: 'PTERIDOFITA' },
  { label: 'Gimnosperma', value: 'GIMNOSPERMA' },
  { label: 'Angiosperma', value: 'ANGIOSPERMA' },
  { label: 'Herbácea', value: 'HERBACEA' },
  { label: 'Arbusto', value: 'ARBUSTO' },
  { label: 'Árvore', value: 'ARVORE' },
  { label: 'Trepadeira', value: 'TREPADEIRA' },
  { label: 'Suculenta', value: 'SUCULENTA' },
  { label: 'Cacto', value: 'CACTO' },
  { label: 'Orquídea', value: 'ORQUIDEA' },
  { label: 'Bromélia', value: 'BROMELIA' },
  { label: 'Aerófita', value: 'AEROFITA' },
  { label: 'Hidrófita', value: 'HIDROFITA' },
  { label: 'Xerófita', value: 'XEROFITA' },
  { label: 'Litófita', value: 'LITOFITA' },
  { label: 'Epífita', value: 'EPIFITA' },
  { label: 'Campestre', value: 'CAMPESTRE' },
  { label: 'Ripícola', value: 'RIPICOLA' },
  { label: 'Parasita', value: 'PARASITA' },
  { label: 'Carnívora', value: 'CARNIVORA' },
  { label: 'Aquática', value: 'AQUATICA' },
  { label: 'Lagunar', value: 'LAGUNAR' },
  { label: 'Florestal', value: 'FLORESTAL' },
  { label: 'Camponesa', value: 'CAMPONESA' }
]

const filteredPlantas = computed(() => {
  return plantas.value.filter(planta => {
    const matchesSearch = planta.nome.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                          planta.nome_cientifico.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesCategory = !selectedCategory.value || planta.categoria === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

onMounted(async () => {
  await fetchPlantas()
})

async function fetchPlantas () {
  try {
    const token = localStorage.getItem('userToken')
    const response = await api.get('http://54.82.62.218:8080/planta/plantas', {
      headers: { Authorization: `Bearer ${token}` }
    })
    plantas.value = response.data
  } catch (error) {
    console.error('Erro ao carregar plantas:', error)
    $q.notify({
      color: 'negative',
      message: 'Erro ao carregar plantas',
      icon: 'error'
    })
  } finally {
    loading.value = false
  }
}

function getCategoryColor (category) {
  const colors = {
    BRIOFITA: 'light-green',
    PTERIDOFITA: 'green',
    GIMNOSPERMA: 'teal',
    ANGIOSPERMA: 'lime',
    HERBACEA: 'light-green-5',
    ARBUSTO: 'green-6',
    ARVORE: 'green-9',
    TREPADEIRA: 'light-green-3',
    SUCULENTA: 'cyan',
    CACTO: 'green-10',
    ORQUIDEA: 'pink',
    BROMELIA: 'deep-orange',
    AEROFITA: 'blue-2',
    HIDROFITA: 'blue',
    XEROFITA: 'amber',
    LITOFITA: 'brown',
    EPIFITA: 'light-blue',
    CAMPESTRE: 'light-green-6',
    RIPICOLA: 'cyan-8',
    PARASITA: 'red',
    CARNIVORA: 'purple',
    AQUATICA: 'blue-5',
    LAGUNAR: 'indigo',
    FLORESTAL: 'green-8',
    CAMPONESA: 'amber-8'
  }
  return colors[category] || 'grey'
}

function visualizarPlanta (planta) {
  plantaSelecionada.value = planta
  visualizarDialog.value = true
}

function editarPlanta (planta) {
  // Implementar a lógica de edição
  console.log('Editar planta:', planta)
}

function confirmarExclusao (planta) {
  plantaSelecionada.value = planta
  confirmarExclusaoDialog.value = true
}

async function excluirPlanta () {
  try {
    const token = localStorage.getItem('userToken')
    await api.delete(`http://54.82.62.218:8080/planta/${plantaSelecionada.value.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    $q.notify({
      color: 'positive',
      message: 'Planta excluída com sucesso',
      icon: 'check'
    })
    await fetchPlantas()
  } catch (error) {
    console.error('Erro ao excluir planta:', error)
    $q.notify({
      color: 'negative',
      message: 'Erro ao excluir planta',
      icon: 'error'
    })
  }
}

function formatDate (dateString) {
  return date.formatDate(dateString, 'DD/MM/YYYY')
}
</script>

<style scoped>
.planta-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s;
}

.planta-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.planta-card .q-card__section {
  padding: 12px;
}

.planta-card .q-item {
  padding: 8px 0;
}

.planta-card .q-card__section:nth-child(2) {
  flex-grow: 1;
}
.q-item {
  transition: all 0.3s ease;
}

.q-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

/* Estilos para garantir contraste de texto */
.bg-yellow-1, .bg-red-1, .bg-green-1, .bg-purple-1, .bg-blue-1 {
  color: rgba(0, 0, 0, 0.87); /* Texto escuro para fundos claros */
}

.text-weight-bold, .text-weight-medium {
  color: rgba(0, 0, 0, 0.87); /* Garante que o texto seja sempre legível */
}

.q-item-label.overline {
  color: rgba(0, 0, 0, 0.6); /* Cor mais clara para o texto overline */
}
</style>
