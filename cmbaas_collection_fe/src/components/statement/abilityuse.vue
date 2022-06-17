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
      <Button type="primary" @click="useDown" class="dowm">导出</Button>

    </div>
    <Table :columns="operColumns" :data="operationList">
    </Table>
    <Page show-elevator show-sizer class="page" :total="dataCount" placement="top" :page-size-opts="[10, 20, 40, 60, 100]" @on-change="changepage" style="text-align: right" @on-page-size-change="pageSizeChange" />
  </div>
</template>

<script>
import { getAbilityUse, getAbilityUseDown } from '@/api/data';
export default {
  name: 'abilityuse',

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

      dataCount: 0,
      operColumns: [
        {
          title: '能力名称',
          key: 'abilityName'
        },
        {
          title: '累计交易量',
          key: 'transactionTotal'
        },
        {
          title: '月度增量',
          key: 'monthlyIncrement'
        },
        {
          title: '应用数',
          key: 'applicationsCount'
        },
        {
          title: '账户名称',
          key: 'eosAccountName',
          tooltip: true,

        },
        {
          title: '交易增量',
          key: 'transactionIncrement',
          tooltip: true,

        },
        {
          title: '调用方数',
          key: 'callerCount'
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

    // 下载
    useDown () {
      getAbilityUseDown().then(res => {
        let blob = new Blob([res.data])
        let downloadElement = document.createElement('a')
        let href = window.URL.createObjectURL(blob)
        downloadElement.href = href
        downloadElement.setAttribute("download", '能力使用情况统计报表.xlsx');
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
      getAbilityUse().then(res => {
        let getAbilityUse = res.data.map(item => {
          return {
            ...item,
            eosAccountName: item.applicationsIncrementList.map(items => items.eosAccountName).join('；'),
            transactionIncrement: item.applicationsIncrementList.map(items => items.transactionIncrement).join('；'),
          }
        })
        this.operationList = getAbilityUse

      })
      //   let OperPage = {
      //     pageParam: this.PageParam,
      //     ip: this.opValue
      //   }
      //   getTimeList(OperPage).then(res => {
      //     console.log(res);
      //     const { records } = res.data
      //     let typeRale = {
      //       'ENABLE': '启用',
      //       "DISABLE": '关闭',
      //     }
      //     console.log(records);
      //     let list = records.map((item) => {
      //       return {
      //         ...item,
      //         status: typeRale[item.status]
      //       }
      //     })
      //     console.log(list);
      //     this.operationList = list
      //     this.dataCount = res.data.total
      //   })
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
.dowm {
  float: right;
}
</style>