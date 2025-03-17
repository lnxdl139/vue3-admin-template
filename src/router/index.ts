import { createRouter, createWebHistory } from 'vue-router'
import { ERole } from '@/constants'
import DefaultLayout from '@/layouts/Default.vue'
import Dashboard from '@/views/dashboard/index.vue'
import AuthLayout from '@/layouts/Auth.vue'
import type { TCustomRouteRecord } from '@/types'
import createAuthGuard from './authGuard'
import preview from '@/views/product/preview.vue'
import List from '@/views/product/list.vue'
import setup from '@/components/icons/setup.vue'
import { markRaw } from 'vue'

export const publicRoutes: TCustomRouteRecord[] = [
  {
    path: '/login',
    component: AuthLayout,
    name: 'login-layout',
    children: [
      {
        path: '',
        component: () => import('@/views/login/index.vue'),
        name: 'login',
        meta: { title: 'Login' },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/error/404.vue'),
  },
  {
    path: '/405',
    component: () => import('@/views/error/500.vue'),
  },
]

export const privateRoutes: TCustomRouteRecord[] = [
  {
    path: '/',
    component: DefaultLayout,
    redirect: '/dashboard',
    name: 'default',
    meta: { layout: true, roles: [ERole.ADMIN, ERole.USER] },
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
        name: 'Dashboard',
        meta: { title: 'Dashboard', roles: [ERole.ADMIN, ERole.USER], icon: markRaw(setup) },
      },
      {
        path: 'users',
        component: Dashboard,
        name: 'users',
        meta: { title: 'Users', roles: [ERole.ADMIN], icon: setup },
        children: [
          {
            path: '',
            name: 'settings',
            meta: { title: 'Settings', roles: [ERole.USER], icon: markRaw(setup) },
            component: Dashboard,
          },
        ],
      },
      {
        path: 'forgot-password',
        component: Dashboard,
        name: 'forgot-password',
        meta: { hidden: true, title: 'Forgot Password', roles: [ERole.USER], auth: false },
      },
      {
        path: 'reset-password',
        component: Dashboard,
        name: 'reset-password',
        meta: { hidden: true, title: 'Reset Password', roles: [ERole.USER], auth: false },
      },
      {
        path: 'products',
        name: 'products',
        redirect: '/',
        meta: { title: 'Products', roles: [ERole.USER, ERole.ADMIN], icon: markRaw(setup) },
        children: [
          {
            path: ':id',
            component: Dashboard,
            name: 'product-detail',
            meta: { hidden: true, title: 'Products', roles: [ERole.USER, ERole.ADMIN] },
          },
          {
            path: '',
            component: List,
            name: 'product-list',
            meta: { title: 'Product Management', roles: [ERole.USER, ERole.ADMIN], icon: markRaw(setup) },
          },
          {
            path: 'preview',
            component: preview,
            name: 'product-detail',
            meta: { title: 'Product Preview', roles: [ERole.USER, ERole.ADMIN], icon: markRaw(setup) },
          },
        ],
      },
      {
        path: 'settings',
        component: Dashboard,
        name: 'settings',
        meta: { title: 'Settings', roles: [ERole.USER], icon: markRaw(setup) },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: publicRoutes,
})

router.beforeEach(createAuthGuard)

export default router
