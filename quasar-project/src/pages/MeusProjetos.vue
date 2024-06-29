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
              <q-btn flat color="info" label="Visualizar" @click="viewProject(project)" />
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

    <q-dialog v-model="viewProjectDialog" full-width>
      <q-card>
        <q-card-section>
          <div class="text-h6">Detalhes do Projeto</div>
        </q-card-section>
        <q-card-section v-if="selectedProject">
          <div class="text-h5 q-mb-md">{{ selectedProject.nome }}</div>
          <q-chip :color="getProjectTypeColor(selectedProject.tipoProjeto)" text-color="white">
            {{ selectedProject.tipoProjeto }}
          </q-chip>
          <p class="q-mt-md">{{ selectedProject.descricao }}</p>

          <div class="text-h6 q-mt-lg">Plantas do Projeto</div>
          <q-btn color="primary" icon="add" label="Adicionar Plantas" @click="openAddPlantsDialog" class="q-mb-md" />
          <div v-if="projectPlants.length" class="row q-col-gutter-md q-mt-md">
            <div v-for="plantaProj in projectPlants" :key="plantaProj.id" class="col-12 col-sm-6 col-md-4">
              <q-card>
                <q-card-section>
                  <div class="row items-center justify-between">
                    <div>
                      <div class="text-h6">{{ plantaProj.planta.nome }}</div>
                      <div class="text-subtitle2">{{ plantaProj.planta.nome_cientifico }}</div>
                    </div>
                    <q-btn
                      flat
                      round
                      color="negative"
                      icon="remove_circle"
                      @click="confirmRemovePlant(plantaProj)"
                    >
                      <q-tooltip>Remover planta do projeto</q-tooltip>
                    </q-btn>
                  </div>
                </q-card-section>
                <q-card-section>
                  <p>{{ plantaProj.planta.descricao }}</p>
                  <p><strong>Origem:</strong> {{ plantaProj.planta.origem }}</p>
                  <p><strong>Cuidados:</strong> {{ plantaProj.planta.cuidados }}</p>
                  <p><strong>Categoria:</strong> {{ plantaProj.planta.categoria }}</p>
                </q-card-section>
              </q-card>
            </div>
          </div>
          <div v-else class="text-center q-mt-md">
            Nenhuma planta associada a este projeto.
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Fechar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Edit Project Dialog -->
    <q-dialog v-model="editProjectDialog" persistent>
      <q-card style="min-width: 350px; max-width: 600px; width: 100%;">
        <q-card-section>
          <div class="text-h6">Editar Projeto</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input v-model="editingProject.nome" label="Nome do Projeto" dense />
          <q-input v-model="editingProject.descricao" label="Descrição" type="textarea" dense />
          <q-select
            v-model="editingProject.tipoProjeto"
            :options="projectTypesForNewProject"
            label="Tipo de Projeto"
            dense
          />
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup @click="cancelEdit" />
          <q-btn flat label="Salvar" @click="saveEditedProject" />
        </q-card-actions>
      </q-card>
    </q-dialog>

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

    <!-- Confirm Delete Project Dialog -->
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

    <!-- Confirm Remove Plant Dialog -->
    <q-dialog v-model="confirmRemovePlantDialog">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="warning" text-color="white" />
          <span class="q-ml-sm">Tem certeza que deseja remover esta planta do projeto?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Remover" color="negative" @click="removePlant" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Add Plants Dialog -->
    <q-dialog v-model="addPlantsDialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Adicionar Plantas ao Projeto</div>
        </q-card-section>

        <q-card-section>
          <q-select
            v-model="selectedPlantsToAdd"
            :options="availablePlants"
            label="Selecione as plantas"
            multiple
            use-chips
            stack-label
          >
            <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
              <q-item v-bind="itemProps" v-on="itemEvents">
                <q-item-section>
                  <q-item-label>{{ opt.nome }}</q-item-label>
                  <q-item-label caption>{{ opt.nome_cientifico }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-toggle :model-value="selected" @update:model-value="toggleOption(opt)" />
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Adicionar" color="positive" @click="addPlantsToProject" />
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
const viewProjectDialog = ref(false)
const selectedProject = ref(null)
const projectPlants = ref([])
const confirmRemovePlantDialog = ref(false)
const plantToRemove = ref(null)
const user = ref(JSON.parse(localStorage.getItem('userData')))
const isAdmin = computed(() => user.value.user_role === 'ADMIN')
const addPlantsDialog = ref(false)
const selectedPlantsToAdd = ref([])
const availablePlants = ref([])
// Adicione estas variáveis ref
const editProjectDialog = ref(false)
const editingProject = ref({
  idProjeto: null,
  nome: '',
  descricao: '',
  tipoProjeto: ''
})

function openAddPlantsDialog () {
  addPlantsDialog.value = true
  fetchAvailablePlants()
}

async function fetchAvailablePlants () {
  try {
    const token = localStorage.getItem('userToken')
    const response = await api.get('{API_BASE_URL}:8080/planta/get-planta-to-projeto', {
      headers: { Authorization: `Bearer ${token}` }
    })
    availablePlants.value = response.data
  } catch (error) {
    console.error('Error fetching available plants:', error)
    $q.notify({
      color: 'negative',
      message: 'Erro ao carregar plantas disponíveis',
      icon: 'error'
    })
  }
}

async function addPlantsToProject () {
  if (selectedPlantsToAdd.value.length === 0) {
    $q.notify({
      color: 'warning',
      message: 'Selecione pelo menos uma planta para adicionar',
      icon: 'warning'
    })
    return
  }

  try {
    const token = localStorage.getItem('userToken')
    const plantsToAdd = selectedPlantsToAdd.value.map(plant => ({
      idplanta: plant.id,
      idprojeto: selectedProject.value.idProjeto
    }))

    await api.post('{API_BASE_URL}:8080/projeto-planta/adicionar-planta-projeto', plantsToAdd, {
      headers: { Authorization: `Bearer ${token}` }
    })

    $q.notify({
      color: 'positive',
      message: 'Plantas adicionadas ao projeto com sucesso',
      icon: 'check'
    })

    addPlantsDialog.value = false
    selectedPlantsToAdd.value = []
    await fetchProjectPlants(selectedProject.value.idProjeto)
  } catch (error) {
    console.error('Error adding plants to project:', error)
    $q.notify({
      color: 'negative',
      message: 'Erro ao adicionar plantas ao projeto',
      icon: 'error'
    })
  }
}

// Modifique a função editProject
function editProject (project) {
  editingProject.value = { ...project }
  editProjectDialog.value = true
}

function confirmRemovePlant (plantaProj) {
  plantToRemove.value = plantaProj
  confirmRemovePlantDialog.value = true
}

async function viewProject (project) {
  selectedProject.value = project
  viewProjectDialog.value = true
  await fetchProjectPlants(project.idProjeto)
}

async function removePlant () {
  try {
    const token = localStorage.getItem('userToken')
    await api.delete(`{API_BASE_URL}:8080/projeto-planta/remover-planta/${plantToRemove.value.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    // Remover a planta da lista local
    projectPlants.value = projectPlants.value.filter(p => p.id !== plantToRemove.value.id)

    $q.notify({
      color: 'positive',
      message: 'Planta removida do projeto com sucesso',
      icon: 'check'
    })
  } catch (error) {
    console.error('Error removing plant from project:', error)
    $q.notify({
      color: 'negative',
      message: 'Erro ao remover planta do projeto',
      icon: 'error'
    })
  } finally {
    plantToRemove.value = null
  }
}

// Adicione estas novas funções
function cancelEdit () {
  editProjectDialog.value = false
  editingProject.value = {
    idProjeto: null,
    nome: '',
    descricao: '',
    tipoProjeto: ''
  }
}

async function fetchProjectPlants (projectId) {
  try {
    const token = localStorage.getItem('userToken')
    const response = await api.get(`{API_BASE_URL}:8080/projeto-planta/minhas-plantas/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    projectPlants.value = response.data
  } catch (error) {
    console.error('Error fetching project plants:', error)
    $q.notify({
      color: 'negative',
      message: 'Erro ao carregar plantas do projeto',
      icon: 'error'
    })
  }
}

async function saveEditedProject () {
  // Validação de campos
  if (!editingProject.value.nome || !editingProject.value.descricao || !editingProject.value.tipoProjeto) {
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
      ...editingProject.value,
      tipoProjeto: editingProject.value.tipoProjeto.value || editingProject.value.tipoProjeto
    }

    await api.put(`{API_BASE_URL}:8080/projeto/editar/${editingProject.value.idProjeto}`, projectData, {
      headers: { Authorization: `Bearer ${token}` }
    })

    $q.notify({
      color: 'positive',
      message: 'Projeto atualizado com sucesso',
      icon: 'check'
    })

    editProjectDialog.value = false
    await fetchProjects()
  } catch (error) {
    console.error('Error updating project:', error.response ? error.response.data : error)
    $q.notify({
      color: 'negative',
      message: 'Erro ao atualizar projeto: ' + (error.response?.data?.message || error.message),
      icon: 'error'
    })
  }
}

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
      ? '{API_BASE_URL}:8080/projeto/projetos'
      : `{API_BASE_URL}:8080/projeto/usuario/${user.value.id}`

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
    await api.post('{API_BASE_URL}:8080/projeto/criar', projectData, {
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

function confirmDeleteProject (project) {
  projectToDelete.value = project
  confirmDelete.value = true
}

async function deleteProject () {
  try {
    const token = localStorage.getItem('userToken')
    await api.delete(`{API_BASE_URL}:8080/projeto/${projectToDelete.value.idProjeto}`, {
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
