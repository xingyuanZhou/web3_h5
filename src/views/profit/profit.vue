<script setup>
import icon1 from '@/assets/img/icon1.png'
import icon2 from '@/assets/img/icon2.png'
import icon3 from '@/assets/img/icon3.png'
import ETS from '@/assets/img/ets.png'
import USDT from '@/assets/img/t.png'
import {ref} from "vue";
import router from "@/router";

const index = ref(0)
const key = ref('ETS')
const img1 = ref(icon1)
const img2 = ref(ETS)
function changeIndex(val,text,icon1,icon2) {
  index.value = val
  key.value = text
  img1.value = icon1
  img2.value = icon2
}
</script>
<template>
  <div class="profit">
    <div class="arrow">
      <img src="@/assets/img/arrow-left.png" alt="">
    </div>
    <div class="tabs">
      <div class="tab" :class="index === 0 ? 'tab-active' : ''" @click="changeIndex(0,'ETS',icon1,ETS)">算力收益</div>
      <div class="tab" :class="index === 1 ? 'tab-active' : ''" @click="changeIndex(1,'USDT',icon2,USDT)">超级分红</div>
      <div class="tab" :class="index === 2 ? 'tab-active' : ''" @click="changeIndex(2,'USDT',icon3,USDT)">创世分红</div>
    </div>
    <div class="center">
      <div class="imgs">
        <img :src="img1" alt="" class="center-img1">
        <img :src="img2" class="center-img2">
      </div>
      <div class="center-label">奖池金额 ({{key}})</div>
      <div class="center-num">6,341,983,702.09</div>
      <div class="center-received">
        <div class="received-label">
          <img src="@/assets/img/coin.png">
          已领取{{key}}
        </div>
        <div class="received-num">2,402.92</div>
      </div>
    </div>
    <div class="pending">
      <div class="pending-left">
        <div>待领取({{key}})</div>
        <div class="num">2,402.92</div>
      </div>
      <div class="pending-btn">一键领取</div>
    </div>
    <div class="detail" @click="router.push('/trans')">
      <div class="detail-label">收益明细</div>
      <img src="@/assets/img/arrow-right.png" alt="">
    </div>
  </div>
</template>
<style scoped lang="scss">
@use "@/views/profit/profit";
</style>
