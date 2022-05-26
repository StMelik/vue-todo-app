<template>
  <div class="filter">
    <button class="filter__button filter__button_important"
      :class="{ 'filter__button_important-active': filters.hasImportant }" @click="handleStateFilters"
      title="Показывать / скрывать важные задачи">Важные ({{ getImportantTasks.length }})</button>
    <button class="filter__button filter__button_process"
      :class="{ 'filter__button_process-active': filters.hasProcess }" @click="handleStateFilters"
      title="Показывать / скрывать выполняемые задачи">В процессе
      ({{ getProcessTasks.length }})</button>
    <button class="filter__button filter__button_done" :class="{ 'filter__button_done-active': filters.hasDone }"
      @click="handleStateFilters" title="Показывать / скрывать выполненные задачи">Выполненные
      ({{ getDoneTasks.length }})</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
  name: 'AppFilter',

  computed: {
    ...mapState({
      filters: state => state.appStatus.filters,
    }),

    ...mapGetters({
      getImportantTasks: 'taskData/getImportantTasks',
      getProcessTasks: 'taskData/getProcessTasks',
      getDoneTasks: 'taskData/getDoneTasks',
    })
  },

  methods: {
    ...mapMutations({
      setFilters: 'appStatus/setFilters',
    }),

    handleStateFilters(evt) {
      const isImportantButton = evt.target.className.includes('important');
      const isProcessButton = evt.target.className.includes('process');
      const isDoneButton = evt.target.className.includes('done');

      if (isImportantButton) {
        this.setFilters({ hasImportant: !this.filters.hasImportant })
      }

      if (isProcessButton) {
        this.setFilters({ hasProcess: !this.filters.hasProcess })
      }

      if (isDoneButton) {
        this.setFilters({ hasDone: !this.filters.hasDone })
      }
    },
  }
}
</script>


<style lang="scss" scoped>
@import './AppFilter'
</style> 