import store from '../store/store'

export default [

    //////// AUTHENTICATION ROUTES /////////////////////////
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/pages/auth/login'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {

                // If the user is already logged in
                if (store.getters.GET_USER_INFO) {
                    next({name: 'Home'});
                } else {
                    // Continue to the login page
                    next()
                }

            },
        },
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/pages/auth/register'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                const user = store.getters.GET_USER_INFO;
                if (user) {
                    next({name: 'Home'});
                } else {
                    // Continue to the login page
                    next()
                }

            },
        },
    },

    {
        path: '/admin-login',
        name: 'adminLogin',
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                const loggedUser = store.getters.GET_USER_INFO;
                if (loggedUser && loggedUser.roles.includes('admin')) {
                    next({name: 'admin'});
                } else {
                    // Continue to the login page
                    next()
                }

            },
        },

        component: () => import('../views/pages/auth/admin-login'),
    },
    {
        path: '/admin-register',
        name: 'adminRegister',
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                const loggedUser = store.getters.GET_USER_INFO;
                if (loggedUser && loggedUser.roles.includes('admin')) {
                    next({name: 'admin'});
                } else {
                    // Continue to the login page
                    next()
                }

            },
        },

        component: () => import('../views/pages/auth/admin-register'),
    },

    {
        path: '/create-account',
        name: 'createAccount',
        component: () => import('../views/pages/auth/create-account'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If logged in but not completed auth creation
                const user = store.getters.GET_USER_INFO;
                if (user && !user.access_token) {
                    next()
                } else {
                    next({name: 'Home'});
                }

            },
        },
    },

    ///////////////////////// DASHBOARD ROUTES /////////////////////////////////
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/pages/public/index'),
    },

    {
        path: '/daily-check-in',
        name: 'DailyCheckIn',
        component: () => import('../views/pages/public/dailyCheckIn'),
    },

    {
        path: '/chat',
        name: 'CoachChat',
        component: () => import('../views/pages/public/coachChat'),
    },

    {
        path: '/analytics',
        name: 'analytics',
        component: () => import('../views/pages/public/analyticsDashboard'),
    },
    {
        path: '/saved-plans',
        name: 'savedPlans',
        component: () => import('../views/pages/public/savedPlans'),
    },

    {
        path: '/saved-plans/workouts',
        name: 'workOuts',
        component: () => import('../views/pages/public/workOuts'),
    },
    {
        path: '/saved-plans/diet-interventions',
        name: 'dietInterventions',
        component: () => import('../views/pages/public/dietInterventions'),
    },
    {
        path: '/saved-plans/diet-plans',
        name: 'dietPlans',
        component: () => import('../views/pages/public/dietPlans'),
    },

    {
        path: '/goals',
        name: 'goal',
        component: () => import('../views/pages/public/goals'),
    },

    {
        path: '/notifications',
        name: 'notifications',
        meta:{
            authRequired: true,
            roles: ['tradesperson']
        },
        component: () => import('../views/pages/lead-settings/notifications'),
    },

    ///////// EXTRA ROUTES //////////////////////////
    {
        path: '/logout',
        name: 'Logout',
        component: () => import('../views/pages/error/logout'),
    },
    {
        path: '/forgot-password',
        name: 'forgotPassword',
        component: () => import('../views/pages/auth/forgot-password'),
    },
    {
        path: '/reset-password',
        name: 'Reset-password',
        component: () => import('../views/pages/auth/reset-password'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.getters.GET_USER_INFO) {
                    next({name: 'Home'});
                } else {
                    // Continue to the login page
                    next()
                }

            },
        },
    },

    {
        path: '/extras/maintenance',
        name: 'extras-maintenance',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/extras/maintenance')
    },
    {
        path: '/extras/coming-soon',
        name: 'extras-coming-soon',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/extras/coming-soon')
    },
    {
        path: '/error/404',
        name: 'error-404',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/error/404')
    },
    {
        path: '/unauthorized',
        name: 'unauthorized',
        component: () => import('../views/pages/error/unauthorized')
    },
    {
        path: '/error/500',
        name: 'error-500',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/error/500')
    },

    {
        path: "*",
        redirect: "/error/404"
    }
]