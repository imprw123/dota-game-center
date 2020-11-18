<template>
  <div class="header">
    <div class="inHeader">
      <span v-bind:class="{'current':currentFlag == 'Home'}">
        <router-link :to="'/'" >首页</router-link>
      </span>
      <span v-bind:class="{'current':currentFlag == 'PT'}">
        <router-link :to="'PT'">平台</router-link>
      </span>
      <span v-bind:class="{'current':currentFlag == 'DOTA'}">
        <router-link :to="'DOTA'">DOTA</router-link>
      </span>
      <span v-bind:class="{'current':currentFlag == 'IMBA'}">
        <router-link :to="'IMBA'">IMBA</router-link>
      </span>
      <span v-bind:class="{'current':currentFlag == 'RPGMAP' || currentFlag == 'RPG'}">
        <router-link :to="'RPGMAP'">RPG商店</router-link>
      </span>
    </div>
    <div class="my-order">
      <span v-bind:class="{'current':currentFlag == 'ORDER'}">
        <router-link :to="'ORDER'">我的订单</router-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data(){
   return {
      currentFlag:''
   }
  },
  mounted(){
    this.currentFlag=this.$route.name;
    console.log(this.$route.name)
  }
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
.inHeader span:hover a{
   color: #3dbeff;
}
.inHeader span a {
  width: 100%;
  height: 100%;
  font-family: "微软雅黑";
  color: #dfdfdf;
  display: block;
}
.inHeader span.current  a{
  color: #3dbeff;
  font-weight: bold;
}
.my-order {
  width: 240px;
  height: 45px;
  line-height: 45px;
  float: left;
  text-align: right;
  padding-right: 50px;
}
.my-order span a {
  color: #dfdfdf;
  font-size: 18px;
  font-family: "微软雅黑";
}
.my-order span:hover a{
   color: #3dbeff;
}
.my-order span.current a{
   color: #3dbeff;
  font-weight: bold;
}
</style>
