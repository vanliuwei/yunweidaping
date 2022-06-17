<template>
  <div>
    <div class="seleTile">
      <div>
        <span>告警指标：</span> <Input v-model="ipfsip" style="width: 150px" />&nbsp;&nbsp;&nbsp;
        <span>状态：</span>
        <Select v-model="model1" style="width:100px" @on-change='getstatus'>
        <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <Table :columns="operColumns" :data="operationList"> </Table>
      <!-- <Page show-elevator show-sizer show-total class="page" placement="top" :total="dataCount" :page-size="pageParam.pageSize" :current.sync="pageParam.pageIndex" :page-size-opts="[10, 20, 40, 60, 100]" @on-change="changepage" style="text-align: right" @on-page-size-change="pageSizeChange" /> -->
    </div>
  </div>
</template>

<script>
import { getReport } from "@/api/data";
let ralte = {
  正常: "blue",
  不可用: "#ff0000",
  一般: "blue",
};
let ralteStatus = {
  正常: "#cce6ff",
  不可用: "#ff0000",
};
export default {
  name: "Eosbusiness",
  data() {
    return {
      examineContent: {},
      examine: false,
      model1: "",
      pageParam: {
        pageSize: 10,
        pageIndex: 1,
      },
      make: "",
      dataCount: 0,
      operColumns: [
        {
          title: "告警摘要",
          key: "summary",
          tooltip: true,
        },
        {
          title: "告警级别",
          key: "alertLevel",
        },
        {
          title: "告警描述",
          key: "description",
          tooltip: true,
        },
      ],

      operationList: [],
    };
  },

  mounted() {
    this.getOperationFun();
  },
  methods: {
    changepage(index) {
      this.pageParam.pageIndex = index;
      this.getOperationFun();
    },
    pageSizeChange(size) {
      this.pageParam.pageSize = size;
      this.getOperationFun();
    },
    msgInfo(type, content, closable = false) {
      this.$Message[type]({
        background: true,
        closable: closable,
        content: content,
      });
    },
    getOperationFun() {
      getReport().then((res) => {
        if (res.status == 200) {
          this.operationList = res.data;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.seleTile {
  margin: 3%;
}

/deep/.ivu-tag-dot {
  border: 1px none #e8eaec !important;
  background: transparent !important;
}
/deep/.ivu-tag {
  font-size: inherit !important;
}
</style>
