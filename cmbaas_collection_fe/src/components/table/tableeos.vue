<template>
  <div>
    <div class="seleTile">
      <Button type="text"> <b>节点类型:</b> </Button>
      <Select v-model="model1" style="width:120px" @on-change='operType'>
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      &nbsp;&nbsp;&nbsp;
      <Button type="text"> <b>IP</b> </Button>
      <Input v-model="opValue" placeholder="IP" style="width: 150px" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <!-- <Button type="text"> <b>统计时间</b> </Button>

      <DatePicker type="daterange" split-panels placeholder="日期" style="width: 200px"></DatePicker>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->

      <Button type="primary" @click="operSearch">查询</Button>&nbsp;&nbsp;&nbsp;
      <Button type="primary" @click="reset">重置</Button>

      <Button type="primary" class="add" @click="add">新增</Button>
    </div>
    <Table :columns="operColumns" :data="operationList">
      <!-- <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template> -->
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button>
        <Button type="error" size="small" @click="remove(index)">删除</Button>
      </template>
    </Table>
    <Page show-elevator show-sizer show-total class="page" placement="top" :total="dataCount" :page-size-opts="[10, 20, 40, 60, 100]" @on-change="changepage" style="text-align: right" @on-page-size-change="pageSizeChange" />
    <Modal :draggable="true" v-model="modal" width="700" :title="formItem.alertTitle" :z-index="1000" sticky :mask-closable="false">
      <Form ref="formItem" :rules="formItemRule" :model="formItem" :label-width="140">
        <FormItem label="区块链名称" prop="chainName">
          <Select v-model="formItem.chainName" placeholder="请输入" style="width: 500px; vertical-align: baseline" @on-change='GetnodeName'>
            <Option v-for="item in blockName" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </FormItem>
        <FormItem label="节点类型" prop="nodeType">
          <Select v-model="formItem.nodeType" placeholder="请输入" style="width: 500px; vertical-align: baseline" @on-change='GetnodeType'>
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </FormItem>
        <FormItem label="IP" prop="ip">
          <Input placeholder="请输入" style="width: 500px; vertical-align: baseline" v-model="formItem.ip" />
        </FormItem>
        <FormItem label="节点地址" prop="nodeAddress">
          <Select v-model="formItem.nodeAddress" placeholder="请输入" style="width: 500px; vertical-align: baseline" label-in-value>
            <Option v-for="item in nodeAddressList" :value="item.label" :key="item.value">{{item.label}}</Option>
          </Select>
          <!-- <Input placeholder="请输入" style="width: 500px; vertical-align: baseline" v-model="formItem.nodeAddress" /> -->
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
import { getOperation, getEosRemove, getEosAdd, getEosShow, getnodename, getnodelistAll } from '@/api/data';
export default {
  name: 'tableeos',

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
        chainName: '111',
        nodeType: '',
        nodeAddress: '',
        port: '',
        status: ''
      },
      formItemRule: {
        chainName: [
          { required: true, message: '请选择一项', trigger: 'change' }
        ],
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
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        nodeAddress: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        port: [
          { required: true, message: '不能为空', trigger: 'change' }
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
      blockName: [
      ],
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
      nodeAddressList: [],
      model1: '',
      operColumns: [
        {
          title: '区块链名称',
          key: 'chainName'
        },
        {
          title: '节点类型',
          key: 'nodeType'
        },
        {
          title: 'IP',
          key: 'ip'
        },
        {
          title: '节点地址',
          key: 'nodeAddress'
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
              params.row.status === 'OK' ? '#15AD31' : '#C7C7C7'
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
        , {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }


      ],
      operationList: []
    };
  },

  mounted () {
    this.getOperationFun()

  },
  created () {
    getnodename().then(res => {
      res.data.map(item => {
        this.blockName.push({
          label: item.chainName,
          value: item.chainName
        })
      })

    })
    getnodelistAll().then(res => {
      res.data.data.map(item => {
        this.nodeAddressList.push({
          label: item.nodeAddress,
          value: item.longitudeAndLatitude
        })
      })

    })
  },
  methods: {
    init () {
      this.$nextTick(() => {
        this.$refs['formItem'].resetFields()
      })
      this.formItem = {
        alertTitle: '新增链',
        chainName: '',
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
      let long = this.nodeAddressList.filter(item => item.label === this.operationList[index].nodeAddress)
      // if (`${this.tableData[index].nodeType}`) {
      this.formItem = {
        alertTitle: '修改链',
        chainName: `${this.operationList[index].chainName}`,
        nodeType: `${this.operationList[index].nodeType}`,
        ip: `${this.operationList[index].ip}`,
        nodeAddress: `${this.operationList[index].nodeAddress}`,
        port: `${this.operationList[index].port}`,
        id: `${this.operationList[index].id}`,
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
      this.model1 = '',
        this.opValue = ''
      this.getOperationFun()
    },
    ok (name) {
      console.log(this.formItem);
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log(this.formItem);
          if (this.formItem.id) {
            // 编辑
            getEosShow(this.formItem).then(res => {
              if (res.status === 200) {
                this.modal = false
                this.msgInfo('success', '编辑成功！', true)
                this.getOperationFun()
              }
            })
          } else {
            // 新增
            getEosAdd(this.formItem).then(res => {
              if (res.status === 200) {
                this.modal = false
                this.msgInfo('success', '新增成功！', true)
                this.getOperationFun()
              }
            })
          }


        } else {
          this.msgInfo('error', '存在字段校验不符合规范，请检查！', true)
        }
      })
      // this.$refs[name].resetFields()
      // this.init()
    },
    remove (index) {
      getEosRemove({ id: this.operationList[index].id }).then(res => {
        this.getOperationFun()
      })
    },
    // 下拉
    operType (e) {
      this.model1 = e
    },
    GetnodeName (e) {
      this.formItem.chainName = e
    },
    // 节点类型
    GetnodeType (e) {
      this.formItem.nodeType = e
    },
    // 查询
    operSearch () {
      this.getOperationFun()
    },
    getOperationFun () {
      let OperPage = {
        nodeType: this.model1,
        pageParam: this.PageParam,
        ip: this.opValue
      }
      getOperation(OperPage).then(res => {
        const { records } = res.data
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