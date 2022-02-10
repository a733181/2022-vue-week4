<template>
  <teleport to="body">
    <div
      class="fixed top-0 left-0 z-10 flex items-center justify-center w-screen h-screen bg-black/30"
      v-if="show"
    >
      <div class="loading">
        <span style="--i: 1"></span>
        <span style="--i: 2"></span>
        <span style="--i: 3"></span>
        <span style="--i: 4"></span>
        <span style="--i: 5"></span>
        <span style="--i: 6"></span>
        <span style="--i: 7"></span>
        <span style="--i: 8"></span>
        <span style="--i: 9"></span>
        <span style="--i: 10"></span>
        <span style="--i: 11"></span>
        <span style="--i: 12"></span>
        <span style="--i: 13"></span>
        <span style="--i: 14"></span>
        <span style="--i: 15"></span>
        <span style="--i: 16"></span>
        <span style="--i: 17"></span>
        <span style="--i: 18"></span>
        <span style="--i: 19"></span>
        <span style="--i: 20"></span>
        <div class="rocket"></div>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      relative: true,
    },
  },
};
</script>

<style scoped>
.loading {
  position: relative;
  width: 120px;
  height: 120px;
  z-index: 20;
}
.loading span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(calc(18deg * var(--i)));
}
.loading span::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 15px;
  height: 15px;
  background-color: #fff;
  border-radius: 50%;
  transform: scale(0);
  animation: animate 2s linear infinite;
  animation-delay: calc(0.1s * var(--i));
}
@keyframes animate {
  0% {
    transform: scale(0);
  }
  10% {
    transform: scale(1.2);
  }
  80%,
  100% {
    transform: scale(0);
  }
}

.rocket {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: rotating 2s linear infinite;
  animation-delay: -1s;
}
@keyframes rotating {
  0% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(370deg);
  }
}

.rocket::before {
  content: '';
  background-image: url('../../assets/rocket-solid.svg');
  position: absolute;
  top: 80px;
  left: 85px;
  width: 60px;
  height: 60px;
  transform: rotate(180deg);
}
</style>
