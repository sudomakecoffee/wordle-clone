import type { EventBusKey } from "@vueuse/core";

export const gameBusKey: EventBusKey<{ name: "game" }> = Symbol("symbol-key");

export type GameBusEventType = "keypress" | "submit" | "delete";

export interface GameBusData {
  eventType?: GameBusEventType;
  data?: string;
}
