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
  actions: {},
});

// Allow how-reloading
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot));
}

// TODO:
// Add current word to store for communicating input between keyboard component
// and guess grid
