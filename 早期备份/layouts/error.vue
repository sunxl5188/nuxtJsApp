<template>
  <div class="container">
    <div class="d-flex justify-content-center">
      <div class="media w-50" style="margin-top: 20%;">
        <img src="@/static/images/404.png" alt="404" class="align-self-center c404 mr-3">
        <div class="media-body">
          <h5>抱歉，你访问的页面不存在。</h5>
          <p>可能是因为您的链接地址有误、该文章已经被作者删除或转为私密状态，您可以尝试
            <nuxt-link to="/" class="text-primary">返回「本站」首页</nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
.c404 {
  width: 200px;
  height: 200px;
}

.media {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
}
</style>
