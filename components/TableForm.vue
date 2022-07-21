<template>
    <a-table :columns="columns" :data-source="dataSource">

    </a-table>
</template>

<script>
  export default {
    name: 'TableForm',
    props: {
      dataSource: {
        type: Array,
        default () {
          return []
        }
      },
      columns: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {}
    },
    mounted () {},
    methods: {}
  }
</script>

<style scoped>

</style>
