<template>
  <div class="capacity">
    <div class="analyseCon_left_top_title">
      <!-- 标题 -->
      <div class="analyseCon_left_top_img">
        各业务交易量
      </div>
      <!-- 下拉框 -->
      <div class="analyseCon_sele">
        <!-- <Select v-model="chainvalue" style="width:80px" class="com_select ">
          <Option v-for="item in chain" :value="item" :key="item">{{ item}}</Option>
        </Select> -->

      </div>

    </div>
    <div id="capacity"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts/map/js/china.js";
import { getCapacity } from '@/api/data';
export default {
  name: 'capacity',

  data () {
    return {
      capaX: [],
      capaY: []
    };
  },



  methods: {
    capacityFun () {
      let myCapacity = echarts.init(document.getElementById("capacity"));
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
      myCapacity.setOption(option);
    }
  },
  mounted () {

    getCapacity().then(res => {
      this.capaX = Object.keys(res.data)
      this.capaY = Object.values(res.data)
      this.capacityFun()
    })
  },
};
</script>

<style lang="less" scoped>
#capacity {
  position: relative;
  top: 5%;
  width: 100%;
  height: 300px;
}
.capacity {
  box-sizing: border-box;
  width: 100%;
  padding: 3%;
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