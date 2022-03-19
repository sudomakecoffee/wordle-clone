<template>
  <header>
    <div>
      <span class="margin-left"><MenuIcon /></span>
      <span class="margin-left"><HelpIcon /></span>
    </div>
    <div>Curdle</div>
    <div>
      <span class="margin-right"><GraphIcon /></span>
      <span class="margin-right"
        ><SettingsIcon @click="onSettingsClicked"
      /></span>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MenuIcon from "@/components/icons/IconMenu.vue";
import HelpIcon from "@/components/icons/IconHelp.vue";
import GraphIcon from "@/components/icons/IconGraph.vue";
import SettingsIcon from "@/components/icons/IconSettings.vue";
import { useGameStore } from "@/stores/gameStore";

export default defineComponent({
  setup() {
    const game = useGameStore();
    const onSettingsClicked = () => {
      game.resetGameState();
    };
    return {
      onSettingsClicked,
    };
  },
  components: {
    MenuIcon,
    HelpIcon,
    GraphIcon,
    SettingsIcon,
  },
});
</script>

<style scoped>
.margin-left {
  margin-left: 1rem;
}
.margin-left:first-child {
  margin-left: 0.5rem;
}
.margin-right {
  margin-right: 1rem;
}
.margin-right:last-child {
  margin-right: 0.5rem;
}
</style>
