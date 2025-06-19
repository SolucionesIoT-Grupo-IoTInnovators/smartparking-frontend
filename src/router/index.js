import {createRouter, createWebHistory} from "vue-router";
import {authenticationGuard} from "../iam/services/authentication.guard.js";
import ParkingDirectoryComponent from "../parking-management/pages/parking-directory.component.vue";
import ParkingRegistrationComponent from "../parking-management/pages/parking-registration.component.vue";
import ParkingHomeComponent from "../parking-management/pages/parking-home.component.vue";
import SignInComponent from "../iam/pages/sign-in.component.vue";
import SignUpComponent from "../iam/pages/sign-up.component.vue";
import ReviewsFeedComponent from "../reviews/pages/reviews-feed.component.vue";
import ReservationsDataComponent from "../reservations/pages/reservations-data.component.vue";
import ParkingDashboardComponent from "../dashboard-and-analytics/pages/parking-dashboard.component.vue";
import ParkingCreateAndEditComponent from "../parking-management/components/parking-create-and-edit.component.vue";
import ParkingProfileComponent from "../parking-management/pages/parking-profile.component.vue";
import OwnerProfileComponent from "../profile-management/pages/owner-profile.component.vue";
import DeviceMonitoringPage from "../devices-monitoring/pages/device-monitoring.page.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/parking',
            children: [
                {
                    path: 'home/:parkingId',
                    name: 'home',
                    component: ParkingHomeComponent,
                    meta: {title: 'Home', layout: 'ParkingManagementLayout'}
                },
                {
                    path: 'profile',
                    name: 'parking-profile',
                    component: ParkingProfileComponent,
                    meta: {title: 'Parking Profile', layout: 'ParkingManagementLayout'}
                },
                {
                    path: 'directory/:ownerId',
                    name: 'parking-directory',
                    component: ParkingDirectoryComponent,
                    meta: {title: 'Parking Directory', layout: 'AuthLayout'}
                },
                {
                    path: 'registration',
                    name: 'parking-registration',
                    component: ParkingRegistrationComponent,
                    meta: {title: 'Parking Registration', layout: 'AuthLayout'}
                },
                {
                    path: 'reviews',
                    name: 'parking-reviews',
                    component: ReviewsFeedComponent,
                    meta: {title: 'Parking Reviews', layout: 'ParkingManagementLayout'}
                },
                {
                    path: 'reservations',
                    name: 'reservations-data',
                    component: ReservationsDataComponent,
                    meta: {title: 'Reservations Data', layout: 'ParkingManagementLayout'}
                },
                {
                    path: 'dashboard',
                    name: 'dashboard',
                    component: ParkingDashboardComponent,
                    meta: {title: 'Parking Dashboard', layout: 'ParkingManagementLayout'}
                },
                {
                    path: 'devices',
                    name: 'devices-monitoring',
                    component: DeviceMonitoringPage,
                    meta: {title: 'Device Monitoring', layout: 'ParkingManagementLayout'}
                }
            ]
        },
        {
          path: '/profile/:ownerId',
            name: 'owner-profile',
            component: OwnerProfileComponent,
            meta: {title: 'Owner Profile', layout: 'AuthLayout'}
        },
        {
            path: '/sign-in',
            name: 'sign-in',
            component: SignInComponent,
            meta: {title: 'Sign In', layout: 'EmptyLayout'}
        },
        {
            path: '/sign-up',
            name: 'sign-up',
            component: SignUpComponent,
            meta: {title: 'Sign Up', layout: 'EmptyLayout'}
        },
        {
            path: '/',
            redirect: () => {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    return {name: 'sign-in'};
                }
                return {name: 'parking-directory', params: {ownerId: userId}};
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