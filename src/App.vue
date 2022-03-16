<template>
  <main>
    <AlertContainer />
    <WordGrid />
    <TheKeyboard />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AlertContainer from "./components/AlertContainer.vue";
import TheKeyboard from "@/components/TheKeyboard.vue";
import WordGrid from "@/components/WordGrid.vue";

export default defineComponent({
  setup() {
    return {};
  },
  components: {
    AlertContainer,
    TheKeyboard,
    WordGrid,
  },
});
</script>

<style>
@import "@/assets/base.css";
</style>
