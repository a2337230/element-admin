/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: '表格组件',
    icon: 'table'
  },
  children: [
    {
      path: 'dynamic-table',
      component: () => import('@/views/table/dynamicTable/index'),
      name: 'DynamicTable',
      meta: { title: '动态Table' }
    },
    {
      path: 'inline-edit-table',
      component: () => import('@/views/table/inlineEditTable'),
      name: 'InlineEditTable',
      meta: { title: '行内编辑表格' }
    },
    {
      path: 'tree-table',
      component: () => import('@/views/table/treeTable/treeTable'),
      name: 'TreeTableDemo',
      meta: { title: '树形表格' }
    },
    {
      path: 'custom-tree-table',
      component: () => import('@/views/table/treeTable/customTreeTable'),
      name: 'CustomTreeTableDemo',
      meta: { title: '自定义树表' }
    },
    {
      path: 'complex-table',
      component: () => import('@/views/table/complexTable'),
      name: 'ComplexTable',
      meta: { title: '综合表格' }
    }
  ]
}
export default tableRouter
