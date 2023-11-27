<template>
  <section class="todo-list">
    <div class="list" id="todo-list">
      <TheLoader v-if="todoStore.loading.fetch" :text="'Fetching todos...'" />
      <div v-if="!loading">
        <div
          v-for="todo in todosAsc"
          :key="todo.id"
          :class="`todo-item ${todo.done && 'done'}`"
        >
          <div class="actions">
            <button class="delete" @click="removeTodo(todo.id)">
              <TheLoader
                v-if="todoStore.loading.remove === todo.id"
                :text="'Deleting...'"
              />Delete
            </button>
            <span
              v-if="!todo.editable"
              class="todo-content"
              @dblclick="toggleEdit(todo)"
            >
              {{ todo.content }}
            </span>
            <input
              v-else
              v-model="todo.content"
              @keyup.enter="saveEdit(todo)"
              @blur="saveEdit(todo)"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useTodoStore } from "@/stores/todoStore";
import { toRef, onMounted, computed } from "vue";
import TheLoader from "@/components/TheLoader.vue";

const todoStore = useTodoStore();
const loading = computed(() => todoStore.loading.fetch);
const todosAsc = toRef(todoStore, "todosAsc");

onMounted(() => {
  todoStore.fetchTodos();
});

const removeTodo = async (todoId) => {
  try {
    todoStore.loading.remove = todoId;
    await todoStore.removeTodo(todoId);
  } finally {
    todoStore.loading.remove = null;
  }
};

const toggleEdit = (todo) => {
  todo.editable = !todo.editable;
};

const saveEdit = (todo) => {
  todoStore.updateTodo(todo);
  todo.editable = false;
};
</script>

<style scoped>
.todo-content {
  margin-left: 10px;
}
</style>
