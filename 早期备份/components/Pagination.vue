<template>
  <div>
    <nav>
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{'disabled': current === 1}">
          <a href="javascript:void(0);" class="page-link" @click="setCurrent(current - 1)">上一页</a>
        </li>
        <li class="page-item" :class="{'disabled': current === 1}">
          <a href="javascript:void(0);" class="page-link" @click="setCurrent(1)"> 首页 </a>
        </li>
        <li class="page-item" v-for="(p, k) in grouplist" :class="{'active': current === p.val}" :key="k">
          <a href="javascript:void(0);" class="page-link" @click="setCurrent(p.val)"> {{ p.text }}</a>
        </li>
        <li class="page-item" :class="{'disabled': current === page}">
          <a href="javascript:void(0);" class="page-link" @click="setCurrent(page)"> 尾页 </a>
        </li>
        <li class="page-item" :class="{'disabled': current === page}">
          <a href="javascript:void(0);" class="page-link" @click="setCurrent(current + 1)">下一页</a>
        </li>
      </ul>
    </nav>
    <!--<Paging :total="total" :current-page='current' @pageChange="pageChange"></Paging>-->
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  data () {
    return {
      current: this.currentPage
    }
  },
  props: {
    total: {// 数据总条数
      type: Number,
      default: 0
    },
    display: {// 每页显示条数
      type: Number,
      default: 10
    },
    currentPage: {// 当前页码
      type: Number,
      default: 1
    },
    pagegroup: {// 分页条数
      type: Number,
      default: 5,
      coerce: function (v) {
        v = v > 0 ? v : 5
        return v % 2 === 1 ? v : v + 1
      }
    }
  },
  computed: {
    page: function () { // 总页数
      return Math.ceil(this.total / this.display)
    },
    grouplist: function () { // 获取分页页码
      let len = this.page
      let temp = []
      let list = []
      let count = Math.floor(this.pagegroup / 2)
      let center = this.current
      if (len <= this.pagegroup) {
        while (len--) {
          temp.push({text: this.page - len, val: this.page - len})
        }

        return temp
      }
      while (len--) {
        temp.push(this.page - len)
      }

      let idx = temp.indexOf(center);
      (idx < count) && (center = center + count - idx);
      (this.current > this.page - count) && (center = this.page - count)
      temp = temp.splice(center - count - 1, this.pagegroup)
      do {
        let t = temp.shift()
        list.push({
          text: t,
          val: t
        })
      } while (temp.length)
      if (this.page > this.pagegroup) {
        (this.current > count + 1) && list.unshift({text: '...', val: list[0].val - 1});
        (this.current < this.page - count) && list.push({text: '...', val: list[list.length - 1].val + 1})
      }
      return list
    }
  },
  methods: {
    setCurrent: function (idx) {
      if (this.current !== idx && idx > 0 && idx < this.page + 1) {
        this.current = idx
        this.$emit('pageChange', this.current)
      }
    }
  }
}
</script>

<style scoped>

</style>
