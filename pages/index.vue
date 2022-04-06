<template>
  <div>
    <a-space align="center" direction="horizontal" size="large">
      <a-button type="primary">确定</a-button>
      <a-button type="primary">确定</a-button>
      <a-button type="primary">确定</a-button>
    </a-space>
    <a-input v-model="value" allow-clear placeholder="请输入" />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      value: 'value'
    }
  },
  mounted () {
    this.$nextTick(() => {
      console.log(this.$api)
    })
  },
  methods: {

  }
}
</script>
