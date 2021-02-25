<template>
  <div class="pt-5">
    <a-affix :target="() => this.$refs.layoutContent">
      <a-button type="primary">
        Fixed at the top of container
      </a-button>
    </a-affix>
  </div>
</template>

<script>
export default {
  name: 'Index',
  mounted () {
  }
}
</script>

<style lang="scss">
.ant-col{
  background:#dedede;
  font-size:12px;
}
</style>
