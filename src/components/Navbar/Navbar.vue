<script setup>
const onClickLeft = () => history.back();
</script>

<template>
  <van-nav-bar 
    class="Navbar"
    title="捐赠"
    left-arrow
    :border="false"
    @click-left="onClickLeft"
  />
</template>

<style scoped src="@/components/Navbar/Navbar.css"></style>