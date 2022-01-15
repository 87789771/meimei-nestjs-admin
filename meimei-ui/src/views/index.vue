<template>
  <div class="app-container home">
    <h3>
      <el-link type="primary" href="https://87789771.github.io/#/"
        >查看开发文档请点击</el-link
      >
    </h3>
    <h3>
      <el-link
        type="primary"
        href="https://github.com/87789771/meimei-nestjs-admin"
        >查看码源请点击</el-link
      >
    </h3>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      // 版本号
      version: "3.8.0",
    };
  },
  methods: {
    goTarget(href) {
      window.open(href, "_blank");
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
}
</style>

