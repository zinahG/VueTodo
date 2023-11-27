<template>
  <div v-if="todo" :class="`todo-item ${todo.done ? 'done' : ''}`">
    <div class="actions">
      <button class="delete" @click="handleRemove">
        <TheLoader v-if="loading === todo.id" :text="'Deleting...'" />Delete
      </button>
      <span v-if="!todo.editable" class="todo-content" @dblclick="toggleEdit">
        {{ todo.content }}
      </span>
      <input
        v-else
        v-model="editedContent"
        @keyup.enter="saveEdit($event)"
        @blur="saveEdit($event)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits } from "vue";
import TheLoader from "@/components/TheLoader.vue";

const props = defineProps({
  todo: Object,
  onEdit: Function,
  removeTodo: Function,
});

const loading = ref(false);
const emits = defineEmits(["edit"]);

const editedContent = ref(props.todo.content);

const handleRemove = async () => {
  loading.value = true;
  try {
    await removeTodo(todo.id);
  } finally {
    loading.value = false;
  }
};

const toggleEdit = () => {
  emits("edit", { id: props.todo.id, editable: !props.todo.editable });
};

const saveEdit = (event) => {
  if (event.type === "keyup" && event.key !== "Enter") {
    return;
  }
  const updatedTodo = { ...props.todo, content: editedContent.value };
  props.onEdit(updatedTodo);
  emits("edit", { id: props.todo.id, editable: false });
};

const removeTodo = async (todoId) => {
  await props.removeTodo(todoId);
};
</script>

<style scoped>
.todo-content {
  margin-left: 10px;
}
</style>
