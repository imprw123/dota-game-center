<template>
  <div class="shopCar">
    <header-tab></header-tab>
    <div class="nav-tab">
      <span>首页</span>
      <em>></em>
      <span>我的购物车</span>
    </div>
    <div class="shopCarBox">
      <div class="shopCarBox-title">
        <span style="width:104px">
          <input type="checkbox" id="myCheck" />
        </span>
        <span style="width:230px">商品信息</span>
        <span style="width:206px">单价(通宝)</span>
        <span style="width:120px">数量</span>
        <span style="width:210px">小计(通宝)</span>
        <span style="width:208px">操作</span>
      </div>
      <div class="shopCarList">
        <ul>
          <li>
            <div class="shopCar-row01" style="width:104px">
              <input type="checkbox" id="myCheck" />
            </div>
            <div class="shopCar-row02" style="width:230px">
              <img src alt />
              <div class="shopCar-row02-infor">
                <h5>燃烧我的卡路里！</h5>
                <p>
                  所属分类:
                  <em>军团战争</em>
                </p>
                <p>
                  <em>￥100.00</em>（商品单价）
                </p>
              </div>
            </div>
            <div class="shopCar-row03" style="width:206px">￥89.98</div>
            <div class="shopCar-row04" style="width:120px">
              <span class="changeNum">
                <em class="leftBtn">-</em>
                <input type="text" id="count" value="1" />
                <em class="rightBtn">+</em>
              </span>
            </div>
            <div class="shopCar-row05" style="width:210px">
              <span>￥89.98</span>
            </div>
            <div class="shopCar-row06" style="width:208px">
              <span>删除</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="shopCarBt">
        <p>
          总价:
          <b>￥89.98</b>
        </p>
        <div class="gmBtn">立即购买</div>
      </div>
    </div>
  </div>
</template>

<script >
import Header from "../components/header";
export default {
  name: "SHOPCAR",
  components: {
    "header-tab": Header
  }
};
</script>


<style>
.shopCar {
  width: 1080px;
  overflow: hidden;
  zoom: 1;
  margin: 0 auto;
}
.shopCarBox {
  width: 100%;
  overflow: hidden;
  zoom: 1;
  padding-bottom: 90px;
  background-color: #f0f0f0;
  position: relative;
}
.shopCarBox-title {
  width: 1078px;
  height: 38px;
  line-height: 38px;
  color: #3a3f4a;
  font-size: 12px;
  font-family: "微软雅黑";
  background-color: #e3e4e6;
  border: 1px solid #ccc;
}
.shopCarBox-title span {
  height: 38px;
  line-height: 38px;
  float: left;
  text-align: center;
  font-size: 12px;
  color: #3a3f4a;
  font-family: "微软雅黑";
}
.shopCarList {
  width: 1078px;
  border: 1px solid #cccccc;
  border-bottom: 0px;
  overflow: hidden;
  zoom: 1;
  background-color: #f0f0f0;
}
.shopCarList ul li {
  width: 100%;
  height: 88px;
  border-bottom: 1px solid #cccccc;
}
.shopCar-row01 {
  height: 88px;
  line-height: 88px;
  text-align: center;
  float: left;
}
.shopCar-row02 {
  float: left;
  height: 78px;
  padding-top: 10px;
}
.shopCar-row02 img {
  width: 66px;
  height: 66px;
  float: left;
}
.shopCar-row02-infor {
  float: left;
  width: 150px;
  padding-left: 14px;
}
.shopCar-row02-infor h5 {
  font-size: 14px;
  color: #3a3f4a;
  font-family: "微软雅黑";
  margin-bottom: 5px;
}
.shopCar-row02-infor p {
  font-size: 12px;
  color: #a9a9a9;
  font-family: "微软雅黑";
  margin-bottom: 5px;
}
.shopCar-row03 {
  float: left;
  height: 88px;
  line-height: 88px;
  text-align: center;
  color: #3d3d3d;
  font-size: 12px;
  font-family: "微软雅黑";
}
.shopCar-row04 {
  float: left;
  height: 88px;
  line-height: 88px;
  position: relative;
}
.changeNum {
  width: 86px;
  height: 18px;
  display: block;
  position: absolute;
  top: 50%;
  margin-top: -9px;
  left: 50%;
  margin-left: -43px;
  border: 1px solid #cccccc;
}

.changeNum em.leftBtn {
  width: 14px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  background-color: #ebebeb;
  display: block;
  position: absolute;
  top: 0px;
  left: 0px;
  cursor: pointer;
  color: #3d3d3d;
}

.changeNum input {
  position: absolute;
  width: 56px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  background-color: #fff;
  font-size: 14px;
  color: #3d3d3d;
  left: 14px;
  top: 0px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  display: block;
  outline-style: none;
}

.changeNum em.rightBtn {
  width: 14px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  background-color: #ebebeb;
  display: block;
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: pointer;
}
.shopCar-row05 {
  float: left;
  height: 88px;
  line-height: 88px;
  text-align: center;
}
.shopCar-row05 span {
  color: #ff0808;
  font-size: 12px;
}
.shopCar-row06 {
  float: left;
  height: 88px;
  line-height: 88px;
  text-align: center;
  color: #3d3d3d;
  font-size: 12px;
  font-family: "微软雅黑";
}
.gmBtn {
  width: 92px;
  line-height: 25px;
  height: 25px;
  text-align: center;
  background-color: #ff4a00;
  color: #fff;
  font-size: 12px;
  font-family: "微软雅黑";
  border-radius: 4px;
}
.shopCarBt {
  position: absolute;
  bottom: 15px;
  right: 40px;
}
.shopCarBt p {
  font-size: 12px;
  color: #3d3d3d;
  margin-bottom:5px;
}
.shopCarBt p b {
  font-size: 18px;
  color: #ff0808;
  font-family: "微软雅黑";
  font-weight: normal;
}
</style>