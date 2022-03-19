import { acceptHMRUpdate, defineStore } from "pinia";

export const useGameStore = defineStore("game", {
  state: (): GameStoreState => {
    return {
      wordLength: 5,
      maxGuesses: 6,
      gameOver: false,
      interactionPaused: false,
      guess: "",
      guessCount: 0,
    };
  },
  getters: {
    isGameOver: (state: GameStoreState) => {
      return state.gameOver;
    },
    canInteract: (state: GameStoreState) => {
      return !(state.gameOver || state.interactionPaused);
    },
  },
  actions: {
    resetGameState(): void {
      if (this !== undefined) {
        this.gameOver = false;
        this.interactionPaused = false;
        this.guess = "";
      }
    },
    checkWin(answer: string): boolean {
      this.gameOver = this.guess === answer;
      return this.gameOver;
    },
    checkLose(): boolean {
      this.gameOver = this.guessCount >= this.maxGuesses;
      return this.gameOver;
    },
  },
});

export interface GameStoreState {
  wordLength: number;
  maxGuesses: number;
  gameOver: boolean;
  interactionPaused: boolean;
  guess: string;
  guessCount: number;
}

// Allow how-reloading
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot));
}
