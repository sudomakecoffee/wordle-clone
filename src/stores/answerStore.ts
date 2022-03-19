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
    controlDate: () => {
      return new Date(2021, 4, 22);
    },
  },
  actions: {
    evaluate(guess: string, date = new Date()): string {
      const evaluation = "00000".split("");
      const target = this.byDate(date);
      let check = target;
      const source = guess.split("");

      source.forEach((letter, index) => {
        if (check.includes(letter)) {
          evaluation[index] = "1";
          check = check.replace(letter, "");
        }
      });
      source.forEach((letter, index) => {
        if (letter === target[index]) {
          evaluation[index] = "2";
          check = check.replace(`/${letter}/i`, "");
        }
      });

      return evaluation.join("");
    },
    mapRankToStyle(rank: string): string {
      switch (rank) {
        case "2":
          return "correct";
        case "1":
          return "close";
        case "0":
          return "wrong";
        default:
          return "";
      }
    },
  },
});

// Allow how-reloading
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAnswerStore, import.meta.hot));
}
