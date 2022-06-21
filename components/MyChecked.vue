<template>
  <div>
    <div class="clearfix border-bottom">
      <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
        全选
      </a-checkbox>
    </div>
    <div>
      <a-checkbox-group
        v-model="checkedList"
        :options="options"
        @change="onChange"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MyChecked',
    props: {
      options: {
        type: Array,
        default () {
          return []
        }
      },
    },
    data () {
      return {
        checkedList: [],
        indeterminate: false,
        checkAll: false,
        checkedValueArray: []
      }
    },
    mounted () {
      this.options.forEach(item => {
        this.checkedValueArray.push(item.value)
      })
      this.$nextTick(() => {
        const dLen = this.checkedValueArray.length
        const cLen = this.checkedList.length
        if(dLen === cLen){
          this.checkAll = true
          this.indeterminate = false
        } else if(dLen > cLen && cLen > 0){
          this.checkAll = false
          this.indeterminate = true
        } else if(cLen === 0){
          this.checkAll = false
          this.indeterminate = false
        }
      })
    },
    methods: {
      onChange (checkedList) {
        this.indeterminate = !!checkedList.length && checkedList.length < this.options.length
        this.checkAll = checkedList.length === this.options.length
      },
      onCheckAllChange (e) {
        console.log(e.target.checked)
        Object.assign(this, {
          checkedList: e.target.checked ? this.checkedValueArray : [],
          indeterminate: false,
          checkAll: e.target.checked,
        })
      }
    }
  }
</script>

<style scoped>

</style>
