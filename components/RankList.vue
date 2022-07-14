<template>
  <div class="rank">
    <h4>{{title}}</h4>
    <ul>
      <li v-for="(item, i) in list" :key="i" class="d-flex justify-content-between align-items-center">
        <span :class="{active:i<3}">{{i+1}}</span>
        <span class="flex-grow-1 pl-2">{{item.title}}</span>
        <span>{{item.value}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'RankList',
    props: {
      title: {
        type: String,
        default: ''
      },
      list: {
        type: Array,
        default () {
          return []
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .rank {
    & > ul {
      & > li {
        height: 38px;
        line-height: 38px;

        & > span {
          &:first-of-type {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-size: 12px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            line-height: 20px;
            text-align: center;
            background: $gray-300;
            color: $secondary;

            &.active {
              background: $dark;
              color: $white;
            }
          }
        }
      }
    }
  }
</style>
