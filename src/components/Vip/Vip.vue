<script setup>
import { Progress } from 'vant';
</script>

<template>
  <div class="vip">
    <div class="vip-info">
      <div class="info-head">
        <p class="title">矿机当前等级</p>
        <div class="speed">
          V1
          <div>Speed 1</div>
        </div>
      </div>
      <div class="info-bottom">
        <div class="exp">
          <p class="title">下一个等级<span>V2</span></p>
          <p class="num"><span>14920</span>/30000</p>
        </div>
        <Progress class="progress" :percentage="50" pivot-text="" stroke-width="8" color="#FFE5D4" track-color="#332F2C"></Progress>
<!--        <van-progress :percentage="50" stroke-width="8" />-->
      </div>
    </div>
    <img class="logo" src="../../assets/images/home/icon_11.png" alt="">
  </div>
</template>

<style scoped>
@import "./Vip.css";
</style>
