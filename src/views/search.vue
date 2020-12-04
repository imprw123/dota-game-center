<template>
  <div class="dotaContainer">
    <header-tab></header-tab>
    <list-model
      :nav="'搜索'"
      :classid="classid"
      :modelist01="dotaList"
      :searchlist="searchList"
      v-if="flag01"
      :modelobj="modelObj"
      v-bind:pageIndex="pi"
      v-bind:pageSize="ps"
      v-bind:allpage="all"
      v-bind:typeTag="typeChange"
      v-on:childrenFn="childrenFnMethods"
           v-on:parentFind="childrenHand2"
    >></list-model>
    <div class="siderBox" v-bind:class="{'siderBoxCurrent':!flag}">
      <silderbar-tab v-on:FixedModel="modelFixed" ref="mychild"></silderbar-tab>
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
      modelObj: null,
      flag01: false,
      flag02: false,
      flag03: false,
      pi: 1,
      ps: 10,
      all: 10,
      flagid: 0,
      typeChange: "weight",
      searchName: this.$route.query.searchName,
      classid: 0
    };
  },
  watch: {
     $route: {
      handler(newValue, oldValue) {
          console.log('aa');
        this.searchName = newValue.query.searchName;
        this.seachFlagPager();
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.seachFlagPager();
    // this.dotaRecomment();
    // this.ClassInfoByCid();
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
        `${this.$ports.dota.QueryWebGoodsBySeachFlagPager}?classid=${this.classid}&flag=${this.flagid}&search=${this.searchName}&sort=${this.typeChange}&pi=${this.pi}&ps=${this.ps}`
      )
        .then(res => {
          this.flag01 = true;
         // console.log(res);
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
        `${this.$ports.home.QueryWebGoodsByFlagTopN}?classid=${
          this.classid
        }&flag=${4}&topN=${5}`
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
        `${this.$ports.dota.QueryWebClassInfoByCid}?classid=${this.classid}`
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
    childrenFnMethods(val1, val2, val3, val4, val5) {
      this.classid = val1;
      this.flagid = val2;
      this.searchName = val3;
      this.typeChange = val4;
      this.pi = val5;
      this.seachFlagPager();
    },
     childrenHand2() {
      this.$refs.mychild.parentHandleclick();
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