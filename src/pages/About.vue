<script setup lang="ts">
import { inject, toRef } from "vue";
import { useTodoStore } from "@/stores/todoStore";
import { sharedName } from "../utils/types";

const todoStore = useTodoStore();
const todosAsc = toRef(todoStore, "todosAsc");
const { name } = inject<sharedName>("sharedName");
</script>

<template>
  <div class="about">
    <h1>This is About Page: {{ name }}</h1>
    <section class="todo-list">
      <h3>TODO LIST</h3>
      <div class="list" id="todo-list">
        <ul>
          <li v-for="todo in todosAsc" :key="todo.id">
            {{ todo.content }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
