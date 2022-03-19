<template>
  <div id="keyboard">
    <div class="keyboard-row">
      <Key letter="Q" ariaLabel="Q key" />
      <Key letter="W" ariaLabel="W key" />
      <Key letter="E" ariaLabel="E key" />
      <Key letter="R" ariaLabel="R key" />
      <Key letter="T" ariaLabel="T key" />
      <Key letter="Y" ariaLabel="Y key" />
      <Key letter="U" ariaLabel="U key" />
      <Key letter="I" ariaLabel="I key" />
      <Key letter="O" ariaLabel="O key" />
      <Key letter="P" ariaLabel="P key" />
    </div>
    <div class="keyboard-row">
      <div class="key key-small"></div>
      <Key letter="A" ariaLabel="A key" />
      <Key letter="S" ariaLabel="S key" />
      <Key letter="D" ariaLabel="D key" />
      <Key letter="F" ariaLabel="F key" />
      <Key letter="G" ariaLabel="G key" />
      <Key letter="H" ariaLabel="H key" />
      <Key letter="J" ariaLabel="J key" />
      <Key letter="K" ariaLabel="K key" />
      <Key letter="L" ariaLabel="L key" />
      <div class="key key-small"></div>
    </div>
    <div class="keyboard-row">
      <EnterKey />
      <Key letter="Z" ariaLabel="Z key" />
      <Key letter="X" ariaLabel="X key" />
      <Key letter="C" ariaLabel="C key" />
      <Key letter="V" ariaLabel="V key" />
      <Key letter="B" ariaLabel="B key" />
      <Key letter="N" ariaLabel="N key" />
      <Key letter="M" ariaLabel="M key" />
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

    gameBus.on((event) => {
      switch (event.data?.eventType) {
        case GameBusEventTypeEnum.modify_key:
          handleModifyKey(event.data);
          break;
        case GameBusEventTypeEnum.submit:
          handleSubmit();
          break;
        default:
          return;
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleMouseClick = (e: any) => {
      if (!gameStore.canInteract) {
        return;
      }

      let data: KeyboardBusData = {};

      if (e.target.matches("[data-key]")) {
        data.eventType = GameBusEventTypeEnum.keypress;
        data.key = e.target.dataset.key;
      }
      // eslint-disable-next-line prettier/prettier
      else if (e.target.matches("[data-enter]")) {
        data.eventType = GameBusEventTypeEnum.submit;
      }
      // eslint-disable-next-line prettier/prettier
      else if (e.target.matches("[data-delete]")) {
        data.eventType = GameBusEventTypeEnum.delete;
      }
      // eslint-disable-next-line prettier/prettier
      else {
        return;
      }

      gameBus.emit({ data });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleKeyPress = (e: any) => {
      if (!gameStore.canInteract) {
        return;
      }

      let data: KeyboardBusData = {};
      if (e.key === "Enter") {
        data.eventType = GameBusEventTypeEnum.submit;
      }
      // eslint-disable-next-line prettier/prettier
      else if (e.key === "Backspace" || e.key === "Delete") {
        data.eventType = GameBusEventTypeEnum.delete;
      }
      // eslint-disable-next-line prettier/prettier
      else if (e.key.match(/^[a-z]$/)) {
        data.eventType = GameBusEventTypeEnum.keypress;
        data.key = e.key;
      }
      // eslint-disable-next-line prettier/prettier
      else {
        return;
      }

      gameBus.emit({ data });
    };

    const handleModifyKey = (data: KeyboardBusData): void => {
      const query = `[data-key="${data.key}"i]`;
      const key = document.querySelector(query);
      const style = `key-${data.modifier}`;

      if (!key?.classList.contains(style)) {
        key?.classList.add(style);
      }
    };

    const handleSubmit = () => {
      return;
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
