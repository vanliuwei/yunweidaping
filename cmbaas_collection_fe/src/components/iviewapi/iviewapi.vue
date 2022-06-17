<template>
  <!-- <div>
    <div>
      <div class="head_right">
        <a @click="nodeTab1" :class="node == 2 ? 'active' : ''">存储服务</a>
        <a @click="nodeTab" :class="node == 1 ? 'active' : ''">网络监控节点</a>
      </div>
    </div>
    <div class="tps" v-show="node === 1">
      <div class="api">
        <p>核心API调用量</p>
        <p class="type">{{apiData}}次</p>
      </div>
      <div class="api">
        <p>CMBaas控制台可靠性</p>
        <p class="type">{{cmbaas}}</p>
      </div>
    </div>
    <div class="tps" v-show="node === 2">
      <div class="apip">
        <p>全网NET使用率</p>
        <p class="type">{{apiData}}次</p>
      </div>

    </div>
  </div> -->
  <div>
    <div></div>
    <div class="tps" v-show="node === 1">
      <div class="api">
        <!-- <Poptip trigger="hover" title="Title" content="content"> -->
        <p>核心API调用量</p>
        <!-- </Poptip> -->
        <p class="type">{{ apiData }}次</p>
      </div>
      <div class="api">
        <!-- <Poptip trigger="hover" title="Title" content="content"> -->
        <p>CMBaas可靠性</p>
        <!-- </Poptip> -->

        <p class="type">{{ cmbaas }}</p>
      </div>
      <div class="api">
        <Select v-model="use" class="com_select" style="width:120px">
          <Option v-for="item in usage" :value="item.value" :key="item.value">{{
            item.label
          }}</Option>
        </Select>
        <!-- <Poptip trigger="hover" title="全网NET使用率公式" content="content"> -->
        <!-- <p>全网NET使用率</p> -->
        <!-- </Poptip> -->

        <p class="type">{{ WholenetworkNet }}</p>
      </div>
    </div>
    <!-- <div class="tps" v-show="node === 2">
      <div class="apip">
        <p>全网NET使用率</p>
        <p class="type">{{apiData}}次</p>
      </div>
    </div> -->
  </div>
</template>

<script>
import {
  getApi,
  getCmbaas,
  queryWholenetworkNet,
  queryWholenetworkCpu,
  queryWholenetworkRam,
} from "@/api/data";
export default {
  name: "iviewapi",

  data() {
    return {
      apiData: "",
      cmbaas: "",
      WholenetworkNet: "",
      node: 1,
      use: "全网NET使用率",
      usage: [
        {
          value: "全网NET使用率",
          label: "全网NET使用率",
        },
        {
          value: "全网CPU使用率",
          label: "全网CPU使用率",
        },
        {
          value: "全网RAM使用率",
          label: "全网RAM使用率",
        },
      ],
    };
  },

  mounted() {
    this.timer = setInterval(() => {
      this.getApiFun();
    }, 5000);
    this.getApiFun();
  },

  methods: {
    nodeTab() {
      this.node = 1;
    },
    nodeTab1() {
      this.node = 2;
    },

    getApiFun() {
      getApi().then((res) => {
        this.apiData = res.data;
      });
      getCmbaas().then((res) => {
        this.cmbaas = res.data;
      });
      queryWholenetworkNet().then((res) => {
        this.WholenetworkNet = res.data;
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  watch: {
    use: {
      handler(value) {
        if (value === "全网NET使用率") {
          queryWholenetworkNet().then((res) => {
            this.WholenetworkNet = res.data;
          });
        } else if (value === "全网CPU使用率") {
          queryWholenetworkCpu().then((res) => {
            this.WholenetworkNet = res.data;
          });
        } else if (value === "全网RAM使用率") {
          queryWholenetworkRam().then((res) => {
            this.WholenetworkNet = res.data;
          });
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.tps {
  width: 100%;
  height: 70px;
  box-sizing: border-box;
  border: 1px solid #116987;
  color: #ffccff60;
  box-sizing: border-box;
  border: 2px solid #116987;
  border-image: -webkit-linear-gradient(#1b6199, #1b6199) 20 20;
  // border-image: -moz-linear-gradient(#1B6199, #1B6199) 20 20;
  // border-image: -o-linear-gradient(#1B6199, #1B6199) 20 20;
  border-image: linear-gradient(#05062a, #1b6199) 20 20 20 20;
  // box-shadow: inset 0px 1px 35px 0px rgba(75, 137, 255, 0.5);
  background: linear-gradient(to left, #37f4f5, #37f4f5) left bottom no-repeat,
    linear-gradient(to bottom, #37f4f5, #37f4f5) left bottom no-repeat,
    linear-gradient(to left, #37f4f5, #37f4f5) right bottom no-repeat,
    linear-gradient(to left, #37f4f5, #37f4f5) right bottom no-repeat;
  background-size: 1px 28px, 21px 1px;
  margin-bottom: 1%;
  display: flex;
  justify-content: space-between;
  .api {
    box-sizing: border-box;
    padding-top: 3%;
    height: 80px;
    color: #cce6ff;
    width: 50%;
    text-align: center;
  }
  .apip {
    box-sizing: border-box;
    padding-top: 3%;
    height: 80px;
    color: #cce6ff;
    width: 50%;
    text-align: center;
    margin: auto;
  }
  p {
    cursor: pointer;
  }
}
.head_right {
  display: flex;
  flex-direction: row-reverse;
  margin-right: 14%;
  .active {
    background: #304c66;
    border: 2px solid #248d9a;
  }
  a {
    padding: 1% 3%;
    border: 2px solid #0f455d;
    color: #cce6ff;
  }
  // 右边字的颜色
  .head_right_text {
    color: white;
  }
}
.type {
  color: #ffffff;
}
.com_select {
  width: 50%;
  background-color: transparent;
  border-radius: calc((100vw / 1920) * 4);
  color: #cce6ff;
  /deep/.ivu-select-selection {
    background-color: transparent !important;
    height: 25px;
    border-color: #15477a;
  }
  /deep/.ivu-select-selected-value {
    height: 20px;
    line-height: 20px;
  }
  /deep/.ivu-select-placeholder {
    height: 20px;
    line-height: 20px;
  }
}
</style>
