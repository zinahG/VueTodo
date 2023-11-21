<script setup lang="ts">
import Layout from "./../components/Layout.vue";
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
    <layout>
      <template v-slot:pageTitle>
        <h1>ToDo Vue App</h1>
      </template>
    </layout>
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
