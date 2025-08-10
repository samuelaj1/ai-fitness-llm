import {ordersService} from "@/apis/orders.service";

const state = {
    orders: [],
    orderProviders: [],
    selectedOrder: []
}

const getters = {
    'GET_ORDERS'(state) {
        return state.orders;
    },
    'GET_SELECTED_ORDER'(state) {
        return state.selectedOrder;
    },
    'GET_ORDER_PROVIDERS'(state) {
        return state.orderProviders;
    },
}

const mutations = {
    'SET_ORDERS'(state, orders) {
        return state.orders = orders;
    },
    'SET_SELECTED_ORDER'(state, order) {
        return state.selectedOrder = order;
    },
    'SET_ORDER_PROVIDERS'(state, data) {
        return state.orderProviders = data;
    },
}

const actions = {
    getOrder({commit, dispatch}, id) {
        dispatch('showLoader')
        ordersService.getOrder(id).then(data => {
            dispatch('hideLoader')
            if (!data.status) {
                dispatch('error', {message: data.message})
                return;
            }
            commit('SET_SELECTED_ORDER', data.extra);
        })
    },

    addOrder({commit, dispatch}, payload) {
        return new Promise((resolve) => {
            dispatch('showLoader')
            ordersService.addOrder(payload).then((data) => {
                dispatch('hideLoader')
                if (!data.status) {
                    dispatch('error', {message: data.message, showSwal: true})
                    resolve({status: false});
                    return;
                }

                resolve({status: true, data: data.extra});
                dispatch('success', {message: data.message, showSwal: true})
            })
        })
    },

    confirmOrder({dispatch}) {
        return new Promise((resolve) => {
            dispatch('showLoader')
            ordersService.confirmOrder().then((data) => {
                dispatch('hideLoader')
                if (!data.status) {
                    dispatch('error', {message: data.message, showSwal: true})
                    resolve({status: false});
                    return;
                }

                resolve({status: true, data: data.extra});
                dispatch('success', {message: data.message, showSwal: true})
            })
        })
    },

    rejectOrder({dispatch}) {
        return new Promise((resolve) => {
            dispatch('showLoader')
            ordersService.rejectOrder().then((data) => {
                dispatch('hideLoader')
                if (!data.status) {
                    dispatch('error', {message: data.message, showSwal: true})
                    resolve({status: false});
                    return;
                }

                resolve({status: true, data: data.extra});
                dispatch('success', {message: data.message, showSwal: true})
            })
        })
    },

    updateOrderStatus({commit, dispatch}, {payload, id, apiType}) {
        return new Promise((resolve, reject) => {
            dispatch('showLoader')
            ordersService.updateOrderStatus(payload, id, apiType).then(data => {
                dispatch('hideLoader')
                if (!data.status) {
                    dispatch('error', {message: data.message, showSwal: true})
                    reject();
                    return;
                }

                resolve(data);
                dispatch('success', {message: data.message, showSwal: true})
            })
        })
    },

    submitOrderForApproval({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            dispatch('showLoader')
            ordersService.submitOrderForApproval(payload).then(data => {
                dispatch('hideLoader')
                if (!data.status) {
                    dispatch('error', {message: data.message, showSwal: true})
                    reject();
                    return;
                }

                resolve(data);
                dispatch('success', {message: data.message, showSwal: true})
            })
        })
    },

    updateOrderBranch({commit, dispatch}, {payload, id}) {
        return new Promise((resolve, reject) => {
            dispatch('showLoader')
            ordersService.updateOrderBranch(payload, id).then(data => {
                dispatch('hideLoader')
                if (!data.status) {
                    dispatch('error', {message: data.message, showSwal: true})
                    reject();
                    return;
                }

                resolve(data.extra);
                dispatch('success', {message: data.message, showSwal: true})
            })
        })
    },

    updateOrderFromBranch({commit, dispatch}, {payload, id}) {
        return new Promise((resolve, reject) => {
            dispatch('showLoader')
            ordersService.updateOrderFromBranch(payload, id).then(data => {
                dispatch('hideLoader')
                if (!data.status) {
                    dispatch('error', {message: data.message, showSwal: true})
                    reject();
                    return;
                }

                resolve(data.extra);
                dispatch('success', {message: data.message, showSwal: true})
            })
        })
    },

    updateOrderDetails({commit, dispatch}, {payload, id}) {
        return new Promise((resolve, reject) => {
            dispatch('showLoader')
            ordersService.updateOrderDetails(payload, id).then(data => {
                dispatch('hideLoader')
                if (!data.status) {
                    dispatch('error', {message: data.message, showSwal: true})
                    reject();
                    return;
                }

                resolve(data.extra);
                dispatch('success', {message: data.message, showSwal: true})
            })
        })
    },

    addOrdersByFile({commit, dispatch}, payload) {
        return new Promise((resolve) => {
            dispatch('showLoader')
            ordersService.addOrdersByFile(payload).then(data => {
                dispatch('hideLoader')
                if (!data.status) {
                    dispatch('error', {message: data.message, showSwal: true})
                    resolve({status:false});
                    return;
                }

                resolve({status:true, data: data.extra});
                dispatch('success', {message: data.message, showSwal: true})
            })
        })
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}
