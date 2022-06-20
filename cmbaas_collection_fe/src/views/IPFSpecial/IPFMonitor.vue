<template>
    <div>
        <div class="seleTile">
            <div class="eosBus">
                <div>
                    <span>节点IP：</span> <Input v-model="ipfsip" style="width: 150px" />&nbsp;&nbsp;&nbsp;
                    <span>状态：</span>
                    <Select v-model="model1" style="width:100px" @on-change='getstatus'>
                        <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>

                <div>
                    <Button type="primary" @click="search">查询</Button>&nbsp;&nbsp;&nbsp;
                    <Button type="primary" @click="reset">重置</Button>
                </div>
            </div>
            <Table :columns="operColumns" :data="operationList"></Table>
            <Page show-elevator show-sizer show-total :total="dataCount" placement="top"
                :page-size="page.pageParam.pageSize" :current.sync="page.pageParam.pageIndex"
                :page-size-opts="[10, 20, 40, 60, 100]" @on-change="changepage" style="text-align: right"
                @on-page-size-change="pageSizeChange" />
        </div>
    </div>
</template>

<script>
    import {
        getStorNode
    } from '@/api/data';
    export default {
        name: 'IPFMonitor',
        data() {
            return {
                ipfsip: '',
                model1: '',
                page: {
                    pageParam: {
                        "pageIndex": 1,
                        "pageSize": 10
                    }
                },
                status: [{
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
                        title: 'IP',
                        key: 'ip'
                    },
                    {
                        title: '状态',
                        key: 'nodeStatus'
                    },
                    {
                        title: '上传数量',
                        key: 'uploadNum'
                    }, {
                        title: '下载数量',
                        key: 'downloadNum'
                    }, {
                        title: '最新采集时间',
                        key: 'updateTime'
                    }
                ],
                operationList: []
            };
        },

        mounted() {
            this.getOperationFun()
        },
        methods: {
            msgInfo(type, content, closable = false) {
                this.$Message[type]({
                    background: true,
                    closable: closable,
                    content: content
                })
            },
            // 重置
            reset() {
                this.ipfsip = '',
                this.model1 = '',
                this.getOperationFun()
            },
            getstatus(e) {
                this.model1 = e
            },
            getOperationFun() {
                let ipsinfo = {
                    ipfsip: this.ipfsip,
                    pageParam: this.page.pageParam,
                    status: this.model1
                }
                getStorNode(ipsinfo).then(res => {
                    // let security = {
                    //   'ERROR': '不可用',
                    //   'OK': '正常'
                    // }
                    this.operationList = res.data.records
                    this.dataCount = res.data.total
                })
            },
            changepage(index) {
                this.page.pageParam.pageIndex = index
                this.getOperationFun()
            },
            pageSizeChange(size) {
                this.page.pageParam.pageSize = size
                this.getOperationFun()
            },
            search() {
                this.getOperationFun()
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