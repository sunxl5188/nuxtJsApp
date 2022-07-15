<template>
  <div class="rank">
    <h5 class="u-line-1">{{title}}</h5>
    <ul>
      <li v-for="(item, i) in list" :key="i" class="d-flex justify-content-between align-items-center">
        <span :class="{active:i<3}">{{i+1}}</span>
        <span class="flex-grow-1 pl-2 u-line-1">{{item.title}}</span>
        <span class="text-black-50">{{item.value}}</span>
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
        line-height: 20px;
        padding: 9px 0;

        & > span {
          &:first-of-type {
            @include font-en();
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
          &:last-of-type{
            @include font-en();
          }
        }
      }
    }
  }
</style>
