<template>
  <b-container class="bg-light p-5">
    <b-button @click="showModal">
      Launch demo modal
    </b-button>

    <b-modal
      id="modal-1"
      ref="my"
      centered
      static
      title="温馨提示"
      cancel-title="取消"
      ok-title="确定"
    >
      <p class="my-4">
        Hello from modal!
      </p>
    </b-modal>
  </b-container>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      name: '',
      mainProps: {
        center: true,
        fluidGrow: true,
        blank: true,
        class: 'my-5'
      }
    }
  },
  computed: {},
  methods: {
    showModal () {
      this.$refs.my.show()
    }
  }
}
</script>

<style scoped></style>
