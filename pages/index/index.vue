<template>
  <div class="pt-5">
    <a-tree-select
      v-model="value"
      show-search
      style="width: 100%"
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      placeholder="Please select"
      allow-clear
      tree-default-expand-all
    >
      <a-tree-select-node key="0-1" value="parent 1" title="parent 1">
        <a-tree-select-node key="0-1-1" value="parent 1-0" title="parent 1-0">
          <a-tree-select-node key="random" value="leaf1" title="my leaf" />
          <a-tree-select-node key="random1" value="leaf2" title="your leaf" />
        </a-tree-select-node>
        <a-tree-select-node key="random2" value="parent 1-1" title="parent 1-1">
          <a-tree-select-node key="random3" value="sss" title="sss" />
        </a-tree-select-node>
      </a-tree-select-node>
    </a-tree-select>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Index',
  data () {
    return {
      moment,
      data: [],
      value: '',
      list: [
        {
          label: '选择器1',
          value: '1'
        },
        {
          label: '选择器2',
          value: '2'
        },
        {
          label: '选择器3',
          value: '3'
        }
      ],
      mockData: [],
      targetKeys: [],
      listStyle: {
        width: '45%',
        minWidth: '200px',
        minHeight: '300px'
      }
    }
  },
  watch: {},
  mounted () {
    this.getMock()
  },
  methods: {
    onSelect (value) {
      console.log('onSelect:---->', value)
    },
    onChange (value) {
      console.log('onChange---->', value)
    },
    onSearch (value) {
      console.log('onSearch---->', value)
    },
    submitSave () {
      this.$refs.myform.validate((valid) => {
        console.log(valid)
      })
    },
    handleSelectChange (value) {
      console.log(value)
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
      })
    },
    handleSearch2 (value) {
      fetch(value, data => (this.data = data))
    },
    handleChange2 (value) {
      this.value = value
      fetch(value, data => (this.data = data))
    },
    getMock () {
      const mockData = []
      for (let i = 0; i < 20; i++) {
        const data = {
          key: i.toString(),
          title: `content${i + 1}`,
          description: `description of content${i + 1}`,
          chosen: Math.random() * 2 > 1
        }
        mockData.push(data)
      }
      this.mockData = mockData
    },
    filterOption (inputValue, option) {
      return option.description.includes(inputValue)
    },
    handleChange (targetKeys, direction, moveKeys) {
      // console.log(targetKeys, direction, moveKeys)
      this.targetKeys = targetKeys
    },
    handleSearch (dir, value) {
      console.log('search:>>', dir, value)
    }
  }
}
</script>

<style lang="scss">

</style>
