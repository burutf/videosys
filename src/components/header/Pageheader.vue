<template>
  <div class="headt">
    <span>
      <el-page-header @back="goBack" :content="content"></el-page-header>
    </span>
  </div>
</template>

<script>
export default {
  name: "pageheader",
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
  computed: {
    content() {
      return this.$route.name;
    },
  }
};
</script>

<style lang="less" scoped>
.headt {
  flex: 1;
  color: #333;
  line-height: 60px;
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 20px;
}
</style>