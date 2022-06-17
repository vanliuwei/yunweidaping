<template>
  <div>
    <div class="seleTile">
      <div class="eosBus">
        <div>
          <span>IPFS IP：</span> <Input v-model="ipfsip" style="width: 150px" />
        </div>
        <div>
          <Button type="primary" @click="search">查询</Button>
        </div>
      </div>
      <Table :columns="operColumns" :data="operationList"></Table>
      <Page show-elevator show-sizer show-total :total="dataCount" placement="top" :page-size="page.pageParam.pageSize" :current.sync="page.pageParam.pageIndex" :page-size-opts="[10, 20, 40, 60, 100]" @on-change="changepage" style="text-align: right" @on-page-size-change="pageSizeChange" />
    </div>

  </div>
</template>

<script>
import { getStorNode } from '@/api/data';
export default {
  name: 'IPFGcMonitor',
  data () {
    return {
      ipfsip: '',
      model1: '',
      page: { pageParam: { "pageIndex": 1, "pageSize": 10 } },
      dataCount: 0,
      operColumns: [
        {
          title: 'IP',
          key: 'nodeIp'
        },
        {
          title: 'GC开始时间',
          key: 'gcStartTime'
        },
        {
          title: 'GC结束时间',
          key: 'gcEndTime'
        }
        // {
        //   title: '状态',
        //   key: 'status',
        //   render: (h, params) => {
        //     const color =
        //       params.row.status === '启用' ? '#15AD31' : '#C7C7C7'
        //     return h(
        //       'Tag',
        //       {
        //         props: {
        //           type: 'dot',
        //           color: color
        //         },
        //         style: { marginLeft: '-8px' }
        //       },
        //       params.row.status
        //     )
        //   }
        // }
      ],
      operationList: []
    };
  },

  mounted () {
    this.getOperationFun()
  },
  methods: {
    msgInfo (type, content, closable = false) {
      this.$Message[type]({
        background: true,
        closable: closable,
        content: content
      })
    },
    getOperationFun () {
      let ipsinfo = {
        ipfsip: this.ipfsip,
        pageParam: this.page.pageParam
      }
      getStorNode(ipsinfo).then(res => {
        this.operationList = res.data.records
        this.dataCount = res.data.total
      })
    },
    changepage (index) {
      this.page.pageParam.pageIndex = index
      this.getOperationFun()
    },
    pageSizeChange (size) {
      this.page.pageParam.pageSize = size
      this.getOperationFun()
    },
    search () {
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