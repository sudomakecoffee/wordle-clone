<template>
  <div id="guess-grid-container">
    <div ref="guessGrid" data-guess-grid class="guess-grid">
      <div class="row" letters v-for="r in rows" :key="`row-${r}`">
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
      const nextTile = guessGrid.value
        .querySelector(".row")
        .querySelector(":not([data-letter])");
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
