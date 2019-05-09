<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
    <div :key="key" style="margin-top:30px;">
      <span v-permission="['admin']" class="permission-alert">
        只有
        <el-tag class="permission-tag" size="small">admin</el-tag> 可以看到
      </span>
      <span v-permission="['editor']" class="permission-alert">
        只有
        <el-tag class="permission-tag" size="small">editor</el-tag> 可以看到
      </span>
      <span v-permission="['admin','editor']" class="permission-alert">
        用户
        <el-tag class="permission-tag" size="small">admin</el-tag> 和
        <el-tag class="permission-tag" size="small">editor</el-tag> 都可以看到这里
      </span>
    </div>

    <div :key="'checkPermission'+key" style="margin-top:30px;">
      <code>在某些情况下，不适合使用v-permission，例如只能通过手动设置v-if来实现的element Tab组件。
      </code>
      <el-tabs type="border-card" style="width:500px;">
        <el-tab-pane v-if="checkPermission(['admin'])" label="Admin">Admin 可以看到这里</el-tab-pane>
        <el-tab-pane v-if="checkPermission(['editor'])" label="Editor">Editor can 可以看到这里</el-tab-pane>
        <el-tab-pane v-if="checkPermission(['admin','editor'])" label="Admin-OR-Editor">admin和editor可以看到这里</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import SwitchRoles from './components/SwitchRoles' // 权限切换

export default{
  name: 'DirectivePermission',
  components: { SwitchRoles },
  directives: { permission },
  data() {
    return {
      key: 1 // 为了能每次切换权限的时候重新初始化指令
    }
  },
  methods: {
    // 获取用户权限
    checkPermission,
    // 子组件传过来的权限参数
    handleRolesChange() {
      this.key++
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  /deep/ .permission-alert {
    width: 320px;
    margin-top: 30px;
    background-color: #f0f9eb;
    color: #67c23a;
    padding: 8px 16px;
    border-radius: 4px;
    display: block;
  }
  /deep/ .permission-tag{
    background-color: #ecf5ff;
  }
}
</style>

