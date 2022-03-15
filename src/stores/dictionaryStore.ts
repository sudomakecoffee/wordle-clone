import { defineStore } from "pinia";
import dictionaryData from "../assets/json/dictionary.json";

export const useDictionaryStore = defineStore("dictionary", {
  state: () => {
    return {
      dictionary: dictionaryData,
    };
  },
  getters: {
    valid: (state) => {
      return (word: string) => state.dictionary.includes(word.toLowerCase());
    },
  },
});
