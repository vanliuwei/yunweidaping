<template>
    <!-- 节点数据监控 -->
    <!-- 节点数据监控 -->
    <div class="tps node">
        <div class="head1">
            <div class="head_left">
                <span></span>
                <div class="left_txt">节点数据监控</div>
                <img class="icon_t" src="../../assets/icon.png"/>
            </div>
            <div class="head_right">
                <!-- <a @click="nodeTab" :class="node == 1 ? 'active' : ''">网络监控节点</a>
                <a @click="nodeTab1" :class="node == 2 ? 'active' : ''">存储服务</a> -->
                <div>
                    <Select v-model="node" style="width:130px" class="com_select" @on-change="nodeTab">
                        <Option value="1" >网络监控节点</Option>
                        <Option value="2" >存储服务</Option>
                    </Select>
                </div>
            </div>
        </div>
        <div v-show="node == 1">
            <div class="nodeContent">
                <div class="nodeBox">
                    <div>
                        <p class="allNum">{{dataControl}}</p>
                        <!-- <p>全部可用性节点健康度</p> -->
                        <div class="nodeBotBox">
                            共识节点健康度
                        </div>
                    </div>

                </div>
                <div class="nodeBox">
                    <div>
                        <p class="allNum">{{dataControl}}</p>
                        <!-- <p>全部共识节点节点健康度</p> -->
                        <div class="nodeBotBox">
                           全部可用性节点健康度
                        </div>
                    </div>

                </div>
            </div>
            <!-- <div class="nodeBot">
                <div class="nodeBotBox">
                    共识节点健康度
                </div>
                <div class="nodeBotBox">
                    业务节点健康度
                </div>

            </div> -->
        </div>
        <div v-show="node == 2">
            <div class="nodeContent">
                <div class="nodeBox">
                    <div>
                        <p class="allNum">{{dataStor}}</p>
                        <!-- <p>全部可用性节点健康度</p> -->
                        <div class="nodeBotBox">
                             业务节点健康度 
                        </div>
                    </div>

                </div>

            </div>
            <!-- <div class="nodeBot1">
                <div class="nodeBotBox">
                    全部可用性节点健康度
                </div>

            </div> -->
        </div>
    </div>
</template>
<script>
    import {
        getHome,
        getStor
    } from '@/api/data';
    export default {
        name: 'nodedata',
        data() {
            return {
                node:'1',
                dataControl: '',
                dataStor: ''
            };
        },


        methods: {
            nodeTab(val) {
                console.log(this.node)
                // if(val==1){
                //     this.node = 1;
                // }else{
                //     this.node = 2;
                // }
            },
            // nodeTab1() {
            //     this.node = 2;
            // },
            // node数据请求
            getNode() {
                getHome().then(res => {
                    if (res.status == 200) {
                        this.dataControl = res.data
                    } else {
                        alert('请求失败')
                    }
                }).catch(err => {
                    console.log(err);
                })
                getStor().then(res => {
                    if (res.status == 200) {
                        this.dataStor = res.data
                    } else {
                        alert('请求失败')
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        mounted() {
            this.getNode()
            this.timer = setInterval(() => {
                this.getNode()
            }, 5000);
        },
        beforeDestroy() {
            clearInterval(this.timer);
        },
    };
</script>

<style lang="less" scoped>
    .allNum {
        font-size: 26px;
        font-weight: 600;
        position: absolute;
        top: -15px;
        left: 0px;
        right:0px;
        bottom:0px;
        margin:auto;
    }
    .nodeBotBox{
        font-size: 14px;
        font-family: SourceHanSansCN-Bold, SourceHanSansCN;
        font-weight: bold;
        color: #E2EEFB;
        line-height: 24px;
        position: absolute;
        top: 24px;
        left: 0px;
        right:0px;
        bottom:0px;
        margin:auto;
    }
    .tps {
        position: relative;
        width: 100%;
        height: 30%;
        box-sizing: border-box;
        border: 1px solid #116987;
        color: #ffccff60;
        box-sizing: border-box;
        border: 2px solid #116987;
        // border-image: -webkit-linear-gradient(#1b6199, #1b6199) 20 20;
        // border-image: -moz-linear-gradient(#1B6199, #1B6199) 20 20;
        // border-image: -o-linear-gradient(#1B6199, #1B6199) 20 20;
        // border-image: linear-gradient(#05062a, #1b6199) 20 20 20 20;
        // box-shadow: inset 0px 1px 35px 0px rgba(75, 137, 255, 0.5);
        // background: linear-gradient(to left, #37f4f5, #37f4f5) left bottom no-repeat,
        //     linear-gradient(to bottom, #37f4f5, #37f4f5) left bottom no-repeat,
        //     linear-gradient(to left, #37f4f5, #37f4f5) right bottom no-repeat,
        //     linear-gradient(to left, #37f4f5, #37f4f5) right bottom no-repeat;
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
                    font-weight: 600;
                    font-size: 18px;
                    color: #cce6ff;
                }
            }

            .head_right {
                // margin-right: 3%;
                display: flex;
                width: 60%;

                // width: 40%;
                .active {
                    background: #304c66;
                    border: 2px solid #248d9a;
                }

                a {
                    padding: 1% 3%;
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
            margin: 10% 0;

            .nodeBox {
                background-image: url("../../assets/left.png");
                background-size: 100% 100%;
                color: #cce6ff;
                height: 100px;
                width: 200px;
                position: relative;
                div {
                    text-align: center;
                    margin-top: 4%;
                }
            }
        }

        .nodeBot {
            display: flex;

            .nodeBotBox {
                width: 50%;
                color: #cce6ff;
                text-align: center;
            }

            // ul {
            //   list-style: none;
            //   display: flex;
            //   color: #cce6ff;
            //   flex-wrap: wrap;
            //   justify-content: space-around;
            //   .cun {
            //     margin: auto;
            //     display: block;
            //     text-align: center;
            //   }
            //   li {
            //     width: 48%;
            //     .callpolice {
            //       display: inline-block;
            //       width: 10px;
            //       height: 10px;
            //       background-image: url("../../assets/callpolice.png");
            //       background-size: 100% 100%;
            //     }
            //     // width: 45%;
            //   }
            //   // li::before {
            //   //   content: url("../../assets/callpolice.png");
            //   //   display: inline-block;
            //   //   vertical-align: middle;
            //   // }
            // }
        }

        .nodeBot1 {
            .nodeBotBox {
                text-align: center;
                color: #cce6ff;
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
            }
        }
    }

    // 节点数据监控
    .node {
        // height: 220px;

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
                    font-size: 18px;
                    font-weight: 600;
                    // width: 200px;
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