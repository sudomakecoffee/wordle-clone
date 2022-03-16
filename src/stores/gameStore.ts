import { acceptHMRUpdate, defineStore } from "pinia";

export const useGameStore = defineStore("game", {
  state: () => {
    return {
      gameOver: false,
    };
  },
  getters: {
    isGameOver: (state) => {
      return state.gameOver;
    },
  },
});

// Allow how-reloading
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot));
}
