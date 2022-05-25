<template>
    <ol 
        v-if="sortedTasks.length > 0"
        class="todo-list"
    >
    <TaskItem
        v-for="(task, i) in sortedTasks"
        :key="task.id"
        :task="task"
        :index="i + 1"
        @handleStatusTask="handleStatusTask"
        @clickDeleteTask="clickDeleteTask"
    />
    </ol>
  <p 
    v-else
    class="todo-list__warning"
    >Список задач пуст</p>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import TaskItem from '../TaskItem/TaskItem.vue';

export default {
  components: { TaskItem },

    computed: {
        ...mapState({
            taskList: state => state.taskData.taskList,
        }),

        ...mapGetters({
            sortedTasks: 'taskData/sortedTasks'
        })
    },
    methods: {
        ...mapMutations({
            addTask: "taskData/addTask",
            setTaskStatus: "taskData/setTaskStatus",
            deleteTask: "taskData/deleteTask",
            loadTaskList: "taskData/loadTaskList",
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
        if (localStorage.getItem('todoList')) {
            this.loadTaskList(JSON.parse(localStorage.getItem('todoList')))
        }
        
    },
    updated() {
        console.log("UPDATED");
    },
}
</script>

<style lang="scss" scoped>
@import './AppList'
</style> 