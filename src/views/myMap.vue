<template>
  <div class="myMap">
    <header-tab></header-tab>
    <div class="nav-tab">
      <span>首页</span>
      <em>></em>
      <span>我的搜藏</span>
    </div>
    <div class="map-title">全部搜藏</div>
    <div class="myMapList" v-if="rpgList.length == 0" v-cloak>
        <span class="noPain"></span>
    </div>
    <div class="myMapList" v-if="rpgList.length>0">
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
    <div class="siderBox" v-bind:class="{'siderBoxCurrent':!flag}">
      <silderbar-tab v-on:FixedModel="modelFixed" ref="mychild"></silderbar-tab>
    </div>
  </div>
</template>

<script >
import Header from "../components/header";
import Silderbar from "../components/silderbar";
export default {
  name: "MYMAP",
  data() {
    return {
      showItem: 16, // 最少显示5个页码
      current: 1, // 当前页码
      rpgList: [],
      allpageLists: "",
       flag: false
    };
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
  mounted() {
    this.collectedMap();
  },
  methods: {
     modelFixed(val) {
      this.flag = val;
    },
    goto: function(index) {
      this.current = index;
      this.collectedMap();
    },
    firstPage() {
      this.current = 1;
      this.collectedMap();
    },
    lastPage() {
      this.current = this.allpageLists;
      this.collectedMap();
    },
    collectedMap() {
      this.$axios(
        "get",
        `${this.$ports.myMap.QueryUserCollectedRPG}?pi=${this.current}&ps=${this.showItem}`
      )
        .then(res => {
         // console.log(res);
          this.rpgList = res.data.list;
          this.allpageLists = Math.ceil(res.data.count / 16);
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
[v-cloak] {
  display: none;
}
.myMap {
  width: 1080px;
  overflow: hidden;
  zoom: 1;
  margin: 0 auto;
}
.map-title {
  width: 1080px;
  height: 38px;
  line-height: 38px;
  background-color: #fff;
  border: 1px solid #d6d6d6;
  text-indent: 40px;
  font-size: 12px;
  color: #3a3f4a;
  font-weight: bold;
  font-family: "微软雅黑";
  margin-bottom: 10px;
}
.myMapList {
  width: 1080px;
  overflow: hidden;
  zoom: 1;
}
.myMapList .noPain{
   width:137px;
  height: 169px;
  display:block;
  margin: 0 auto;
  margin-top:100px;
  background: url(../assets/noPain.png);
}
.myMapList ul li {
  width: 251px;
  height: 93px;
  background-color: #fff;
  float: left;
  padding: 15px 0px 0px 8px;
  margin: 0 auto;
  border: 1px solid #ebebeb;
  margin-bottom: 10px;
  margin-right: 12px;
}
.myMapList ul li.current {
  margin-right: 0px;
}
.myMapList ul li img.imgShow {
  width: 127px;
  height: 79px;
  display: block;
  float: left;
}
</style>