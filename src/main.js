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
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import Chart from 'primevue/chart';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import Drawer from 'primevue/drawer';
import FileUpload from 'primevue/fileupload';
import FloatLabel from "primevue/floatlabel";
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputMask from 'primevue/inputmask';
import InputNumber from "primevue/inputnumber";
import InputText from 'primevue/inputtext';
import Menu from 'primevue/menu';
import Password from 'primevue/password';
import ProgressSpinner from 'primevue/progressspinner';
import Rating from 'primevue/rating';
import Tag from 'primevue/tag';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import Toolbar from 'primevue/toolbar';
import Tooltip from 'primevue/tooltip';
import SelectButton from 'primevue/selectbutton';
import SplitButton from 'primevue/splitbutton'
import RadioButton from 'primevue/radiobutton';


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
.use(ToastService)
.directive('tooltip', Tooltip);

app.component('pv-avatar', Avatar)
    .component('pv-badge', Badge)
    .component('pv-button', Button)
    .component('pv-card', Card)
    .component('pv-column', Column)
    .component('pv-chart', Chart)
    .component('pv-data-table', DataTable)
    .component('pv-dialog', Dialog)
    .component('pv-drawer', Drawer)
    .component('pv-file-upload', FileUpload)
    .component('pv-float-label', FloatLabel)
    .component('pv-icon-field', IconField)
    .component('pv-input-icon', InputIcon)
    .component('pv-input-mask', InputMask)
    .component('pv-input-number', InputNumber)
    .component('pv-input-text', InputText)
    .component('pv-menu', Menu)
    .component('pv-password', Password)
    .component('pv-progress-spinner', ProgressSpinner)
    .component('pv-rating', Rating)
    .component('pv-tag', Tag)
    .component('pv-textarea', Textarea)
    .component('pv-toast', Toast)
    .component('pv-toolbar', Toolbar)
    .component('pv-select-button', SelectButton)
    .component('pv-split-button', SplitButton)
    .component('pv-radio-button', RadioButton);


app.mount('#app');