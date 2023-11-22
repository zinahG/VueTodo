<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import TodoForm from "./../components/TodoForm.vue";
import TodoList from "./../components/TodoList.vue";

interface Todo {
  content: string;
  done: boolean;
  editable: boolean;
  createdAt: number;
}

const todos = ref<Todo[]>([]);
const name = ref("");

const inputContent = ref<string>("");

const todosAsc = computed(() =>
  todos.value.slice().sort((a, b) => {
    return a.createdAt - b.createdAt;
  })
);

const addTodo = (newval: string) => {
  if (newval.trim() === "") {
    return;
  }

  todos.value.push({
    content: newval,
    done: false,
    editable: false,
    createdAt: new Date().getTime(),
  });
};

const removeTodo = (todo: Todo) => {
  todos.value = todos.value.filter((t) => t !== todo);
  console.log(todo);
};

watch(name, (newVal) => {
  localStorage.setItem("name", newVal);
});

watch(
  todos,
  (newVal) => {
    localStorage.setItem("todos", JSON.stringify(newVal));
  },
  {
    deep: true,
  }
);
onMounted(() => {
  name.value = localStorage.getItem("name") || "";
  todos.value = JSON.parse(localStorage.getItem("todos") || "[]");
});
</script>

<template>
  <main class="app">
    <nav class="navbar">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
      <hr class="navbar-line" />
    </nav>
    <section class="greeting">
      <h2 class="title">
        Hello,
        <input type="text" id="name" placeholder="your name" v-model="name" />
      </h2>
    </section>

    <todo-form :addTodo="addTodo" />

    <todo-list :todosAsc="todosAsc" :removeTodo="removeTodo" />
  </main>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  margin-bottom: 20px;
}

ul {
  list-style: none;
  display: flex;
  padding: 0;
  margin-bottom: 10px;
}

li {
  margin: 0 10px;
}

hr.navbar-line {
  width: calc(100% - 20px);
  border: none;
  height: 1px;
  background-color: var(--dark);
  position: absolute;
  bottom: 0;
}
</style>
