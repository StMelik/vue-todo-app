export default {
    namespaced: 'appStatus',

    state: {
        task: '',
        isImortantTask: false,
        filter: {
            hasImportant: true,
            hasProcess: true,
            hasDone: false,
        }
    },
    getters: {
    },
    mutations: {
        setTask(state, payload) {
            state.task = payload
        },

        setIsImortantTask(state, payload) {
            state.isImortantTask = payload
        },

        setFilter(state, payload) {
            state.filter = {
                ...state.filter,
                payload
            }
        },
    },
    actions: {
    }
}