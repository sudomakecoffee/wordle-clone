<template>
  <header></header>
  <main>
    <WordGrid />
    <TheKeyboard />
    <AlertContainer />
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
#app {
  height: calc(100vh - var(--header-height));
}

main {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  height: 100%;

  display: flex;
  flex-direction: column;
}

header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding: 0 1rem;

  height: var(--header-height);

  border-bottom: 1px solid
    hsl(
      var(--tile-border-hue, 240),
      var(--tile-border-saturation, 2%),
      var(--tile-border-lightness, 23%)
    );
}
</style>
