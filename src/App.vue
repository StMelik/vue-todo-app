<template>
<div class="container"></div>
  <FormAdd/>
  <AppTitle/>
  <AppFilter/>
  <AppList/>
  <teleport to="body">
    <PopupFilter/>
  </teleport>
</template>

<script>
import FormAdd from './components/FormAdd/FormAdd.vue'
import AppTitle from './components/AppTitle/AppTitle.vue'
import AppFilter from './components/AppFilter/AppFilter.vue'
import AppList from './components/AppList/AppList.vue'
import PopupFilter from './components/PopupFilter/PopupFilter.vue'

export default {
  name: 'App',
  components: {
    FormAdd,
    AppTitle,
    AppFilter,
    AppList,
    PopupFilter
}
}
</script>

<style lang="scss">
@import './constants/colors';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: $bg;
}

#app {
  font-family: Inter, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
}
</style>
