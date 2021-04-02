<template>
  <div class="pt-5">
    11-
    <hr>
    <a-tabs default-active-key="1" type="line" :hide-add="true">
      <a-tab-pane v-for="(item, i) in [0,1,2,3,4,5,6,7,8,9]" :key="i" :tab="'Tab'+item">
        Content of Tab Pane {{ item }}
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Index',
  data () {
    return {
      moment
    }
  },
  watch: {},
  beforeCreate () {
  },
  mounted () {
  },
  methods: {}
}
</script>

<style>

</style>
