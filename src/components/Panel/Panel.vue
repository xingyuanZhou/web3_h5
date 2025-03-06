<template>
  <van-floating-panel v-if="state" :height="540" class="Panel">
    <div class="panel-title">{{ title }}</div>
    <div class="panel-content" v-for="i in option" :key="i.value" @click="changePanel(i)">
      <div>{{ i.text }}</div>
      <img src="@/assets/img/check.png" alt="" v-show="i.text === text">
    </div>
  </van-floating-panel>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: String,
  option: Array,
  changePanel: Function,
  state: Boolean,
  text: String,
});
</script>

<style scoped lang="scss">
@use "@/components/Panel/Panel";
</style>