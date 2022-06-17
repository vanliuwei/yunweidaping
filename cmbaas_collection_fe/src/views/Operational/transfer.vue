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
        <FormItem label="账号：" prop="account">
          <Input v-model="formItem.account">
          </Input>
        </FormItem>
        <FormItem label="上传目录：" prop="incoming">
          <Input type="text" v-model="formItem.incoming">
          </Input>
        </FormItem>

        <FormItem label="下载目录：" prop="outgoing">
          <Input v-model="formItem.outgoing">
          </Input>
        </FormItem>
        <FormItem label="密码：" prop="password">
          <Input v-model="formItem.password">
          </Input>
        </FormItem>
        <FormItem label="sftp主机：" prop="sftpIp">
          <Input v-model="formItem.sftpIp">
          </Input>
        </FormItem>
        <FormItem label="sftp端口：" prop="sftpPort">
          <Input v-model="formItem.sftpPort">
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
import { transfer, transferDelete, transferShow, transferAdd } from '@/api/data';
export default {
  name: 'transfer',
  data () {
    return {
      compileModel: false,
      formItem: {
        incoming: '',
        account: '',
        outgoing: '',
        id: '',
        password: '',
        sftpIp: '',
        sftpPort: '',
        alertTitle: '新增',
      },
      ruleInline: {
        incoming: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '上传目录不能为空', trigger: 'blur' },
        ],
        outgoing: [
          { required: true, message: '下载目录不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ],
        sftpIp: [
          { required: true, message: 'sftp主机不能为空', trigger: 'blur' },
        ],
        sftpPort: [
          { required: true, message: 'sftp端口不能为空', trigger: 'blur' },
        ]
      },
      operColumns: [
        {
          title: "账号",
          key: 'userName'
        },
        {
          title: '上传目录',
          key: 'outgoing'
        },

        {
          title: '下载目录',
          key: 'incoming',
        },
        {
          title: '密码',
          key: 'password',
        }, {
          title: 'sftp主机',
          key: 'sftpIp',
        },

        {
          title: 'sftp端口',
          key: 'sftpPort',
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
            transferShow(this.formItem).then(res => {
              this.$Message.success(res.data.message);
              this.formItem.id = ''
              this.getSystemLog()
            }).catch(error => {
              this.$Message.error(error.data.message)
            })
          } else {
            let formItem = {
              incoming: this.formItem.incoming,
              account: this.formItem.account,
              outgoing: this.formItem.outgoing,
              password: this.formItem.password,
              sftpIp: this.formItem.sftpIp,
              sftpPort: this.formItem.sftpPort,
            }
            transferAdd(formItem).then(res => {
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
        incoming: `${this.operationList[index].incoming}`,
        account: `${this.operationList[index].account}`,
        outgoing: `${this.operationList[index].outgoing}`,
        password: `${this.operationList[index].password}`,
        sftpIp: `${this.operationList[index].sftpIp}`,
        sftpPort: `${this.operationList[index].sftpPort}`,
      }
    },
    // 删除
    remove (row) {
      transferDelete(row.id).then(res => {
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
      transfer(page).then(res => {
        console.log(res);
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