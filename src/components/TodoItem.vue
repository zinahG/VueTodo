<template>
  <div :class="`todo-item ${todo.done && 'done'}`">
    <div class="actions">
      <button class="delete" @click="removeTodo">
        <TheLoader v-if="loading" :text="'Loading...'" />
        Delete
      </button>
      <span v-if="!todo.editable" class="todo-content" @dblclick="toggleEdit">
        {{ todo.content }}
      </span>
      <input
        v-else
        v-model="todo.content"
        @keyup.enter="saveEdit"
        @blur="saveEdit"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTodoStore } from "@/stores/todoStore";
import TheLoader from "@/components/TheLoader.vue";

const props = defineProps(["todo"]);
const todoStore = useTodoStore();
const todo = ref(props.todo);
const loading = ref(false);

const removeTodo = async () => {
  try {
    todoStore.loading = true;
    await todoStore.removeTodo(todo.value.id);
  } catch (error) {
    console.error("Error removing todo:", error);
  }
};

const saveEdit = () => {
  todoStore.updateTodo(todo.value);
  todo.value.editable = false;
};
const toggleEdit = () => {
  todo.value.editable = !todo.value.editable;
};
</script>

<style scoped>
.todo-content {
  margin-left: 10px;
}
</style>
