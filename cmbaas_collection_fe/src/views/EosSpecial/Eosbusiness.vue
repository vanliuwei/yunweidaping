<template>
  <div>
    <div class="seleTile">
      <div class="eosBus">
        <div>
          <span>区块号：</span> <Input v-model="make" style="width: 150px" /> <span class="top">(如果没有数据，是因为当前块没有数据，它查询的是当前块的业务，同时也可以检索之前块的业务)</span>
        </div>
        <div>
          <Button type="primary" @click="search">查询</Button>
        </div>
      </div>
      <Table :columns="operColumns" :data="operationList"></Table>
      <Page show-elevator show-sizer show-total class="page" placement="top" :total="dataCount" :page-size="pageParam.pageSize" :current.sync="pageParam.pageIndex" :page-size-opts="[10, 20, 40, 60, 100]" @on-change="changepage" style="text-align: right" @on-page-size-change="pageSizeChange" />
    </div>

  </div>
</template>

<script>
import { getEosBus } from '@/api/data';
export default {
  name: 'Eosbusiness',
  data () {
    return {
      model1: '',
      pageParam: {
        pageSize: 10,
        pageIndex: 1
      },
      make: '',
      dataCount: 0,
      operColumns: [
        {
          title: '区块号',
          key: 'blockNum'
        },

        {
          title: '交易ID',
          key: 'transactionId'
        },
        {
          title: '状态',
          key: 'status'
        }, {
          title: '合约账户',
          key: 'contractAccount'
        }, {
          title: '普通账户',
          key: 'generalAccount'
        }, {
          title: '交易时间',
          key: 'transactionTime'
        }, {
          title: 'NET使用情况',
          key: 'netUsage'
        }, {
          title: 'CPU使用情况',
          key: 'cpuUsage'
        },
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
      if (this.make) {
        getEosBus(this.pageParam.pageSize, this.pageParam.pageIndex, this.make).then(res => {
          this.operationList = res.data.list
          this.dataCount = res.data.total
        })
      } else {
        getEosBus(this.pageParam.pageSize, this.pageParam.pageIndex).then(res => {
          this.operationList = res.data.list
          this.dataCount = res.data.total
        })
      }

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
.top {
  font-size: 12px;
  color: #18191a65;
  font-weight: 600;
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