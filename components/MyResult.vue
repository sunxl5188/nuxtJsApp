<template>
    <div>
        <a-result
                :status="state"
                :title="title"
                :sub-title="subTitle"
        >
            <template v-if="state==='success'" slot="icon">
                <a-icon type="check-circle" />
            </template>
            <template v-if="state==='error'" slot="icon">
                <a-icon type="close-circle" />
            </template>
            <slot></slot>
            <template v-if="extra" #extra>
                <slot name="extra"></slot>
            </template>
        </a-result>
    </div>
</template>

<script>
  export default {
    name: 'MyResult',
    props: {
      state: {
        type: String,
        default: 'success'
      },
      title: {
        type: String,
        default: ''
      },
      subTitle: {
        type: String,
        default: ''
      },
      extra: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {}
    },
    mounted () {},
    methods: {}
  }
</script>

<style scoped>

</style>
