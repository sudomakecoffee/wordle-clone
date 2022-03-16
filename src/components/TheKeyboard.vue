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

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useEventListener, useEventBus } from "@vueuse/core";
import { useGameStore } from "@/stores/gameStore";
import {
  gameBusKey,
  type GameBusData,
  type GameBusEventType,
} from "@/use/useGameBus";
import Key from "@/components/keys/LetterKey.vue";
import DeleteKey from "@/components/keys/DeleteKey.vue";
import EnterKey from "@/components/keys/EnterKey.vue";

export default defineComponent({
  setup() {
    const gameStore = useGameStore();
    const gameBus = useEventBus<GameBusData>(gameBusKey);

    const start = () => {
      useEventListener(document, "click", handleMouseClick);
      useEventListener(document, "keydown", handleKeyPress);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleMouseClick = (e: any) => {
      if (gameStore.isGameOver) {
        return;
      }

      let type: GameBusEventType;
      let data = "";

      if (e.target.matches("[data-key]")) {
        type = "keypress";
        data = e.target.dataset.key;
      }
      // eslint-disable-next-line prettier/prettier
      else if (e.target.matches("[data-enter]")) {
        type = "submit";
      }
      // eslint-disable-next-line prettier/prettier
      else if (e.target.matches("[data-delete]")) {
        type = "delete";
      }
      // eslint-disable-next-line prettier/prettier
      else {
        return;
      }

      const event: GameBusData = {
        eventType: type,
        data: data,
      };
      gameBus.emit(event);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleKeyPress = (e: any) => {
      if (gameStore.isGameOver) {
        return;
      }
      let type: GameBusEventType;
      let data = "";
      if (e.key === "Enter") {
        type = "submit";
      }
      // eslint-disable-next-line prettier/prettier
      else if (e.key === "Backspace" || e.key === "Delete") {
        type = "delete";
      }
      // eslint-disable-next-line prettier/prettier
      else if (e.key.match(/[a-z]$/)) {
        type = "keypress";
        data = e.key;
      }
      // eslint-disable-next-line prettier/prettier
      else {
        return;
      }

      const event: GameBusData = {
        eventType: type,
        data: data,
      };
      gameBus.emit(event);
    };

    onMounted(() => {
      start();
    });

    return {};
  },
  components: {
    Key,
    DeleteKey,
    EnterKey,
  },
});
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
