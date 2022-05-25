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
            task.contextHide = status
        }
    },
    actions: {
    }
}