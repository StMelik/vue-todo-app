<template>
  <transition name="popup">
    <div class="popup" @click="setIsOpenPopup(false)">
      <div class="popup-filter" ref="popup-menu" @click.stop>
        <button @click="setIsOpenPopup(false)" class="popup-filter__close"></button>
        <button class="popup-filter__button popup-filter__button_important"
          :class="{ 'popup-filter__button_important-active': filters.hasImportant }" @click="handleStateFilters"
          title="Показывать / скрывать важные задачи">Важные ({{ getImportantTasks.length }})</button>
        <button class="popup-filter__button popup-filter__button_process"
          :class="{ 'popup-filter__button_process-active': filters.hasProcess }" @click="handleStateFilters"
          title="Показывать / скрывать выполняемые задачи">В процессе ({{ getProcessTasks.length }})</button>
        <button class="popup-filter__button popup-filter__button_done"
          :class="{ 'popup-filter__button_done-active': filters.hasDone }" @click="handleStateFilters"
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
  name: 'PopupFilter',

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
        this.setFilters({ hasImportant: !this.filters.hasImportant })
      }

      if (isProcessButton) {
        this.setFilters({ hasProcess: !this.filters.hasProcess })
      }

      if (isDoneButton) {
        this.setFilters({ hasDone: !this.filters.hasDone })
      }
    },

    setStartTouchPosition(evt) {
      this.startX = evt.changedTouches[0].clientX
      this.startY = evt.changedTouches[0].clientY
    },

    setEndTouchPosition(evt) {
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
      this.closePopupScroll(deltaTouch)
    }
  },

  mounted() {
    this.$refs['popup-menu'].addEventListener('touchstart', this.setStartTouchPosition)
    this.$refs['popup-menu'].addEventListener('touchend', this.setEndTouchPosition)
  }
}
</script>

<style lang="scss" scoped>
@import './PopupFilter'
</style> 