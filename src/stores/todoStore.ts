import { defineStore } from "pinia";

export interface Todo {
  id: number;
  content: string;
  done: boolean;
  editable: boolean;
  createdAt: number;
}

export const useTodoStore = defineStore("todos", {
  state: () => ({
    todos: [] as Todo[],
  }),
  actions: {
    addTodo(newTodo: Todo) {
      this.todos.push(newTodo);
    },
    removeTodo(todoId: number) {
      this.todos = this.todos.filter((todo) => todo.id !== todoId);
    },
  },
  getters: {
    todosAsc(state) {
      return state.todos.slice().sort((a, b) => a.createdAt - b.createdAt);
    },
  },
});
