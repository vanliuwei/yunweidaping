<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div class="layout">
      <Layout :style="{ minHeight: '100vh' }">
        <Sider :collapsed-width="0" v-model="isCollapsed" hide-trigger collapsible :style="{
            position: 'fixed',
            height: '100vh',
            left: 0,
            overflow: 'auto',
          }">
          <!-- collapsible 导航收缩 -->
          <Menu :active-name="activeName" :open-names="openName" width="auto" theme="dark">
            <div v-for="(item, index) in toolMenu" :key="index" :class="menuitemClasses">
              <Submenu v-if="item.children" :name="item.to">
                <template slot="title">
                  <Icon :type="item.selfIcon"></Icon>
                  <span> {{ item.name }}</span>
                </template>
                <MenuItem :name="m.to" :to="m.to" v-for="(m, n) in item.children" :key="n">
                <Icon :type="m.selfIcon"></Icon> <span>{{ m.name }}</span>
                </MenuItem>
              </Submenu>
              <MenuItem v-else :name="item.to" :to="item.to">
              <Icon :type="item.selfIcon"></Icon>
              <span> {{ item.name }}</span></MenuItem>
            </div>
          </Menu>
        </Sider>
        <Layout :style="{ padding: '0 24px 24px', marginLeft: '200px' }">
          <!-- <Breadcrumb :style="{margin: '24px 0'}">
              <BreadcrumbItem>Home</BreadcrumbItem>
              <BreadcrumbItem>Components</BreadcrumbItem>
              <BreadcrumbItem>Layout</BreadcrumbItem>
            </Breadcrumb> -->
          <Content :style="{ padding: '24px', minHeight: '280px', background: '#fff' }">
            <router-view />
          </Content>
        </Layout>
      </Layout>
    </div>
  </div>
</template>
<script>
export default {
  name: "Home",
  data () {
    return {
      activeName: "", //当前选中
      openName: ["Cmbass"], //默认展开二级-基础数据
      isCollapsed: false,
      toolMenu: [
        {
          name: "首页",
          to: "/index",
          selfIcon: "ios-navigate",
        },
        {
          name: "监控大屏",
          to: "/Cmbass",
          selfIcon: "ios-navigate",
          children: [
            {
              name: "运维监测大屏",
              to: "/monitor",
              selfIcon: "ios-navigate",
            },
            {
              name: "运营分析大屏",
              to: "/analyse",
              selfIcon: "ios-keypad",
            },
          ],
        },
        {
          name: "EOS专题",
          to: "/Business",
          selfIcon: "ios-keypad",
          children: [
            {
              name: "EOS业务",
              to: "/Eosbusiness",
              selfIcon: "ios-analytics",
            },
            {
              name: "EOS节点监测",
              selfIcon: "ios-analytics",
              to: "/Eosnode",
            },
            {
              name: "EOS合约监测",
              selfIcon: "ios-analytics",
              to: "/Eoscontract",
            },
            {
              name: "EOS链监测",
              selfIcon: "ios-analytics",
              to: "/Eoslian",
            },
          ],
        },
        {
          name: "IPFS专题",
          to: "/IPFSpecial",
          selfIcon: "ios-analytics",
          children: [
            {
              name: "IPFS监测",
              to: "/IPFMonitor",
              selfIcon: "ios-analytics",
            },
            {
              name: "IPFS GC监测",
              selfIcon: "ios-analytics",
              to: "/IPFGcMonitor",
            },
            {
              name: "IPFS GC维护",
              selfIcon: "ios-analytics",
              to: "/IPFGcMaintain",
            },
          ],
        },
        {
          name: "Fabric监控",
          to: "/FabricSpecial",
          selfIcon: "ios-analytics",
          children: [
            {
              name: "节点监测",
              to: "/FabMonitor",
              selfIcon: "ios-analytics",
            },
          ],
        },
        {
          name: "省节点监测",
          to: "/NodeSpecial",
          selfIcon: "ios-analytics",
          children: [
            {
              name: "省节点信息",
              to: "/NodeInfo",
              selfIcon: "ios-analytics",
            },
          ],
        },
        {
          name: "资源监测",
          to: "/ResourcesMonitoring",
          selfIcon: "ios-analytics",
          children: [
            {
              name: "资源监测",
              to: "/Resources",
              selfIcon: "ios-analytics",
            },
          ],
        },
        {
          name: "告警监测",
          to: "/Report",
          selfIcon: "ios-analytics",
          children: [
            {
              name: "告警规则",
              to: "/AlarmRules",
              selfIcon: "ios-analytics",
            },
            {
              name: "告警查询",
              to: "/AlarmQuery",
              selfIcon: "ios-analytics",
            },
          ],
        },
        // {
        //   name: '日志监测',
        //   to: '/LogMonitoring',
        //   selfIcon: 'ios-analytics',
        //   children: [
        //     {
        //       name: '接口日志',
        //       to: '/UserJournal',
        //       selfIcon: 'ios-analytics',
        //     }, {
        //       name: '应用日志',
        //       to: '/SystemLog',
        //       selfIcon: 'ios-analytics',
        //     },
        //   ]
        // },
        // {
        //   name: 'IPFS监控',
        //   to: '/ReportManagement',
        //   selfIcon: 'ios-analytics',
        // },
        // {
        //   name: '告警监控',
        //   to: 'warning',
        //   selfIcon: 'ios-analytics',
        //   children: [
        //     {
        //       name: '告警规则',
        //       to: '/fault',
        //       selfIcon: 'ios-analytics',
        //     },
        //     {
        //       name: '告警查询',
        //       to: '/gate',
        //     }
        //   ]
        // },
        {
          name: "运营指标",
          selfIcon: "ios-analytics",
          to: "/Notice",
          children: [
            // {
            //   name: '资源管理',
            //   to: '/fault',
            //   selfIcon: 'ios-analytics',
            // },
            {
              name: "能力/应用/调用方报表",
              to: "/statement",
              selfIcon: "ios-analytics",
            },
          ],
        },
        {
          name: "资源管理",
          selfIcon: "ios-analytics",
          to: "/fault",
        },
        // {
        //   name: '运维监测',
        //   to: '/Operational',
        //   selfIcon: 'ios-analytics',
        //   children: [
        //     {
        //       name: '区块链能力',
        //       to: '/onestatement',
        //       selfIcon: 'ios-analytics',
        //     }, {
        //       name: '区块链基础信息',
        //       to: '/Basicinfo',
        //       selfIcon: 'ios-analytics',
        //     },
        //     //  {
        //     //   name: '区块链节点',
        //     //   to: '/Basicnode',
        //     //   selfIcon: 'ios-analytics',
        //     // }, {
        //     //   name: '区块链业务',
        //     //   to: '/Basicbusiness',
        //     //   selfIcon: 'ios-analytics',
        //     // },
        //     {
        //       name: 'sftp的传输信息',
        //       to: '/transfer',
        //       selfIcon: 'ios-analytics',
        //     },
        //   ]
        // },
      ],
    };
  },
  methods: {},

  mounted () {
    this.activeName = this.$route.path;
    // setTimeout(function () {
    //   console.log(document.getElementsByClassName('ivu-table-body'))
    //   let table = document.getElementsByClassName('ivu-table-body');
    //   let timer = null;
    //   let _this = this
    //   function play () {
    //     clearInterval(timer);
    //     timer = setInterval(function () {
    //       table[0].scrollTop++;
    //       if ((table[0].scrollTop) >= (60 / 2)) {
    //         table[0].scrollTop = 0;
    //       }

    //     }, 100)
    //   }
    //   setTimeout(play, 500);
    //   table.onmouseover = function () {
    //     clearInterval(timer)
    //   };
    //   table.onmouseout = play;
    // }, 0)
  },
  computed: {
    menuitemClasses: function () {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
  },
};
</script>

<style scoped lang="less">
/* .layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
} */

.ivu-layout {
  padding: 0 !important;
}
.ivu-layout-content {
  padding: 0 !important;
}
.layout-con {
  height: 100%;
  width: 100%;
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 100px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 10px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 10px;
}
.ivu-layout-content {
  background: #f5f7f9 !important;
}
.ivu-menu-item {
  display: flex;
  i {
    margin-top: 3px;
  }
}
</style>
