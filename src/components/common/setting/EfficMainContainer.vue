<template>
  <el-main class="effic-main-container">
    <slot></slot>
  </el-main>
</template>

<script>
    export default {
      name: "EfficMainContainer"
    }
</script>

<style scoped>

  .effic-main-container {
    padding: 15px;
    height: calc(100vh - 80px);
  }

</style>
