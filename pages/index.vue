<template>
  <div class="">
    <input type="file" name="fileInput" @change="onChang">
  </div>
</template>

<script>
  // getDuration
  import { getDuration } from '~/static/js/utils'

  export default {
    name: 'IndexPage',
    components: {},
    data () {
      return {
        input: ''
      }
    },
    computed: {},
    mounted () {
      const audio = new Audio('https://oss.szylcn.com/dev/video/20220527/F3C039AD17A8C5EC1653615502853.mp4')
      audio.muted = false
      audio.play().then(res => {
        console.log(res)
      })
      this.$nextTick(() => {
        // console.log(this.$cookies)
        /* _.delay(async () => {
          const duration = await getVideoDuration('https://oss.szylcn.com/dev/video/20220527/F3C039AD17A8C5EC1653615502853.mp4')
          console.log(duration)
        }, 3000) */
      })
    },
    methods: {
      async onChang () {
        const doc = document.getElementsByName('fileInput')[0]
        const d = await getDuration(doc.files[0])
        console.log(d)
      }
    }
  }
</script>
<style>

</style>
