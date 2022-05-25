<template>
  <form class="form-add" @submit.prevent="handleSubmitForm">
      <input 
        class="form-add__input" 
        type="text"
        placeholder="Задача?"
        required
        :value="task"
        @input="setTask($event.target.value)"
        ref="input"
      >
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
    })
  },

  methods: {
    ...mapMutations({
      setTask: 'appStatus/setTask',
      setIsImortantTask: 'appStatus/setIsImortantTask',
      addTask: 'taskData/addTask'
    }),

    handleIsImortantTask() {
      if (!this.isImortantTask) {
        this.setIsImortantTask(true)
      } else {
        this.setIsImortantTask(false)
      }
    },

    handleSubmitForm() {
      const newTask = {
        id: Date.now(),
        text: this.task,
        contextHide: true,
        status: this.isImortantTask ? 'important' : 'process',
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