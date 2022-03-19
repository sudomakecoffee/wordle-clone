import type { EventBusKey } from "@vueuse/core";

// Event bus key (queue) for listening to keyboard events
export const keyboardBusKey: EventBusKey<{ name: "keyboard" }> =
  Symbol("symbol-key");

// Event bus key (queue) for listening to alert events
export const alertBusKey: EventBusKey<{ name: "alert" }> = Symbol("symbol-key");

// Event type being emitted/handled
export enum GameBusEventTypeEnum {
  keypress = "keypress",
  submit = "submit",
  delete = "delete",
  alert = "alert",
  modify_key = "modify_key",
  check = "check",
}

// Event data being emitted/handled
export interface GameBusData {
  data?: KeyboardBusData | AlertBusData;
}

export interface KeyboardBusData {
  eventType?: GameBusEventTypeEnum;
  key?: string;
  modifier?: string;
}

export interface AlertBusData {
  eventType?: GameBusEventTypeEnum;
  message?: string;
  duration?: number;
  modifier?: string;
}
