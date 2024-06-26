<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <h2 class="text-h4 q-mb-md">{{ isAdmin ? 'Todos os Projetos' : 'Meus Projetos' }}</h2>
      </div>
      <div class="col-12 col-md-6">
        <q-input v-model="searchTerm" label="Pesquisar projetos" dense>
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="col-12 col-md-6">
        <q-select
          v-model="selectedType"
          :options="projectTypes"
          label="Filtrar por tipo"
          dense
          emit-value
          map-options
        >
          <template v-slot:prepend>
            <q-icon name="filter_list" />
          </template>
        </q-select>
      </div>
      <div class="col-12">
        <q-btn color="primary" icon="add" label="Novo Projeto" @click="openNewProjectDialog" />
      </div>
      <div v-if="loading" class="col-12 flex flex-center">
        <q-spinner color="primary" size="3em" />
      </div>
      <template v-else-if="filteredProjects.length">
        <div v-for="project in filteredProjects" :key="project.idProjeto" class="col-12 col-sm-6 col-md-4">
          <q-card class="project-card">
            <q-card-section>
              <div class="text-h6">{{ project.nome }}</div>
              <q-chip :color="getProjectTypeColor(project.tipoProjeto)" text-color="white">
                {{ project.tipoProjeto }}
              </q-chip>
            </q-card-section>
            <q-card-section>
              <p>{{ project.descricao }}</p>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat color="primary" label="Editar" @click="editProject(project)" />
              <q-btn flat color="negative" label="Excluir" @click="confirmDeleteProject(project)" />
            </q-card-actions>
          </q-card>
        </div>
      </template>
      <div v-else class="col-12 text-center">
        <p>Nenhum projeto encontrado.</p>
      </div>
    </div>

    <!-- New Project Dialog -->
    <q-dialog v-model="newProjectDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Novo Projeto</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input v-model="newProject.nome" label="Nome do Projeto" dense />
          <q-input v-model="newProject.descricao" label="Descrição" type="textarea" dense />
          <q-select
            v-model="newProject.tipoProjeto"
            :options="projectTypesForNewProject"
            label="Tipo de Projeto"
            dense
          />
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup @click="resetNewProject" />
          <q-btn flat label="Salvar" @click="saveNewProject" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Confirm Delete Dialog -->
    <q-dialog v-model="confirmDelete">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="negative" text-color="white" />
          <span class="q-ml-sm">Tem certeza que deseja excluir este projeto?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Excluir" color="negative" @click="deleteProject" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

const $q = useQuasar()
const projects = ref([])
const loading = ref(true)
const newProjectDialog = ref(false)
const confirmDelete = ref(false)
const projectToDelete = ref(null)
const searchTerm = ref('')
const selectedType = ref(null)

const user = ref(JSON.parse(localStorage.getItem('userData')))
const isAdmin = computed(() => user.value.user_role === 'ADMIN')

const newProject = ref({
  nome: '',
  descricao: '',
  tipoProjeto: '',
  idUsuario: user.value.id
})

const projectTypes = [
  { label: 'Todos', value: null },
  { label: 'Paisagismo', value: 'PAISAGISMO' },
  { label: 'Horticultura', value: 'HORTICULTURA' },
  { label: 'Horta Orgânica', value: 'HORTA_ORGANICA' },
  { label: 'Jardim de Flores', value: 'JARDIM_FLORES' },
  { label: 'Terrário', value: 'TERRARIO' },
  { label: 'Jardim de Ervas', value: 'JARDIM_ERVAS' },
  { label: 'Hidroponia', value: 'HIDROPONIA' },
  { label: 'Jardim Terapêutico', value: 'JARDIM_TERAPEUTICO' }
]

const projectTypesForNewProject = computed(() =>
  projectTypes.filter(type => type.value !== null)
)

const filteredProjects = computed(() => {
  return projects.value.filter(project => {
    const matchesSearch = project.nome.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                          project.descricao.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesType = !selectedType.value || project.tipoProjeto === selectedType.value
    return matchesSearch && matchesType
  })
})

onMounted(async () => {
  await fetchProjects()
})

async function fetchProjects () {
  try {
    const token = localStorage.getItem('userToken')
    const endpoint = isAdmin.value
      ? 'http://3.81.127.231:8080/projeto/projetos'
      : `http://3.81.127.231:8080/projeto/usuario/${user.value.id}`

    const response = await api.get(endpoint, {
      headers: { Authorization: `Bearer ${token}` }
    })
    projects.value = response.data
  } catch (error) {
    console.error('Error fetching projects:', error)
    $q.notify({
      color: 'negative',
      message: 'Erro ao carregar projetos',
      icon: 'error'
    })
  } finally {
    loading.value = false
  }
}

function getProjectTypeColor (type) {
  const colors = {
    PAISAGISMO: 'green',
    HORTICULTURA: 'orange',
    HORTA_ORGANICA: 'light-green',
    JARDIM_FLORES: 'pink',
    TERRARIO: 'brown',
    JARDIM_ERVAS: 'teal',
    HIDROPONIA: 'blue',
    JARDIM_TERAPEUTICO: 'purple'
  }
  return colors[type] || 'grey'
}

function openNewProjectDialog () {
  resetNewProject()
  newProjectDialog.value = true
}

function resetNewProject () {
  newProject.value = {
    nome: '',
    descricao: '',
    tipoProjeto: '',
    idUsuario: user.value.id
  }
}

async function saveNewProject () {
  // Validação de campos
  if (!newProject.value.nome || !newProject.value.descricao || !newProject.value.tipoProjeto) {
    $q.notify({
      color: 'negative',
      message: 'Todos os campos devem ser preenchidos',
      icon: 'error'
    })
    return
  }

  try {
    const token = localStorage.getItem('userToken')
    const projectData = {
      ...newProject.value,
      tipoProjeto: newProject.value.tipoProjeto.value // Aqui garantimos que apenas o valor seja enviado
    }
    console.log('Project data being sent:', projectData) // Log para depuração
    await api.post('http://3.81.127.231:8080/projeto/criar', projectData, {
      headers: { Authorization: `Bearer ${token}` }
    })
    $q.notify({
      color: 'positive',
      message: 'Projeto criado com sucesso',
      icon: 'check'
    })
    newProjectDialog.value = false
    resetNewProject()
    await fetchProjects()
  } catch (error) {
    console.error('Error creating project:', error.response ? error.response.data : error)
    $q.notify({
      color: 'negative',
      message: 'Erro ao criar projeto: ' + (error.response?.data?.message || error.message),
      icon: 'error'
    })
  }
}

function editProject (project) {
  // Implement edit functionality
  console.log('Edit project:', project)
}

function confirmDeleteProject (project) {
  projectToDelete.value = project
  confirmDelete.value = true
}

async function deleteProject () {
  try {
    const token = localStorage.getItem('userToken')
    await api.delete(`http://3.81.127.231:8080/projeto/${projectToDelete.value.idProjeto}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    $q.notify({
      color: 'positive',
      message: 'Projeto excluído com sucesso',
      icon: 'check'
    })
    await fetchProjects()
  } catch (error) {
    console.error('Error deleting project:', error)
    $q.notify({
      color: 'negative',
      message: 'Erro ao excluir projeto',
      icon: 'error'
    })
  }
}
</script>

<style scoped>
.project-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.project-card .q-card__section:nth-child(2) {
  flex-grow: 1;
}
</style>
