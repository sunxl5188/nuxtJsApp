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
  </div>
</template>

<script>
  export default {
    name: 'IndexPage',
    data () {
      return {
        input: ''
      }
    },
    computed: {
    },
    mounted () {
      this.$nextTick(() => {
        // console.log(this.$cookies)
      })
    },
    methods: {}
  }
</script>
