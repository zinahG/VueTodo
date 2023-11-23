import { defineStore } from "pinia";
import { ref, computed } from "vue";

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

  return {
    addTodo,
    removeTodo,
    todosAsc,
  };
});
