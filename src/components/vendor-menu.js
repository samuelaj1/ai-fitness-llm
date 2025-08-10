export const menuItems = [
    {
        label: 'dashboard',
        icon: 'ri-dashboard-line',
        link: '/'
    },
    {
        label: 'product.text',
        icon: 'ri-list-check',
        link: '/product',
    },
    {
        label: 'order.text',
        icon: 'ri-shopping-cart-line',
        permissions: ["manage_orders"],
        subItems: [
            {
                label: 'order.submenu.allOrders',
                icon: 'ri-user-search-line',
                link: '/orders'
            },
            {
                label: "order.submenu.addOrders",
                icon: "ri-user-add-line",
                link: '/add-orders'
            },
        ]
    },
    {
        label: 'payment.text',
        icon: 'ri-bank-card-line',
        permissions: ["manage_payments"],
        subItems: [
            {
                label: 'payment.submenu.withdrawal',
                link: '/payment/withdrawal'
            },

            {
                label: 'payment.submenu.requests',
                link: '/payment/requests'
            }
        ]
    },
    {
        label: 'order_transactions',
        icon: 'ri-money-dollar-circle-line',
        permissions: ["manage_order_transactions"],
        link: '/auth'
    },
    {
        label: 'faq',
        icon: 'ri-question-line',
        link: '/faq'
    },
    {
        label: 'user-management',
        icon: 'ri-user-line',
        link: '/manage-users',
        permissions: ["manage_users"],

    }
];
