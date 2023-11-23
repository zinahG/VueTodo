<script setup lang="ts">
import { inject } from "vue";
import { useTodoStore } from "@/stores/todoStore";
import { computed } from "vue";

const todoStore = useTodoStore();
const { name } = inject("sharedName");

const sortedTodos = computed(() =>
  todoStore.todos.slice().sort((a, b) => a.createdAt - b.createdAt)
);
</script>

<template>
  <div class="about">
    <h1>This is About Page: {{ name }}</h1>
    <section class="todo-list">
      <h3>TODO LIST</h3>
      <div class="list" id="todo-list">
        <ul>
          <li v-for="todo in sortedTodos" :key="todo.id">
            {{ todo.content }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
