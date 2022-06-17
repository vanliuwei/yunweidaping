<template>
  <div>
    <div class="seleTile">
      <!-- <Button type="text"> <b>能力调用方:</b> </Button>
      <Select v-model="model1" style="width:120px" @on-change='operType'>
        <Option v-for="item in abname" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>&nbsp;&nbsp;&nbsp;&nbsp;
      <Button type="text"> <b>统计时间</b> </Button>

      <DatePicker type="daterange" split-panels placeholder="日期" style="width: 200px"></DatePicker>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

      <Button type="primary" @click="operSearch">查询</Button>&nbsp;&nbsp;&nbsp; -->
      <Button type="primary" @click="down" class="down">导出</Button>

    </div>
    <Table :columns="operColumns" :data="operationList" :row-class-name="rowClassName"> </Table>
    <!-- <Page show-elevator show-sizer class="page" :total="dataCount" :page-size-opts="[10, 20, 40, 60, 100]" @on-change="changepage" style="text-align: right" @on-page-size-change="pageSizeChange" /> -->
  </div>
</template>

<script>
import { getRepor, getDown } from '@/api/data';
export default {
  name: 'trend',
  data () {
    return {
      model1: '',
      abname: [
        { value: '区块链存证能力', label: '区块链存证能力' }
      ],
      dataCount: 0,
      operColumns: [
        {
          title: '调用方名称',
          key: 'caller'
        },

        {
          title: '调用次数',
          key: 'transaction'
        },
        {
          title: '排名',
          key: 'rank'
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
    changepage (index) {
      // 改变页码时触发
      this.PageParam.pageIndex = index
      this.getOperationFun() // 获取表格列表
    },
    // 展示每页显示数据
    pageSizeChange (size) {
      // 当前页条数
      this.PageParam.pageSize = size
      this.getOperationFun() // 获取表格列表
    },
    rowClassName (row, index) {
      if (index === 0) {
        return 'demo-table-info-row';
      } else if (index === 1) {
        return 'demo-table-error-row';
      } else if (index === 2) {
        return 'demo-table-info-cell-address';
      }
      return '';
    },
    // 下载
    down () {
      // this.opValue = ''
      // this.getOperationFun()
      getDown().then((res) => {
        let blob = new Blob([res.data])
        let downloadElement = document.createElement('a')
        let href = window.URL.createObjectURL(blob)
        downloadElement.href = href
        downloadElement.setAttribute("download", '调用方热度排行.xlsx');
        document.body.appendChild(downloadElement)
        downloadElement.click()
        document.body.removeChild(downloadElement)
        window.URL.revokeObjectURL(href)

      })

    },
    // 下拉
    operType (e) {
      this.model1 = e

    },
    // 查询
    operSearch () {
      this.getOperationFun()
    },
    getOperationFun () {

      getRepor().then(res => {
        this.operationList = res.data
      })
    }
  },
};
</script>

<style lang="less" scoped>
.seleTile {
  margin: 1% 0;
  overflow: hidden;
}
.page {
  overflow: hidden;
  margin-top: 1%;
  float: right;
}
.ivu-tabs-nav-scroll {
  margin: auto;
}
.add {
  float: right;
  margin-right: 2%;
}
/deep/.ivu-tag-dot {
  border: 1px none #e8eaec !important;
  background: transparent !important;
}
/deep/.ivu-tag {
  font-size: inherit !important;
}
.down {
  float: right;
}
/deep/.ivu-table .demo-table-info-row td {
  font-weight: 600;
  background-color: #2db6f5d0;
  color: #fff;
}
/deep/.ivu-table .demo-table-error-row td {
  font-weight: 600;
  background-color: #2db6f5a4;
  color: #fff;
}
/deep/.ivu-table .demo-table-info-cell-address td {
  font-weight: 600;
  background-color: #2db6f55d;
  color: #fff;
}
</style>