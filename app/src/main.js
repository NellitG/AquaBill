import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import Toast from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import "./assets/tailwind.css"; // Tailwind CSS

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(Toast);

// Only load fake backend in dev mode
if (import.meta.env.DEV) {
  import("./helpers").then(({ fakeBackend }) => fakeBackend());
}

app.mount("#app");
