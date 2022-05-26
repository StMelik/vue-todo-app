<template>
  <div class="wrapper">
    <h2 class="title">Ваши задачи</h2>
    <button class="clear-button" @click="$store.commit('taskData/clearList')"
      title="Очистить выполненные задачи">Очистить</button>
  </div>
</template>
<script>

export default {
  name: 'AppTitle',
}
</script>

<style lang="scss">
@import './AppTitle'
</style>