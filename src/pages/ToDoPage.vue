<script setup lang="ts">
import TodoForm from "@/components/TodoForm.vue";
import TodoList from "@/components/TodoList.vue";
import { inject } from "vue";
import { sharedName } from "../utils/types";

const { name, updateName } = inject<sharedName>("sharedName");
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
          @input="updateName((<HTMLInputElement>$event.target).value)"
        />
      </h2>
    </section>

    <todo-form />

    <todo-list />
  </main>
</template>
