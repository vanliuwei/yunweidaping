<template>
  <div class="body">
    <div class="seleTile">
      <Button type="text"> <b>报表模块</b> </Button>
      <!-- <Button type="primary" @click="down" class="down">一键导出下载</Button> -->
    </div>
    <div class="tabs">
      <Tabs :animated="false" type="card" name="tab1">
        <TabPane label="能力使用情况统计报表">
          <Abilityuse />
        </TabPane>
        <TabPane label="能力调用趋势统计表">
          <Abilitycall />
          <!-- <Tableipfs /> -->
        </TabPane>
        <TabPane label="应用趋势排行榜">
          <Trend />
          <!-- <Tablecontract /> -->
        </TabPane>
        <TabPane label="调用方热度排行榜">
          <Callheat />
          <!-- <Tabletime /> -->
        </TabPane>
        <TabPane label="同比/环比增长率报表">
          <Tabs :animated="false" name="tab2">
            <TabPane label="能力增长率报表" tab="tab2">
              <AddAbility />
            </TabPane>
            <TabPane label="应用增长率报表" tab="tab2">
              <Application />
            </TabPane>
            <TabPane label="能力调用方增长率报表" tab="tab2">
              <AbilityToCall />
            </TabPane>
          </Tabs>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import { getCapacity } from '@/api/data';
import Abilityuse from '_c/statement/abilityuse.vue'
import Abilitycall from '_c/statement/abilitycall.vue'
import Trend from '_c/statement/trend.vue'
import Callheat from '_c/statement/callheat.vue'
import AddAbility from '../views/yearOnYear/addAbility.vue'
import Application from '../views/yearOnYear/Application.vue'
import AbilityToCall from '../views/yearOnYear/AbilityToCall.vue'
export default {
  name: 'statement',
  components: {
    Abilityuse,
    Abilitycall,
    Trend,
    Callheat,
    AddAbility,
    Application,
    AbilityToCall
  },
  data () {
    return {
      operColumns: [
        {
          title: 'cron表达式',
          key: 'cronExpression'
        },
        {
          title: '定时任务描述',
          key: 'taskExplain'
        },
        {
          title: '定时任务名称',
          key: 'taskName'
        },
        {
          title: '状态',
          key: 'status',
        }
      ],
      operationList: []
    };
  },

  mounted () {

  },
  methods: {

    msgInfo (type, content, closable = false) {
      this.$Message[type]({
        background: true,
        closable: closable,
        content: content
      })
    },
    down () { },

  },
};
</script>

<style lang="less" scoped>
.body {
  box-sizing: border-box;
  padding: 3%;
}
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
.down {
  float: right;
  margin-right: 3%;
}
</style>