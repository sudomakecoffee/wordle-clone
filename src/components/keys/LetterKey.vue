<template>
  <button class="key" :data-key="letter">{{ letter }}</button>
</template>

<script setup lang="ts">
defineProps({
  letter: { type: String, required: true },
});
</script>

<style></style>
