<script setup>
import {ref, onMounted} from 'vue';
import {useRouter} from "vue-router";

const router = useRouter()
const active = ref(0);
onMounted(() => {
  if (['/home'].includes(router.currentRoute.value.path)) {
    active.value = 0;
  } else if(['/power'].includes(router.currentRoute.value.path)) {
    active.value = 1;
  } else if(['/profit'].includes(router.currentRoute.value.path)) {
    active.value = 2;
  } else if(['/recommend',].includes(router.currentRoute.value.path)) {
    active.value = 3;
  }
})

function tabBtn(path) {
  router.push(path)
}
</script>

<template>
  <RouterView/>
  <!--tabbar -->
  <van-tabbar v-model="active" class="tabbar" :border="false">
    <van-tabbar-item @click="tabBtn('/home')">
      <img v-if="active !== 0" src="@/assets/tabbar/bar.png" alt="">
      <img v-else src="@/assets/tabbar/bar-a.png" alt="">
      <div>首页</div>
    </van-tabbar-item>
    <van-tabbar-item @click="tabBtn('/power')">
      <img v-if="active !== 1" src="@/assets/tabbar/rocket.png" alt="">
      <img v-else src="@/assets/tabbar/rocket-a.png" alt="">
      <div>算力</div>
    </van-tabbar-item>
    <van-tabbar-item @click="tabBtn('/profit')">
      <img v-if="active !== 2" src="@/assets/tabbar/coins.png" alt="">
      <img v-else src="@/assets/tabbar/coins-a.png" alt="">
      <div>收益</div>
    </van-tabbar-item>
    <van-tabbar-item @click="tabBtn('/recommend')">
      <img v-if="active !== 3" src="@/assets/tabbar/pie.png" alt="">
      <img v-else src="@/assets/tabbar/pie-a.png" alt="">
      <div>推荐</div>
    </van-tabbar-item>
  </van-tabbar>
</template>

<style scoped src="@/components/Tabbar/Tabbar.css"></style>
