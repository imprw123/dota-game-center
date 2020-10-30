<template>
  <div class="listModelContainer">
    <div class="nav-tab">
      <span>首页</span>
      <em>></em>
      <span>{{navname}}</span>
    </div>
    <div class="detailInfor" v-if="modelobjContainer.IsShow">
      <div class="detail-img">
        <img v-bind:src="modelobjContainer.Class_imgPath" alt />
      </div>
      <div class="indetail-infor">
        <div class="detail-name">
          <span>{{modelobjContainer.Class_name}}</span>
          <em>满100-10</em>
          <em>满200八折</em>
        </div>
        <div class="detailtypeName">
          <span v-if="modelobjContainer.Class_category">{{modelobjContainer.Class_category}}</span>
        </div>
        <div class="num-infor">
          <span>普通商品（111）</span>
          <span v-if="msg">定制商品(1111)</span>
        </div>
      </div>
      <div class="scGame"></div>
      <div class="jryx"></div>
    </div>
    <!-- 热门推荐 -->
    <div class="dota">
      <h1>
        <em v-text="!modelobjContainer.IsRPG  == true?'热门推荐':'新手推荐'"></em>
      </h1>
      <ul class="model01">
        <li
          v-for="(item,index) in modellistContainer"
          :key="index"
          v-bind:class="index == 4 ?'current':''"
        >
          <model-div :item="item"></model-div>
        </li>
      </ul>
    </div>
    <!-- 热门推荐 -->

    <!-- tab页签 -->
    <div class="tab-change-model">
      <div class="tabBox" v-if="msg">
        <span class="current">普通商品</span>
        <span>定制商品</span>
      </div>
      <div class="in-tab-change-model" v-if="modelobjContainer.Class_GoodsInfo.length>0">
        <span
          v-for=" (item,index) in modelobjContainer.Class_GoodsInfo"
          :key="index"
          v-bind:class="{'current':item.Class_id == id}"
        >
          <i>{{item.Class_name}}</i>
          <em>{{`(${item.Goods_count})`}}</em>
        </span>
      </div>
      <div class="action-search">
        <div class="action-search-left">
          <div class="inpt-search">
            <input type="text" />
            <div class="sou"></div>
          </div>
        </div>
        <div class="action-search-right">
          <span class="weightChange current">
            综合
            <i class="current"></i>
          </span>
          <span class="Sales">
            销量
            <i></i>
          </span>
          <span class="price">
            价格
            <i></i>
          </span>
          <span class="shelves">
            上架时间
            <i class="current"></i>
          </span>
        </div>
      </div>
      <div class="listContent">
        <ul class="model01">
          <li
            v-for="(item,index) in searchlistContainer"
            :key="index"
            v-bind:class="(index+1)%5 == 0 ?'current':''"
          >
            <model-div :item="item"></model-div>
          </li>
        </ul>
        <div class="pageCount">
          
        </div>
      </div>
    </div>
    <!-- tab页签 -->
  </div>
</template>


<script >
import model01 from "../components/model01";
export default {
  name: "listModel",
  props: {
    nav: String,
    modelist01: {
      type: Array,
      default: []
    },
    searchlist: {
      type: Array,
      default: []
    },
    modelobj: {
      type: Object,
      default: null
    },
    classid: {
      type: Number,
      default: ""
    }
  },
  data() {
    return {
      navname: this.nav,
      modellistContainer: this.modelist01,
      isflag1: this.flag01,
      searchlistContainer: this.searchlist,
      modelobjContainer: this.modelobj,
      id: this.classid,
      msg: false
    };
  },
  mounted() {
    console.log(this.id);
    var _that = this;
    this.modelobjContainer.Class_GoodsCount.forEach(function(obj, index) {
      if (obj.Flag == 128) {
        _that.msg = true;
      } else {
        _that.msg = false;
      }
    });
  },
  methods: {},
  components: {
    "model-div": model01
  }
};
</script>


<style>
.listModelContainer {
  width: 1080px;
  overflow: hidden;
  zoom: 1;
  margin: 0 auto;
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
.detailInfor {
  width: 1035px;
  height: 143px;
  background-color: #fff;
  border: 1px solid #ebebeb;
  padding: 14px 20px 0px 23px;
  position: relative;
}
.detail-img {
  width: 205px;
  height: 129px;
  float: left;
}
.detail-img img {
  width: 205px;
  height: 129px;
}
.indetail-infor {
  width: 798px;
  height: 115px;
  float: left;
  padding-top: 14px;
  padding-left: 32px;
}
.detail-name {
  overflow: hidden;
  zoom: 1;
  margin-bottom: 20px;
}
.detail-name span {
  color: #000;
  font-size: 14px;
}
.detail-name em {
  font-size: 12px;
  background-color: #fbdcc7;
  display: inline-block;
  text-align: center;
  border: 1px solid #f74a4a;
  color: #f74a4a;
  font-family: "微软雅黑";
  padding: 0px 2px;
  border-radius: 1px;
  margin-left: 10px;
}
.detailtypeName {
  width: 100%;
  overflow: hidden;
  zoom: 1;
  margin-bottom: 20px;
}
.detailtypeName span {
  padding: 0 4px;
  background-color: #a56262;
  color: #fff;
  font-size: 12px;
  font-family: "微软雅黑";
}
.num-infor {
  color: #9d9d9d;
  font-size: 12px;
  font-family: "微软雅黑";
}
.num-infor span {
  margin-right: 10px;
}
.scGame {
  width: 96px;
  height: 24px;
  background: url(../assets/sc.png);
  position: absolute;
  top: 50px;
  right: 20px;
  cursor: pointer;
}
.ysc {
  background: url(../assets/ysc.png);
}
.scGame:hover {
  background: url(../assets/sc-hover.png);
  transition: 0.2s;
}
.jryx {
  width: 96px;
  height: 24px;
  background: url(../assets/jryx.png);
  position: absolute;
  top: 85px;
  right: 20px;
  cursor: pointer;
}
.jryx:hover {
  background: url(../assets/jryx-hover.png);
  transition: 0.2s;
}
.tab-change-model {
  width: 1080px;
  overflow: hidden;
  zoom: 1;
  font-size: 12px;
  color: #fff;
  margin-top: 25px;
  font-family: "微软雅黑";
}
.in-tab-change-model {
  width: 100%;
  overflow: hidden;
  zoom: 1;
  margin-bottom: 10px;
}
.in-tab-change-model span {
  display: inline-block;
  overflow: hidden;
  zoom: 1;
  margin-right: 15px;
  margin-bottom: 5px;
}
.in-tab-change-model span.current {
  color: #ff3434;
}
.action-search {
  width: 100%;
  overflow: hidden;
  zoom: 1;
  margin-bottom: 15px;
}
.action-search-left {
  width: 640px;
  overflow: hidden;
  zoom: 1;
  float: left;
}
.action-search-right {
  width: 440px;
  overflow: hidden;
  zoom: 1;
  float: left;
}
.action-search-right span {
  width: 110px;
  height: 38px;
  display: block;
  float: left;
  text-align: center;
  line-height: 38px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  position: relative;
  z-index: 1;
}
.action-search-right span.current {
  color: #ff3434;
}
.action-search-right span.weightChange i {
  width: 10px;
  height: 9px;
  display: block;
  background: url(../assets/pay_num.png);
  position: absolute;
  top: 16px;
  right: 28px;
}

.action-search-right span.weightChange i.current {
  background: url(../assets/pay_num_hover.png);
}

.action-search-right span.Sales i {
  width: 10px;
  height: 9px;
  display: block;
  background: url(../assets/pay_num.png);
  position: absolute;
  top: 16px;
  right: 28px;
}
.action-search-right span.Sales i.current {
  background: url(../assets/pay_num_hover.png);
}
.action-search-right span.price i {
  width: 10px;
  height: 12px;
  display: block;
  background: url(../assets/jg.png);
  position: absolute;
  top: 14px;
  right: 27px;
}
.action-search-right span.price i.currentUp {
  background: url(../assets/jg_up.png);
}
.action-search-right span.price i.currentDown {
  background: url(../assets/jg_down.png);
}
.action-search-right span.shelves i {
  width: 10px;
  height: 9px;
  display: block;
  background: url(../assets/pay_num.png);
  position: absolute;
  top: 16px;
  right: 13px;
}
.action-search-right span.shelves i.current {
  background: url(../assets/pay_num_hover.png);
}
.action-search-left .inpt-search {
  width: 510px;
  height: 32px;
}
.action-search-left .inpt-search input {
  width: 462px;
  height: 32px;
  float: left;
  border-radius: 6px 0px 0px 6px;
  padding-left: 10px;
  color: #333;
}

.inpt-search .sou {
  width: 38px;
  height: 32px;
  background: url(../assets/searchBnt.png);
  float: left;
}
.inpt-search .sou:hover {
  background: url(../assets/searchBnt2.png);
  transition: 0.2s;
  cursor: pointer;
}
.listContent {
  width: 1080px;
  overflow: hidden;
  zoom: 1;
}
.listContent ul.model01 li {
  margin-right: 10px;
  margin-bottom: 10px;
}
.listContent ul.model01 li.current {
  margin-right: 0px;
}
.tabBox {
  width: 1080px;
  height: 33px;
  background: url(../assets/tagbg01.png);
  margin-bottom: 10px;
}
.tabBox span {
  width: 540px;
  height: 33px;
  float: left;
  line-height: 33px;
  text-align: center;
  font-family: "微软雅黑";
  font-size: 18px;
  color: #5f94be;
}
.tabBox span.current {
  color: #fff;
}
</style>