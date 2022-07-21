<template>
    <div>
        <div class="notoken">
            <img src="../assets/indexHome/logor.png" alt="" >
            <p class="titleone">CMBaaS运维分析平台</p>
            <p class="titletwo">token无效，请从CMBaaS访问该平台</p>
        </div>
       
        <p class="bottomtitle">Copyright © 2022 中移信息技术有限公司</p>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang='less'>
body{
    background:#05062a;
}
.notoken{
    height: 215px;
    width:707px;
    padding-top:293px ;
    margin:0 auto;
    text-align: center;
    
    img{
        width: 80px;
        height: 63px;
    }
    .titleone{
        font-size: 30px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #CCE6F6;
        line-height: 16px;
        margin:34px 0 55px 0;
    }
    .titletwo{
        font-size: 40px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #CCE6F6;
        line-height: 60px;
    }

}
.bottomtitle{
    width: 350px;
    height: 16px;
    font-size: 16px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color: #CCE6F6;
    line-height: 24px;
    position:absolute;
    text-align:center;
    left:0;
    right:0;
    bottom:42px;
    margin:0 auto;
}
</style>