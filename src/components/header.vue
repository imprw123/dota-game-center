<template>
  <div class="header">
    <div class="inHeader">
      <span>
        <router-link :to="'/'">首页</router-link>
      </span>
      <span>
        <router-link :to="'PT'">平台</router-link>
      </span>
      <span>
        <router-link :to="'DOTA'">DOTA</router-link>
      </span>
      <span>
        <router-link :to="'IMBA'">IMBA</router-link>
      </span>
      <span>
        <router-link :to="'RPG'">RPG商店</router-link>
      </span>
    </div>
    <div class="my-order">
      <span>我的订单</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>
<style  scoped>
.header {
  width: 1080px;
  height: 45px;
  background: #053249;
}
.inHeader {
  width: 790px;
  height: 45px;
  line-height: 45px;
  display: flex;
  float: left;
}
.inHeader span {
  flex: 1;
  text-align: center;
  color: #dfdfdf;
  font-size: 18px;
  font-family: "微软雅黑";
  cursor: pointer;
}
.inHeader span a {
  width: 100%;
  height: 100%;
  font-family: "微软雅黑";
  color: #dfdfdf;
  display: block;
}
.my-order {
  width: 240px;
  height: 45px;
  line-height: 45px;
  float: left;
  text-align: right;
  padding-right: 50px;
}
.my-order {
  color: #dfdfdf;
  font-size: 18px;
  font-family: "微软雅黑";
}
</style>
