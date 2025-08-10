import {useBearerTokenHeaders} from "@/utils/functions";
import axios from "../axios/axios-kaqadmin";

export const productsService = {
    fetchProducts,
    addProduct,
    //admin functions
    fetchStockProducts,
    addStock,
    addStockByBranch,
    fetchProductStockHistory,
    getProduct,
    fetchProductOrders,
    fetchCustomerStockHistory,

}

function fetchProducts(){
    return new Promise((resolve) => {
        axios.get('/customer/api/products', useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}


function addProduct(formData) {
    return new Promise((resolve) => {
        axios.post('/customer/api/add-product', formData, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}


// Admin functions

function fetchStockProducts(apiType = 'admin') {
    return new Promise((resolve) => {
        axios.get(`/${apiType}/api/products`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function addStock(formData) {
    return new Promise((resolve) => {
        axios.post('/admin/api/add-stock-product', formData, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}
function addStockByBranch(formData) {
    return new Promise((resolve) => {
        axios.post('/branch/api/add-stock-product', formData, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function fetchProductStockHistory(productId, apiType = 'admin') {
    return new Promise((resolve) => {
        axios.get(`/${apiType}/api/product/${productId}/stock/history`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function fetchCustomerStockHistory(productId) {
    return new Promise((resolve) => {
        axios.get(`/customer/api/product/${productId}/stock/history`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function getProduct(productId, apiType = 'admin') {
    return new Promise((resolve) => {
        axios.get(`/${apiType}/api/product/${productId}`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function fetchProductOrders(productId, apiType = 'admin') {
    return new Promise((resolve) => {
        axios.get(`/${apiType}/api/product/${productId}/orders`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}
