<template>
  <no-ssr>
    <!--
    item-selector=".item" - 列表元素DOM项目选择器
    transition-duration="0.3s - 过渡持续时间
    column-width="#test" - 列宽的元素选择器。可以是选择器字符串或数字
    origin-left="false" - 默认设置为将元素分组到右侧，而不是左侧
    origin-top="false" - 默认设置为将元素分组到底部而不是顶部;
    stamp=".stamp" - 指定在布局中压印哪些元素;
    gutter=".gutter-block-selector" - 块选择器”-指定[项目元素之间的水平间距]。可以是选择器字符串或数字。(https://masonry.desandro.com/options.html#gutter).将檐槽设置为元素或选择器字符串，以使用元素的外部宽度
    fit-width="true" - 设置容器的宽度以适合可用的列数
    horizontal-order="true" - 布置项目以（主要）保持水平的从左到右顺序
    stagger="0.03s" - 错开项目转换，因此项目一个接一个地递增转换。设置为CSS时间格式“0.03s”，或设置为以毫秒为单位的数字，即30
    destroy-delay="0" - 在通过砌体卸载砌体之前等待的时间（毫秒）。销毁（）当容器被销毁时。这在页面/路线转换期间非常有用，可以确保转换期间布局一致
    -->
    <div
      v-masonry
      :transition-duration="duration"
      :item-selector="'.masonry-item'"
      class="masonry-container"
      :column-width="columnWidth"
      :gutter="gutter"
      :fit-width="false"
      :horizontal-order="false"
    >
      <div
        v-for="(item, index) in list"
        :key="index"
        v-masonry-tile
        class="masonry-item"
        :style="'margin-bottom:' + bottomSpacing + 'px;'"
      >
        <slot :row="item">
          <img :src="item.image" alt="altText"/>
          <div class="masonry-text u-px-10">{{item.title}}</div>
        </slot>
      </div>
    </div>
  </no-ssr>
</template>

<script>
  import NoSSR from 'vue-no-ssr'

  export default {
    name: 'MyMasonry',
    components: {
      'no-ssr': NoSSR
    },
    props: {
      duration: {
        type: String,
        default: '0.3s'
      },
      columnWidth: {
        type: [Number, String],
        default: 200
      },
      gutter: {
        type: [Number, String],
        default: 10
      },
      bottomSpacing: {
        type: [Number, String],
        default: 10
      },
      list: {
        type: Array,
        default () {
          return [
            {
              title: 'nice block',
              image: require('@/assets/images/001.jpg')
            },
            {
              title: 'another shiny block',
              image: require('@/assets/images/003.jpg')
            },
            {
              title: 'the last block',
              image: require('@/assets/images/002.jpg')
            },
            {
              title: 'the last block',
              image: require('@/assets/images/004.jpg')
            },
            {
              title: 'nice block',
              image: require('@/assets/images/003.jpg')
            },
            {
              title: 'another shiny block',
              image: require('@/assets/images/001.jpg')
            },
            {
              title: 'the last block',
              image: require('@/assets/images/004.jpg')
            },
            {
              title: 'the last block',
              image: require('@/assets/images/002.jpg')
            }
          ]
        }
      },
    },
    async mounted () {
      await this.$nextTick()
      if (typeof this.$redrawVueMasonry === 'function') {
        this.$redrawVueMasonry()
      }
    }
  }
</script>

<style scoped lang="scss">
  .masonry {
    &-container {
      width: 100%;
      margin: 0 auto;
      position: relative;
    }

    &-item {
      background-color: #f4f4f4;
      width: 200px;

      & img {
        width: 100%;
      }
    }

    &-text {
      height: 30px;
      line-height: 30px;
    }
  }
</style>
