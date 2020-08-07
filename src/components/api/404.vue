<template>
  <div class="page fn-clear">
    <div class="info">
      404
      <p>{{message}}</p>
    </div>
  </div>
</template>
<script>

export default {
  name: "default_404",
  data() {
    return {
      message: ""
    };
  },
  created() {
    let message = this.$route.query.info;
    this.message = message ? message : "找不到此页面";
  },
  mounted() {
  }
};
</script>
<style lang="scss" scoped>

</style>
