<script setup lang="ts">
import { onMounted } from "vue";
import TodoForm from "@/components/TodoForm.vue";
import TodoList from "@/components/TodoList.vue";
import { useTodoStore } from "@/stores/todoStore";
import { inject } from "vue";

const todoStore = useTodoStore();

const { name, updateName } = inject("sharedName");

const onNameChange = (newName) => {
  updateName(newName);
};

const addTodo = (newVal: string) => {
  if (newVal.trim() === "") {
    return;
  }

  todoStore.addTodo({
    id: Math.random(),
    content: newVal,
    done: false,
    editable: false,
    createdAt: new Date().getTime(),
  });
};

onMounted(() => {
  const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
  savedTodos.forEach((todo) => todoStore.addTodo(todo));
});
</script>

<template>
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

    <todo-list />
  </main>
</template>
