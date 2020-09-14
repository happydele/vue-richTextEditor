<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Vue-Quill-Editor</router-link> |
      <router-link to="/tinymce">TinyMCE</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
@import './assets/base.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    font-size: 18px;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
