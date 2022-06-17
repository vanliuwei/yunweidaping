<template>
  <div>
    <div id="main">
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts/map/js/china.js";
import { getMap } from '@/api/data';
import { geoCoordMap } from './geo';
import { EleResize } from '../../../assets/js/esresize.js'
const dealWithData = () => {
  let mapData = [];
  for (var key in geoCoordMap) {
    mapData.push({ name: key, value: geoCoordMap[key] });
  }
  return mapData
}

export default {
  name: 'anslysemap',

  data () {
    return {
      mapDataV: dealWithData(),// 地图数据
      mapData: []
    };
  },
  methods: {
    buildMap () {
      this.myChart = echarts.init(document.getElementById('main'));
      let option1 = {
        tooltip: {
          formatter: function (params) {
            if (!params.value) {
              return params.seriesName + '<br />' + params.name + '：' + 0
            } else {
              return params.seriesName + '<br />' + params.name + '：' + params.value
            }

          }//数据格式化
        },
        // visualMap: {
        //   min: 0,
        //   max: 1500,
        //   left: 'left',
        //   top: 'bottom',
        //   text: ['高', '低'],//取值范围的文字
        //   inRange: {
        //     color: '#123576'//取值范围的颜色
        //   },
        //   show: false//图注
        // },
        geo: {
          map: 'china',
          // roam: true,//不开启缩放和平移
          zoom: 1.25,//视角缩放比例
          label: {
            normal: {
              show: true,
              // fontSize: '12',//注意：地图省份名字字体如果过大会导致字体重叠
              color: '#ffffff'
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            // 节点color
            color: '#123576',
            // borderColor: '#2FB4FC',//波纹颜色
            // borderWidth: 1,
            // shadowSpread: 3,
            shadowBlur: 1,
            shadowColor: '#ccc',
            rippleEffect: {
              // 涟漪特效
              period: 1, // 特效动画时长
              scale: 4, // 波纹的最大缩放比例
              brushType: 'stroke' // 波纹的绘制方式：stroke | fill

            },
            emphasis: {
              show: true,
              color: '#ccc',//鼠标移入背景颜色
              borderColor: '#19C3A0' //鼠标移入波纹颜色
            }
          },

        },
        series: [
          {
            name: '交易量',
            type: 'map',
            geoIndex: 0,
            data: this.mapData,
          },
          {
            type: 'scatter',
            symbolSize: 5,

            itemStyle: {
              color: 'red'
            },
            coordinateSystem: 'geo',
          }

        ]
      };
      this.myChart.setOption(option1);
      this.myChart.on("mouseover", () => {
        this.myChart.dispatchAction({
          type: "downplay",
        });
      });

    },
    getVolume () {
      getMap().then(res => {
        res.data.map(item => this.mapData.push({ name: item.province, value: item.transaction }))
        this.buildMap()
      })
    },
  },

  mounted () {
    this.$nextTick(function () {
      this.getVolume()
    });

  },


};
</script>

<style lang="less" scoped>
#main {
  width: 100%;
  height: 600px;
  border: none;
  position: relative;
  top: -3%;
  left: -5%;
}
</style>