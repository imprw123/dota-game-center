<template>
  <div class="model">
    <div>
      <router-link :to="{name:'DETAIL',query:{goodsId:item.Goods_id}}"><img v-lazy="item.Goods_imgPath" /></router-link>
      <div class="money">
        ￥
        <b>{{item.Goods_price}}</b>
        <span>
          <em>{{item.Unit}}</em>
        </span>
      </div>
      <div class="name" :title="item.Goods_disName">{{item.Goods_disName}}</div>
      <div class="detail-type">{{item.Tag}}</div>
      <div class="action">
        <span class="shopcar">+ 购物车</span>
        <span class="send">赠送</span>
        <span class="ljgm">立即购买</span>
      </div>
      <div class="xian"></div>
      <div class="mapName">
        <i></i>
        <span>{{item.Class_name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Model",
  props: {
    item: Object
  }
};
</script>
<style>
.money {
  font-size: 12px;
  color: #f74a4a;
  font-family: "微软雅黑";
}
.money b {
  font-size: 20px;
  color: #f74a4a;
  font-family: "微软雅黑";
}
.money span {
  font-size: 12px;
  color: #f74a4a;
  font-family: "微软雅黑";
}
.name {
  width:100%;
  font-size: 14px;
  font-family: "微软雅黑";
  color: #333333;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.detail-type {
  font-size: 12px;
  color: #9d9d9d;
  font-family: "微软雅黑";
  margin: 4px 0px;
}
.action {
  width: 160px;
  height: 21px;
  border: 1px solid #dbdbdb;
  margin: 2px 0px;
}
.xian {
  width: 160px;
  height: 1px;
  background-color: #dbdbdb;
  margin-top: 7px;
}
.action span.shopcar {
  width: 56px;
  height: 21px;
  line-height: 21px;
  font-size: 12px;
  color: #333333;
  font-family: "微软雅黑";
  float: left;
  text-align: center;
}
.action span.send {
  width: 42px;
  height: 21px;
  line-height: 21px;
  font-size: 12px;
  color: #333333;
  font-family: "微软雅黑";
  float: left;
  text-align: center;
  border-left: 1px solid #dbdbdb;
  border-right: 1px solid #dbdbdb;
}
.action span.ljgm {
  width: 60px;
  height: 21px;
  line-height: 21px;
  font-size: 12px;
  color: #333333;
  font-family: "微软雅黑";
  float: left;
  text-align: center;
}
.action span:hover {
  background-color: #b44c4c;
  color: #fff;
  cursor: pointer;
}
.mapName {
  width: 160px;
  height: 25px;
  line-height: 25px;
  font-family: "微软雅黑";
  font-size: 12px;
  color: #9d9d9d;
}
</style>