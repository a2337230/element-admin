import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 轻量级工具条
import 'nprogress/nprogress.css'// 轻量级工具条样式
import { getToken } from '@/utils/auth' // 从cookie中获取token
// Ngrogress轻量级web工具条
NProgress.configure({ showSpinner: false })// 轻量级工具条配置

// 权限判断函数
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/auth-redirect']// 没有重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start() // 开始进度条
  if (getToken()) { // 判断是否存在token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // 如果当前页面是仪表盘，每个钩子都不会触发，所以手动处理它
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(res => { // 拉取user_info
          const roles = res.data.roles // 注意:角色必须是一个数组!如:['编辑','发展']
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || '验证失败，请重新登录')
            next({ path: '/' })
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
        // 可删 ↑
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done() // 如果当前页面是登录后不会触发每个钩子，所以手动处理它
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 完成进度条
})
