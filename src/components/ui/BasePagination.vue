<template>
  <section class="container flex items-center mx-auto justify-content">
    <ul class="flex mx-auto">
      <li
        v-for="number in allPage"
        :key="number"
        class="text-[#646464] border-2 border-[#E5E5E5] rounded py-2 px-3 text-sm mr-2"
        :class="{ 'border-[#65895F]': activePage(number) }"
        @click="changePage(number)"
      >
        {{ number }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  computed: {
    allPage() {
      return this.$store.getters['pagination/allPage'] ?? '';
    },
    currentPage() {
      return this.$store.getters['pagination/currentPage'] ?? '';
    },
  },
  methods: {
    activePage(number) {
      if (number === this.currentPage) {
        return true;
      }
      return false;
    },
    changePage(number) {
      this.$store.dispatch('pagination/setCurrentPage', number);
    },
  },
};
</script>
