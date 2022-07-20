import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {
    getparams,
    localRead,
    localSave
} from '@/lib/util'
import {
    getUserName
} from '@/api/data';
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
        meta: {
            title: '数据管理'
        },
        children: [{
                path: '/monitor',
                name: 'monitor',
                meta: {
                    title: '运维监测大屏'
                },
                component: () => import('../views/monitor.vue')
            },
            {
                path: '/analyse',
                name: 'analyse',
                meta: {
                    title: '运营分析大屏'
                },
                component: () => import('../views/analyse.vue')
            },
            {
                path: '/fault',
                name: 'fault',
                meta: {
                    title: '资源管理'
                },
                component: () => import('../views/fault.vue')
            },
            {
                path: '/statement',
                name: 'statement',
                meta: {
                    title: '能力/应用/调用方报表'
                },
                component: () => import('../views/statement.vue')
            },
            {
                path: '/Eosbusiness',
                name: 'Eosbusiness',
                meta: {
                    title: 'EOS业务'
                },
                component: () => import('../views/EosSpecial/Eosbusiness.vue')
            },
            {
                path: '/Eosnode',
                name: 'Eosnode',
                meta: {
                    title: 'EOS节点监测'
                },
                component: () => import('../views/EosSpecial/Eosnode.vue')
            },
            {
                path: '/Eoscontract',
                name: 'Eoscontract',
                meta: {
                    title: 'EOS合约监测'
                },
                component: () => import('../views/EosSpecial/Eoscontract.vue')
            },
            {
                path: '/Eoslian',
                name: 'Eoslian',
                meta: {
                    title: 'EOS链监测'
                },
                component: () => import('../views/EosSpecial/Eoslian.vue')
            },

            {
                path: '/IPFMonitor',
                name: 'IPFMonitor',
                meta: {
                    title: 'IPF监测'
                },
                component: () => import('../views/IPFSpecial/IPFMonitor.vue')
            },
            {
                path: '/IPFGcMonitor',
                name: 'IPFGcMonitor',
                meta: {
                    title: 'IPF GC监测'
                },
                component: () => import('../views/IPFSpecial/IPFGcMonitor.vue')
            },
            {
                path: '/IPFGcMaintain',
                name: 'IPFGcMaintain',
                meta: {
                    title: 'IPF GC维护'
                },
                component: () => import('../views/IPFSpecial/IPFGcMaintain.vue')
            }, {
                path: '/FabMonitor',
                name: 'FabMonitor',
                meta: {
                    title: '节点监测'
                },
                component: () => import('../views/FabricSpecial/FabricMonitor.vue')
            }, {
                path: '/NodeInfo',
                name: 'NodeInfo',
                meta: {
                    title: '省节点信息'
                },
                component: () => import('../views/NodeSpecial/NodeInfo.vue')
            },
            {
                path: '/Resources',
                name: 'Resources',
                meta: {
                    title: '资源监测'
                },
                component: () => import('../views/ResourcesMonitoring/Resources.vue')
            }, {
                path: '/AlarmRules',
                name: 'AlarmRules',
                meta: {
                    title: '告警规则'
                },
                component: () => import('../views/AlarmMonitoring/AlarmRules.vue')
            }, {
                path: '/AlarmQuery',
                name: 'AlarmQuery',
                meta: {
                    title: '告警查询'
                },
                component: () => import('../views/AlarmMonitoring/AlarmQuery.vue')
            },
            {
                path: '/UserJournal',
                name: 'UserJournal',
                meta: {
                    title: ''
                },
                component: () => import('../views/LogMonitoring/UserJournal.vue')
            },
            {
                path: '/SystemLog',
                name: 'SystemLog',
                meta: {
                    title: ''
                },
                component: () => import('../views/LogMonitoring/SystemLog.vue')
            },
            {
                path: '/onestatement',
                name: 'onestatement',
                meta: {
                    title: ''
                },
                component: () => import('../views/Operational/onestatement.vue')
            },
            {
                path: '/Basicinfo',
                name: 'Basicinfo',
                meta: {
                    title: ''
                },
                component: () => import('../views/Operational/Basicinfo.vue')
            }, {
                path: '/Basicnode',
                name: 'Basicnode',
                meta: {
                    title: ''
                },
                component: () => import('../views/Operational/Basicnode.vue')
            }, {
                path: '/Basicbusiness',
                name: 'Basicbusiness',
                meta: {
                    title: ''
                },
                component: () => import('../views/Operational/Basicbusiness.vue')
            }, {
                path: '/transfer',
                name: 'transfer',
                meta: {
                    title: ''
                },
                component: () => import('../views/Operational/transfer.vue')
            },
        ]
    },
    {

        path: '/about',
        name: 'About',
        meta: {
            title: '运营分析大屏21'
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/notoken',
        name: 'notoken',
        meta: {
            title: '暂无权限'
        },
        component: () => import('../views/notoken.vue')
      },
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    let params = getparams()
    if (to.name == 'notoken') {
        next();
    } else if (params.token) {
        localSave('token', params.token)
        getUserName().then((res)=>{
            // console.log("name",)
            localSave('name', res.data.data) //保存用户名
        })
        next()
    }else if (localRead('token')) {
        // console.log("2222")
        next()
    } else {
        console.log(to.name, '3333');
        // router.push({name:'notoken'})
        next({ name: 'notoken' })
    
    }

   
})
export default router