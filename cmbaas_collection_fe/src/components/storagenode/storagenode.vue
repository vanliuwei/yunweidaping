<template>
    <!-- 存储节点状态 -->
    <div class="tps storage">
        <div class="head">
            <div class="head_left">
                <div class="head_left_box">
                    <span></span>
                    <div class="left_txt">存储节点状态</div>
                     <img class="icon_t" src="../../assets/icon.png" />
                </div>
                <div class="head_left_box">
                    <!-- <div @click="storModal = true" class="left_txt">更多</div> -->
                    <div class="more" @click='storModal = true'>更多&nbsp;&nbsp;<div>﹀</div></div>
                </div>
            </div>
        </div>
        <div>
            <Table height="210" :columns="stockTitle" :data="stockData" class="com_table">
                <template slot-scope="{ row }" slot="ip">
                    <p class="flex">
                        <span class="com_circle" :style="{ backgroundColor: ralte[row.status] }"></span>
                        <span>{{ row.nodeIp }}</span>
                    </p>
                </template>
                <template slot-scope="{ row, index }" slot="status">
                    <span :style="{ color: ralteStatus[row.status] }">{{
            row.nodeStatus
          }}</span>
                </template>
            </Table>
        </div>
        <Modal v-model="storModal" class-name="vertical-center-modal" width="835" footer-hide>
            <p slot="header">
               <span class="head_title">存储节点状态</span>
               <img src="../../assets/icon.png" />
            </p>
            <Table height="260" :columns="stockTitle" :data="stockData" class="com_table">
                <template slot-scope="{ row }" slot="ip">
                    <p class="flex">
                        <span class="com_circle" :style="{ backgroundColor: ralte[row.status] }"></span>
                        <span>{{ row.nodeIp }}</span>
                    </p>
                </template>
                <template slot-scope="{ row, index }" slot="status">
                    <span :style="{ color: ralteStatus[row.status] }">{{
            row.nodeStatus
          }}</span>
                </template>
            </Table>
        </Modal>
    </div>
</template>

<script>
    import {
        getStorNode
    } from "@/api/data";
    let ralte = {
        正常: "blue",
        不可用: "#ff0000",
        一般: "blue",
    };
    let ralteStatus = {
        正常: "#cce6ff",
        不可用: "#ff0000",
    };
    export default {
        name: "storagenode",
        data() {
            return {
                ralte: Object.freeze(ralte),
                ralteStatus: Object.freeze(ralteStatus),
                // 存储节点状态表头
                storModal: false,
                page: {
                    pageParam: {
                        pageIndex: 1,
                        pageSize: 10
                    }
                },
                stockTitle: [{
                        title: "IP",
                        fixed: "left",
                        width: 70,
                        slot: "ip",
                    },
                    {
                        title: "状态",
                        width: 80,
                        slot: "status",
                    },
                    // {
                    //   title: '存储占比',
                    //   width: 150,
                    //   key: 'storageRatio'
                    // },
                    {
                        title: "上传交易量",
                        width: 120,
                        key: "uploadNum",
                    },
                    {
                        title: "下载交易量",
                        key: "downloadNum",
                        width: 120,
                    },
                    {
                        title: "gc开始时间",
                        width: 120,
                        key: "gcStartTime",
                    },
                    {
                        title: "gc结束时间",
                        width: 120,
                        key: "gcStartTime",
                    },
                    {
                        title: "gc释放空间大小",
                        width: 150,
                        key: "storageRatio",
                    },
                ],
                stockData: [
                    // {
                    //   downloadNum: 18,
                    //   gcEndTime: "2021-11-01 12:12:00",
                    //   gcStartTime: "2021-11-01 12:12:00",
                    //   nodeIp: "10.0.42.60",
                    //   nodeStatus: "正常",
                    //   uploadNum: 19,
                    //   storageRatio: '3742478kb'
                    // },
                    // {
                    //   downloadNum: 14,
                    //   gcEndTime: "2021-11-01 12:12:00",
                    //   gcStartTime: "2021-11-01 12:12:00",
                    //   nodeIp: "10.0.42.61",
                    //   nodeStatus: "正常",
                    //   uploadNum: 14,
                    //   storageRatio: '3742490kb'
                    // }
                ],
            };
        },

        methods: {
            getnode() {
                getStorNode(this.page)
                    .then((res) => {
                        if (res.status == 200) {
                            let security = {
                                ERROR: "不可用",
                                OK: "正常",
                            };
                            let datas = res.data.records.map((item) => {
                                if (!item.nodeStatus) {
                                    item.nodeStatus = "ERROR";
                                    return {
                                        ...item,
                                        nodeStatus: security[item.nodeStatus],
                                    };
                                } else {
                                    return {
                                        ...item,
                                        nodeStatus: security[item.nodeStatus],
                                    };
                                }
                                // return {
                                //   ...item,
                                //   nodeStatus: security[item.nodeStatus],
                                // }
                            });
                            this.stockData = datas;
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
            setTimeout(() => {
                let table = document.getElementsByClassName("ivu-table-body");
                let timer = null;
                let _this = this;

                function play() {
                    clearInterval(timer);
                    timer = setInterval(() => {
                        if (table[1]) {
                            table[1].scrollTop++;
                            if (table[1].scrollTop >= (_this.stockData.length - 5) * 40 + 27) {
                                table[1].scrollTop = 0;
                            }
                        }
                    }, 100);
                }
                setTimeout(play, 500);
                table[1].onmouseover = function () {
                    clearInterval(timer);
                };
                table[1].onmouseout = play;
            }, 0);
            this.getnode();

            this.timer = setInterval(() => {
                this.getnode();
            }, 5000);
        },
        beforeDestroy() {
            clearInterval(this.timer);
        },
    };
</script>

<style lang="less" scoped>
    /deep/.ivu-modal-header{
        padding:20px 20px 0 20px;
        border-bottom: none;
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
    // 表格样式
    .com_table {
        margin:0px 15px 15px 15px;
        /deep/.ivu-table {
            color: #cce6ff;
            font-size: 14px;
            background-color: transparent !important;

            td,
            th {
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

        /deep/.ivu-table-fixed::before {
            background-color: transparent !important;
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
            height: 8px;
        }

        /* 滚动槽 */
        ::-webkit-scrollbar-track {
            border-radius: 10px;
        }

        // 滚动条颜色
        ::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background-color: #1b6097;
        }

        /deep/.ivu-table th {
            background-color: transparent !important;
        }
    }

    // 公用的框
    .tps {
        position: relative;
        width: 430px;
        color: #ffccff60;
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

    // 存储
    .storage {
        width: 100%;
        // height: 262px;
        height: 30%;
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
                justify-content: space-between;
                box-sizing: border-box;
                padding-right: 3%;
                width: 100%;

                .head_left_box {
                    display: flex;

                    .left_txt {
                         font-size: 18px;
                        font-weight: 600;
                        color: #cce6ff;
                        cursor: pointer;
                    }
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

            span {
                display: inline-block;
                margin-right: calc((100vw / 1920) * 7);
                width: calc((100vw / 1920) * 4);
                height: calc((100vw / 1920) * 24);
                background-image: linear-gradient(180deg, #32eafe 0%, #0293e1 100%);
            }
        }
    }

    // 对话框
    /deep/.ivu-modal-content {
        background-color: #05062a;
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

    /deep/.ivu-modal-header-inner {
        color: #cce6ff;
    }
</style>