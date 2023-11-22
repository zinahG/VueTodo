import { createApp } from "vue";
import App from "./App.vue";
import "./main.css";
import { createRouter, createWebHistory } from "vue-router";
import router from "./router";

createApp(App).use(router).mount("#app");
