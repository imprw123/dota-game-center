<template>
  <div class="container">
    <header-tab></header-tab>
    <div class="main-banner">
      <div class="advertisement"></div>
      <div class="news-recomd"></div>
    </div>
    <div class="limit-buy">
      <div class="limit-buy-left">
        <ul class="model01">
          <li v-for="item in 4">
            <model-div></model-div>
          </li>
        </ul>
      </div>
      <div class="limit-buy-right">
        <div class="tabchange">
          <span class="current">热门排行</span>
          <span>畅销排行</span>
        </div>
        <ol>
          <li v-for="(item,index) in 4" :key="index">
            <div class="img-left">
              <img src="../assets/img02.jpg" alt />
            </div>
            <div class="infor-right">
              <h2>2局特技福利-超划算</h2>
              <p>
                价格:
                <em>￥1.00/2局</em>
              </p>
            </div>
          </li>
        </ol>
      </div>
    </div>
    <!-- Dota推荐商品 -->
    <div class="dota">
      <h1>Dota推荐商品</h1>
      <ul class="model01">
        <li v-for="(item,index) in 5" :key="index" v-bind:class="index == 4 ?'current':''">
          <model-div></model-div>
        </li>
      </ul>
    </div>
    <!-- RPG推荐商品 -->
    <div class="rpg">
      <h1>RPG推荐商品</h1>
      <ul>
        <li v-for="(item,index) in 8" :key="index" v-bind:class="(index+1)%4 == 0 ?'current':''">
          <img src="../assets/img02.jpg" class="imgShow" />
          <div class="rpg-left">
            <p>守卫剑阁守卫剑阁</p>
            <div class="typeName">
              <span class="lf">防守类</span>
              <span class="rt">10件</span>
            </div>
            <div class="enterShop">进入商店</div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 平台推荐服务 -->
    <div class="dota">
      <h1>平台推荐服务</h1>
      <ul class="model01">
        <li v-for="(item,index) in 5" :key="index" v-bind:class="index == 4 ?'current':''">
          <model-div></model-div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from "../components/header";
import model01 from "../components/model01";
export default {
  name: "Home",
  components: {
    "header-tab": Header,
    "model-div": model01
  }
};
</script>
<style>
.container {
  width: 1080px;
  overflow: hidden;
  zoom: 1;
  margin: 0 auto;
}
.main-banner {
  width: 1080px;
  height: 360px;
  margin-top: 10px;
}
.advertisement {
  width: 790px;
  height: 360px;
  float: left;
  background-color: #000;
}
.news-recomd {
  width: 278px;
  height: 358px;
  background-color: #fff;
  float: right;
  border: 1px solid #dbdbdb;
}
.limit-buy {
  width: 1080px;
  height: 320px;
  margin-top: 20px;
}
.limit-buy-left {
  width: 768px;
  height: 304px;
  border: 1px solid #dbdbdb;
  background-color: #fff;
  float: left;
  padding-top: 14px;
  padding-left: 16px;
}
.limit-buy-right {
  width: 243px;
  height: 318px;
  border: 1px solid #dbdbdb;
  background-color: #fff;
  float: right;
  padding: 0px 20px 0px 15px;
}
.limit-buy-right .tabchange {
  width: 243px;
  height: 35px;
  line-height: 35px;
  display: flex;
}
.limit-buy-right .tabchange span {
  flex: 1;
  text-align: left;
  height: 35px;
  line-height: 35px;
  font-size: 14px;
  color: #666666;
  border-bottom: 1px solid #e6e6e6;
  cursor: pointer;
}
.limit-buy-right .tabchange span.current {
  color: #000;
  border-bottom: 1px solid #3dbeff;
  font-family: "微软雅黑";
}
.limit-buy-right ol li {
  width: 243px;
  height: 57px;
  border-bottom: 1px dashed #e6e6e6;
  padding-top: 10px;
}
.limit-buy-right ol li .img-left {
  width: 50px;
  height: 50px;
  float: left;
}
.limit-buy-right ol li .img-left img {
  width: 50px;
  height: 50px;
}
.limit-buy-right ol li .infor-right {
  width: 175px;
  padding-left: 17px;
  height: 50px;
  float: left;
}
.limit-buy-right ol li .infor-right h2 {
  width: 175px;
  font-size: 14px;
  font-weight: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  font-family: "微软雅黑";
  margin-bottom: 10px;
}
.limit-buy-right ol li .infor-right p {
  font-size: 12px;
  color: #4c4c4c;
  font-family: "微软雅黑";
}
.limit-buy-left ul.model01 li {
  padding: 15px 14px 0px 14px;
}
ul.model01 li {
  width: 160px;
  height: 285px;
  background-color: #fff;
  padding: 15px 24px 0px 24px;
  float: left;
}
ul.model01 li img {
  width: 160px;
  height: 160px;
  display: block;
}
.dota {
  width: 1080px;
  margin-top: 20px;
  overflow: hidden;
  zoom: 1;
}
.dota ul.model01 li {
  margin-right: 10px;
}
.dota ul.model01 li.current {
  margin-right: 0px;
}
.dota h1 {
  font-size: 18px;
  color: #fff;
  font-family: "微软雅黑";
  height: 30px;
  line-height: 30px;
  font-weight: 500;
}
.rpg {
  width: 1080px;
  margin-top: 20px;
  overflow: hidden;
  zoom: 1;
}
.rpg h1 {
  font-size: 18px;
  color: #fff;
  font-family: "微软雅黑";
  height: 30px;
  line-height: 30px;
  font-weight: 500;
}
.rpg ul li {
  width: 253px;
  height: 93px;
  background-color: #fff;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 15px 0px 0px 8px;
}
.rpg ul li.current {
  margin-right: 0px;
}
.rpg ul li img.imgShow {
  width: 127px;
  height: 79px;
  display: block;
  float: left;
}
.rpg-left {
  width: 96px;
  height: 79px;
  float: left;
  margin-left: 15px;
}
.rpg-left p {
  width: 100%;
  font-size: 14px;
  color: #333333;
  font-family: "微软雅黑";
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
.typeName {
  overflow: hidden;
  zoom: 1;
  width: 100%;
  display: flex;
  margin: 10px 0px;
}
.typeName span {
  flex: 1;
  font-size: 12px;
  color: #9d9d9d;
  font-family: "微软雅黑";
}
.typeName span.lf {
  text-align: left;
}
.typeName span.rt {
  text-align: right;
}
.enterShop {
  width: 86px;
  height: 20px;
  background-color: #fdece3;
  color: #aa2828;
  border: 1px solid #aa2828;
  border-radius: 10px;
  font-family: "微软雅黑";
  font-size: 12px;
  text-align: center;
  line-height: 20px;
}
</style>
