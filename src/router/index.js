import {createRouter, createWebHistory} from "vue-router";
import ParkingDesignComponent from "../parking-management/components/parking-design.component.vue";
import ParkingRegistrationComponent from "../parking-management/pages/parking-registration.component.vue";

const router= createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/parking/registration', name: 'parking-registration', component: ParkingRegistrationComponent, meta: { title: 'Parking Registration'}},
        { path: '/parking/design', name: 'parking-design', component: ParkingDesignComponent, meta: { title: 'Parking Design'}},
        { path: '/', redirect: '/parking/design' },
    ]
});

export default router;