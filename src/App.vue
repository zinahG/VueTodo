<script setup>
import Navbar from "@/components/Navbar.vue";
import { provide, ref, watch } from "vue";

const name = ref(localStorage.getItem("name") || "");

const updateName = (newName) => {
  name.value = newName;
};

provide("sharedName", {
  name,
  updateName,
});

watch(name, (newVal) => {
  localStorage.setItem("name", newVal);
});
</script>

<template>
  <navbar></navbar>
  <router-view></router-view>
</template>
