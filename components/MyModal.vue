<template>
  <div>
    <a-modal
      v-if="footer"
      :title="title"
      :visible="visible"
      :width="width"
      :confirm-loading="confirmLoading"
      :ok-text="okText"
      :cancel-text="cancelText"
      :mask-closable="maskClosable"
      :centered="centered"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <slot>
        {{content}}
      </slot>
    </a-modal>
    <a-modal
      v-else
      :title="title"
      :visible="visible"
      :width="width"
      :confirm-loading="confirmLoading"
      :ok-text="okText"
      :cancel-text="cancelText"
      :mask-closable="maskClosable"
      :centered="centered"
      :footer="null"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <slot>
        {{content}}
      </slot>
    </a-modal>
  </div>
</template>

<script>
  export default {
    name: 'MyModal',
    model: {
      prop: 'visible',
      event: 'change'
    },
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
      },
      maskClosable: {
        type: Boolean,
        default: true
      },
      centered: {
        type: Boolean,
        default: false
      },
      footer: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
      }
    },
    methods: {
      handleOk () {
        this.$emit('change', false)
        this.$emit('confirm')
      },
      handleCancel () {
        this.$emit('change', false)
        this.$emit('cancel')
      }
    }
  }
</script>

<style scoped>

</style>
