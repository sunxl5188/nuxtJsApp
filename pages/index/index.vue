<template>
  <div class="pt-5">
    <a-auto-complete
      v-model="value"
      :data-source="dataSource"
      size="large"
      style="width: 200px"
      placeholder="请输入"
    >
      <!--<template slot="dataSource">
        <a-select-option v-for="item in dataSource" :key="item.category" :title="item.category">
          Found {{ item.query }} on
          <a
              :href="`https://s.taobao.com/search?q=${item.query}`"
              target="_blank"
              rel="noopener noreferrer"
          >
            {{ item.category }}
          </a>
          <span className="global-search-item-count">{{ item.count }} results</span>
        </a-select-option>
      </template>-->
      <a-input>
        <!--<a-button
          slot="suffix"
          style="margin-right: -12px"
          class="search-btn"
          size="large"
          type="primary"
        >
          <a-icon type="search" />
        </a-button>-->
        <el-button type="primary" :circle="false">
          搜
        </el-button>
      </a-input>
    </a-auto-complete>
    <el-button type="primary" :round="false">
      搜
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      value: '',
      dataSource: ['Burns Bay Road', 'Downing Street', 'Wall Street']
    }
  },
  watch: {
  },
  mounted () {},
  methods: {
    onSelect (value) {
      console.log('onSelect', value)
    },
    onChange (value) {
      console.log('onChange', value)
    }
  }
}
</script>

<style lang="scss">
.ant-col{
  background:#dedede;
  font-size:12px;
}
</style>
