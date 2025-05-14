import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();
const importIcons = require.context('./components/icons', true, /\.vue$/);

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
registerComponents();
app.mount('#app');
