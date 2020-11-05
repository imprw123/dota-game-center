<template>
  <div class="myMap">
    <header-tab></header-tab>
    <div class="nav-tab">
      <span>首页</span>
      <em>></em>
      <span>我的搜藏</span>
    </div>
    <div class="map-title">全部搜藏</div>
    <div class="myMapList">
      <ul>
        <li v-for="(item,index) in 10" v-bind:class="{'current':(index+1)%4 == 0}" :key="index">
          <img
            src="http://img.5211game.com/5211/shop/Goods/Basic/17372.jpg?rand=637388729297809734"
            class="imgShow"
          />
          <div class="rpg-left">
            <p>军团战争V</p>
            <div class="typeName">
              <span class="lf">防守类</span>
            </div>
            <div class="enterShop">
              <a href="#/rpg?rpgId=105" class>进入商店</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script >
import Header from "../components/header";
export default {
  name: "MYMAP",
  components: {
    "header-tab": Header
  }
};
</script>


<style>
.myMap {
  width: 1080px;
  overflow: hidden;
  zoom: 1;
  margin: 0 auto;
}
.map-title {
  width: 1080px;
  height: 38px;
  line-height: 38px;
  background-color: #fff;
  border: 1px solid #d6d6d6;
  text-indent: 40px;
  font-size: 12px;
  color: #3a3f4a;
  font-weight: bold;
  font-family: "微软雅黑";
  margin-bottom: 10px;
}
.myMapList {
  width: 1080px;
  overflow: hidden;
  zoom: 1;
}
.myMapList ul li {
  width: 251px;
  height: 93px;
  background-color: #fff;
  float: left;
  padding: 15px 0px 0px 8px;
  margin: 0 auto;
  border: 1px solid #ebebeb;
  margin-bottom: 10px;
  margin-right: 12px;
}
.myMapList ul li.current{
    margin-right: 0px;
}
.myMapList ul li img.imgShow {
  width: 127px;
  height: 79px;
  display: block;
  float: left;
}
</style>