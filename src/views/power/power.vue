<script setup>
import ETS2 from "@/assets/img/ets2.png";
import ETS1 from "@/assets/img/ets.png";
import USDT from "@/assets/img/t.png";
import {ref} from 'vue';
import Vip from '@/components/Vip/Vip.vue'
import Panel from '@/components/Panel/Panel.vue'
import {useToggle} from "@vant/use";
import router from "@/router";

const tabs = ref(['基础算力', '加速算力', '推荐算力'])
const active = ref(1);
const handleTabsChange = (tab) => {
  active.value = tab;
}

const basicNum = ref();
const speedNum = ref();
const speedNumList = ref([100, 200, 400, 600, 800]);
const handleSpeedChange = (value) => {
  speedNum.value = value;
}

const option = [
  { text: 'ETS', value: 0, icon: ETS2 },
  { text: 'ETS1', value: 1, icon: ETS1 },
  { text: 'USDT', value: 2, icon: USDT },
]
const icon = ref(option[0].icon)
const text = ref(option[0].text);
const [state, toggle] = useToggle();
function changePanel(e) {
  const item = option.find(item => item.value === e.value)
  icon.value = item.icon;
  text.value = item.text
  state.value = false
}

</script>
<template>
  <div class="power">
    <Vip/>
    <div class="tabs">
      <div :class="['tab', active === index ? 'tab-active' : '']" v-for="(value, index) in tabs" @click="handleTabsChange(index)">{{value}}</div>
    </div>
    <div class="cell">
      <p class="cell-l">
        <img src="@/assets/images/power/icon_01.png" alt="">
        我的算力
      </p>
      <p class="cell-r">2,402.92</p>
    </div>
    <!-- 基础算力 -->
    <div class="basics" v-if="active === 0">
      <div class="basics-input">
        <van-field v-model="basicNum" type="digit" placeholder="请输入数量">
          <template #button>
            <p class="input-icon">
              <img src="@/assets/images/power/icon_04.png" alt="">
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
    <!-- 加速算力 -->
    <div class="speed" v-if="active === 1">
      <div class="speed-input">
        <div class="input-head">
          <p class="label">质押</p>
          <p class="num">可用：21.34242 ETS</p>
        </div>
        <div class="input-main">
          <van-field v-model="speedNum" type="digit" placeholder="请输入质押数量" input-align="right">
            <template #label>
              <p class="input-label" @click="toggle(!state.value)">
                <img class="logo" :src="icon" alt="">
                <p class="text">{{text}}</p>
                <img class="arrow-down" src="@/assets/images/power/icon_06.png" alt="">
              </p>
            </template>
          </van-field>
        </div>
        <div class="input-foot">
          <div class="num" v-for="value in speedNumList" @click="handleSpeedChange(value)">{{ value }}</div>
        </div>
        <Panel
            :title="'选择币种'"
            :option="option"
            :changePanel="changePanel"
            :state="state"
            :text="text"
        />
      </div>
      <div class="speed-tips">
        <p class="label">币种价格</p>
        <p class="num">1ETS=100USDT</p>
      </div>
      <van-button class="speed-button" type="primary" block color="#FFE5D4">质押加速</van-button>
    </div>
    <!-- 推荐算力 -->
    <div class="column" v-if="active === 2">
      <div class="column-l">
        <p class="label">总业绩</p>
        <p class="num">2,402.92</p>
      </div>
      <div class="column-r">
        <p class="label">直推业绩</p>
        <p class="num">2,402.92</p>
      </div>
    </div>
    <div class="links">
      <div class="link" @click="router.push('/power/position')">
        <p class="link-label">
          <img src="@/assets/images/power/icon_02.png" alt="">
          我的持仓
        </p>
        <van-icon name="arrow" size="20" color="#FFD8BF" />
      </div>
      <div class="link" v-if="active === 0">
        <p class="link-label">
          <img src="@/assets/images/power/icon_03.png" alt="">
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
