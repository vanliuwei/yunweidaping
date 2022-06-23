<template>
  <div class="seleTile">
    <div >
      <!-- <Button type="text"> <b>节点类型:</b> </Button>
      <Select v-model="model1" style="width:120px" @on-change='operType'>
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select> -->
      <!-- <Button type="text"> <b>账户名称</b> </Button> -->
      <!-- <Input v-model="opValue" placeholder="账户名称" style="width: 150px" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
      <!-- <Button type="text"> <b>统计时间</b> </Button>

      <DatePicker type="daterange" split-panels placeholder="日期" style="width: 200px"></DatePicker>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
      <!-- <Button type="primary" @click="reset">重置</Button>&nbsp;&nbsp;&nbsp; -->
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
    <Page show-elevator show-sizer show-total class="page" :total="dataCount" placement="top" :page-size-opts="[10, 20, 40, 60, 100]" @on-change="changepage" style="text-align: right" @on-page-size-change="pageSizeChange" />
    <Modal :draggable="true" v-model="modal" width="700" :title="formItem.alertTitle" :z-index="1000" sticky :mask-closable="false">
      <Form ref="formItem" :rules="formItemRule" :model="formItem" :label-width="140">
           <FormItem label="节点名称" prop="nodeName">
          <Input placeholder="请输入" style="width: 500px; vertical-align: baseline" v-model="formItem.nodeName" />
        </FormItem>
          <!-- <FormI
        <!-- <FormItem label="下载数量" prop="downloadNum">
          <Input placeholder="请输入" style="width: 500px; vertical-align: baseline" v-model="formItem.downloadNum" />
        </FormItem> -->
        <FormItem label="gc清理空间大小" prop="gcCleanSpaceSize">
          <!-- <Select v-model="formItem.gcCleanSpaceSize" placeholder="请输入" style="width: 500px; vertical-align: baseline" @on-change='Getchain'>
            <Option v-for="item in chainType" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select> -->
          <Input placeholder="请输入" style="width: 500px; vertical-align: baseline" v-model="formItem.gcCleanSpaceSize" />
        </FormItem>
         <FormItem label="GC开始时间" prop="gcStartTime">
            <DatePicker type="date"  style="width: 500px; vertical-align: baseline" v-model="formItem.gcStartTime" format="yyyy-MM-dd HH:mm:ss" @on-change='StartTime'></DatePicker>
        </FormItem>
          <FormItem label="GC结束时间" prop="gcEndTime">
            <DatePicker type="date"  style="width: 500px; vertical-align: baseline" v-model="formItem.gcEndTime" format="yyyy-MM-dd HH:mm:ss" @on-change='EndTime'></DatePicker>
        </FormItem>
          <FormItem label="IP地址" prop="nodeIp">
          <Input placeholder="请输入" style="width: 500px; vertical-align: baseline" v-model="formItem.nodeIp" />
        </FormItem>
          <!-- <FormItem label="上传数量" prop="uploadNum">
          <Input placeholder="请输入" style="width: 500px; vertical-align: baseline" v-model="formItem.uploadNum" />
        </FormItem> -->
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancel('formItem')">取消</Button>
        <Button type="primary" @click="ok('formItem')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { maintainList, maintainUpdate, maintainDelet } from '@/api/data';
export default {
  name: 'ipfgcmaintain',

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
        nodeName: '',
        gcCleanSpaceSize: '',
        gcStartTime:'',
        gcEndTime:'',
        nodeIp:'',
        // uploadNum:''
      },


      formItemRule: {
         nodeName: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        // downloadNum: [
        //   { required: true, message: '不能为空', trigger: 'blur' }
        // ],
        gcCleanSpaceSize: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
       gcStartTime: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
      gcEndTime: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
      nodeIp: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
      // uploadNum: [
      //     { required: true, message: '不能为空', trigger: 'blur' }
      //   ],

        // chainName: [
        //   { required: true, message: '不能为空', trigger: 'blur' },
        //   // { required: true, max: 13, message: '长度不能超过13', trigger: 'blur' },
        //   // {
        //   //   type: 'string',
        //   //   pattern: /^[0-9a-zA-Z]*$/g,
        //   //   message: '格式应为0-9a-zA-Z',
        //   //   trigger: 'blur'
        //   // }
        // ],



      },
      dataCount: 0,
      model1: '',
      operColumns: [
           {
          title: 'IP',
          key: 'nodeIp'
        },
         {
          title: '节点名称',
          key: 'nodeName'
        },
        // {
        //   title: '下载数量',
        //   key: 'downloadNum'
        // },
        {
          title: 'GC清理空间大小',
          key: 'gcCleanSpaceSize'
        },
         {
          title: 'GC开始时间',
          key: 'gcStartTime'
        },
         {
          title: 'gc结束时间',
          key: 'gcEndTime'
        },
        
        //   {
        //   title: '上传数量',
        //   key: 'uploadNum'
        // },
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
         nodeName: '',
        gcCleanSpaceSize: '',
        gcStartTime:'',
        gcEndTime:'',
        nodeIp:'',
        // uploadNum:''
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
        nodeName: `${this.operationList[index].nodeName}`,
        gcCleanSpaceSize: `${this.operationList[index].gcCleanSpaceSize}`,
        gcStartTime: `${this.operationList[index].gcStartTime}`,
        gcEndTime: `${this.operationList[index].gcEndTime}`,
        nodeIp: `${this.operationList[index].nodeIp}`,
        // uploadNum: `${this.operationList[index].uploadNum}`,
        id: `${this.operationList[index].id}`
      }
      // }
    },
    GetnodeName (e) {
      this.formItem.databaseType = e
    },
    Getchain (e) {
      this.formItem.databaseType = e
    },
    StartTime(starttime){
      this.formItem.gcStartTime = starttime
    },
     EndTime(endtime){
      this.formItem.gcEndTime = endtime
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
          if (this.formItem.id) {
            // 编辑
            maintainUpdate(this.formItem).then(res => {
              if (res.status === 200) {
                this.modal = false
                this.msgInfo('success', '编辑成功！', true)
                this.getOperationFun()
              }
            })
          } else {
            // 新增
            maintainUpdate(this.formItem).then(res => {
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
    // 删除
    remove (index) {
      maintainDelet(this.operationList[index].id).then(res => {
        this.getOperationFun()
      })
    },
    getOperationFun () {
      let OperPage = {
        pageParam: this.PageParam,
        // downloadNum: this.opValue
      }
      maintainList(OperPage).then(res => {
        const { records } = res.data.data
        this.operationList = records
        this.dataCount = res.data.data.total
      })
    }
  },
};
</script>

<style lang="less" scoped>
.seleTile {
  margin: 3%;
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