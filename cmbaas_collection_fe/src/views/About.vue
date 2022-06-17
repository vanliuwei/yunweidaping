<template>
  <div>
    <div id="main">
    </div>

  </div>

</template>
<script>
import echarts from 'echarts'
import 'echarts/map/js/province/anhui.js'; //引入安徽地图
import 'echarts/map/js/province/aomen.js'; //引入澳门地图
import 'echarts/map/js/province/beijing.js'; //引入北京地图
import 'echarts/map/js/province/chongqing.js'; //引入重庆地图
import 'echarts/map/js/province/fujian.js'; //引入福建地图
import 'echarts/map/js/province/guangdong.js'; //引入广东地图
import 'echarts/map/js/province/gansu.js'; //引入甘肃地图
import 'echarts/map/js/province/guangxi.js'; //引入广西地图
import 'echarts/map/js/province/guizhou.js'; //引入贵州地图
import 'echarts/map/js/province/hainan.js'; //引入海南地图
import 'echarts/map/js/province/hebei.js'; //引入河北地图
import 'echarts/map/js/province/heilongjiang.js'; //引入黑龙江地图
import 'echarts/map/js/province/henan.js'; //引入河南地图
import 'echarts/map/js/province/hubei.js'; //引入湖北地图
import 'echarts/map/js/province/hunan.js'; //引入湖南地图
import 'echarts/map/js/province/jiangsu.js'; //引入江苏地图
import 'echarts/map/js/province/jilin.js'; //引入广东地图
import 'echarts/map/js/province/liaoning.js'; //引入辽宁地图
import 'echarts/map/js/province/neimenggu.js'; //引入内蒙古地图
import 'echarts/map/js/province/ningxia.js'; //引入宁夏地图
import 'echarts/map/js/province/qinghai.js'; //引入青海地图
import 'echarts/map/js/province/shandong.js'; //引入山东地图
import 'echarts/map/js/province/shanxi.js'; //引入山西地图
import 'echarts/map/js/province/sichuan.js'; //引入四川地图
import 'echarts/map/js/province/taiwan.js'; //引入台湾地图
import 'echarts/map/js/province/tianjin.js'; //引入广东地图
import 'echarts/map/js/province/xianggang.js'; //引入香港地图
import 'echarts/map/js/province/xinjiang.js'; //引入新疆地图
import 'echarts/map/js/province/xizang.js'; //引入西藏地图
import 'echarts/map/js/province/yunnan.js'; //引入云南地图
import 'echarts/map/js/province/zhejiang.js'; //引入浙江地图
export default {
  name: "mapname",
  data () {
    return {
      dataList: [

        { name: '广东', value: 11346 },

      ]
    }
  },
  methods: {
    buildMap () {
      this.myChart = echarts.init(document.getElementById('main'));
      let option1 = {
        series: [
          {
            type: 'map',
            mapType: '浙江',

          },
        ]
      };
      this.myChart.setOption(option1);
      this.myChart.on("mouseover", () => {
        this.myChart.dispatchAction({
          type: "downplay",
        });
      });
    }


  },
  mounted () {
    this.buildMap();
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