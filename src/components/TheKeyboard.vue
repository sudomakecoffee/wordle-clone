<template>
  <div class="keyboard">
    <Key letter="Q" />
    <Key letter="W" />
    <Key letter="E" />
    <Key letter="R" />
    <Key letter="T" />
    <Key letter="Y" />
    <Key letter="U" />
    <Key letter="I" />
    <Key letter="O" />
    <Key letter="P" />
    <div class="key-small"></div>
    <Key letter="A" />
    <Key letter="S" />
    <Key letter="D" />
    <Key letter="F" />
    <Key letter="G" />
    <Key letter="H" />
    <Key letter="J" />
    <Key letter="K" />
    <Key letter="L" />
    <div class="key-small"></div>
    <EnterKey />
    <Key letter="Z" />
    <Key letter="X" />
    <Key letter="C" />
    <Key letter="V" />
    <Key letter="B" />
    <Key letter="N" />
    <Key letter="M" />
    <DeleteKey />
  </div>
</template>

<script setup lang="ts">
import Key from "@/components/keys/LetterKey.vue";
import DeleteKey from "@/components/keys/DeleteKey.vue";
import EnterKey from "@/components/keys/EnterKey.vue";
</script>

<style>
.keyboard {
  display: grid;
  grid-template-columns: repeat(20, minmax(auto, 1.25em));
  grid-auto-rows: 3em;
  gap: 0.25em;
  justify-content: center;
}
</style>
