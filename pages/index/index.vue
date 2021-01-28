<template>
  <div class="container pt-5">
    <b-link to="/about" active>
      关于我们
    </b-link>
    <b-container fluid class="p-4 bg-dark">
      <b-row cols="3" align-h="start">
        <b-col>
          <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=54" alt="Image 1" />
        </b-col>
      </b-row>
    </b-container>
  </div>
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
  computed: {

  },
  methods: {
    getImageUrl (imageId) {
      return `https://picsum.photos/600/400/?image=${imageId}`
    }
  }
}
</script>

<style scoped>

</style>
