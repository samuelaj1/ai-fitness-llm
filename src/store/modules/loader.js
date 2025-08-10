const state = {
    isLoading: false,
    processing_data: '',
    isSectionLoading: false
}

const getters = {
    'LOADER' (state)  {
        return state.isLoading
    },
    'PROCESSING_DATA' (state)  {
        return state.processing_data
    },
    'SECTION_LOADER' (state)  {
        return state.isSectionLoading
    },
}
const mutations = {
    'ENABLE_LOADER' (state) {
        state.isLoading = true;
    },
    'DISABLE_LOADER' (state) {
        state.isLoading = false;
    },
    'SET_PROCESSING' (state,content) {
        state.processing_data = content;
    },
    'ENABLE_SECTION_LOADER' (state) {
        state.isSectionLoading = true;
    },
    'DISABLE_SECTION_LOADER' (state) {
        state.isSectionLoading = false;
    }
}


const actions = {
    showLoader({commit}) {
        commit('ENABLE_LOADER')
    },
    hideLoader({commit}) {
        commit('DISABLE_LOADER')
    },
    setProcessingInfo({commit}, content){
        commit('SET_PROCESSING',content)
    },
    showSectionLoader({commit}){
        commit('ENABLE_SECTION_LOADER')
    },
    hideSectionLoader({commit}){
        commit('DISABLE_SECTION_LOADER')
    },
}


export default {
    state,
    getters,
    actions,
    mutations
}