<template>
  <a-list item-layout="horizontal" :data-source="dataSource">
    <a-list-item slot="renderItem" slot-scope="item">
      <a-list-item-meta :description="item.desc">
        <a slot="title" href="#" v-html="item.title"></a>
        <a-avatar slot="avatar" :src="item.avatar"/>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>

<script>
  export default {
    name: 'MyList',
    props: {
      dataSource: {
        type: Array,
        default () {
          return []
        }
      }
    }
  }
</script>

<style scoped>

</style>
