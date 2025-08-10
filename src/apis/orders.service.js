import axios from "../axios/axios-kaqadmin";
import {useBearerTokenHeaders} from "@/utils/functions";

export const ordersService = {
    addOrdersByFile,
    addOrder,
    fetchOrders,
    deleteOrders,
    deleteTempOrders,
    fetchProductOrders,
    fetchTempOrders,
    getOrder,
    confirmOrder,
    rejectOrder,
    fetchTransactions,
    fetchProductTransactions,
    fetchPendingApprovalOrders,
    approveOrRejectOrder,
    updateTempOrders,
    updateOrders,

    // Admin routes
    fetchAdminOrders,
    assignOrders,
    updateOrderStatus,
    submitOrderForApproval,
    updateOrderBranch,
    fetchAdminTransactions,
    fetchDeliveryTransactions,
    fetchVendorTransactions,

    //branch routes
    fetchBranchOrders,
    updateOrderFromBranch,
    updateOrderDetails,
    fetchBranchPendingApprovalOrders,
    fetchBranchTransactions


}

function fetchAdminTransactions() {
    return new Promise((resolve) => {
        axios.get(`/admin/api/transactions`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    });
}

function fetchDeliveryTransactions(dateRange) {
    return new Promise((resolve) => {
        const rangeParam = dateRange ? `?dateRange[]=${encodeURIComponent(dateRange[0])}&dateRange[]=${encodeURIComponent(dateRange[1])}` : '';
        axios.get(`/admin/api/transactions/delivery${rangeParam}`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    });
}

function fetchVendorTransactions(dateRange) {
    return new Promise((resolve) => {
        const rangeParam = dateRange ? `?dateRange[]=${encodeURIComponent(dateRange[0])}&dateRange[]=${encodeURIComponent(dateRange[1])}` : '';
        axios.get(`/admin/api/transactions/vendors${rangeParam}`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    });
}


function fetchBranchTransactions() {
    return new Promise((resolve) => {
        axios.get(`/branch/api/transactions`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    });
}

function fetchTransactions() {
    return new Promise((resolve) => {
        axios.get(`/customer/api/transactions`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    });
}

function fetchProductTransactions(productId) {
    return new Promise((resolve) => {
        axios.get(`/customer/api/products/${productId}/transactions`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    });
}

function addOrdersByFile(formData) {
    return new Promise((resolve) => {
        axios.post('/customer/api/import-orders', formData, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function approveOrRejectOrder(payload) {
    return new Promise((resolve) => {
        axios.post('/admin/api/order/approve-or-reject', payload, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function addOrder(payload) {
    return new Promise((resolve) => {
        axios.post('/customer/api/add-order', payload, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function fetchOrders(status = null) {
    return new Promise((resolve) => {
        axios.get(`/customer/api/orders${status ? `?status=${status}` : ''}`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function deleteOrders(orderIds) {
    return new Promise((resolve) => {
        axios.post('/customer/api/orders/delete', {orderIds}, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function deleteTempOrders(orderIds) {
    return new Promise((resolve) => {
        axios.post('/customer/api/temp-orders/delete', {orderIds}, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function fetchPendingApprovalOrders(status = null, apiType = 'admin') {
    return new Promise((resolve) => {
        axios.get(`/${apiType}/api/orders/pending-approval${status ? `?status=${status}` : ''}`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function fetchBranchPendingApprovalOrders(status=null) {
    return new Promise((resolve) => {
        axios.get(`/branch/api/orders/pending-approval${status ? `?status=${status}` : ''}`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function fetchProductOrders(productId) {
    return new Promise((resolve) => {
        axios.get(`/customer/api/product/${productId}/orders`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function fetchTempOrders() {
    return new Promise((resolve) => {
        axios.get('/customer/api/temporal-orders', useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function getOrder(id) {
    return new Promise((resolve) => {
        axios.get(`/customer/api/orders/${id}`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function confirmOrder() {
    return new Promise((resolve) => {
        axios.post('/customer/api/orders/confirm', {}, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function updateTempOrders(payload) {
    return new Promise((resolve) => {
        axios.post('/customer/api/update-temp-order', payload, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function updateOrders(payload) {
    return new Promise((resolve) => {
        axios.post('/customer/api/update-order', payload, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function rejectOrder() {
    return new Promise((resolve) => {
        axios.post('/customer/api/orders/reject', {}, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function fetchAdminOrders(status=null) {
    return new Promise((resolve) => {
        axios.get(`/admin/api/orders${status ? `?status=${status}` : ''}`, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}


function assignOrders(payload) {
    return new Promise((resolve) => {
        axios.post('/admin/api/assign-orders', payload, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function updateOrderStatus(payload, order_id, apiType = 'admin') {
    return new Promise((resolve) => {
        axios.post(`${apiType}/api/orders/${order_id}/status`, payload, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function submitOrderForApproval(payload) {
    return new Promise((resolve) => {
        axios.post(`branch/api/orders/submit-for-approval`, payload, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function updateOrderBranch(payload, order_id) {
    return new Promise((resolve) => {
        axios.post(`/admin/api/orders/${order_id}/branch`, payload, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}


// branch routes
function fetchBranchOrders(status = null) {
    return axios.get(`/branch/api/orders${status ? `?status=${status}` : ''}`,useBearerTokenHeaders())
        .then(response => response.data)
        .catch(err => ({ status: false, message: err }));
}


function updateOrderFromBranch(payload, order_id) {
    return new Promise((resolve) => {
        axios.post(`/branch/api/orders/${order_id}/branch`, payload, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function updateOrderDetails(payload, order_id) {
    return new Promise((resolve) => {
        axios.post(`/branch/api/orders/${order_id}/update`, payload, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}