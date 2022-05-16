<template>
  <div class="">
    <span class="badge badge-danger">Danger!</span>
    <div class="dropdown open">
      <button
id="triggerId" class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
        Dropdown
      </button>
      <div class="dropdown-menu" aria-labelledby="triggerId">
        <button class="dropdown-item" href="#">Action</button>
        <button class="dropdown-item disabled" href="#">Disabled action</button>
      </div>
    </div>
    <!--------------***************-->
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId">
      Launch
    </button>

    <!-- Modal -->
    <div id="modelId" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 id="modelTitleId" class="modal-title"></h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Body
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
    <!--**************************-->
    <section class="container">
      <div>

        <no-ssr>
          <div v-masonry transition-duration="3s" item-selector=".item" class="masonry-container">
            <div v-for="(item, index) in blocks" :key="index" v-masonry-tile class="item">
              <p>{{item.title}} - {{index}}</p>
              <img :src="item.image" alt="altText"/>
            </div>
          </div>
        </no-ssr>
      </div>
    </section>
  </div>
</template>

<script>
  import NoSSR from 'vue-no-ssr'

  export default {
    name: 'IndexPage',
    components: {
      'no-ssr': NoSSR
    },
    data () {
      return {
        input: '',
        blocks: [
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
    computed: {
    },
    mounted () {

      if (typeof this.$redrawVueMasonry === 'function') {
        this.$redrawVueMasonry()
      }

      this.$nextTick(() => {
        // console.log(this.$cookies)
      })
    },
    methods: {}
  }
</script>
<style>
  .container {

  }

  .item {
    border: 1px solid #ac0;
    width: 200px;
  }
  .item img{
    width: 100%;
  }
  .masonry-container {
    width: 100%;
    margin: 0 auto;
    position: relative;
  }
</style>
