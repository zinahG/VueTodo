<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import TodoForm from "@/components/TodoForm.vue";
import TodoList from "@/components/TodoList.vue";
import { useTodoStore } from "@/stores/todoStore";
import { inject } from "vue";

interface Todo {
  id: number;
  content: string;
  done: boolean;
  editable: boolean;
  createdAt: number;
}

const todoStore = useTodoStore();

const { name, updateName } = inject("sharedName");

const onNameChange = (newName) => {
  updateName(newName);
};

const sortedTodos = todoStore.todosAsc;

const addTodo = (newVal: string) => {
  debugger;
  if (newVal.trim() === "") {
    return;
  }

  todoStore.addTodo({
    id: Math.random(),
    content: newVal,
    done: false,
    editable: false,
    createdAt: new Date().getTime(),
  });
};

// const removeTodo = (todo: Todo) => {
//   todos.value = todos.value.filter((t) => t !== todo);
//   console.log(todo);
// };

// watch(
//   todos,
//   (newVal) => {
//     localStorage.setItem("todos", JSON.stringify(newVal));
//   },
//   {
//     deep: true,
//   }
// );

onMounted(() => {
  const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
  savedTodos.forEach((todo) => todoStore.addTodo(todo));
  // todos.value = JSON.parse(localStorage.getItem("todos") || "[]");
});
</script>

<template>
  <layout>
    <main class="app">
      <section class="greeting">
        <h2 class="title">
          Hello,
          <input
            type="text"
            id="name"
            placeholder="your name"
            :value="name"
            @input="onNameChange($event.target.value)"
          />
        </h2>
      </section>

      <todo-form :addTodo="addTodo" />

      <todo-list />
    </main>
  </layout>
</template>
