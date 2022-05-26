<template>

  <button 
    class="open-filter"
    @click="clickOpenPopup"
  ></button>
  <transition name="popup" mode="">
    <div 
      v-show="isOpenPopup"
      class="popup-filter"
      ref="popup"
    >
      <button
      @click="setIsOpenPopup(false)"
        class="popup-filter__close"
      ></button>
      <button 
        class="popup-filter__button popup-filter__button_important"
        :class="filters.hasImportant && 'popup-filter__button_important-active'"
        @click="handleStateFilters"
        title="Показывать / скрывать важные задачи"
      >Важные ({{getImportantTasks.length}})</button>
      <button 
        class="popup-filter__button popup-filter__button_process"
        :class="filters.hasProcess && 'popup-filter__button_process-active'"
        @click="handleStateFilters"
        title="Показывать / скрывать выполняемые задачи"
      >В процессе ({{getProcessTasks.length}})</button>
      <button 
        class="popup-filter__button popup-filter__button_done"
        :class="filters.hasDone && 'popup-filter__button_done-active'"
        @click="handleStateFilters"
        title="Показывать / скрывать выполненные задачи"
      >Выполненные ({{getDoneTasks.length}})</button>

        <button 
          class="popup-filter__button popup-filter__button_clear"
          @click="clearList"
          title="Очистить выполненные задачи"
        >Очистить</button>
    </div>
  </transition>

</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {


  computed: {
    ...mapState({
      filters: state => state.appStatus.filters,
      isOpenPopup: state => state.appStatus.isOpenPopup,
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
      setIsOpenPopup: 'appStatus/setIsOpenPopup',
      clearList: 'taskData/clearList',
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

    clickOpenPopup() {
      this.setIsOpenPopup(true)
      this.setScroll(this.$refs.popup)
    },

    setScroll(el) {
        let startX = 0
        let startY = 0
        let endX = 0
        let endY = 0

        const setStartPosition = (evt) => {
          console.log('start');
          startX = evt.changedTouches[0].clientX
          startY = evt.changedTouches[0].clientY
        }

        const closePopup = (evt) => {
          console.log('end');
          endX = evt.changedTouches[0].clientX
          endY = evt.changedTouches[0].clientY

          const deltaX = endX - startX
          const deltaY = endY - startY

          if (deltaX >= 50 && deltaY < 50 && deltaY > -50) {
            el.removeEventListener('touchend', closePopup)
            el.removeEventListener('touchstart', setStartPosition)
            this.setIsOpenPopup(false)
          }
        }
        el.addEventListener('touchend', closePopup)
        el.addEventListener('touchstart', setStartPosition)
      
    }
  },

  mounted() {
  }
}
</script>


<style lang="scss" scoped>
@import './PopupFilter'
</style> 