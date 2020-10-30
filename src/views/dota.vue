<template>
  <div class="dotaContainer">
    <header-tab></header-tab>
    <list-model :nav="'DOTA'" :classid="id" :modelist01="dotaList" v-if="isFlag01 && isFlag02 && isFlag03" :searchlist="searchList" :modelobj="modelObj"></list-model>
    <div class="siderBox" v-bind:class="{'siderBoxCurrent':!flag}">
      <silderbar-tab v-on:FixedModel="modelFixed"></silderbar-tab>
    </div>
  </div>
</template>

<script>
// http://test.shop.5211game.com/query/QueryWebGoodsBySeachFlagPager?classid=6&flag=0&search=10&sort=sale&pi=1&ps=10
import Header from "../components/header";
import Silderbar from "../components/silderbar";
import listModel from "../components/listModel";
export default {
  name: "DOAT",
  data() {
    return {
      flag: false,
      dotaList: [],
      isFlag01:false,
      isFlag02:false,
      isFlag03:false,
      searchList:[],
      modelObj:'',
      id:3
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
    seachFlagPager(){
         this.$axios(
        "get",
        `${
          this.$ports.dota.QueryWebGoodsBySeachFlagPager
        }?classid=${3}&flag=${0}&search=&sort=sale&pi=${1}&ps=${10}`
      )
        .then(res => {
           this.isFlag02=true;
         // console.log(res);
          this.searchList=res.data.list;
         
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
          this.isFlag01=true;
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
    ClassInfoByCid(){
       this.$axios(
        "get",
        `${
          this.$ports.dota.QueryWebClassInfoByCid
        }?classid=${3}`
      )
        .then(res => {
         console.log(res);
          this.isFlag03=true;
          if (res.code == 0) {
            this.modelObj=res.data;
          } else {
           this.modelObj='';
          }
        })
        .catch(error => {
          console.log(error);
        });
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