import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useDictionaryStore } from "../dictionaryStore";

describe("useDictionaryStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("finds shite in the dictionary", () => {
    const valid = useDictionaryStore().valid;
    expect(valid("shite")).toBe(true);
  });

  it("doesn't find shitf in the dictionary", () => {
    const valid = useDictionaryStore().valid;
    expect(valid("shitf")).toBe(false);
  });
});
