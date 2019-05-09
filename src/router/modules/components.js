/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noredirect',
  name: 'ComponentDemo',
  meta: {
    title: 'components',
    icon: 'component'
  },
  children: [
    {
      path: 'tinymce',
      component: () => import('@/views/components-demo/tinymce'),
      name: 'TinymceDemo',
      meta: { title: '富文本编辑器' }
    },
    {
      path: 'avatar-upload',
      component: () => import('@/views/components-demo/avatarUpload'),
      name: 'AvatarUploadDemo',
      meta: { title: '头像上传' }
    },
    {
      path: 'sticky',
      component: () => import('@/views/components-demo/sticky'),
      name: 'StickyDemo',
      meta: { title: '滚屏吸顶' }
    },
    {
      path: 'mixin',
      component: () => import('@/views/components-demo/mixin'),
      name: 'ComponentMixinDemo',
      meta: { title: '小组件' }
    },
    {
      path: 'back-to-top',
      component: () => import('@/views/components-demo/backToTop'),
      name: 'BackToTopDemo',
      meta: { title: '返回顶部' }
    }
  ]
}

export default componentsRouter
