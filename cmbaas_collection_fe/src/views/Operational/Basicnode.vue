<template>
  <div class="seleTile">
    <div class="SearchContent">
      <Button type="primary" @click="newly">新增</Button>
    </div>
    <Table :columns="operColumns" :data="operationList">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button>
        <Button type="error" size="small" @click="remove(row)">删除</Button>
      </template>
    </Table>
    <Page show-elevator show-sizer show-total :total="dataCount" :page-size="pageParam.pageSize" :current.sync="pageParam.pageIndex" :page-size-opts="[10, 20, 40, 60, 100]" @on-change="changepage" style="text-align: right" @on-page-size-change="pageSizeChange" />
    <Modal v-model="compileModel" :title="formItem.alertTitle" :closable='false'>
      <Form ref="formItem" :model="formItem" :rules="ruleInline" :label-width="140">
        <FormItem label="链名称：" prop="chainName">
          <Input v-model="formItem.chainName">
          </Input>
        </FormItem>
        <FormItem label="节点地址：" prop="nodeAddress">
          <Input type="text" v-model="formItem.nodeAddress">
          </Input>
        </FormItem>

        <FormItem label="节点IP：" prop="nodeIp">
          <Input v-model="formItem.nodeIp">
          </Input>
        </FormItem>
        <FormItem label="节点名称：" prop="nodeName">
          <Input v-model="formItem.nodeName">
          </Input>
        </FormItem>
        <FormItem label="节点端口：" prop="nodePort">
          <Input v-model="formItem.nodePort">
          </Input>
        </FormItem>
        <FormItem label="节点类型：" prop="nodeType">
          <Input v-model="formItem.nodeType">
          </Input>
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
import { Basicnode, BasicnodeDelete, BasicnodeShow, BasicnodeAdd } from '@/api/data';
export default {
  name: 'Basicnode',
  data () {
    return {
      compileModel: false,
      formItem: {
        nodeAddress: '',
        chainName: '',
        nodeIp: '',
        id: '',
        nodeName: '',
        nodePort: '',
        nodeType: '',
        alertTitle: '新增',
      },
      ruleInline: {
        nodeAddress: [
          { required: true, message: '节点地址不能为空', trigger: 'blur' }
        ],
        chainName: [
          { required: true, message: '链名称不能为空', trigger: 'blur' },
        ],
        nodeIp: [
          { required: true, message: '节点IP不能为空', trigger: 'blur' },
        ],
        nodeName: [
          { required: true, message: '节点名称不能为空', trigger: 'blur' },
        ],
        nodePort: [
          { required: true, message: '节点端口不能为空', trigger: 'blur' },
        ],
        nodeType: [
          { required: true, message: '节点类型不能为空', trigger: 'blur' },
        ]
      },
      operColumns: [
        {
          title: "链名称",
          key: 'chainName'
        },
        {
          title: '节点地址',
          key: 'nodeAddress'
        },


        {
          title: '节点IP',
          key: 'nodeIp',
        },
        {
          title: '节点名称',
          key: 'nodeName',
        }, {
          title: '节点端口',
          key: 'nodePort',
        },

        {
          title: '节点类型',
          key: 'nodeType',
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
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
    init () {
      this.$nextTick(() => {
        this.$refs['formItem'].resetFields()
      })
    },
    changepage (index) {
      this.pageParam.pageIndex = index
      this.getSystemLog()
    },
    pageSizeChange (size) {
      this.pageParam.pageSize = size
      this.getSystemLog()
    },


    // 新增
    newly () {
      this.init()
      this.compileModel = true
    },
    ok (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.init()
          this.compileModel = false
          if (this.formItem.id) {
            // 修改
            BasicnodeShow(this.formItem).then(res => {
              this.$Message.success(res.data.message);
              this.formItem.id = ''
              this.getSystemLog()
            }).catch(error => {
              this.$Message.error(error.data.message)
            })
          } else {
            let formItem = {
              nodeAddress: this.formItem.nodeAddress,
              chainName: this.formItem.chainName,
              nodeIp: this.formItem.nodeIp,
              nodeName: this.formItem.nodeName,
              nodePort: this.formItem.nodePort,
              nodeType: this.formItem.nodeType,
            }
            BasicnodeAdd(formItem).then(res => {
              this.$Message.success(res.data.message);
              this.getSystemLog()
            }).catch(error => {
              this.$Message.error(error.data.message)
            })
          }


        }
      })
    },
    cancel (name) {
      this.init()
      this.compileModel = false
    },
    // 编辑
    show (index) {
      this.init()
      this.compileModel = true
      this.formItem = {
        alertTitle: '修改链',
        id: `${this.operationList[index].id}`,
        nodeAddress: `${this.operationList[index].nodeAddress}`,
        chainName: `${this.operationList[index].chainName}`,
        nodeIp: `${this.operationList[index].nodeIp}`,
        nodeName: `${this.operationList[index].nodeName}`,
        nodePort: `${this.operationList[index].nodePort}`,
        nodeType: `${this.operationList[index].nodeType}`,
      }
    },
    // 删除
    remove (row) {
      BasicnodeDelete(row.id).then(res => {
        if (res.data.code === '00000') {
          this.$Message.success(res.data.message);
          this.getSystemLog()
        } else {
          this.$Message.error(res.data.message);
        }
      }).catch(error => {
        this.$Message.error(error.data.message)
      })
    },
    getSystemLog () {
      let page = {
        pageParam: this.pageParam,
      }
      Basicnode(page).then(res => {
        this.operationList = res.data.data.records
        this.dataCount = res.data.data.total
      }).catch(error => {
        this.$Message.error(error.data.message)
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
  justify-content: flex-end;
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