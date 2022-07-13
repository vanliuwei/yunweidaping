<template>
    <div>
        <div class="seleTile">
            <div class="eosBus">
                <div>
                    <span>链名称：</span>
                    <Select v-model="chainNames" style="width:200px" >
                        <Option v-for="item in healths" :value="item.chain_name" :key="item.chain_name">{{ item.chain_name }}</Option>
                    </Select>
                    &nbsp;&nbsp;&nbsp;
                    <span>节点IP：</span> <Input placeholder="请输入节点IP" v-model="make" style="width: 150px" />
                    &nbsp;&nbsp;&nbsp;
                    <span>节点状态：</span>
                    <Select v-model="nodeStatus" style="width:200px" @on-change='getstatus'>
                        <Option v-for="item in health" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>

                    <!-- <span> 健康度：</span>
            <Select v-model="nodeStatus" style="width:200px" @on-change='getstatus'>
                <Option v-for="item in health" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select> -->
                </div>
                <div>
                    <Button type="primary" @click="search">查询</Button>&nbsp;&nbsp;&nbsp;
                    <Button type="primary" @click="reset">重置</Button>
                </div>
            </div>
            <Table :columns="operColumns" :data="operationList"> </Table>
            <Page show-elevator show-sizer show-total :total="dataCount" placement="top" :page-size="pageParam.pageSize"
                :current.sync="pageParam.pageIndex" :page-size-opts="[10, 20, 40, 60, 100]" @on-change="changepage"
                style="text-align: right" @on-page-size-change="pageSizeChange" />
        </div>

    </div>
</template>

<script>
    import {
        getEosnodes,getList
    } from '@/api/data';
    export default {
        name: 'Eosnode',
        data() {
            return {
                chainNames:'',
                make: '',
                nodeStatus: '',
                pageParam: {
                    pageSize: 10,
                    pageIndex: 1
                },
                healths:[],
                health: [{
                        value: 'OK',
                        label: 'OK'
                    },
                    {
                        value: 'ERROR',
                        label: 'ERROR'
                    },
                ],
                dataCount: 0,
                operColumns: [{
                        title: '链名称',
                        key: 'nodeIp'
                    },
                    {
                        title: '节点IP',
                        key: 'nodeIp'
                    },
                    {
                        title: '节点类型',
                        key: 'nodeIp'
                    },
                    {
                        title: '端口',
                        key: 'port'
                    },
                    {
                        title: '节点状态',
                        key: 'port'
                    },
                    {
                        title: 'CPU利用率',
                        key: 'cpuUtilizationRate'
                    },
                    {
                        title: '内存利用率',
                        key: 'memoryUtilizationRate'
                    }, {
                        title: '磁盘利用率',
                        key: 'diskUtilizationRate'
                    }, {
                        title: '区块高度',
                        key: 'blockNum'
                    },
                ],
                operationList: []
            };
        },

        mounted() {
            this.getOperation()
            this.getchain()
        },
        methods: {
            getchain(){
                getList().then((res)=>{
                    this.healths = res.data.data
                })
            },
            changepage(index) {
                this.pageParam.pageIndex = index
                this.getOperation()
            },
            pageSizeChange(size) {
                this.pageParam.pageSize = size
                this.getOperation()
            },
            msgInfo(type, content, closable = false) {
                this.$Message[type]({
                    background: true,
                    closable: closable,
                    content: content
                })
            },
            getstatus(e) {
                this.nodeStatus = e
            },
            reset() {
                this.nodeStatus = ''
                this.make = ''
                this.chainNames = ''
                this.getOperation()
            },
            getOperation() {
                console.log(this.make,"make")
                let data = {
                    pageSize: this.pageParam.pageSize,
                    pageIndex: this.pageParam.pageIndex,
                    nodeStatus: this.nodeStatus,
                    ips: this.make,
                    chainNames: this.chainNames
                }
                getEosnodes(this.pageParam.pageSize,this.pageParam.pageIndex,this.nodeStatus,this.make,this.chainNames).then(res => {
                    this.operationList = res.data.list
                    this.dataCount = res.data.total
                })
            },
            search() {
                this.getOperation()
            }
        },
    };
</script>

<style lang="less" scoped>
    .seleTile {
        margin: 3%;
    }

    .eosBus {
        display: flex;
        justify-content: space-between;
    }

    /deep/.ivu-tag-dot {
        border: 1px none #e8eaec !important;
        background: transparent !important;
    }

    /deep/.ivu-tag {
        font-size: inherit !important;
    }
</style>