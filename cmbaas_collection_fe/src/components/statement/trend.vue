<template>
  <div>
    <div class="seleTile">
      <!-- <Button type="text"> <b>能力名称:</b> </Button>
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
    <Page show-elevator show-sizer class="page" :total="dataCount" placement="top" :page-size-opts="[10, 20, 40, 60, 100]" @on-change="changepage" style="text-align: right" @on-page-size-change="pageSizeChange" />
  </div>
</template>

<script>
import { listApp, listAppDown } from '@/api/data';
export default {
  name: 'abilitycall',

  data () {
    return {
      model1: '',
      abname: [
        { value: '区块链存证能力', label: '区块链存证能力' }
      ],
      PageParam: {
        pageSize: 10,
        pageIndex: 1
      },
      titles: {
        date: '',
        cmcccsvczxyw: '',
        cmitshksjyzx: '',
        cmitshuankzq: '',
        hello: ''
      },
      titleArr: [],
      dataCount: 0,

      operColumns: [],
      operationList: []
    };
  },

  created () {
    this.getOperationFun()
  },

  methods: {
    // 下载
    down () {
      // this.opValue = ''
      // this.getOperationFun()
      listAppDown().then((res) => {
        let blob = new Blob([res.data])
        let downloadElement = document.createElement('a')
        let href = window.URL.createObjectURL(blob)
        downloadElement.href = href
        downloadElement.setAttribute("download", '应用趋势排行榜.xlsx');
        // downloadElement.download = '应用趋势排行榜'
        document.body.appendChild(downloadElement)
        downloadElement.click()
        document.body.removeChild(downloadElement)
        window.URL.revokeObjectURL(href)

      })

    },
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

    // 重置

    // 下拉
    operType (e) {
      this.model1 = e

    },
    // 查询
    operSearch () {
      this.getOperationFun()
    },
    getOperationFun () {
      let OperPage = {
        pageParam: this.PageParam,
        ip: this.opValue
      }
      listApp().then(res => {
        this.titleArr = Object.keys(res.data[0])
        this.operationList = res.data
        for (let index = 0; index < this.titleArr.length; index++) {
          if (index === 0) {
            this.operColumns.push({
              title: this.titleArr[index],
              key: this.titleArr[index],
              fixed: 'left',
            })
          } else {
            this.operColumns.push({
              title: this.titleArr[index],
              key: this.titleArr[index],
            })
          }


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