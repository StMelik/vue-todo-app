<template>
  <li 
    class="todo-list__item"
    :class="task.status"
    ref="todo"
  >
    <p class="todo-list__item-num">{{ index }}. </p>
    <p ref="task" class="todo-list__item-text">{{ task.text }}</p>
    <transition name="context-item">
      <div 
      class="todo-list__item-context context-item "
      v-show="!task.contextHide"
    >
      <button 
        class="context-item__button context-item__button_done"
        @click="handleStatusTask($event, task.id)"
        title="Отметить задачу выполненной"
      ></button>
      <button 
        class="context-item__button context-item__button_important"
        @click="handleStatusTask($event, task.id)"
        title="Отметить задачу важной"
      ></button>
      <button
        class="context-item__button context-item__button_delete"
        @click="clickDeleteTask(task.id)"
        title="Удалить задачу"
      ></button>
    </div>
    </transition>
  </li>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
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

computed: {
  ...mapState({
    isMobile: state => state.appStatus.isMobile
  })
},

  methods: {
  ...mapMutations({
    setTaskContextHide: 'taskData/setTaskContextHide'
  }),

    handleStatusTask(evt, id) {
      this.setTaskContextHide({id, status: true})
      this.$emit('handleStatusTask', evt, id)
    },

    clickDeleteTask(id) {
      // this.setTaskContextHide({id, status: true})
      this.$emit('clickDeleteTask', id)
    },

    addMouseEvent(id) {
        this.$refs.todo.addEventListener('mouseenter', () => {
          console.log('mouseenter');
        if (this.task.contextHide !== false) {
          this.setTaskContextHide({id, status: false})
        }
      })

      this.$refs.todo.addEventListener('mouseleave', () => {
        console.log('mouseleave');
        if (this.task.contextHide !== true) {
          this.setTaskContextHide({id, status: true})
        }
      })
    },
    handleVisibleContextMenu(id) {
        const button = this.$refs.task
        // const statusContextMenu = this.task.contextHide

        button.addEventListener('pointerup', () => {
          this.setTaskContextHide({id, status: !this.task.contextHide})
        })
        
    },

    handleContextMenu(id) {
      if (this.isMobile) {
        this.handleVisibleContextMenu(id)
      } else {
        this.addMouseEvent(id)
      }
    }
  },

  mounted() {
    this.handleContextMenu(this.task.id)
  }
}
</script>

<style lang="scss" scoped>
@import './TaskItem'
</style> 