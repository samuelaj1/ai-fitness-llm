import {defineAbility} from "@casl/ability";
import store from "../store/store";

export default defineAbility((can, cannot) => {

    const user = store.getters.GET_USER_INFO;

    console.log('user', user)
    if(user){

        user['permissions'].forEach(p => {
            can('permission', p);
        })

        user['roles'].forEach(r => {
            can('role', r);
            // can('access', p);
        })
    }

    // can('manage', 'drivers');
    // can('manage', 'rentals');
    // can('manage', 'invoices');
    // can('manage', 'service-charges');
    // can('manage', 'providers');
    // can('manage', 'receipts');
    // can('manage', 'f-admin');
    // can('manage', 'payouts');
    // can('manage', 'contract-forms');
    // can('manage', 'support');
    // can('manage', 'admins');
    // can('manage', 'unit4');
    // can('manage', 'settings');
    // can('manage', 'arrears-simulation');
    // cannot('delete', 'User');
});