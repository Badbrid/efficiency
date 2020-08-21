<template>
  <div class="effic-main-container">
    <slot></slot>
  </div>
</template>

<script>
    export default {
      name: "EfficMainContainer"
    }
</script>

<style scoped>

  .effic-main-container {
    padding: 15px;
    width: 100%;
    height: calc(100vh - 80px);
  }

</style>
