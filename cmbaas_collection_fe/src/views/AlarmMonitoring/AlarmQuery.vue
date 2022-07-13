<template>
    <div>
        <div class="seleTile">
            <div  class="eosBus">
                <div>
                     <span>链名称：</span>
                    <Select v-model="lian" style="width:100px" @on-change='getstatus'>
                        <Option v-for="item in healths" :value="item.chain_name" :key="item.chain_name">{{ item.chain_name }}</Option>
                    </Select>
                    &nbsp;&nbsp;&nbsp;
                    
                    <span>告警级别：</span>
                    <Select v-model="model1" style="width:100px" @on-change='getstatus'>
                        <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select> &nbsp;&nbsp;&nbsp;
                    <span>时间：</span>
                    <DatePicker type="date" style=" vertical-align: baseline" :value="time"
                            format="yyyy-MM-dd" @on-change='gettime'></DatePicker>&nbsp;&nbsp;&nbsp;
                    <span>告警指标：</span> <Input placeholder="请输入告警指标"  v-model="ipfsip" style="width: 150px" />
                    
                </div>
                
                <div>
                    <Button type="primary" @click="search">查询</Button>&nbsp;&nbsp;&nbsp;
                    <Button type="primary" @click="reset">重置</Button>

                </div>
            </div>
            <Table :columns="operColumns" :data="operationList"> </Table>
            
            <!-- <Page show-elevator show-sizer show-total class="page" placement="top" :total="dataCount" :page-size="pageParam.pageSize" :current.sync="pageParam.pageIndex" :page-size-opts="[10, 20, 40, 60, 100]" @on-change="changepage" style="text-align: right" @on-page-size-change="pageSizeChange" /> -->
        </div>
    </div>
</template>

<script>
    
    import { getReport,getList,listAlertMessageAll } from "@/api/data";
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
        name: "Eosbusiness",
        data() {
            return {
                lian:'',
                healths: [],
                time: '',
                ipfsip: '',
                examineContent: {},
                examine: false,
                model1: "",
                pageParam: {
                    pageSize: 10,
                    pageIndex: 1,
                },
               status: [
                    {
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
                make: "",
                dataCount: 0,
                operColumns: [{
                        title: "告警摘要",
                        key: "summary",
                        tooltip: true,
                    },
                    {
                        title: "告警级别",
                        key: "alertLevel",
                    },
                    {
                        title: "告警描述",
                        key: "description",
                        tooltip: true,
                    },
                ],

                operationList: [],
            };
        },

        mounted() {
            this.getOperationFun();
            this.getchain()
        },
        methods: {
            getchain() {
                getList().then((res) => {
                    this.healths = res.data.data
                })
            },
            gettime(val) {
                this.time = val
            },
            getstatus() {

            },
            changepage(index) {
                this.pageParam.pageIndex = index;
                this.getOperationFun();
            },
            pageSizeChange(size) {
                this.pageParam.pageSize = size;
                this.getOperationFun();
            },
            msgInfo(type, content, closable = false) {
                this.$Message[type]({
                    background: true,
                    closable: closable,
                    content: content,
                });
            },
            getOperationFun() {
                console.log(this.time,"111111111")
                listAlertMessageAll(this.lian,this.model1,this.ipfsip,this.time).then((res) => {
                    if (res.status == 200) {
                        this.operationList = res.data;
                    }
                });
            },
            reset() {
                this.lian = ''
                this.model1 = ''
                this.ipfsip = ''
                this.time = ''
                this.getOperationFun()
            },
            search() {
                this.getOperationFun()
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