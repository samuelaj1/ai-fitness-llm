import axios from "../axios/axios-kaqadmin";
import {useBearerTokenHeaders} from "../utils/functions";

export const notificationsServices = {
    getNotificationMessages,
    setNotificationMessageAsRead,
    sendCampaignNotification,
    getLastNWeeksCampaign,
    getTransactionStats
}

function getNotificationMessages(type){
    return new Promise((resolve, reject) => {
        axios.get('/chat/get-chats/'+type, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));

    })
}

function getTransactionStats(type){
    return new Promise((resolve, reject) => {
        axios.get('/chat/get-chats/'+type, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));

    })
}

function setNotificationMessageAsRead(type, id){
    console.log('type', type)
    console.log('id', id)
    return new Promise((resolve, reject) => {
        axios.post('/chat/set-user-chat-as-read/'+type, { id }, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));

    })
}


function sendCampaignNotification(payload){

    return new Promise((resolve, reject) => {
        axios.post('/campaign/notify', payload, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));

    })
}

function getLastNWeeksCampaign(weeks = 4){

    return new Promise((resolve, reject) => {
        axios.get('/campaign/get-last-n-weeks-campaigns/' + weeks, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));

    })
}
