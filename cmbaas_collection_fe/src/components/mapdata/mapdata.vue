<template>
    <div class="map_main">
        <div class="mainBox">
            
            <div class="tpss">
                <div class="head">
                    <div class="head_left">
                        <span></span>
                        <div class="left_txt">节点地图</div>
                        <img class="icon_t" src="../../assets/icon.png" />
                    </div>
                </div>
                <div id="main"></div>
             </div>
            <div class="tps">
                <!-- <div class="net">
                    <span>区块链网络可用性：正常</span> &nbsp;&nbsp;
                    <span>区块链交易笔数：{{coutNumber}}</span>
                    <span class="more" @click='mapModal=true'>更多</span>
                </div> -->
                <div class="head">
                    <div class="head_left">
                        <span></span>
                        <div class="left_txt">区块链网络可用性：正常&nbsp;&nbsp;区块链交易笔数：{{coutNumber}}</div>
                        <img class="icon_t" src="../../assets/icon.png" />
                        <div class="more" @click='mapModal=true'>更多&nbsp;&nbsp;<div>﹀</div></div>
                    </div>
                </div>

                <Table height="252" :columns="nodeTpTitle" :data="nodeTpData" class="com_table">
                    <template slot-scope="{ row }" slot="ip">
                        <p class="flex">
                            <span class="com_circle" :style="{backgroundColor:ralte[row.status]}"></span>
                            <span>{{ row.ip }}</span>
                        </p>
                    </template>
                    <template slot-scope="{ row, index }" slot="status">
                        <span :style="{color:ralteStatus[row.status]}">{{ row.status }}</span>
                    </template>
                </Table>
            </div>
        </div>
        <Modal  v-model="mapModal" class-name="vertical-center-modal" width="660" class="headcol" footer-hide>
            <p slot="header">
               <span class="head_title">区块链网络</span>
               <img src="../../assets/icon.png" />
            </p>
            <Table height="310" :columns="nodeTpTitle" :data="nodeTpData" class="com_table">
                <template slot-scope="{ row }" slot="ip">
                    <p class="flex">
                        <span class="com_circle" :style="{backgroundColor:ralte[row.status]}"></span>
                        <span>{{ row.ip }}</span>
                    </p>
                </template>
                <template slot-scope="{ row, index }" slot="status">
                    <span :style="{color:ralteStatus[row.status]}">{{ row.status }}</span>
                </template>
            </Table>
        </Modal>
    </div>

</template>

<script>
    import * as echarts from "echarts";
    import "echarts/map/js/china.js";
    import {
        geoCoordMap
    } from './geo';
    import {
        getNodeIp,
        getcountData
    } from '@/api/data';
    import {
        EleResize
    } from '../../assets/js/esresize'
    let ralte = {
        "正常": "blue",
        "不可用": "#ff0000",
        "一般": "blue",
    }
    let ralteStatus = {
        "正常": "#cce6ff",
        "不可用": "#ff0000"
    }
    const dealWithData = () => {
        let mapData = [];
        for (var key in geoCoordMap) {
            mapData.push({
                name: key,
                value: geoCoordMap[key]
            });
        }
        return mapData
    }
    export default {
        name: 'mapdata',

        data() {
            return {
                ralte: Object.freeze(ralte),
                ralteStatus: Object.freeze(ralteStatus),
                myChart: {}, // 地图
                mapDataV: dealWithData(), // 地图数据
                malNode: [], // 不可用节点
                mapModal: false, // 地图更多
                nodeTpData: [],
                coutNumber: '',
                nodeTpTitle: [{
                        title: 'IP',
                        slot: 'ip',
                        width: 165
                    },
                    {
                        title: '节点状态',
                        slot: 'status'

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
            };
        },
        mounted() {
            setTimeout(() => {
                let table = document.getElementsByClassName('ivu-table-body');
                let timer = null;
                let _this = this

                function play() {
                    clearInterval(timer);
                    timer = setInterval(() => {
                        if (table[0]) {
                            table[0].scrollTop++;
                            if ((table[0].scrollTop) >= (((_this.nodeTpData.length - 5) * 40) + 5)) {
                                table[0].scrollTop = 0;
                            }
                        }

                    }, 100)
                }
                setTimeout(play, 500);
                table[0].onmouseover = function () {
                    clearInterval(timer)
                };
                table[0].onmouseout = play;
            }, 0)

            this.timer = setInterval(() => {
                this.getMap()
            }, 5000);
            this.$nextTick(function () {
                this.getMap()
            });

        },
        beforeDestroy() {
            clearInterval(this.timer);
        },
        methods: {
            buildMap() {
                this.myChart = echarts.init(document.getElementById('main'));

                // let resizeDiv = document.getElementById('main')
                // console.log(EleResize);
                // let listener = function () {
                //   this.myChart.resize()
                // }
                // EleResize.on(resizeDiv, listener)
                let option1 = {
                    // tooltip: {
                    //   trigger: 'item'
                    // },
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
                        zoom: 1.25, //视角缩放比例
                        label: {
                            normal: {
                                show: true,
                                fontSize: '12', //注意：地图省份名字字体如果过大会导致字体重叠
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
                                color: '#ccc', //鼠标移入背景颜色
                                borderColor: '#19C3A0' //鼠标移入波纹颜色
                            }
                        },

                    },
                    series: [{
                            name: '故障信息',
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
                            data: this.malNode
                        }


                    ]
                };
                this.myChart.setOption(option1, true);
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
            getMap() {
                getNodeIp().then(res => {
                    if (res.status == 200) {
                        let dataRed = res.data.filter(item => item.status == 'ERROR')
                        this.mapDataV[dataRed]
                        let security = {
                            'ERROR': '不可用',
                            'OK': '正常'
                        }
                        let nodetype = {
                            'bp': '出块节点',
                            'normal': '业务节点'
                        }
                        let datas = res.data.map((item) => {
                            return {
                                ...item,
                                status: security[item.status],
                                nodeType: nodetype[item.nodeType],
                                value: item.longitudeAndLatitude.split(',').map(Number)
                            }
                        })
                        let malNode = datas.filter(items => {
                            return items.status == '不可用'
                        })
                        this.malNode = malNode
                        this.nodeTpData = datas
                        this.buildMap()
                    }
                }).catch(err => {
                    console.log(err);
                })
                getcountData().then(res => {
                    this.coutNumber = res.data
                })
            }
        },
    };
</script>

<style lang="less" scoped>
    /deep/.ivu-modal-header{
        padding:20px 20px 0 20px;
    }
    /deep/.ivu-modal-header p{
        align-items: center;
        display: flex;
    }
    //弹窗
    .head_title{
        font-size: 18px;
        font-family: SourceHanSansCN-Heavy, SourceHanSansCN;
        font-weight: 800;
        color: #FFFFFF;
        position: relative;
        margin-left: 11px;
        margin-right: 5px;
    }
    .head_title::before{
        content: '';
        position: absolute;
        width: 4px;
        height: 24px;
        background: #00D7E9;
        left:-11px;
        top:2px;
    }

    // 更多模态框
    .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal {
            top: 0;
        }
    }

    .map_main {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .mainBox {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 900px;

        .tps {
            padding-top: 8px;
            width: 100%;
            position: relative;
            box-sizing: border-box;
            border: 1px solid #116987;
            color: #ffccff60;
            box-sizing: border-box;
            // margin-top: 6%;
            border: 2px solid #116987;
            border-image: -webkit-linear-gradient(#1b6199, #1b6199) 20 20;
            // border-image: -moz-linear-gradient(#1B6199, #1B6199) 20 20;
            // border-image: -o-linear-gradient(#1B6199, #1B6199) 20 20;
            border-image: linear-gradient(#05062a, #1b6199) 20 20 20 20;
            // box-shadow: inset 0px 1px 35px 0px rgba(75, 137, 255, 0.5);
            background: linear-gradient(to left, #37f4f5, #37f4f5) left bottom no-repeat,
                linear-gradient(to bottom, #37f4f5, #37f4f5) left bottom no-repeat,
                linear-gradient(to left, #37f4f5, #37f4f5) right bottom no-repeat,
                linear-gradient(to left, #37f4f5, #37f4f5) right bottom no-repeat;
            background-size: 1px 28px, 21px 1px;

            background: rgba(18, 53, 118, 0.24);
            border: 1px solid;
            border-image: radial-gradient(circle, rgba(0, 237, 246, 1), rgba(0, 215, 233, 0)) 1 1;
            .head{
                  height: 16%;
                position: relative;
                z-index: 20;
                display: flex;
                justify-content: space-between;
                flex-flow: row nowrap;
                align-items: center;
                // margin: calc((100vw / 1920) * 25.39) 0 0 calc((100vw / 1920) * 23.03);
                margin: 0px 0 0 calc((100vw / 1920) * 10);
                .head_left {
                    display: flex;
                    .left_txt {
                        font-size: 18px;
                        font-weight: 600;
                        color: #cce6ff;
                    }
                    span {
                        display: inline-block;
                        margin-right: calc((100vw / 1920) * 7);
                        width: calc((100vw / 1920) * 4);
                        height: calc((100vw / 1920) * 24);
                        background-image: linear-gradient(180deg, #32eafe 0%, #0293e1 100%);
                    }
                    .more {
                        position: absolute;
                        right: 20px;
                        color:#fff;
                        display: flex;
                        cursor: pointer;
                        div {
                            margin-top: 2px;
                        }
                    }
                }
            }
            


        }

        .net {
            width: 100%;
            color: #cce6ff;
            box-sizing: border-box;
            padding: 0 2%;
            font-size: 16px;
            word-break: keep-all;
            /* 不换行 */
            white-space: nowrap;
            /* 不换行 */
            overflow: hidden;
            /* 内容超出宽度时隐藏超出部分的内容 */
            text-overflow: ellipsis;

            .more {
                float: right;
                cursor: pointer;
            }
        }

        .tpss{
            width: 100%;
            height: 66%;
            padding-top: 8px;
            position: relative;
            box-sizing: border-box;
            border: 1px solid #116987;
            color: #ffccff60;
            box-sizing: border-box;
            // margin-top: 6%;
            border: 2px solid #116987;
            border-image: -webkit-linear-gradient(#1b6199, #1b6199) 20 20;
            // border-image: -moz-linear-gradient(#1B6199, #1B6199) 20 20;
            // border-image: -o-linear-gradient(#1B6199, #1B6199) 20 20;
            border-image: linear-gradient(#05062a, #1b6199) 20 20 20 20;
            // box-shadow: inset 0px 1px 35px 0px rgba(75, 137, 255, 0.5);
            background: linear-gradient(to left, #37f4f5, #37f4f5) left bottom no-repeat,
                linear-gradient(to bottom, #37f4f5, #37f4f5) left bottom no-repeat,
                linear-gradient(to left, #37f4f5, #37f4f5) right bottom no-repeat,
                linear-gradient(to left, #37f4f5, #37f4f5) right bottom no-repeat;
            background-size: 1px 28px, 21px 1px;

            background: rgba(18, 53, 118, 0.24);
            border: 1px solid;
            border-image: radial-gradient(circle, rgba(0, 237, 246, 1), rgba(0, 215, 233, 0)) 1 1;

            .head{
                height: 5%;
                position: relative;
                z-index: 20;
                display: flex;
                justify-content: space-between;
                flex-flow: row nowrap;
                align-items: center;
                // margin: calc((100vw / 1920) * 25.39) 0 0 calc((100vw / 1920) * 23.03);
                margin: 0px 0 calc((100vw / 1920) * 33) calc((100vw / 1920) * 10);
                .head_left {
                    display: flex;
                    .left_txt {
                        font-size: 18px;
                        font-weight: 600;
                        color: #cce6ff;
                    }
                    span {
                        display: inline-block;
                        margin-right: calc((100vw / 1920) * 7);
                        width: calc((100vw / 1920) * 4);
                        height: calc((100vw / 1920) * 24);
                        background-image: linear-gradient(180deg, #32eafe 0%, #0293e1 100%);
                    }
                    .more {
                        position: absolute;
                        right: 20px;
                        color:#fff;
                        display: flex;
                        cursor: pointer;
                        div {
                            margin-top: 2px;
                        }
                    }
                }
            }
        }
        // 地图
        #main {
            width: 100%;
            height: 80%;
            border: none;
            
            div{
                margin:0 auto;
            }
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
                    background: #123576;
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
                width: 6px;
            }

            /* 滚动槽 */
            ::-webkit-scrollbar-track {
                border-radius: 10px;
            }

            // 滚动条颜色
            ::-webkit-scrollbar-thumb {
                border-radius: 2px;
                background-color: #1b6097;
            }

            /deep/.ivu-table th {
                background-color: transparent !important;
            }
        }
    }

    // 对话框
    .headcol {
        /deep/.ivu-modal-content {
            // background-color: #05062a;
            background: #07113B;
            box-shadow: inset 0px 0px 32px 0px rgba(0, 215, 233, 0.6);
        }

        /deep/.ivu-modal-footer {
            border: none;
        }

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
                background: #123576;
            }
        }

        /deep/.ivu-table:before {
            display: none;
        }

        /deep/.ivu-modal-header{
            border-bottom: none;
        }
        /deep/.ivu-modal-header-inner {
            color: #cce6ff;
        }

        // 改变滚动条样式
        ::-webkit-scrollbar {
            width: 6px;
        }

        /* 滚动槽 */
        ::-webkit-scrollbar-track {
            border-radius: 10px;
        }

        // 滚动条颜色
        ::-webkit-scrollbar-thumb {
            border-radius: 2px;
            background-color: #1b6097;
        }

        /deep/.ivu-table th {
            background-color: transparent !important;
        }
    }
</style>