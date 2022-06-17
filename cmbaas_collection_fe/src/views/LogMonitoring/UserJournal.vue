<template>
  <div class="seleTile">
    <div class="SearchContent">
      <div class="SearchContent_div">
        <span class="btn">所属应用：</span>
        <Input v-model="applicationName" placeholder="所属应用" style="width: 150px" />
      </div>
      <div class="SearchContent_div"> <span class="btn">业务类型：</span>
        <Input v-model="operateType" placeholder="业务类型" style="width: 150px" />
      </div>
      <div class="SearchContent_div"> <span class="btn">业务类型描述：</span>
        <Input v-model="operateTypeDesc" placeholder="业务类型描述" style="width: 150px" />
      </div>
      <div class="SearchContent_div1">
        <span class="btn">安全级别：</span>
        <Select v-model="safetyResult" style="width:100px" @on-change='getstatus'>
          <Option v-for="item in health" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <Button type="primary" @click="logEarch">查询</Button>
    </div>
    <Table :columns="operColumns" :data="operationList"></Table>
    <Page show-elevator show-sizer show-total :total="dataCount" :page-size="pageParam.pageSize" :current.sync="pageParam.pageIndex" :page-size-opts="[10, 20, 40, 60, 100]" @on-change="changepage" style="text-align: right" @on-page-size-change="pageSizeChange" />
  </div>
</template>

<script>
import { UserJournal } from '@/api/data';
export default {
  name: 'UserJournal',

  data () {
    return {
      applicationName: '',
      operateType: '',
      operateTypeDesc: '',
      safetyResult: '',
      dataCount: 0,
      pageParam: {
        pageSize: 10,
        pageIndex: 1
      },
      health: [
        {
          value: '0',
          label: '安全'
        },
        {
          value: '1',
          label: '危险'
        },
      ],
      operColumns: [{
        title: '所属应用',
        key: 'applicationName'
      },
      {
        title: '业务类型',
        key: 'operateType'
      },
      {
        title: '业务类型描述',
        key: 'operateTypeDesc'
      },
      {
        title: '客户端请求IP',
        key: 'clientIp'
      },
      {
        title: '服务端IP',
        key: 'serverIp'
      },

      {
        title: '用户请求url',
        key: 'requestUrl',
        tooltip: true
      }, {
        title: '安全级别',
        key: 'safetyResult',
        tooltip: true
      }
      ],
      operationList: [],
    };
  },

  mounted () {
    this.getUserJournal()
  },

  methods: {
    changepage (index) {
      this.pageParam.pageIndex = index
      this.getUserJournal()
    },
    pageSizeChange (size) {
      this.pageParam.pageSize = size
      this.getUserJournal()
    },
    logEarch () {
      this.getUserJournal()
    },
    getstatus (e) {
      console.log(e);
      this.safetyResult = e
    },
    getUserJournal () {
      let page = {
        pageParam: this.pageParam,
        applicationName: this.applicationName,
        operateType: this.operateType,
        operateTypeDesc: this.operateTypeDesc,
        safetyResult: this.safetyResult
      }
      UserJournal(page).then(res => {
        let rescor = {
          0: '安全',
          1: '危险'
        }
        let list = res.data.records.map(item => {
          return {
            ...item,
            safetyResult: rescor[item.safetyResult]
          }
        })
        this.operationList = list
        this.dataCount = res.data.total
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
  .SearchContent_div1 {
    width: 300px;
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