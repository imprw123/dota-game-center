<template>
  <div class="container">
    <header-tab></header-tab>
    <div class="main-banner">
      <div class="advertisement" id="mydiv"></div>
      <div class="bannerShow_right">
        <h1>
          <i class="icon01"></i>
          <span>新品推荐</span>
        </h1>
        <div class="tpic_show">
          <em class="jingxi"></em>
          <div class="imgContainer">
             <router-link :to="{name:'DETAIL',query:{goodsId:newRecomment.Goods_id}}">
        <img v-bind:src="newRecomment.Goods_imgPath" />
      </router-link>
          
          </div>
          <h4>{{newRecomment.Goods_disName}}</h4>
          <p>
            <em>秒杀价：</em>
            <b>
              ￥
              <i>{{newRecomment.Goods_price}}</i>
            </b>
            <i>{{newRecomment.Unit}}</i>
          </p>
          <a href="javascript:;" @click="gmFn(newRecomment.Goods_id,1,0)" class="qg">立即抢购</a>
        </div>
      </div>
    </div>
    <div class="limit-buy">
      <div class="limit-buy-left">
        <span class="limintBg"></span>
        <ul class="model01">
          <li v-for="(item,index) in limitList" :key="index">
            <model-div :item="item" v-on:parentHand="childrenHand" ></model-div>
          </li>
        </ul>
      </div>
      <div class="limit-buy-right">
        <div class="tabchange">
          <span v-bind:class="{'current':currentFlag}" v-on:click="tabchangebat('热门排行')">热门排行</span>
          <span v-bind:class="{'current':!currentFlag}" v-on:click="tabchangebat('畅销排行')">畅销排行</span>
        </div>
        <ol>
          <li v-for="(item,index) in rankList" :key="index">
             <router-link :to="{name:'DETAIL',query:{goodsId:item.Goods_id}}">
            <div class="img-left">
             
                <img v-lazy="item.Goods_imgPath" />
             
            </div>
            <div class="infor-right">
              <h2>{{item.Goods_disName}}</h2>
              <p>
                价格:
                <em>
                  <i>{{`￥${item.Goods_price}`}}</i>
                  <i>{{item.Unit}}</i>
                </em>
              </p>
            </div>
             </router-link>
          </li>
        </ol>
      </div>
    </div>
    <!-- Dota推荐商品 -->
    <div class="dota">
      <h1>
        <em>Dota推荐商品</em>
        <router-link :to="'DOTA'">
          <span class="more">进入Dota商店</span>
        </router-link>
      </h1>

      <ul class="model01">
        <li v-for="(item,index) in dotaList" :key="index" v-bind:class="index == 4 ?'current':''">
          <model-div :item="item" v-on:parentHand="childrenHand"  ></model-div>
        </li>
      </ul>
    </div>
    <!-- RPG推荐商品 -->
    <div class="rpg">
      <h1>
        <em>RPG推荐地图</em>
        <router-link :to="'rpgMap'">
          <span class="more">进入RPG地图</span>
        </router-link>
      </h1>
      <ul>
        <li
          v-for="(item,index) in rpgList"
          :key="index"
          v-bind:class="(index+1)%4 == 0 ?'current':''"
        >
          <img   v-lazy="`https://img.5211game.com/5211/shop/RPG/${item.id}.jpg`" class="imgShow" />

          <div class="rpg-left">
            <p>{{item.Name}}</p>
            <div class="typeName">
              <span class="lf">{{item.type}}</span>
            </div>
            <div class="enterShop">
              <router-link :to="{name:'RPG',query:{rpgId:item.id}}">进入商店</router-link>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 平台推荐服务 -->
    <div class="dota">
      <h1>
        <em>平台推荐服务</em>
        <router-link :to="'PT'">
          <span class="more">进入平台服务</span>
        </router-link>
      </h1>
      <ul class="model01">
        <li
          v-for="(item,index) in ptserviceData"
          :key="index"
          v-bind:class="index == 4 ?'current':''"
        >
          <model-div :item="item" v-on:parentHand="childrenHand" ></model-div>
        </li>
      </ul>
    </div>
    <div class="siderBox" v-bind:class="{'siderBoxCurrent':!flag}">
      <silderbar-tab v-on:FixedModel="modelFixed"  ref="mychild"></silderbar-tab>
    </div>
    <payModel-div  ref="payChildren"></payModel-div>
  </div>
</template>
<script>
import { YYAD } from "../api/YYAD";
import Header from "../components/header";
import Silderbar from "../components/silderbar";
import model01 from "../components/model01";
import payModel from "../components/payModel";
import $ from "jquery";
export default {
  name: "Home",
  data() {
    return {
      ptserviceData: [],
      dotaList: [],
      rpgList: [],
      limitList: [],
      newRecomment: "",
      rankList: [],
      currentFlag: true,
      flag: false
    };
  },
  mounted() {
    this.goodsByFlag();
    this.paningBuying();
    this.ptservice();
    this.dotaRecomment();
    this.rpg();
    this.rank4();
    this._YYAD();
  },
  methods: {
    //新品推荐
    goodsByFlag() {
      this.$axios(
        "get",
        `${
          this.$ports.home.QueryWebGoodsByFlagTopN
        }?classid=${0}&flag=${1}&topN=${1}`
      )
        .then(res => {
          //console.log(res);
          if (res.code == 0) {
            this.newRecomment = res.data.list[0];
          } else {
            this.newRecomment = "";
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //限时抢购
    paningBuying() {
      this.$axios(
        "get",
        `${
          this.$ports.home.QueryWebGoodsByFlagTopN
        }?classid=${0}&flag=${2}&topN=${4}`
      )
        .then(res => {
          if (res.code == 0) {
            this.limitList = res.data.list;
          } else {
            this.limitList = [];
          }
        //  console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //平台服务
    ptservice() {
      this.$axios(
        "get",
        `${
          this.$ports.home.QueryWebGoodsByFlagTopN
        }?classid=${1}&flag=${4}&topN=${5}`
      )
        .then(res => {
          // console.log(res);
          if (res.code == 0) {
            this.ptserviceData = res.data.list;
          } else {
            this.ptserviceData = [];
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //dota推荐商品
    dotaRecomment() {
      this.$axios(
        "get",
        `${
          this.$ports.home.QueryWebGoodsByFlagTopN
        }?classid=${3}&flag=${4}&topN=${5}`
      )
        .then(res => {
          // console.log(res);
          if (res.code == 0) {
            this.dotaList = res.data.list;
          } else {
            this.dotaList = [];
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //rpg推荐
    rpg() {
      var _that = this;
      $.getScript(
        "http://g.5211game.com/5211/Rpg/Prop/Script/shopHotRank2.js",
        function() {
          _that.rpgList = rpgObj.data;
          //console.log(_that.rpgList);
        }
      );
    },
    //畅销排行
    HotRank() {
      var _that = this;
      $.getScript(
        "http://g.5211game.com/5211/Rpg/Prop/Script/shopHotRank2.js",
        function() {
         // console.log("121");
         // console.log(HotRank);
          _that.rankList = HotRank.data.list;
        }
      );
    },
    //热门排行
    rank4() {
      this.$axios("get", `${this.$ports.home.hot}?topN=${4}`)
        .then(res => {
          // console.log(res);
          if (res.code == 0) {
            this.rankList = res.data.list;
          } else {
            this.rankList = [];
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    tabchangebat(val) {
      if (val == "热门排行") {
        this.rank4();
        this.currentFlag = true;
      } else if (val == "畅销排行") {
        this.HotRank();
        this.currentFlag = false;
      }
    },
    //广告
    _YYAD() {
      var _that = this;
      var script = document.createElement("script");
      script.type = "text/javascript";
      try {
        var jsCodeNode = document.createTextNode(
          `${YYAD.LoadAds(1436, null, null, "#mydiv")}`
        );
        script.appendChild(jsCodeNode);
      } catch (e) {
        script.text = code;
      }
      document.getElementById("mydiv").appendChild(script);
    },
    modelFixed(val) {
     // console.log("aa");
      this.flag = val;
    },
    childrenHand() {
      this.$refs.mychild.parentHandleclick();
    },
    gmFn(val,c,v){
       this.$refs.payChildren.payChildren(val,c,v);
    }

  },
  components: {
    "header-tab": Header,
    "model-div": model01,
    "silderbar-tab": Silderbar,
     "payModel-div":payModel
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
.bannerShow_right {
  width: 278px;
  height: 358px;
  background-color: #fff;
  float: right;
  border: 1px solid #dbdbdb;
}

.bannerShow_right h1 {
  width: 258px;
  height: 34px;
  border-bottom: 1px solid #f2f2f2;
  padding-left: 20px;
}

.bannerShow_right h1 i.icon01 {
  width: 20px;
  height: 20px;
  background: url(../assets/icon.png);

  float: left;
  margin-top: 7px;
}

.bannerShow_right h1 span {
  float: left;
  font-size: 14px;
  color: #2bb8aa;
  margin-top: 7px;
  margin-left: 14px;
}

.tpic_show {
  width: 278px;
  overflow: hidden;
  zoom: 1;
  padding-top: 19px;
  position: relative;
}

.jingxi {
  width: 24px;
  height: 66px;
  background: url(../assets/jingxi.png);
  display: block;
  position: absolute;
  top: -1px;
  right: 20px;
}

.imgContainer {
  width: 158px;
  height: 158px;
  margin: 0 auto;
  position: relative;
  /*border:1px solid #1dab9d;*/
}

.imgContainer img {
  width: 158px;
  height: 158px;
  display: block;
}

.tpic_show h4 {
  text-align: center;
  color: #3d3d3d;
  font-size: 16px;
  margin-top: 9px;
}

.tpic_show p {
  font-size: 12px;
  color: #333;
  text-align: center;
  margin-top: 25px;
}

.tpic_show em {
  color: #666666;
}

.tpic_show b {
  color: #f74a4a;
  font-size: 18px;
  font-family: Arial;
}

.tpic_show .qg {
  width: 238px;
  height: 30px;
  margin: 0 auto;
  display: block;
  text-align: center;
  line-height: 30px;
  background-color: #ff6633;
  border: 1px solid #ea450e;
  color: #fff;
  font-size: 14px;
  margin-top: 18px;
}

.tpic_show .qg:hover {
  background-color: #ea450e;
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
  position: relative;
}
.limintBg {
  width: 92px;
  height: 24px;
  background: url(../assets/limint.png);
  position: absolute;
  top: 3px;
  left: 6px;
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
  border-bottom: 1px solid #3dbeff;
  font-family: "微软雅黑";
  color:#3dbeff;
  font-weight: bold;
}
.limit-buy-right ol li {
  width: 243px;
  height: 57px;
  border-bottom: 1px dashed #e6e6e6;
  padding-top: 10px;
}
.limit-buy-right ol li a{
  color:#333;
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
  margin-bottom: 2px;
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
  margin-bottom: 2px;
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
.enterShop:hover{
   border: 1px solid #966e1a;
   background-color: #fff9d3;
}
.enterShop a {
  width: 100%;
  height: 100%;
  font-family: "微软雅黑";
  color: #aa2828;
}
.enterShop:hover a{
  width: 100%;
  height: 100%;
  font-family: "微软雅黑";
  color: #966e1a;
}
.more {
  width: 131px;
  height: 28px;
  line-height: 28px;
  background: url(../assets/more.png);
  float: right;
  font-size: 14px;
  color: #fff;
  font-family: "微软雅黑";
  padding-left: 30px;
}
.siderBox {
  position: fixed;
  top: 0px;
  right: 0px;
  transition: 0.5s ease;
   z-index:1;
}
.siderBoxCurrent {
  right: -300px;
}
</style>
