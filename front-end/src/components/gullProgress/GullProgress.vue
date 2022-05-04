<template>
  <div class="summary-bar bar">
    <div class="bar-mask" :style="{ width: barWidth }">
      <div class="bar-mask-bg" :style="{ backgroundColor: barBgColor }"></div>
      <span>{{ barWidth }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  barWidth: {
    type: String,
    default: '60%'
  },
  barBgColor: {
    type: String,
    default: '#50bfff'
  }
})
</script>

<style lang="less" scoped>
.bar {
  position: relative;
  width: 100%;
  height: 20px;
  border-radius: 10px;
  background: #e4e8f1;
  .bar-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 20px;
    line-height: 1;
    text-align: right;
    border-radius: 10px;
    overflow: hidden;
    > span {
      position: relative;
      margin: 0 5px;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: #fff;
      z-index: 99;
    }
    > .bar-mask-bg {
      animation: flow 5s linear infinite;
      position: absolute;
      border-radius: 10px;
      top: 0;
      left: 0;
      width: 100vw;
      height: 20px;
      background: #50bfff;
      // background: repeating-linear-gradient(
      //   45deg,
      //   #6ac9ff 10px,
      //   #6ac9ff 25px,
      //   #50bfff 25px,
      //   #50bfff 40px
      // );
      background-size: 40px 40px;
      background-image: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.15) 75%,
        transparent 75%,
        transparent
      );
    }
  }
  @keyframes flow {
    0% {
      background-position: 0px 0px;
    }
    100% {
      background-position: -160px 0px;
    }
  }
}
</style>
