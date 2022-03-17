<template>
  <div class="tile"><slot></slot></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "WordTile",
  setup() {
    return {};
  },
});
</script>

<style>
.tile {
  color: var(--color-text);
  background-color: hsl(
    var(--tile-bg-hue, 240),
    var(--tile-bg-saturation, 3%),
    var(--tile-bg-lightness, 7%)
  );
  border: 0.05em solid
    hsl(
      var(--tile-border-hue, 240),
      var(--tile-border-saturation, 2%),
      var(--tile-border-lightness, 23%)
    );

  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;

  font-size: 2rem;
  font-weight: bold;
  line-height: 2rem;

  box-sizing: border-box;
  text-transform: uppercase;
  user-select: none;
}

.tile[data-state="active"] {
  --tile-border-lightness: 34%;
}

.tile[data-state="wrong"] {
  border: none;
  --tile-bg-lightness: 23%;
}

.tile[data-state="close"] {
  border: none;
  --tile-bg-hue: 49;
  --tile-bg-saturation: 51%;
  --tile-bg-lightness: 47%;
}

.tile[data-state="correct"] {
  border: none;
  --tile-bg-hue: 115;
  --tile-bg-saturation: 29%;
  --tile-bg-lightness: 43%;
}

.tile.shake {
  animation: shake 250ms ease-in-out;
}
</style>
