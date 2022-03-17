<template>
  <div id="keyboard">
    <div class="keyboard-row">
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
    </div>
    <div class="keyboard-row">
      <div class="key key-small"></div>
      <Key letter="A" />
      <Key letter="S" />
      <Key letter="D" />
      <Key letter="F" />
      <Key letter="G" />
      <Key letter="H" />
      <Key letter="J" />
      <Key letter="K" />
      <Key letter="L" />
      <div class="key key-small"></div>
    </div>
    <div class="keyboard-row">
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
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useEventListener, useEventBus } from "@vueuse/core";
import { useGameStore } from "@/stores/gameStore";
import {
  GameBusEventTypeEnum,
  keyboardBusKey,
  type GameBusData,
  type KeyboardBusData,
} from "@/use/useGameBus";
import Key from "@/components/keys/LetterKey.vue";
import DeleteKey from "@/components/keys/DeleteKey.vue";
import EnterKey from "@/components/keys/EnterKey.vue";

export default defineComponent({
  setup() {
    const gameStore = useGameStore();
    const gameBus = useEventBus<GameBusData>(keyboardBusKey);

    const start = () => {
      useEventListener(document, "click", handleMouseClick);
      useEventListener(document, "keydown", handleKeyPress);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleMouseClick = (e: any) => {
      if (gameStore.isGameOver) {
        return;
      }

      let type: GameBusEventTypeEnum;
      let data: KeyboardBusData = {};

      if (e.target.matches("[data-key]")) {
        type = GameBusEventTypeEnum.keypress;
        data = { message: e.target.dataset.key };
      }
      // eslint-disable-next-line prettier/prettier
      else if (e.target.matches("[data-enter]")) {
        type = GameBusEventTypeEnum.submit;
      }
      // eslint-disable-next-line prettier/prettier
      else if (e.target.matches("[data-delete]")) {
        type = GameBusEventTypeEnum.delete;
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
      let type: GameBusEventTypeEnum;
      let data: KeyboardBusData = {};
      if (e.key === "Enter") {
        type = GameBusEventTypeEnum.submit;
      }
      // eslint-disable-next-line prettier/prettier
      else if (e.key === "Backspace" || e.key === "Delete") {
        type = GameBusEventTypeEnum.delete;
      }
      // eslint-disable-next-line prettier/prettier
      else if (e.key.match(/^[a-z]$/)) {
        type = GameBusEventTypeEnum.keypress;
        data = { message: e.key };
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

<style scoped>
#keyboard {
  max-height: var(--keyboard-height);
  margin: 0 0.5em;
  user-select: none;
}
.keyboard-row {
  display: flex;
  width: 100%;
  margin: 0 auto 0.5rem;
}
</style>
