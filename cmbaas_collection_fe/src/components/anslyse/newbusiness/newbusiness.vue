<template>
  <div>
    <div class="analyseCon_left_top">
      <div class="analyseCon_left_top_title">
        <!-- 标题 -->
        <div class="analyseCon_left_top_img">
          新业务发展分析
        </div>
        <!-- 下拉框 -->
        <!-- <div class="analyseCon_sele">
          <Select v-model="chainvalue" style="width:80px" class="com_select ">
            <Option v-for="item in chain" :value="item" :key="item">{{ item}}</Option>
          </Select>
          &nbsp;&nbsp;
          <Select v-model="chainvalue" style="width:80px" class="com_select ">
            <Option v-for="item in chain" :value="item" :key="item">{{ item}}</Option>
          </Select>
        </div> -->
      </div>
      <div class="analyseCon_left_top_content">
        <div>
          <p class="number">{{number}}</p>
          <p class="text">预计新开展业务</p>
        </div>
        <div>
          <p class="number">{{number}}</p>
          <p class="text">已展开业务</p>
        </div>
        <div>
          <p class="number">{{number}}</p>
          <p class="text">业务开展中</p>
        </div>
        <div>
          <p class="number">{{number}}</p>
          <p class="text">带开展业务</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getnewNum } from '@/api/data';
export default {
  name: 'newbusiness',

  data () {
    return {
      chainvalue: '',
      chain: [],
      number: ''
    };
  },

  mounted () {
    getnewNum().then(res => {
      this.number = res.data

    })
  },

  methods: {

  },
};
</script>

<style lang="less" scoped>
//新业务发展分析
.analyseCon_left_top {
  width: 100%;
  height: 190px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 2%;
  .analyseCon_left_top_title {
    display: flex;
    justify-content: space-between;
  }

  .analyseCon_left_top_content {
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding-left: 3%;
    .analyseCon_left_top_content > div {
      width: 20%;
    }
    .number {
      text-align: center;
      color: #20c0ed;
      font-size: 2.3rem;
    }
    .text {
      text-align: center;
      color: #cce6ff;
    }
  }
  .analyseCon_left_top_img {
    font-size: 16px;
    color: #cce6ff;
    font-weight: 600;
    // height: 40px;
    // background: url("../assets/one.png");
    // background-size: 100% 100%;
  }
}
// 公共下拉样式
.com_select {
  width: 140px;
  background-color: transparent;
  border-radius: calc((100vw / 1920) * 4);
  color: #cce6ff;
  /deep/.ivu-select-selection {
    background-color: transparent !important;
    height: 25px;
    border-color: #15477a;
  }
  /deep/.ivu-select-selected-value {
    height: 20px;
    line-height: 20px;
  }
  /deep/.ivu-select-placeholder {
    height: 20px;
    line-height: 20px;
  }
}
</style>