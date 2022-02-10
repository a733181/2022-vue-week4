<template>
  <button
    class="btn"
    :class="{ 'btn-outline': outline, 'btn-red-outline': redOutline }"
    :type="submit ? null : 'button'"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    outline: {
      type: Boolean,
      relative: false,
    },
    redOutline: {
      type: Boolean,
      relative: false,
    },
    submit: {
      type: Boolean,
      relative: false,
    },
  },
};
</script>

<style lang="postcss" scoped>
.btn {
  @apply text-white rounded-lg hover:bg-[#2D6A4F] active:bg-[#1B4332] bg-[#40916C] px-3 py-2;
}
.btn-outline {
  @apply border border-[#40916C] text-[#40916C] bg-white;
}
.btn-outline:hover {
  @apply bg-[#40916C] text-white;
}
.btn-outline:active {
  @apply border-[#1B4332];
}
.btn-red-outline {
  @apply text-red-400 bg-white border border-red-400;
}
.btn-red-outline:hover {
  @apply text-white bg-red-600;
}
.btn-red-outline:active {
  @apply bg-red-800;
}
</style>
