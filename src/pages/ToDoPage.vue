<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import TodoForm from "@/components/TodoForm.vue";
import TodoList from "@/components/TodoList.vue";

import { inject } from "vue";

interface Todo {
  content: string;
  done: boolean;
  editable: boolean;
  createdAt: number;
}

const todos = ref<Todo[]>([]);

const { name, updateName } = inject("sharedName");

const onNameChange = (newName) => {
  updateName(newName);
};

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
  <layout>
    <main class="app">
      <section class="greeting">
        <h2 class="title">
          Hello,
          <input
            type="text"
            id="name"
            placeholder="your name"
            :value="name"
            @input="onNameChange($event.target.value)"
          />
        </h2>
      </section>

      <todo-form :addTodo="addTodo" />

      <todo-list :todosAsc="todosAsc" :removeTodo="removeTodo" />
    </main>
  </layout>
</template>
