import {createRouter, createWebHistory} from "vue-router";
import ParkingDirectoryComponent from "../parking-management/pages/parking-directory.component.vue";
import ParkingRegistrationComponent from "../parking-management/pages/parking-registration.component.vue";
import ParkingHomeComponent from "../parking-management/pages/parking-home.component.vue";
import SignInComponent from "../iam/pages/sign-in.component.vue";
import {authenticationGuard} from "../iam/services/authentication.guard.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/parking/directory/:ownerId',
            name: 'parking-directory',
            component: ParkingDirectoryComponent,
            meta: {title: 'Parking Directory', layout: 'ParkingManagementLayout'}
        },
        {
            path: '/home/:parkingId',
            name: 'home',
            component: ParkingHomeComponent,
            meta: {title: 'Home', layout: 'ParkingManagementLayout'}
        },
        {
            path: '/parking/registration',
            name: 'parking-registration',
            component: ParkingRegistrationComponent,
            meta: {title: 'Parking Registration'}
        },
        {
            path: '/sign-in',
            name: 'sign-in',
            component: SignInComponent,
            meta: {title: 'Sign In', layout: 'EmptyLayout'}
        },
        {
            path: '/',
            redirect: () => {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    return { name: 'sign-in' };
                }
                return { name: 'parking-directory', params: { ownerId: userId } };
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    // Set the page title
    let baseTitle = 'SmartParking System';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    // Call the authentication guard
    authenticationGuard(to, from, next);
})

export default router;