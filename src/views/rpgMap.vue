<template>
  <div class="rpgMap">
    <header-tab></header-tab>
    <div class="nav-tab">
      <span>首页</span>
      <em>></em>
      <span>RPG商店</span>
    </div>
    <div class="adver-rpg">
      <div class="adver-rpg-left" id="mydiv"></div>
      <div class="adver-rpg-right">
        <ul>
          <li id="mydiv01"></li>
          <li class="current" id="mydiv02"></li>
          <li id="mydiv03"></li>
          <li class="current" id="mydiv04"></li>
        </ul>
      </div>
    </div>
    <div class="rpgShop">
      <b>RPG商店</b>
      <div class="searchRpg">
        <input type="text" placeholder="请输入地图名称" v-model="valName" />
        <div class="rpgBtn" @click="searchBtn">搜索商店</div>
      </div>
    </div>
    <div class="rpgMapList">
      <div class="rpgMapListHd">
        <span
          v-for="(item,index) in typeListName"
          :key="index"
          v-bind:class="{'current':item.categoryid == category }"
          @click="categoryChange(item.categoryid)"
        >{{item.name}}</span>
      </div>
      <div class="rpgMapListCenter">
        <span>筛选</span>
        <em
          v-for="(item,index) in stirngFirstWords"
          :key="index"
          @click="firstWordSearch(item)"
          v-bind:class="{'current':item == firstword}"
        >{{item}}</em>
      </div>
      <div class="mapListRpg" v-if="rpgList.length == 0" v-cloak>
        <span class="noPain"></span>
      </div>
      <div class="mapListRpg" v-if="rpgList.length>0">
        <ul>
          <li
            v-for="(item,index) in rpgList"
            :key="index"
            v-bind:class="(index+1)%4 == 0 ?'current':''"
          >
            <img
              class="imgShow"
              v-lazy="`https://img.5211game.com/5211/shop/RPG/${item.Class_id}.jpg`"
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
        <div class="pageCount" v-if="pages !== null && pages.length != 0 ">
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
            v-show="allpageLists != current && allpageLists != 0 "
            v-on:click="current++ && goto(current++)"
          >后一页</span>
        </div>
      </div>
    </div>
    <div class="siderBox" v-bind:class="{'siderBoxCurrent':!flag}">
      <silderbar-tab v-on:FixedModel="modelFixed" ref="mychild"></silderbar-tab>
    </div>
  </div>
</template>


<script>
import Header from "../components/header";
import Silderbar from "../components/silderbar";
import { YYAD } from "../api/YYAD";
export default {
  name: "RPGMAP",
  data() {
    return {
      rpgList: [],
      allpageLists: "",
      showItem: 12, // 最少显示5个页码
      current: 1, // 当前页码
      category: 0,
      typeListName: [
        { name: "全部", categoryid: 0 },
        { name: "防守类", categoryid: 1 },
        { name: "休闲类", categoryid: 2 },
        { name: "塔防类", categoryid: 3 },
        { name: "生存类", categoryid: 4 },
        { name: "对抗类", categoryid: 5 },
        { name: "ORPG", categoryid: 6 },
        { name: "会员类", categoryid: 7 },
        { name: "DOTA", categoryid: 8 }
      ],
      stirngFirstWords: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ],
      firstword: "",
      valName: "",
      flag: false,
      isSearch: true
    };
  },
  watch: {
    valName: {
      handler(newValue, oldValue) {
        if (newValue == "") {
          this.valName = "";
          this._QueryRPGBySearchPager();
        }
      },
      immediate: true,
      deep: true
    }
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
  computed: {
    pages: function() {
      var pag = [];
      // debugger;
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
    this._QueryRPGBySearchPager();
    this._YYAD();
    this._YYAD1();
    this._YYAD2();
    this._YYAD3();
    this._YYAD4();
  },
  methods: {
    _YYAD() {
      var _that = this;
      var script = document.createElement("script");
      script.type = "text/javascript";
      try {
        var jsCodeNode = document.createTextNode(
          `${YYAD.LoadAds(1467, null, null, "#mydiv")}`
        );
        script.appendChild(jsCodeNode);
      } catch (e) {
        script.text = code;
      }
      document.getElementById("mydiv01").appendChild(script);
    },
    _YYAD1() {
      var _that = this;
      var script = document.createElement("script");
      script.type = "text/javascript";
      try {
        var jsCodeNode = document.createTextNode(
          `${YYAD.LoadAds(1468, null, null, "#mydiv01")}`
        );
        script.appendChild(jsCodeNode);
      } catch (e) {
        script.text = code;
      }
      document.getElementById("mydiv02").appendChild(script);
    },
    _YYAD2() {
      var _that = this;
      var script = document.createElement("script");
      script.type = "text/javascript";
      try {
        var jsCodeNode = document.createTextNode(
          `${YYAD.LoadAds(1469, null, null, "#mydiv02")}`
        );
        script.appendChild(jsCodeNode);
      } catch (e) {
        script.text = code;
      }
      document.getElementById("mydiv02").appendChild(script);
    },
    _YYAD3() {
      var _that = this;
      var script = document.createElement("script");
      script.type = "text/javascript";
      try {
        var jsCodeNode = document.createTextNode(
          `${YYAD.LoadAds(1470, null, null, "#mydiv03")}`
        );
        script.appendChild(jsCodeNode);
      } catch (e) {
        script.text = code;
      }
      document.getElementById("mydiv02").appendChild(script);
    },
    _YYAD4() {
      var _that = this;
      var script = document.createElement("script");
      script.type = "text/javascript";
      try {
        var jsCodeNode = document.createTextNode(
          `${YYAD.LoadAds(1471, null, null, "#mydiv04")}`
        );
        script.appendChild(jsCodeNode);
      } catch (e) {
        script.text = code;
      }
      document.getElementById("mydiv02").appendChild(script);
    },
    _QueryRPGBySearchPager() {
      this.$axios(
        "get",
        `${this.$ports.rpgMap.QueryRPGBySearchPager}?category=${this.category}&firstword=${this.firstword}&search=${this.valName}&pi=${this.current}&ps=${this.showItem}`
      )
        .then(res => {
          // console.log(res);
          this.rpgList = res.data.list;
          this.allpageLists = Math.ceil(res.data.count / 12);
        })
        .catch(error => {
          console.log(error);
        });
    },
    goto: function(index) {
      this.current = index;
      this._QueryRPGBySearchPager();
    },
    firstPage() {
      this.current = 1;
      this._QueryRPGBySearchPager();
    },
    lastPage() {
      this.current = this.allpageLists;
      this._QueryRPGBySearchPager();
    },
    categoryChange(id) {
      this.category = id;
      this.current = 1;
      if (this.isSearch) {
        this.valName = "";
      }
      //console.log(this.firstword);
      // console.log(this.category)
      this._QueryRPGBySearchPager();
    },
    firstWordSearch(word) {
      if (this.firstword == word) {
        this.firstword = "";
      } else {
        this.firstword = word;
      }

      this.current = 1;
      //  console.log(this.firstword);
      // console.log(this.category)
      this._QueryRPGBySearchPager();
    },
    searchBtn() {
      this.current = 1;
      this.firstword = "";
      this.isSearch = false;
      this._QueryRPGBySearchPager();
    },
    modelFixed(val) {
      this.flag = val;
    }
  },
  components: {
    "header-tab": Header,
    "silderbar-tab": Silderbar
  }
};
</script>
    

<style>
[v-cloak] {
  display: none;
}
.rpgMap {
  width: 1080px;
  overflow: hidden;
  zoom: 1;
  margin: 0 auto;
}
.adver-rpg {
  width: 1080px;
  height: 310px;
  margin-top: 17px;
}
.adver-rpg-left {
  width: 542px;
  height: 310px;
  float: left;
  overflow: hidden;
}
.adver-rpg-right {
  width: 526px;
  height: 310px;
  float: right;
}
.adver-rpg-right ul li {
  width: 258px;
  height: 151px;
  float: left;
  margin-right: 10px;
  margin-bottom: 7px;
}
.adver-rpg-right ul li.current {
  margin-right: 0px;
}
.rpgShop {
  width: 100%;
  height: 33px;
  margin: 36px 0px;
}
.rpgShop b {
  float: left;
  width: 200px;
  height: 33px;
  line-height: 33px;
  text-align: left;
  font-size: 18px;
  color: #fff;
  font-weight: normal;
}
.searchRpg input {
  width: 697px;
  line-height: 33px;
  height: 33px;
  float: left;
  text-align: center;
  font-family: "微软雅黑";
  border-radius: 4px;
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
.rpgBtn {
  width: 102px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background-color: #7799c2;
  color: #fff;
  float: left;
  margin-left: 11px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}
.rpgMapList {
  width: 100%;
  overflow: hidden;
  zoom: 1;
}
.noPain {
  width: 137px;
  height: 169px;
  display: block;
  margin: 0 auto;
  margin-top: 100px;
  background: url(../assets/noPain.png);
}
.rpgMapList .rpgMapListHd {
  width: 1080px;
  height: 23px;
  line-height: 23px;
  background-color: #5da0cf;
}
.rpgMapList .rpgMapListHd span {
  width: 100px;
  height: 23px;
  line-height: 23px;
  text-align: center;
  color: #fff;
  float: left;
  font-size: 14px;
  cursor: pointer;
}
.rpgMapList .rpgMapListHd span.current {
  color: #ff3434;
}
.rpgMapListCenter {
  height: 19px;
  line-height: 19px;
  margin: 12px 0px;
}
.rpgMapListCenter span {
  float: left;
  color: #fff;
  height: 19px;
  line-height: 19px;
  margin-right: 25px;
  margin-left: 25px;
}
.rpgMapListCenter em {
  width: 22px;
  height: 19px;
  line-height: 19px;
  text-align: center;
  color: #fff;
  margin: 0 5px;
  float: left;
  font-size: 12px;
  background-color: #929ba2;
  border-radius: 4px;
  cursor: pointer;
}
.rpgMapListCenter em.current {
  background-color: #ff3434;
}
.mapListRpg {
  width: 100%;
  overflow: hidden;
  zoom: 1;
}
.mapListRpg ul {
  overflow: hidden;
  zoom: 1;
}
.mapListRpg ul li {
  width: 253px;
  height: 93px;
  background-color: #fff;
  float: left;
  margin-right: 12px;
  margin-bottom: 12px;
  padding: 15px 0px 0px 8px;
}
.mapListRpg ul li.current {
  margin-right: 0px;
}
.mapListRpg ul li img.imgShow {
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
.enterShop a {
  display: block;
  width: 100%;
  height: 100%;
}
</style>