import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useAnswerStore } from "../answerStore";

describe("useAnswerStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("finds doubt for January 1st 2022", () => {
    const store = useAnswerStore();

    const dateUnderTest = new Date(2022, 0, 1);
    const actual = store.byDate(dateUnderTest);
    const expected = store.answers[473];

    expect(actual).toBe(expected);
  });

  it("finds parer for January 2nd 2022", () => {
    const store = useAnswerStore();

    const dateUnderTest = new Date(2022, 0, 2);
    const actual = store.byDate(dateUnderTest);
    const expected = store.answers[474];

    expect(actual).toBe(expected);
  });

  it("finds slick for May 30th 2022", () => {
    const store = useAnswerStore();

    const dateUnderTest = new Date(2022, 4, 30);
    const actual = store.byDate(dateUnderTest);
    const expected = store.answers[622];

    expect(actual).toBe(expected);
  });

  it("finds >>> for May 31st 2022", () => {
    const store = useAnswerStore();

    const dateUnderTest = new Date(2022, 4, 31);
    const actual = store.byDate(dateUnderTest);
    const expected = store.answers[623];

    expect(actual).toBe(expected);
  });
});
