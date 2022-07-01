<template>
    <div>
        <div class="body">
            <div class="title">
                <div class="titleTop">
                </div>
                <div class="titleTop" >
                    运&nbsp;&nbsp;维&nbsp;&nbsp;监&nbsp;&nbsp;测&nbsp;&nbsp;平&nbsp;&nbsp;台
                    <!-- 运&nbsp;&nbsp;&nbsp; 维&nbsp;&nbsp;&nbsp; 监&nbsp;&nbsp;&nbsp; 控&nbsp;&nbsp;&nbsp; 平 &nbsp;&nbsp;&nbsp;台 -->
                </div>
                <div class="titleTopRight">
                    <div>
                        <span> 切换数据来源 </span>
                        <Select v-model="chainvalue" style="width:100px" class="com_select" @on-change="changechain">
                            <Option v-for="item in chain" :value="item.id" :key="item.chain_name">{{ item.chain_name}}
                            </Option>
                        </Select>
                    </div>
                </div>
                <!-- <div class="title_right"> -->
                    <!-- <div class="head_right_text">
            地区范围
            <Select v-model="regionvalue" style="width:100px" class="com_select ">
              <Option v-for="item in region" :value="item" :key="item">{{ item}}</Option>
            </Select>
          </div>
          <div class="head_right_text">
            引擎
            <Select v-model="enginevalue" style="width:100px" class="com_select ">
              <Option v-for="item in engine" :value="item" :key="item">{{ item}}</Option>
            </Select>
          </div> -->
                    <!-- <div class="head_right_text">
            链名称
            <Select v-model="chainvalue" style="width:100px" class="com_select ">
              <Option v-for="item in chain" :value="item" :key="item">{{ item}}</Option>
            </Select>
          </div> -->
                <!-- </div> -->

            </div>
            <div class="content">
                <!-- left -->
                <div class="contentBoy">
                    <!-- <Iviewapi ref = 'Iviewapi'/> -->
                    <!-- 节点数据监控 -->
                    <NodeData ref = 'NodeData'/>
                    <!-- 峰值监控 -->
                    <Peak  ref = 'Peak' />
                    <!-- 性能监控 -->
                    <Property  ref = 'Property' />
                </div>
                <div class="contentBoyC">
                    <MapData ref = 'MapData'/>
                </div>
                <!-- 中间 -->
                <!-- <div class="map_main"> -->
                <!-- 地图 -->
                <!-- </div> -->
                <!-- 右边 -->
                <div class="contentBoy">
                    <!-- 存储节点状态 -->
                    <Storage  ref="Storage"/>
                    <!-- 业务平台智能合约 -->
                    <Business ref="Business"/>
                    <!-- 告警信息 -->
                    <Report ref="Report"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import NodeData from '_c/node/nodedata';
    import Peak from '_c/peakmon/peak';
    import Property from '_c/property/property';
    import MapData from '_c/mapdata/mapdata';
    import Business from '_c/business/business';
    import Storage from '_c/storagenode/storagenode';
    import Report from '_c/report/report';
    import Iviewapi from '_c/iviewapi/iviewapi';
    import {
        getList,
        checkChain
    } from '@/api/data';
    export default {
        name: "monitor",
        components: {
            NodeData, //节点数据监控
            Peak, //峰值监控
            Property, // 性能监控
            MapData, //地图
            Business, // 业务平台
            Storage, // 存储节点
            Report, //告警
            Iviewapi
        },
        data() {
            return {
                region: [
                    "北京",
                    "安徽"
                ],
                regionvalue: '',
                // 引擎
                engine: [
                    "北京",
                    "安徽"
                ],
                enginevalue: '',
                // 链名称
                //   chain: ["cmbass", "prod.b"],
                chain: [],
                chainvalue: 'cmbass',
            };
        },
        methods: {
            getchain() {
                getList().then(res => {
                    this.chain = res.data.data
                    this.chainvalue = res.data.data[0].id
                })
            },
            changechain() {
                checkChain(this.chainvalue).then((res) => {
                    //更新数据
                    this.$refs.NodeData.getNode()
                    this.$refs.Peak.getTime()
                    this.$refs.Property.getPro()


                    this.$refs.Storage.getnode()
                    this.$refs.Business.get()
                    this.$refs.Report.get()
                })
            }
        },
        mounted() {
            // this.timer = setInterval(() => {
            //   this.getNode()
            // }, 5000);
            this.getchain()
        },
        beforeDestroy() {
            clearInterval(this.timer);
        },

    };
</script>
<style lang='less' scoped>
    html,
    body {
        width: 100%;
        height: 100%;
        font-family: "Noto Sans SC";
        font-style: normal;
    }

    .body {
        width: 100%;
        background: url("../assets/background.png");
        background-size: 100% 100%;

        // display: flex;
        .title {
            height: 60px;
            width: 100%;
            background: url("../assets/top.png");
            background-size: 100% 100%;
            display: flex;
            margin-bottom:20px;
            // justify-content: space-between;
            .titleTop {
                width: 33%;
                text-align: center;
                font-size: 38px;
                color: #cce6ff;
            }

            .titleTopRight {
                span {
                    font-size: 16px;
                    margin-right: 10px;
                }

                width: 33%;
                text-align: center;
                color: #cce6ff;
                box-sizing: border-box;
                // padding-top: 0.5%;
                padding-right: 2%;
                display: flex;
                align-items: center;
                flex-direction: row-reverse;
            }

            .head_right_text {
                color: #cce6ff;

                .top_select {
                    width: 100px;
                }
            }

            .title_right {
                display: flex;
                margin-right: 5%;
                margin-top: 3px;
            }
        }

        .content {
            padding: 0 28px 50px 28px;
            display: flex;
            justify-content: space-between;

            .contentBoy {
                width: 29%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }

            .contentBoyC {
                width: 40%;
            }

            // justify-content: space-between;
        }
    }

    // 公共下拉样式
    .com_select {
        width: 140px;
        background-color: transparent;
        border-radius: calc((100vw / 1920) * 4);
        color: #cce6ff;

        /deep/.ivu-select-selection {
            background-color: transparent !important;
            height: 25px;
            border-color: #15477a;
        }

        /deep/.ivu-select-selected-value {
            height: 20px;
            line-height: 20px;
        }

        /deep/.ivu-select-placeholder {
            height: 20px;
            line-height: 20px;
        }
    }
</style>