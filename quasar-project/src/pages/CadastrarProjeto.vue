<template>
  <div class="create-project-wrapper">
    <div class="create-project-form">
      <h1>Cadastrar Projeto</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="projectName">Nome do Projeto</label>
          <input type="text" id="projectName" v-model="project.name" required>
        </div>
        <div class="form-group">
          <label for="projectDescription">Descrição do Projeto</label>
          <textarea id="projectDescription" v-model="project.description" required></textarea>
        </div>
        <div class="form-group">
          <label for="projectLocation">Localização do Projeto</label>
          <select id="projectLocation" v-model="project.location" required>
            <option value="" disabled selected>Selecione uma localização</option>
            <option value="Localização 1">Localização 1</option>
            <option value="Localização 2">Localização 2</option>
            <option value="Localização 3">Localização 3</option>
          </select>
        </div>
        <div class="form-group">
          <label for="projectBudget">Orçamento do Projeto</label>
          <input type="number" id="projectBudget" v-model="project.budget" required>
        </div>
        <div class="form-group">
          <label for="projectResponsibles">Responsáveis</label>
          <div class="responsibles-input">
            <input type="text" id="projectResponsibles" v-model="newResponsible" @keyup.enter="addResponsible">
            <button type="button" @click="addResponsible">+</button>
          </div>
          <ul class="responsibles-list">
            <li v-for="(responsible, index) in project.responsibles" :key="index">
              {{ responsible }}
              <button type="button" @click="removeResponsible(index)">-</button>
            </li>
          </ul>
        </div>
        <div class="form-group">
          <label for="projectAttachments">Fotos e Anexos</label>
          <input type="file" id="projectAttachments" accept="image/*, application/pdf" @change="handleFileUpload">
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      project: {
        name: '',
        description: '',
        location: '',
        budget: 0,
        responsibles: [],
        attachments: null
      },
      newResponsible: ''
    }
  },
  methods: {
    submitForm () {
      // Lógica para enviar o formulário
      console.log('Formulário enviado:', this.project)
    },
    handleFileUpload (event) {
      this.project.attachments = event.target.files[0]
      console.log('Anexo carregado:', this.project.attachments)
    },
    addResponsible () {
      if (this.newResponsible.trim() !== '') {
        this.project.responsibles.push(this.newResponsible.trim())
        this.newResponsible = ''
      }
    },
    removeResponsible (index) {
      this.project.responsibles.splice(index, 1)
    }
  }
}
</script>

<style>
.create-project-wrapper {
  background-color: #a3b18a; /* Verde musgo tonalidade pastel */
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.create-project-form {
  background-color: #fff;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 400px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

input[type="text"],
input[type="number"],
textarea,
select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  margin-top: 6px;
}

button[type="submit"] {
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #45a049;
}

.responsibles-input {
  display: flex;
  align-items: center;
}

.responsibles-input input[type="text"] {
  flex: 1;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  margin-top: 6px;
}

.responsibles-input button {
  margin-left: 10px;
  padding: 6px 10px;
  border-radius: 4px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  cursor: pointer;
}

.responsibles-list {
  margin-top: 5px;
  padding-left: 0;
}

.responsibles-list li {
  list-style: none;
  margin-bottom: 5px;
}

.responsibles-list li button {
  margin-left: 5px;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: #ff4c4c; /* Vermelho */
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
