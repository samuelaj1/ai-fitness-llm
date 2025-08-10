export const branchMenuItems = [
    {
        label: "branchDashboard",
        icon: "ri-admin-line",
        link: '/branch/public',
    },

    {
        label: "orders",
        icon: "ri-file-list-line",
        isMenuCollapsed: false,
        subItems: [
            {
                label: "order.submenu.allOrders",
                icon: "ri-store-2-line",
                link: '/branch/orders',

            },
            {
                label: "order.submenu.pendingApproval",
                icon: "ri-file-user-line",
                link: "/branch/orders/pending-approval",
            }
        ]
    },
    {
        label: "product.text",
        icon: "ri-file-user-line",
        permission: "manage branchs",
        link: '/branch/products',
    },
    {
        label: "transactions",
        icon: "ri-money-dollar-circle-line",
        link: '/branch/auth',
    },
    {
        label: "Configurations",
        icon: "ri-settings-3-line",
        link: '/branch/configurations',
    },
    {
        label: "settings",
        icon: "ri-user-settings-line",
        link: '/branch/auth-settings',
    }
];

