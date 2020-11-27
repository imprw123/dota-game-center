<template>
  <div class="detail">
    <header-tab></header-tab>
    <div class="nav-tab">
      <span>首页</span>
      <em>></em>
      <span>{{detailObj.Goods_disName}}</span>
    </div>
    <div class="productInfor">
      <div class="productInfor_left">
        <div class="borderBox">
          <img v-bind:src="detailObj.Goods_imgPath" class="imgShow" />
        </div>
      </div>
      <div class="productInfor_right">
        <div class="rows">
          <span>名称</span>
          <b>{{detailObj.Goods_disName}}</b>
        </div>
        <div class="rows">
          <span>标签</span>
          <em>{{detailObj.Tag}}</em>
        </div>
        <div class="inforBg">
          <div class="rows">
            <span>价格</span>
            <div style="float:left;" class="saleCount">
              <b class="price">{{`￥${(detailObj.Goods_price/100).toFixed(2)}`}}</b>
              <i>{{detailObj.Unit}}</i>
            </div>
          </div>

          <div class="rows">
            <span>简介</span>
            <p>{{detailObj.Goods_profile}}</p>
          </div>
        </div>
        <div class="UserCation">
          <p class="addNumber">
            <i>数 量：</i>
            <span class="changeNum">
              <em class="leftBtn" @click="leftBtn">-</em>
              <input type="text" id="count" v-model="count" />
              <em class="rightBtn" @click="rightBtn">+</em>
            </span>
          </p>
          <p>
            <a href="javascript:;" class="back_Gm" @click="gmFn(detailObj.Goods_id,1,0)">立即购买</a>
            <a href="javascript:;" class="sure_Gm" @click="AddWebCartGoods()">加入购物车</a>
            <a
              href="javascript:;"
              class="sure_Zs"
              @click="sendParentCartGods(detailObj.Goods_imgPath,detailObj.Goods_disName)"
            >赠送</a>
          </p>
        </div>
      </div>
    </div>
    <div class="detailInforMation">
      <div class="detailInforMation-name">详情介绍</div>
      <div v-html="detailObj.Goods_details"></div>
    </div>
    <div class="siderBox" v-bind:class="{'siderBoxCurrent':!flag}">
      <silderbar-tab v-on:FixedModel="modelFixed" ref="mychild"></silderbar-tab>
    </div>
    <send-div ref="childrenSend"></send-div>
    <payModel-div ref="payChildren"></payModel-div>
  </div>
</template>


<script>
import Header from "../components/header";
import Silderbar from "../components/silderbar";
import send from "../components/send";
import payModel from "../components/payModel";
export default {
  name: "DETAIL",
  data() {
    return {
      goodsid: this.$route.query.goodsId,
      detailObj: "",
      flag: false,
      count:1
    };
  },
  mounted() {
    console.log(this.$route.query.goodsId);
    this._QueryGoodsById();
  },
  methods: {
    //商详页
    _QueryGoodsById() {
      this.$axios(
        "get",
        `${this.$ports.detail.QueryGoodsById}?goodsId=${this.goodsid}`
      )
        .then(res => {
          console.log(res);
          if (res.code == 0) {
            this.detailObj = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    modelFixed(val) {
      this.flag = val;
    },
    rightBtn(){
      this.count=this.count+1;
    },
    leftBtn(){
      if(this.count <= 1){
        this.count =1;
      }else{
        this.count=this.count-1;
      }
    },
    AddWebCartGoods() {
      debugger;
      this.$axios(
        "get",
        `${this.$ports.shopCar.AddWebCartGoods}?beGivenUserId=${0}&goodsId=${
          this.goodsid
        }&count=${this.count}`
      )
        .then(res => {
          console.log(res);
          this.addFlag = true;
          this.$refs.mychild.parentHandleclick();
        })
        .catch(error => {
          this.addFlag = true;
        });
    },
    sendParentCartGods(img, name) {
      this.$refs.childrenSend.childrenPram(
        this.$route.query.goodsId,
        img,
        name
      );
    },
     gmFn(val,c,v){
       this.$refs.payChildren.payChildren(val,c,v);
    }
  },
  components: {
    "header-tab": Header,
    "silderbar-tab": Silderbar,
    "send-div": send,
    "payModel-div": payModel
  }
};
</script>


<style>
.detail {
  width: 1080px;
  overflow: hidden;
  zoom: 1;
  margin: 0 auto;
}
.siderBox {
  position: fixed;
  top: 0px;
  right: 0px;
  transition: 0.5s ease;
}
.siderBoxCurrent {
  right: -300px;
  transition: 0.5s ease;
}
.nav-tab {
  width: 1080px;
  overflow: hidden;
  zoom: 1;
  color: #ffffff;
  font-size: 12px;
  padding: 4px 0px;
  border-bottom: 1px solid #fff;
  margin-top: 10px;
  font-family: "微软雅黑";
  margin-bottom: 12px;
}
.nav-tab em {
  margin: 0 4px;
}

.productInfor {
  width: 1058px;
  height: 305px;
  border: 1px solid #ebebeb;
  border-bottom: 1px solid #dbdbdb;
  background-color: #fff;
  padding: 38px 0px 0px 20px;
  position: relative;
}

.productInfor_left {
  width: 300px;
  height: 300px;
  background-color: #fff;
  float: left;
}
.borderBox {
  width: 200px;
  height: 200px;
  position: relative;
  background-color: #fff;
  margin: 0 auto;
}
.detailMini_img {
  width: 200px;
  margin: 0 auto;
  height: 200px;
}
.in_detailMini_img {
  width: 159px;
  height: 52px;
  float: left;
  overflow: hidden;
  position: relative;
}
.leftBtn_pic {
  float: left;
  width: 20px;
  height: 52px;
  display: block;
  text-align: center;

  cursor: pointer;
}
.rightBtn_pic {
  float: left;
  width: 20px;
  height: 52px;
  display: block;
  text-align: center;

  cursor: pointer;
}
.in_detailMini_img ul {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 9999999px;
}
.in_detailMini_img ul li {
  width: 52px;
  height: 52px;
  float: left;
  display: block;
  background: #d2d2d2;
  margin-right: 1px;
  position: relative;
}
.in_detailMini_img ul li.current em {
  width: 48px;
  height: 48px;
  border: 2px solid #ff4a00;
  display: block;
  position: absolute;
  top: 0px;
  left: 0px;
}
.in_detailMini_img ul li img {
  width: 52px;
  height: 52px;
}
.productInfor_left img.imgShow {
  width: 200px;
  height: 200px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -100px;
}

.productInfor_right {
  height: 300px;
  float: left;
  padding-left: 20px;
  position: relative;
}

.rows {
  width: 100%;
  overflow: hidden;
  zoom: 1;
  font-family: "微软雅黑";
}
.productInfor_right .rows .saleIcon {
  width: 25px;
  height: 30px;
  line-height: 23px;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  font-family: "å¾®è½¯é›…é»‘";
  display: inline-block;
  margin-left: 5px;
}

.productInfor_right .rows .xian {
  width: 77px;
  height: 30px;
  display: inline-block;

  position: absolute;
  top: 0px;
  left: 0px;
}
.rows span {
  color: #999999;
  font-size: 14px;
  width: 60px;
  height: 30px;
  line-height: 30px;
  padding-left: 8px;
  float: left;
}
.saleCount {
  font-size: 24px;
  color: #f74a4a;
  font-weight: normal;
  font-family: "å¾®è½¯é›…é»‘ ";
}
.rows b {
  /*width:77px;*/
  text-align: center;
  font-size: 20px;
  color: #333;
  float: left;
  height: 30px;
  line-height: 30px;
  position: relative;
}

.rows em {
  color: #999999;
  font-size: 14px;
  float: left;
  height: 30px;
  line-height: 30px;
}
.lastTime {
  font-size: 16px;
  float: left;
  margin-left: 10px;
  color: #000;
}

.inforBg {
  height: 90px;
  width: 682px;
  padding-top: 14px;
  padding-bottom: 14px;
  background-color: #edf6fc;
}

.rows b.price {
  font-size: 24px;
  color: #f74a4a;
  font-weight: normal;
  float: left;
  height: 30px;
  line-height: 30px;
  position: relative;
  font-family: "微软雅黑";
}

.rows i {
  color: #333333;
  font-size: 14px;
  margin-left: 5px;
  float: left;
  height: 30px;
  line-height: 30px;
  font-family: "微软雅黑";
}

.rows p {
  float: left;
  width: 545px;
  font-size: 14px;
  color: #666666;
  margin-top: 5px;
}
a.back_Gm {
  width: 158px;
  height: 36px;
  line-height: 36px;
  background-color: #ff4a00;
  border: 1px solid #ff4a00;
  font-size: 14px;
  color: #fff;
  text-align: center;
  margin-right: 20px;
  border-radius: 4px;
  float: left;
}
a.sure_Gm {
  width: 158px;
  height: 36px;
  line-height: 36px;
  background-color: #fedabc;
  border: 1px solid #f0cbb6;
  font-size: 14px;
  color: #e6551b;
  text-align: center;
  float: left;
  border-radius: 4px;
  margin-right: 20px;
}
a.sure_Zs {
  width: 158px;
  height: 34px;
  line-height: 34px;
  background-color: #ffb373;
  border: 1px solid #f0cbb6;
  font-size: 14px;
  color: #f32a42;
  text-align: center;
  float: left;
  border-radius: 4px;
}
.UserCation {
  overflow: hidden;
  zoom: 1;
  position: absolute;
  bottom: 35px;
}

.UserCation .addNumber {
  margin-bottom: 22px;
  padding-left: 10px;
}

.UserCation p {
  position: relative;
  font-size: 14px;
  color: #3d3d3d;
  margin-bottom: 5px;
}

.UserCation p a {
  font-family: "微软雅黑";
}

.UserCation p i {
  display: inline-block;
  /*width: 50px;*/
  text-align: right;
}

.UserCation p b {
  font-size: 18px;
  margin-left: 15px;
}

.UserCation p span.sale {
  margin-left: 15px;
  font-size: 14px;
  color: #b8b8b8;
  position: relative;
}
.UserCation p em {
  margin-left: 15px;
}

.UserCation p b.Offers {
  color: #e1422d;
  font-size: 20px;
  padding: 0 4px 0px 0px;
}

.UserCation p .changeNum {
  width: 86px;
  height: 18px;
  display: block;
  position: absolute;
  top: 0px;
  left: 46px;
  border: 1px solid #cccccc;
  margin-left: 15px;
  margin-top: 0px;
}

.UserCation p .changeNum em.leftBtn {
  width: 14px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  background-color: #ebebeb;
  display: block;
  position: absolute;
  top: 0px;
  left: -15px;
  cursor: pointer;
  color: #3d3d3d;
}

.UserCation p .changeNum input {
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

.UserCation p .changeNum em.rightBtn {
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
.detailInforMation {
  width: 1038px;
  min-height: 600px;
  border: 1px solid #ebebeb;
  background-color: #fff;
  padding: 20px;
  margin-top: 28px;
}
.detailInforMation-name {
  height: 30px;
  line-height: 30px;
  width: 100%;
  text-align: left;
  font-size: 18px;
  color: #676767;
}
</style>