<template>
  <div class="sortslideshow">
    <h3>排序</h3>
    <span class="message">(支持拖拽排序、点击切换)</span>
    <draggable
      v-model="sortlist"
      animation="200"
      :delay="300"
      @change="change"
      easing="cubic-bezier(1, 0, 0, 1)"
      dragClass="sortable-drag"
      ghostClass="sortable-drag"
      chosenClass="sortable-drag" 
    >
      <transition-group tag="ul" class="ulsort" @click.native="clickq">
        <li v-for="(e, i) of sortlist" :key="e.videoid" :data-index="i">
          <div class="serial" :data-index="i">{{ i + 1 }}</div>
          {{ e.aggarr.title }}
          <i :data-index="i">☰</i>
        </li>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
//引入拖拽排序
import draggable from "vuedraggable";

export default {
  name: "Sortslideshow",
  props: ["list"],
  data() {
    return {
      sortlist: [],
    };
  },
  methods: {
    //排序后告诉父组件
    change() {
      //只传videoid数组
      const lists = this.sortlist.map((e) => e.videoid);
      this.$emit("sortslideshowfn", lists);
    },
    //点击切换操作
    clickq({target}){
      const {index} = target.dataset
      if(!index) return
      this.$emit('switchindex',index)
    }
  },
  watch: {
    list: {
      handler(newdata) {
        this.sortlist = newdata;
      },
    },
  },
  components: {
    draggable,
  },
};
</script>

<style lang="less" scoped>
//设置拖动元素的class的占位符的类名。
//拖动元素的class
// 设置被选中的元素的class
.sortable-drag {
  border: solid 2px #3089dc !important;
}

.sortslideshow {
  margin-bottom: 20px;
  h3 {
    display: inline;
    font-size: 1.3em;
    font-weight: 500;
    color: rgb(39, 39, 39);
    margin-bottom: 7px;
    margin-right: 5px;
  }
  .message {
    font-size: 0.8em;
    color: rgb(170, 170, 170);
  }
  .ulsort {
    display: flex;
    gap: 5px;
    background-color: rgb(255, 255, 255);
    padding: 10px;
    border-radius: 10px;
    border: 1px solid rgb(172, 172, 172);
    flex-wrap: wrap;
    width: 100%;
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-grow: 1;
      background-color: white;
      padding: 10px;
      text-align: center;
      border-radius: 10px;
      border: 1px solid rgba(178, 178, 178, 0.507);
      font-size: 14px;
      cursor: pointer;
      width: 200px;
      cursor:grab;
      .serial {
        color: rgb(0, 0, 0);
        border: 2px solid rgb(21, 120, 36);
        width: 20px;
        height: 20px;
        line-height: 18px;
        border-radius: 100%;
        font-size: 13px;
      }
    }
  }
}

@media (max-width: 1200px) {
  .ulsort {
    // flex-direction: column;
  }
}
</style>
