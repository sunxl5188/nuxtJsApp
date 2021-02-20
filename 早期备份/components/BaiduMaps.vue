<template>
  <div>
    <baidu-map
        class="bm-view" :style="'height:'+mapHeight+';'"
        :center="center"
        :zoom="zoom"
        :scroll-wheel-zoom="scroll"
    >
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-marker :position="center" :dragging="dragging" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
      <bm-info-window :position="center" :title="title" :show="show">
        <p>{{address}}</p>
      </bm-info-window>
    </baidu-map>
  </div>
</template>

<script>
export default {
  name: 'BaiduMaps',
  props: {
    title: {
      type: String,
      default: '大学无疆（厦门）教育科技有限公司'
    },
    address: {
      type: String,
      default: '地址：厦门市航空商务广场3号楼103'
    },
    center: {
      type: Object,
      default: () => ({ lng: 118.14832, lat: 24.540998 })
    },
    zoom: {
      type: Number,
      default: 15
    },
    dragging: {
      type: Boolean,
      default: true
    },
    scroll: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: true
    },
    mapHeight: {
      type: Number,
      default: 400
    }
  }
}
</script>

<style scoped>
.bm-view {}
</style>
