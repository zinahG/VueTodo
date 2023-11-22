<script setup>
import Layout from "@/components/Layout.vue";
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
  <layout>
    <router-view></router-view>
  </layout>
</template>
