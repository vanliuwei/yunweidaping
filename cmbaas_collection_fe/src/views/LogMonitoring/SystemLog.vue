<template>
  <div class="seleTile">
    <div class="SearchContent">
      <div class="SearchContent_div">
        <span class="btn">操作类型：</span>
        <Input v-model="opType" placeholder="操作类型" style="width: 150px" />
      </div>
      <div class="SearchContent_div"> <span class="btn">操作类型描述：</span>
        <Input v-model="opTypeDesc" placeholder="操作类型描述" style="width: 150px" />
      </div>
      <div class="SearchContent_div"> <span class="btn">模块名称：</span>
        <Input v-model="moduleName" placeholder="模块名称" style="width: 150px" />
      </div>
      <div class="SearchContent_div">
        <span class="btn"> 操作级别：</span>
        <Select v-model="opLevelId" style="width:100px" @on-change='getstatus'>
          <Option v-for="item in health" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <Button type="primary" @click="logEarch">查询</Button>
    </div>
    <Table :columns="operColumns" :data="operationList">
    </Table>
    <Page show-elevator show-sizer show-total :total="dataCount" :page-size="pageParam.pageSize" :current.sync="pageParam.pageIndex" :page-size-opts="[10, 20, 40, 60, 100]" @on-change="changepage" style="text-align: right" @on-page-size-change="pageSizeChange" />
  </div>
</template>

<script>
import { SystemLog } from '@/api/data';
export default {
  name: 'SystemLog',

  data () {
    return {
      opType: '',
      opTypeDesc: '',
      moduleName: '',
      opLevelId: '',
      health: [
        {
          value: '1',
          label: '一般'
        },
        {
          value: '2',
          label: '重要'
        }, {
          value: '3',
          label: '敏感'
        }, {
          value: '4',
          label: '警告'
        }, {
          value: '5',
          label: '严重'
        },
      ],
      operColumns: [
        {
          title: '用户名',
          key: 'userLoginId'
        },

        {
          title: '操作类型',
          key: 'opType'
        },
        {
          title: '操作类型描述',
          key: 'opTypeDesc',
          tooltip: true
        }, {
          title: '操作结果',
          key: 'result',
          tooltip: true
        }, {
          title: '客户端IP',
          key: 'clientIp'
        }, {
          title: '服务端IP',
          key: 'serverIp'
        }, {
          title: '模块名称',
          key: 'moduleName'
        }, {
          title: '操作级别',
          key: 'opLevelId'
        }, {
          title: '操作内容',
          key: 'opContent'
        }
      ],
      dataCount: 0,
      pageParam: {
        pageSize: 10,
        pageIndex: 1
      },
      operationList: []
    };
  },

  mounted () {
    this.getSystemLog()
  },

  methods: {
    changepage (index) {
      this.pageParam.pageIndex = index
      this.getSystemLog()
    },
    pageSizeChange (size) {
      this.pageParam.pageSize = size
      this.getSystemLog()
    },
    logEarch () {
      this.getSystemLog()
    },
    getstatus (e) {
      this.opLevelId = e
    },
    getSystemLog () {
      let page = {
        pageParam: this.pageParam,
        opType: this.opType,
        opTypeDesc: this.opTypeDesc,
        moduleName: this.moduleName,
        opLevelId: this.opLevelId

      }
      SystemLog(page).then(res => {
        let rescor = {
          0: '成功',
          1: '失败'
        }
        let level = {
          1: '一般',
          2: '重要',
          3: '敏感',
          4: '警告',
          5: '严重'
        }
        let list = res.data.records.map(item => {
          return {
            ...item,
            result: rescor[item.result],
            opLevelId: level[item.opLevelId]
          }
        })
        this.dataCount = res.data.total
        this.operationList = list
      })
    }
  },
};
</script>

<style lang="less" scoped>
.seleTile {
  margin: 3%;
}
.btn {
  padding: 0 2%;
}

.SearchContent {
  display: flex;
  .SearchContent_div {
    width: 260px;
  }
}
/deep/.ivu-tag-dot {
  border: 1px none #e8eaec !important;
  background: transparent !important;
}
/deep/.ivu-tag {
  font-size: inherit !important;
}
</style>