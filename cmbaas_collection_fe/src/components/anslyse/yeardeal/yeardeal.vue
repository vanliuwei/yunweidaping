<template>
  <div>
    <div class="analyseCon_left_top_title">
      <!-- 标题 -->
      <div class="analyseCon_left_top_img">
        <div>
          <p>年度累计总交易量</p>
        </div>
        <div class="analyseCon_left_top_right">
          <span>展示条数</span> &nbsp;&nbsp;
          <InputNumber :max="30" :min="1" v-model="total" style="width:50px"></InputNumber>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Select v-model="totalvalue" style="width:50px" class="com_select " @on-change='totalFun' :label-in-value="true">
            <Option v-for="item in total_sele" :value="item.value" :key="item.value">{{ item.label}}</Option>
          </Select>
        </div>

      </div>
      <div class="year">
        <div>
          <p class="year_num">42亿</p>
          <p>近期七天目标</p>
        </div>
        <div>
          <p class="year_num">40亿</p>
          <p>已完成</p>
        </div>
        <div>
          <p class="year_num">2亿</p>
          <p>未完成</p>
        </div>
      </div>
      <div id="yearech">

      </div>
    </div>

  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts/map/js/china.js";
import { getYeard } from '@/api/data';
export default {
  name: 'yeardeal',

  data () {
    return {
      total: 8,
      totalvalue: 'day',
      capaX: [],
      capaY: [],
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



  methods: {
    totalFun (e) {
      this.totalvalue = e.value
      this.dayWeek = e.label
    },
    // 新接入业务交易量
    yearDeal () {
      let yearech = echarts.init(document.getElementById("yearech"));
      let optionnew = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '15%'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
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
            data: this.capaY,
            type: 'line',
            symbol: 'none',
            itemStyle: {
              color: '#1B649E'
            },
            areaStyle: { //区域填充样式
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgba(2,194,255,1)' }, //上边区域
                  { offset: 0.7, color: 'rgba(2,194,255,0.6)' } //下边的区域
                ], false)
              }
            },
          }
        ]
      };

      yearech.setOption(optionnew);

    },
  },
  mounted () {
    // this.yearDeal() // 新接入业务交易量
  },
  computed: {
    changeData () {
      const { total, totalvalue } = this
      return {
        total,
        totalvalue,

      }
    }
  },
  watch: {
    'changeData': {
      handler (value) {
        getYeard(value.totalvalue, value.total).then(res => {
          this.capaX = Object.keys(res.data)
          this.capaY = Object.values(res.data)
          this.yearDeal()
        })

      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
#yearech {
  width: 92%;
  height: 300px;
  position: absolute;
  top: 13%;
}
.analyseCon_left_top_title {
  position: relative;
  width: 100%;
  height: 345px;
  box-sizing: border-box;
  padding: 3%;
  .analyseCon_left_top_img {
    position: relative;
    top: -3%;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    color: #cce6ff;
    font-weight: 600;
    .analyseCon_left_top_right {
      display: flex;
    }
  }
  .year {
    width: 70%;
    margin: auto;
    justify-content: space-evenly;
    display: flex;
    position: relative;
    top: -10%;
    div {
      box-sizing: border-box;
      padding-top: 3%;
      width: 20%;
      height: 80px;
      background: url("../../../assets/target.png");
      background-size: 100% 100%;
      p {
        text-align: center;
        color: #cce6ff;
      }
      .year_num {
        font-size: 1.5rem;
      }
    }
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
    height: 30px;

    border-color: #15477a;
  }
  /deep/.ivu-select-selected-value {
    height: 30px;

    height: 30px;
  }
  /deep/.ivu-select-placeholder {
    height: 30px;

    height: 30px;
  }
}
/deep/.ivu-input-number-default {
  background-color: transparent !important;
  border-color: #15477a;
  color: #cce6ff;
}
/deep/.ivu-input-number-input {
  background-color: transparent !important;
  border-color: #15477a;
  color: #cce6ff;
}
</style>