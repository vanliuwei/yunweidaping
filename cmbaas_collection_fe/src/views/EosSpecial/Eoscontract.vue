<template>
    <div>
        <div class="seleTile">
            <div class="eosBus">
                <div>
                    <span>链名称：</span>
                    <Select v-model="chainNames" style="width:200px" @on-change='getstatus'>
                        <Option v-for="item in health" :value="item.chain_name" :key="item.chain_name">{{ item.chain_name }}</Option>
                    </Select>
                    &nbsp;&nbsp;&nbsp;
                    <span>合约名称：</span> <Input placeholder="请输入合约名称" v-model="make" style="width: 150px" />
                </div>
                <div>
                    <Button type="primary" @click="search">查询</Button>&nbsp;&nbsp;&nbsp;
                    <Button type="primary" @click="reset">重置</Button>
                </div>
            </div>
            <Table :columns="operColumns" :data="operationList">
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
                </template>
            </Table>

            <Page show-elevator show-sizer class="page" placement="top" show-total :total="dataCount"
                :page-size="pageParam.pageSize" :current.sync="pageParam.pageIndex"
                :page-size-opts="[10, 20, 40, 60, 100]" @on-change="changepage" style="text-align: right"
                @on-page-size-change="pageSizeChange" />
            <Modal v-model="examine">
                <div>
                    <p> <b>合约名称：</b> {{examineContent.chainAccount}}</p>
                    <!-- <p> <b>合约类型：</b> {{examineContent.accountType}}</p> -->
                    <p> <b>CPU总量：</b> {{examineContent.cpuTotal}}</p>
                    <p> <b>CPU使用量：</b> {{examineContent.cpuUsage}}</p>
                    <p> <b>NET总量：</b> {{examineContent.netTotal}}</p>
                    <p> <b>NET使用量：</b> {{examineContent.netUsage}}</p>
                    <p> <b>内存总量：</b> {{examineContent.ramTotal}}</p>
                    <p> <b>内存使用量：</b> {{examineContent.ramUsage}}</p>
                </div>

                <div slot="footer"></div>
            </Modal>
        </div>

    </div>
</template>

<script>
    import {
        Eoscontracts,getList
    } from '@/api/data';
    export default {
        name: 'Eoscontract',
        data() {
            return {
                chainNames:'',
                make: '',
                examine: false,
                health: [
                ],
                pageParam: {
                    pageSize: 10,
                    pageIndex: 1
                },
                examineContent: {},
                dataCount: 0,
                operColumns: [{
                        title: '链名称',
                        key: 'chainAccount'
                    },
                    {
                        title: '合约名称',
                        key: 'chainAccount'
                    },
                    {
                        title: '合约类型',
                        key: 'accountType'
                    },
                    {
                        title: 'CPU使用率',
                        key: 'cpuUtilizationRate'
                    },
                    {
                        title: '内存使用率',
                        key: 'ramUtilizationRate'
                    },
                    {
                        title: 'NET使用率',
                        key: 'netUtilizationRate'
                    },
                    {
                        title: '最新采集时间',
                        key: 'netUtilizationRate'
                    },
                    {
                        title: '详情',
                        slot: 'action'
                    },
                ],
                operationList: []
            };
        },

        mounted() {
            this.getOperationFun()
            this.getchain()
        },
        methods: {
            getstatus(){

            },
            getchain(){
                getList().then((res)=>{
                    this.health = res.data.data
                })
            },
            msgInfo(type, content, closable = false) {
                this.$Message[type]({
                    background: true,
                    closable: closable,
                    content: content
                })
            },
            reset() {
                this.make = '',
                this.chainNames = ''
                this.getOperationFun()
            },
            getOperationFun() {
                Eoscontracts(this.pageParam.pageSize,this.pageParam.pageIndex,this.make,this.chainNames).then(res => {
                    this.operationList = res.data.list
                    this.dataCount = res.data.total
                })
               

            },
            search() {
                this.getOperationFun()
            },
            changepage(index) {
                this.pageParam.pageIndex = index
                this.getOperationFun()
            },
            pageSizeChange(size) {
                this.pageParam.pageSize = size
                this.getOperationFun()
            },
            show(index) {
                this.examine = true
                this.examineContent = this.operationList[index]

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