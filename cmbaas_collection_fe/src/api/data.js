
import Axios from './index'
//api调用量
export let getApi = () => Axios.get("api/v1/transaction/get/api/adjustment/amount");
  
// 全球调用量
export let queryWholenetworkNet = () => Axios.get("api/v1/monitor/api/whole/network/net");
// 全球cpu使用率
export let queryWholenetworkCpu = () => Axios.get("api/v1/monitor/api/whole/network/net");
// ram使用率
export let queryWholenetworkRam = () => Axios.get("api/v1/monitor/api/whole/network/net");

// cmbaas监控
export let getCmbaas = () => Axios.get("api/v1/monitor/api/cmbaas/health/degree")
//网络监控节点
export let getHome = () => Axios.get("api/v1/monitor/api/node/health/degree");
// 存储服务
export let getStor = () => Axios.get("api/v1/monitor/api/ipfs/health/degree");
// tps使用情况
export let getPeak = () => Axios.get("api/v1/monitor/api/chain/recordtps/use");
// 历史峰值
export let getHis = () => Axios.get("api/v1/monitor/api/chain/maxtps");
// tps实时监控
export let getPeakTime = () => Axios.get("api/v1/monitor/api/chain/recordtps/realTime");
// 性能监控 cpu
export let getPerforCpu = (value) => Axios.get("api/v1/monitor/api/node/hostcpu/" + value);
// 性能监控ip
export let getPeakIp = () => Axios.get("api/v1/monitor/api/query/eos/ip");

// 磁盘
export let getPerforDisk = (value) => Axios.get("api/v1/monitor/api/node/hostdisk/" + value);
// 内存
export let getPerforMemory = (value) => Axios.get("api/v1/monitor/api/node/hostmemory/" + value);
// 智能合约名称下拉
export let getContract = () => Axios.get("api/v1/monitor/api/all/contract");
// 下拉请求
export let getContractValue = (value) => Axios.get("api/v1/monitor/api/all/contract/" + value);
// 省份节点ip
export let getNodeIp = () => Axios.get("api/v1/monitor/api/query/node/data");
// 存储节点状态
export let getStorNode = (value) => Axios.post("api/v1/gcrecord/api/listLastIpfsGcRecord", value);
// 告警信息
export let getReport = () => Axios.get("api/v1/alert/api/listAlertMessage");
// 区块链交易数笔
export let getcountData = () => Axios.get("api/v1/transaction/get/chain/count");
// 运营分析大屏

// 能力下各业务交易量
export let getCapacity = () => Axios.get("api/v1/transaction/get/contract/count");
// 运营大屏地图
export let getMap = () => Axios.get("api/v1/api/report/listUseRank");


//周期内总交易量
export let getPeriod = (value) => Axios.get("api/v1/transaction/get/for/day/" + value);

// 周期内业务交易量增量
export let getPeriods = (value) => Axios.get("api/v1/transaction/get/transactionsgroupbycycle/" + value);


// 新业务发展分析
export let getnewNum = () => Axios.get("api/v1/api/eos/account/contract/count");

// 总业务交易分析

export let getTotal = () => Axios.get("api/v1/transaction/get/chain/count");

// 新接入业务交易量
export let getNewTotals = () => Axios.get("api/v1/api/eos/account/contract");

//新接入业务交易量
export let getNewEchart = (value) => Axios.get("api/v1/transaction/get/business/transaction/for/" + value);


export let getTotals = (value) => Axios.get("api/v1/transaction/get/chain/count/for/" + value);

// 年度累计交易量

export let getYeard = (value, data) => Axios.get("api/v1/accumulate/api/listTranscation/zhanglantian/" + value + '/' + data);

//eos节点

export let getOperation = (data) => Axios.post("api/v1/api/node/list", data);
// 删除
export let getEosRemove = (data) => Axios.post("api/v1/api/node/delete", data);
// 新增

export let getEosAdd = (value) => Axios.post("api/v1/api/node/save", value);

// 编辑

export let getEosShow = (value) => Axios.post("api/v1/api/node/update", value);
// ipfs节点
export let getIpfsList = (value) => Axios.post("api/v1/api/ipfs/list", value);

// 智能合约

export let getConList = (data) => Axios.post("api/v1/api/eos/account/list", data);

// 定时任务
export let getTimeList = (data) => Axios.post("api/v1/api/scheduled/task/list", data);

// 调用方热度排行榜
export let getRepor = () => Axios.get("api/v1/api/report/listUseRank");

// 调用方热度导出

export let getDown = () => Axios.get("api/v1/api/export/useRank", { responseType: 'blob' });

// 能力使用情况统计报表下载
export let getAbilityUse = () => Axios.get("api/v1/api/report/listAbilityUse");

// 能力使用情况统计报表

export let getAbilityUseDown = () => Axios.get("api/v1/api/export/abilityUse", { responseType: 'blob' });

// EOS业务
export let getEosBus = (pageSize, pageIndex, blockNum) => {
  if (blockNum) {
    return Axios.get("api/v1/resource/query/transaction/details?pageSize=" + pageSize + '&pageIndex=' + pageIndex + '&blockNum=' + blockNum);
  } else {
    return Axios.get("api/v1/resource/query/transaction/details?pageSize=" + pageSize + '&pageIndex=' + pageIndex);
  }
}

// EOS专题（EOS专题里面的节点监控）
export let getEosnode = (pageSize, pageIndex, ips, nodeStatus) => {
  if (ips && !nodeStatus) {
    return Axios.get("api/v1/resource/query/eos?pageSize=" + pageSize + '&pageIndex=' + pageIndex + '&ips=' + ips);
  } else if (!ips && nodeStatus) {
    return Axios.get("api/v1/resource/query/eos?pageSize=" + pageSize + '&pageIndex=' + pageIndex + '&nodeStatus=' + nodeStatus);
  } else if (!nodeStatus && !ips) {
    return Axios.get("api/v1/resource/query/eos?pageSize=" + pageSize + '&pageIndex=' + pageIndex);
  } else if (nodeStatus && ips) {
    return Axios.get("api/v1/resource/query/eos?pageSize=" + pageSize + '&pageIndex=' + pageIndex + '&ips=' + ips + '&nodeStatus=' + nodeStatus);
  }
}

// EOS专题（EOS专题里面的合约监测）
export let Eoscontract = (pageSize, pageIndex, name) => {
  if (name) {
    return Axios.get("api/v1/resource/query/chain/account?pageSize=" + pageSize + '&pageIndex=' + pageIndex + '&name=' + name);
  } else {
    return Axios.get("api/v1/resource/query/chain/account?pageSize=" + pageSize + '&pageIndex=' + pageIndex);
  }

}
// 省节点监测
export let getNode = (pageSize, pageIndex, ips, nodeAddres) => {
  if (ips && !nodeAddres) {
    return Axios.get("api/v1/resource/query/province/node?pageSize=" + pageSize + '&pageIndex=' + pageIndex + '&ips=' + ips);
  } else if (!ips && nodeAddres) {
    return Axios.get("api/v1/resource/query/province/node?pageSize=" + pageSize + '&pageIndex=' + pageIndex + '&nodeAddres=' + nodeAddres);
  } else if (!nodeAddres && !ips) {
    return Axios.get("api/v1/resource/query/province/node?pageSize=" + pageSize + '&pageIndex=' + pageIndex);
  } else if (nodeAddres && ips) {
    return Axios.get("api/v1/resource/query/province/node?pageSize=" + pageSize + '&pageIndex=' + pageIndex + '&ips=' + ips + '&nodeAddres=' + nodeAddres);
  }

}
// 资源监测
export let getResources = (pageSize, pageIndex,chainId, ips) => {
  if (ips&&!chainId) {
    return Axios.get("api/v1/resource/query/host/resources?pageSize=" + pageSize + '&pageIndex=' + pageIndex + '&ips=' + ips);
  }else if(!ips&&chainId){
    return Axios.get("api/v1/resource/query/host/resources?pageSize=" + pageSize + '&pageIndex=' + pageIndex + '&chainId=' + chainId);
  }else if(ips&&chainId){
    return Axios.get("api/v1/resource/query/host/resources?pageSize=" + pageSize + '&pageIndex=' + pageIndex + '&chainId=' + chainId+ '&ips=' + ips);
  } else {
    return Axios.get("api/v1/resource/query/host/resources?pageSize=" + pageSize + '&pageIndex=' + pageIndex);
  }
}

// 资源监测导出
// export let getResourcesDown = () => Axios.post("api/v1/resource/export/resources", { responseType: 'blob' ,isFileStream: 1,
// headers: {
//   isFileStream: 1, // "Content-Type": "application/octet-stream",
// }
// });
export let getResourcesDown = (data) => {
    return Axios.request({
      url: "api/v1/resource/export/resources",
      data: data,
      method: "POST",
      responseType: "blob",
      isFileStream: 1,
      headers: {
        isFileStream: 1, // "Content-Type": "application/octet-stream",
      },
    });
  };
//  告警信息
export let AlarmRules = (value) => Axios.post("api/v1/api/alert/rules/list", value);

//  接口日志
export let UserJournal = (value) => Axios.post("api/v1/cmbaas/log/interface/list", value);

//  应用日志
export let SystemLog = (value) => Axios.post("api/v1/cmbaas/log/application/list", value);
//  能力调用趋势统计表
export let listApp = () => Axios.get("api/v1/api/report/listApplicationTrend");

// 能力调用趋势统计表下载

export let listAppDown = () => Axios.get("api/v1/api/export/applicationTrend", { responseType: 'blob' });

// 应用趋势排行榜
export let TrendingCharts = () => Axios.get("api/v1/api/report/listAbilityTrend");

// 应用趋势排行榜下载
export let TrendingChartsDown = () => Axios.get("api/v1/api/export/abilityTrend", { responseType: 'blob' });

// 能力增长率报表
export let AddAbility = () => Axios.get("api/v1/api/report/listYearOnYearAndMonthOnMonth/ability");
// 能力增长率报表下载
export let AddAbilityDown = () => Axios.get("api/v1/api/export/yearOnYearAndMonthOnMonth/ability", { responseType: 'blob' });
// 应用增长率报表
export let Application = () => Axios.get("api/v1/api/report/listYearOnYearAndMonthOnMonth/contract");

// 应用增长率报表下载
export let ApplicationDown = () => Axios.get("api/v1/api/export/yearOnYearAndMonthOnMonth/contract", { responseType: 'blob' });

// 能力调用方增长率报表
export let AbilityToCall = () => Axios.get("api/v1/api/report/listYearOnYearAndMonthOnMonth/normal");

// 能力调用方增长率报表下载
export let AbilityToCallDown = () => Axios.get("api/v1/api/export/yearOnYearAndMonthOnMonth/normal", { responseType: 'blob' });


// 运营监测
export let Onestatement = (data) => Axios.post("api/v1/eosAbility/api/list", data);

// 删除
export let OnestatementDelete = (id) => Axios.get("api/v1/eosAbility/api/delete?id=" + id);

// 运营监测编辑
export let OnestatementShow = (data) => Axios.post("api/v1/eosAbility/api/saveOrUpdate", data);
// 新增
export let OnestatementAdd = (data) => Axios.post("api/v1/eosAbility/api/saveOrUpdate", data);

// 区块链基础信息

export let Basicinfo = (data) => Axios.post("api/v1/eosChain/api/list", data);
//删除
export let BasicinfoDelete = (id) => Axios.get("api/v1/eosChain/api/delete?id=" + id);
// 编辑
export let BasicinfoShow = (data) => Axios.post("api/v1/eosChain/api/saveOrUpdate", data);
// 新增
export let BasicinfoAdd = (data) => Axios.post("api/v1/eosChain/api/saveOrUpdate", data);


// 区块链节点

export let Basicnode = (data) => Axios.post("api/v1/eosChainNode/api/list", data);
//删除
export let BasicnodeDelete = (id) => Axios.get("api/v1/eosChainNode/api/delete?id=" + id);
// 编辑
export let BasicnodeShow = (data) => Axios.post("api/v1/eosChainNode/api/saveOrUpdate", data);
// 新增
export let BasicnodeAdd = (data) => Axios.post("api/v1/eosChainNode/api/saveOrUpdate", data);


// 区块链业务

export let Basicbusiness = (data) => Axios.post("api/v1/eosContract/api/list", data);
//删除
export let BasicbusinessDelete = (id) => Axios.get("api/v1/eosContract/api/delete?id=" + id);
// 编辑
export let BasicbusinessShow = (data) => Axios.post("api/v1/eosContract/api/saveOrUpdate", data);
// 新增
export let BasicbusinessAdd = (data) => Axios.post("api/v1/eosContract/api/saveOrUpdate", data);


//sftp的传输信息

export let transfer = (data) => Axios.post("api/v1/sftp/api/list", data);
//删除
export let transferDelete = (id) => Axios.get("api/v1/sftp/api/delete?id=" + id);
// 编辑
export let transferShow = (data) => Axios.post("api/v1/sftp/api/saveOrUpdate", data);
// 新增
export let transferAdd = (data) => Axios.post("api/v1/sftp/api/saveOrUpdate", data);



// eos节点

export let getnodename = (data) => Axios.get("api/v1/eosChain/api/listAll");
//查看eos节点所有节点地址
export let getnodelistAll = (data) => Axios.get("api/v1/nodeLocal/api/listAll");

// 智能合约新增
export let contractAdd = (data) => Axios.post("api/v1/api/eos/account/save", data);
// 编辑
export let contractUp = (data) => Axios.post("api/v1/api/eos/account/update", data);
// 能力类型list
export let abilityType = () => Axios.get("api/v1/eosAbility/api/listAll");
// 所属合约list
export let contractType = () => Axios.get("api/v1/api/eos/account/contract");
//  删除
export let contractDelete = (data) => Axios.post("api/v1/api/eos/account/delete", data);


// 节点坐标信息
export let coordinate = (data) => Axios.post("api/v1/gcrecord/api/list", data);
// 更新编辑
export let coordinateUpdate = (data) => Axios.post("api/v1/gcrecord/api/saveOrUpdate", data);
// 删除
export let coordinateDelet = (id) => Axios.get("api/v1/gcrecord/api/delete?id=" + id);

// ipfs维护


export let maintainList = (data) => Axios.post("api/v1/gcrecord/api/list", data);

export let maintainUpdate = (data) => Axios.post("api/v1/gcrecord/api/saveOrUpdate", data);

export let maintainDelet = (id) => Axios.get("api/v1/gcrecord/api/delete?id=" + id);




//新增接口

export let getList = () => Axios.get("api/v1/cmbaas/chain/getList");

export let checkChain = (id,data) => Axios.post("api/v1/cmbaas/chain/checkChain?chainId="+id, data);

//链监测列表查询
export let queryChainList = (id) => Axios.get("api/v1/cmbaas/chain/queryChainList?chainId="+id);

//节点监测
export let getEosnodes = (pageSize,pageIndex,nodeStatus,ips,chainNames) => {
    if(nodeStatus&&!ips&&!chainNames){
        return Axios.get("api/v1/resource/query/eos?pageSize="+pageSize+"&pageIndex="+pageIndex+"&nodeStatus="+nodeStatus);
    }else if(ips&&!nodeStatus&&!chainNames){
        return Axios.get("api/v1/resource/query/eos?pageSize="+pageSize+"&pageIndex="+pageIndex+'&ips='+ips);
    }else if(chainNames&&!ips&&!nodeStatus){
        return Axios.get("api/v1/resource/query/eos?pageSize="+pageSize+"&pageIndex="+pageIndex+"&chainNames="+chainNames);
    }else if(nodeStatus&&ips&&!chainNames){
        return Axios.get("api/v1/resource/query/eos?pageSize="+pageSize+"&pageIndex="+pageIndex+"&nodeStatus="+nodeStatus+'&ips='+ips);
    }else if(nodeStatus&&chainNames&&!ips){
        return Axios.get("api/v1/resource/query/eos?pageSize="+pageSize+"&pageIndex="+pageIndex+"&nodeStatus="+nodeStatus+"&chainNames="+chainNames);
    }else if(ips&&chainNames&&!nodeStatus){
        return Axios.get("api/v1/resource/query/eos?pageSize="+pageSize+"&pageIndex="+pageIndex+'&ips='+ips+"&chainNames="+chainNames);
    }else if(ips&&nodeStatus&&chainNames){
        return Axios.get("api/v1/resource/query/eos?pageSize="+pageSize+"&pageIndex="+pageIndex+"&nodeStatus="+nodeStatus+'&ips='+ips+"&chainNames="+chainNames);
    }else if(!ips&&!nodeStatus&&!chainNames){
        return Axios.get("api/v1/resource/query/eos?pageSize="+pageSize+"&pageIndex="+pageIndex);
    }
} 

//合约监测
export let Eoscontracts = (pageSize,pageIndex,name,chainNames) =>{
    if(name&&!chainNames){
        return Axios.get("api/v1/resource/query/chain/account?pageSize="+pageSize+"&pageIndex="+pageIndex+"&name="+name);
    }else if(!name&&chainNames){
        return Axios.get("api/v1/resource/query/chain/account?pageSize="+pageSize+"&pageIndex="+pageIndex+'&chainNames='+chainNames);
    }else if(name&&chainNames){
        return Axios.get("api/v1/resource/query/chain/account?pageSize="+pageSize+"&pageIndex="+pageIndex+"&name="+name+'&chainNames='+chainNames);
    }else if(!name&&!chainNames){
        return Axios.get("api/v1/resource/query/chain/account?pageSize="+pageSize+"&pageIndex="+pageIndex);
    }
    
} 
//告警监测
export let listAlertMessageAll = (chainId,alertLevel,description,date) => Axios.get("api/v1/alert/api/listAlertMessageAll?chainId="+chainId+"&alertLevel="+alertLevel+"&description="+description+"&date="+date);


//省节点监测
export let provincenode = (pageSize,pageIndex,chainName,ips,status) => {
    if(chainName&&!ips&&!status){
        return Axios.get("api/v1/resource/query/province/node?pageSize="+pageSize+"&pageIndex="+pageIndex+"&chainName="+chainName);
    }else if(ips&&!chainName&&!status){
        return Axios.get("api/v1/resource/query/province/node?pageSize="+pageSize+"&pageIndex="+pageIndex+'&ips='+ips);
    }else if(status&&!chainName&&!ips){
        return Axios.get("api/v1/resource/query/province/node?pageSize="+pageSize+"&pageIndex="+pageIndex+"&status="+status);
    }else if(chainName&&ips&&!status){
        return Axios.get("api/v1/resource/query/province/node?pageSize="+pageSize+"&pageIndex="+pageIndex+"&chainName="+chainName+'&ips='+ips);
    }else if(chainName&&status&&!ips){
        return Axios.get("api/v1/resource/query/province/node?pageSize="+pageSize+"&pageIndex="+pageIndex+"&chainName="+chainName+"&status="+status);
    }else if(ips&&status&&!chainName){
        return Axios.get("api/v1/resource/query/province/node?pageSize="+pageSize+"&pageIndex="+pageIndex+'&ips='+ips+"&status="+status);
    }else if(ips&&chainName&&status){
        return Axios.get("api/v1/resource/query/province/node?pageSize="+pageSize+"&pageIndex="+pageIndex+"&chainName="+chainName+'&ips='+ips+"&status="+status);
    }else if(!ips&&!chainName&&!status){
        return Axios.get("api/v1/resource/query/province/node?pageSize="+pageSize+"&pageIndex="+pageIndex);
    }
} 

//获取用户名
export let getUserName = ()=>{
    return Axios.request({
        url: "api/user/getUserName",
        method: "GET",
    });
}