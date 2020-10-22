<template>
  <div class="header">
      <div class="inHeader">
          <span>首页</span>
          <span>平台</span>
          <span>DOTA</span>
        <span>IMBA</span>
         <span>RPG商店</span>
      </div>
      <div class="my-order">
          <span>我的订单</span>
      </div>
  </div>
</template>

<script>


export default {
  name: 'Header',

}
</script>
<style  scoped>
    .header{
        width:1080px;
        height: 45px;
        background: #053249;
    } 
    .inHeader{
        width:790px;
        height: 45px;
        line-height: 45px;
        display: flex;
        float: left;
    }
    .inHeader span{
        flex: 1;
        text-align: center;
        color: #dfdfdf;
        font-size: 18px;
        font-family:'微软雅黑';
        cursor: pointer;
    }
    .my-order{
        width:240px;
        height:45px;
        line-height:45px;
        float:left;
        text-align: right;
        padding-right: 50px;
    }
    .my-order {
        color: #dfdfdf;
        font-size: 18px;
        font-family:'微软雅黑';
    }
</style>
