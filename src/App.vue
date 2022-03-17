<template>
  <main>
    <p>Word of the day: {{ answerStore.today }}</p>
    <AlertContainer />
    <WordGrid />
    <TheKeyboard />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AlertContainer from "@/components/AlertContainer.vue";
import TheKeyboard from "@/components/TheKeyboard.vue";
import WordGrid from "@/components/WordGrid.vue";
import { useAnswerStore } from "@/stores/answerStore";
import { useDictionaryStore } from "@/stores/dictionaryStore";

export default defineComponent({
  setup() {
    const answerStore = useAnswerStore();
    const dictionaryStore = useDictionaryStore();
    return {
      answerStore,
      dictionaryStore,
    };
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
