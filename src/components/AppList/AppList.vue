<template>
    <ol v-if="sortedTasks.length > 0" class="todo-list">
        <transition-group name="list">
            <TaskItem v-for="(task, i) in sortedTasks" :key="task.id" :task="task" :index="i + 1" />
        </transition-group>
    </ol>
    <p v-else class="todo-list__warning">Список задач пуст</p>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import TaskItem from '@/components/TaskItem/TaskItem.vue';

export default {
    name: 'AppList',

    components: { TaskItem },

    computed: {
        ...mapGetters({
            sortedTasks: 'taskData/getSortedTasks'
        })
    },
    methods: {
        ...mapMutations({
            loadTaskList: "taskData/loadTaskList",
        }),
    },

    mounted() {
        if (localStorage.getItem('todoList')) {
            this.loadTaskList(JSON.parse(localStorage.getItem('todoList')))
        }
    },

}
</script>

<style lang="scss" scoped>
@import './AppList'
</style> 