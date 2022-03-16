<template>
  <main>
    <WordGrid />
    <TheKeyboard />
  </main>
</template>

<script lang="ts">
import TheKeyboard from "@/components/TheKeyboard.vue";
import WordGrid from "@/components/WordGrid.vue";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
  components: {
    TheKeyboard,
    WordGrid,
  },
});
</script>

<style>
@import "@/assets/base.css";
</style>
