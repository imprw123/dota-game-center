<template>
  <div class="listModelContainer">
    <div class="nav-tab">
      <span>首页</span>
      <em>></em>
      <span>{{navname}}</span>
    </div>
    <div class="detailInfor" v-if="modelobjContainer != null && modelobjContainer.IsShow">
      <div class="detail-img">
        <img v-lazy="modelobjContainer.Class_imgPath" alt />
      </div>
      <div class="indetail-infor">
        <div class="detail-name">
          <span>{{modelobjContainer.Class_name}}</span>
          <div class="scGame" v-if="rpg == 'RPG'" @click="AddCollectedRPG(modelobjContainer.Class_id)" v-show="modelobjContainer.IsCollected == 0"></div>
      <div class="ysc" v-if="rpg == 'RPG'" @click="RemoveCollectedRPG(modelobjContainer.Class_id)" v-show="modelobjContainer.IsCollected != 0"></div>
        </div>
        <div class="quanBox">
          <!--  <em class="quan">满100-10</em>
          <em class="quan">满200八折</em> -->
        </div>
        <div class="detailtypeName">
          <span v-if="modelobjContainer.Class_category">{{modelobjContainer.Class_category}}</span>
        </div>
        <div class="num-infor">
          <span>{{`普通商品(${commonShopCount})`}}</span>
          <span v-if="msg"> {{`定制商品(${orderShopCount})`}}</span>
        </div>
      </div>
      
      <a class="jryx" href="qfyygame:///type=enter_game_channel/?channelId=ID1" v-if="this.$route.name == 'DOTA'"></a>
      <a class="jryx" href="qfyygame:///type=enter_game_channel/?channelId=ID6" v-if="this.$route.name == 'IMBA'"></a>
       <a class="jryx" v-bind:href="modelobjContainer.Agreement" v-if="this.$route.name == 'RPG'"></a>
    </div>
    <!-- 热门推荐 -->
    <div class="dota" v-if="modelobjContainer != null && modellistContainer.length>0">
      <h1>
        <em v-text="modelobjContainer != null && !modelobjContainer.IsRPG  == true?'热门推荐':'新手推荐'"></em>
      </h1>
      <ul class="model01">
        <li
          v-if=" modellistContainer != null"
          v-for="(item,index) in modellistContainer"
          :key="index"
          v-bind:class="index == 4 ?'current':''"
        >
          <model-div :item="item" v-on:parentHand="childrenHand"></model-div>
        </li>
      </ul>
    </div>
    <!-- 热门推荐 -->

    <!-- tab页签 -->
    <div class="tab-change-model">
      <div
        class="tabBox"
        v-if="msg"
        v-bind:class="{'tabBoxCurrent01':shopFlag == 0,'tabBoxCurrent02':shopFlag == 128}"
      >
        <span @click="isCustomShop('普通商品')" v-bind:class="{'current01':shopFlag == 0}">普通商品</span>
        <span @click="isCustomShop('定制商品')" v-bind:class="{'current02':shopFlag == 128}">定制商品</span>
      </div>
      <div class="tabBox"  v-bind:class="{'tabBoxCurrent01':ptid01 == 1,'tabBoxCurrent02':ptid02 == 5}" v-if="name == 'PT'">
          <span @click="isCustomShop2('平台服务')" v-bind:class="{'current01':ptid01 == 1}">平台服务</span>
          <span @click="isCustomShop2('游戏道具')" v-bind:class="{'current01':ptid02 == 5}">游戏道具</span>
      </div>
      <div
        class="in-tab-change-model"
        v-if="modelobjContainer != null && modelobjContainer.Class_GoodsInfo != null && modelobjContainer.Class_GoodsInfo.length>0  "
      >
        <span
          v-if="modelobjContainer.Class_GoodsInfo != null"
          v-for=" (item,index) in modelobjContainer.Class_GoodsInfo"
          :key="index"
          v-bind:class="{'current':item.Class_id == id}"
          @click="changeClassId(item.Class_id)"
        >
          <i>{{item.Class_name}}</i>
          <em>{{`(${item.Goods_count})`}}</em>
        </span>
      </div>
      <div class="action-search">
        <div class="action-search-left" v-if="this.id != 69">
          <div class="inpt-search">
            <input type="text" placeholder="请填写搜索内容……" v-model="val" />
            <div class="sou" v-on:click="searchlistInpt"></div>
          </div>
        </div>
        <div class="action-search-left" v-if="this.id == 69">
          <!--力量 -->
          <div class="userAction">
            <p>力量</p>
            <div class="boxHero boxHeroLl">
              <div class="in_boxHero" style="display: none;">
                <ul id="liliang">
                  <li data-id="大地之灵">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="孽主">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="亚巴顿">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="军团指挥官">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="凤凰">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="上古巨神">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="钢背兽">
                    <em></em>
                  </li>
                  <li data-id="巨牙海民">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="伐木机">
                    <em></em>
                  </li>
                  <li data-id="马格纳斯">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="不朽尸王">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="混沌骑士">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="狼人">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="裂魂人">
                    <em></em>
                  </li>
                  <li data-id="末日使者">
                    <em></em>
                  </li>
                  <li data-id="暗夜魔王">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="噬魂鬼">
                    <em></em>
                  </li>
                  <li data-id="半人马战行者">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="艾欧">
                    <em></em>
                  </li>
                  <li data-id="树精卫士">
                    <em></em>
                  </li>
                  <li data-id="酒仙">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="炼金术师">
                    <em></em>
                  </li>
                  <li data-id="哈斯卡">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="全能骑士">
                    <em></em>
                  </li>
                  <li data-id="发条技师">
                    <em></em>
                  </li>
                  <li data-id="龙骑士">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="兽王">
                    <em></em>
                  </li>
                  <li data-id="昆卡">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="冥魂大帝">
                    <em></em>
                  </li>
                  <li data-id="潮汐猎人">
                    <em></em>
                  </li>
                  <li data-id="斯拉达">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="小小">
                    <em></em>
                  </li>
                  <li data-id="斯温">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="撼地者">
                    <em></em>
                  </li>
                  <li data-id="沙王">
                    <em></em>
                  </li>
                  <li data-id="帕吉">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="斧王">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="玛尔斯">
                    <em style="display: block;"></em>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- 力量 -->
          <!-- 敏捷 -->
          <div class="userAction">
            <p>敏捷</p>
            <div class="boxHero boxHeroMJ">
              <div class="in_boxHero" style="display: none;">
                <ul id="minjie">
                  <li data-id="恐怖利刃">
                    <em></em>
                  </li>
                  <li data-id="天穹守望者">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="灰烬之灵">
                    <em></em>
                  </li>
                  <li data-id="巨魔战将">
                    <em></em>
                  </li>
                  <li data-id="美杜莎">
                    <em></em>
                  </li>
                  <li data-id="赏金猎人">
                    <em></em>
                  </li>
                  <li data-id="复仇之魂">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="熊战士">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="圣堂刺客">
                    <em></em>
                  </li>
                  <li data-id="卓尔游侠">
                    <em></em>
                  </li>
                  <li data-id="矮人直升机">
                    <em></em>
                  </li>
                  <li data-id="力丸">
                    <em></em>
                  </li>
                  <li data-id="米拉娜">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="幻影长矛手">
                    <em></em>
                  </li>
                  <li data-id="娜迦海妖">
                    <em></em>
                  </li>
                  <li data-id="变体精灵">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="露娜">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="德鲁伊">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="主宰">
                    <em></em>
                  </li>
                  <li data-id="虚空假面">
                    <em></em>
                  </li>
                  <li data-id="斯拉克">
                    <em></em>
                  </li>
                  <li data-id="冥界亚龙">
                    <em></em>
                  </li>
                  <li data-id="剃刀">
                    <em></em>
                  </li>
                  <li data-id="米波">
                    <em></em>
                  </li>
                  <li data-id="剧毒术士">
                    <em></em>
                  </li>
                  <li data-id="幽鬼">
                    <em></em>
                  </li>
                  <li data-id="影魔">
                    <em></em>
                  </li>
                  <li data-id="幻影刺客">
                    <em></em>
                  </li>
                  <li data-id="编织者">
                    <em></em>
                  </li>
                  <li data-id="司夜刺客">
                    <em></em>
                  </li>
                  <li data-id="育母蜘蛛">
                    <em></em>
                  </li>
                  <li data-id="克林克兹">
                    <em></em>
                  </li>
                  <li data-id="嗜血狂魔">
                    <em></em>
                  </li>
                  <li data-id="狙击手">
                    <em></em>
                  </li>
                  <li data-id="敌法师">
                    <em></em>
                  </li>
                  <li data-id="齐天大圣">
                    <em></em>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- 敏捷 -->
          <!-- 智力 -->
          <div class="userAction">
            <p style="color:#ff7800;">智力</p>
            <div class="boxHero">
              <div class="in_boxHero" style="display: none;">
                <ul id="zhili">
                  <li data-id="神谕者">
                    <em></em>
                  </li>
                  <li data-id="寒冬飞龙">
                    <em></em>
                  </li>
                  <li data-id="工程师">
                    <em></em>
                  </li>
                  <li data-id="天怒法师">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="双头龙">
                    <em></em>
                  </li>
                  <li data-id="魅惑魔女">
                    <em></em>
                  </li>
                  <li data-id="先知">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="维萨吉">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="修补匠">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="暗影恶魔">
                    <em></em>
                  </li>
                  <li data-id="暗影萨满">
                    <em style="display: block;"></em>
                  </li>
                  <li data-id="食人魔魔法师">
                    <em></em>
                  </li>
                  <li data-id="沉默术士">
                    <em></em>
                  </li>
                  <li data-id="祈求者">
                    <em></em>
                  </li>
                  <li data-id="陈">
                    <em></em>
                  </li>
                  <li data-id="光之守卫">
                    <em></em>
                  </li>
                  <li data-id="干扰者">
                    <em></em>
                  </li>
                  <li data-id="拉比克">
                    <em></em>
                  </li>
                  <li data-id="黑暗贤者">
                    <em></em>
                  </li>
                  <li data-id="殁境神蚀者">
                    <em></em>
                  </li>
                  <li data-id="拉席克">
                    <em></em>
                  </li>
                  <li data-id="蝙蝠骑士">
                    <em></em>
                  </li>
                  <li data-id="远古冰魄">
                    <em></em>
                  </li>
                  <li data-id="戴泽">
                    <em></em>
                  </li>
                  <li data-id="莉娜">
                    <em></em>
                  </li>
                  <li data-id="宙斯">
                    <em></em>
                  </li>
                  <li data-id="风行者">
                    <em></em>
                  </li>
                  <li data-id="风暴之灵">
                    <em></em>
                  </li>
                  <li data-id="帕克">
                    <em></em>
                  </li>
                  <li data-id="帕格纳">
                    <em></em>
                  </li>
                  <li data-id="水晶室女">
                    <em></em>
                  </li>
                  <li data-id="死亡先知">
                    <em></em>
                  </li>
                  <li data-id="痛苦女王">
                    <em></em>
                  </li>
                  <li data-id="·术士">
                    <em></em>
                  </li>
                  <li data-id="瘟疫法师">
                    <em></em>
                  </li>
                  <li data-id="谜团">
                    <em></em>
                  </li>
                  <li data-id="巫医">
                    <em></em>
                  </li>
                  <li data-id="莱恩">
                    <em></em>
                  </li>
                  <li data-id="巫妖">
                    <em></em>
                  </li>
                  <li data-id="祸乱之源">
                    <em></em>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- 智力 -->
        </div>
        <div class="action-search-right">
          <span
            class="weightChange"
            v-bind:class="{'current':typeTagStr == 'weight'}"
            @click="typeTagchangeBtn('综合')"
          >
            综合
            <i v-bind:class="{'current':typeTagStr == 'weight'}"></i>
          </span>
          <span
            class="Sales"
            v-bind:class="{'current':typeTagStr == 'sale'}"
            @click="typeTagchangeBtn('销量')"
          >
            销量
            <i v-bind:class="{'current':typeTagStr == 'sale'}"></i>
          </span>
          <span
            class="price"
            @click="typeTagchangeBtn('价格')"
            v-bind:class="{'current':typeTagStr == 'priceup' || typeTagStr == 'pricedown' }"
          >
            价格
            <i
              v-bind:class="{'currentUp':typeTagStr == 'priceup','currentDown':typeTagStr == 'pricedown'}"
            ></i>
          </span>
          <span
            class="shelves"
            v-bind:class="{'current':typeTagStr == 'uptime'}"
            @click="typeTagchangeBtn('上架时间')"
          >
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
            <model-div :item="item" v-on:parentHand="childrenHand"></model-div>
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
      default: () => []
    },
    searchlist: {
      type: Array,
      default: () => []
    },
    modelobj: {
      type: Object,
      default: () => null
    },
    classid: {
      type: Number | String,
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
      id: "",
      typeTagStr: this.typeTag,
      msg: false,
      current: "", // 当前页码
      showItem: this.pageSize, // 最少显示5个页码
      allpageLists: "", // 总共的
      shopFlag: 0,
      val: "",
      pages: [],
      commonShopCount:0,
      orderShopCount:0,
      name:this.$route.name,
      ptid01:1,
      ptid02:'',
      rpg:this.$route.name,
    };
  },
  watch: {
    classid: {
      handler(newValue, oldValue) {
        this.id = newValue;
      },
      immediate: true,
      deep: true
    },
    pageIndex: {
      handler(newValue, oldValue) {
        console.log(newValue);
        this.current = newValue;
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
        this.pages = pag;
      },
      immediate: true,
      deep: true
    },
    searchlist: {
      handler(newValue, oldValue) {
        console.log(newValue);
        this.searchlistContainer = newValue;
      },
      immediate: true,
      deep: true
    },
    $route(){
      this.val= this.$route.query.searchName
    },
    modelist01: {
      handler(newValue, oldValue) {
         console.log('李玉林');
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
    },
    allpage: {
      handler(newValue, oldValue) {
        var pag = [];
        this.allpageLists = newValue;
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
        this.pages = pag;
      },
      immediate: true,
      deep: true
    }
  },

  mounted() {
    if(this.$route.query.searchName){
       this.val=decodeURI(this.$route.query.searchName);
    }else{
      this.val='';
    }
    var _that = this;
    if (this.modelobjContainer) {
      this.modelobjContainer.Class_GoodsCount.forEach(function(obj, index) {
        if (obj.Flag == 128) {
          _that.msg = true;
           _that.orderShopCount=obj.Count;
        } else {
          _that.msg = false;
          _that.commonShopCount=obj.Count;
        }
      });
    }
    var _that = this;
    $(document).on("mouseenter", ".boxHero", function() {
      $(this)
        .children(".in_boxHero")
        .css("display", "block");
    });

    $(document).on("mouseleave", ".boxHero", function() {
      $(this)
        .children(".in_boxHero")
        .css("display", "none");
    });
    $(document).on("mouseenter", ".in_boxHero ul li", function() {
      $(this)
        .children("em")
        .css("display", "none");
    });

    $(document).on("mouseleave", ".in_boxHero ul li", function() {
      $(this)
        .children("em")
        .css("display", "block");
    });

    $(document).on("click", ".in_boxHero ul li", function() {
      _that.$emit(
        "childrenFn",
        _that.id,
        _that.shopFlag,
        $(this).attr("data-id"),
        _that.typeTagStr,
        1
      );
    });
  },
  methods: {
    goto: function(index) {
      this.current = index;
      this.$emit(
        "childrenFn",
        this.id,
        this.shopFlag,
        escape(this.val),
        this.typeTagStr,
        index
      );
    },
    firstPage() {
      this.current = 1;
      this.$emit(
        "childrenFn",
        this.id,
        this.shopFlag,
        escape(this.val),
        this.typeTagStr,
        1
      );
    },
    lastPage() {
      this.current = this.allpageLists;
      this.$emit(
        "childrenFn",
        this.id,
        this.shopFlag,
        escape(this.val),
        this.typeTagStr,
        this.current
      );
    },
    typeTagchangeBtn(name) {
      if (name == "综合") {
        this.typeTagStr = "weight";
        this.$emit(
          "childrenFn",
          this.id,
          this.shopFlag,
          escape(this.val),
          this.typeTagStr,
          this.current
        );
      } else if (name == "销量") {
        console.log("aa");
        this.typeTagStr = "sale";
        console.log(this.typeTagStr);
        this.$emit(
          "childrenFn",
          this.id,
          this.shopFlag,
          escape(this.val),
          this.typeTagStr,
          this.current
        );
      } else if (name == "价格") {
        if (this.typeTagStr != "priceup" && this.typeTagStr != "pricedown") {
          this.typeTagStr = "priceup";
          this.$emit(
            "childrenFn",
            this.id,
            this.shopFlag,
            escape(this.val),
            this.typeTagStr,
            this.current
          );
        } else if (this.typeTagStr == "priceup") {
          this.typeTagStr = "pricedown";
          this.$emit(
            "childrenFn",
            this.id,
            this.shopFlag,
            escape(this.val),
            this.typeTagStr,
            this.current
          );
        } else if (this.typeTagStr == "pricedown") {
          this.typeTagStr = "priceup";
          this.$emit(
            "childrenFn",
            this.id,
            this.shopFlag,
            escape(this.val),
            this.typeTagStr,
            this.current
          );
        }
      } else if (name == "上架时间") {
        this.typeTagStr = "uptime";
        this.$emit(
          "childrenFn",
          this.id,
          this.shopFlag,
          escape(this.val),
          this.typeTagStr,
          this.current
        );
      }
    },
    searchlistInpt() {
      this.$emit(
        "childrenFn",
        this.id,
        this.shopFlag,
        escape(this.val),
        this.typeTagStr,
        1
      );
    },
    changeClassId(val) {
      this.id = val;
      this.$emit(
        "childrenFn",
        this.id,
        this.shopFlag,
        escape(this.val),
        this.typeTagStr,
        1
      );
    },
    isCustomShop(val) {
      if (val == "定制商品") {
        this.shopFlag = 128;
        this.$emit(
          "childrenFn",
          this.id,
          this.shopFlag,
          escape(this.val),
          this.typeTagStr,
          1
        );
      } else if (val == "普通商品") {
        this.shopFlag = 0;
        this.$emit(
          "childrenFn",
          this.id,
          this.shopFlag,
          escape(this.val),
          this.typeTagStr,
          1
        );
      }
    },
       isCustomShop2(val) {
      if (val == "平台服务") {
        this.id = 1;
        this.ptid01=1;
        this.ptid02='';
        this.$emit(
          "childrenFn",
          this.id,
          this.shopFlag,
          escape(this.val),
          this.typeTagStr,
          1
        );
      } else if (val == "游戏道具") {
        this.id = 5;
        this.ptid02=5;
        this.$emit(
          "childrenFn",
          this.id,
          this.shopFlag,
          escape(this.val),
          this.typeTagStr,
          1
        );
      }
    },
    childrenHand(){
       this.$emit('parentFind')
    },
    AddCollectedRPG(val){
        this.$axios(
        "get",
        `${this.$ports.myMap.AddCollectedRPG}?classId=${val}`
      )
        .then(res => {
         // console.log('李玉林2')
          console.log(res);
          this.$emit('AddCollected');
          this.$emit('changeCollected')
        })
        .catch(error => {});
    },
    RemoveCollectedRPG(val){
        this.$axios(
        "get",
        `${this.$ports.myMap.RemoveCollectedRPG}?classId=${val}`
      )
        .then(res => {
          console.log(res); 
           this.$emit('AddCollected');
         this.$emit('changeCollected')
        })
        .catch(error => {});
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
  min-height: 960px;
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
 height:25px;
}
.quanBox{
  height:20px;
  width:100%;
  margin:5px 0px 10px 0px;
}
.detail-name span {
  color: #000;
  font-size: 14px;
  float:left;
}
 em.quan {
  font-size: 12px;
  background-color: #fbdcc7;
  display: inline-block;
  text-align: center;
  border: 1px solid #f74a4a;
  color: #f74a4a;
  font-family: "微软雅黑";
  padding: 0px 2px;
  border-radius: 1px;
  margin-right: 10px;
}
.detailtypeName {
  width: 100%;
  overflow: hidden;
  zoom: 1;
  margin-bottom:15px;
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
  width: 49px;
  height: 15px;
  background: url(../assets/sc.png);
  float:left;
  margin-left:10px;
  position:relative;
  top:2px;
  cursor:pointer;
}
.ysc {
  width: 49px;
  height: 15px;
  float:left;
  margin-left:10px;
  position:relative;
  top:2px;
  cursor:pointer;
  background: url(../assets/ysc.png);
}
.scGame:hover {
  background: url(../assets/sc-hover.png);
  transition: 0.2s;
}
.jryx {
  width: 134px;
  height: 33px;
  background: url(../assets/jryx.png);
  position: absolute;
  top: 72px;
  right: 20px;
  cursor: pointer;
}
.jryx:hover {
  background: url(../assets/jryx-hover.png);
  transition: 0.2s;
}
.tab-change-model {
  width: 1080px;
  min-height: 120px;
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
  cursor: pointer;
}
.in-tab-change-model span.current {
  color: #ff3434;
}
.action-search {
  width: 100%;
  height: 40px;
  margin-bottom: 15px;
}
.action-search-left {
  width: 640px;
  height: 30px;
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
  cursor: pointer;
}
.tabBoxCurrent01 {
  background: url(../assets/tagbg01.png);
}
.tabBox span.current01 {
  color: #fff;
}
.tabBoxCurrent02 {
  background: url(../assets/tagbg02.png);
}
.tabBox span.current02 {
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
  padding: 0px 8px;
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
.userAction {
  width: 192px;
  text-align: center;
  float: left;
  height: 30px;
  margin-right: 10px;
}

.userAction p {
  text-align: center;
  font-size: 14px;
  font-family: 微软雅黑;
  float: left;
  height: 30px;
  line-height: 30px;
  margin-right: 5px;
}

.boxHero {
  width: 150px;
  height: 30px;
  background: url(../assets/Zhili.jpg);
  position: relative;
  z-index: 100;
  float: left;
}

.boxHeroMJ {
  width: 150px;
  height: 30px;
  background: url(../assets/Minjie.jpg);
  position: relative;
  z-index: 100;
}

.boxHeroLl {
  width: 150px;
  height: 30px;
  background: url(../assets/Liliang.jpg);
  position: relative;
  z-index: 100;
}

.in_boxHero {
  width: 150px;
  height: 240px;
  position: absolute;
  top: 0px;
  left: 50%;
  margin-left: -75px;
  z-index: 1;
  display: none;
}

.in_boxHero ul li {
  width: 30px;
  height: 30px;
  float: left;
  background: #ccc;
  cursor: pointer;
}

.in_boxHero ul li em {
  width: 30px;
  height: 30px;
  background: rgba(0, 0, 0, 0.5);
  display: block;
}
/*智力*/
#zhili li:nth-child(1) {
  background: url(../assets/bigZhili.png);
  background-position: 0px 0px;
}

#zhili li:nth-child(2) {
  background: url(../assets/bigZhili.png);
  background-position: -30px 0px;
}

#zhili li:nth-child(3) {
  background: url(../assets/bigZhili.png);
  background-position: -60px 0px;
}

#zhili li:nth-child(4) {
  background: url(../assets/bigZhili.png);
  background-position: -90px 0px;
}

#zhili li:nth-child(5) {
  background: url(../assets/bigZhili.png);
  background-position: -120px 0px;
}

#zhili li:nth-child(6) {
  background: url(../assets/bigZhili.png);
  background-position: 0px -30px;
}

#zhili li:nth-child(7) {
  background: url(../assets/bigZhili.png);
  background-position: -30px -30px;
}

#zhili li:nth-child(8) {
  background: url(../assets/bigZhili.png);
  background-position: -60px -30px;
}

#zhili li:nth-child(9) {
  background: url(../assets/bigZhili.png);
  background-position: -90px -30px;
}

#zhili li:nth-child(10) {
  background: url(../assets/bigZhili.png);
  background-position: -120px -30px;
}

#zhili li:nth-child(11) {
  background: url(../assets/bigZhili.png);
  background-position: 0px -60px;
}

#zhili li:nth-child(12) {
  background: url(../assets/bigZhili.png);
  background-position: -30px -60px;
}

#zhili li:nth-child(13) {
  background: url(../assets/bigZhili.png);
  background-position: -60px -60px;
}

#zhili li:nth-child(14) {
  background: url(../assets/bigZhili.png);
  background-position: -90px -60px;
}

#zhili li:nth-child(15) {
  background: url(../assets/bigZhili.png);
  background-position: -120px -60px;
}

#zhili li:nth-child(16) {
  background: url(../assets/bigZhili.png);
  background-position: 0px -90px;
}

#zhili li:nth-child(17) {
  background: url(../assets/bigZhili.png);
  background-position: -30px -90px;
}

#zhili li:nth-child(18) {
  background: url(../assets/bigZhili.png);
  background-position: -60px -90px;
}

#zhili li:nth-child(19) {
  background: url(../assets/bigZhili.png);
  background-position: -90px -90px;
}

#zhili li:nth-child(20) {
  background: url(../assets/bigZhili.png);
  background-position: -120px -90px;
}

#zhili li:nth-child(21) {
  background: url(../assets/bigZhili.png);
  background-position: 0px -120px;
}

#zhili li:nth-child(22) {
  background: url(../assets/bigZhili.png);
  background-position: -30px -120px;
}

#zhili li:nth-child(23) {
  background: url(../assets/bigZhili.png);
  background-position: -60px -120px;
}

#zhili li:nth-child(24) {
  background: url(../assets/bigZhili.png);
  background-position: -90px -120px;
}

#zhili li:nth-child(25) {
  background: url(../assets/bigZhili.png);
  background-position: -120px -120px;
}

#zhili li:nth-child(26) {
  background: url(../assets/bigZhili.png);
  background-position: 0px -150px;
}

#zhili li:nth-child(27) {
  background: url(../assets/bigZhili.png);
  background-position: -30px -150px;
}

#zhili li:nth-child(28) {
  background: url(../assets/bigZhili.png);
  background-position: -60px -150px;
}

#zhili li:nth-child(29) {
  background: url(../assets/bigZhili.png);
  background-position: -90px -150px;
}

#zhili li:nth-child(30) {
  background: url(../assets/bigZhili.png);
  background-position: -120px -150px;
}

#zhili li:nth-child(31) {
  background: url(../assets/bigZhili.png);
  background-position: 0px -180px;
}

#zhili li:nth-child(32) {
  background: url(../assets/bigZhili.png);
  background-position: -30px -180px;
}

#zhili li:nth-child(33) {
  background: url(../assets/bigZhili.png);
  background-position: -60px -180px;
}

#zhili li:nth-child(34) {
  background: url(../assets/bigZhili.png);
  background-position: -90px -180px;
}

#zhili li:nth-child(35) {
  background: url(../assets/bigZhili.png);
  background-position: -120px -180px;
}

#zhili li:nth-child(36) {
  background: url(../assets/bigZhili.png);
  background-position: 0px -210px;
}

#zhili li:nth-child(37) {
  background: url(../assets/bigZhili.png);
  background-position: -30px -210px;
}

#zhili li:nth-child(38) {
  background: url(../assets/bigZhili.png);
  background-position: -60px -210px;
}

#zhili li:nth-child(39) {
  background: url(../assets/bigZhili.png);
  background-position: -90px -210px;
}

#zhili li:nth-child(40) {
  background: url(../assets/bigZhili.png);
  background-position: -120px -210px;
}

/*智力*/

/*力量*/
#liliang li:nth-child(1) {
  background: url(../assets/bigLiliang.png);
  background-position: 0px 0px;
}

#liliang li:nth-child(2) {
  background: url(../assets/bigLiliang.png);
  background-position: -30px 0px;
}

#liliang li:nth-child(3) {
  background: url(../assets/bigLiliang.png);
  background-position: -60px 0px;
}

#liliang li:nth-child(4) {
  background: url(../assets/bigLiliang.png);
  background-position: -90px 0px;
}

#liliang li:nth-child(5) {
  background: url(../assets/bigLiliang.png);
  background-position: -120px 0px;
}

#liliang li:nth-child(6) {
  background: url(../assets/bigLiliang.png);
  background-position: 0px -30px;
}

#liliang li:nth-child(7) {
  background: url(../assets/bigLiliang.png);
  background-position: -30px -30px;
}

#liliang li:nth-child(8) {
  background: url(../assets/bigLiliang.png);
  background-position: -60px -30px;
}

#liliang li:nth-child(9) {
  background: url(../assets/bigLiliang.png);
  background-position: -90px -30px;
}

#liliang li:nth-child(10) {
  background: url(../assets/bigLiliang.png);
  background-position: -120px -30px;
}

#liliang li:nth-child(11) {
  background: url(../assets/bigLiliang.png);
  background-position: 0px -60px;
}

#liliang li:nth-child(12) {
  background: url(../assets/bigLiliang.png);
  background-position: -30px -60px;
}

#liliang li:nth-child(13) {
  background: url(../assets/bigLiliang.png);
  background-position: -60px -60px;
}

#liliang li:nth-child(14) {
  background: url(../assets/bigLiliang.png);
  background-position: -90px -60px;
}

#liliang li:nth-child(15) {
  background: url(../assets/bigLiliang.png);
  background-position: -120px -60px;
}

#liliang li:nth-child(16) {
  background: url(../assets/bigLiliang.png);
  background-position: 0px -90px;
}

#liliang li:nth-child(17) {
  background: url(../assets/bigLiliang.png);
  background-position: -30px -90px;
}

#liliang li:nth-child(18) {
  background: url(../assets/bigLiliang.png);
  background-position: -60px -90px;
}

#liliang li:nth-child(19) {
  background: url(../assets/bigLiliang.png);
  background-position: -90px -90px;
}

#liliang li:nth-child(20) {
  background: url(../assets/bigLiliang.png);
  background-position: -120px -90px;
}

#liliang li:nth-child(21) {
  background: url(../assets/bigLiliang.png);
  background-position: 0px -120px;
}

#liliang li:nth-child(22) {
  background: url(../assets/bigLiliang.png);
  background-position: -30px -120px;
}

#liliang li:nth-child(23) {
  background: url(../assets/bigLiliang.png);
  background-position: -60px -120px;
}

#liliang li:nth-child(24) {
  background: url(../assets/bigLiliang.png);
  background-position: -90px -120px;
}

#liliang li:nth-child(25) {
  background: url(../assets/bigLiliang.png);
  background-position: -120px -120px;
}

#liliang li:nth-child(26) {
  background: url(../assets/bigLiliang.png);
  background-position: 0px -150px;
}

#liliang li:nth-child(27) {
  background: url(../assets/bigLiliang.png);
  background-position: -30px -150px;
}

#liliang li:nth-child(28) {
  background: url(../assets/bigLiliang.png);
  background-position: -60px -150px;
}

#liliang li:nth-child(29) {
  background: url(../assets/bigLiliang.png);
  background-position: -90px -150px;
}

#liliang li:nth-child(30) {
  background: url(../assets/bigLiliang.png);
  background-position: -120px -150px;
}

#liliang li:nth-child(31) {
  background: url(../assets/bigLiliang.png);
  background-position: 0px -180px;
}

#liliang li:nth-child(32) {
  background: url(../assets/bigLiliang.png);
  background-position: -30px -180px;
}

#liliang li:nth-child(33) {
  background: url(../assets/bigLiliang.png);
  background-position: -60px -180px;
}

#liliang li:nth-child(34) {
  background: url(../assets/bigLiliang.png);
  background-position: -90px -180px;
}

#liliang li:nth-child(35) {
  background: url(../assets/bigLiliang.png);
  background-position: -120px -180px;
}

#liliang li:nth-child(36) {
  background: url(../assets/bigLiliang.png);
  background-position: 0px -210px;
}

#liliang li:nth-child(37) {
  background: url(../assets/bigLiliang.png);
  background-position: -30px -210px;
}

#liliang li:nth-child(38) {
  background: url(../assets/bigLiliang.png);
  background-position: -60px -210px;
}
/*力量*/

/*敏捷*/
#minjie li:nth-child(1) {
  background: url(../assets/bigMinjie.png);
  background-position: 0px 0px;
}

#minjie li:nth-child(2) {
  background: url(../assets/bigMinjie.png);
  background-position: -30px 0px;
}

#minjie li:nth-child(3) {
  background: url(../assets/bigMinjie.png);
  background-position: -60px 0px;
}

#minjie li:nth-child(4) {
  background: url(../assets/bigMinjie.png);
  background-position: -90px 0px;
}

#minjie li:nth-child(5) {
  background: url(../assets/bigMinjie.png);
  background-position: -120px 0px;
}

#minjie li:nth-child(6) {
  background: url(../assets/bigMinjie.png);
  background-position: 0px -30px;
}

#minjie li:nth-child(7) {
  background: url(../assets/bigMinjie.png);
  background-position: -30px -30px;
}

#minjie li:nth-child(8) {
  background: url(../assets/bigMinjie.png);
  background-position: -60px -30px;
}

#minjie li:nth-child(9) {
  background: url(../assets/bigMinjie.png);
  background-position: -90px -30px;
}

#minjie li:nth-child(10) {
  background: url(../assets/bigMinjie.png);
  background-position: -120px -30px;
}

#minjie li:nth-child(11) {
  background: url(../assets/bigMinjie.png);
  background-position: 0px -60px;
}

#minjie li:nth-child(12) {
  background: url(../assets/bigMinjie.png);
  background-position: -30px -60px;
}

#minjie li:nth-child(13) {
  background: url(../assets/bigMinjie.png);
  background-position: -60px -60px;
}

#minjie li:nth-child(14) {
  background: url(../assets/bigMinjie.png);
  background-position: -90px -60px;
}

#minjie li:nth-child(15) {
  background: url(../assets/bigMinjie.png);
  background-position: -120px -60px;
}

#minjie li:nth-child(16) {
  background: url(../assets/bigMinjie.png);
  background-position: 0px -90px;
}

#minjie li:nth-child(17) {
  background: url(../assets/bigMinjie.png);
  background-position: -30px -90px;
}

#minjie li:nth-child(18) {
  background: url(../assets/bigMinjie.png);
  background-position: -60px -90px;
}

#minjie li:nth-child(19) {
  background: url(../assets/bigMinjie.png);
  background-position: -90px -90px;
}

#minjie li:nth-child(20) {
  background: url(../assets/bigMinjie.png);
  background-position: -120px -90px;
}

#minjie li:nth-child(21) {
  background: url(../assets/bigMinjie.png);
  background-position: 0px -120px;
}

#minjie li:nth-child(22) {
  background: url(../assets/bigMinjie.png);
  background-position: -30px -120px;
}

#minjie li:nth-child(23) {
  background: url(../assets/bigMinjie.png);
  background-position: -60px -120px;
}

#minjie li:nth-child(24) {
  background: url(../assets/bigMinjie.png);
  background-position: -90px -120px;
}

#minjie li:nth-child(25) {
  background: url(../assets/bigMinjie.png);
  background-position: -120px -120px;
}

#minjie li:nth-child(26) {
  background: url(../assets/bigMinjie.png);
  background-position: 0px -150px;
}

#minjie li:nth-child(27) {
  background: url(../assets/bigMinjie.png);
  background-position: -30px -150px;
}

#minjie li:nth-child(28) {
  background: url(../assets/bigMinjie.png);
  background-position: -60px -150px;
}

#minjie li:nth-child(29) {
  background: url(../assets/bigMinjie.png);
  background-position: -90px -150px;
}

#minjie li:nth-child(30) {
  background: url(../assets/bigMinjie.png);
  background-position: -120px -150px;
}

#minjie li:nth-child(31) {
  background: url(../assets/bigMinjie.png);
  background-position: 0px -180px;
}

#minjie li:nth-child(32) {
  background: url(../assets/bigMinjie.png);
  background-position: -30px -180px;
}

#minjie li:nth-child(33) {
  background: url(../assets/bigMinjie.png);
  background-position: -60px -180px;
}

#minjie li:nth-child(34) {
  background: url(../assets/bigMinjie.png);
  background-position: -90px -180px;
}

#minjie li:nth-child(35) {
  background: url(../assets/bigMinjie.png);
  background-position: -120px -180px;
}

#minjie li:nth-child(36) {
  background: url(../assets/bigMinjie.png);
  background-position: 0px -210px;
}

#minjie li:nth-child(37) {
  background: url(../assets/bigMinjie.png);
  background-position: -30px -210px;
}

#minjie li:nth-child(38) {
  background: url(../assets/bigMinjie.png);
  background-position: -60px -210px;
}

#minjie li:nth-child(39) {
  background: url(../assets/bigMinjie.png);
  background-position: -90px -210px;
}

#minjie li:nth-child(40) {
  background: url(../assets/bigMinjie.png);
  background-position: -120px -210px;
}

/*敏捷*/
</style>