<template>
  <div>
    <div class="seleTile">
      <div class="eosBus">
        <div>
          <span>节点IP：</span> <Input placeholder="请输入节点IP"  v-model="make" style="width: 150px" />&nbsp;&nbsp;&nbsp;
          <!-- <span> 所在省份：</span>
          <Input v-model="nodeAddres" style="width: 150px" /> -->
        </div>
        <div>
          <Button type="primary" @click="search">查询</Button>&nbsp;&nbsp;&nbsp;
          <Button type="primary" @click="reset">重置</Button>

        </div>
      </div>
      <Table :columns="operColumns" :data="operationList">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">详情</Button>
        </template>
      </Table>
      <Page show-elevator show-sizer show-total class="page" placement="top" :total="dataCount" :page-size="pageParam.pageSize" :current.sync="pageParam.pageIndex" :page-size-opts="[10, 20, 40, 60, 100]" @on-change="changepage" style="text-align: right" @on-page-size-change="pageSizeChange" />
    </div>
    <Modal v-model="examine">
      <div>
        <p> <b>省节点名称：</b> {{examineContent.nodeAddress}}</p>
        <p> <b>cpu利用率：</b> {{examineContent.cpuUtilizationRate}}</p>
        <p> <b>内存利用率：</b> {{examineContent.memoryUtilizationRate}}</p>
        <p> <b>磁盘利用率：</b> {{examineContent.diskUtilizationRate}}</p>
      </div>

      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import { getNode } from '@/api/data';
export default {
  name: 'FabricMonitor',
  data () {
    return {
      examineContent: {},
      examine: false,
      model1: '',
      nodeAddres: '',
      pageParam: {
        pageSize: 10,
        pageIndex: 1
      },
      make: '',
      dataCount: 0,
      operColumns: [
        {
          title: 'IP',
          key: 'nodeIp'
        },

        {
          title: '端口',
          key: 'port'
        },
        {
          title: '状态',
          key: 'nodeStatus'
        }
        // {
        //   title: '健康度',
        //   key: 'nodeStatus'
        // }
      ],

      operationList: []
    };
  },

  mounted () {
    this.getOperationFun()
  },
  methods: {
    changepage (index) {
      this.pageParam.pageIndex = index
      this.getOperationFun()
    },
    pageSizeChange (size) {
      this.pageParam.pageSize = size
      this.getOperationFun()
    },
    msgInfo (type, content, closable = false) {
      this.$Message[type]({
        background: true,
        closable: closable,
        content: content
      })
    },
    getOperationFun () {
      getNode(this.pageParam.pageSize, this.pageParam.pageIndex, this.make, this.nodeAddres).then(res => {
        this.operationList = res.data.list
        this.dataCount = res.data.total
      })
    },
    reset () {
      this.make = ''
      this.nodeAddres = ''
      this.getOperationFun()
    },
    search () {
      this.getOperationFun()
    },
    show (index) {
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