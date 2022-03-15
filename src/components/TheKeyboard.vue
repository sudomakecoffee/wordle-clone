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
    <div class="space"></div>
    <Key letter="A" />
    <Key letter="S" />
    <Key letter="D" />
    <Key letter="F" />
    <Key letter="G" />
    <Key letter="H" />
    <Key letter="J" />
    <Key letter="K" />
    <Key letter="L" />
    <div class="space"></div>
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
import Key from "@keys/LetterKey.vue";
import DeleteKey from "@keys/DeleteKey.vue";
import EnterKey from "@keys/EnterKey.vue";
</script>

<style scoped></style>
