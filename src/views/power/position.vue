<script setup>
import icon1 from '@/assets/img/icon1.png'
import icon2 from '@/assets/img/icon2.png'
import icon3 from '@/assets/img/icon3.png'
import ETS from '@/assets/img/ets.png'
import USDT from '@/assets/img/t.png'
import {ref} from "vue";
import router from "@/router";

const index = ref(2)
function changeIndex(val,text,icon1,icon2) {
  index.value = val
}
</script>
<template>
  <div class="position">
    <div class="arrow" @click="router.go()">
      <img src="@/assets/img/arrow-left.png" alt="">
    </div>
    <div class="tabs">
      <div class="tab" :class="index === 0 ? 'tab-active' : ''" @click="changeIndex(0,'ETS',icon1,ETS)">基础持仓</div>
      <div class="tab" :class="index === 1 ? 'tab-active' : ''" @click="changeIndex(1,'USDT',icon2,USDT)">加速持仓</div>
      <div class="tab" :class="index === 2 ? 'tab-active' : ''" @click="changeIndex(2,'USDT',icon3,USDT)">推荐持仓</div>
    </div>
    <div class="basics" v-if="index === 0">
      <div class="basics-card">
        <img src="../../assets/images/power/icon_07.png" alt="">
        <p class="title">基础总算力</p>
        <p class="num">6,341,983,702.09</p>
        <div class="info">
          <p class="info-l">
            <img src="../../assets/images/power/icon_08.png" alt="">
            今日算力
          </p>
          <p class="info-r">+10,000.00</p>
        </div>
        <p class="tips">*每日增加算力为当前算力的0.01%</p>
      </div>
    </div>
    <div class="speed" v-if="index === 1">
      <div class="speed-cell">
        <div class="cell-l">
          <p class="label">加速总算力</p>
          <p class="num">6,341,983,702.09</p>
        </div>
        <img class="cell-r" src="../../assets/images/power/icon_07.png" alt="">
      </div>
      <div class="speed-card">
        <div class="card-head">
          <p class="label">
            <img src="../../assets/images/power/icon_11.png" alt="">
            ETS
          </p>
          <p class="time">
            <img src="../../assets/images/power/icon_09.png" alt="">
            2025/03/12 12:34
          </p>
        </div>
        <div class="card-main">
          <div class="main-l">
            <p class="label">质押数量</p>
            <p class="num">2,402.92</p>
          </div>
          <div class="main-r">
            <p class="label">获得算力</p>
            <p class="num">+10,000.00</p>
          </div>
        </div>
        <div class="card-foot">
          <div class="time">
            <img src="../../assets/images/power/icon_10.png" alt="">
            7 时 32 分 04 秒
          </div>
        </div>
      </div>
      <div class="speed-card">
        <div class="card-head">
          <p class="label">
            <img src="../../assets/images/power/icon_04.png" alt="">
            USDT
          </p>
          <p class="time">
            <img src="../../assets/images/power/icon_09.png" alt="">
            2025/03/12 12:34
          </p>
        </div>
        <div class="card-main">
          <div class="main-l">
            <p class="label">质押数量</p>
            <p class="num">8,237,09</p>
          </div>
          <div class="main-r">
            <p class="label">获得算力</p>
            <p class="num">+10,000.00</p>
          </div>
        </div>
        <div class="card-foot">
          <van-button class="speed-button" type="primary" block color="#FFE5D4" plain >一键赎回</van-button>
        </div>
      </div>
      <div class="speed-card">
        <div class="card-head">
          <p class="label">
            <img src="../../assets/images/power/icon_12.png" alt="">
            BTC
          </p>
          <p class="time">
            <img src="../../assets/images/power/icon_09.png" alt="">
            2025/03/12 12:34
          </p>
        </div>
        <div class="card-main">
          <div class="main-l">
            <p class="label">质押数量</p>
            <p class="num">0.12867</p>
          </div>
          <div class="main-r">
            <p class="label">获得算力</p>
            <p class="num">+10,000.00</p>
          </div>
        </div>
        <div class="card-foot">
          <van-button class="speed-button" type="primary" block color="#FFE5D4" plain >一键赎回</van-button>
        </div>
      </div>
    </div>
    <div class="recommend" v-if="index === 2">
      <div class="recommend-card">
        <div class="card-head">
          <div class="head-l">
            <p class="label">推荐总算力</p>
            <p class="num">6,341,983,702.09</p>
          </div>
          <img class="head-r" src="../../assets/images/power/icon_07.png" alt="">
        </div>
        <div class="card-main">
          <p class="label">
            <img src="../../assets/images/power/icon_13.png" alt="">
            已推荐人数
          </p>
          <p class="num">9224</p>
        </div>
      </div>
      <div class="recommend-table">
        <p class="table-title">推荐明细</p>
        <div class="table-wrapper">
          <div class="table-label">
            <p class="align-l">被推荐人</p>
            <p>加速百分比</p>
            <p class="align-r">推荐算力</p>
          </div>
          <div class="table-item">
            <p class="align-l">928y3h...923n</p>
            <p>1%</p>
            <p class="align-r">+1,978.98</p>
          </div>
          <div class="table-item">
            <p class="align-l">928y3h...923n</p>
            <p>1%</p>
            <p class="align-r">+1,978.98</p>
          </div>
          <div class="table-item">
            <p class="align-l">928y3h...923n</p>
            <p>1%</p>
            <p class="align-r">+1,978.98</p>
          </div>
          <div class="table-item">
            <p class="align-l">928y3h...923n</p>
            <p>2%</p>
            <p class="align-r">+1,978.98</p>
          </div>
          <div class="table-item">
            <p class="align-l">928y3h...923n</p>
            <p>2%</p>
            <p class="align-r">+1,978.98</p>
          </div>
          <div class="table-item">
            <p class="align-l">928y3h...923n</p>
            <p>2%</p>
            <p class="align-r">+1,978.98</p>
          </div>
          <div class="table-item">
            <p class="align-l">928y3h...923n</p>
            <p>21%</p>
            <p class="align-r">+1,978.98</p>
          </div>
          <div class="table-item">
            <p class="align-l">928y3h...923n</p>
            <p>21%</p>
            <p class="align-r">+1,978.98</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use "@/views/power/position";
</style>
