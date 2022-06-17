<template>
  <div>
    <div class="body">
      <div class="title"></div>
      <div class="content">
        <!-- left -->
        <div>
          <!-- 节点数据监控 -->
          <NodeData />
          <!-- <div class="tps node">
            <div class="head1">
              <div class="head_left">
                <span></span>
                <div class="left_txt">节点数据监控</div>
              </div>
              <div class="head_right">
                <a @click="nodeTab" :class="node == 1 ? 'active' : ''">网络监控节点</a>
                <a @click="nodeTab1" :class="node == 2 ? 'active' : ''">存储服务</a>
              </div>
            </div>
            <div v-show="node === 1"></div>
            <div v-show="node === 2">
              <div class="nodeContent">
                <div class="nodeBox">
                  <p>231,423</p>
                  <p>全部可用性节点</p>
                </div>
                <div class="nodeBox">
                  <p>231,423</p>
                  <p>全部共识节点</p>
                </div>
              </div>
              <div class="nodeBot">
                <ul>
                  <li>故障节点数目：10个</li>
                  <li>故障共识节点数目：10个</li>
                  <li>故障节点占比：10%</li>
                  <li>故障共识节点占比：10%</li>
                </ul>
              </div>
            </div>
          </div> -->
          <!-- 峰值监控 -->
          <div class="tps node1">
            <div class="head1">
              <div class="head_left">
                <span></span>
                <div class="left_txt">峰值监控</div>
              </div>
              <div class="head_right">
                <a @click="tab" :class="tps == 1 ? 'active' : ''">TPS使用情况</a>
                <a @click="tab1" :class="tps == 2 ? 'active' : ''">TPS实时情况</a>
              </div>
            </div>
            <div v-show="tps === 2">
              <div class="peakTop">
                <div>TPS数量</div>
                <div class="peakTopR">
                  <div>
                    <p>历史峰值</p>
                    <p class="color">{{hisPeak.resultValue}}</p>
                  </div>
                  <div>
                    <p>峰值区块编号</p>
                    <p class="color">{{hisPeak.blockNum}}</p>
                  </div>
                  <div>
                    <p>历史峰值时间</p>
                    <p class="color">9:00</p>
                  </div>
                </div>
              </div>

              <div id="peak">11111</div>
            </div>
            <div v-show="tps === 1"></div>
          </div>
          <!-- 性能监控 -->
          <div class="tps performance">
            <div class="head">
              <div class="head_left">
                <span></span>
                <div class="left_txt">性能监控</div>

              </div>
              <div class="head_right">
                <div class="head_right_text">
                  节点名称
                  <Select v-model="model1" style="width:140px" class="com_select">
                    <Option v-for="item in cityList" :value="item" :key="item">{{ item}}</Option>
                  </Select>
                </div>

              </div>
            </div>
            <!--  -->
            <div class="state">
              <ul>
                <li> <span></span> CPU</li>
                <li><span></span>磁盘</li>
                <li><span></span>内存</li>
              </ul>
            </div>
            <div id="line"> </div>
          </div>
        </div>
        <!-- 中间 -->
        <div class="map_main">
          <!-- 地图 -->
          <div id="main">
          </div>
          <!--  -->
          <div class="tps main_table">
            <div class="head">
              <div class="head_left">
                <div class="left_txt"> 当前地点：江西 &nbsp;&nbsp;&nbsp;&nbsp; 节点数目：4个</div>
              </div>
            </div>
            <div class="">
              <Table height="290" :columns="nodeTpTitle" :data="nodeTpData" class="com_table">
                <template slot-scope="{ row }" slot="ip">
                  <p class="flex">
                    <span class="com_circle" :style="{backgroundColor:ralte[row.status]}"></span>
                    <span>{{ row.ip }}</span>
                  </p>
                </template>
              </Table>
            </div>
          </div>
        </div>
        <!-- 右边 -->
        <div>
          <!-- 业务平台智能合约 -->
          <div class="tps business">
            <div class="head">
              <div class="head_left">
                <span></span>
                <div class="left_txt">业务平台智能合约</div>

              </div>
              <div class="head_right">
                <div class="head_right_text">
                  智能合约名称
                  <Select v-model="model1" style="width:140px" class="com_select">
                    <Option v-for="item in contract" :value="item" :key="item">{{ item }}</Option>
                  </Select>
                </div>
              </div>
            </div>
            <!--  -->
            <div class="state">
              <ul>
                <li> <span></span> CPU使用状况</li>
                <li><span></span>Net使用状况</li>
                <li><span></span>内存使用状况</li>
              </ul>
              <ul class="state_sj">
                <li>30%</li>
                <li>30%</li>
                <li>30%</li>
              </ul>
            </div>
            <div id="contract"> </div>
          </div>

          <!-- 存储节点状态 -->
          <div class="tps storage">
            <div class="head">
              <div class="head_left">
                <span></span>
                <div class="left_txt">存储节点状态</div>
              </div>
            </div>
            <div class="">
              <Table height="200" :columns="columns1" :data="data2" class="com_table"></Table>
            </div>
          </div>

          <!-- 告警信息 -->
          <div class="tps info">
            <div class="head">
              <div class="head_left">
                <span></span>
                <div class="left_txt">告警信息</div>
              </div>
            </div>
            <div class="">
              <Table :columns="columns2" :data="data2" class="com_table"></Table>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import "echarts/map/js/china.js";
import { getHome, getPeak, getPerforCpu, getPerforDisk, getPerforMemory, getContract, getContractValue, getNodeIp, getHis } from '@/api/data';
import { geoCoordMap } from './geo';
import NodeData from '../components/nodedata';
let ralte = {
  "正常": "blue",
  "不可用": "red"
}
const dealWithData = () => {
  let mapData = [];
  for (var key in geoCoordMap) {
    mapData.push({ name: key, value: geoCoordMap[key] });
  }
  return mapData
}
export default {
  name: "analyse",
  components: {
    NodeData
  },
  data () {
    return {
      ralte: Object.freeze(ralte),
      tps: 2,
      node: 2,
      myChart: {},// 地图
      mapDataV: dealWithData(),// 地图数据
      malMap: '', //故障节点
      dataControl: {},//节点监控
      index: 1,
      timeValue: [],// 峰值监控值
      timeKey: [],// 峰值监控Y轴
      perfor: {
        cpuX: '', // 性能cpu
        cpuY: '', //
        diskY: '', // 磁盘
        memory: '' // 内存
      },
      hisPeak: {
      },
      // 智能合约
      smart: {
        cpuX: '', // 性能cpu
        cpuY: '', //
        netY: '', // 磁盘
        memory: '' // 内存
      },
      cityList: [
        "prod.b",
        "prod.a"
      ],
      contract: [],
      // 下拉框的值
      model: '',
      model1: 'prod.a',
      // 存储节点状态表头
      columns1: [
        {
          title: 'IP',
          key: 'name'
        },
        {
          title: '状态',
          key: 'state'
        },
        {
          title: '节点可用性',
          key: 'address'
        }
      ],
      // 节点ip表头
      nodeTpTitle: [
        {
          title: 'IP',
          slot: 'ip'
        },
        {
          title: '节点状态',
          key: 'status'
        },
        {
          title: '节点类型',
          key: 'nodeType'
        },
        {
          title: '区块高度',
          key: 'blockNum'
        }
      ],
      // 节点ip表格数据
      nodeTpData: [
      ],
      columns2: [
        {
          title: '节点IP',
          key: 'name'
        },
        {
          title: '告警时间',
          key: 'state'
        },
        {
          title: '告警级别',
          key: 'address'
        },
        {
          title: '告警信息',
          key: 'address'
        }
      ],
      // 存储节点状态表格数据
      data2: [
        {
          name: '129.69.64.13',
          state: '正常',
          address: '可用',
        },
        {
          name: '129.69.64.13',
          state: '异常',
          address: '不可用',
        }, {
          name: '129.69.64.13',
          state: '正常',
          address: '可用',
        }, {
          name: '129.69.64.13',
          state: '正常',
          address: '可用',
        },
      ]
    };
  },
  methods: {
    // 性能折线
    broken () {
      let myLine = echarts.init(document.getElementById("line"));
      let option4 = {
        animation: false,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        grid: {
          width: 400,
          height: 170,
          // borderWidth:1
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
        xAxis: {
          type: "category",
          data: this.perfor.cpuX,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: "14",
            },
          },
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "#fff", // 颜色
            },
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false, // y轴线的显示和隐藏
            lineStyle: {
              color: "#fff", // 颜色
              // width: 3,
            },
            // symbol: ["none", "arrow"],
          },
        },
        series: [
          {
            type: "line",
            symbol: 'circle',

            data: this.perfor.memory,
            areaStyle: {
              // color: "#16443D",
            },
            boundaryGap: false,
            itemStyle: {
              normal: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#0498E1", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#0497e123", // 100% 处的颜色
                  },
                ]), //背景渐变色
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 1,
                  type: "solid",
                  color: "#0498E1", //折线的颜色
                },
              },
            },
          },
          {
            type: "line",
            symbol: 'circle',

            data: this.perfor.diskY,
            areaStyle: {
              // color: "blue",
            },
            boundaryGap: false,
            itemStyle: {
              normal: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#E93CA7", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#ffccff60", // 100% 处的颜色
                  },
                ]), //背景渐变色
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 1,
                  type: "solid",
                  color: "#E93CA7", //折线的颜色
                },
              },
            },
          },
          {
            symbol: 'circle',
            type: "line",
            data: this.perfor.cpuY,
            areaStyle: {
              // color: "blue",
            },
            boundaryGap: false,
            itemStyle: {
              normal: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#F0C35F", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#f0c25f3a", // 100% 处的颜色
                  },
                ]), //背景渐变色
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 1,
                  type: "solid",
                  color: "#F0C35F", //折线的颜色
                },
              },
            },
          },
        ],
      };
      myLine.setOption(option4);
    },
    // 峰值折线
    broken2 () {
      let myPeak = echarts.init(document.getElementById("peak"));
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        grid: {
          width: 400,
          height: 160,
          // borderWidth:1
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
        xAxis: {
          type: "category",
          data: this.timeKey,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: "14",
            },
          },
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "#fff", // 颜色
            },
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false, // y轴线的显示和隐藏
            lineStyle: {
              color: "#fff", // 颜色
              // width: 3,
            },
            // symbol: ["none", "arrow"],
          },
        },
        series: [
          {
            type: "line",
            data: this.timeValue,
            areaStyle: {
              // color: "#16443D",
            },
            boundaryGap: false,
            itemStyle: {
              normal: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#0498E1", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#0497e123", // 100% 处的颜色
                  },
                ]), //背景渐变色
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 1,
                  type: "solid",
                  color: "#0498E1", //折线的颜色
                },
              },
            },
          },
        ],
      };
      myPeak.setOption(option);
    },
    // 折线
    broken3 () {
      let myLine = echarts.init(document.getElementById("contract"));
      let option2 = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        grid: {
          width: 480,
          height: 170,
          // borderWidth:1
        },
        xAxis: {
          type: "category",
          data: this.smart.cpuX,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: "14",
            },
          },
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "#fff", // 颜色
            },
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false, // y轴线的显示和隐藏
            lineStyle: {
              color: "#fff", // 颜色
              // width: 3,
            },
            // symbol: ["none", "arrow"],
          },
        },
        series: [
          {
            type: "line",
            data: this.smart.memory,
            areaStyle: {
              // color: "#16443D",
            },
            boundaryGap: false,
            itemStyle: {
              normal: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#0498E1", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#0497e123", // 100% 处的颜色
                  },
                ]), //背景渐变色
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 1,
                  type: "solid",
                  color: "#0498E1", //折线的颜色
                },
              },
            },
          },
          {
            type: "line",
            data: this.smart.netY,
            areaStyle: {
              // color: "blue",
            },
            boundaryGap: false,
            itemStyle: {
              normal: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#E93CA7", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#ffccff60", // 100% 处的颜色
                  },
                ]), //背景渐变色
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 1,
                  type: "solid",
                  color: "#E93CA7", //折线的颜色
                },
              },
            },
          },
          {
            type: "line",
            data: this.smart.cpuY,
            areaStyle: {
              // color: "blue",
            },
            boundaryGap: false,
            itemStyle: {
              normal: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#F0C35F", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#f0c25f3a", // 100% 处的颜色
                  },
                ]), //背景渐变色
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 1,
                  type: "solid",
                  color: "#F0C35F", //折线的颜色
                },
              },
            },
          },
        ],
      };
      myLine.setOption(option2);
    },
    // 地图
    buildMap () {
      this.myChart = echarts.init(document.getElementById('main'));
      let option1 = {
        tooltip: {
          trigger: 'item'
        },
        // tooltip: {
        //   formatter: function (params) {
        //     return params.seriesName + '<br />' + params.name + '：' + params.value
        //   }//数据格式化
        // },
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
              fontSize: '10',//注意：地图省份名字字体如果过大会导致字体重叠
              color: '#98B3D7'
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            // 节点color
            color: '#123576',
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
            name: '信息量',
            type: 'map',
            geoIndex: 0,
            data: this.mapDataV,
          },
          {
            type: 'scatter',
            symbolSize: 5,

            itemStyle: {
              color: 'red'
            },
            coordinateSystem: 'geo',
            data: [
              { blockNum: '0', status: 'ERROR', ip: 'http://10.0.42.61', nodeAddress: '乌鲁木齐', nodeType: 'normal', value: [116.413554, 39.911013] },
              { blockNum: '0', status: 'ERROR', ip: 'http://10.0.42.61', nodeAddress: '乌鲁木齐', nodeType: 'normal', value: [87.623314, 43.832806] }
            ]
          }
          // {
          //   coordinateSystem: 'geo',
          //   type: 'effectScatter',
          //   data: [this.dataList[6]],
          // }

        ]
      };
      this.myChart.setOption(option1);
      this.myChart.on("mouseover", () => {
        this.myChart.dispatchAction({
          type: "downplay",
        });
      });
      // this.myChart.dispatchAction({
      //     type: "highlight",
      //     seriesIndex: 0, // 显示第几个series
      //     dataIndex: this.index // 显示第几个数据
      //   });
    },
    tab () {
      this.tps = 1;
    },
    tab1 () {
      this.tps = 2;
    },
    nodeTab () {
      this.node = 1;
    },

    getNode () {
      getHome().then(res => {
        if (res.status == 200) {
          this.dataControl = res.data
        } else {
          alert('请求失败')
        }
      }).catch(err => {
        console.log(err);
      })
      // 峰值监控
      getPeak().then(res => {
        console.log(res);
        if (res.status == 200) {
          this.timeValue = Object.values(res.data)
          this.timeKey = Object.keys(res.data)

          this.broken2()

        } else {
          alert('请求失败')
        }
      }).catch(err => {
        console.log(err);
      })
      // 性能监控cpu
      getPerforCpu().then(res => {
        if (res.status == 200) {
          this.perfor.cpuX = Object.keys(res.data)
          this.perfor.cpuY = Object.values(res.data)
          this.broken();
        }
      }).catch(err => {
        console.log(err);
      })
      // 磁盘
      getPerforDisk().then(res => {
        if (res.status == 200) {
          this.perfor.diskY = Object.values(res.data)
          this.broken();
        }
      }).catch(err => {
        console.log(err);
      })
      // 内存getPerforMemory
      getPerforMemory().then(res => {
        if (res.status == 200) {
          this.perfor.memory = Object.values(res.data)
          this.broken();
        }
      }).catch(err => {
        console.log(err);
      })
      // 智能合约下拉
      getContract().then(res => {
        if (res.status == 200) {
          this.contract = res.data,
            this.model = res.data[1]
        }
      }).catch(err => {
        console.log(err);
      })
      // 节点ip表格
      getNodeIp().then(res => {
        console.log(res);
        if (res.status == 200) {
          let dataRed = res.data.filter(item => item.status == 'ERROR')
          this.mapDataV[dataRed]
          let security = {
            'ERROR': '不可用',
            'OK': '正常'
          }
          let datas = res.data.map((item) => {
            return {
              ...item,
              status: security[item.status]
            }
          })
          dataRed.map(item => {
            switch (item.nodeAddress) {
              case "huhehaote":
                item.nodeAddress = "呼和浩特";
                break;
              case "wulumuqi":
                item.nodeAddress = "乌鲁木齐";
                break;
            }
          })
          // this.malMap = dataRed.nodeAddress
          console.log(dataRed);
          let a = dataRed.map(item1 => {
            let { nodeAddress, ...item } = item1
            return nodeAddress
          })
          console.log(a);
          this.nodeTpData = datas
        }
      }).catch(err => {
        console.log(err);
      })
      getHis().then(res => {
        if (res.status == 200) {
          this.hisPeak = res.data
          console.log(this.hisPeak);
        }
      })
    },
    nodeTab1 () {
      this.node = 2;
    },
    // 请求
    // nodeGet () {
    //   getRoleparentList({ a: 1 }).then(res => {
    //     console.log(res);
    //   })
    // }
    // 地图数据


  },
  mounted () {
    // this.broken(); // 峰值监控
    // this.broken2(); //性能监控
    this.buildMap()
    this.getNode()
    // this.broken3();
    // this.timer = setInterval(() => {
    //   this.getNode()
    // }, 5000);
  },
  beforeDestroy () {
    clearInterval(this.timer);
  },
  watch: {
    'model1': {
      immediate: true,
      handler (value) {
        if (value == 'prod.a') {
          getContractValue('prod.a').then(res => {
            this.smart.cpuX = Object.keys(res.data.cpu)
            this.smart.cpuY = Object.values(res.data.cpu)
            this.smart.netY = Object.values(res.data.net)
            this.smart.memory = Object.values(res.data.ram)
            this.broken3();
          })
        } else {
          getContractValue(value).then(res => {
            console.log(res);
          })
        }


      }
    }
  }
};
</script>


<style  lang='less' scoped>
html,
body {
  width: 100%;
  height: 100%;
}
.body {
  background: url("../assets/background.png");
  background-size: 100% 100%;
  // display: flex;
  .title {
    height: 78px;
    width: 100%;
    background: url("../assets/title.png");
    background-size: 100% 100%;
  }
  .content {
    padding: 0 28px 50px 28px;
    display: flex;
    // 公用的框
    .tps {
      position: relative;
      width: 470px;
      height: 350px;
      box-sizing: border-box;
      border: 1px solid #116987;
      color: #ffccff60;
      box-sizing: border-box;
      margin-top: 6%;
      border: 2px solid #116987;
      border-image: -webkit-linear-gradient(#1b6199, #1b6199) 20 20;
      // border-image: -moz-linear-gradient(#1B6199, #1B6199) 20 20;
      // border-image: -o-linear-gradient(#1B6199, #1B6199) 20 20;
      border-image: linear-gradient(#05062a, #1b6199) 20 20 20 20;
      // box-shadow: inset 0px 1px 35px 0px rgba(75, 137, 255, 0.5);
      background: linear-gradient(to left, #37f4f5, #37f4f5) left bottom
          no-repeat,
        linear-gradient(to bottom, #37f4f5, #37f4f5) left bottom no-repeat,
        linear-gradient(to left, #37f4f5, #37f4f5) right bottom no-repeat,
        linear-gradient(to left, #37f4f5, #37f4f5) right bottom no-repeat;
      background-size: 1px 28px, 21px 1px;

      .head {
        height: 16%;
        position: relative;
        z-index: 20;
        display: flex;
        justify-content: space-between;
        flex-flow: row nowrap;
        align-items: center;
        // margin: calc((100vw / 1920) * 25.39) 0 0 calc((100vw / 1920) * 23.03);
        margin: 0 0 0 calc((100vw / 1920) * 20);
        .head_left {
          display: flex;

          .left_txt {
            // width: 200px;
            color: #fff;
          }
        }
        .head_right {
          margin-right: 3%;
          display: flex;
          width: 60%;
          // width: 40%;
          .active {
            background: #304c66;
            border: 2px solid #248d9a;
          }
          a {
            padding: 1% 5%;
            border: 2px solid #0f455d;
            color: #fff;
          }
          // 右边字的颜色
          .head_right_text {
            color: white;
          }
        }
        span {
          display: inline-block;
          margin-right: calc((100vw / 1920) * 7);
          width: calc((100vw / 1920) * 2);
          height: calc((100vw / 1920) * 17);
          background-image: linear-gradient(180deg, #32eafe 0%, #0293e1 100%);
        }
      }

      .nodeContent {
        display: flex;
        justify-content: space-around;
        margin-bottom: 5%;
        .nodeBox {
          color: #fff;
        }
      }
      .nodeBot {
        ul {
          list-style: none;
          display: flex;
          color: #fff;
          flex-wrap: wrap;
          li {
            margin: 1% 0;
            width: 45%;
          }
        }
      }

      .peakTop {
        color: #fff;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 3%;

        .peakTopR {
          width: 80%;
          display: flex;
          justify-content: space-evenly;
          .color {
            color: red;
          }
        }
      }
    }
    // 节点数据监控
    .node {
      //  width: 500px;
      height: 220px;
      .head1 {
        height: 16%;
        position: relative;
        z-index: 20;
        display: flex;
        justify-content: space-between;
        flex-flow: row nowrap;
        align-items: center;
        // margin: calc((100vw / 1920) * 25.39) 0 0 calc((100vw / 1920) * 23.03);
        margin: 0 0 0 calc((100vw / 1920) * 20);
        .head_left {
          display: flex;

          .left_txt {
            // width: 200px;
            color: #fff;
          }
        }
        .head_right {
          margin-right: 3%;
          display: flex;
          width: 55%;
          // width: 40%;
          .active {
            background: #304c66;
            border: 2px solid #248d9a;
          }
          a {
            width: 115px;
            text-align: center;
            height: 32px;
            padding: 1% 5%;
            border: 2px solid #0f455d;
            color: #fff;
            border-radius: 3px;
          }
          // 右边字的颜色
          .head_right_text {
            color: white;
          }
        }
        span {
          display: inline-block;
          margin-right: calc((100vw / 1920) * 7);
          width: calc((100vw / 1920) * 2);
          height: calc((100vw / 1920) * 17);
          background-image: linear-gradient(180deg, #32eafe 0%, #0293e1 100%);
        }
      }
    }
    // 峰值监控
    .node1 {
      height: 340px;
      .head1 {
        height: 16%;
        position: relative;
        z-index: 20;
        display: flex;
        justify-content: space-between;
        flex-flow: row nowrap;
        align-items: center;
        // margin: calc((100vw / 1920) * 25.39) 0 0 calc((100vw / 1920) * 23.03);
        margin: 0 0 0 calc((100vw / 1920) * 20);
        .head_left {
          display: flex;

          .left_txt {
            // width: 200px;
            color: #fff;
          }
        }
        .head_right {
          margin-right: 3%;
          display: flex;
          width: 49%;
          // width: 40%;
          .active {
            background: #304c66;
            border: 2px solid #248d9a;
          }
          a {
            width: 115px;
            text-align: center;
            height: 32px;
            padding: 1% 5%;
            border: 2px solid #0f455d;
            color: #fff;
            border-radius: 3px;
          }
          // 右边字的颜色
          .head_right_text {
            color: white;
          }
        }
        span {
          display: inline-block;
          margin-right: calc((100vw / 1920) * 7);
          width: calc((100vw / 1920) * 2);
          height: calc((100vw / 1920) * 17);
          background-image: linear-gradient(180deg, #32eafe 0%, #0293e1 100%);
        }
      }
    }
    // 性能监控
    .performance {
      height: 340px;
      .head {
        height: 16%;
        position: relative;
        z-index: 20;
        display: flex;
        justify-content: space-between;
        flex-flow: row nowrap;
        align-items: center;
        // margin: calc((100vw / 1920) * 25.39) 0 0 calc((100vw / 1920) * 23.03);
        margin: 0 0 0 calc((100vw / 1920) * 20);
        .head_left {
          display: flex;

          .left_txt {
            // width: 200px;
            color: #fff;
          }
        }
        .head_right {
          margin-right: 3%;
          display: flex;
          width: 46%;
          // .active {
          //   background: #304c66;
          //   border: 2px solid #248d9a;
          // }
          a {
            width: 115px;
            text-align: center;
            height: 32px;
            padding: 1% 5%;
            border: 2px solid #0f455d;
            color: #fff;
            border-radius: 3px;
          }
          // 右边字的颜色
          .head_right_text {
            color: white;
          }
        }
        span {
          display: inline-block;
          margin-right: calc((100vw / 1920) * 7);
          width: calc((100vw / 1920) * 2);
          height: calc((100vw / 1920) * 17);
          background-image: linear-gradient(180deg, #32eafe 0%, #0293e1 100%);
        }
      }
      .state {
        ul {
          margin-left: 50px;
          display: flex;
          color: white;
          list-style: none;
          li {
            span {
              display: inline-block;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              margin-right: 10px;
            }
            margin-right: 20px;
          }
          li:nth-child(1) {
            span {
              background: #f2ba55;
            }
          }
          li:nth-child(2) {
            span {
              background: #ff70a8;
            }
          }
          li:nth-child(3) {
            span {
              background: #11a8ea;
            }
          }
        }
      }
    }
    // 中间
    .map_main {
      // margin-left: 5px;
      // margin-right: 5px;

      .main_table {
        margin-top: 22.6%;
        width: 537px;
        margin-left: 6px;
      }
    }
    //  业务平台智能合约
    .business {
      width: 535px;
      height: 300px;
      .head1 {
        height: 16%;
        position: relative;
        z-index: 20;
        display: flex;
        justify-content: space-between;
        flex-flow: row nowrap;
        align-items: center;
        // margin: calc((100vw / 1920) * 25.39) 0 0 calc((100vw / 1920) * 23.03);
        margin: 0 0 0 calc((100vw / 1920) * 20);
        .head_left {
          display: flex;

          .left_txt {
            // width: 200px;
            color: #fff;
          }
        }
        .head_right {
          margin-right: 3%;
          display: flex;
          width: 55%;
          // width: 40%;
          .active {
            background: #304c66;
            border: 2px solid #248d9a;
          }
          a {
            width: 115px;
            text-align: center;
            height: 32px;
            padding: 1% 5%;
            border: 2px solid #0f455d;
            color: #fff;
            border-radius: 3px;
          }
          // 右边字的颜色
          .head_right_text {
            color: white;
          }
        }
        span {
          display: inline-block;
          margin-right: calc((100vw / 1920) * 7);
          width: calc((100vw / 1920) * 2);
          height: calc((100vw / 1920) * 17);
          background-image: linear-gradient(180deg, #32eafe 0%, #0293e1 100%);
        }
      }
      .state {
        ul {
          margin-left: 50px;
          display: flex;
          color: white;
          list-style: none;
          li {
            span {
              display: inline-block;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              margin-right: 10px;
            }
            margin-right: 20px;
          }
          li:nth-child(1) {
            span {
              background: #f2ba55;
            }
          }
          li:nth-child(2) {
            span {
              background: #ff70a8;
            }
          }
          li:nth-child(3) {
            span {
              background: #11a8ea;
            }
          }
        }
        .state_sj {
          li {
            width: 100px;
            width: 52px;

            margin-left: 51px;
          }
        }
      }
    }
    // 存储
    .storage {
      width: 535px;
      height: 262px;
      .head {
        height: 16%;
        position: relative;
        z-index: 20;
        display: flex;
        justify-content: space-between;
        flex-flow: row nowrap;
        align-items: center;
        // margin: calc((100vw / 1920) * 25.39) 0 0 calc((100vw / 1920) * 23.03);
        margin: 0 0 0 calc((100vw / 1920) * 20);
        .head_left {
          display: flex;
          .left_txt {
            // width: 200px;
            color: #fff;
          }
        }
        span {
          display: inline-block;
          margin-right: calc((100vw / 1920) * 7);
          width: calc((100vw / 1920) * 2);
          height: calc((100vw / 1920) * 17);
          background-image: linear-gradient(180deg, #32eafe 0%, #0293e1 100%);
        }
      }
    }
    // 告警信息
    .info {
      width: 535px;
      height: 340px;
      .head {
        height: 16%;
        position: relative;
        z-index: 20;
        display: flex;
        justify-content: space-between;
        flex-flow: row nowrap;
        align-items: center;
        // margin: calc((100vw / 1920) * 25.39) 0 0 calc((100vw / 1920) * 23.03);
        margin: 0 0 0 calc((100vw / 1920) * 20);
        .head_left {
          display: flex;
          .left_txt {
            // width: 200px;
            color: #fff;
          }
        }
        span {
          display: inline-block;
          margin-right: calc((100vw / 1920) * 7);
          width: calc((100vw / 1920) * 2);
          height: calc((100vw / 1920) * 17);
          background-image: linear-gradient(180deg, #32eafe 0%, #0293e1 100%);
        }
      }
    }
  }

  // 地图
  #main {
    width: 550px;
    height: 500px;
    border: none;
  }
  // 峰值监控
  #peak {
    position: absolute;
    top: 15%;
    left: -8px;
    width: 500px;
    height: 300px;
  }
  // 性能监控
  #line {
    position: absolute;
    top: 14%;
    left: -8px;
    width: 500px;
    height: 350px;
  }
  // 合约
  #contract {
    position: absolute;
    top: 11%;
    left: 1%;
    width: 500px;
    height: 350px;
  }

  // 存储节点状态表格
  .com_table {
    padding: 10px;
    /deep/.ivu-table {
      color: #cce6ff;
      font-size: 14px;
      background-color: transparent !important;
      td,
      th {
        height: 40px;
        border: none;
        background-color: transparent !important;
      }
      thead {
        background: #2da9f2;
      }
      //  .ivu-table-overflowY{
      //    height: 110px;
      //  }
    }
    /deep/.ivu-table:before {
      background: none !important;
    }
    // 圆点样式
    .com_circle {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 5%;
    }
    // 改变滚动条样式
    ::-webkit-scrollbar {
      width: 4px;
      height: 4px;
      background-color: none;
    }

    /* 滚动槽 */
    ::-webkit-scrollbar-track {
      border-radius: 10px;
    }
    // 滚动条颜色
    ::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background-color: #bfc1c4;
    }
    /deep/.ivu-table th {
      background-color: transparent !important;
    }
  }
  //
  //    公用下拉框样式
  .com_select {
    width: 140px;
    background-color: transparent;
    border-radius: calc((100vw / 1920) * 4);
    color: white;
    /deep/.ivu-select-selection {
      background-color: transparent !important;
    }
    //  .ant-select-selector,.ant-select-selector {
    //      background: transparent !important;
    //  }
    //  .ant-select-selector{
    //   border: 1px solid #3466BD !important;
    //  }
    //  .ant-select-arrow{
    //      color: white;
    //  }
  }
  //  state

  // 鼠标滑过tr颜色
  // /deep/.ivu-table-row:hover{
  // background: red;
  // }

  // .com_circle {
  //   display: inline-block;
  //   width: 8px;
  //   height: 8px;
  //   border-radius: 50%;
  // }
}
</style>
