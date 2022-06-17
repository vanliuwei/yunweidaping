<template>
  <div>
    <div class="analyseCon_left_top_title">
      <!-- 标题 -->
      <div class="analyseCon_left_top_img">
        周期内总交易量
      </div>
      <!-- 下拉框 -->
      <div class="analyseCon_sele">
        <Select v-model="quarters" style="width:50px" class="com_select " @on-change='periodsFun'>
          <Option v-for="item in quarter" :value="item.value" :key="item.value">{{ item.label}}</Option>
        </Select>

      </div>

    </div>
    <div id="period"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts/map/js/china.js";
import { getPeriod } from '@/api/data';
export default {
  name: 'period',

  data () {
    return {
      quarters: 'day',
      capaX: [],
      capaY: [],
      quarter: [
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
      ],
    };
  },

  methods: {

    periodFun () {
      let myPeriod = echarts.init(document.getElementById("period"));
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            label: {
              backgroundColor: "#6a7985",
            },
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '15%'
        },
        xAxis: {
          data: this.capaX,
          //坐标轴
          axisLine: {
            lineStyle: {
              color: '#3eb2e8'
            }
          },
          //坐标值标注
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff',
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '单位：个笔',
          nameTextStyle: {
            color: '#C0D8F1',
            fontSize: 14
          },
          //坐标轴
          axisLine: {
            show: false
          },
          //坐标值标注
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff',
            }
          },
          //分格线
          splitLine: {
            lineStyle: {
              color: '#4784e8',
              type: 'dashed'
            }
          }
        },
        series: [{
          name: '交易量',

          type: 'bar',
          barWidth: 24.5,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                offset: 0,
                color: "#0B4EC3" // 0% 处的颜色
              }, {
                offset: 0.6,
                color: "#138CEB" // 60% 处的颜色
              }, {
                offset: 1,
                color: "#17AAFE" // 100% 处的颜色
              }], false)
            }
          },
          data: this.capaY,
          barGap: 0
        }]

      }
      myPeriod.setOption(option);
    },
    periodsFun (e) {
      this.quarters = e
    },
  },
  mounted () {
    this.periodFun()
  },
  watch: {
    'quarters': {
      handler (value) {
        getPeriod(value).then(res => {
          this.capaX = Object.keys(res.data)
          this.capaY = Object.values(res.data)
          this.periodFun()
        })
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
#period {
  width: 100%;
  height: 300px;
}
.analyseCon_left_top_title {
  display: flex;
  justify-content: space-between;
  .analyseCon_left_top_img {
    font-size: 16px;
    color: #cce6ff;
    font-weight: 600;
    // height: 40px;
    // background: url("../assets/one.png");
    // background-size: 100% 100%;
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
}
</style>