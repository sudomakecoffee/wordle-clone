<template>
  <button class="key key-backspace" aria-label="Backspace key" data-delete>
    <DeleteIcon />
  </button>
</template>

<script setup lang="ts">
import DeleteIcon from "@/components/icons/IconDelete.vue";
</script>

<style scoped>
.key > svg {
  width: 1.75em;
  height: 1.75em;
}
</style>
