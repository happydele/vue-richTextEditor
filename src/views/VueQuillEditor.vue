<template>
  <div class="VueQuillEditor">
    <!-- 富文本编辑器：基于quill，适用于vue -->
    <quill-editor
      ref="myQuillEditor"
      v-model="content"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      @change="onEditorRChange($event)"
      class="editor"
    />

    <!-- 预览 -->
    <div class="preview">{{ contentHtml ? contentHtml : '预览html结构' }}</div>

  </div>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor, Quill } from 'vue-quill-editor'
// 增强模块：提供图片上传到服务器的功能+复制插入+拖拽插入+显示上传进度+显示上传成功或者失败
import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module'
// 增强模块：调整图片大小
import ImageResize from 'quill-image-resize-module'

Quill.register('modules/ImageExtend', ImageExtend)
Quill.register('modules/ImageResize', ImageResize)

export default {
  name: 'VueQuillEditor',
  components: {
    quillEditor
  },
  data () {
    return {
      content: '',
      // 富文本框参数设置
      editorOption: {
        modules: {
          ImageExtend: { // 如果不作设置，即{}  则依然开启复制粘贴功能且以base64插入
            name: 'img', // 图片参数名
            size: 3, // 可选参数 图片大小，单位为M，1M = 1024kb
            action: '', // 服务器地址, 如果action为空，则采用base64插入图片
            // response 为一个函数用来获取服务器返回的具体图片地址
            // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}} 则 return res.data.url
            response: (res) => {
              return res.info
            },
            headers: (xhr) => {
              // xhr.setRequestHeader('myHeader','myValue')
            }, // 可选参数 设置请求头部
            sizeError: () => {}, // 图片超过大小的回调
            start: () => {}, // 可选参数 自定义开始上传触发事件
            end: () => {}, // 可选参数 自定义上传结束触发的事件，无论成功或者失败
            error: () => {}, // 可选参数 上传失败触发的事件
            success: () => {}, // 可选参数  上传成功触发的事件
            change: (xhr, formData) => {
              // xhr.setRequestHeader('myHeader','myValue')
              // formData.append('token', 'myToken')
            } // 可选参数 每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
          },
          toolbar: { // 如果不上传图片到服务器，此处不必配置
            container: container, // container为工具栏，此次引入了全部工具栏，也可自行配置
            handlers: {
              image: function () { // 劫持原来的图片点击按钮事件
                QuillWatch.emit(this.quill.id)
              }
            }
          },
          ImageResize: true
        },
        placeholder: 'Compose an epic...', // 占位符文字
        readOnly: false // 是否设置为只读模式
      },
      contentHtml: '' // 预览
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted () {
    console.log('this is current quill instance object', this.editor)
  },
  methods: {
    onEditorBlur (quill) {
      console.log('editor blur!===', quill)
    },
    onEditorFocus (quill) {
      console.log('editor focus!---', quill)
    },
    onEditorReady (quill) {
      console.log('editor ready!###', quill)
    },
    onEditorRChange (quill) {
      console.log('editor Change!***', quill)
      this.contentHtml = quill.html
    }
  }
}
</script>

<style lang="less" scoped>
.VueQuillEditor{
  .title{
    margin-bottom: 10px;
  }
  .quill-editor{
    width: 85%;
    margin: 0 auto;
  }
  .editor {
    /deep/.ql-container{
      height: 300px!important;
    }
  }

  .preview{
    width: 85%;
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
    margin: 25px auto;
    border: 1px solid #ccc;
    padding: 8px;
    word-wrap: break-word;
  }

  // 汉化
  /deep/.ql-snow .ql-tooltip[data-mode=link]::before {
    content: "请输入链接地址:";
  }
  /deep/.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: '保存';
    padding-right: 0px;
  }

  /deep/.ql-snow .ql-tooltip[data-mode=video]::before {
    content: "请输入视频地址:";
  }

  /deep/.ql-snow .ql-picker.ql-size .ql-picker-label::before,
  /deep/.ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: '14px';
  }
  /deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
  /deep/.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
    content: '10px';
  }
  /deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
  /deep/.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
    content: '18px';
  }
  /deep/.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
  /deep/.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
    content: '32px';
  }

  /deep/.ql-snow .ql-picker.ql-header .ql-picker-label::before,
  /deep/.ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: '文本';
  }
  /deep/.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  /deep/.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: '标题1';
  }
  /deep/.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  /deep/.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: '标题2';
  }
  /deep/.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  /deep/.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: '标题3';
  }
  /deep/.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  /deep/.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: '标题4';
  }
  /deep/.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  /deep/.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: '标题5';
  }
  /deep/.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  /deep/.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: '标题6';
  }

  /deep/.ql-snow .ql-picker.ql-font .ql-picker-label::before,
  /deep/.ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: '标准字体';
  }
  /deep/.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
  /deep/.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
    content: '衬线字体' !important;
  }
  /deep/.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
  /deep/.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
    content: '等宽字体';
  }
}
</style>
