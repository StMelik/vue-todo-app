<template>
<div class="wrapper">
  <h2 class="title">Ваши задачи</h2>
  <button 
    class="clear-button"
    @click="clearList"
  >Очистить</button>
</div>
  
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
  ...mapMutations({
    clearList: 'taskData/clearList'
  })
  }
}
</script>

<style lang="scss">
@import './AppTitle'
</style>