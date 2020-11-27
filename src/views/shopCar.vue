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
          <input type="checkbox" id="myCheck" v-model="isAllTrue" @click="isFalse" />
        </span>
        <span style="width:230px">商品信息</span>
        <span style="width:206px">单价(人民币)</span>
        <span style="width:120px">数量</span>
        <span style="width:210px">小计(人民币)</span>
        <span style="width:200px">操作</span>
      </div>
      <div class="shopCarList">
        <ul v-if="shopCarBox.length > 0">
          <li v-for="(item,index) in shopCarBox" :key="index">
            <div class="shopCar-row01" style="width:104px">
              <input type="checkbox" id="myCheck" v-model="item.goodsid" />
            </div>
            <div class="shopCar-row02" style="width:230px">
              <div class="imgBox-shopCar">
                <img v-lazy="item.Goods_imgPath" />
                <i
                  class="zen"
                  v-bind:title="sendNameShow"
                  v-show="item.BeGiven_userid>0"
                  v-on:mouseenter="searchName(item.BeGiven_userid)"
                ></i>
              </div>
              <div class="shopCar-row02-infor">
                <h5 v-bind:title="item.Goods_disName">{{item.Goods_disName}}</h5>
                <p>
                  所属分类:
                  <em v-bind:title="item.Goods_profile">{{item.Goods_profile}}</em>
                </p>
                <p>
                  <em>{{`￥${item.Goods_price}`}}</em>（商品单价）
                </p>
              </div>
            </div>
            <div class="shopCar-row03" style="width:206px">{{`￥${item.Goods_price}`}}</div>
            <div class="shopCar-row04" style="width:120px">
              <span class="changeNum">
                <em class="leftBtn" @click="leftBtn(index)">-</em>
                <input type="text" id="count" v-model="item.Goods_amount" readonly="readonly" />
                <em class="rightBtn" @click.self="rightBtn(index)">+</em>
              </span>
            </div>
            <div class="shopCar-row05" style="width:210px">
              <span>{{`￥${item.Goods_price*item.Goods_amount}`}}</span>
            </div>
            <div class="shopCar-row06" style="width:200px">
              <span @click="RemoveWebCartGoods(item.Goods_id)">删除</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="shopCarBt">
        <p>
          选取商品总价:
          <b>{{`￥${totalMoney}`}}</b>
        </p>
        <div class="gmNoBtn" v-show="shopCarBox.length == 0">立即购买</div>
        <div class="gmBtn" v-show="shopCarBox.length>0" @click="gmFn()">立即购买</div>
      </div>
    </div>
    <div class="siderBox" v-bind:class="{'siderBoxCurrent':!flag}">
      <silderbar-tab v-on:FixedModel="modelFixed" ref="mychild"></silderbar-tab>
    </div>
    <payModel-div ref="payChildren"></payModel-div>
  </div>
</template>

<script >
import Header from "../components/header";
import Silderbar from "../components/silderbar";
import payModel from "../components/payModel";
import { Toast } from "mint-ui";
import "mint-ui/lib/style.css";
export default {
  name: "SHOPCAR",
  data() {
    return {
      shopCarBox: [],
      totalNumber: 0,
      totalMoney: "￥0.00",
      isAllTrue: true,
      flag: false,
      addFlag: true,
      delFlag: true,
      sendNameShow: ""
    };
  },
  mounted() {
    this._QueryUserWebCartGoods();
  },
  watch: {
    shopCarBox: {
      handler(newValue, oldValue) {
        this.totalNumber = 0;
        this.totalMoney = 0;
        if (this.shopCarBox.length > 0) {
          for (var j = 0, len = this.shopCarBox.length; j < len; j++) {
            if (this.shopCarBox[j].goodsid) {
              this.totalMoney +=
                Number(this.shopCarBox[j].Goods_price) *
                Number(this.shopCarBox[j].Goods_amount);
              this.totalNumber += Number(this.shopCarBox[j].Goods_amount);
            }
          }
        }
        this.totalMoney = this.totalMoney.toFixed(2);
        if (
          this.shopCarBox.findIndex(target => target.goodsid === false) == -1
        ) {
          this.isAllTrue = true;
        } else {
          this.isAllTrue = false;
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    _QueryUserWebCartGoods() {
      debugger;
      this.totalNumber = 0;
      this.totalMoney = 0;
      this.$axios("get", `${this.$ports.shopCar.QueryUserWebCartGoods}`)
        .then(res => {
          //console.log("购物车");
          console.log(res);
          if (res.code == 0) {
            this.shopCarBox = res.data;
          } else {
            this.shopCarBox = [];
          }
          if (this.shopCarBox.length > 0) {
            for (var j = 0, len = this.shopCarBox.length; j < len; j++) {
              this.totalMoney +=
                Number(this.shopCarBox[j].Goods_price) *
                Number(this.shopCarBox[j].Goods_amount);
              this.totalNumber += Number(this.shopCarBox[j].Goods_amount);
              this.$set(
                this.shopCarBox[j],
                "goodsid",
                this.shopCarBox[j].Goods_id
              );
            }
          }
          this.totalMoney = this.totalMoney.toFixed(2);
        })
        .catch(error => {
          console.log(error);
        });
    },
    leftBtn(index) {
      debugger;
      var _that = this;
      if (this.delFlag) {
        this.delFlag = false;
        this.shopCarBox.forEach(function(obj, i) {
          if (i == index) {
            if (obj.goodsid) {
              if (obj.Goods_amount <= 1) {
                obj.Goods_amount == 1;
                _that.delFlag = true;
                return false;
              } else {
                obj.Goods_amount = obj.Goods_amount - 1;
                _that.DeductWebCartGoods(obj.Goods_id);
              }
            } else {
              Toast({
                message: "请先勾选商品!",
                iconClass: "icon"
              });
              _that.delFlag = true;
            }
          }
        });
      } else {
        Toast({
          message: "操作太频繁了……",
          iconClass: "icon",
          duration: 500
        });
      }
    },
    rightBtn(index) {
      debugger;
      var _that = this;
      if (this.addFlag) {
        this.addFlag = false;
        for (var j = 0, len = this.shopCarBox.length; j < len; j++) {
          if (j == index) {
            if (this.shopCarBox[j].goodsid) {
              this.shopCarBox[j].Goods_amount =
                this.shopCarBox[j].Goods_amount + 1;
              _that.AddWebCartGoods(this.shopCarBox[j].Goods_id, 1);
            } else {
              Toast({
                message: "请先勾选商品!",
                iconClass: "icon"
              });
              _that.addFlag = true;
            }

            return false;
          }
        }
      } else {
        Toast({
          message: "操作太频繁了……",
          iconClass: "icon",
          duration: 500
        });
      }
    },
    modelFixed(val) {
      this.flag = val;
    },
    AddWebCartGoods(goodsid, count) {
      debugger;
      this.$axios(
        "get",
        `${
          this.$ports.shopCar.AddWebCartGoods
        }?beGivenUserId=${0}&goodsId=${goodsid}&count=${count}`
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
    DeductWebCartGoods(goodsid) {
      //debugger;
      this.$axios(
        "get",
        `${this.$ports.shopCar.DeductWebCartGoods}?goodsId=${goodsid}`
      )
        .then(res => {
          console.log(res);
          this.delFlag = true;
          this.$refs.mychild.parentHandleclick();
        })
        .catch(error => {
          this.delFlag = true;
        });
    },
    isFalse() {
      if (this.isAllTrue) {
        this.shopCarBox.forEach(function(obj, i) {
          obj.goodsid = false;
        });
      } else if (!this.isAllTrue) {
        this.shopCarBox.forEach(function(obj, i) {
          obj.goodsid = true;
        });
      }
    },
    RemoveWebCartGoods(goodsid) {
      this.$axios(
        "get",
        `${this.$ports.shopCar.RemoveWebCartGoods}?goodsId=${goodsid}`
      )
        .then(res => {
          console.log(res);
          this._QueryUserWebCartGoods();
          this.$refs.mychild.parentHandleclick();
        })
        .catch(error => {});
    },
    searchName(valName) {
      this.$axios("get", `${this.$ports.send.CheckAccount}?account=${valName}`)
        .then(res => {
          this.sendNameShow = `赠送给${res.data.UserName}`;
        })
        .catch(error => {
          console.log(error);
        });
    },
    gmFn() {
      console.log(this.shopCarBox);
      var _data=[];
      for (var i = 0; i < this.shopCarBox.length; i++) {
        if (this.shopCarBox[i].goodsid) {
          var _obj = new Object();
          _obj.I = this.shopCarBox[i].Goods_id;
          _obj.C = this.shopCarBox[i].Goods_amount;
          _obj.U = this.shopCarBox[i].BeGiven_userid;
          _data.push(_obj);
        }
      }
      var jsonStr = JSON.stringify(_data);
      console.log(jsonStr);
      console.log(_data.length)
      if (_data.length == 0) {
          Toast({
          message: "请勾选商品!",
          iconClass: "icon",
          duration: 500
        });
      } else {
       this.$refs.payChildren.payChildrenLists(jsonStr);
      }
    }
  },
  components: {
    "header-tab": Header,
    "silderbar-tab": Silderbar,
    "payModel-div": payModel
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
  height: 624px;
  border: 1px solid #cccccc;
  border-bottom: 0px;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f0f0f0;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
.shopCarList::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: transparent;
}
/*定义滚动条轨道 内阴影+圆角*/
.shopCarList::-webkit-scrollbar-track {
  border-radius: 4px;
}

/*定义滑块 内阴影+圆角*/
.shopCarList::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #053249;
}
.shopCarList::-webkit-scrollbar-thumb:hover {
  background-color: #021722;
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
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.shopCar-row02-infor p {
  font-size: 12px;
  color: #a9a9a9;
  font-family: "微软雅黑";
  margin-bottom: 5px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
  cursor: pointer;
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
  cursor: pointer;
}
.gmNoBtn {
  width: 92px;
  line-height: 25px;
  height: 25px;
  text-align: center;
  background-color: #b8b8b8;
  color: #fff;
  font-size: 12px;
  font-family: "微软雅黑";
  border-radius: 4px;
  cursor: pointer;
}
.shopCarBt {
  position: absolute;
  bottom: 15px;
  right: 40px;
}
.shopCarBt p {
  font-size: 12px;
  color: #3d3d3d;
  margin-bottom: 5px;
}
.shopCarBt p b {
  font-size: 18px;
  color: #ff0808;
  font-family: "微软雅黑";
  font-weight: normal;
}
.siderBox {
  position: fixed;
  top: 0px;
  right: 0px;
  transition: 0.5s ease;
}
.siderBoxCurrent {
  right: -300px;
}
.imgBox-shopCar {
  width: 66px;
  height: 66px;
  position: relative;
  float: left;
}
.imgBox-shopCar i {
  width: 29px;
  height: 29px;
  position: absolute;
  top: 0px;
  left: 0px;
  display: block;
  background: url(../assets/zen.png);
}
</style>