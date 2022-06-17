import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/monitor'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [{
      path: '/monitor',
      name: 'monitor',
      component: () => import('../views/monitor.vue')
    },
    {
      path: '/analyse',
      name: 'analyse',
      component: () => import('../views/analyse.vue')
    },
    {
      path: '/fault',
      name: 'fault',
      component: () => import('../views/fault.vue')
    },
    {
      path: '/statement',
      name: 'statement',
      component: () => import('../views/statement.vue')
    },
    {
      path: '/Eosbusiness',
      name: 'Eosbusiness',
      component: () => import('../views/EosSpecial/Eosbusiness.vue')
    },
    {
      path: '/Eosnode',
      name: 'Eosnode',
      component: () => import('../views/EosSpecial/Eosnode.vue')
    },
    {
      path: '/Eoscontract',
      name: 'Eoscontract',
      component: () => import('../views/EosSpecial/Eoscontract.vue')
    },
    {
        path: '/Eoslian',
        name: 'Eoslian',
        component: () => import('../views/EosSpecial/Eoslian.vue')
    },
    
    {
      path: '/IPFMonitor',
      name: 'IPFMonitor',
      component: () => import('../views/IPFSpecial/IPFMonitor.vue')
    },
    {
      path: '/IPFGcMonitor',
      name: 'IPFGcMonitor',
      component: () => import('../views/IPFSpecial/IPFGcMonitor.vue')
    },
    {
      path: '/IPFGcMaintain',
      name: 'IPFGcMaintain',
      component: () => import('../views/IPFSpecial/IPFGcMaintain.vue')
    },  {
      path: '/FabMonitor',
      name: 'FabMonitor',
      component: () => import('../views/FabricSpecial/FabricMonitor.vue')
    }, {
      path: '/NodeInfo',
      name: 'NodeInfo',
      component: () => import('../views/NodeSpecial/NodeInfo.vue')
    },
    {
      path: '/Resources',
      name: 'Resources',
      component: () => import('../views/ResourcesMonitoring/Resources.vue')
    }, {
      path: '/AlarmRules',
      name: 'AlarmRules',
      component: () => import('../views/AlarmMonitoring/AlarmRules.vue')
    }, {
      path: '/AlarmQuery',
      name: 'AlarmQuery',
      component: () => import('../views/AlarmMonitoring/AlarmQuery.vue')
    },
    {
      path: '/UserJournal',
      name: 'UserJournal',
      component: () => import('../views/LogMonitoring/UserJournal.vue')
    },
    {
      path: '/SystemLog',
      name: 'SystemLog',
      component: () => import('../views/LogMonitoring/SystemLog.vue')
    },
    {
      path: '/onestatement',
      name: 'onestatement',
      component: () => import('../views/Operational/onestatement.vue')
    },
    {
      path: '/Basicinfo',
      name: 'Basicinfo',
      component: () => import('../views/Operational/Basicinfo.vue')
    }, {
      path: '/Basicnode',
      name: 'Basicnode',
      component: () => import('../views/Operational/Basicnode.vue')
    }, {
      path: '/Basicbusiness',
      name: 'Basicbusiness',
      component: () => import('../views/Operational/Basicbusiness.vue')
    }, {
      path: '/transfer',
      name: 'transfer',
      component: () => import('../views/Operational/transfer.vue')
    },
    ]
  },
  {

    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
