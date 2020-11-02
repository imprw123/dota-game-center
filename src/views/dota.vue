<template>
  <div class="dotaContainer">
    <header-tab></header-tab>
    <list-model
      :nav="'DOTA'"
      :classid="id"
      :modelist01="dotaList"
      :searchlist="searchList"
      v-if="flag01 && flag02 && flag03"
      :modelobj="modelObj"
      v-bind:pageIndex="pi"
      v-bind:pageSize="ps"
      v-bind:allpage="all"
      v-on:pageIndexChange="changeIndex($event)"
      v-bind:typeTag="typeChange"
      v-on:changeTag="changetagFn"
      v-on:searchDotaPf="dotaPf"
      v-on:changeid="_changeclassid"
    >></list-model>
    <div class="siderBox" v-bind:class="{'siderBoxCurrent':!flag}">
      <silderbar-tab v-on:FixedModel="modelFixed"></silderbar-tab>
    </div>
  </div>
</template>

<script>
import Header from "../components/header";
import Silderbar from "../components/silderbar";
import listModel from "../components/listModel";
export default {
  name: "DOAT",
  data() {
    return {
      flag: false,
      dotaList: [],
      searchList: [],
      modelObj: "",
      flag01: false,
      flag02: false,
      flag03: false,
      id: 3,
      pi: 1,
      ps: 10,
      all: 10,
      typeChange: "weight",
      searchName: "",
      classid:3
    };
  },
  mounted() {
    this.seachFlagPager();
    this.dotaRecomment();
    this.ClassInfoByCid();
  },
  components: {
    "header-tab": Header,
    "list-model": listModel,
    "silderbar-tab": Silderbar
  },
  methods: {
    modelFixed(val) {
      this.flag = val;
    },
    seachFlagPager() {
      this.$axios(
        "get",
        `${
          this.$ports.dota.QueryWebGoodsBySeachFlagPager
        }?classid=${this.classid}&flag=${0}&search=${this.searchName}&sort=${
          this.typeChange
        }&pi=${this.pi}&ps=${this.ps}`
      )
        .then(res => {
          this.flag01 = true;
          console.log(res);
          this.searchList = res.data.list;

          this.all = Math.ceil(res.data.count / 10);
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
          //console.log(res);
          this.flag02 = true;
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
    //商品内容
    ClassInfoByCid() {
      this.$axios(
        "get",
        `${this.$ports.dota.QueryWebClassInfoByCid}?classid=${3}`
      )
        .then(res => {
          // console.log(res);
          this.flag03 = true;
          if (res.code == 0) {
            this.modelObj = res.data;
          } else {
            this.modelObj = "";
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    changeIndex(val) {
      console.log(val);
      this.pi = val;
      this.seachFlagPager();
    },
    changetagFn(val) {
      this.typeChange = val;
      console.log(this.typeChange);
      this.pi = 1;
      this.seachFlagPager();
    },
    dotaPf(val) {
      this.searchName = val;
      this.pi = 1;
      this.seachFlagPager();
    },
    _changeclassid(val){
       this.searchName = '';
      this.pi = 1;
      this.classid=val;
      this.seachFlagPager();
    }
  }
};
</script>

<style>
.dotaContainer {
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
</style>