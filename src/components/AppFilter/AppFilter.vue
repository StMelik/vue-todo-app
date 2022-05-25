<template>
<div class="filter">
  <button 
    class="filter__button filter__button_important"
    :class="filters.hasImportant && 'filter__button_important-active'"
    @click="handleStateFilters"
  >Важные ({{getImportantTasks.length}})</button>
  <button 
    class="filter__button filter__button_process"
    :class="filters.hasProcess && 'filter__button_process-active'"
    @click="handleStateFilters"
  >В процессе ({{getProcessTasks.length}})</button>
  <button 
    class="filter__button filter__button_done"
    :class="filters.hasDone && 'filter__button_done-active'"
    @click="handleStateFilters"
  >Выполненные ({{getDoneTasks.length}})</button>
</div>
  
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {


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
        if (!this.filters.hasImportant) {
          this.setFilters({hasImportant: true})
        } else {
          this.setFilters({hasImportant: false})
        }
      } else if (isProcessButton) {
        if (!this.filters.hasProcess) {
          this.setFilters({hasProcess: true})
        } else {
          this.setFilters({hasProcess: false})
        }
      } else if (isDoneButton) {
        if (!this.filters.hasDone) {
          this.setFilters({hasDone: true})
        } else {
          this.setFilters({hasDone: false})
        }
      }
    },
  },
}
</script>


<style lang="scss" scoped>
@import './AppFilter'
</style> 