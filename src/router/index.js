import {createRouter, createWebHistory} from "vue-router";
import ParkingRegistrationComponent from "../parking-management/pages/parking-registration.component.vue";
import ParkingHomeComponent from "../parking-management/pages/parking-home.component.vue";

const router= createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home', name: 'home', component: ParkingHomeComponent, meta: { title: 'Home'}},
        { path: '/parking/registration', name: 'parking-registration', component: ParkingRegistrationComponent, meta: { title: 'Parking Registration'}},
        { path: '/', redirect: '/home' },
    ]
});

export default router;