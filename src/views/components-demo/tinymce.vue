<template>
  <div class="components-container">
    <div>
      <!-- 富文本编辑器组件 -->
      <tinymce :height="300" v-model="content"/>
    </div>
    <!-- 富文本编辑器生成的内容 -->
    <div class="editor-content" v-html="content"/>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      content: ''
    }
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>

