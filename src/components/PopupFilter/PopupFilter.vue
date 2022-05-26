<template>
  <transition name="popup">
    <div class="popup" @click="setIsOpenPopup(false)">
      <div class="popup-filter" ref="popup-menu" @click.stop>
        <button @click="setIsOpenPopup(false)" class="popup-filter__close"></button>
        <button class="popup-filter__button popup-filter__button_important"
          :class="filters.hasImportant && 'popup-filter__button_important-active'" @click="handleStateFilters"
          title="Показывать / скрывать важные задачи">Важные ({{ getImportantTasks.length }})</button>
        <button class="popup-filter__button popup-filter__button_process"
          :class="filters.hasProcess && 'popup-filter__button_process-active'" @click="handleStateFilters"
          title="Показывать / скрывать выполняемые задачи">В процессе ({{ getProcessTasks.length }})</button>
        <button class="popup-filter__button popup-filter__button_done"
          :class="filters.hasDone && 'popup-filter__button_done-active'" @click="handleStateFilters"
          title="Показывать / скрывать выполненные задачи">Выполненные ({{ getDoneTasks.length }})</button>
        <button class="popup-filter__button popup-filter__button_clear" @click="clearList"
          title="Очистить выполненные задачи">Очистить</button>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {

  data() {
    return {
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
    }
  },

  computed: {
    ...mapState({
      filters: state => state.appStatus.filters,
    }),

    ...mapGetters({
      getImportantTasks: 'taskData/getImportantTasks',
      getProcessTasks: 'taskData/getProcessTasks',
      getDoneTasks: 'taskData/getDoneTasks',
    }),

    // проверить название и дельта заменить на расстояние?
    calculateDeltaTouchPosition() {
      return {
        deltaX: this.endX - this.startX,
        deltaY: this.endY - this.startY,
      }
    }
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
          this.setFilters({ hasImportant: true })
        } else {
          this.setFilters({ hasImportant: false })
        }
      } else if (isProcessButton) {
        if (!this.filters.hasProcess) {
          this.setFilters({ hasProcess: true })
        } else {
          this.setFilters({ hasProcess: false })
        }
      } else if (isDoneButton) {
        if (!this.filters.hasDone) {
          this.setFilters({ hasDone: true })
        } else {
          this.setFilters({ hasDone: false })
        }
      }
    },


    // переписанный вариант работы попапа
    setStartTouchPosition(evt) {
      console.log('start');
      this.startX = evt.changedTouches[0].clientX
      this.startY = evt.changedTouches[0].clientY
    },

    setEndTouchPosition(evt) {
      console.log('end');
      this.endX = evt.changedTouches[0].clientX
      this.endY = evt.changedTouches[0].clientY
    },

    closePopupScroll({ deltaX, deltaY }) {
      if (deltaX >= 50 && deltaY < 50 && deltaY > -50) {
        this.setIsOpenPopup(false)
      }
    }
  },

  watch: {
    calculateDeltaTouchPosition(deltaTouch) {
      console.log('calc', deltaTouch);
      this.closePopupScroll(deltaTouch)
    }
  },

  mounted() {
    console.log('mounted');
    this.$refs['popup-menu'].addEventListener('touchstart', this.setStartTouchPosition)
    this.$refs['popup-menu'].addEventListener('touchend', this.setEndTouchPosition)
  },

  unmounted() {
    console.log('unmounted');
  }
}
</script>


<style lang="scss" scoped>
@import './PopupFilter'
</style> 