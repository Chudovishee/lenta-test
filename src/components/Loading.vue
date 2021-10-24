<template>
  <div class="loading">
    <div class="loading__icon">L</div>
  </div>
</template>

<style scoped lang="scss">
.loading {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;

  background-color: rgba(255,255,255, 0.6);

  @keyframes rotation {
    0%   {transform: rotate(0deg)}
    100% {transform: rotate(360deg)}
  }

  &__icon {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -16px;
    margin-top: -16px;

    width: 32px;
    height: 32px;

    line-height: 32px;
    text-align: center;

    font-size: 24px;
    font-weight: bold;

    transform-origin: 16px 16px;

    animation-name: rotation;
    animation-duration: 4s;
    animation-iteration-count: infinite;
  }
}
</style>
