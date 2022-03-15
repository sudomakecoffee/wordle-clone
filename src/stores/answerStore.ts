import { defineStore } from "pinia";
import answerData from "@/assets/json/answers.json";

const daysSinceEpoch = (date: Date = new Date()) => {
  const time = date.valueOf();
  const oneDay = 24 * 60 * 60 * 1000;

  return Math.floor(time / oneDay);
};

export const useAnswerStore = defineStore("answers", {
  state: () => {
    return {
      answers: answerData,
    };
  },
  getters: {
    byDate: (state) => {
      return (date: Date) => {
        const num = daysSinceEpoch(date);
        let index = Math.floor(num % state.answers.length);

        index = index < 0 ? 0 : index;
        return state.answers[index];
      };
    },
    today: (state) => {
      const num = daysSinceEpoch(new Date());
      let index = Math.floor(num % state.answers.length);

      index = index < 0 ? 0 : index;
      return state.answers[index];
    },
  },
});
