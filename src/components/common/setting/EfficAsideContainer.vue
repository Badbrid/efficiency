<template>

  <el-aside class="effic-aside-container">
    <slot></slot>
  </el-aside>

</template>

<script>
    export default {
      name: "EfficAsideContainer"
    }
</script>

<style scoped>

  .effic-aside-container {
    border: 1px solid #E6E6E6;
    padding: 10px;
    border-radius: 2px;
    box-sizing: border-box;
    background-color: #FFF;
    height: calc(100vh - 80px);
  }

</style>
