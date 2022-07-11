<template>
    <div class="tps1 performance">
        <div class="head">
            <div class="head_left">
                <span></span>
                <div class="left_txt">性能监控</div>
                <img class="icon_t" src="../../assets/icon.png" />
            </div>
            <div class="head_right">
                <div class="head_right_text">
                    节点名称
                    <Select v-model="model" style="width:140px" class="com_select">
                        <Option v-for="item in cityList" :value="item" :key="item">{{item}}</Option>
                    </Select>
                </div>
            </div>
        </div>
        <!--  -->
        <div class="state">
            <ul>
                <li><span></span>CPU</li>
                <li><span></span>磁盘</li>
                <li><span></span>内存</li>
            </ul>
        </div>
        <div id="line"></div>
    </div>
</template>

<script>
    import * as echarts from "echarts";
    import "echarts/map/js/china.js";
    import {
        getPerforCpu,
        getPerforDisk,
        getPerforMemory,
        getPeakIp,
    } from "@/api/data";
    export default {
        name: "property",
        data() {
            return {
                model: "",
                cityList: [],
                perfor: {
                    cpuX: "", // 性能cpu
                    cpuY: "", //
                    diskY: "", // 磁盘
                    memory: "", // 内存
                },
            };
        },

        methods: {
            // 性能折线
            broken() {
                let yName = '%'
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
                        height: 170,
                        // borderWidth:1
                    },
                    // dataZoom: [
                    //   { //Y轴固定,让内容滚动
                    //     type: 'slider',
                    //     show: false,
                    //     xAxisIndex: [0],
                    //     start: 1,
                    //     end: 80,//设置X轴刻度之间的间隔(根据数据量来调整)
                    //     zoomLock: true, //锁定区域禁止缩放(鼠标滚动会缩放,所以禁止)
                    //   },
                    //   {
                    //     type: 'inside',
                    //     xAxisIndex: [0],
                    //     start: 1,
                    //     end: 80,
                    //     zoomLock: true, //锁定区域禁止缩放
                    //   },

                    // ],
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
                        name: yName,
                         nameLocation:'end',
                        type: "value",
                        axisLine: {
                            show: false, // y轴线的显示和隐藏
                            lineStyle: {
                                color: "#fff", // 颜色
                                // width: 3,
                            },
                            // symbol: ["none", "arrow"],
                        },
                        // splitLine:{//虚线
                        //     show:true,
                        //     lineStyle:{
                        //         type:'dashed',
                        //         color:"#fff"                            }
                        // }
                    },
                    series: [{
                            type: "line",
                            // symbol: "circle",
                            name: "内存",
                            symbol: "none",//去掉上面的圆点
                            data: this.perfor.memory,
                            areaStyle: {
                                // color: "#16443D",
                            },
                            boundaryGap: false,
                            itemStyle: {
                                normal: {
                                    //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: "#48F84F", // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: "#1C335F", // 100% 处的颜色
                                        },
                                    ]), //背景渐变色
                                    lineStyle: {
                                        // 系列级个性化折线样式
                                        width: 1,
                                        type: "solid",
                                        color: "#48F84F", //折线的颜色
                                    },
                                },
                            },
                        },
                        {
                            type: "line",
                            name: "磁盘",
                            symbol: "none",
                            data: this.perfor.diskY,
                            areaStyle: {
                                // color: "blue",
                            },
                            boundaryGap: false,
                            itemStyle: {
                                normal: {
                                    //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: "#A679F9", // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: "#1C335F", // 100% 处的颜色
                                        },
                                    ]), //背景渐变色
                                    lineStyle: {
                                        // 系列级个性化折线样式
                                        width: 1,
                                        type: "solid",
                                        color: "#A679F9", //折线的颜色
                                    },
                                },
                            },
                        },
                        {
                            symbol: "none",
                            type: "line",
                            name: "cpu",
                            data: this.perfor.cpuY,
                            areaStyle: {
                                // color: "blue",
                            },
                            boundaryGap: false,
                            itemStyle: {
                                normal: {
                                    //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: "#0CA0F5", // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: "#1C335F", // 100% 处的颜色
                                        },
                                    ]), //背景渐变色
                                    lineStyle: {
                                        // 系列级个性化折线样式
                                        width: 1,
                                        type: "solid",
                                        color: "#0CA0F5", //折线的颜色
                                    },
                                },
                            },
                        },
                    ],
                };
                myLine.setOption(option4);
            },
            // 请求
            getPro() {
                // cup
                getPerforCpu(this.model)
                    .then((res) => {
                        if (res.status == 200) {
                            this.perfor.cpuX = Object.keys(res.data);
                            this.perfor.cpuY = Object.values(res.data);
                            this.broken();
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                // 磁盘
                getPerforDisk(this.model)
                    .then((res) => {
                        if (res.status == 200) {
                            this.perfor.diskY = Object.values(res.data);
                            this.broken();
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                // 内存getPerforMemory
                getPerforMemory(this.model)
                    .then((res) => {
                        if (res.status == 200) {
                            this.perfor.memory = Object.values(res.data);
                            this.broken();
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
        },

        mounted() {
            // 性能监控
            getPeakIp().then((res) => {
                this.cityList = res.data;
                // this.cityList =Array.from(new Set(res.data)) // 数组去重
                this.model = res.data[0];
                this.getPro();
            });
            this.timer = setInterval(() => {
                this.getPro(); // TPS实时情况
            }, 5000);
        },
        beforeDestroy() {
            clearInterval(this.timer);
        },
        watch: {
            model: {
                immediate: true,
                handler(value) {
                    if (value) {
                        // cup
                        getPerforCpu(value)
                            .then((res) => {
                                if (res.status == 200) {
                                    this.perfor.cpuX = Object.keys(res.data);
                                    this.perfor.cpuY = Object.values(res.data);
                                    this.broken();
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                        // 磁盘
                        getPerforDisk(value)
                            .then((res) => {
                                if (res.status == 200) {
                                    this.perfor.diskY = Object.values(res.data);
                                    this.broken();
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                        // 内存getPerforMemory
                        getPerforMemory(value)
                            .then((res) => {
                                if (res.status == 200) {
                                    this.perfor.memory = Object.values(res.data);
                                    this.broken();
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                },
            },
        },
    };
</script>

<style lang="less" scoped>
    #line {
        position: absolute;
        top: 10%;
        width: 100%;
        height: 100%;
    }

    .tps1 {
        position: relative;
        width: 100%;
        height: 290px;
        margin-top: 3%;
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
    }

    // 性能监控
    .performance {
        .head {
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
                    font-size: 18px;
                    font-weight: 600;
                    // width: 200px;
                    color: #cce6ff;
                }
            }

            .head_right {
                // margin-right: 3%;
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
                    color: #cce6ff;
                    border-radius: 3px;
                }

                // 右边字的颜色
                .head_right_text {
                    color: #cce6ff;
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

        .state {
            ul {
                display: flex;
                justify-content: space-evenly;
                color: #cce6ff;
                list-style: none;
                margin-left: 50%;
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
                        background: #0CA0F5;
                    }
                }

                li:nth-child(2) {
                    span {
                        background: #A679F9;
                    }
                }

                li:nth-child(3) {
                    span {
                        background: #48F84F;
                    }
                }
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