export default {
    namespaced: 'appStatus',

    state: {
        task: '',
        isImortantTask: false,
        filters: {
            hasImportant: true,
            hasProcess: true,
            hasDone: false,
        },
        validError: '',
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

        setValidError(state, payload) {
            state.validError = payload
        }
    },
    actions: {
    }
}