<template>
  <div ref="guessGrid" data-guess-grid class="guess-grid">
    <WordTile v-for="t in tileCount" :key="t" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useEventBus } from "@vueuse/core";
import {
  GameBusEventTypeEnum,
  keyboardBusKey,
  alertBusKey,
  type GameBusData,
} from "@/use/useGameBus";
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
    const gameBus = useEventBus<GameBusData>(keyboardBusKey);
    const alertBus = useEventBus<GameBusData>(alertBusKey);

    const guessGrid = ref();

    const rows = computed(() => {
      return props.maxGuesses;
    });
    const cols = computed(() => {
      return props.wordLength;
    });
    const tileCount = computed(() => {
      return rows.value * cols.value;
    });

    const busListener = (event: GameBusData) => {
      switch (event.eventType) {
        case "keypress":
          onKeyPress(event.data);
          break;
        case "delete":
          onDelete();
          break;
        case "submit":
          onSubmit();
          break;
        default:
          break;
      }
    };
    gameBus.on(busListener);

    const onKeyPress = (key?: string) => {
      const activeTiles = getActiveTiles();
      if (activeTiles.length >= props.wordLength) {
        return;
      }
      const nextTile = guessGrid.value.querySelector(":not([data-letter])");
      nextTile.dataset.letter = key?.toLowerCase();
      nextTile.dataset.state = "active";
      nextTile.textContent = key;
    };

    const onDelete = () => {
      const activeTiles = getActiveTiles();
      const lastTile = activeTiles[activeTiles.length - 1];
      if (lastTile == null) {
        return;
      }

      lastTile.textContent = "";
      delete lastTile.dataset.state;
      delete lastTile.dataset.letter;
    };

    const onSubmit = () => {
      const activeTiles = [...getActiveTiles()];
      if (activeTiles.length !== props.wordLength) {
        showAlert("Not enough letters");
        return;
      }
    };

    const showAlert = (message: string, duration = 1000) => {
      const event: GameBusData = {
        eventType: GameBusEventTypeEnum.alert,
        data: { message, duration } as never,
      };
      alertBus.emit(event);
    };

    const getActiveTiles = () => {
      const activeTiles = guessGrid.value.querySelectorAll(
        "[data-state='active']"
      );
      return activeTiles;
    };

    return {
      guessGrid,
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
<style scoped>
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
