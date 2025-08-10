import {transactionService} from "../../apis/transaction.service";

const state = {
    transactions: [],
}

const getters = {
    'GET_TRANSACTIONS'(state) {
        return state.providers;
    },

}
const mutations = {
    'SET_TRANSACTIONS'(state, data) {
        return state.transactions = data;
    },
}

const actions = {

    deposit({commit, dispatch}, formRequest) {
        return new Promise((resolve, reject) => {

            dispatch('showLoader')
            transactionService.deposit(formRequest).then(data => {
                dispatch('hideLoader')
                if (!data.status) {
                    dispatch('error', {message: data.message, showSwal: true})
                    resolve(data)
                    return;
                }
                dispatch('success', {message: data.message, showSwal: true});
                resolve(data)
            })
        })

    },

    withdraw({commit, dispatch}, formRequest) {
        return new Promise((resolve, reject) => {

            dispatch('showLoader')
            transactionService.withdraw(formRequest).then(data => {
                dispatch('hideLoader')
                if (!data.status) {
                    dispatch('error', {message: data.message, showSwal: true})
                    resolve(data)
                    return;
                }
                dispatch('success', {message: data.message, showSwal: true});
                resolve(data)
            })
        })

    },

    invest({commit, dispatch}, formRequest) {
        return new Promise((resolve, reject) => {

            dispatch('showLoader')
            transactionService.invest(formRequest).then(data => {
                dispatch('hideLoader')
                if (!data.status) {
                    dispatch('error', {message: data.message, showSwal: true})
                    resolve(data)
                    return;
                }
                dispatch('success', {message: data.message, showSwal: true});
                resolve(data)
            })
        })

    },

    rechargeRecords({commit, dispatch}, type) {
        return new Promise((resolve, reject) => {
            transactionService.rechargeRecords(type).then(data => {
                if (!data.status) {
                    dispatch('error', {message: data.message, showSwal: false})
                    resolve(data)
                    return;
                }
                resolve(data)
            })
        })

    },

    investmentRecords({commit, dispatch}) {
        return new Promise((resolve) => {
            transactionService.investmentRecords().then(data => {
                if (!data.status) {
                    dispatch('error', {message: data.message, showSwal: false})
                    resolve(data)
                    return;
                }
                resolve(data)
            })
        })

    },

    allTransactions({commit, dispatch}) {
        return new Promise((resolve, reject) => {
            transactionService.allTransactions().then(data => {
                if (!data.status) {
                    dispatch('error', {message: data.message, showSwal: false})
                    resolve(data)
                    return;
                }
                resolve(data)
            })
        })
    },

    getUserAccountDetails({commit, dispatch}) {
        return new Promise((resolve, reject) => {
            transactionService.getUserAccountDetails().then(data => {
                if (!data.status) {
                    dispatch('error', {message: data.message, showSwal: false})
                    resolve(data)
                    return;
                }
                resolve(data)
            })
        })
    },

    getRecentAccountTransactions({commit, dispatch},limit) {
        return new Promise((resolve, reject) => {
            transactionService.getRecentAccountTransactions(limit).then(data => {
                if (!data.status) {
                    dispatch('error', {message: data.message, showSwal: false})
                    resolve(data)
                    return;
                }
                resolve(data)
            })
        })
    },

    liveEthTransactions({commit, dispatch}) {
        return new Promise((resolve, reject) => {
            transactionService.liveEthTransactions().then(data => {
                resolve(data)
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