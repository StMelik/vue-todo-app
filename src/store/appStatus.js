export default {
    namespaced: 'appStatus',

    state: {
        task: '',
        isImortantTask: false,
        filters: {
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

        setFilters(state, payload) {
            state.filters = {
                ...state.filters,
                ...payload
            }
        },
    },
    actions: {
    }
}