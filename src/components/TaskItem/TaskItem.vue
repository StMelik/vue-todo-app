<template>
  <li 
    class="todo-list__item"
    :class="task.status"
    ref="todo"
  >
    <p class="todo-list__item-num">{{ index }}. </p>
    <p ref="task" class="todo-list__item-text">{{ task.text }}</p>
    <button class="todo-list__item-handle todo-list__item-handle_more"></button>
    <div 
      class="todo-list__item-context context-item "
      :class="task.contextHide && 'context-item_hide'"
    >
      <button 
        class="context-item__button context-item__button_done"
        @click="handleStatusTask($event, task.id)"
      ></button>
      <button 
        class="context-item__button context-item__button_important"
        @click="handleStatusTask($event, task.id)"
      ></button>
      <button
        class="context-item__button context-item__button_delete"
        @click="clickDeleteTask(task.id)"
      ></button>
    </div>
  </li>
</template>

<script>
import { mapMutations } from 'vuex';
export default {

  props: {
    task: {
      type: Object,
      require,
    },
    index: {
      type: Number,
      require
    }
  },

  methods: {
  ...mapMutations({
    setTaskContextHide: 'taskData/setTaskContextHide'
  }),

    handleStatusTask(evt, id) {
      this.$emit('handleStatusTask', evt, id)
    },

    clickDeleteTask(id) {
      this.$emit('clickDeleteTask', id)
    },

    addMouseEvent(id) {
      this.$refs.task.addEventListener('mouseenter', () => {
        this.setTaskContextHide({id, status: false})
      })

      this.$refs.todo.addEventListener('mouseleave', () => {
          this.setTaskContextHide({id, status: true})
      })
    }
    
  },

  mounted() {
    this.addMouseEvent(this.task.id)
  }
}
</script>

<style lang="scss" scoped>
@import './TaskItem'
</style> 