<template>
  <div class="guess-grid">
    <WordTile v-for="t in tileCount" :key="t" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import WordTile from "@/components/WordTile.vue";

export default defineComponent({
  name: "WordGrid",
  props: {
    maxGuesses: {
      type: Number,
      default: 6,
    },
    wordLength: {
      type: Number,
      default: 5,
    },
  },
  setup(props) {
    const rows = computed(() => {
      return props.maxGuesses;
    });
    const cols = computed(() => {
      return props.wordLength;
    });
    const tileCount = computed(() => {
      return rows.value * cols.value;
    });

    return {
      rows,
      cols,
      tileCount,
    };
  },
  components: {
    WordTile,
  },
});
</script>
<style>
.guess-grid {
  display: grid;
  justify-content: center;
  align-content: center;
  flex-grow: 1;
  grid-template-columns: repeat(5, 4em);
  grid-template-rows: repeat(6, 4em);
  gap: 0.25em;
  margin-bottom: 1em;
}
</style>
