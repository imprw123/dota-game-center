<template>
  <div class="order">
    <header-tab></header-tab>
    <div class="nav-tab">
      <span>首页</span>
      <em>></em>
      <span>我的订单</span>
    </div>
    <div class="orderContainer">
      <div class="orderContainer-hd">
        <span style="width:453px">订单详情</span>
        <span style="width:156px">实付金额</span>
        <span style="width:217px">发放状态</span>
        <span style="width:254px">发放对象</span>
      </div>
      <div class="orderContainer-bd">
        <div class="rowBox" v-for="item in 4">
          <div class="rowBox-hd">
            <span>2020-09-20 09:00:00</span>
            <span>
              <em>订单号:</em>
              <em>5211Shop201909183063434914662000</em>
            </span>
            <span>
              <em>订单状态:</em>
              <em>代付款</em>
            </span>
            <span class="fr">
              <em>订单金额:</em>
              <b>￥189.98</b>
            </span>
          </div>
          <ul>
            <li v-for=" item in 5">
              <div class="row01">
                <div class="row01-img">
                  <img src alt />
                </div>
                <div class="row01-infor">
                  <p>燃烧我的卡路里</p>
                  <p>
                    <em>所属分类:</em>
                    <em>军团战争</em>
                  </p>
                  <p>
                    <em>￥100.00:</em>
                    <em>(商品单价)</em>
                  </p>
                </div>
                <div class="row01-number">*1</div>
              </div>
              <div class="row02">￥89.98</div>
              <div class="row3">未发放</div>
              <div class="row4">弥殇</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Header from "../components/header";
export default {
  name: "ORDER",
  components: {
    "header-tab": Header
  }
};
</script>


<style>
.order {
  width: 1080px;
  overflow: hidden;
  zoom: 1;
  margin: 0 auto;
}
.orderContainer {
  width: 100%;
  overflow: hidden;
  zoom: 1;
}
.orderContainer-hd {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #e3e4e6;
  margin-bottom: 10px;
}
.orderContainer-hd span {
  font-size: 12px;
  color: #3a3f4a;
  float: left;
  text-align: center;
  font-family: "微软雅黑";
}
.rowBox {
  width: 1078px;
  overflow: hidden;
  zoom: 1;
  border: 1px solid #d6d6d6;
  margin-bottom: 10px;
}
.rowBox-hd {
 width:1026px;
  height: 45px;
  line-height: 45px;
  border-bottom: 1px solid #cccccc;
  background-color: #f0f0f0;
  font-size: 12px;
  color: #868686;
  font-family: "微软雅黑";
  padding-left: 29px;
  padding-right: 25px;
}
.rowBox-hd span{
    float: left;
    height: 45px;
    line-height: 45px;
    margin-right: 40px;
}
.rowBox-hd span em{
    margin-right: 10px;
}
.rowBox-hd span b{
    color:#ff0808;
}
.rowBox-hd span.fr{
    float:right;
    margin-right: 0px;
}
.rowBox ul li {
  width: 100%;
  height: 88px;
  border-bottom: 1px solid #cccccc;
  background-color: #fff;
}
.rowBox ul li .row01 {
  width: 422px;
  height: 66px;
  float: left;
  border-right: 1px solid #cccccc;
  padding: 11px 0px 11px 29px;
}
.row01-img {
  width: 66px;
  height: 66px;
  background-color: #000;
  float: left;
}
.row01-img img {
  width: 66px;
  height: 66px;
}
.row01-infor {
  width: 240px;
  height: 66px;
  float: left;
  padding-left: 16px;
}
.row01-infor p {
  font-size: 14px;
  color: #3a3f4a;
  font-family: "微软雅黑";
  margin-bottom: 5px;
}
.row01-infor p em {
  color: #a9a9a9;
  font-family: "微软雅黑";
  font-size: 12px;
}
.row01-number {
  width: 80px;
  height: 66px;
  line-height: 66px;
  text-align: center;
  font-family: Arial;
  color: #3a3f4a;
  font-size: 12px;
  float: left;
}
.row02 {
  width: 155px;
  height: 88px;
  line-height: 88px;
  text-align: center;
  font-family: Arial;
  color: #3a3f4a;
  float: left;
  border-right: 1px solid #cccccc;
  font-size: 12px;
}
.row3 {
  width: 216px;
  height: 88px;
  line-height: 88px;
  text-align: center;
  font-family: "微软雅黑";
  color: #3a3f4a;
  float: left;
  border-right: 1px solid #cccccc;
  font-size: 12px;
}
.row4 {
  width: 253px;
  height: 88px;
  line-height: 88px;
  text-align: center;
  font-family: "微软雅黑";
  color: #3a3f4a;
  float: left;
  font-size: 12px;
}
</style>