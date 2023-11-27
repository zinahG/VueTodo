<template>
  <section class="todo-list">
    <div class="list" id="todo-list">
      <TheLoader v-if="loading" :text="'Loading...'" />
      <div v-if="!loading">
        <TodoItem
          v-for="todo in todosAsc"
          :key="todo.id"
          :todo="todo"
          :removeTodo="removeTodo.bind(null, todo.id)"
          :saveEdit="saveEdit"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import TodoItem from "@/components/TodoItem.vue";
import { useTodoStore } from "@/stores/todoStore";
import { onMounted, toRef, computed } from "vue";
import TheLoader from "@/components/TheLoader.vue";

const todoStore = useTodoStore();
const loading = computed(() => todoStore.loading);
const todosAsc = toRef(todoStore, "todosAsc");

onMounted(() => {
  todoStore.fetchTodos();
});

const removeTodo = async (todoId) => {
  try {
    todoStore.loading = todoId;
    await todoStore.removeTodo(todoId);
  } finally {
    todoStore.loading = null;
  }
};

const saveEdit = (todo) => {
  todoStore.updateTodo(todo);
};
</script>

<style scoped>
.todo-content {
  margin-left: 10px;
}
</style>
