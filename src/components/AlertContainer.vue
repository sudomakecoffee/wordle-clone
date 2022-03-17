<template>
  <div ref="alertContainer" class="alert-container" data-alert-container></div>
</template>

<script lang="ts">
import { type GameBusData, alertBusKey } from "@/use/useGameBus";
import { useEventBus } from "@vueuse/core";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const alertBus = useEventBus<GameBusData>(alertBusKey);
    const alertContainer = ref();

    const alertListener = (event: GameBusData) => {
      const { message, duration } = event.data as unknown as {
        message: string;
        duration: number;
      };
      onAlert(message, duration);
    };
    alertBus.on(alertListener);

    const onAlert = (message: string, duration = 500) => {
      const alert = document.createElement("div");
      alert.textContent = message;
      alert.classList.add("alert", "error");

      alertContainer.value.prepend(alert);
      setTimeout(() => {
        alert.classList.add("hide");
      }, duration);
    };
    return {
      alertContainer,
    };
  },
});
</script>

<style>
.alert-container {
  position: fixed;
  top: 10vh;
  left: 50vw;
  transform: translateX(-50%);

  display: flex;
  flex-direction: column;
  align-items: center;

  z-index: 100;
}

.alert {
  pointer-events: none;
  background-color: hsl(204, 7%, 85%);
  color: var(--wc-c-black-mute);
  padding: 0.75em;
  border-radius: 0.25em;
  opacity: 1;
  transition: opacity 500ms ease-in-out;
  margin-bottom: 0.5em;
}

.alert:last-child {
  margin-bottom: 0;
}

.alert.error {
  background-color: var(--wc-c-red-soft);
  color: var(--wc-c-red);
}

.alert.success {
  background-color: limegreen;
  color: black;
}

.alert.hide {
  opacity: 0;
}
</style>
