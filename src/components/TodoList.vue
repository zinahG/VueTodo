<template>
  <section class="todo-list">
    <div class="list" id="todo-list">
      <div
        v-for="todo in sortedTodos"
        :key="todo.id"
        :class="`todo-item ${todo.done && 'done'}`"
      >
        <label>
          <input
            type="checkbox"
            v-model="todo.done"
            @change="updateTodoStatus(todo)"
          />
        </label>

        <div class="todo-content">
          <input
            type="text"
            v-model="todo.content"
            @change="updateTodoContent(todo)"
          />
        </div>

        <div class="actions">
          <button class="delete" @click="removeTodo(todo.id)">Delete</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useTodoStore } from "@/stores/todoStore";

const todoStore = useTodoStore();
const sortedTodos = todoStore.todosAsc;

const removeTodo = (todoId) => {
  todoStore.removeTodo(todoId);
};

const updateTodoStatus = (todo) => {
  todoStore.updateTodoStatus(todo);
};

const updateTodoContent = (todo) => {
  todoStore.updateTodoContent(todo);
};
</script>
