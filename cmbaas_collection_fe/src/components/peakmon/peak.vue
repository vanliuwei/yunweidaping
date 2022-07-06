<template>
    <div class="tps node1">
        <div class="head1">
            <div class="head_left">
                <span></span>
                <div class="left_txt">峰值监控</div>
                <img class="icon_t" src="../../assets/icon.png" />
            </div>
            <div class="head_right">
                <!-- <a @click="tab" :class="tps == 1 ? 'active' : ''">TPS使用情况</a>
                <a @click="tab1" :class="tps == 2 ? 'active' : ''">TPS实时情况</a> -->
                <div>
                    <Select v-model="tps" style="width:130px" class="com_select" @on-change="tab">
                        <Option value="1" >TPS使用情况</Option>
                        <Option value="2" >TPS实时监测</Option>
                    </Select>
                </div>
            </div>
        </div>
        <div v-show="tps === '2'">
            <div class="peakTop">
                <div>TPS数量</div>
            </div>
            <div id="peakTime"></div>
        </div>
        <div v-show="tps === '1'">
            <div class="peakTop">
                <div>TPS数量</div>
                <div class="peakTopR">
                    <div>
                        <p>历史峰值</p>
                        <p class="color">{{ hisPeak.resultValue }}</p>
                    </div>
                    <div>
                        <p>峰值区块编号</p>
                        <p class="color">{{ hisPeak.blockNum }}</p>
                    </div>
                    <div>
                        <p>历史峰值时间</p>
                        <p class="color">{{ hisPeak.timeValue }}</p>
                    </div>
                </div>
            </div>
            <div id="peak"></div>
        </div>
    </div>
</template>

<script>
    import * as echarts from "echarts";
    import "echarts/map/js/china.js";
    import {
        getPeak,
        getHis,
        getPeakTime
    } from "@/api/data";
    export default {
        name: "peak",
        data() {
            return {
                tps: '2',
                hisPeak: {},
                timeValue: [], // 峰值监控值
                timeKey: [], // 峰值监控Y轴
                timeValueTime: [], // tps实时
                timeKeyTime: [], // tps实时
            };
        },

        methods: {
            tab() {
                console.log(this.tps,'111111111111')
                // this.tps = 1;
                this.setPeak();
            },
            // tab1() {
            //     this.tps = 2;
            //     this.getTime();
            // },
            // 峰值折线
            broken2() {
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
                        height: 160,
                    },
                    dataZoom: [
                        // { //Y轴固定,让内容滚动
                        //   type: 'slider',
                        //   show: false,
                        //   xAxisIndex: [0],
                        //   start: 1,
                        //   end: 80,//设置X轴刻度之间的间隔(根据数据量来调整)
                        //   zoomLock: true, //锁定区域禁止缩放(鼠标滚动会缩放,所以禁止)
                        // },
                        // {
                        //   type: 'inside',
                        //   xAxisIndex: [0],
                        //   start: 1,
                        //   end: 80,
                        //   zoomLock: true, //锁定区域禁止缩放
                        // },
                    ],
                    xAxis: {
                        type: "category",
                        data: this.timeKey,
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#cce6ff",
                                fontSize: "14",
                            },
                        },
                        boundaryGap: false,
                        axisLine: {
                            lineStyle: {
                                color: "#cce6ff", // 颜色
                            },
                        },
                    },
                    yAxis: {
                        type: "value",
                        axisLine: {
                            show: false, // y轴线的显示和隐藏
                            lineStyle: {
                                color: "#cce6ff", // 颜色
                                // width: 3,
                            },
                            // symbol: ["none", "arrow"],
                        },
                    },
                    series: [{
                        type: "line",
                        data: this.timeValue,
                        symbol: "none",//去掉上面的圆点
                        areaStyle: {
                            // color: "#16443D",
                        },
                        boundaryGap: false,
                        lineStyle: { // 设置线条的style等
                            normal: {
                                color: '#3AFFFF', // 折线线条颜色
                            },
                        },
                        itemStyle: {
                            normal: {
                                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: "#009FEC", // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: "#051F53", // 100% 处的颜色
                                    },
                                ]), //背景渐变色
                                lineStyle: {
                                    // 系列级个性化折线样式
                                    width: 1,
                                    type: "solid",
                                    color: "#3AFFFF", //折线的颜色
                                },
                            },
                        },
                    }, ],
                };
                myPeak.setOption(option);
            },
            // tps实时
            // 峰值折线
            brokenTime() {
                let myPeakTime = echarts.init(document.getElementById("peakTime"));
                let optionTime = {
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
                        height: 160,
                        // borderWidth:1
                    },
                    // dataZoom: [
                    //   // { //Y轴固定,让内容滚动
                    //   //   type: 'slider',
                    //   //   show: false,
                    //   //   xAxisIndex: [0],
                    //   //   start: 1,
                    //   //   end: 80,//设置X轴刻度之间的间隔(根据数据量来调整)
                    //   //   zoomLock: true, //锁定区域禁止缩放(鼠标滚动会缩放,所以禁止)
                    //   // },
                    //   // {
                    //   //   type: 'inside',
                    //   //   xAxisIndex: [0],
                    //   //   start: 1,
                    //   //   end: 80,
                    //   //   zoomLock: true, //锁定区域禁止缩放
                    //   // },

                    // ],
                    xAxis: {
                        type: "category",
                        data: this.timeKeyTime,
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#cce6ff",
                                fontSize: "14",
                            },
                        },
                        boundaryGap: false,
                        axisLine: {
                            lineStyle: {
                                color: "#cce6ff", // 颜色
                            },
                        },
                    },
                    yAxis: {
                        type: "value",
                        axisLine: {
                            show: false, // y轴线的显示和隐藏
                            lineStyle: {
                                color: "#cce6ff", // 颜色
                                // width: 3,
                            },
                            // symbol: ["none", "arrow"],
                        },
                    },
                    series: [{
                        type: "line",
                        data: this.timeValueTime,
                        symbol: "none",//去掉上面的圆点
                        areaStyle: {
                            // color: "#16443D",
                        },
                        boundaryGap: false,
                        lineStyle: { // 设置线条的style等
                            normal: {
                                color: '#3AFFFF', // 折线线条颜色
                            },
                        },
                        itemStyle: {
                            normal: {
                                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: "#009FEC", // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: "#051F53", // 100% 处的颜色
                                    },
                                ]), //背景渐变色
                                lineStyle: {
                                    // 系列级个性化折线样式
                                    width: 1,
                                    type: "solid",
                                    color: "#3AFFFF", //折线的颜色
                                },
                            },
                        },
                    }, ],
                };
                myPeakTime.setOption(optionTime);
            },
            setPeak() {
                // 峰值监控
                getPeak()
                    .then((res) => {
                        if (res.status == 200) {
                            this.timeValue = Object.values(res.data);
                            this.timeKey = Object.keys(res.data);
                            this.broken2();
                        } else {
                            alert("请求失败");
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                // 历史峰值
                getHis().then((res) => {
                    if (res.status == 200) {
                        this.hisPeak = res.data;
                    }
                });
            },
            getTime() {
                // tps实时
                getPeakTime()
                    .then((res) => {
                        if (res.status == 200) {
                            this.timeValueTime = Object.values(res.data);
                            this.timeKeyTime = Object.keys(res.data);
                            this.brokenTime();
                        } else {
                            alert("请求失败");
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
        },
        mounted() {
            this.setPeak();
            this.getTime();
            this.timer = setInterval(() => {
                this.getTime(); // TPS实时情况
            }, 5000);
        },
        beforeDestroy() {
            clearInterval(this.timer);
        },
    };
</script>

<style lang="less" scoped>
    // 峰值监控
    #peak {
        position: absolute;
        top: 15%;
        left: 6%;
        width: 430px;
        height: 260px;
    }

    #peakTime {
        position: absolute;
        top: 15%;
        width: 90%;
        height: 100%;
        left: 6%;
    }

    .tps {
        position: relative;
        width: 100%;
        height: 35%;
        box-sizing: border-box;
        border: 1px solid #116987;
        color: #742c3e;
        box-sizing: border-box;
        margin-top: 3%;
        border: 2px solid #116987;
        border-image: -webkit-linear-gradient(#1b6199, #1b6199) 20 20;
        // border-image: -moz-linear-gradient(#1B6199, #1B6199) 20 20;
        // border-image: -o-linear-gradient(#1B6199, #1B6199) 20 20;
        // border-image: linear-gradient(#05062a, #1b6199) 20 20 20 20;
        // box-shadow: inset 0px 1px 35px 0px rgba(75, 137, 255, 0.5);
        // background: linear-gradient(to left, #37f4f5, #37f4f5) left bottom no-repeat,
        //     linear-gradient(to bottom, #37f4f5, #37f4f5) left bottom no-repeat,
        //     linear-gradient(to left, #37f4f5, #37f4f5) right bottom no-repeat,
        //     linear-gradient(to left, #37f4f5, #37f4f5) right bottom no-repeat;
        // background-size: 1px 28px, 21px 1px;
        background-size: 1px 28px, 21px 1px;
        background: rgba(18, 53, 118, 0.24);
        border: 1px solid;
        border-image: radial-gradient(circle, rgba(0, 237, 246, 1), rgba(0, 215, 233, 0)) 1 1;
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
                    font-size: 18px;
                    font-weight: 600;
                    color: #cce6ff;
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
                    color: #cce6ff;
                }

                // 右边字的颜色
                .head_right_text {
                    color: white;
                }
            }

            span {
                display: inline-block;
                margin-right: calc((100vw / 1920) * 7);
                width: calc((100vw / 1920) * 4);
                height: calc((100vw / 1920) * 24);
                background-image: linear-gradient(180deg, #32eafe 0%, #0293e1 100%);
            }
        }

        .nodeContent {
            display: flex;
            justify-content: space-around;
            margin-bottom: 5%;

            .nodeBox {
                color: #cce6ff;
            }
        }

        .nodeBot {
            ul {
                list-style: none;
                display: flex;
                color: #cce6ff;
                flex-wrap: wrap;

                li {
                    margin: 1% 0;
                    width: 45%;
                }
            }
        }

        .peakTop {
            color: #ADC8E6;
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 0 3%;

            .peakTopR {
                width: 85%;
                display: flex;
                justify-content: space-evenly;

                .color {
                    color:#ADC8E6;
                }
            }
        }
    }

    .node1 {
        .head1 {
            height: 16%;
            position: relative;
            z-index: 20;
            display: flex;
            justify-content: space-between;
            flex-flow: row nowrap;
            align-items: center;
            // margin: calc((100vw / 1920) * 25.39) 0 0 calc((100vw / 1920) * 23.03);
            margin: 5px 0 0 calc((100vw / 1920) * 10);

            .head_left {
                display: flex;

                .left_txt {
                    // width: 200px;
                    font-size: 18px;
                    font-weight: 600;
                    color: #cce6ff;
                }
            }

            .head_right {
                // margin-right: 3%;
                display: flex;
                width: 30%;

                // width: 40%;
                .active {
                    background: #304c66;
                    border: 2px solid #248d9a;
                }

                a {
                    word-break: keep-all;
                    /* 不换行 */
                    white-space: nowrap;
                    /* 不换行 */
                    overflow: hidden;
                    /* 内容超出宽度时隐藏超出部分的内容 */
                    text-overflow: ellipsis;
                    text-align: center;
                    height: 32px;
                    padding: 1% 5%;
                    border: 2px solid #0f455d;
                    color: #cce6ff;
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
                width: calc((100vw / 1920) * 4);
                height: calc((100vw / 1920) * 24);
                background-image: linear-gradient(180deg, #32eafe 0%, #0293e1 100%);
            }
        }
    }

    .com_select {
        width: 140px;
        background-color: transparent;
        border-radius: calc((100vw / 1920) * 4);
        color: #cce6ff;

        /deep/.ivu-select-selection {
            background-color: transparent !important;
            height: 34px;
            border-color: #15477a;
        }

        /deep/.ivu-select-selected-value {
            height: 34px;
            line-height: 34px;
        }

        /deep/.ivu-select-placeholder {
            height: 34px;
            line-height: 34px;
        }
    }
</style>