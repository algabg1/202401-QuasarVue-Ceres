const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
      { path: '', name: 'noticias', component: () => import('pages/NewsPage.vue') },
      { path: '', name: 'sobrenos', component: () => import('pages/AboutPage.vue') },
      { path: '', name: 'entrar', component: () => import('pages/LoginPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
