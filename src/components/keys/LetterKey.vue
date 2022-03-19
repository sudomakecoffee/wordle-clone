<template>
  <button class="key" :data-key="letter" :aria-label="ariaLabel">
    {{ letter }}
  </button>
</template>

<script setup lang="ts">
defineProps({
  letter: { type: String, required: true },
  ariaLabel: { type: String, required: true },
});
</script>

<style></style>
