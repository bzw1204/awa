export default [
  {
    name: 'exception',
    path: '/exception',
    meta: {
      title: 'exception',
      order: 7
    },
    children: [
      {
        name: 'NoPermission',
        path: '403',
        component: () => import('@views/components/exception-base.vue'),
        props: () => { return { type: 403 } },
        meta: {
          title: 'NoPermission'
        }
      },
      {
        name: 'NotFound',
        path: '404',
        component: () => import('@views/components/exception-base.vue'),
        props: () => { return { type: 404 } },
        meta: {
          title: 'NotFound'
        }
      },
      {
        name: 'ServiceError',
        path: '500',
        component: () => import('@views/components/exception-base.vue'),
        props: () => { return { type: 500 } },
        meta: {
          title: 'ServiceError'
        }
      }
    ]
  },
  {
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    component: () => import('@views/components/exception-base.vue'),
    props: () => { return { type: 404 } },
    meta: {
      title: 'NotFound',
      constant: true
    }
  }
]
