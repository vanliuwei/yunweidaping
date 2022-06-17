<template>
  <div>
    <div class="title">
      <!-- <h2>运营指标</h2> -->
      <div class="hander">
        <!-- <div class="hander_t"></div> -->
        <!-- <Button type="primary"> <b>一键导出</b> </Button> -->
      </div>
    </div>
    <div class="tabs">
      <Tabs :animated="false" ref="tabs" type="card">
        <TabPane label="EOS节点" name='tab1'>
          <Tableeos />
        </TabPane>
        <TabPane label="IPFS节点" name='tab2'>
          <Tableipfs />
        </TabPane>
        <TabPane label="智能合约">
          <Tablecontract />
          <!-- <Table :columns="columns1" :data="data1"></Table> -->
        </TabPane>
        <TabPane label="定时任务">
          <Tabletime />
        </TabPane>
        <TabPane label="节点坐标信息">
          <Toordinate />
        </TabPane>
        <!-- <TabPane label="同比/环比增长率报表">
        <Tabs :animated="false" name='同比'>
          <TabPane label="能力增长率报表" tab="同比">标签一的内容</TabPane>
          <TabPane label="应用增长率报表" tab="同比">标签二的内容</TabPane>
          <TabPane label="能力调用方增长率报表" tab="同比">标签三的内容</TabPane>
        </Tabs>
      </TabPane> -->
      </Tabs>
    </div>
  </div>
</template>

<script>
import Tableeos from '_c/table/tableeos'
import Tableipfs from '_c/table/tableipfs'
import Tablecontract from '_c/table/tablecontract'
import Tabletime from '_c/table/tabletime'
import Toordinate from '_c/table/coordinate'

export default {
  name: 'fault',
  components: {
    Tableeos,
    Tableipfs,
    Tablecontract,
    Tabletime,
    Toordinate
  },
  data () {
    return {

    };
  },

  mounted () {

  },

  methods: {

  },
};
</script>

<style lang="less" scoped>
.title {
  width: 100%;
  height: 2%;

  box-sizing: border-box;
  padding: 1% 5%;
  display: flex;
  justify-content: space-between;
  .hander {
    display: flex;
    .hander_t {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-image: url("../assets/hander.png");
      background-size: 100% 100%;
    }
    p {
      width: 50px;
      line-height: 40px;
      text-align: center;
    }
  }
}
.tabs {
  box-sizing: border-box;
  padding: 1% 2%;
}
</style>