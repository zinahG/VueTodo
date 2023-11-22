import { createRouter, createWebHistory } from "vue-router";
import ToDoPage from "@/pages/ToDoPage.vue";
import About from "@/pages/About.vue";

const routes = [
  { path: "/", name: "ToDoPage", component: ToDoPage },
  { path: "/about", name: "About", component: About },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
