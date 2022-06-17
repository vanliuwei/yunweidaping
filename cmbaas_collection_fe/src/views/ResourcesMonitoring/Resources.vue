<template>
  <div>
    <div class="seleTile">
      <div class="eosBus">
        <div>
          <span>主机IP：</span> <Input v-model="make" style="width: 150px" />
        </div>
        <div>
          <Button type="primary" @click="search">查询</Button> &nbsp;&nbsp;&nbsp;
          <Button type="primary" @click="down">导出</Button>
        </div>
      </div>
      <Table :columns="operColumns" :data="operationList">

      </Table>
      <Page show-elevator show-sizer show-total class="page" placement="top" :total="dataCount" :page-size="pageParam.pageSize" :current.sync="pageParam.pageIndex" :page-size-opts="[10, 20, 40, 60, 100]" @on-change="changepage" style="text-align: right" @on-page-size-change="pageSizeChange" />
    </div>

  </div>
</template>

<script>
import { getResources, getResourcesDown } from '@/api/data';
export default {
  name: 'Eosbusiness',
  data () {
    return {
      examineContent: {},
      examine: false,
      model1: '',
      pageParam: {
        pageSize: 10,
        pageIndex: 1
      },
      make: '',
      dataCount: 0,
      operColumns: [
        {
          title: '链名称',
          key: 'chian'
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
      getResources(this.pageParam.pageSize, this.pageParam.pageIndex, this.make).then(res => {
        this.operationList = res.data.list
        this.dataCount = res.data.total
      })
    },
    search () {
      this.getOperationFun()
    },
    down () {
      getResourcesDown().then((res) => {
        let blob = new Blob([res.data])
        let downloadElement = document.createElement('a')
        let href = window.URL.createObjectURL(blob)
        downloadElement.href = href
        downloadElement.setAttribute("download", '资源监测报表.xlsx');
        document.body.appendChild(downloadElement)
        downloadElement.click()
        document.body.removeChild(downloadElement)
        window.URL.revokeObjectURL(href)

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