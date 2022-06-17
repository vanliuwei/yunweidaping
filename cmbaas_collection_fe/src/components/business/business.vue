<template>
    <div class="tps business">
        <div class="head">
            <div class="head_left">
                <span></span>
                <div class="left_txt">智能合约</div>
                <img class="icon_t" src="../../assets/icon.png" />
            </div>
            <div class="head_right_text">
                链账户
                <Select v-model="Chain" class="com_select" style="width:80px">
                    <Option v-for="item in contractChain" :value="item" :key="item">{{ item }}</Option>
                </Select>
            </div>
            <div class="head_right_textZ">
                合约名称
                <Select v-model="condata" class="com_select" style="width:100px;margin-right:15px;">
                    <Option v-for="item in contract" :value="item" :key="item">{{ item }}</Option>
                </Select>
            </div>
          
        </div>
        <div class="state">
            <ul>
                <li>
                    <div><span></span> CPU使用状况</div>
                    <div class="bus">{{business.relatimeCpu}}</div>
                </li>
                <li>
                    <div><span></span> Net使用状况</div>
                    <div class="bus">{{business.relatimeNet}}</div>
                </li>
                <li>
                    <div><span></span> 内存使用状况</div>
                    <div class="bus">{{business.relatimeRam}}</div>
                </li>
            </ul>
        </div>
        <div id="contract"> </div>
    </div>
</template>

<script>
    import * as echarts from "echarts";
    import "echarts/map/js/china.js";
    import {
        getContractValue,
        getContract
    } from '@/api/data';
    export default {
        name: 'business',
        data() {
            return {
                condata: '',
                Chain: '',
                contract: [],
                contractChain: [],
                // 智能合约
                smart: {
                    cpuX: '', // 性能cpu
                    cpuY: '', //
                    netY: '', // 磁盘
                    memory: '' // 内存
                },
                business: {
                    relatimeCpu: '',
                    relatimeNet: '',
                    relatimeRam: ''
                },
                dataObj: {},
                a: ''
            };
        },

        mounted() {
            this.getHe()
            this.timer = setInterval(() => {
                this.get()
            }, 5000);
        },
        beforeDestroy() {
            clearInterval(this.timer);
        },
        methods: {
            broken3() {
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
                    series: [{
                            type: "line",
                            data: this.smart.memory,
                            name: '内存',
                            areaStyle: {
                                // color: "#16443D",
                            },
                            boundaryGap: false,
                            itemStyle: {
                                normal: {
                                    //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
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
                            name: 'Net',
                            areaStyle: {
                                // color: "blue",
                            },
                            boundaryGap: false,
                            itemStyle: {
                                normal: {
                                    //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
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
                            name: 'CPU',
                            areaStyle: {
                                // color: "blue",
                            },
                            boundaryGap: false,
                            itemStyle: {
                                normal: {
                                    //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
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
            getHe() {
                // 智能合约下拉
                getContract().then(res => {
                    if (res.status == 200) {
                        this.contract = Object.keys(res.data)
                        this.condata = Object.keys(res.data)[0]
                        this.dataObj = res.data
                        if (this.condata) {
                            getContractValue(this.condata).then(res => {
                                if (res.data.realtimeValue) {
                                    this.business = res.data.realtimeValue
                                }
                                this.smart.cpuX = Object.keys(res.data.cpu)
                                this.smart.cpuY = Object.values(res.data.cpu)
                                this.smart.netY = Object.values(res.data.net)
                                this.smart.memory = Object.values(res.data.ram)
                                this.broken3();
                            })
                        }

                    }
                }).catch(err => {

                })
            },
            get() {
                if (this.a.Chain) {
                    getContractValue(this.a.Chain).then(res => {
                        if (res.data.realtimeValue) {
                            this.business = res.data.realtimeValue
                        }
                        this.smart.cpuX = Object.keys(res.data.cpu)
                        this.smart.cpuY = Object.values(res.data.cpu)
                        this.smart.netY = Object.values(res.data.net)
                        this.smart.memory = Object.values(res.data.ram)
                        this.broken3();
                    })
                } else {
                    getContractValue(this.a.condata).then(res => {
                        if (res.data.realtimeValue) {
                            this.business = res.data.realtimeValue
                        }
                        this.smart.cpuX = Object.keys(res.data.cpu)
                        this.smart.cpuY = Object.values(res.data.cpu)
                        this.smart.netY = Object.values(res.data.net)
                        this.smart.memory = Object.values(res.data.ram)
                        this.broken3();
                    })
                }
            },


        },
        computed: {
            changeData() {
                const {
                    condata,
                    Chain
                } = this
                return {
                    condata,
                    Chain,
                }
            }
        },
        watch: {
            'condata': {
                immediate: true,
                handler(value) {
                    if (this.contractChain) {
                        this.contractChain = this.dataObj[value]
                        this.Chain = ''
                    } else {
                        this.contractChain = this.dataObj[value]
                    }
                }
            },
            'changeData': {
                immediate: true,
                deep: true,
                handler(value) {
                    this.a = value
                    if (value.Chain) {
                        getContractValue(value.Chain).then(res => {
                            if (res.data.realtimeValue) {
                                this.business = res.data.realtimeValue

                            }
                            this.smart.cpuX = Object.keys(res.data.cpu)
                            this.smart.cpuY = Object.values(res.data.cpu)
                            this.smart.netY = Object.values(res.data.net)
                            this.smart.memory = Object.values(res.data.ram)
                            this.broken3();
                        })
                    } else {

                        getContractValue(value.condata).then(res => {
                            if (res.data.realtimeValue) {
                                this.business = res.data.realtimeValue

                            }
                            if (res.data.cpu) {
                                this.smart.cpuX = Object.keys(res.data.cpu)
                                this.smart.cpuY = Object.values(res.data.cpu)
                                this.smart.netY = Object.values(res.data.net)
                                this.smart.memory = Object.values(res.data.ram)
                            }
                            this.broken3();
                        })
                    }
                }
            },
        }
    };
</script>

<style lang="less" scoped>
    // 合约
    #contract {
        position: absolute;
        top: 11%;
        width: 100%;
        height: 90%;
    }

    .tps {
        width: 100%;
        position: relative;
        box-sizing: border-box;
        border: 1px solid #116987;
        color: #ffccff60;
        box-sizing: border-box;
        margin-top: 3%;
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
            color: #cce6ff;
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 0 3%;

            .peakTopR {
                width: 80%;
                display: flex;
                justify-content: space-evenly;
                // .color {
                //   color: #be464c;
                // }
            }
        }
    }

    .business {
        height:35%;

        .head {
            height: 16%;
            z-index: 20;
            display: flex;
            // margin: calc((100vw / 1920) * 25.39) 0 0 calc((100vw / 1920) * 23.03);
            margin: 5px 0 0 calc((100vw / 1920) * 10);
            justify-content: space-between;
            flex-flow: row nowrap;
            align-items: center;

            span {
                display: inline-block;
                margin-right: calc((100vw / 1920) * 7);
                width: calc((100vw / 1920) * 4);
                height: calc((100vw / 1920) * 24);
                background-image: linear-gradient(180deg, #32eafe 0%, #0293e1 100%);
            }
            .head_left {
                display: flex;

                .left_txt {
                    // width: 200px;
                    font-size: 18px;
                    font-weight: 600;
                    color: #cce6ff;
                }
            }
            .head_right_text {
                // width: 45%;
                color: #cce6ff;
            }

            .head_right_textZ {
                // width: 50%;
                color: #cce6ff;
            }
        }

        .state {
            .bus {
                text-align: center;
                color: #ffffff;
            }

            ul {
                display: flex;
                color: #cce6ff;
                list-style: none;
                display: flex;
                justify-content: space-evenly;

                li {
                    span {
                        display: inline-block;
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        margin-right: 10px;
                    }
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