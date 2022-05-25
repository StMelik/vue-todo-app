<template>
  <FormAdd/>
  <AppTitle/>
</template>

<script>
import FormAdd from './components/FormAdd/FormAdd.vue'
import AppTitle from './components/AppTitle/AppTitle.vue'

export default {
  name: 'App',
  components: {
    FormAdd,
    AppTitle,
}
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Inter, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
