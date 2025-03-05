<script setup>
import icon1 from '@/assets/img/icon1.png'
import icon2 from '@/assets/img/icon2.png'
import icon3 from '@/assets/img/icon3.png'
import ETS from '@/assets/img/ets.png'
import USDT from '@/assets/img/t.png'
import {ref} from "vue";
import router from "@/router";

const index = ref(0)
function changeIndex(val,text,icon1,icon2) {

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
  </div>
</template>
<style scoped lang="scss">
@use "@/views/power/position";
</style>
