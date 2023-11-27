import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import axios from "axios";

interface ITodo {
  id: number;
  content: string;
  createdAt: number;
  editable: boolean;
  done: boolean;
}

export const useTodoStore = defineStore("todos", () => {
  const loading = ref(false);
  const todos = ref<ITodo[]>(JSON.parse(localStorage.getItem("todos") || "[]"));
  const apiUrl = "https://65632c71ee04015769a6dfb6.mockapi.io/api/todo";
  let fetched = false;

  async function fetchTodos() {
    if (!fetched) {
      try {
        loading.value = true;
        const response = await axios.get(apiUrl);
        todos.value = response.data;
        fetched = true;
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        loading.value = false;
      }
    }
  }

  async function addTodo(newTodo: ITodo) {
    try {
      loading.value = true;
      const response = await axios.post(apiUrl, newTodo);
      todos.value.push(response.data);
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      loading.value = false;
    }
  }

  async function removeTodo(todoId: number) {
    try {
      loading.value = true;
      await axios.delete(`${apiUrl}/${todoId}`);
      todos.value = todos.value.filter((todo) => todo.id !== todoId);
    } catch (error) {
      console.error("Error removing todo:", error);
    } finally {
      loading.value = false;
    }
  }

  async function updateTodo(updatedTodo: ITodo) {
    try {
      const index = todos.value.findIndex((todo) => todo.id === updatedTodo.id);
      if (index !== -1) {
        const response = await axios.put(
          `${apiUrl}/${updatedTodo.id}`,
          updatedTodo
        );
        todos.value[index] = response.data;
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }

  const todosAsc = computed(() =>
    todos.value.slice().sort((a: ITodo, b: ITodo) => a.createdAt - b.createdAt)
  );

  watch(todos, (newVal) => {
    localStorage.setItem("todos", JSON.stringify(newVal));
  });

  return {
    addTodo,
    removeTodo,
    todosAsc,
    fetchTodos,
    updateTodo,
    loading,
  };
});
