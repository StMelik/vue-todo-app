<template>
  <li class="todo-list__item" :class="task.status" ref="todo">
    <p class="todo-list__item-num">{{ index }}. </p>
    <p ref="task" class="todo-list__item-text">{{ task.text }}</p>
    <transition name="context-item">
      <div class="todo-list__item-context context-item " v-show="!task.contextHide">
        <button class="context-item__button context-item__button_done" @click="handleStatusTask($event, task.id)"
          title="Отметить задачу выполненной"></button>
        <button class="context-item__button context-item__button_important" @click="handleStatusTask($event, task.id)"
          title="Отметить задачу важной"></button>
        <button class="context-item__button context-item__button_delete" @click="deleteTask(task.id)"
          title="Удалить задачу"></button>
      </div>
    </transition>
  </li>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  name: 'TaskItem',

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
      isMobile: state => state.appStatus.isMobile,
      taskList: state => state.taskData.taskList,
    })
  },

  methods: {
    ...mapMutations({
      setTaskContextHide: 'taskData/setTaskContextHide',
      addTask: "taskData/addTask",
      setTaskStatus: "taskData/setTaskStatus",
      deleteTask: "taskData/deleteTask",
      loadTaskList: "taskData/loadTaskList",
    }),

    handleStatusTask(evt, id) {
      const isImportantButton = evt.target.className.includes("important");
      const isDoneButton = evt.target.className.includes("done");
      const statusTask = this.taskList.find(item => item.id === id).status;

      this.setTaskContextHide({ id, status: true })

      if (isImportantButton) {
        statusTask === "important"
          ? this.setTaskStatus({ id, status: "process" })
          : this.setTaskStatus({ id, status: "important" })
      }

      if (isDoneButton) {
        statusTask === "done"
          ? this.setTaskStatus({ id, status: "process" })
          : this.setTaskStatus({ id, status: "done" })
      }
    },

    changeContextOnMobile() {
      this.setTaskContextHide({ id: this.task.id, status: !this.task.contextHide })
    }
  },

  mounted() {
    if (!this.isMobile) {
      this.$refs.todo.addEventListener('mouseenter', () => {
        this.setTaskContextHide({ id: this.task.id, status: false })
      })

      this.$refs.todo.addEventListener('mouseleave', () => {
        this.setTaskContextHide({ id: this.task.id, status: true })
      })
    } else {
      this.$refs.task.addEventListener('pointerup', this.changeContextOnMobile)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './TaskItem'
</style> 