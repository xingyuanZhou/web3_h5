<script setup>
import {ref} from "vue";
import {showToast} from "vant";

const value = ref('')
</script>
<template>
  <div class="recommend">
    <div class="title">
      邀请好友，可获得至多<span>20%</span>的算力加成
    </div>
    <div class="info">将下方邀请码复制发送给好友，好友打开该Dapp链接后，并填写邀请码充值矿机即可获得奖励。</div>
    <div class="participate">
      参与挖矿
      <img src="@/assets/img/arrow-right.png">
    </div>
    <div class="bind">
      <div class="bind-title">绑定联系人</div>
      <van-field v-model="value" placeholder="输入推荐人的邀请码" class="bind-input" :border="false"/>
      <div class="bind-btn">确认绑定</div>
    </div>
    <div class="code">
      <div>我的邀请码</div>
      <div class="code-v">
        2ji092am
        <img src="@/assets/img/copy.png" @click="showToast('复制成功');">
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use "@/views/recommend/recommend";
</style>
