import {useBearerTokenHeaders} from "@/utils/functions";
import axios from "../axios/axios-kaqadmin";

export const transactionService = {
    account,
    withdraw,
    paymentInfo,
    paymentRequests,
    adminPaymentRequests,
    deletePaymentRequest,
}

function account() {
    return new Promise((resolve) => {
        axios.get('/customer/api/account', useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    });
}

function withdraw(formRequest) {
    return new Promise((resolve) => {
        axios.post('/customer/api/transaction/request-withdrawal', formRequest, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function paymentInfo() {
    return new Promise((resolve) => {
        axios.get('/customer/api/vendor-payment-info', useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    });
}

function paymentRequests() {
    return new Promise((resolve) => {
        axios.get('/customer/api/payment/requests', useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    });
}

function adminPaymentRequests() {
    return new Promise((resolve) => {
        axios.get('/admin/api/payment/requests', useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    });
}

function deletePaymentRequest(id) {
    return new Promise((resolve) => {
        axios.post(`/customer/api/payment/requests/${id}/delete`,{}, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    });
}

