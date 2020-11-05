<template>
  <div class="siderBar">
    <div class="silderBtn">
      <ul>
        <li class="silder01" v-on:click="openFixed"></li>
        <li class="silder02" v-on:click="openFixed"></li>
        <li class="silder03" v-on:click="openFixed"></li>
        <li class="silder04" v-on:click="openFixed"></li>
      </ul>
    </div>
    <div class="siderHd">
      <div class="back" v-on:click="closeFixed"></div>
    </div>
    <!-- 搜藏 -->
    <div class="siderBd" style="display:none;">
      <div class="sider-rpg">
        <ul>
          <li v-for="item in 4">
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
      <div class="totalBox">
        <div class="totalBox-left">
          <p style="height:47px;line-height:47px;">
            全部搜藏
            <b>10</b>
          </p>
        </div>
        <div class="totalBox-right">
          <router-link :to="'myMap'">查看全部搜藏</router-link>
        </div>
      </div>
    </div>
    <!-- 搜藏 -->
    <!-- 购物车 -->
    <div class="siderBd">
      <div class="silder-shop">
        <ul>
          <li  v-for="item in 4">
            <div class="shop-left">
              <img
                src="http://img.5211game.com/5211/shop/Goods/Basic/17372.jpg?rand=637388729297809734"
              />
            </div>
            <div class="shop-right">
                <h4>燃烧我的卡路里！</h4>
                <p><b>￥189.98</b><em/永久</em></p>
                <p><em>军团战争V</em></p>
            </div>
          </li>
        </ul>
      </div>
      <div class="totalBox">
        <div class="totalBox-left">
          <p>
            <em>4</em>
            件商品
          </p>
          <p>
            共计
            <b>￥400.00</b>
          </p>
        </div>
        <div class="totalBox-right">
          <router-link :to="'shopCar'">去购物车结算</router-link>
        </div>
      </div>
    </div>
    <!-- 购物车 -->
  </div>
</template>


<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    openFixed() {
      console.log("nn");
      this.$emit("FixedModel", true);
    },
    closeFixed() {
      this.$emit("FixedModel", false);
    }
  }
};
</script>


<style>
.siderBar {
  width: 300px;
  height: 914px;
  background-color: #f3f3f3;
  box-shadow: -5px 0px 20px rgba(0, 0, 0, 0.5);
  position: relative;
}
.siderHd {
  width: 300px;
  height: 50px;
  background-color: #053249;
}
.silderBtn {
  width: 56px;
  height: 221px;
  position: absolute;
  top: 50%;
  margin-top: -110px;
  left: -56px;
}
.silderBtn ul li {
  width: 56px;
  height: 56px;
  margin-bottom: 7px;
  cursor: pointer;
}
.silderBtn ul li.silder01 {
  background: url(../assets/silder01.png);
}
.silderBtn ul li.silder01:hover {
  background: url(../assets/silder01-hover.png);
  transition: 0.2s;
}
.silderBtn ul li.silder02 {
  background: url(../assets/silder02.png);
}
.silderBtn ul li.silder02:hover {
  background: url(../assets/silder02-hover.png);
  transition: 0.2s;
}
.silderBtn ul li.silder03 {
  background: url(../assets/silder03.png);
}
.silderBtn ul li.silder03:hover {
  background: url(../assets/silder03-hover.png);
  transition: 0.2s;
}
.silderBtn ul li.silder04 {
  background: url(../assets/silder04.png);
}
.silderBtn ul li.silder04:hover {
  background: url(../assets/silder04-hover.png);
  transition: 0.2s;
}
.back {
  width: 26px;
  height: 50px;
  float: right;
  background: url(../assets/back.png);
  cursor: pointer;
}
.back:hover {
  background: url(../assets/back-hover.png);
  transition: 0.3s ease;
}
.siderBd {
  width: 300px;
  height: 864px;
  position: relative;
}
.sider-rpg {
  width: 284px;
  padding: 8px;
  height: 796px;
  overflow-y: auto;
  overflow-x: hidden;
}
.siderBd .sider-rpg ul li {
  width: 274px;
  height: 93px;
  background-color: #fff;
  float: left;
  padding: 15px 0px 0px 8px;
  margin: 0 auto;
  border: 1px solid #ebebeb;
  margin-bottom: 5px;
}
.siderBd .sider-rpg ul li img.imgShow {
  width: 127px;
  height: 79px;
  display: block;
  float: left;
}
.totalBox {
  width: 300px;
  height: 47px;
  background-color: #e5e5e5;
  position: absolute;
  bottom: 0px;
}
.totalBox-left {
  padding-left: 10px;
  float: left;
  color: #9d9d9d;
  font-size: 14px;
}
.totalBox-left p {
  height: 22px;
  line-height: 22px;
}
.totalBox-left p em {
  color: #f74a4a;
}
.totalBox-left p b {
  color: #f74a4a;
}
.totalBox-right {
  width: 97px;
  height: 47px;
  line-height: 47px;
  margin-right: 10px;
  float: right;
}
.totalBox-right a {
  width: 94px;
  height: 22px;
  background-color: #9ab1cc;
  border: 1px solid #778da6;
  display: inline-block;
  color: #fff;
  font-size: 12px;
  border-radius: 4px;
  line-height: 22px;
  text-align: center;
  font-family: "微软雅黑";
}
.silder-shop {
  width: 284px;
  padding: 8px;
  height: 796px;
  overflow-y: auto;
  overflow-x: hidden;
}
.silder-shop ul li {
  width: 265px;
  height: 74px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #ebebeb;
  padding: 9px 0px 0px 9px;
  margin-bottom: 5px;
}
.shop-left {
  width: 66px;
  height: 66px;
  background-color: #000;
  float: left;
}
.shop-left img {
  width: 66px;
  height: 66px;
}
.shop-right{
    width:196px;
    height: 66px;
    float: left;
}
.shop-right h4{
    font-size: 14px;
    color:#3a3f4a;
    font-weight: normal;
    font-family:'微软雅黑';
    margin-bottom:5px;
}
.shop-right p b{
    color:#ff0808;
}
.shop-right p{
    color: #a9a9a9;
    font-size:12px;
   font-family:'微软雅黑';
   margin-bottom: 5px;
}
</style>