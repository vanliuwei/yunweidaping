<template>
    <div>
        <div class="seleTile">
            <div class="eosBus">
                <div>
                    <span>IPFS IP：</span> <Input v-model="ipfsip" style="width: 150px" />
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
        name: 'IPFGcMonitor',
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
                dataCount: 0,
                operColumns: [{
                        title: 'IP',
                        key: 'ip'
                    },
                    {
                        title: 'GC开始时间',
                        key: 'createTime'
                    },
                    {
                        title: 'GC结束时间',
                        key: 'gcEndTime'
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
            getOperationFun() {
                let ipsinfo = {
                    ipfsip: this.ipfsip,
                    pageParam: this.page.pageParam
                }
                getStorNode(ipsinfo).then(res => {
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