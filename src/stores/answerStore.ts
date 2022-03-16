import { acceptHMRUpdate, defineStore } from "pinia";
import answerData from "@/assets/json/answers.json";

const daysSinceEpoch = (date: Date = new Date()) => {
  const time = date.valueOf();
  const oneDay = 24 * 60 * 60 * 1000;

  return Math.floor(time / oneDay);
};

const getAnswer = (state: { answers: string[] }, date: Date = new Date()) => {
  const num = daysSinceEpoch(date);
  let index = Math.floor(num % state.answers.length);

  index = index < 0 ? 0 : index;
  return state.answers[index];
};

export const useAnswerStore = defineStore("answers", {
  state: () => ({
    answers: answerData,
  }),
  getters: {
    byDate: (state) => {
      return (date: Date) => {
        return getAnswer(state, date);
      };
    },
    today: (state): string => {
      return getAnswer(state);
    },
  },
});

// Allow how-reloading
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAnswerStore, import.meta.hot));
}
