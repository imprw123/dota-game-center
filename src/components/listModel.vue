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
            <input type="text"  v-model="val"/>
            <div class="sou" v-on:click="searchlistInpt"></div>
          </div>
        </div>
        <div class="action-search-right">
          <span class="weightChange" v-bind:class="{'current':typeTagStr == 'weight'}" @click="typeTagchangeBtn('综合')">
            综合
            <i v-bind:class="{'current':typeTagStr == 'weight'}"></i>
          </span>
          <span class="Sales" v-bind:class="{'current':typeTagStr == 'sale'}" @click="typeTagchangeBtn('销量')">
            销量
            <i v-bind:class="{'current':typeTagStr == 'sale'}"></i>
          </span>
          <span class="price" @click="typeTagchangeBtn('价格')" v-bind:class="{'current':typeTagStr == 'priceup' || typeTagStr == 'pricedown' }">
            价格
            <i
              v-bind:class="{'currentUp':typeTagStr == 'priceup','currentDown':typeTagStr == 'pricedown'}"
            ></i>
          </span>
          <span class="shelves" v-bind:class="{'current':typeTagStr == 'uptime'}" @click="typeTagchangeBtn('上架时间')">
            上架时间
            <i v-bind:class="{'current':typeTagStr == 'uptime'}"></i>
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
          <span class="prev" v-show="current != 1" v-on:click="current-- && goto(current)">前一页</span>
          <span class="first" v-on:click="firstPage">首页</span>
          <a
            v-for="index in pages"
            v-on:click="goto(index)"
            v-bind:class="{'current':current == index}"
            :key="index"
          >{{index}}</a>

          <span class="next" v-on:click="lastPage">尾页</span>
          <span
            class="prev"
            v-show="allpage != current && allpage != 0 "
            v-on:click="current++ && goto(current++)"
          >后一页</span>
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
    },
    pageIndex: {
      type: Number | String,
      default: 1
    },
    pageSize: {
      type: Number | String,
      default: 5
    },
    allpage: {
      type: Number | String,
      default: 10
    },
    typeTag: {
      type: String,
      default: "weight"
    }
  },
  data() {
    return {
      navname: this.nav,
      modellistContainer: [],
      isflag1: this.flag01,
      searchlistContainer: [],
      modelobjContainer: "",
      id: this.classid,
      typeTagStr: this.typeTag,
      msg: false,
      current: this.pageIndex, // 当前页码
      showItem: this.pageSize, // 最少显示5个页码
      allpageLists: this.allpage, // 总共的
      shopFlag:0,
      val:'',
    };
  },
  watch: {
    searchlist: {
      handler(newValue, oldValue) {
        console.log(newValue);
        this.searchlistContainer = newValue;
      },
      immediate: true,
      deep: true
    },
    modelist01: {
      handler(newValue, oldValue) {
        console.log(newValue);
        this.modellistContainer = newValue;
      },
      immediate: true,
      deep: true
    },
    modelobj: {
      handler(newValue, oldValue) {
        console.log(newValue);
        this.modelobjContainer = newValue;
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    pages: function() {
      var pag = [];
      if (this.current < this.showItem) {
        //如果当前的激活的项 小于要显示的条数
        //总页数和要显示的条数那个大就显示多少条
        var i = Math.min(this.showItem, this.allpageLists);
        while (i) {
          pag.unshift(i--);
        }
      } else {
        //当前页数大于显示页数了
        var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
          i = this.showItem;
        if (middle > this.allpageLists - this.showItem) {
          middle = this.allpageLists - this.showItem + 1;
        }
        while (i--) {
          pag.push(middle++);
        }
      }
      return pag;
    }
  },
  mounted() {
    //console.log(this.id);
    var _that = this;
    this.modelobjContainer.Class_GoodsCount.forEach(function(obj, index) {
      if (obj.Flag == 128) {
        _that.msg = true;
      } else {
        _that.msg = false;
      }
    });
  },
  methods: {
    goto: function(index) {
      this.current = index;
      this.$emit("pageIndexChange", index);
    },
    firstPage() {
      this.current = 1;
      this.$emit("pageIndexChange", 1);
    },
    lastPage() {
      this.current = this.allpageLists;
      this.$emit("pageIndexChange", this.current);
    },
    typeTagchangeBtn(name) {
      if (name == '综合') {
        this.typeTagStr = "weight";
        this.$emit("changeTag", this.typeTagStr);
      } else if (name == '销量') {
        console.log('aa')
        this.typeTagStr = "sale";
        console.log(this.typeTagStr );
        this.$emit("changeTag", this.typeTagStr);
      } else if (name == '价格') {
        if (this.typeTagStr != "priceup" && this.typeTagStr != "pricedown") {
          this.typeTagStr = "priceup";
          this.$emit("changeTag", this.typeTagStr);
        } else if (this.typeTagStr == "priceup") {
          this.typeTagStr = "pricedown";
          this.$emit("changeTag", this.typeTagStr);
        } else if (this.typeTagStr == "pricedown") {
          this.typeTagStr = "priceup";
          this.$emit("changeTag", this.typeTagStr);
        }
      } else if (name == '上架时间') {
        this.typeTagStr = "uptime";
        this.$emit("changeTag", this.typeTagStr);
      }
    },
    searchlistInpt(){
       this.$axios(
        "get",
        `${
          this.$ports.dota.QueryWebGoodsBySeachFlagPager
        }?classid=${this.id}&flag=${this.shopFlag}&search=${escape(this.val)}&sort=${this.typeTagStr}&pi=${
          1
        }&ps=${10}`
      )
        .then(res => {
          console.log(res);
          this.searchlistContainer = res.data.list;
          this.allpageLists = Math.ceil(res.data.count / 10);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
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
.listContent ul.model01 {
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
.pageCount {
  width: 100%;
  height: 36px;
  line-height: 36px;
  text-align: center;
  font-size: 14px;
  color: #a9aaaa;
  font-family: "微软雅黑";
  margin-top: 10px;
}
.pageCount span {
  margin: 0 5px;
  cursor: pointer;
}
.pageCount a {
  width: 26px;
  height: 26px;
  line-height: 26px;
  display: inline-block;
  text-align: center;
  color: #474747;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  margin: 0 2px;
  cursor: pointer;
}
.pageCount a.current {
  background: #f74a4a;
  border: 1px solid #e33232;
  color: #fff;
}
</style>