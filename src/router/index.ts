import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: 'menu.dashboard'
        }
      },
      {
        path: '/farms',
        name: 'farms',
        redirect: '/farms/hayes',
        meta: {
          title: 'menu.farmManagement'
        },
        children: [
          {
            path: 'hayes',
            name: 'hayes',
            component: () => import('@/views/farms/index.vue'),
            meta: {
              title: 'menu.hayesFarm'
            }
          },
          {
            path: 't1005',
            name: 't1005',
            component: () => import('@/views/farms/index.vue'),
            meta: {
              title: 'menu.t1005Farm'
            }
          },
          {
            path: 'p2',
            name: 'p2',
            component: () => import('@/views/farms/index.vue'),
            meta: {
              title: 'menu.p2Farm'
            }
          }
        ]
      },
      {
        path: '/tags',
        name: 'tags',
        redirect: '/tags/hayes',
        meta: {
          title: 'menu.tagManagement'
        },
        children: [
          {
            path: 'hayes',
            name: 'hayes-tags',
            component: () => import('@/views/tags/index.vue'),
            meta: {
              title: 'menu.hayesTags'
            }
          },
          {
            path: 't1005',
            name: 't1005-tags',
            component: () => import('@/views/tags/index.vue'),
            meta: {
              title: 'menu.t1005Tags'
            }
          },
          {
            path: 'p2',
            name: 'p2-tags',
            component: () => import('@/views/tags/index.vue'),
            meta: {
              title: 'menu.p2Tags'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: 'system.login'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path !== '/login' && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router 