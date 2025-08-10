import Swal from "sweetalert2";
import {notificationsServices} from "../../apis/notifications.services";

const state = {
    type: null,
    message: null,
    supportMessages: [],
    receiptMessages: [],
};

const getters = {
    'notification' (state) {
        return {
            type: state.type,
            message: state.message
        };
    },
    'GET_SUPPORT_MESSAGES' (state) {
        return state.supportMessages;
    },
    'GET_RECEIPT_MESSAGES' (state) {
        return state.receiptMessages;
    },
}

const mutations = {
    success(state, message) {
        state.type = 'success';
        state.message = message;
    },
    error(state, message) {
        state.type = 'danger';
        state.message = message;
    },
    clear(state) {
        state.type = null;
        state.message = null;
    },
    'SET_SUPPORT_MESSAGES' (state, data) {
        state.supportMessages = data;
    },
    'SET_RECEIPT_MESSAGES' (state, data) {
        state.receiptMessages = data;
    },

};

const actions = {

    success({ commit, dispatch }, { message, showSwal = true}) {
        dispatch('clear');
        commit('success', message);

        if(showSwal)
            Swal.fire("Completed!", message, "success");

    },
    error({ commit, dispatch }, { message, showSwal = false}) {

        dispatch('clear');
        commit('error', message);

        if(showSwal)
            Swal.fire("Failed!", message, "error");
    },

    clear({ commit }) {
        commit('clear');
    },
    successMsg({ commit },{ message }) {
        commit('success', message);
    },

    getNotificationMessages({commit, dispatch}, type){
        notificationsServices.getNotificationMessages(type).then(data => {
            if(!data.status){
                //dispatch('error', {message:data.message})
                console.log('notification error', data.message)
                return;
            }
            if(type === 'support'){
                commit('SET_SUPPORT_MESSAGES', data.extra);
            }else if (type === 'receipt'){
                commit('SET_RECEIPT_MESSAGES', data.extra);
            }
        })
    },


    setNotificationMessagesAsRead({commit, dispatch}, {type, id}){
        notificationsServices.setNotificationMessageAsRead(type, id).then(data => {
            if(!data.status){
                //dispatch('error', {message:data.message})
                console.log('notification error', data.message)
                return;
            }
            if(type === 'support'){
                commit('SET_SUPPORT_MESSAGES', data.extra);
            }else if (type === 'receipt'){
                commit('SET_RECEIPT_MESSAGES', data.extra);
            }
        })
    }


};

export default {
    state,
    getters,
    actions,
    mutations
}
