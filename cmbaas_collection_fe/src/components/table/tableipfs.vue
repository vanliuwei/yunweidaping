<template>
  <div>
    <div class="seleTile">
      <!-- <Button type="text"> <b>节点类型:</b> </Button>
      <Select v-model="model1" style="width:120px" @on-change='operType'>
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select> -->
      <Button type="text"> <b>IP</b> </Button>
      <Input v-model="opValue" placeholder="IP" style="width: 150px" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <!-- <Button type="text"> <b>统计时间</b> </Button>

      <DatePicker type="daterange" split-panels placeholder="日期" style="width: 200px"></DatePicker>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->

      <Button type="primary" @click="operSearch">查询</Button> &nbsp;&nbsp;&nbsp;
      <Button type="primary" @click="reset">重置</Button>

      <!-- <Button type="primary" class="add" @click="add">新增</Button> -->
    </div>
    <Table :columns="operColumns" :data="operationList">
      <!-- <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template> -->
      <!-- <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button>
        <Button type="error" size="small" @click="remove(index)">删除</Button>
      </template> -->
    </Table>
    <Page show-elevator show-sizer show-total class="page" :total="dataCount" placement="top" :page-size-opts="[10, 20, 40, 60, 100]" @on-change="changepage" style="text-align: right" @on-page-size-change="pageSizeChange" />
    <Modal :draggable="true" v-model="modal" width="700" :title="formItem.alertTitle" :z-index="1000" sticky :mask-closable="false">
      <Form ref="formItem" :rules="formItemRule" :model="formItem" :label-width="140">
        <FormItem label="节点类型" prop="nodeType">
          <Input placeholder="请输入" style="width: 500px; vertical-align: baseline" v-model="formItem.nodeType" />
        </FormItem>
        <FormItem label="IP" prop="ip">
          <Input placeholder="请输入" style="width: 500px; vertical-align: baseline" v-model="formItem.ip" />
        </FormItem>
        <FormItem label="节点地址" prop="nodeAddress">
          <Input placeholder="请输入" style="width: 500px; vertical-align: baseline" v-model="formItem.nodeAddress" />
        </FormItem>
        <FormItem label="端口号" prop="port">
          <Input placeholder="请输入" style="width: 500px; vertical-align: baseline" v-model="formItem.port" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancel('formItem')">取消</Button>
        <Button type="primary" @click="ok('formItem')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getIpfsList } from '@/api/data';
export default {
  name: 'tableipfs',

  data () {
    return {
      opValue: '',
      modal: false,
      PageParam: {
        pageSize: 10,
        pageIndex: 1
      },
      formItem: {
        alertTitle: '新增链',
        nodeType: '',
        nodeAddress: '',
        port: '',
        status: ''
      },
      formItemRule: {
        nodeType: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { required: true, max: 13, message: '长度不能超过13', trigger: 'blur' },
          {
            type: 'string',
            pattern: /^[0-9a-zA-Z]*$/g,
            message: '格式应为0-9a-zA-Z',
            trigger: 'blur'
          }
        ],

        ip: [
          { required: true, message: '请选择一项', trigger: 'change' }
        ],

        chainBrief: [
          {
            required: true,
            message: '请填写链的主要业务描述',
            trigger: 'blur'
          }
        ]

      },
      dataCount: 0,
      cityList: [
        {
          value: 'bp',
          label: 'bp'
        },
        {
          value: 'normal',
          label: 'normal'
        }
      ],
      model1: '',
      operColumns: [
        {
          title: 'IP',
          key: 'ip'
        },
        {
          title: '节点地址',
          key: 'ipfsAddress'
        },
        {
          title: '端口号',
          key: 'port'
        },
        {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            const color =
              params.row.status === '启用' ? '#15AD31' : '#C7C7C7'
            return h(
              'Tag',
              {
                props: {
                  type: 'dot',
                  color: color
                },
                style: { marginLeft: '-8px' }
              },
              params.row.status
            )
          }
        }



      ],
      operationList: []
    };
  },

  mounted () {
    this.getOperationFun()
  },

  methods: {
    init () {
      this.$nextTick(() => {
        this.$refs['formItem'].resetFields()
      })
      this.formItem = {
        alertTitle: '新增链',
        nodeType: '',
        nodeAddress: '',
        port: ''
      }
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
    // 操作编辑
    show (index) {
      this.init()
      this.modal = true
      // if (`${this.tableData[index].nodeType}`) {
      this.formItem = {
        alertTitle: '修改链',
        nodeType: `${this.operationList[index].nodeType}`,
        ip: `${this.operationList[index].ip}`,
        nodeAddress: `${this.operationList[index].nodeAddress}`,
        port: `${this.operationList[index].port}`,
      }
      // }
    },
    // 新增
    add () {
      this.init()
      this.modal = true
    },
    cancel (name) {
      this.init()
      this.modal = false
    },
    // 重置
    reset () {
      this.opValue = ''
      this.getOperationFun()
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
      let OperPage = {
        pageParam: this.PageParam,
        ip: this.opValue
      }
      getIpfsList(OperPage).then(res => {
        const { records } = res.data
        let typeRale = {
          'OK': '启用',
          'DISABLE': '关闭',
        }
        let list = records.map((item) => {
          return {
            ...item,
            status: typeRale[item.status]
          }
        })
        this.operationList = list
        this.operationList = records
        this.dataCount = res.data.total
      })
    }
  },
};
</script>

<style lang="less" scoped>
.seleTile {
  margin: 1% 0;
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
</style>