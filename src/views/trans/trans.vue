<script setup>
import ETS1 from '@/assets/img/ets.png'
import ETS2 from '@/assets/img/ets2.png'
import USDT from '@/assets/img/t.png'
import {ref, computed} from "vue";
import { useToggle } from '@vant/use';

const icon1 = ref(ETS2)
const icon2 = ref(ETS1)
const option = [
  { text: 'ETS', value: 0, icon: ETS2 },
  { text: 'ETS1', value: 1, icon: ETS1 },
  { text: 'USDT', value: 2, icon: USDT },
];
const text1 = ref(option[0].text);
const text2 = ref(option[1].text);
const [state, toggle] = useToggle();
const key = ref(1)
function showPanel(i) {
  toggle(!state.value)
  key.value = i
}
function changePanel(e) {
  const item = option.find(item => item.value === e.value)
  if (key.value === 1) {
    icon1.value = item.icon;
    text1.value = item.text
  } else {
    icon2.value = item.icon;
    text2.value = item.text
  }
  state.value = false
}

const showDialog = ref(false)
const checked = ref(false);
</script>
<template>
  <div class="trans">
    <div class="title">交易</div>
    <div class="card">
      <div class="card-top">
        <div>消耗</div>
        <div class="top-desc">
          可用：21.34242
          <div>最大</div>
        </div>
      </div>
      <div class="card-bottom">
        <div class="bottom-option" @click="showPanel(1)">
          <img :src="icon1" alt="" class="option-icon">
          {{text1}}
          <img src="@/assets/img/arrow-bottom.png" alt="" class="option-arrow">
        </div>
        <div class="bottom-num">0.0001-99,999</div>
      </div>
    </div>
    <img src="@/assets/img/trans.png" class="trans-img" alt="">
    <div class="card">
      <div class="card-top">
        <div>获得</div>
        <div class="top-desc">
          可用：21.34242
        </div>
      </div>
      <div class="card-bottom">
        <div class="bottom-option" @click="showPanel(2)">
          <img :src="icon2" alt="" class="option-icon">
          {{text2}}
          <img src="@/assets/img/arrow-bottom.png" alt="" class="option-arrow">
        </div>
        <div class="bottom-num">0.0001-99,999</div>
      </div>
    </div>
    <div class="info">
      <div>交易手续费</div>
      <div>0.1%</div>
    </div>
    <div class="btn" @click="showDialog = !showDialog">确认兑换</div>
    <van-floating-panel v-if="state" :height="540">
      <div class="panel-title">选择币种</div>
      <div class="panel-content" v-for="i in option" :key="i.value" @click="changePanel(i)">
        <div>{{i.text}}</div>
        <img src="@/assets/img/check.png" alt="" v-show="(key === 1 && i.text === text1) || (key === 2 &&i.text === text2)">
      </div>
    </van-floating-panel>
    <van-dialog v-model:show="showDialog" :showConfirmButton="false" closeOnClickOverlay>
      <div class="dialog">
        <div class="dialog-label">您确认对BTC USDT永续 卖</div>
        <div class="dialog-label">10.00X仓位按市价进行全部平仓吗？</div>
        <div class="dialog-info">如果存在与仓位方向相反的限价挂单，将会在全平前被撤单。</div>
        <van-checkbox v-model="checked" shape="square" checked-color="#E8C5AE">不再提醒</van-checkbox>
        <div class="dialog-btns" @click="showDialog = false">
          <div>取消</div>
          <div>确认</div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>
<style scoped lang="scss">
@use "@/views/trans/trans";
</style>
