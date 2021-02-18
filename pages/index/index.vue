<template>
  <b-container class="bg-light p-5">
    <div class="text-center my-3">
      <b-table striped hover bordered :fields="fields" :items="items">
        <template #cell(index)="data">
          {{ data.index + 1 }}
        </template>
      </b-table>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      value: 33.333333333,
      max: 100,
      fields: ['first_name', 'last_name', 'age'],
      items: [
        { id: 1, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { id: 2, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { id: 3, age: 89, first_name: 'Geneva', last_name: 'Wilson', _rowVariant: 'danger' },
        { id: 4, age: 38, first_name: 'Jami', last_name: 'Carney', _rowVariant: 'success' }
      ]
    }
  },
  computed: {},
  beforeCreate () {

  },
  mounted () {
  },
  methods: {
    showModal () {
      this.$refs.my.show()
    },
    linkGen (pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    }
  }
}
</script>

<style scoped></style>
