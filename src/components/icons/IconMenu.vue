<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="var(--color-text)"
    class="bi bi-three-dots-vertical"
    viewBox="0 0 16 16"
  >
    <title>Menu (placeholder)</title>
    <g id="closed">
      <path
        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
      />
    </g>
    <g id="open">
      <path
        d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
      />
    </g>
  </svg>
</template>

<style scoped>
svg {
  width: 1.25rem;
  height: 1.25rem;
}

svg > #closed {
  opacity: 1;
}

svg > #open {
  opacity: 0;
}
</style>
