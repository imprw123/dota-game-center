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
        <span style="width:206px">单价(通宝)</span>
        <span style="width:120px">数量</span>
        <span style="width:210px">小计(通宝)</span>
        <span style="width:208px">操作</span>
      </div>
      <div class="shopCarList">
        <ul v-if="shopCarBox.length > 0">
          <li v-for="(item,index) in shopCarBox" :key="index">
            <div class="shopCar-row01" style="width:104px">
              <input type="checkbox" id="myCheck" v-model="item.goodsid" />
            </div>
            <div class="shopCar-row02" style="width:230px">
              <img v-lazy="item.Goods_imgPath" />
              <div class="shopCar-row02-infor">
                <h5>{{item.Goods_disName}}</h5>
                <p>
                  所属分类:
                  <em v-bind:title="item.Goods_profile">{{item.Goods_profile}}</em>
                </p>
                <p>
                  <em>{{item.Goods_price}}</em>（商品单价）
                </p>
              </div>
            </div>
            <div class="shopCar-row03" style="width:206px">{{item.Goods_price}}</div>
            <div class="shopCar-row04" style="width:120px">
              <span class="changeNum">
                <em class="leftBtn" @click="leftBtn(index)">-</em>
                <input type="text" id="count" v-model="item.Goods_amount" readonly="readonly" />
                <em class="rightBtn" @click.self="rightBtn(index)">+</em>
              </span>
            </div>
            <div class="shopCar-row05" style="width:210px">
              <span>{{item.Goods_price}}</span>
            </div>
            <div class="shopCar-row06" style="width:208px">
              <span @click="RemoveWebCartGoods(item.Goods_id)">删除</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="shopCarBt">
        <p>
          总价:
          <b>{{`￥${totalMoney}`}}</b>
        </p>
        <div class="gmBtn">立即购买</div>
      </div>
    </div>
    <div class="siderBox" v-bind:class="{'siderBoxCurrent':!flag}">
      <silderbar-tab v-on:FixedModel="modelFixed" ref="mychild"></silderbar-tab>
    </div>
  </div>
</template>

<script >
import Header from "../components/header";
import Silderbar from "../components/silderbar";
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
      delFlag: true
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
              this.$set(this.shopCarBox[j],"goodsid",this.shopCarBox[j].Goods_id);
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
        `${this.$ports.shopCar.AddWebCartGoods}?goodsId=${goodsid}&count=${count}`
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
    }
  },
  components: {
    "header-tab": Header,
    "silderbar-tab": Silderbar
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
</style>