const state = {
    route: [],
    pageTitle: '',
    redirectPath: null, // Added redirectPath to the state
};

const getters = {
    GET_ROUTE(state) {
        return state.route;
    },
    GET_PAGE_TITLE(state) {
        return state.pageTitle;
    },
    GET_REDIRECT_PATH(state) {
        return state.redirectPath;
    },
};

const mutations = {
    SET_ROUTE_PATH(state, { to, from }) {
        if (!state.route.includes(to)) {
            state.route.push(to);
        }

        if (to === '/') {
            state.route = ['/'];
        }
    },
    REMOVE_LAST(state) {
        state.route.pop();
    },
    SET_PAGE_TITLE(state, title) {
        state.route = [state.route[0], state.route[state.route.length - 1]];
        state.pageTitle = title;
    },
    SET_REDIRECT_PATH(state, path) {
        state.redirectPath = path;
    },
    CLEAR_REDIRECT_PATH(state) {
        state.redirectPath = null;
    },
};

const actions = {
    setRoutePath({ commit }, { to, from }) {
        commit('SET_ROUTE_PATH', { to, from });
    },
    popRoutePath({ commit }) {
        commit('REMOVE_LAST');
    },
    setPageTitle({ commit }, title) {
        commit('SET_PAGE_TITLE', title);
    },
    setRedirectPath({ commit }, path) {
        commit('SET_REDIRECT_PATH', path);
    },
    clearRedirectPath({ commit }) {
        commit('CLEAR_REDIRECT_PATH');
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
