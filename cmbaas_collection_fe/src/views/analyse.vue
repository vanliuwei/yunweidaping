<template>
  <div class="body">
    <!-- 头部 -->
    <div class="analyseTitle">
      <div class="topTitle">
        运&nbsp;&nbsp;&nbsp; 营&nbsp;&nbsp;&nbsp; 分&nbsp;&nbsp;&nbsp; 析&nbsp;&nbsp;&nbsp; 平 &nbsp;&nbsp;&nbsp;台
      </div>
    </div>
    <!-- 主体内容 -->
    <div class="analyseCon">
      <!-- left -->
      <div class="left">
        <!-- 新业务发展分析 -->
        <Newbusiness />
        <!-- 新接入业务交易量 -->
        <Newjion />
        <!-- 周期内总交易量 -->
        <Period />
      </div>
      <!-- 中间 -->
      <div class="centent">
        <Anslysemap />
        <Yeardeal />
      </div>
      <!-- right -->
      <div class="right">
        <Total />
        <Periods />
        <Capacity />
      </div>
    </div>
  </div>
</template>
<script>
import Newbusiness from '_c/anslyse/newbusiness/newbusiness';
import Newjion from '_c/anslyse/newjion/newjion';
import Period from '_c/anslyse/period/period';
import Anslysemap from '_c/anslyse/anslysemap/anslysemap';
import Yeardeal from '_c/anslyse/yeardeal/yeardeal';
import Total from '_c/anslyse/total/total';
import Periods from '_c/anslyse/periods/periods';
import Capacity from '_c/anslyse/capacity/capacity';
export default {
  components: {
    Newbusiness,
    Newjion,
    Period,
    Anslysemap,
    Yeardeal,
    Total,
    Periods,
    Capacity
  },
  data () {
    return {

    }
  },
  methods: {


  },
  mounted () {


  }
}
</script>

<style scoped lang='less'>
* {
  margin: 0;
  padding: 0;
}
html,
body {
  width: 100%;
  height: 100%;
  font-family: "Noto Sans SC";
  font-style: normal;
}
.body {
  width: 100%;
  background: url("../assets/background.png");
  background-size: 100% 100%;
}

// 顶部标题
.analyseTitle {
  width: 100%;
  height: 78px;
  background: url("../assets/titlean.png");
  background-size: 100% 100%;
  .topTitle {
    text-align: center;
    line-height: 78px;
    font-size: 2.2rem;
    color: #cce6ff;
  }
}
// 中间主体内容
.analyseCon {
  padding: 20px 28px 50px 28px;
  display: flex;
  justify-content: space-between;
  .left {
    width: 28%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  .centent {
    width: 40%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  .right {
    width: 28%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
}
// 下拉样式
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