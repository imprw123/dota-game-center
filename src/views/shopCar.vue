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
                <router-link :to="{name:'DETAIL',query:{goodsId:item.Goods_id}}">
                  <img v-lazy="item.Goods_imgPath" />
                </router-link>
                <i
                  class="zen"
                  v-show="item.BeGiven_userid>0"
                  v-on:click.self="searchName(item.BeGiven_userid)"
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
                <em
                  class="leftBtn"
                  @click="leftBtn(item.Goods_id,item.goodsid,item.BeGiven_userid,item.Goods_amount)"
                >-</em>
                <input type="text" id="count" v-model="item.Goods_amount" readonly="readonly" />
                <em
                  class="rightBtn"
                  @click.self="rightBtn(item.Goods_id,item.goodsid,item.BeGiven_userid)"
                >+</em>
              </span>
            </div>
            <div class="shopCar-row05" style="width:210px">
              <span>{{`￥${item.Goods_price*item.Goods_amount}`}}</span>
            </div>
            <div class="shopCar-row06" style="width:200px">
              <span @click="RemoveWebCartGoods(item.Goods_id,item.BeGiven_userid)">删除</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="shopCarBt">
        <div class="gmNoBtn" v-show="totalMoney == 0">立即购买</div>
        <div class="gmBtn" v-show="totalMoney>0" @click="gmFn()">立即购买</div>
        <p>
          总价:
          <b>{{`￥${totalMoney}`}}</b>
        </p>

        <p>
          已选择:
          <b>{{totalNumber}}</b>
          件商品
        </p>
      </div>
    </div>
    <div class="siderBox" v-bind:class="{'siderBoxCurrent':!flag}">
      <silderbar-tab v-on:FixedModel="modelFixed" ref="mychild"></silderbar-tab>
    </div>
    <payModel-div ref="payChildren" v-on:rushWebCar="webInit"></payModel-div>
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
          // console.log(res);
          if (res.code == 0) {
            this.shopCarBox = res.data;
          } else {
            this.shopCarBox = [];
          }
          if (this.shopCarBox.length > 0) {
            for (var j = 0, len = this.shopCarBox.length; j < len; j++) {
              this.$set(this.shopCarBox[j], "goodsid", false);
            }
          }
          // if (this.shopCarBox.length > 0) {
          //   for (var j = 0, len = this.shopCarBox.length; j < len; j++) {
          //     this.totalMoney +=
          //       Number(this.shopCarBox[j].Goods_price) *
          //       Number(this.shopCarBox[j].Goods_amount);
          //     this.totalNumber += Number(this.shopCarBox[j].Goods_amount);
          //     this.$set(
          //       this.shopCarBox[j],
          //       "goodsid",
          //       false
          //     );
          //   }
          // }
          // this.totalMoney = this.totalMoney.toFixed(2);
        })
        .catch(error => {
          console.log(error);
        });
    },
    webInit() {
      this._QueryUserWebCartGoods();
    },
    leftBtn(gid, id, uid, count) {
      if (uid == null) {
        uid = 0;
      }
      var _that = this;
      if (this.delFlag) {
        this.delFlag = false;
        if (id) {
          if (count <= 1) {
            this.delFlag = true;
            return false;
          } else {
            this.DeductWebCartGoods(gid, uid);
          }
        } else {
          Toast({
            message: "请先勾选商品!",
            iconClass: "icon",
            duration: 1000
          });
          this.delFlag = true;
        }
      } else {
        Toast({
          message: "操作太频繁了……",
          iconClass: "icon",
          duration: 1000
        });
        _that.delFlag = true;
      }
    },
    rightBtn(gid, id, uid) {
      if (uid == null) {
        uid = 0;
      }
      debugger;
      var _that = this;
      if (this.addFlag) {
        this.addFlag = false;
        if (id) {
          _that.AddWebCartGoods(gid, uid);
        } else {
          Toast({
            message: "请先勾选商品!",
            iconClass: "icon",
            duration: 1000
          });
          _that.addFlag = true;
        }

        return false;
      } else {
        Toast({
          message: "操作太频繁了……",
          iconClass: "icon",
          duration: 1000
        });
        _that.addFlag = true;
      }
    },
    modelFixed(val) {
      this.flag = val;
    },
    AddWebCartGoods(goodsid, uid) {
      debugger;
      this.$axios(
        "get",
        `${
          this.$ports.shopCar.AddWebCartGoods
        }?beGivenUserId=${uid}&goodsId=${goodsid}&count=${1}`
      )
        .then(res => {
          // console.log(res);
          if (res.code == 0) {
            this.addFlag = true;
            this.$refs.mychild.parentHandleclick();
            this._QueryUserWebCartGoods();
          } else if (res.code < 0) {
            Toast({
              message: res.msg,
              iconClass: "icon",
              duration: 2000
            });
          }
          this.addFlag = true;
        })
        .catch(error => {
          this.addFlag = true;
        });
    },
    DeductWebCartGoods(gid, uid) {
      //debugger;
      this.$axios(
        "get",
        `${this.$ports.shopCar.DeductWebCartGoods}?beGivenUserId=${uid}&goodsId=${gid}`
      )
        .then(res => {
          //  console.log(res);
          if (res.code == 0) {
            this.delFlag = true;
            this.$refs.mychild.parentHandleclick();
            this._QueryUserWebCartGoods();
          } else if (res.code < 0) {
            Toast({
              message: res.msg,
              iconClass: "icon",
              duration: 2000
            });
            this.delFlag = true;
          }
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
    RemoveWebCartGoods(goodsid, uid) {
      if (uid == null) {
        uid = 0;
      }
      this.$axios(
        "get",
        `${this.$ports.shopCar.RemoveWebCartGoods}?beGivenUserId=${uid}&goodsId=${goodsid}`
      )
        .then(res => {
          // console.log();
          if (res.code == 0) {
            this._QueryUserWebCartGoods();
            this.$refs.mychild.parentHandleclick();
          } else if (res.code < 0) {
            Toast({
              message: res.msg,
              iconClass: "icon",
              duration: 2000
            });
          }
        })
        .catch(error => {});
    },
    searchName(valName) {
      this.$axios("get", `${this.$ports.send.CheckAccount}?account=${valName}`)
        .then(res => {
          this.sendNameShow = `赠送给${res.data.UserName}`;
          Toast({
            message: this.sendNameShow,
            iconClass: "icon",
            duration: 1000
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    gmFn() {
      // console.log(this.shopCarBox);
      var _data = [];
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
      //  console.log(jsonStr);
      //  console.log(_data.length)
      if (_data.length == 0) {
        Toast({
          message: "请勾选商品!",
          iconClass: "icon",
          duration: 1000
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
  padding-bottom: 49px;
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
  width: 108px;
  line-height: 49px;
  height: 49px;
  text-align: center;
  background-color: #ff4a00;
  color: #fff;
  font-size: 12px;
  font-family: "微软雅黑";
  cursor: pointer;
  float: right;
  margin-left: 20px;
}
.gmNoBtn {
  width: 108px;
  line-height: 49px;
  height: 49px;
  text-align: center;
  background-color: #b8b8b8;
  color: #fff;
  font-size: 12px;
  font-family: "微软雅黑";
  cursor: pointer;
  float: right;
  margin-left: 20px;
}
.shopCarBt {
  width: 100%;
  position: absolute;
  bottom: 0px;
  right: 0px;
}
.shopCarBt p {
  height: 49px;
  line-height: 49px;
  font-size: 12px;
  color: #3d3d3d;
  float: right;
  margin-left: 20px;
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
  z-index: 1;
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
  cursor: pointer;
}
</style>