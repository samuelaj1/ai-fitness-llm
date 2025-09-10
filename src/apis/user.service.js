import {useBasicAuthHeaders, useBearerTokenHeaders} from "@/utils/functions";
import axios from "../axios/axios-kaqadmin";

export const userService = {
    login,
    adminLogin,
    adminRegister,
    logout,
    checkIn,
    getMotivationalMessage,
    listByUser,
    createFromTemplate,
    addProgress,
    deleteGoal,
    chart,
    saveLLMResponse,
    getCheckInHistory,
    chat,
    getMood,
    getPlans,
    getEngagement,
    getGoals,
    getComB,
    resendPasswordAdmin,
    forgotPassword,
    resetPassword,
    updatePersonalInfo,
    changePassword
};

function login(email, password) {
    //// fetch from the server
    const data = {
        "grant_type": "password",
        "username": email,
        password,
    }

    return new Promise((resolve) => {
        axios.post('/api/oauth/token', data, useBasicAuthHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function adminLogin(email, password) {
    const data = {
        "grant_type": "password",
        "client_id": process.env.VUE_APP_ADMIN_CLIENT_ID,
        "client_secret": process.env.VUE_APP_ADMIN_CLIENT_SECRET,
        "username": email,
        "password": password,
        "scope": "*"
    }

    return new Promise((resolve) => {
        axios.post('/admin/api/login', data, useBasicAuthHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function adminRegister(payload) {
    return new Promise((resolve) => {
        axios.post('/admin/api/sign-up', payload, useBasicAuthHeaders())
            .then(response => {
                 resolve(response.data)
        }).catch(err => resolve({status: false, message: err}));
    })
}



function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}


function verifyEmail(id, hash) {
    return new Promise((resolve) => {
        axios.get(`/customer/api/email/verify/${id}/${hash}`,useBasicAuthHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function resendVerifyEmail(email) {
    return new Promise((resolve) => {
        axios.post('/customer/api/email/resend', {email}, useBasicAuthHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function addAdmins(payload) {
    return new Promise((resolve) => {
        axios
            .post("/admin/api/add-user", payload, useBearerTokenHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function editAdmin(payload) {
    return new Promise((resolve) => {
        axios
            .put(
                `/admin/api/users/${payload.id}`,
                payload,
                useBearerTokenHeaders()
            )
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}


function resendPasswordAdmin(user_id) {
    return new Promise((resolve) => {
        axios.post(
                `/admin/api/users/${user_id}/resend-password`,
                {},
                useBearerTokenHeaders()
            )
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}



function getPermissions() {
    return new Promise((resolve) => {
        axios.get("/customer/api/permissions", useBearerTokenHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function getTrades(limit) {
    return new Promise((resolve) => {
        axios.get(`/api/trades${limit ? '?limit=' + limit : ''}`, useBasicAuthHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function listByUser(userId) {
    return new Promise((resolve) => {
        axios.get(`/api/user/${userId}`, useBasicAuthHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function getMotivationalMessage(payload) {
    return new Promise((resolve) => {
        axios.post(`/api/motivational-message`, payload, useBasicAuthHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function saveLLMResponse(payload) {
    return new Promise((resolve) => {
        axios.post(`/api/llm-response`, payload, useBasicAuthHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function createFromTemplate(payload) {
    return new Promise((resolve) => {
        axios.post(`/api/template`, payload, useBasicAuthHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function addProgress(goalId, payload) {
    return new Promise((resolve) => {
        axios.post(`/api/goals/${goalId}/logs`, payload, useBasicAuthHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function deleteGoal(goalId) {
    return new Promise((resolve) => {
        axios.delete(`/api/goals/${goalId}`, useBasicAuthHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function chart(goalId) {
    return new Promise((resolve) => {
        axios.get(`/api/goals/${goalId}`, useBasicAuthHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function getCheckInHistory(userId) {
    return new Promise((resolve) => {
        axios.get(`/api/checkin-history/${userId}`, useBasicAuthHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}


function checkIn(payload) {
    return new Promise((resolve) => {
        axios.post(`/api/check-in`, payload, useBasicAuthHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function chat(payload) {
    return new Promise((resolve) => {
        axios.post(`/api/chat`, payload, useBasicAuthHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function getMood(userId) {
    return new Promise((resolve) => {
        axios.get(`/api/analytics/mood/${userId}`, useBasicAuthHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function getPlans(userId, type = "") {
    return new Promise((resolve) => {
        let url = `/api/users/${userId}/plans`;
        if (type) {
            url += `?type=${encodeURIComponent(type)}`;
        }
        axios
            .get(url, useBasicAuthHeaders())
            .then((response) => resolve(response.data))
            .catch((err) => resolve({ status: false, message: err.message || err }));
    });
}


function getEngagement(userId) {
    return new Promise((resolve) => {
        axios.get(`/api/analytics/engagement/${userId}`, useBasicAuthHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function getGoals(userId) {
    return new Promise((resolve) => {
        axios.get(`/api/analytics/goals/${userId}`, useBasicAuthHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function getComB(userId) {
    return new Promise((resolve) => {
        axios.get(`/api/com-b/${userId}`, useBasicAuthHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function forgotPassword(payload) {
    return new Promise((resolve) => {
        axios.post("/api/forgot-password", payload, useBasicAuthHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function resetPassword(payload) {
    return new Promise((resolve) => {
        axios.post("/api/reset-password", payload, useBasicAuthHeaders())
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => resolve({status: false, message: err}));
    });
}

function updatePersonalInfo(payload) {
    return new Promise((resolve) => {
        axios.post('/api/update-personal-info', payload, useBearerTokenHeaders(true))
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}

function changePassword(payload) {
    return new Promise((resolve) => {
        axios.post('/customer/api/change-password', payload, useBearerTokenHeaders())
            .then(response => {
                resolve(response.data)
            }).catch(err => resolve({status: false, message: err}));
    })
}