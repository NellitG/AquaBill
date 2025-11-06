import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import VueApexCharts from "vue3-apexcharts";
import Toast from "vue3-toastify";
import "vue3-toastify/dist/index.css";

/**styling */
// import "./style.css";
import "./assets/tailwind.css"; //tailwind

// setup fake backend
import { fakeBackend } from "./helpers";
fakeBackend();

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(Toast);

app.use(VueApexCharts);
app.component("apexchart", VueApexCharts);
app.mount("#app");
