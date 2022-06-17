<template>
  <div>
    <div id="main">
    </div>
    <div id="oneDay">

    </div>
  </div>

</template>
<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js'
export default {
  name: "mapname",
  data () {
    return {
      dataList: [
        { name: '南海诸岛', value: 0 },
        { name: '北京', value: 2170.7 },
        { name: '天津', value: 1559.6 },
        { name: '上海', value: 2423.78 },
        { name: '重庆', value: 3048.43 },
        { name: '河北', value: 7556.3 },
        { name: '河南', value: 9605 },
        { name: '云南', value: 4800.5 },
        { name: '辽宁', value: 4359.3 },
        { name: '黑龙江', value: 3788.7 },
        { name: '湖南', value: 6860.2 },
        { name: '安徽', value: 6323.6 },
        { name: '山东', value: 10047.2 },
        { name: '新疆', value: 2444.67 },
        { name: '江苏', value: 8029.3 },
        { name: '浙江', value: 5737 },
        { name: '江西', value: 4622.1 },
        { name: '湖北', value: 5917 },
        { name: '广西', value: 4885 },
        { name: '甘肃', value: 2625.71 },
        { name: '山西', value: 3702.35 },
        { name: '内蒙古', value: 2534 },
        { name: '陕西', value: 3835.44 },
        { name: '吉林', value: 2717.43 },
        { name: '福建', value: 3941 },
        { name: '贵州', value: 3580 },
        { name: '广东', value: 11346 },
        { name: '青海', value: 3983.8 },
        { name: '西藏', value: 3371.5 },
        { name: '四川', value: 8341 },
        { name: '宁夏', value: 681.79 },
        { name: '海南', value: 925.76 },
        { name: '台湾', value: 2369 },
        { name: '香港', value: 748.25 },
        { name: '澳门', value: 63.2 }
      ]
    }
  },
  methods: {

    buildMap () {
      this.myChart = echarts.init(document.getElementById('main'));
      let option1 = {
        tooltip: {
          formatter: function (params) {
            return params.seriesName + '<br />' + params.name + '：' + params.value
          }//数据格式化
        },
        visualMap: {
          min: 0,
          max: 1500,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],//取值范围的文字
          inRange: {
            color: ['#044962', '#123576']//取值范围的颜色
          },
          show: true//图注
        },
        geo: {
          map: 'china',
          roam: true,//不开启缩放和平移
          zoom: 1.23,//视角缩放比例
          label: {
            normal: {
              show: true,
              fontSize: '10',//注意：地图省份名字字体如果过大会导致字体重叠
              color: '#98B3D7'
            },
            emphasis: {
              show: true
            }
          },

          itemStyle: {
            // 节点color
            normal: {
              color: '#fff',
              borderColor: '#2FB4FC',//波纹颜色
              borderWidth: 1,
              shadowSpread: 3,
              shadowBlur: 2,
              shadowColor: '#eee',
              rippleEffect: {
                // 涟漪特效
                period: 1, // 特效动画时长
                scale: 4, // 波纹的最大缩放比例
                brushType: 'stroke' // 波纹的绘制方式：stroke | fill
              }
            },
            emphasis: {
              show: false,
              color: '#ccc',//鼠标移入背景颜色
              borderColor: '#19C3A0' //鼠标移入波纹颜色
            }
          },

        },
        series: [
          {
            name: '信息量',
            type: 'map',
            coordinateSystem: 'geo',
            geoIndex: 0,
            data: this.dataList,

          },
        ]
      };
      this.myChart.setOption(option1);

      this.myChart.on('click', function (params) {
        console.log(params);
      });
      // this.myChart.dispatchAction({
      //     type: "highlight",
      //     seriesIndex: 0, // 显示第几个series
      //     dataIndex: this.index // 显示第几个数据
      //   });
      let hourIndex = 0;
      let fhourTime = null;
      fhourTime = setInterval(() => {
        this.myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,

        });
        this.myChart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: hourIndex
        });
        this.myChart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: hourIndex
        });
        hourIndex++;
        if (hourIndex > this.dataList.length) {
          hourIndex = 0;
        }
      }, 3000);
      //鼠标移入停止轮播
      this.myChart.on("mousemove", (e) => {
        clearInterval(fhourTime)
        this.myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
        });
        this.myChart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: e.dataIndex
        });
        this.myChart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: e.dataIndex
        });
      })
      //鼠标移出恢复轮播
      this.myChart.on("mouseout", () => {
        fhourTime = setInterval(() => {
          this.myChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0,

          });
          this.myChart.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: hourIndex
          });
          this.myChart.dispatchAction({
            type: "showTip",
            seriesIndex: 0,
            dataIndex: hourIndex
          });
          hourIndex++;
          if (hourIndex > this.dataList.length) {
            hourIndex = 0;
          }
        }, 3000);
      })
    },

    a () {
      let myChart = echarts.init(document.getElementById('oneDay'));
      let allXdata = ['', 1, 2, 3, 4, 5, 6];
      let lineRes = ['', 2, 2, 3, 4, 3, 3];
      let dayOption = getOption(allXdata, lineRes);
      myChart.setOption(dayOption);
      function getOption (allXdata, lineRes) {
        return {
          animation: false, //控制当前的点击滑动时节点是否放大
          title: {
            text: '2018-10-16',
            padding: 20,
            textStyle: {
              fontSize: 14,
              fontWeight: 500
            }
          },
          tooltip: { // 可以自定义点击时出现的提示框,你可以尝试打印params
            show: true,
            // formatter: function (params) {
            //     console.log(params);
            // }
          },
          legend: {

          },
          grid: {
            left: '4%', //设置Y轴name距离左边容器的位置,类似于margin-left
            right: '4%',
            bottom: '2%',
            containLabel: true
          },
          dataZoom: [
            { //Y轴固定,让内容滚动
              type: 'slider',
              show: false,
              xAxisIndex: [0],
              start: 1,
              end: 80,//设置X轴刻度之间的间隔(根据数据量来调整)
              zoomLock: true, //锁定区域禁止缩放(鼠标滚动会缩放,所以禁止)
            },
            {
              type: 'inside',
              xAxisIndex: [0],
              start: 1,
              end: 80,
              zoomLock: true, //锁定区域禁止缩放
            },

          ],
          xAxis: [{
            data: allXdata, //X轴数据(该数组的第一个数据为'' 可以让原点数据为0)
            boundaryGap: false, //两边是否留白
            axisLabel: {
              interval: 0, //隔多少点显示一个X轴刻度,0就是全部显示
              formatter: function (value, index) {//自定义X轴的显示
                var date = new Date(value);
                var texts = date.getMonth() + 1 + "月";
                if (index === 0) {
                  texts = 0;
                }
                return texts;
              }
            },
            axisTick: {
              inside: true,
              lignWithLabel: true //这两行代码可以让刻度正对刻度名
            },
            // axisLine: {
            //     symbol: ['none', 'arrow'], //显示坐标轴上的箭头
            //     symbolSize: [8, 10], //调整坐标箭头的大小
            //     symbolOffset: [5, 8], //箭头的偏移位置
            //     onZero: false
            // },
            axisPointer: {
              lineStyle: {
                width: 0 //隐藏指示线的线条
              },
              show: true,
              snap: true,
              status: 'show'
            }
          }],
          yAxis: {
            name: '', //Y轴名字
            nameGap: 20, //刻度与Y轴线名字之间的距离
            nameTextStyle: { //Y轴名字的样式
              color: '#000',
              fontSize: 14
            },
            // min: minax2.min, //设置Y轴的最大最小值
            // max: minax2.max,
            splitLine: {
              show: false
            }, //去掉网格线
            // axisLine: {
            //     symbol: ['none', 'arrow'], //是否显示箭头
            //     symbolSize: [8, 10], //调整坐标箭头的大小
            //     symbolOffset: [5, 7] //调整箭头的偏移位置
            // },
            axisTick: {
              // show:true,//是否显示Y轴的刻度
              inside: false //改变刻度的朝向
            }
          },
          series: [{
            data: lineRes,
            type: 'line',
            symbol: 'circle', //折线拐点去掉圆点
            symbolSize: 1,
            itemStyle: {
              normal: {
                color: '#000', //自定义折线点颜色
                lineStyle: {
                  color: '#000'//自定义折线的颜色
                }
              }
            },
            smooth: true //折线变曲线
          },

          ]
        }
      }

    }

  },
  mounted () {
    this.buildMap();
    this.a()
  }
}
</script>
 
<style scoped>
* {
  margin: 0;
  padding: 0;
}
html,
body {
  width: 100%;
  height: 100%;
}
#main {
  width: 600px;
  height: 450px;
  margin: 150px auto;
  border: none;
}
#oneDay {
  width: 600px;
  height: 450px;
  margin: 150px auto;
  border: none;
}
</style>