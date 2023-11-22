<script setup lang="ts">
import { inject } from "vue";

const { name, updateName } = inject("sharedName");
let localName = name;

const changeName = (newName) => {
  updateName(newName);
  localName = newName;
};
</script>

<template>
  <div class="about">
    <nav class="navbar">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
      <hr class="navbar-line" />
    </nav>
    <br />
    <h1>This is About Page</h1>
    <br />
    <div class="input-container">
      <input type="text" v-model="localName" class="custom-input" />
      <button @click="changeName(localName)">Change Name</button>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  margin-bottom: 20px;
}

ul {
  list-style: none;
  display: flex;
  padding: 0;
  margin-bottom: 10px;
}

li {
  margin: 0 10px;
}

hr.navbar-line {
  width: calc(100% - 20px);
  border: none;
  height: 1px;
  background-color: var(--dark);
  position: absolute;
  bottom: 0;
}
.input-container {
  display: flex;
  align-items: center;
}

.custom-input {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  font-size: 14px;
}
</style>
