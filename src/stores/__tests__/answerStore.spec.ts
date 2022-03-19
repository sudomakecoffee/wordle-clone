import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useAnswerStore } from "../answerStore";

describe("answer retrieval", () => {
  let store;
  beforeEach(() => {
    setActivePinia(createPinia());
    store = useAnswerStore();
  });
  it("finds doubt for January 1st 2022", () => {
    const dateUnderTest = new Date(2022, 0, 1);
    const actual = store.byDate(dateUnderTest);
    const expected = store.answers[473];

    expect(actual).toBe(expected);
  });

  it("finds parer for January 2nd 2022", () => {
    const dateUnderTest = new Date(2022, 0, 2);
    const actual = store.byDate(dateUnderTest);
    const expected = store.answers[474];

    expect(actual).toBe(expected);
  });

  it("finds slick for May 30th 2022", () => {
    const dateUnderTest = new Date(2022, 4, 30);
    const actual = store.byDate(dateUnderTest);
    const expected = store.answers[622];

    expect(actual).toBe(expected);
  });

  it("finds >>> for May 31st 2022", () => {
    const dateUnderTest = new Date(2022, 4, 31);
    const actual = store.byDate(dateUnderTest);
    const expected = store.answers[623];

    expect(actual).toBe(expected);
  });
});

describe("evaluate guess", () => {
  let store;
  beforeEach(() => {
    setActivePinia(createPinia());
    store = useAnswerStore();
  });

  it("evalulates 'doubt' correctly for January 1st 2022", () => {
    const dateUnderTest = new Date(2022, 0, 1);

    const result = store.evaluate("doubt", dateUnderTest);
    expect(result).toBe("22222");
  });

  it("evaluates 'downy' correctly for January 1st 2022", () => {
    const dateUnderTest = new Date(2022, 0, 1);
    const wordUnderTest = "downy";

    const actual = store.evaluate(wordUnderTest, dateUnderTest);
    expect(actual).toBe("22000");
  });

  it("evaluates 'boats' correct for January 3rd 2022", () => {
    const dateUnderTest = new Date(2022, 0, 1);
    const wordUnderTest = "boats";

    // Use -2 here to account for the data structure
    dateUnderTest.setDate(dateUnderTest.getDate() + 1463 - 2);
    const actual = store.evaluate(wordUnderTest, dateUnderTest);
    expect(actual).toBe("22211");
  });

  it("evaluates 'boost' correctly for January 3rd 2022", () => {
    const dateUnderTest = new Date(2022, 0, 1);
    const wordUnderTest = "boost";

    // Use -2 here to account for the data structure
    dateUnderTest.setDate(dateUnderTest.getDate() + 1463 - 2);
    const actual = store.evaluate(wordUnderTest, dateUnderTest);
    expect(actual).toBe("22022");
  });

  it("evaluates 'boost' correctly for 'photo'", () => {
    const dateUnderTest = new Date(2022, 0, 1);
    const wordUnderTest = "boost";

    dateUnderTest.setDate(dateUnderTest.getDate() + 55 - 2);
    const actual = store.evaluate(wordUnderTest, dateUnderTest);
    expect(actual).toBe("01201");
  });

  it("evaluates 'boost' correctly for other'", () => {
    const dateUnderTest = new Date(2022, 0, 1);
    const wordUnderTest = "boost";

    dateUnderTest.setDate(dateUnderTest.getDate() - 222 - 2);
    console.log("Testing answer from " + dateUnderTest.toDateString());
    const actual = store.evaluate(wordUnderTest, dateUnderTest);
    expect(actual).toBe("01001");
  });
});
