<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          Ceres Botânica
        </q-toolbar-title>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          Menu
        </q-item-label>

        <EssentialLink
          v-for="link in filteredLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

defineOptions({
  name: 'MainLayout'
})

const linksList = [
  {
    title: 'Home',
    caption: '',
    icon: 'home',
    route: { name: 'home' }
  },
  {
    title: 'Notícias',
    caption: '',
    icon: 'article',
    route: { name: 'noticias' }
  },
  {
    title: 'Sobre nós',
    caption: '',
    icon: 'local_florist',
    route: { name: 'sobrenos' }
  },
  {
    title: 'Entrar',
    caption: '',
    icon: 'person',
    route: { name: 'entrar' }
  },
  {
    title: 'Perfil',
    caption: '',
    icon: 'person_outline',
    route: { name: 'profile' },
    requiresAuth: true
  },
  {
    title: 'Projetos',
    caption: '',
    icon: 'person_outline',
    route: { name: 'cadastrar-projeto' },
    requiresAuth: true
  },
  {
    title: 'Meus projetos',
    caption: '',
    icon: 'person_outline',
    route: { name: '' },
    requiresAuth: true
  }
]

const leftDrawerOpen = ref(false)

const filteredLinks = computed(() => {
  const isAuthenticated = !!localStorage.getItem('userToken')
  return linksList.filter(link =>
    (!link.requiresAuth || isAuthenticated) &&
    (link.title !== 'Entrar' || !isAuthenticated)
  )
})

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
