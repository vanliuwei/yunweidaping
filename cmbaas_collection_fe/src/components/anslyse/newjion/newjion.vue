<template>
  <div class="newjion">
    <div class="analyseCon_left_top_title">
      <!-- 标题 -->
      <div class="analyseCon_left_top_img">
        新接入业务交易量
      </div>
      <!-- 下拉框 -->
      <div class="analyseCon_sele">
        <!-- <Select v-model="chainvalue" style="width:80px" class="com_select ">
          <Option v-for="item in chain" :value="item" :key="item">{{ item}}</Option>
        </Select>
        &nbsp;&nbsp; -->
        <Select v-model="chainvalue" style="width:80px" class="com_select ">
          <Option v-for="item in chain" :value="item" :key="item">{{ item}}</Option>
        </Select>
      </div>

    </div>
    <div id="volume">
    </div>

  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts/map/js/china.js";
import { getNewTotals, getNewEchart } from '@/api/data';
export default {
  name: 'newjion',
  data () {
    return {
      chainvalue: '',
      chain: [],
      dataX: [],
      dataY: []
    };
  },

  methods: {
    // 新接入业务交易量
    newVolume () {
      let myVolume = echarts.init(document.getElementById("volume"));
      let optionnew = {

        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: this.dataX,
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
              color: '#C0D8F1',
            }
          }
        },
        yAxis: {
          name: '单位：个笔',
          nameTextStyle: {
            color: '#C0D8F1',
            fontSize: 14
          },
          type: 'value',
          //坐标轴
          axisLine: {
            show: false
          },
          //坐标值标注
          axisLabel: {
            show: true,
            textStyle: {
              color: '#C0D8F1',
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
        series: [
          {
            data: this.dataY,
            type: 'line',
            symbol: 'none',
            itemStyle: {
              color: '#1B649E'
            },
          }
        ]
      };

      myVolume.setOption(optionnew);

    },
    getNewjion () {
      getNewTotals().then(res => {
        res.data.map(item => this.chain.push(item.accountName))
        this.chainvalue = res.data[0].accountName
      })
    }
  },

  mounted () {

    this.getNewjion()
  },
  watch: {
    'chainvalue': {
      handler (value) {
        if (value) {
          getNewEchart(value).then(res => {
            this.dataX = Object.keys(res.data)
            this.dataY = Object.values(res.data)
            this.newVolume() // 新接入业务交易量
          })
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
// 新接入业务交易量
#volume {
  width: 100%;
  height: 300px;
}
.newjion {
  width: 100%;
  box-sizing: border-box;
  padding: 2%;
}
.newjion_text {
  width: 100%;
  text-align: center;
  position: relative;
  top: -6%;
  color: #cce6ff;
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