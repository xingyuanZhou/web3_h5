<script setup>
import Vip from '@/components/Vip/Vip.vue'
import {ref} from 'vue';

const tabs = ref(['基础算力', '加速算力', '推荐算力'])
const active = ref(1);
const handleTabsChange = (tab) => {
  active.value = tab;
}

const total = ref();

</script>
<template>
  <div class="power">
    <Vip/>
    <div class="tabs">
      <div :class="['tab', active === index ? 'tab-active' : '']" v-for="(value, index) in tabs" @click="handleTabsChange(index)">{{value}}</div>
    </div>
    <div class="cell">
      <p class="cell-l">
        <img src="../../assets/images/power/icon_01.png" alt="">
        我的算力
      </p>
      <p class="cell-r">2,402.92</p>
    </div>
    <!-- 基础算力 -->
    <div class="basics" v-if="active === 0">
      <div class="basics-input">
        <van-field v-model="total" type="digit" placeholder="请输入数量">
          <template #button>
            <p class="input-icon">
              <img src="../../assets/images/power/icon_04.png" alt="">
              EUSD
            </p>
          </template>
        </van-field>
      </div>
      <div class="basics-ratio">
        <p class="ratio-l">兑换比例</p>
        <p class="ratio-r">1USDT=1算力</p>
      </div>
      <van-button class="basics-button" type="primary" block color="#FFE5D4">立即购买</van-button>
      <div class="basics-tips">*低于500算力，推荐算力将烧伤。</div>
    </div>
    <div class="speed">
      <div class="speed-input">
        <div class="input-head">
          <p class="label">质押</p>
          <p class="num">可用：21.34242 ETS</p>
        </div>
      </div>
    </div>
    <div class="links">
      <div class="link">
        <p class="link-label">
          <img src="../../assets/images/power/icon_02.png" alt="">
          我的持仓
        </p>
        <van-icon name="arrow" size="20" color="#FFD8BF" />
      </div>
      <div class="link" v-if="active === 0">
        <p class="link-label">
          <img src="../../assets/images/power/icon_03.png" alt="">
          购买清单
        </p>
        <van-icon name="arrow" size="20" color="#FFD8BF" />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use "@/views/power/power";
</style>
