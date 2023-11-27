<template>
  <section class="create-todo">
    <h3>CREATE A TODO</h3>

    <form id="new-todo-form" @submit.prevent="handleAddTodo">
      <h4>What's on your todo list?</h4>
      <input type="text" name="content" id="content" v-model="inputContent" />

      <input type="submit" value="Add todo" :disabled="loading" />
      <TheLoader v-if="loading" :text="'Loading...'" />
    </form>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTodoStore } from "@/stores/todoStore";
import TheLoader from "@/components/TheLoader.vue";

const inputContent = ref("");
const todoStore = useTodoStore();
const loading = computed(() => todoStore.loading);

const handleAddTodo = () => {
  if (inputContent.value.trim() === "") {
    return;
  }
  const newTodo = {
    id: Math.random(),
    content: inputContent.value,
    done: false,
    editable: false,
    createdAt: new Date().getTime(),
  };

  todoStore.addTodo(newTodo);
  inputContent.value = "";
};
</script>
