import {createApp} from 'vue'
import './style.css';
import App from './App.vue'
import i18n from "./i18n.js";

import PrimeVue from 'primevue/config';
import Material from "@primeuix/themes/material";
import {definePreset} from "@primeuix/themes";

import 'primeflex/primeflex.css';

import 'primeicons/primeicons.css'
import DialogService from "primevue/dialogservice";
import ToastService from "primevue/toastservice";
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import FileUpload from 'primevue/fileupload';
import FloatLabel from "primevue/floatlabel";
import InputNumber from "primevue/inputnumber";
import InputText from 'primevue/inputtext';
import Menu from 'primevue/menu';
import ProgressSpinner from 'primevue/progressspinner';
import Rating from 'primevue/rating';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import Toolbar from 'primevue/toolbar';
import SplitButton from 'primevue/splitbutton';


import router from "./router/index.js";
import {createPinia} from 'pinia';

const app = createApp(App)

app.use(i18n);

const pinia = createPinia();
app.use(pinia);

app.use(router);


const MyPreset = definePreset(Material, {
    semantic: {
        primary: {
            50: '{blue.50}',
            100: '{blue.100}',
            200: '{blue.200}',
            300: '{blue.300}',
            400: '{blue.400}',
            500: '{blue.500}',
            600: '{blue.600}',
            700: '{blue.700}',
            800: '{blue.800}',
            900: '{blue.900}',
            950: '{blue.950}',
        }
    }
});


app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
        options: {
            darkModeSelector: false,
        }
    }
})
.use(DialogService)
.use(ToastService);

app.component('pv-avatar', Avatar)
    .component('pv-button', Button)
    .component('pv-card', Card)
    .component('pv-dialog', Dialog)
    .component('pv-file-upload', FileUpload)
    .component('pv-float-label', FloatLabel)
    .component('pv-input-number', InputNumber)
    .component('pv-input-text', InputText)
    .component('pv-menu', Menu)
    .component('pv-progress-spinner', ProgressSpinner)
    .component('pv-rating', Rating)
    .component('pv-textarea', Textarea)
    .component('pv-toast', Toast)
    .component('pv-toolbar', Toolbar)
    .component('pv-split-button', SplitButton)


app.mount('#app');