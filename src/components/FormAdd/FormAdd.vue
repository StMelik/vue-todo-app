<template>
  <form class="form-add" novalidate @submit.prevent="handleSubmitForm(textTask)">
    <label class="form-add__label">
      <input class="form-add__input" type="text" placeholder="Задача?" required :value="textTask"
        @input="setTextTask($event.target.value)" ref="input">
      <transition name="error">
        <p class="form-add__error" v-if="!!validError">{{ validError }}</p>
      </transition>
    </label>

    <button :class="{ 'form-add__important-button_active': isImortantTask }" class="form-add__important-button"
      type="button" @click="setIsImortantTask(!isImortantTask)" title="Отметить задачу важной"></button>

    <button class="form-add__add-button" title="Добавить задачу"></button>
  </form>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'FormAdd',

  computed: {
    ...mapState({
      textTask: state => state.appStatus.textTask,
      isImortantTask: state => state.appStatus.isImortantTask,
      validError: state => state.appStatus.validError,
      isMobile: state => state.appStatus.isMobile,
      taskList: state => state.taskData.taskList,
    })
  },

  methods: {
    ...mapMutations({
      setTextTask: 'appStatus/setTextTask',
      setIsImortantTask: 'appStatus/setIsImortantTask',
      addTask: 'taskData/addTask',
      setFilters: 'appStatus/setFilters',
      setValidError: 'appStatus/setValidError',
    }),

    switchFilter() {
      this.isImortantTask
        ? this.setFilters({ hasImportant: true })
        : this.setFilters({ hasProcess: true })
    },

    createTask(textTask) {
      return {
        id: Date.now(),
        text: textTask[0].toUpperCase() + textTask.slice(1).toLowerCase(),
        contextHide: true,
        status: this.isImortantTask ? 'important' : 'process',
      }
    },

    validateTask(textTask, minLength, maxLength, clearErrorMs = 5000) {
      const isSameTask = this.taskList.find(t => t.text.toLowerCase() === textTask.toLowerCase())

      const clearError = () => {
        if (clearError !== 0) {
          setTimeout(() => {
            this.setValidError('')
          }, clearErrorMs)
        }
      }

      if (isSameTask) {
        this.setValidError('У вас уже есть такая задача!')
        clearError()
        return false
      }

      if (textTask.length < minLength || textTask.length > maxLength) {
        this.setValidError(`Длина должна быть от ${minLength} до ${maxLength} символов.`)
        clearError()
        return false
      }

      this.setValidError('')
      return true
    },

    focusInput() {
      this.$refs.input.focus()
    },

    handleSubmitForm(textTask) {
      const isValidTask = this.validateTask(textTask, 3, 50)
      if (!isValidTask) return
      this.switchFilter()
      this.addTask(this.createTask(textTask))
      this.setTextTask('')
      this.setIsImortantTask(false)
      this.focusInput()
    },
  },

  watch: {
    isImortantTask() {
      this.focusInput()
    }
  },

  mounted() {
    if (!this.isMobile) this.focusInput()
  }
}
</script>

<style lang="scss">
@import './FormAdd'
</style>