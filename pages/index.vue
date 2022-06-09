<template>
  <div class="">
    <input type="file" name="ip" id="ip" @change="onChang">
  </div>
</template>

<script>
  // getDuration
  import { getVideoDuration, getDuration } from '~/static/js/utils'

  export default {
    name: 'IndexPage',
    components: {},
    data () {
      return {
        input: ''
      }
    },
    computed: {},
    async mounted () {
      this.$nextTick(() => {
        // console.log(this.$cookies)

      })
      const duration = await getVideoDuration('https://oss.szylcn.com/dev/video/20220527/F3C039AD17A8C5EC1653615502853.mp4')
      console.log(duration)
    },
    methods: {
      async onChang () {
        const doc = document.getElementById('ip')
        const d = await getDuration(doc.files[0])
        console.log(d)
      }
    }
  }
</script>
<style>

</style>
