<template>
  <section class="todo-list">
    <div class="list" id="todo-list">
      <TheLoader v-if="loading" :text="'Fetching todos...'" />
      <div v-if="!loading">
        <TodoItem
          v-for="todo in todosAsc"
          :key="todo.id"
          :todo="todo"
          :removeTodo="removeTodo"
          :updateTodo="updateTodo"
          @edit="handleEdit"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useTodoStore } from "@/stores/todoStore";
import { onMounted, computed } from "vue";
import TodoItem from "@/components/TodoItem.vue";
import TheLoader from "@/components/TheLoader.vue";

const todoStore = useTodoStore();
const loading = computed(() => todoStore.loading);
const todosAsc = computed(() => todoStore.todosAsc);

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

const updateTodo = (todo) => {
  todoStore.updateTodo(todo);
};

const handleEdit = ({ id, editable }) => {
  const todoToUpdate = todosAsc.value.find((todo) => todo.id === id);
  if (todoToUpdate) {
    todoToUpdate.editable = editable;
    todoStore.updateTodo(todoToUpdate);
  }
};
</script>
