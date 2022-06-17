<template>
  <div>
    <div class="seleTile">
      <!-- <Button type="text"> <b>节点类型:</b> </Button>
      <Select v-model="model1" style="width:120px" @on-change='operType'>
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select> -->
      <Button type="text"> <b>账户名称</b> </Button>
      <Input v-model="opValue" placeholder="账户名称" style="width: 150px" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <!-- <Button type="text"> <b>统计时间</b> </Button>

      <DatePicker type="daterange" split-panels placeholder="日期" style="width: 200px"></DatePicker>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
      <Button type="primary" @click="reset">重置</Button>&nbsp;&nbsp;&nbsp;
      <Button type="primary" @click="operSearch">查询</Button>

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
    <Page show-elevator show-sizer class="page" show-total :total="dataCount" placement="top" :page-size-opts="[10, 20, 40, 60, 100]" @on-change="changepage" style="text-align: right" @on-page-size-change="pageSizeChange" />
    <Modal :draggable="true" v-model="modal" width="700" :title="formItem.alertTitle" :z-index="1000" sticky :mask-closable="false">
      <Form ref="formItem" :rules="formItemRule" :model="formItem" :label-width="140">
        <FormItem label="账户名称" prop="accountName">
          <Input placeholder="请输入" style="width: 500px; vertical-align: baseline" v-model="formItem.accountName" />
        </FormItem>
        <FormItem label="账户类型" prop="accountType">
          <Select v-model="formItem.accountType" placeholder="请输入" style="width: 500px; vertical-align: baseline">
            <Option v-for="(item,index) in chainType" :value="item.value" :key="index">{{item.label}}</Option>
          </Select>
        </FormItem>
        <FormItem label="账户能力类型" prop="accountNameAbility" v-if="formItem.accountType==='contract'">
          <Select v-model="formItem.accountNameAbility" placeholder="请输入" style="width: 500px; vertical-align: baseline">
            <Option v-for="(item,index) in abilityTypeList" :value="item.value" :key="index">{{item.label}}</Option>
          </Select>
        </FormItem>
        <FormItem label="所属合约" prop="contract" v-if="formItem.accountType==='normal'">
          <Select v-model="formItem.contract" placeholder="请输入" style="width: 500px; vertical-align: baseline">
            <Option v-for="(item,index) in contractList" :value="item.value" :key="index">{{item.label}}</Option>
          </Select>
        </FormItem>
        <FormItem label="账户描述" prop="accountDescription">
          <Input placeholder="请输入" style="width: 500px; vertical-align: baseline" v-model="formItem.accountDescription" />
        </FormItem>
        <FormItem label="数据库IP" prop="databaseIp" v-if="formItem.accountType==='contract'">
          <Input placeholder="请输入" style="width: 500px; vertical-align: baseline" v-model="formItem.databaseIp" />
        </FormItem>
        <FormItem label="数据库端口" prop="databasePort" v-if="formItem.accountType==='contract'">
          <Input placeholder="请输入" style="width: 500px; vertical-align: baseline" v-model="formItem.databasePort" />
        </FormItem>
        <FormItem label="数据库类型" prop="databaseType" v-if="formItem.accountType==='contract'">
          <Select v-model="formItem.databaseType" placeholder="请输入" style="width: 500px; vertical-align: baseline">
            <Option v-for="(item,index) in dataType" :value="item.value" :key="index">{{item.label}}</Option>
          </Select>
        </FormItem>
        <FormItem label="数据库名称" prop="databaseName" v-if="formItem.accountType==='contract'">
          <Input placeholder="请输入" style="width: 500px; vertical-align: baseline" v-model="formItem.databaseName" />
        </FormItem>
        <FormItem label="区块链名称" prop="chainName">
          <!-- <Input placeholder="请输入" style="width: 500px; vertical-align: baseline" v-model="formItem.chainName" /> -->
          <Select v-model="formItem.chainName" placeholder="请输入" style="width: 500px; vertical-align: baseline">
            <Option v-for="(item,index) in chainNameList" :value="item.value" :key="index   ">{{item.label}}</Option>
          </Select>
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
import { getConList, contractAdd, contractDelete, abilityType, contractType, getnodename, contractUp } from '@/api/data';
export default {
  name: 'tableipfs',

  data () {
    let validatePort = (rule, value, callback) => {
      let reg = /^(([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5]))$/;
      if (value == '') {
        return callback(new Error('请输入端口号'))
      } else if (reg.test(value) == false) {
        callback(new Error('请输入正确的端口号'))
      } else {
        callback()
      }
    }
    return {
      opValue: '',
      modal: false,
      PageParam: {
        pageSize: 10,
        pageIndex: 1
      },
      formItem: {
        alertTitle: '新增链',
        accountName: '',
        accountType: '',
        databaseType: '',
        databaseName: '',
        nodeType: '',
        databasePort: '',
        accountDescription: '',
        databaseIp: '',
        accountNameAbility: '',
        contract: '',
        status: ''
      },
      dataType: [
        {
          value: 'elastic_search',
          label: 'elastic_search'
        },
        {
          value: 'mongodb',
          label: 'mongodb'
        },
      ],
      chainType: [
        {
          value: 'normal',
          label: 'normal'
        },
        {
          value: 'contract',
          label: 'contract'
        },
      ],
      abilityTypeList: [],
      contractList: [],
      chainNameList: [],
      formItemRule: {
        accountName: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        accountType: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        accountDescription: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        databaseIp: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        databasePort: [
          { required: true, trigger: 'blur', validator: validatePort, }
        ],

        databaseType: [
          { required: true, message: '请选择一项', trigger: 'blur' }
        ],
        databaseName: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        contract: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        chainName: [
          { required: true, message: '不能为空', trigger: 'blur' },
          // { required: true, max: 13, message: '长度不能超过13', trigger: 'blur' },
          // {
          //   type: 'string',
          //   pattern: /^[0-9a-zA-Z]*$/g,
          //   message: '格式应为0-9a-zA-Z',
          //   trigger: 'blur'
          // }
        ],
        accountNameAbility: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],


      },
      dataCount: 0,
      model1: '',
      operColumns: [
        {
          title: '账户名称',
          key: 'accountName'
        },
        {
          title: '账户类型',
          key: 'accountType'
        },
        {
          title: '账户描述',
          key: 'accountDescription'
        }, {
          title: '数据库IP',
          key: 'databaseIp'
        }, {
          title: '数据库端口',
          key: 'databasePort'
        }, {
          title: '数据库类型',
          key: 'databaseType'
        }, {
          title: '数据库名称',
          key: 'databaseName'
        },
        {
          title: '区块链名称',
          key: 'chainName',
          tooltip: true
        },
        {
          title: '账户能力类型',
          key: 'accountNameAbility',
          tooltip: true
        },
        {
          title: '归属合约',
          key: 'contract',
          tooltip: true
        },

        {
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

  methods: {
    init () {
      this.$nextTick(() => {
        this.$refs['formItem'].resetFields()
      })
      this.formItem = {
        alertTitle: '新增链',
        accountName: '',
        accountType: '',
        accountDescription: '',
        databaseIp: '',
        databasePort: '',
        databaseType: '',
        databaseName: '',
        chainName: ''
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
        accountName: `${this.operationList[index].accountName}`,
        accountType: `${this.operationList[index].accountType}`,
        accountDescription: `${this.operationList[index].accountDescription}`,
        databaseIp: `${this.operationList[index].databaseIp}`,
        databasePort: `${this.operationList[index].databasePort}`,
        databaseType: `${this.operationList[index].databaseType}`,
        databaseName: `${this.operationList[index].databaseName}`,
        chainName: `${this.operationList[index].chainName}`,
        accountNameAbility: `${this.operationList[index].accountNameAbility}`,
        contract: `${this.operationList[index].contract}`,
        id: `${this.operationList[index].id}`
      }
      // }
    },
    Getchain (e) {
      this.formItem.databaseType = e
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
    ok (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log(this.formItem.id);
          if (this.formItem.id) {
            // 编辑
            contractUp(this.formItem).then(res => {
              if (res.status === 200) {
                this.modal = false
                this.msgInfo('success', '编辑成功！', true)
                this.getOperationFun()
              }
            })
          } else {
            // 新增
            if (this.formItem.accountType === 'normal') {
              this.formItem.databaseIp = ''
              this.formItem.databasePort = ''
              this.formItem.databaseName = ''
              this.formItem.databaseType = ''
              this.formItem.accountNameAbility = ''
              contractAdd(this.formItem).then(res => {
                if (res.status === 200) {
                  this.modal = false
                  this.msgInfo('success', '新增成功！', true)
                  this.getOperationFun()
                }
              })
            } else {
              this.formItem.contract = ''
              contractAdd(this.formItem).then(res => {
                if (res.status === 200) {
                  this.modal = false
                  this.msgInfo('success', '新增成功！', true)
                  this.getOperationFun()
                }
              })
            }

          }


        } else {
          this.msgInfo('error', '存在字段校验不符合规范，请检查！', true)
        }
      })
      // this.$refs[name].resetFields()
      // this.init()
    },
    // 删除
    remove (index) {
      contractDelete({ id: this.operationList[index].id }).then(res => {
        this.getOperationFun()
      })
    },
    getOperationFun () {
      let OperPage = {
        pageParam: this.PageParam,
        accountName: this.opValue
      }
      getConList(OperPage).then(res => {
        const { records } = res.data
        this.operationList = records
        this.dataCount = res.data.total
      })
      abilityType().then(res => {
        res.data.map(item => {
          let abilityTypeLists = []
          abilityTypeLists.push({
            value: item.abilityName,
            label: item.abilityName
          })
          this.abilityTypeList = Array.from(new Set(abilityTypeLists))
        })

      })
      contractType().then(res => {
        res.data.map(item => {
          let contractLists = []
          contractLists.push({
            value: item.accountName,
            label: item.accountName
          })
          this.contractList = Array.from(new Set(contractLists))
        })

      })
      getnodename().then(res => {
        res.data.map(item => {
          let chainNameLists = []
          chainNameLists.push({
            value: item.chainName,
            label: item.chainName
          })
          this.chainNameList = Array.from(new Set(chainNameLists))
        })

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