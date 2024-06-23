const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'home', name: 'home', component: () => import('pages/IndexPage.vue') },
      { path: 'noticias', name: 'noticias', component: () => import('pages/NewsPage.vue') },
      { path: 'sobrenos', name: 'sobrenos', component: () => import('pages/AboutPage.vue') },
      { path: 'entrar', name: 'entrar', component: () => import('pages/LoginPage.vue') },
      { path: 'profile', name: 'profile', component: () => import('pages/ProfilePage.vue') },
      // { path: 'cadastrar', name: 'cadastrar', component: () => import('pages/CadastrarPage.vue') },
      { path: 'cadastrar', name: 'cadastrar', component: () => import('pages/register/register-view/RegisterView.vue') },
      { path: 'cadastrar-projeto', name: 'cadastrar-projeto', component: () => import('pages/CadastrarProjeto.vue') }
    ]
  },
  // { path: 'cadastrar', name: 'cadastrar', component: () => import('pages/CadastrarPage.vue') }
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
