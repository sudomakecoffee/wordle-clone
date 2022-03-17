<template>
  <header>
    <div>
      <span class="margin-left"><MenuIcon /></span>
      <span class="margin-left"><HelpIcon /></span>
    </div>
    <div>Curdle (Wordle Clone)</div>
    <div>
      <span class="margin-right"><GraphIcon /></span>
      <span class="margin-right"><SettingsIcon /></span>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MenuIcon from "@/components/icons/IconMenu.vue";
import HelpIcon from "@/components/icons/IconHelp.vue";
import GraphIcon from "@/components/icons/IconGraph.vue";
import SettingsIcon from "@/components/icons/IconSettings.vue";

export default defineComponent({
  setup() {
    return {};
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
  margin-left: 2rem;
}
.margin-left:first-child {
  margin-left: 1rem;
}

.margin-right {
  margin-right: 2rem;
}
</style>
