<template>

    <div class="tps info">

        <div class="head">
            <div class="head_left">
                <div class="head_left_box">
                    <span></span>
                    <div class="left_txt">告警信息</div>
                     <img class="icon_t" src="../../assets/icon.png" />
                </div>
                <div class="head_left_box">
                    <!-- <div class="left_txt" @click='repModal=true'>更多</div> -->
                    <div class="more" @click='repModal = true'>更多&nbsp;&nbsp;<div>﹀</div></div>
                </div>
            </div>
        </div>
        <div>
            <Table height="260" :columns="reportTitle" :data="reportData" class="com_table">
                <template slot-scope="{ row }" slot="ip">
                    <p class="flex">
                        <span class="com_circle" :style="{backgroundColor:ralte[row.addrank]}"></span>
                        <span>{{ row.ip }}</span>
                    </p>
                </template>
            </Table>
        </div>
        <Modal  v-model="repModal" class-name="vertical-center-modal" width="660" footer-hide>
            <p slot="header">
               <span class="head_title">告警信息</span>
               <img src="../../assets/icon.png" />
            </p>
            <Table height="260" :columns="reportTitle" :data="reportData" class="com_table">
                <template slot-scope="{ row }" slot="ip">
                    <p class="flex">
                        <span class="com_circle" :style="{backgroundColor:ralte[row.addrank]}"></span>
                        <span>{{ row.ip }}</span>
                    </p>
                </template>

            </Table>
            <!-- <Page :total="100" show-sizer size="small" @on-change='reporDataIndex' @on-page-size-change='reporDataSize' /> -->
        </Modal>
    </div>

</template>

<script>
    import {
        getReport
    } from '@/api/data';

    let ralte = {
        "正常": "blue",
        "不可用": "#BE464C",
        "一般": "blue",
    }

    export default {
        name: 'report',
        data() {
            return {
                ralte: Object.freeze(ralte),
                repModal: false,
                report: {
                    pageParam: {
                        pageSize: 5,
                        pageIndex: 1
                    },
                },

                reportTitle: [

                    {
                        title: '告警摘要',
                        key: 'summary',
                        tooltip: true,
                    },
                    {
                        title: '告警级别',
                        key: 'alertLevel',
                    },
                    {
                        title: '告警描述',
                        key: 'description',
                        tooltip: true
                    }
                ],
                reportData: [
                    // {
                    //   summary: 'cmitshuankzq 的ram资源使用过高',
                    //   alertLevel: '一般(Minor)',
                    //   description: '账户: cmitshuankzq的ram资源使用量 > 65% '
                    // },
                    // {
                    //   summary: 'cmcccsvczxyw 的ram资源使用过高',
                    //   alertLevel: '主要(Major）',
                    //   description: '账户: cmcccsvczxyw的ram资源使用量 > 75%'
                    // },
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
                        if (table[2]) {
                            table[2].scrollTop++;
                            if ((table[2].scrollTop) >= (((_this.reportData.length - 6) * 40) + 24)) {
                                table[2].scrollTop = 0;
                            }
                        }

                    }, 100)
                }
                setTimeout(play, 500);
                table[2].onmouseover = function () {
                    clearInterval(timer)
                };
                table[2].onmouseout = play;
            }, 0)
            this.getPro()

        },
        methods: {
            getPro() {
                getReport().then(res => {
                    if (res.status == 200) {
                        this.reportData = res.data
                    }
                })
            },
            reporDataIndex(index) {
                this.report.pageParam.pageIndex = index
                this.getPro()
            },
            reporDataSize(index) {
                this.report.pageParam.pageSize = index
                this.getPro()
            }
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
    .tps {
        position: relative;
        width: 100%;
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
    }

    .info {
        width: 100%;
        height: 290px;
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

    // 表格样式
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

    /deep/.ivu-table-cell {
        padding-right: 0;
    }

    // 分页样式
    /deep/.ivu-page {
        text-align: right;

        li {
            background-color: #05062a;
        }

        .ivu-select-selected-value {
            background-color: #05062a;
            border: 1px solid #05062a;
            color: #cce6ff;
        }

        .ivu-select-dropdown {
            background-color: #05062a;
        }
    }
</style>