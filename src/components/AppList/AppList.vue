<template>
<ol class="todo-list">
  <TaskItem
    v-for="(task, i) in taskList"
    :key="task.id"
    :task="task"
    :index="i + 1"
    @handleStatusTask="handleStatusTask"
    @clickDeleteTask="clickDeleteTask"
  />
</ol>
  
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import TaskItem from '../TaskItem/TaskItem.vue';

export default {
  components: { TaskItem },

    computed: {
        ...mapState({
            taskList: state => state.taskData.taskList,
        })
    },
    methods: {
        ...mapMutations({
            addTask: "taskData/addTask",
            setTaskStatus: "taskData/setTaskStatus",
            deleteTask: "taskData/deleteTask",
        }),
        handleStatusTask(evt, id) {
            const isImportantButton = evt.target.className.includes("important");
            const isDoneButton = evt.target.className.includes("done");
            const statusTask = this.taskList.find(item => item.id === id).status;
            if (isImportantButton) {
                if (statusTask === "important") {
                    this.setTaskStatus({ id, status: "process" });
                }
                else {
                    this.setTaskStatus({ id, status: "important" });
                }
            }
            else if (isDoneButton) {
                if (statusTask === "done") {
                    this.setTaskStatus({ id, status: "process" });
                }
                else {
                    this.setTaskStatus({ id, status: "done" });
                }
            }
        },
        clickDeleteTask(id) {
            this.deleteTask(id);
        }
    },
    mounted() {
        // console.log(this.$refs.task);
        // this.addTask({text: 'kyky'})
    },
    updated() {
        console.log("UPDATED");
    },
}
</script>

<style lang="scss" scoped>
@import './AppList'
</style> 