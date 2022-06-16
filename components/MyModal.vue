<template>
  <a-modal
    :title="title"
    :visible="visible"
    :width="width"
    :confirm-loading="confirmLoading"
    :ok-text="okText"
    :cancel-text="cancelText"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <slot>
      {{content}}
    </slot>
  </a-modal>
</template>

<script>
  export default {
    name: 'MyModal',
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      width: {
        type: [String, Number],
        default: 520
      },
      okText: {
        type: String,
        default: '确定'
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      title: {
        type: String,
        default: '温馨提示'
      },
      content: {
        type: String,
        default: ''
      },
      confirmLoading: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
      }
    },
    methods: {
      handleOk (e) {
        this.$emit('confirm', e)
      },
      handleCancel () {
        this.$emit('cancel')
      }
    }
  }
</script>

<style scoped>

</style>
