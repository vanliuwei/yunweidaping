<template>
    <div>
        <div class="seleTile">
            <div class="eosBus">
                <div>
                    <span>告警指标：</span> <Input v-model="ipfsip" style="width: 150px" />&nbsp;&nbsp;&nbsp;
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

            <Page show-elevator show-sizer show-total :total="dataCount" :page-size="pageParam.pageSize"
                :current.sync="pageParam.pageIndex" :page-size-opts="[10, 20, 40, 60, 100]" @on-change="changepage"
                style="text-align: right" @on-page-size-change="pageSizeChange" />
        </div>

    </div>
</template>

<script>
    import {
        AlarmRules
    } from '@/api/data';
    export default {
        name: 'Eosbusiness',
        data() {
            return {
                examineContent: {},
                examine: false,
                model1: '',
                ipfsip: '',
                model1: '',
               
                dataCount: 0,
                pageParam: {
                    pageSize: 10,
                    pageIndex: 1
                },
                status: [{
                        value: '一般',
                        label: '一般'
                    },
                    {
                        value: '主要',
                        label: '主要'
                    },
                    {
                        value: '严重',
                        label: '严重'
                    },
                ],
                make: '',
                dataCount: 0,
                operColumns: [

                    {
                        title: '告警指标',
                        key: 'alertIndicator'
                    },
                    {
                        title: '指标类型',
                        key: 'indicatorType',
                        tooltip: true
                    }, {
                        title: '告警级别',
                        key: 'alertLevel',
                        tooltip: true
                    }, {
                        title: '采集频率',
                        key: 'acquisitionFrequency'
                    }, {
                        title: '告警触发条件',
                        key: 'triggeringConditions',
                        tooltip: true
                    }, {
                        title: '告警方式',
                        key: 'alarmMethod'
                    }
                ],

                operationList: []
            };
        },

        mounted() {
            this.getOperationFun()
        },
        methods: {
           
            // 重置
            reset() {
                this.ipfsip = '',
                    this.model1 = '',
                    this.getOperationFun()
            },
            getstatus(e) {
                this.model1 = e
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
            msgInfo(type, content, closable = false) {
                this.$Message[type]({
                    background: true,
                    closable: closable,
                    content: content
                })
            },
            getOperationFun() {
                let page = {
                    pageParam: this.pageParam,
                    alertLevel: this.model1,
                    alertIndicator: this.ipfsip
                }
                AlarmRules(page).then(res => {
                    this.operationList = res.data.records
                    this.dataCount = res.data.total

                })

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