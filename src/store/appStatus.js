export default {
    namespaced: 'appStatus',

    state: {
        textTask: '',
        isImortantTask: false,
        filters: {
            hasImportant: true,
            hasProcess: true,
            hasDone: false,
        },
        validError: '',
        isMobile: navigator.userAgent.toLowerCase().includes('mobile'),
        isOpenPopup: false,
    },

    mutations: {
        setTextTask(state, text) {
            state.textTask = text
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
        },

        setIsOpenPopup(state, payload) {
            state.isOpenPopup = payload
        }
    },
}