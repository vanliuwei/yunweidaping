<template>
  <div class="total">
    <div class="total_title">
      <div>
        总业务交易分析

      </div>
      <!-- 下拉框 -->
      <Select v-model="totalvalue" style="width:50px" class="com_select " @on-change='totalFun' :label-in-value="true">
        <Option v-for="item in total_sele" :value="item.value" :key="item.value">{{ item.label}}</Option>
      </Select>

    </div>
    <div>
      <div class="analyseCon_left_top_content">
        <div class="total_div">
          <marquee direction="left" class="number">{{tnumber}}</marquee>
          <!-- <p class="number">{{tnumber}}</p> -->
          <p class="text">累计交易量</p>
        </div>
        <div class="total_div">
          <marquee direction="left" class="number">{{dayNumner}}</marquee>
          <p class="text">本{{dayWeek}}新增交易量</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getTotal, getTotals } from '@/api/data';
export default {
  name: 'total',

  data () {
    return {
      tnumber: 0,
      dayNumner: 0,
      totalvalue: 'day',
      dayWeek: '天',
      total_sele: [
        {
          value: 'day',
          label: '天'
        },
        {
          value: 'week',
          label: '周'
        },
        {
          value: 'month',
          label: '月'
        }
      ]
    };
  },

  mounted () {
    this.getTotalFun()
  },

  methods: {
    totalFun (e) {
      this.totalvalue = e.value
      this.dayWeek = e.label
    },
    getTotalFun () {
      getTotal().then(res => {
        this.tnumber = res.data
      })
    }
  },
  watch: {
    'totalvalue': {
      handler (value) {
        getTotals(value).then(res => {
          this.dayNumner = res.data
        })
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
.total {
  box-sizing: border-box;
  padding: 3%;
  .total_title {
    font-size: 16px;
    color: #cce6ff;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
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
  }
  .analyseCon_left_top_content {
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding-left: 3%;
    margin-top: 3%;
    .total_div {
      width: 45%;
      height: 85px;
      background: url("../../../assets/frame.png");
      background-size: 100% 100%;
    }
    .number {
      color: #20c0ed;
      font-size: 2.3rem;
    }
    .text {
      text-align: center;
      color: #cce6ff;
    }
  }
}
</style>