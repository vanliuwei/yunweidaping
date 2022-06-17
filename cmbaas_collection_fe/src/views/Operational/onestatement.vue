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
        <FormItem label="能力名称：" prop="abilityName">
          <Input v-model="formItem.abilityName">
          </Input>
        </FormItem>
        <FormItem label="能力统一编码：" prop="abilityCode">
          <Input type="text" v-model="formItem.abilityCode">
          </Input>
        </FormItem>

        <FormItem label="能力类型：" prop="abilityType">
          <Input v-model="formItem.abilityType">
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
import { Onestatement, OnestatementDelete, OnestatementShow, OnestatementAdd } from '@/api/data';
export default {
  name: 'onestatement',
  data () {
    return {
      compileModel: false,
      formItem: {
        abilityCode: '',
        abilityName: '',
        abilityType: '',
        id: '',
        alertTitle: '新增',
      },
      ruleInline: {
        abilityCode: [
          { required: true, message: '编码不能为空', trigger: 'blur' }
        ],
        abilityName: [
          { required: true, message: '能力名称不能为空', trigger: 'blur' },
        ],
        abilityType: [
          { required: true, message: '能力类型不能为空', trigger: 'blur' },
        ]
      },
      operColumns: [
        {
          title: '能力名称',
          key: 'abilityName'
        },
        {
          title: '能力统一编码',
          key: 'abilityCode'
        },


        {
          title: '能力类型',
          key: 'abilityType',
          tooltip: true
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
            OnestatementShow(this.formItem).then(res => {
              this.$Message.success(res.data.message);
              this.formItem.id = ''
              this.getSystemLog()
            }).catch(error => {
              this.$Message.error(error.data.message)
            })
          } else {
            let formItem = {
              abilityCode: this.formItem.abilityCode,
              abilityName: this.formItem.abilityName,
              abilityType: this.formItem.abilityType,
            }
            OnestatementAdd(formItem).then(res => {
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
        abilityCode: `${this.operationList[index].abilityCode}`,
        abilityName: `${this.operationList[index].abilityName}`,
        abilityType: `${this.operationList[index].abilityType}`,
      }
    },
    // 删除
    remove (row) {
      OnestatementDelete(row.id).then(res => {
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
      Onestatement(page).then(res => {
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