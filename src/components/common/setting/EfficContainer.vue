<template>

  <el-container class="effic-container">
    <slot></slot>
  </el-container>

</template>

<script>
    export default {
      name: "EfficContainer"
    }
</script>

<style scoped>

  .effic-container >>> span.title {
    font-size: 16px;
    font-weight: 500;
    margin-top: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    word-wrap: break-word;
    white-space: nowrap;
  }

</style>
