<template>
  <section class="todo-list">
    <div class="list" id="todo-list">
      <div
        v-for="todo in todosAsc"
        :key="todo.id"
        :class="`todo-item ${todo.done && 'done'}`"
      >
        <div class="actions">
          <button class="delete" @click="removeTodo(todo.id)">Delete</button>
          <span class="todo-content">{{ todo.content }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useTodoStore } from "@/stores/todoStore";
import { toRef, onMounted } from "vue";

const todoStore = useTodoStore();
const todosAsc = toRef(todoStore, "todosAsc");
onMounted(() => {
  todoStore.fetchTodos();
});

const removeTodo = (todoId) => {
  todoStore.removeTodo(todoId);
};
</script>

<style scoped>
.todo-content {
  margin-left: 10px;
}
</style>
