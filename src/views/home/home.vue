<script setup>
import {ref} from 'vue';
const active = ref(0);

</script>
<template>
  <div class="home">
    <van-tabs v-model:active="active" background="transparent" title-inactive-color="#8C7769" title-active-color="#FFD8BF" color="#FFD8BF" :shrink="true" style="width: 100%;">
      <van-tab title="实时行情">
        <div class="home-market">
          <div class="market-trend card">
            <div class="market-info">
              <div class="info-l">
                <p class="title">
                  <img src="../../assets/images/home/icon_03.png" alt="">
                  ETS/USDT
                </p>
                <p class="sum">324.92</p>
                <div class="des">
                  <p>$324.92</p>
                  <p>+22.46%</p>
                </div>
              </div>
              <div class="info-r">
                <div>
                  <p class="title">24h最高价</p>
                  <p class="sum">234.21</p>
                </div>
                <div>
                  <p class="title">24h成交量(ETS)</p>
                  <p class="sum">234.21</p>
                </div>
                <div>
                  <p class="title">24h最低价</p>
                  <p class="sum">234.21</p>
                </div>
                <div>
                  <p class="title">24h成交额(ETS)</p>
                  <p class="sum">234.21</p>
                </div>
              </div>
            </div>
            <div class="market-chart"></div>
          </div>
          <div class="market-cell card">
            <p class="title">
              <img src="../../assets/images/home/icon_04.png" alt="">
              全网总算力
            </p>
            <p class="num">3,738,402.92</p>
          </div>
          <div class="market-cell card">
            <p class="title">
              <img src="../../assets/images/home/icon_05.png" alt="">
              用户算力
            </p>
            <p class="num">2,402.92</p>
          </div>
          <div class="market-cell card">
            <p class="title">
              <img src="../../assets/images/home/icon_06.png" alt="">
              今日产量
            </p>
            <p class="num">82,329.12</p>
          </div>
          <div class="market-stat card">
            <img src="../../assets/images/home/icon_07.png" alt="">
            <p class="num">6,341,983,702.09</p>
            <div class="column">
              <div class="column-item">
                <div class="info">
                  <p class="info-title">创世分红</p>
                  <p class="info-num">83,702.09</p>
                </div>
                <img src="../../assets/images/home/icon_09.png" alt="">
              </div>
              <div class="column-item">
                <div class="info">
                  <p class="info-title">创世分红</p>
                  <p class="info-num">83,702.09</p>
                </div>
                <img src="../../assets/images/home/icon_10.png" alt="">
              </div>
            </div>
            <p class="tips">*分红池每日释放1%，根据创世(超级)的业绩权重占比，分配对应红利。</p>
          </div>
          <div class="market-stat card">
            <img src="../../assets/images/home/icon_08.png" alt="">
            <p class="num">6,341,983,702.09</p>
            <p class="tips">*为了您的资产安全，10%的用户资产从swap里回购ETSC并转入该池。</p>
          </div>
        </div>
      </van-tab>
      <van-tab title="我的矿机"></van-tab>
      <van-tab title="流动性池"></van-tab>
    </van-tabs>
  </div>
</template>
<style scoped lang="scss">
@use "@/views/home/home";
</style>
