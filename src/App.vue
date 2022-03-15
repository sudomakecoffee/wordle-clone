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
import { useDictionaryStore } from "./stores/dictionaryStore";

export default defineComponent({
  setup() {
    const dictionaryStore = useDictionaryStore();
    const validWord = dictionaryStore.valid;

    return {
      validWord,
    };
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
