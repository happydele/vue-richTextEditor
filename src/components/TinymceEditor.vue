<template>
  <div class="TinyMCE">
    <!-- 封装TinyMCE组件 -->
    <editor
      v-model="tinymceHtml"
      :id="id"
      api-key="no-api-key"
      :disabled="disabled"
      :init="editorInit"
      output-format="html"
      @onChange="handleChange"
    />
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
  props: {
    id: {
      type: String,
      default: 'tinymceEditor'
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 编辑器初始化配置
      editorInit: {
        selector: '#tinymce', // 容器
        language_url: '/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/tinymce/skins/ui/oxide', // 主题
        height: 300,
        plugins: 'link lists image code table wordcount', // 用到的插件：链接、列表、图片、代码块、表格、字数
        toolbar: 'undo redo | bold italic underline strikethrough | formatselect fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | link unlink table image | removeformat',
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
        // 工具栏
        images_upload_base_path: 'http://admin.secminddev.com', // 上传图片基础路径
        images_upload_url: '/api/dfs/resourceinfo/webUpload', // 上传图片地址
        // images_upload_handler: (blobInfo, success, failure) => { // 图片上传
        //   console.log(blobInfo, success, failure, '上传图片====--==-')
        //   const img = `data:${blobInfo.blob().type};base64,${blobInfo.base64()}`
        //   success(img)
        //   // this.handleImgUpload(blobInfo, success, failure)
        // },
        statusbar: true, // 底部的状态栏
        menubar: false, // 最上方的菜单
        branding: false, // 水印“Powered by TinyMCE”
        max_height: 500,
        min_height: 300
      }
    }
  },
  computed: {
    tinymceHtml: () => {
      return this.value
    }
  },
  mounted () {
    tinymce.init({})
  },
  methods: {
    handleChange (e, editor) {
      console.log(e, editor, '===change事件')
      this.$emit('editorChange', e, editor)
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
