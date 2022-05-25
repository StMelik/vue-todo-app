<template>
  <form class="form-add" @submit.prevent="handleSubmitForm">
      <input 
        class="form-add__input" 
        type="text"
        placeholder="Задача?"
        required
        :value="task"
        @input="setTask($event.target.value)"
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
    }),

    handleIsImortantTask() {
      if (!this.isImortantTask) {
        this.setIsImortantTask(true)
      } else {
        this.setIsImortantTask(false)
      }
    },

    handleSubmitForm() {
      console.log(`Добавленна задача: ${this.task}`);
      this.setTask('')
    }
  },

  mounted() {
    console.log(this.task);
  }
}
</script>

<style lang="scss">
@import './FormAdd'
</style>