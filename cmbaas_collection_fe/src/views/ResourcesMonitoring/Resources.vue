<template>
    <div>
        <div class="seleTile">
            <div class="eosBus">
                <div>
                    <span>链名称：</span>
                    <Select v-model="lian" style="width:200px">
                        <Option v-for="item in healths" :value="item.id" :key="item.chain_name">
                            {{ item.chain_name }}</Option>
                    </Select>&nbsp;&nbsp;&nbsp;
                    <span>主机IP：</span> <Input placeholder="请输入主机IP"  v-model="make" style="width: 150px" />
                </div>
                <div>
                    <Button type="primary" @click="search">查询</Button> &nbsp;&nbsp;&nbsp;
                    <Button type="primary" @click="down">导出</Button>
                </div>
            </div>
            <Table :columns="operColumns" :data="operationList">

            </Table>
            <Page show-elevator show-sizer show-total class="page" placement="top" :total="dataCount"
                :page-size="pageParam.pageSize" :current.sync="pageParam.pageIndex"
                :page-size-opts="[10, 20, 40, 60, 100]" @on-change="changepage" style="text-align: right"
                @on-page-size-change="pageSizeChange" />
        </div>

    </div>
</template>

<script>
    import {
        getResources,
        getResourcesDown,
        getList,
    } from '@/api/data';
    export default {
        name: 'Eosbusiness',
        data() {
            return {
                lian: '',
                examineContent: {},
                examine: false,
                model1: '',
                pageParam: {
                    pageSize: 10,
                    pageIndex: 1
                },
                make: '',
                dataCount: 0,
                operColumns: [{
                        title: '链名称',
                        key: 'chainName'
                    },

                    {
                        title: '主机IP',
                        key: 'hostIp'
                    },

                    {
                        title: '物理位置',
                        key: 'address'
                    },
                    {
                        title: '采集时间',
                        key: 'collectionTime',
                        tooltip: true
                    }, {
                        title: 'CPU利用率',
                        key: 'cpuUtilizationRate',
                        tooltip: true
                    }, {
                        title: '磁盘总量',
                        key: 'diskCount'
                    },
                    {
                        title: '磁盘已使用',
                        key: 'diskUsage'
                    },
                    {
                        title: '磁盘利用率',
                        key: 'diskUtilizationRate',
                        tooltip: true
                    }, {
                        title: '内存总量',
                        key: 'memoryCount'
                    }, {
                        title: '内存已使用',
                        key: 'memoryUsage'
                    }, {
                        title: '内存利用率',
                        key: 'memoryUtilizationRate',
                        tooltip: true
                    }
                ],
                healths:[],
                operationList: []
            };
        },

        mounted() {
            this.getOperationFun()
            this.getchain()
        },
        methods: {
            getchain() {
                getList().then((res) => {
                    this.healths = res.data.data
                })
            },
            changepage(index) {
                this.pageParam.pageIndex = index
                this.getOperationFun()
            },
            pageSizeChange(size) {
                this.pageParam.pageSize = size
                this.getOperationFun()
            },
            msgInfo(type, content, closable = false) {
                this.$Message[type]({
                    background: true,
                    closable: closable,
                    content: content
                })
            },
            getOperationFun() {
                getResources(this.pageParam.pageSize, this.pageParam.pageIndex,this.lian,this.make).then(res => {
                    this.operationList = res.data.list
                    this.dataCount = res.data.total
                })
            },
            search() {
                this.getOperationFun()
            },
            down() {
                getResourcesDown().then((res) => {
                    // let blob = new Blob([res.data])
                    // let downloadElement = document.createElement('a')
                    // let href = window.URL.createObjectURL(blob,{type: ".xlsx",})
                    // downloadElement.href = href
                    // downloadElement.setAttribute("download", '资源监测报表.xlsx');
                    // document.body.appendChild(downloadElement)
                    // downloadElement.click()
                    // document.body.removeChild(downloadElement)
                    // window.URL.revokeObjectURL(href)

                    let blob = new Blob([res.data]);
                    let a = document.createElement("a"); //在dom树上创建一个a标签
                    a.href = window.URL.createObjectURL(blob, {type: ".xlsx",}); //将url赋值给a标签的href属性
                    a.download = "资源监测报表.xlsx"; //设置设置下载文件的名称
                    a.click(); //主动触发a标签点击事件

                })
            },
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