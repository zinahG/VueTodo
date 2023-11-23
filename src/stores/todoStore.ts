import { defineStore } from "pinia";
import { ref, computed, onMounted, watch } from "vue";

interface ITodo {
  id: number;
  content: string;
  createdAt: number;
  editable: boolean;
  done: boolean;
}

export const useTodoStore = defineStore("todos", () => {
  const todos = ref<ITodo[]>([]);

  function addTodo(newTodo: ITodo) {
    todos.value = [...todos.value, newTodo];
  }

  function removeTodo(todoId: number) {
    todos.value = todos.value.filter((todo) => todo.id !== todoId);
  }

  const todosAsc = computed(() =>
    todos.value.slice().sort((a: ITodo, b: ITodo) => a.createdAt - b.createdAt)
  );

  onMounted(() => {
    todos.value = JSON.parse(localStorage.getItem("todos") || "[]");
  });

  watch(todos, (newVal) => {
    localStorage.setItem("todos", JSON.stringify(newVal));
  });

  return {
    addTodo,
    removeTodo,
    todosAsc,
  };
});
