<template>
  <b-container class="bg-light p-5">
    <b-button v-b-modal.modal>
      Launch demo modal
    </b-button>
    <b-modal
      id="modal"
      title="温馨提示"
      cancel-title="取消"
      ok-title="确定"
      no-close-on-backdrop
      scrollable
    >
      <p class="mb-0">
        sdgdsfhdf
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
