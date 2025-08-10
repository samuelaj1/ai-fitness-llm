export const customerServiceMenuItems = [
    {
        label: "orders",
        icon: "ri-file-list-line",
        link: '/customer-service/orders',
    },

    {
        label: "adminShops",
        icon: "ri-store-2-line",
        link: "/customer-service/vendors",
    },

    {
        label: "product.text",
        icon: "ri-wallet-3-line",
        permission: "manage admins",
        link: '/customer-service/products',
    },
    {
        label: "settings",
        icon: "ri-user-settings-line",
        permission: "manage admins",
        link: '/customer-service/auth-settings',
    }
];

