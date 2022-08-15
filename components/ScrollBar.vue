<template>
  <div class="d-flex justify-content-between align-items-center">
    <div id="scroll" class="scroll flex-grow-1 flex-shrink-1">
      <div id="bar" class="bar"></div>
    </div>
    <span class="ml-2">{{text}}</span>
  </div>
</template>

<script>
  // https://www.jb51.net/article/219249.htm
  export default {
    name: 'ScrollBar',
    props: {
      value: {
        type: [String, Number],
        default: 0
      },
      showText: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        text: ''
      }
    },
    watch: {},
    mounted () {
      const self = this
      self.$nextTick(() => {
        const scroll = document.getElementById('scroll')
        const bar = document.getElementById('bar')
        bar.onmousedown = function (e) {
          const event = e || window.event
          // 页面事件的X减去当前相对于最近的祖先定位元素
          const x = event.clientX - this.offsetLeft
          document.onmousemove = function (e) {
            const event = e || window.event
            let left = event.clientX - x
            if (left < 0)
              left = 0
            else if (left > scroll.offsetWidth - bar.offsetWidth) {
              left = scroll.offsetWidth - bar.offsetWidth
            }
            // 改变滑块的left
            bar.style.left = left + 'px'
            self.text = parseInt(left / (scroll.offsetWidth - bar.offsetWidth) * 100) + '%'
            // 防止选择内容
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
          }

        }
        // 当鼠标弹起的时候，不做任何操作
        document.onmouseup = function () {
          document.onmousemove = null
        }
      })
    }
  }
</script>

<style scoped>
  .scroll {
    width:100%;
    height: 8px;
    background: #ccc;
    position: relative;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }

  .bar {
    width: 20px;
    height: 20px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    background: #369;
    position: absolute;
    top: 50%;
    left: 0;
    cursor: pointer;
    transform: translateY(-50%);
  }
</style>
