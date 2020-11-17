<template>
  <div class="siderBar">
    <div class="silderBtn">
      <ul>
        <li class="silder01" v-show="Flag01 || Flag02 || Flag03" v-on:click="closeFixed"></li>
        <li class="silder02" v-on:click="openFixed('购物车')"  v-bind:class="{'silder02Current':Flag01}" >
          <i class="ci-count">{{totalNumber}}</i>
        </li>
        <li class="silder03" v-on:click="openFixed('搜索')" v-bind:class="{'silder03Current':Flag02}"></li>
        <li class="silder04" v-on:click="openFixed('搜藏')" v-bind:class="{'silder04Current':Flag03}"></li>
      </ul>
    </div>
    <div class="siderHd">
      <span v-if="Flag01">购物车</span>
       <span v-if="Flag02">搜索</span>
       <span v-if="Flag03">收藏</span>
      <div class="back" v-on:click="closeFixed"></div>
    </div>
    <!-- 购物车 -->
    <div class="siderBd" v-if="Flag01">
      <div class="silder-shop" v-if="shopCarBox.length > 0">
        <ul>
          <li v-for="(item,index) in shopCarBox" :key="index">
            <div class="shop-left">
              <img v-lazy="item.Goods_imgPath" />
            </div>
            <div class="shop-right">
              <h4>{{item.Goods_disName}}</h4>
              <p>
                <b>{{`￥${item.Goods_price}`}}</b>
              </p>
              <p>
                <em v-bind:title="item.Goods_profile">{{item.Goods_profile}}</em>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="totalBox">
        <div class="totalBox-left">
          <p>
            <em>{{totalNumber}}</em>
            件商品
          </p>
          <p>
            共计
            <b>{{`￥${totalMoney}`}}</b>
          </p>
        </div>
        <div class="totalBox-right">
          <router-link :to="'shopCar'">去购物车结算</router-link>
        </div>
      </div>
    </div>
    <!-- 购物车 -->

    <!-- 搜索 -->
    <div class="siderBd" v-if="Flag02">
      <input type="text" class="pageSearch" v-model="val1" placeholder="请输入你想要查找的道具名称" />
      <div class="quickSearch">
        <router-link :to="{name:'SEARCH',query:{searchName:val1}}">进入商店</router-link>
      </div>
    </div>
    <!-- 搜索 -->

    <!-- 搜藏 -->
    <div class="siderBd" v-if="Flag03">
      <div class="sider-rpg">
        <ul>
           <li
          v-for="(item,index) in rpgList"
          v-bind:class="{'current':(index+1)%4 == 0}"
          :key="index"
        >
          <img
            v-lazy="`https://img.5211game.com/5211/shop/RPG/${item.Class_id}.jpg`"
            class="imgShow"
          />
          <div class="rpg-left">
            <p>{{item.Class_name}}</p>
            <div class="typeName">
              <span class="lf">{{item.Category | typeName}}</span>
            </div>
            <div class="enterShop">
              <router-link :to="{'name':'RPG',query:{rpgId:item.Class_id}}">进入商店</router-link>
            </div>
          </div>
        </li>
        </ul>
      </div>
      <div class="totalBox">
        <div class="totalBox-left">
          <p style="height:47px;line-height:47px;">
            全部搜藏
            <b>{{count}}</b>
          </p>
        </div>
        <div class="totalBox-right">
          <router-link :to="'myMap'">查看全部搜藏</router-link>
        </div>
      </div>
    </div>
    <!-- 搜藏 -->
  </div>
</template>


<script>
export default {
  name: "",
  data() {
    return {
      Flag01: false,
      Flag02: false,
      Flag03: false,
      val1: "",
      shopCarBox: [],
      totalNumber: 0,
      totalMoney: "￥0.00",
      current:1,
      showItem:10,
      rpgList:[],
      count:0
    };
  },
   filters: {
    typeName(val) {
      if (val == 1) {
        return "防守类";
      } else if (val == 2) {
        return "休闲类";
      } else if (val == 3) {
        return "塔防类";
      } else if (val == 4) {
        return "生存类";
      } else if (val == 5) {
        return "对抗类";
      } else if (val == 6) {
        return "ORPG";
      } else if (val == 7) {
        return "会员类";
      } else if (val == 8) {
        return "DOTA";
      }
    }
  },
  watch: {
    val1: {
      handler(newValue, oldValue) {
        this.val1 = newValue;
      },
      immediate: true,
      deep: true
    }
  },

  mounted() {
    this._QueryUserWebCartGoods();
  },
  methods: {
    openFixed(val) {
      if (val == "购物车") {
        this.Flag01 = true;
        this.Flag02 = false;
        this.Flag03 = false;
        this._QueryUserWebCartGoods();
      } else if (val == "搜索") {
        this.Flag01 = false;
        this.Flag02 = true;
        this.Flag03 = false;
      } else if (val == "搜藏") {
        this.Flag01 = false;
        this.Flag02 = false;
        this.Flag03 = true;
        this.collectedMap();
      }
      this.$emit("FixedModel", true);
    },
    closeFixed() {
      this.Flag01 = false;
      this.Flag02 = false;
      this.Flag03 = false;
      this.$emit("FixedModel", false);
    },
    _QueryUserWebCartGoods() {
      this.totalNumber = 0;
      this.totalMoney = 0;
      this.$axios("get", `${this.$ports.shopCar.QueryUserWebCartGoods}`)
        .then(res => {
          console.log("购物车");
          console.log(res);
          if (res.code == 0) {
            this.shopCarBox = res.data;
          } else {
            this.shopCarBox = [];
          }
          if (this.shopCarBox.length > 0) {
            var _that = this;
            this.shopCarBox.forEach(function(obj, index) {
              console.log(obj.Goods_amount);
              _that.totalMoney +=
                Number(obj.Goods_price) * Number(obj.Goods_amount);
              _that.totalNumber += Number(obj.Goods_amount);
            });
          }
          this.totalMoney = this.totalMoney.toFixed(2);
        })
        .catch(error => {
          console.log(error);
        });
    },
    parentHandleclick() {
      this._QueryUserWebCartGoods();
    },
    AddCollectedChildrenClick(){
      this.collectedMap();
    },
       collectedMap() {
      this.$axios(
        "get",
        `${this.$ports.myMap.QueryUserCollectedRPG}?pi=${this.current}&ps=${this.showItem}`
      )
        .then(res => {
          console.log(res);
          this.rpgList = res.data.list;
          this.count=res.data.count;
        })
        .catch(error => {});
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
.siderHd span{
  float: left;
  height:50px;
  line-height: 60px;
  color: #dfdfdf;
  font-family:'微软雅黑';
  font-size: 16px;
  margin-left: 10px;
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
  background: url(../assets/bigBack.png);
}
.silderBtn ul li.silder01:hover {
  background: url(../assets/bigBack-hover.png);
  transition: 0.2s;
}
.silderBtn ul li.silder02 {
  background: url(../assets/silder02.png);
  position: relative;
}
.silderBtn ul li.silder02 .ci-count {
  position: absolute;
  top: -1px;
  left: -3px;
  display: inline-block;
  padding: 2px;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: -1px;
  color: #fff;
  background-color: #da1026;
  border-radius: 7px;
  min-width: 16px;
  font-family: Arial;
  text-align: center;
}
.silderBtn ul li.silder02:hover {
  background: url(../assets/silder02-hover.png);
  transition: 0.2s;
}
.silderBtn ul li.silder02Current{
   background: url(../assets/silder02-hover.png);
}
.silderBtn ul li.silder03 {
  background: url(../assets/silder03.png);
}
.silderBtn ul li.silder03:hover {
  background: url(../assets/silder03-hover.png);
  transition: 0.2s;
}
.silderBtn ul li.silder03Current{
  background: url(../assets/silder03-hover.png);
}
.silderBtn ul li.silder04 {
  background: url(../assets/silder04.png);
}
.silderBtn ul li.silder04:hover {
  background: url(../assets/silder04-hover.png);
  transition: 0.2s;
}
.silderBtn ul li.silder04Current{
   background: url(../assets/silder04-hover.png);
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
 /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/  
.silder-shop::-webkit-scrollbar  
{  
    width: 8px;  
    height:8px;  
    background-color:transparent;
}  
/*定义滚动条轨道 内阴影+圆角*/  
.silder-shop::-webkit-scrollbar-track  
{  
    border-radius: 4px;  
}  
  
/*定义滑块 内阴影+圆角*/  
.silder-shop::-webkit-scrollbar-thumb  
{  
    border-radius: 4px;  
    background-color: #053249;  
}  
.silder-shop::-webkit-scrollbar-thumb:hover{
    background-color: #021722;  
}
 /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/  
.sider-rpg::-webkit-scrollbar  
{  
    width: 8px;  
    height:8px;  
    background-color:transparent;
}  
/*定义滚动条轨道 内阴影+圆角*/  
.sider-rpg::-webkit-scrollbar-track  
{  
    border-radius: 4px;  
}  
  
/*定义滑块 内阴影+圆角*/  
.sider-rpg::-webkit-scrollbar-thumb  
{  
    border-radius: 4px;  
    background-color: #053249;  
}  
.sider-rpg::-webkit-scrollbar-thumb:hover{
    background-color: #021722;  
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
.shop-right {
  width: 186px;
  height: 66px;
  float: left;
  padding-left: 10px;
}
.shop-right h4 {
  font-size: 14px;
  color: #3a3f4a;
  font-weight: normal;
  font-family: "微软雅黑";
  margin-bottom: 5px;
}
.shop-right p b {
  color: #ff0808;
}
.shop-right p {
  color: #a9a9a9;
  font-size: 12px;
  font-family: "微软雅黑";
  margin-bottom: 5px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.pageSearch {
  width: 274px;
  height: 32px;
  line-height: 32px;
  display: block;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 4px;
  margin-top: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  color: #a9a9a9;
  font-family: "微软雅黑";
  font-size: 14px;
  text-align: center;
}
.quickSearch {
  width: 102px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: #fff;
  font-family: "微软雅黑";
  background-color: #7799c2;
  margin: 0 auto;
  margin-top: 20px;
  font-size: 12px;
  cursor: pointer;
  border-radius: 4px;
}
.quickSearch a {
  color: #fff;
  font-family: "微软雅黑";
  display: block;
  width: 100%;
  height: 100%;
}
</style>