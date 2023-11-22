<script setup lang="ts">
import { inject } from "vue";

const { name } = inject("sharedName");
</script>

<template>
  <div class="about">
    <h1>This is About Page: {{ name }}</h1>
  </div>
</template>
