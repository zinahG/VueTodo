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
import { ref, defineProps } from "vue";

import TheLoader from "@/components/TheLoader.vue";

const props = defineProps(["todo", "removeTodo", "saveEdit"]);

const todo = ref(props.todo);
const loading = ref(false);

const removeTodo = async () => {
  try {
    loading.value = true;
    await props.removeTodo();
  } finally {
    loading.value = false;
  }
};

const toggleEdit = () => {
  todo.value.editable = !todo.value.editable;
};

const saveEdit = () => {
  props.saveEdit(todo.value);
  todo.value.editable = false;
};
</script>

<style scoped>
.todo-content {
  margin-left: 10px;
}
</style>
