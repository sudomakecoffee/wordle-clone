<template>
  <div id="guess-grid-container">
    <div ref="guessGrid" data-guess-grid class="guess-grid">
      <div class="row" v-for="r in rows" :key="`row-${r}`">
        <WordTile v-for="c in cols" :key="`tile-${r}-${c}`" />
      </div>
    </div>
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
  type KeyboardBusData,
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
    // If registered in setup, it gets destroyed automatically on unmount
    gameBus.on(busListener);

    /// Handlers
    const onKeyPress = (data?: KeyboardBusData | undefined) => {
      const activeTiles = getActiveTiles();
      if (activeTiles.length >= props.wordLength) {
        return;
      }

      const nextRow = getCurrentRow();
      const nextTile = nextRow.querySelector(":not([data-letter])");
      nextTile.dataset.letter = (data?.message ?? "").toLowerCase();
      nextTile.dataset.state = "active";
      nextTile.textContent = data?.message ?? "";
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
        showAlert("Not enough letters", 1000);
        activeTiles.forEach((tile) => {
          tile.classList.add("shake");
          tile.addEventListener(
            "animationend",
            () => {
              tile.classList.remove("shake");
            },
            { once: true }
          );
        });
        return;
      }
    };

    /// Actions
    const showAlert = (message: string, duration = 500) => {
      const event: GameBusData = {
        eventType: GameBusEventTypeEnum.alert,
        data: { message, duration },
      };
      alertBus.emit(event);
    };

    const getCurrentRow = () => {
      const nextRow = guessGrid.value.querySelector(".row:not([letters])");
      return nextRow;
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
#guess-grid-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  overflow: hidden;
}
.guess-grid {
  width: 22rem;
  height: 26.25rem;

  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 0.25em;
  padding: 0.675em;
  box-sizing: box;
}

.row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
}
</style>
