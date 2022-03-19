import { acceptHMRUpdate, defineStore } from "pinia";
import dictionaryData from "@/assets/json/dictionary.json";

export const useDictionaryStore = defineStore("dictionary", {
  state: () => ({
    dictionary: dictionaryData,
  }),
  getters: {
    valid: (state) => {
      return (word: string) => state.dictionary.includes(word.toLowerCase());
    },
  },
});

// Allow how-reloading
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDictionaryStore, import.meta.hot));
}
