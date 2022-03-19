<template>
  <button class="key" :data-key="keyLetter" :aria-label="keyLabel">
    {{ keyLetter }}
  </button>
</template>

<script lang="ts">
import { propsToAttrMap } from "@vue/shared";
import { computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    letter: { type: String, required: true },
    ariaLabel: { type: String, required: true },
  },
  setup(props) {
    const keyLetter = computed(() => {
      return props.letter;
    });
    const keyLabel = computed(() => {
      return props.ariaLabel;
    });

    return {
      keyLetter,
      keyLabel,
    };
  },
});
</script>

<style></style>
