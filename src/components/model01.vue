<template>
  <div class="modelbox">
    <div class="img-box">
      <router-link :to="{name:'DETAIL',query:{goodsId:item.Goods_id}}">
        <img v-lazy="item.Goods_imgPath" />
      </router-link>
      <div class="money">
        ￥
        <b>{{item.Goods_price}}</b>
        <span>
          <em>{{item.Unit}}</em>
        </span>
        <i class="quan" v-if="item.IsDiscount == 1"></i>
      </div>
      <div class="name" :title="item.Goods_disName">{{item.Goods_disName}}</div>
      <div class="detail-type">{{item.Tag}}</div>
      <div class="action">
        <span class="shopcar" @click="AddWebCartGoods(item.Goods_id)">+ 购物车</span>
        <span class="send" @click="sendParentCartGods(item.Goods_id,item.Goods_imgPath,item.Goods_disName)">赠送</span>
        <span class="ljgm" @click="gmFn(item.Goods_id,1,0)">立即购买</span>
      </div>
      <div class="xian"></div>
      <div class="mapName">
        <i></i>
        <span>{{item.Class_name}}</span>
      </div>
    </div>
    <send-div v-on:parentHandparent1="childrenHand1" v-on:parentPayFor="childrenPayFor"  ref="childrenSend" ></send-div>
    <payModel-div  ref="payChildren"></payModel-div>
  </div>
</template>

<script>
import send from "../components/send";
import payModel from "../components/payModel";
export default {
  name: "Model",
  props: {
    item: Object
  },
  data() {
    return {
     
    };
  },
  methods: {
    AddWebCartGoods(goodsid) {
      debugger;
      this.$axios(
        "get",
        `${this.$ports.shopCar.AddWebCartGoods}?beGivenUserId=${0}&goodsId=${goodsid}&count=${1}`
      )
        .then(res => {
          console.log(res);
          this.$emit("parentHand");
        })
        .catch(error => {
          this.$emit("parentHand");
        });
    },
    childrenHand1(){
      this.$emit('parentHand');
    },
    sendParentCartGods(val,img,name) {
      this.$refs.childrenSend.childrenPram(val,img,name);
    },
    gmFn(val,c,u){
       this.$refs.payChildren.payChildren(val,c,u);
    },
    childrenPayFor(val,c,u){
       this.$refs.payChildren.payChildren(val,c,u);
    }
  },
  components: {
    "send-div": send,
    "payModel-div":payModel
  }
};
</script>
<style>
.money {
  font-size: 12px;
  color: #f74a4a;
  font-family: "微软雅黑";
}
.img-box:hover img{
   -webkit-transition: transform 0.4s;
    -o-transition: transform 0.4s;
    transition: transform 0.4s;
    -webkit-transform: translateY(-2px);
    -ms-transform: translateY(-2px);
    -o-transform: translateY(-2px);
    transform: translateY(-2px);
}
.quan{
  width:16px;
  height: 16px;
  background: url(../assets/quan.png);
  display:inline-block;
  margin-left: 5px;
  position: relative;
  top:3px;
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
  width: 100%;
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
  height:16px;
  line-height:16px;
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