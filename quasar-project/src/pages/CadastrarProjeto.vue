<template>
  <div class="create-project-wrapper">
    <div class="create-project-form">
      <h1>Cadastrar Projeto</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="projectName">Nome do Projeto</label>
          <input type="text" id="projectName" v-model="project.nome" required>
        </div>
        <div class="form-group">
          <label for="projectDescription">Descrição do Projeto</label>
          <textarea id="projectDescription" v-model="project.descricao" required></textarea>
        </div>
        <div class="form-group">
          <label for="projectType">Tipo de Projeto</label>
          <select id="projectType" v-model="project.tipo_projeto" required>
            <option value="" disabled selected>Selecione o tipo de projeto</option>
            <option value="JARDIM_BORBOLETAS">Jardim de Borboletas</option>
            <option value="HORTICULTURA">Horticultura</option>
            <option value="PAISAGISMO">Paisagismo</option>
            <option value="HIDROPONIA">Hidroponia</option>
            <option value="JARDIM_TERAPEUTICO">Jardim Terapêutico</option>
            <option value="JARDIM_ERVAS">Jardim de Ervas</option>
            <option value="HORTA_ORGANICA">Horta Orgânica</option>
            <option value="TERRARIO">Terrário</option>
            <option value="JARDIM_FLORES">Jardim de Flores</option>
          </select>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      project: {
        nome: '',
        descricao: '',
        tipo_projeto: ''
      }
    }
  },
  methods: {
    async submitForm () {
      const userId = JSON.parse(localStorage.getItem('userData')).id
      const token = localStorage.getItem('userToken')
      const url = 'http://localhost:8080/projeto/criar'

      const projectData = {
        nome: this.project.nome,
        descricao: this.project.descricao,
        idUsuario: userId,
        tipo_projeto: this.project.tipo_projeto
      }

      try {
        const response = await axios.post(url, projectData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })

        if (response.status === 201 || response.status === 200) {
          this.$q.notify({
            color: 'positive',
            message: 'Projeto criado com sucesso!',
            icon: 'check',
            position: 'top',
            timeout: 2000
          })
          this.resetForm()
        } else {
          throw new Error('Resposta inesperada do servidor')
        }
      } catch (error) {
        this.$q.notify({
          color: 'negative',
          message: 'Erro ao criar projeto: ' + (error.response?.data?.message || error.message),
          icon: 'error',
          position: 'top',
          timeout: 2000
        })
      }
    },
    resetForm () {
      this.project.nome = ''
      this.project.descricao = ''
      this.project.tipo_projeto = ''
    }
  }
}
</script>

<style>
.create-project-wrapper {
  background-color: #a3b18a;
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
</style>
