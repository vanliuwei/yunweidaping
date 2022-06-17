<template>
  <div>
    <div class="seleTile">
      <!-- <Button type="text"> <b>应用名称:</b> </Button>
      <Select v-model="model1" style="width:120px" @on-change='operType'>
        <Option v-for="item in abname" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>&nbsp;&nbsp;&nbsp;&nbsp;
      <Button type="text"> <b>统计时间</b> </Button>

      <DatePicker type="daterange" split-panels placeholder="日期" style="width: 200px"></DatePicker>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

      <Button type="primary" @click="operSearch">查询</Button>&nbsp;&nbsp;&nbsp; -->
      <Button type="primary" @click="down" class="down">导出</Button>

    </div>
    <Table :columns="operColumns" :data="operationList">
    </Table>
    <!-- <Page show-elevator show-sizer class="page" :total="dataCount" :page-size-opts="[10, 20, 40, 60, 100]" @on-change="changepage" style="text-align: right" @on-page-size-change="pageSizeChange" /> -->
  </div>
</template>

<script>
import { TrendingCharts, TrendingChartsDown } from '@/api/data';
export default {
  name: 'trend',

  data () {
    return {
      model1: '',
      abname: [
        { value: '区块链存证能力', label: '区块链存证能力' }
      ],
      // PageParam: {
      //   pageSize: 10,
      //   pageIndex: 1
      // },

      dataCount: 0,
      operColumns: [],
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
    // changepage (index) {
    //   // 改变页码时触发
    //   this.PageParam.pageIndex = index
    //   this.getOperationFun() // 获取表格列表
    // },
    // // 展示每页显示数据
    // pageSizeChange (size) {
    //   // 当前页条数
    //   this.PageParam.pageSize = size
    //   this.getOperationFun() // 获取表格列表
    // },

    // 重置
    down () {
      TrendingChartsDown().then((res) => {
        let blob = new Blob([res.data])
        let downloadElement = document.createElement('a')
        let href = window.URL.createObjectURL(blob)
        downloadElement.href = href
        downloadElement.setAttribute("download", '能力调用趋势统计表.xlsx');
        document.body.appendChild(downloadElement)
        downloadElement.click()
        document.body.removeChild(downloadElement)
        window.URL.revokeObjectURL(href)

      })
    },
    // 下拉
    // operType (e) {
    //   this.model1 = e
    //   console.log(e);
    // },
    // 查询
    // operSearch () {
    //   this.getOperationFun()
    // },
    getOperationFun () {
      TrendingCharts().then(res => {

        this.titleArr = Object.keys(res.data[0])
        this.operationList = res.data
        for (let index = 0; index < this.titleArr.length; index++) {
          this.operColumns.push({
            title: this.titleArr[index],
            key: this.titleArr[index]
          })

        }

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
</style>