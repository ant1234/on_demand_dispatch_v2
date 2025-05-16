import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';
import { createPinia } from 'pinia';
import ToastPlugin from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const app = createApp(App);
const pinia = createPinia();
const importIcons = require.context('./components/', true, /\.vue$/);

// Register components globally
function registerComponents() {
    importIcons.keys().forEach((fileName) => {
        const componentName = fileName.split('/').pop().split('.')[0];
        const componentConfig = importIcons(fileName);
        app.component(componentName, componentConfig.default || componentConfig);
    });
}

app.use(pinia);
app.use(router);
app.use(ToastPlugin);
registerComponents();
app.mount('#app');
