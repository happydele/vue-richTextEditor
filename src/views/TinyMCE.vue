<template>
  <div class="TinyMCE">
    <!-- TinyMCE：一款易用、且功能强大的所见即所得的富文本编辑器 -->
    <editor
      v-model="tinymceHtml"
      id="tinymce"
      api-key="no-api-key"
      :disabled="editorOptions.disabled"
      :init="editorOptions.editorInit"
      output-format="html"
      @onChange="handleChange"
    />

    <!-- 预览 -->
    <div class="preview">{{ tinymceHtml ? tinymceHtml : '预览html结构' }}</div>

  </div>
</template>

<script>
// 引入组件
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'

import 'tinymce/icons/default/icons' // 解决了icons.js 报错Unexpected token '<'
// 引入富文本编辑器主题的js和css
import 'tinymce/themes/silver/theme.min.js'
import 'tinymce/skins/ui/oxide/skin.min.css'
// 扩展插件
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/image'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/wordcount'

export default {
  name: 'TinyMCE',
  components: {
    Editor
  },
  data () {
    return {
      tinymceHtml: '',
      // 编辑器初始化配置
      editorOptions: {
        disabled: false, // 编辑器是否只读
        editorInit: {
          selector: '#tinymce', // 容器
          language_url: '/tinymce/langs/zh_CN.js',
          language: 'zh_CN',
          skin_url: '/tinymce/skins/ui/oxide', // 主题
          height: 300,
          plugins: 'link lists image code table wordcount', // 用到的插件：链接、列表、图片、代码块、表格、字数
          toolbar: 'undo redo | bold italic underline strikethrough | formatselect fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | link unlink table image | removeformat', // 工具栏
          images_upload_handler: (blobInfo, success, failure) => { // 图片上传
            console.log(blobInfo, success, failure, '上传图片====--==-')
            const img = 'data:image/jpeg;base64,' + blobInfo.base64()
            success(img)
            // this.handleImgUpload(blobInfo, success, failure)
          },
          statusbar: true, // 底部的状态栏
          menubar: false, // 最上方的菜单
          branding: false, // 水印“Powered by TinyMCE”
          max_height: 500,
          min_height: 300
        }
      }
    }
  },
  mounted () {
    tinymce.init({})
  },
  methods: {
    handleChange (e, editor) {
      console.log(e, editor, '===change事件')
    }
    // 图片上传
    // handleImgUpload (blobInfo, success, failure) {
    //   this.baseUrl = process.env.VUE_APP_BASE_URL
    //   const imgBase64 = `data:${blobInfo.blob().type};base64,${blobInfo.base64()}`
    //   const data = { img: [imgBase64] }
    //   uploadImgage (data).then(res => {
    //     // 传入success回调里的数据就是富文本编辑器里插入图片的src的值
    //     success(`${this.baseUrl}/${res.data[0]}`)
    //   }).catch(() => { failure('error') })
    // }
  }
}
</script>

<style lang="less" scoped>
.TinyMCE{
  width: 85%;
  margin: 0 auto;

  .preview{
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
    margin: 25px auto;
    border: 1px solid #ccc;
    padding: 8px;
    word-wrap: break-word;
  }
}
</style>
