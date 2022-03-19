<template>
  <button class="key" :data-key="keyLetter" :aria-label="keyLabel">
    {{ letter }}
  </button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    letter: { type: String, required: true },
    ariaLabel: { type: String, required: true },
  },
  setup(props) {
    const keyLetter = ref(props.letter);
    const keyLabel = ref(props.ariaLabel);

    return {
      keyLetter,
      keyLabel,
    };
  },
});
</script>

<style></style>
