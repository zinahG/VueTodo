<script setup>
import Layout from "./components/Layout.vue";
import ToDoPage from "./pages/ToDoPage.vue";
import About from "./pages/About.vue";
</script>

<template>
  <layout>
    <template v-slot:pageTitle>
      <h1>ToDo Vue App</h1>
      <br />
    </template>
    <router-view></router-view>
  </layout>
</template>

<style scoped>
h1 {
  text-align: center;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}
</style>
