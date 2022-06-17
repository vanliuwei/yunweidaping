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
      <Form ref="formItem" :model="formItem" :rules="ruleInline" :label-width="150">
        <FormItem label="链名称：" prop="chainName">
          <Input v-model="formItem.chainName">
          </Input>
        </FormItem>
        <FormItem label="能力类型：" prop="abilityId">
          <Input type="text" v-model="formItem.abilityId">
          </Input>
        </FormItem>

        <FormItem label="合约描述：" prop="contractDescription">
          <Input v-model="formItem.contractDescription">
          </Input>
        </FormItem>
        <FormItem label="合约名称：" prop="contractName">
          <Input v-model="formItem.contractName">
          </Input>
        </FormItem>
        <FormItem label="数据存在那个主机：" prop="dataHost">
          <Input v-model="formItem.dataHost">
          </Input>
        </FormItem>
        <FormItem label="存放的数据库类型：" prop="databaseType">
          <Input v-model="formItem.databaseType">
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
import { Basicbusiness, BasicbusinessDelete, BasicbusinessShow, BasicbusinessAdd } from '@/api/data';
export default {
  name: 'Basicbusiness',
  data () {
    return {
      compileModel: false,
      formItem: {
        abilityId: '',
        chainName: '',
        contractDescription: '',
        id: '',
        contractName: '',
        dataHost: '',
        databaseType: '',
        alertTitle: '新增',
      },
      ruleInline: {
        abilityId: [
          { required: true, message: '节点地址不能为空', trigger: 'blur' }
        ],
        chainName: [
          { required: true, message: '链名称不能为空', trigger: 'blur' },
        ],
        contractDescription: [
          { required: true, message: '节点IP不能为空', trigger: 'blur' },
        ],
        contractName: [
          { required: true, message: '节点名称不能为空', trigger: 'blur' },
        ],
        dataHost: [
          { required: true, message: '节点端口不能为空', trigger: 'blur' },
        ],
        databaseType: [
          { required: true, message: '节点类型不能为空', trigger: 'blur' },
        ]
      },
      operColumns: [
        {
          title: "链名称",
          key: 'chainName'
        },
        {
          title: '能力类型',
          key: 'abilityId'
        },


        {
          title: '合约描述',
          key: 'contractDescription',
        },
        {
          title: '合约名称',
          key: 'contractName',
        }, {
          title: '数据存在那个主机',
          key: 'dataHost',
        },

        {
          title: '存放的数据库类型',
          key: 'databaseType',
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
            BasicbusinessShow(this.formItem).then(res => {
              this.$Message.success(res.data.message);
              this.formItem.id = ''
              this.getSystemLog()
            }).catch(error => {
              this.$Message.error(error.data.message)
            })
          } else {
            let formItem = {
              abilityId: this.formItem.abilityId,
              chainName: this.formItem.chainName,
              contractDescription: this.formItem.contractDescription,
              contractName: this.formItem.contractName,
              dataHost: this.formItem.dataHost,
              databaseType: this.formItem.databaseType,
            }
            BasicbusinessAdd(formItem).then(res => {
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
        abilityId: `${this.operationList[index].abilityId}`,
        chainName: `${this.operationList[index].chainName}`,
        contractDescription: `${this.operationList[index].contractDescription}`,
        contractName: `${this.operationList[index].contractName}`,
        dataHost: `${this.operationList[index].dataHost}`,
        databaseType: `${this.operationList[index].databaseType}`,
      }
    },
    // 删除
    remove (row) {
      BasicbusinessDelete(row.id).then(res => {
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
      Basicbusiness(page).then(res => {
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