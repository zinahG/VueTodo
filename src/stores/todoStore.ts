import { defineStore } from "pinia";
import { ref, computed, onMounted, watch } from "vue";

interface ITodo {
  id: number;
  content: string;
  createdAt: number;
  editable: boolean;
  done: boolean;
}

// export const useTodoStore = defineStore("todos", () => {
//   const todos = ref<ITodo[]>([]);

//   function addTodo(newTodo: ITodo) {
//     todos.value = [...todos.value, newTodo];
//   }

//   function removeTodo(todoId: number) {
//     todos.value = todos.value.filter((todo) => todo.id !== todoId);
//   }

//   const todosAsc = computed(() =>
//     todos.value.slice().sort((a: ITodo, b: ITodo) => a.createdAt - b.createdAt)
//   );

//   onMounted(() => {
//     todos.value = JSON.parse(localStorage.getItem("todos") || "[]");
//   });

//   watch(todos, (newVal) => {
//     localStorage.setItem("todos", JSON.stringify(newVal));
//   });

//   return {
//     addTodo,
//     removeTodo,
//     todosAsc,
//   };
// });

export const useTodoStore = defineStore("todos", () => {
  const todos = ref<ITodo[]>([]);
  const apiUrl = "https://jsonplaceholder.typicode.com/posts";

  async function addTodo(newTodo: ITodo) {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to add todo");
      }
      const addedTodo = await response.json();
      todos.value.push(addedTodo);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }

  async function removeTodo(todoId: number) {
    try {
      const response = await fetch(`${apiUrl}/${todoId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to remove todo");
      }
      todos.value = todos.value.filter((todo) => todo.id !== todoId);
    } catch (error) {
      console.error("Error removing todo:", error);
    }
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
