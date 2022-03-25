<template>
  <div id="guess-grid-container">
    <div ref="guessGrid" data-guess-grid class="guess-grid">
      <div class="row" data-letters v-for="r in rows" :key="`row-${r}`">
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
  type AlertBusData,
} from "@/use/useGameBus";
import WordTile from "@/components/WordTile.vue";
import { useDictionaryStore } from "@/stores/dictionaryStore";
import { useGameStore } from "@/stores/gameStore";
import { useAnswerStore } from "@/stores/answerStore";

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
    flipDuration: {
      type: Number,
      default: 500,
    },
  },
  setup(props) {
    const gameBus = useEventBus<GameBusData>(keyboardBusKey);
    const alertBus = useEventBus<GameBusData>(alertBusKey);
    const dictionary = useDictionaryStore();
    const answers = useAnswerStore();
    const game = useGameStore();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const guessGrid = ref<any>();

    const rows = computed(() => {
      return props.maxGuesses;
    });
    const cols = computed(() => {
      return props.wordLength;
    });
    const flipTime = computed(() => {
      return props.flipDuration;
    });
    const tileCount = computed(() => {
      return rows.value * cols.value;
    });

    const busListener = (event: GameBusData) => {
      switch (event.data?.eventType) {
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
      nextTile.dataset.letter = (data?.key ?? "").toLowerCase();
      nextTile.dataset.state = "active";
      nextTile.textContent = data?.key ?? "";
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
        shakeTiles(activeTiles);
        return;
      }
      game.guess = activeTiles.reduce((word, tile) => {
        return word + tile.dataset.letter;
      }, "");
      if (!dictionary.valid(game.guess)) {
        showAlert("Invalid word", 1000);
        shakeTiles(activeTiles);
        return;
      }
      game.interactionPaused = true;
      // evaluate guess and flip tiles
      const ranked = answers.evaluate(game.guess);
      const row = getCurrentRow();
      game.guessCount++;
      activeTiles.forEach((...params) => flipTile(...params, ranked));
      row.dataset.letters = game.guess;
    };

    /// Actions
    const showAlert = (message: string, duration = 500) => {
      const event: GameBusData = {
        data: {
          eventType: GameBusEventTypeEnum.alert,
          message: message,
          duration: duration,
        },
      };
      alertBus.emit(event);
    };

    const getCurrentRow = () => {
      const nextRow = document.querySelector(`[data-letters=""]`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return nextRow as any;
    };

    const getActiveTiles = () => {
      const activeTiles = guessGrid.value.querySelectorAll(
        "[data-state='active']"
      );
      return activeTiles;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const shakeTiles = (tiles: any[]) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tiles.forEach((tile: any) => {
        tile.classList.add("shake");
        tile.addEventListener(
          "animationend",
          () => {
            tile.classList.remove("shake");
          },
          { once: true }
        );
      });
    };

    const flipTile = (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tile: any,
      index: number,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      array: any[],
      ranked: string
    ) => {
      setTimeout(() => {
        tile.classList.add("flip");
      }, (index * flipTime.value) / 2);

      tile.addEventListener(
        "transitionend",
        () => {
          console.log("flip animation ended");
          tile.classList.remove("flip");

          // Evaluate the guess
          const tileClass = answers.mapRankToStyle(ranked[index]);
          tile.dataset.state = tileClass;

          const busData: KeyboardBusData = {
            eventType: GameBusEventTypeEnum.modify_key,
            key: tile.dataset.letter,
            modifier: tileClass,
          };
          gameBus.emit({
            data: busData,
          });

          // Resume user interaction
          if (index === array.length - 1) {
            tile.addEventListener(
              "transitionend",
              () => {
                game.interactionPaused = false;
                checkWinLose(array);
              },
              { once: true }
            );
          }
        },
        { once: true }
      );
      return;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const danceTiles = (tiles: any[]) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tiles.forEach((tile: any, index) => {
        setTimeout(() => {
          tile.classList.add("dance");
          tile.addEventListener(
            "animationend",
            () => {
              tile.classList.remove("dance");
            },
            { once: true }
          );
        }, (index * 500) / 5); // 500ms per tile, 5 tiles
      });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const checkWinLose = (tiles: any) => {
      if (game.checkWin(answers.today)) {
        const eventData: AlertBusData = {
          eventType: GameBusEventTypeEnum.alert,
          message: "You win!",
          duration: 5000,
          modifier: "success",
        };
        alertBus.emit({ data: eventData });
        danceTiles(tiles);
      } else if (game.checkLose()) {
        const eventData: AlertBusData = {
          eventType: GameBusEventTypeEnum.alert,
          message: "You ran out of guesses!",
          duration: 5000,
          modifier: "error",
        };
        alertBus.emit({ data: eventData });
      }
    };

    return {
      guessGrid,
      rows,
      cols,
      flipTime,
      tileCount,
      answers,
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
  width: min(22rem, 90%);
  height: min(26.25rem, 100%);

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
