<template>
  <div>
    <div class="seleTile">
      <div class="eosBus">
        <div>
            <span>链名称：</span>
            <Select v-model="nodeStatus" style="width:200px" @on-change='getstatus'>
                <Option v-for="item in health" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <span>合约名称：</span> <Input v-model="make" style="width: 150px" />
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

      <Page show-elevator show-sizer class="page" placement="top" show-total :total="dataCount" :page-size="pageParam.pageSize" :current.sync="pageParam.pageIndex" :page-size-opts="[10, 20, 40, 60, 100]" @on-change="changepage" style="text-align: right" @on-page-size-change="pageSizeChange" />
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
import { Eoscontract } from '@/api/data';
export default {
  name: 'Eoscontract',
  data () {
    return {
      make: '',
      examine: false,
       health: [
        {
          value: 'OK',
          label: 'OK'
        },
        {
          value: 'ERROR',
          label: 'ERROR'
        },
      ],
      pageParam: {
        pageSize: 10,
        pageIndex: 1
      },
      examineContent: {},
      dataCount: 0,
      operColumns: [
        {
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
    reset () {
      this.make = '',
        this.getOperationFun()
    },
    getOperationFun () {


      if (this.make) {
        Eoscontract(this.pageParam.pageSize, this.pageParam.pageIndex, this.make).then(res => {
          this.operationList = res.data.list
          this.dataCount = res.data.total
        })
      } else {
        Eoscontract(this.pageParam.pageSize, this.pageParam.pageIndex).then(res => {
          this.operationList = res.data.list
          this.dataCount = res.data.total
        })
      }

    },
    search () {
      this.getOperationFun()
    },
    changepage (index) {
      this.pageParam.pageIndex = index
      this.getOperationFun()
    },
    pageSizeChange (size) {
      this.pageParam.pageSize = size
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