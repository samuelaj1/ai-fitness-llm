export const menuItems = [
    {
        label: "adminDashboard",
        icon: "ri-dashboard-line",
        link: '/admin',
    },

    {
        label: "orders",
        icon: "ri-file-list-line",
        link: '/admin/orders',
    },

    {
        label: "adminShops",
        icon: "ri-store-2-line",
        isMenuCollapsed: false,
        subItems: [
            {
                label: "vendors",
                icon: "ri-store-2-line",
                link: "/admin/vendors"
            },
            {
                label: "pendingVendors",
                icon: "ri-file-user-line",
                link: "/admin/vendors/pending",
            },
            {
                label: "rejectedVendors",
                icon: "ri-file-user-line",
                link: "/admin/vendors/rejected",
            }
        ]
    },

    {
        label: "account",
        icon: "ri-money-dollar-box-line",
        link: '/admin/auth',
    },
    {
        label: "product.text",
        icon: "ri-wallet-3-line",
        permission: "manage admins",
        link: '/admin/products',
    },
    {
        label: "branches",
        icon: "ri-building-2-line",
        permission: "manage admins",
        link: '/admin/branches',
    },
    {
        label: "payment.submenu.requests",
        icon: "ri-wallet-line",
        link: '/admin/payment/requests',
    },
    {
        label: "user-management",
        icon: "ri-user-settings-line",
        permission: "manage admins",
        link: '/admin/manage/branch/admins',
    },
    {
        label: "settings",
        icon: "ri-user-settings-line",
        permission: "manage admins",
        link: '/admin/auth-settings',
    },

];

