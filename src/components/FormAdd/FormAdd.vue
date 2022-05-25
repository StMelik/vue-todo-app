<template>
  <form class="form-add" novalidate @submit.prevent="handleSubmitForm(task)">
    <label class="form-add__label">
      <input 
        class="form-add__input" 
        type="text"
        placeholder="Задача?"
        required
        :value="task"
        @input="setTask($event.target.value)"
        ref="input"
      >
      <p 
        class="form-add__error"
        :class="validError ? 'form-add__error_active' : ''"
      >{{ validError }}</p>
    </label>
      
      <button 
        class="form-add__important-button"
        :class="isImortantTask && 'form-add__important-button_active'"
        type="button"
        @click="handleIsImortantTask"
      ></button>
      <button class="form-add__add-button"></button>
  </form>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {


  computed: {
    ...mapState({
      task: state => state.appStatus.task,
      isImortantTask: state => state.appStatus.isImortantTask,
      validError: state => state.appStatus.validError,
      taskList: state => state.taskData.taskList,
    })
  },

  methods: {
    ...mapMutations({
      setTask: 'appStatus/setTask',
      setIsImortantTask: 'appStatus/setIsImortantTask',
      addTask: 'taskData/addTask',
      setFilters: 'appStatus/setFilters',
      setValidError: 'appStatus/setValidError',
    }),

    handleIsImortantTask() {
      if (!this.isImortantTask) {
        this.setIsImortantTask(true)
      } else {
        this.setIsImortantTask(false)
      }
    },

    handleSubmitForm(task) {
      const isBeTask = this.taskList.find(t => t.text.toLowerCase() === task.toLowerCase())

      if (task.length < 3 || task.length > 35) {
        this.setValidError('Длина должна быть от 3 до 35 символов.')
        return setTimeout(() => {
          this.setValidError('')
        }, 5000)
      } else if (isBeTask) {
        this.setValidError('У вас уже есть такая задача!')
        return setTimeout(() => {
          this.setValidError('')
        }, 5000)
      }

      this.setValidError('')

      const newTask = {
        id: Date.now(),
        text: task[0].toUpperCase() + task.slice(1).toLowerCase(),
        contextHide: true,
        status: this.isImortantTask ? 'important' : 'process',
      }

    if (newTask.status === 'important') {
      this.setFilters({hasImportant: true})
    } else {
      this.setFilters({hasProcess: true})
    }

    this.addTask(newTask)
    this.setTask('')
    this.setIsImortantTask(false)
    this.focusInput()
    },

    focusInput() {
      this.$refs.input.focus()
    }
  },

watch: {
  isImortantTask() {
    this.focusInput()
  }
},

  mounted() {
    this.focusInput()
  }
}
</script>

<style lang="scss">
@import './FormAdd'
</style>