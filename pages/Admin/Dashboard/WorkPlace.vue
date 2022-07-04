<template>
  <div>
    <a-row>
      <a-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16" :xxl="16">
        <MyCard title="进行中的项目">
          <template #extra>
            <a-button type="secondary">全部项目</a-button>
            <a-button type="primary">确定</a-button>
          </template>
        </MyCard>
      </a-col>
      <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" :xxl="8">2222222</a-col>
    </a-row>
  </div>
</template>

<script>
  import MyCard from '~/components/MyCard'

  export default {
    name: 'WorkPlace',
    components: { MyCard },
    meta: { title: '工作台' }
  }
</script>

<style scoped>

</style>
