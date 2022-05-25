export default {
    namespaced: 'taskData',

    state: {
        taskList: [
            {
                id: Date.now(),
                text: 'Посмотреть фильм',
                contextHide: true,
                status: 'process', // important | done | process
            },
            {
                id: Date.now() + 1,
                text: 'Пробежка',
                contextHide: true,
                status: 'done', // important | done | process
            },
            {
                id: Date.now() + 2,
                text: 'Купить продукты',
                contextHide: true,
                status: 'important', // important | done | process
            },
            {
                id: Date.now() + 3,
                text: 'Настроить интернет',
                contextHide: true,
                status: 'process', // important | done | process
            },
        ]
    },
    getters: {
        sortedTasks(state, _, rootState) {
            const filters = rootState.appStatus.filters

            const importantTasks = state.taskList.filter(task => task.status === 'important')
            const processTasks = state.taskList.filter(task => task.status === 'process')
            const doneTasks = state.taskList.filter(task => task.status === 'done')

            if (filters.hasImportant && filters.hasProcess && filters.hasDone) {
                return [...importantTasks, ...processTasks, ...doneTasks]
            }

            if (filters.hasImportant && filters.hasProcess) return [...importantTasks, ...processTasks]

            if (filters.hasImportant && filters.hasDone) return [...importantTasks, ...doneTasks]

            if (filters.hasProcess && filters.hasDone) return [...processTasks, ...doneTasks]

            if (filters.hasImportant) return importantTasks

            if (filters.hasProcess) return processTasks

            if (filters.hasDone) return doneTasks
        }

    },
    mutations: {
        addTask(state, payload) {
            state.taskList.push(payload)
        },

        setTaskStatus(state, { id, status }) {
            const task = state.taskList.find(item => item.id === id)
            task.status = status
        },

        deleteTask(state, id) {
            state.taskList = state.taskList.filter(task => task.id !== id)
        },

        setTaskContextHide(state, { id, status }) {
            const task = state.taskList.find(item => item.id === id)
            // if (task.contextHide !== status) {
            task.contextHide = status
            // }
        },

        clearList(state) {
            state.taskList = state.taskList.filter(task => task.status !== 'done')
        }
    },
    actions: {
    }
}