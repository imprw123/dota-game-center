<template>
  <div class="model2" v-show="isShowSendFlag">
    <div class="Gift">
      <h1>
        赠送物品
        <em @click="closeModel">×</em>
      </h1>
      <div class="giftMain">
        <div class="giftLeft">
          <span v-bind:title="nameShow">{{nameShow}}</span>
          <p>
            <img v-lazy="imgPath" height="80" width="80" alt />
          </p>
          <p class="note"></p>
        </div>
        <div class="giftRight">
          <span>
            <b>赠送给：</b>
            <label for="Male">
              <input type="radio" id="male" value="Male" v-model="gender" /> 好友
            </label>
            <label for="female">
              <input type="radio" id="female" value="Female" v-model="gender" /> 陌生人
            </label>
          </span>
          <span>
            <b id="des">请填写接受人的用户名：</b>
          </span>

          <div class="wr_fd" v-show="gender == 'Male' ">
            <div class="inp">
              <em @click="closeFriend">
                <img src="../assets/xl.png" h height="6" width="11" alt />
              </em>
              <input
                type="text"
                class="fdShow"
                v-model="valName"
                readonly="readonly"
                style="text-align:center;"
                @click="Queryfriends()"
              />
              <span style="display:none;">
                <img src="../assets/ture.jpg" height="8" width="12" alt />
              </span>
            </div>

            <div class="changeFD" v-show="hasFriend">
              <ul>
                <li
                  v-for="(item,index) in friendslist"
                  :key="index"
                  @click="chooseName(item.name)"
                >{{item.name}}</li>
              </ul>
            </div>
            <div class="sendBtn">
              <div style="overflow:hidden;zoom:1;">
                <a
                  href="javascript:;"
                  class="sureSendDisabled"
                  v-show="valName == '--点击选择好友--'"
                >+购物车</a>
                <a
                  href="javascript:;"
                  class="sureSend"
                  @click="CheckAccount"
                  v-show="valName != '--点击选择好友--'"
                >+购物车</a>
                <a
                  href="javascript:;"
                  class="sureSendDisabled"
                  v-show="valName == '--点击选择好友--'"
                >立即赠送</a>
                <a
                  href="javascript:;"
                  class="surebuy"
                  @click="sendBuy"
                  v-show="valName != '--点击选择好友--'"
                >立即赠送</a>
              </div>
              <span id="chkmsg" style="color:red;" v-show="msg2 != ''">{{msg2}}</span>
            </div>
          </div>
          <div class="wr_fd" v-show="gender == 'Female'">
            <div class="inp">
              <input
                type="text"
                class="othShow"
                value
                placeholder="请输入你想赠送的用户名"
                v-model="valName2"
                maxlength="30"
              />
            </div>
            <span style="display:none;">
              <img src="../assets/ture.jpg" height="8" width="12" alt />
            </span>
            <div class="sendBtn">
              <div style="overflow:hidden;zoom:1;">
                <a href="javascript:;" class="sureSendDisabled" v-show="valName2 == ''">+购物车</a>
                <a
                  href="javascript:;"
                  class="sureSend"
                  @click="CheckAccount2"
                  v-show="valName2 != ''"
                >+购物车</a>

                <a href="javascript:;" class="sureSendDisabled" v-show="valName2 == ''">立即赠送</a>
                <a
                  href="javascript:;"
                  class="surebuy"
                  @click="sendBuy2"
                  v-show="valName2 != ''"
                >立即赠送</a>
              </div>
              <span id="chkmsg" style="color:red;" v-show="msg != '' && valName2 != ''" >{{msg}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "send",
  data() {
    return {
      gender: "Male",
      isShowSendFlag: false,
      hasFriend: false,
      friendslist: [],
      valName: "--点击选择好友--",
      isSend: false,
      goodsid: "",
      imgPath: "",
      nameShow: "",
      valName2: "",
      msg: "",
      msg2: ""
    };
  },
  watch:{
      valName2(){
          if(this.valName2 == ''){
              this.msg ='';
          }
      }
  },
  methods: {
    childrenPram(val, img, name) {
      this.isShowSendFlag = true;
      this.goodsid = val;
      this.imgPath = img;
      this.nameShow = name;
     // console.log(val);
    },
    closeModel() {
      this.isShowSendFlag = false;
    },
    //查询好友列表
    Queryfriends() {
      this.$axios("get", `${this.$ports.send.Queryfriends}`)
        .then(res => {
          //console.log(res);
          if (res.code == 0) {
            this.friendslist = res.data.friendsList;
            this.hasFriend = true;
          } else {
            this.friendslist = [];
            this.hasFriend = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //关闭下拉好友
    closeFriend() {
      this.hasFriend = false;
      this.valName = "--点击选择好友--";
    },
    chooseName(val) {
      this.valName = val;
      this.hasFriend = false;
    },
    //根据好友立即赠送
    sendBuy() {
      this.$axios(
        "get",
        `${this.$ports.send.CheckAccount}?account=${this.valName}`
      )
        .then(res => {
          console.log(res);
          if (res.code == 0) {
            this.$emit("parentPayFor", this.goodsid, 1, res.data.UserId);
          } else if (res.code < 0) {
            this.msg2 = res.msg;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //根据好友加入购物车
    CheckAccount() {
      this.$axios(
        "get",
        `${this.$ports.send.CheckAccount}?account=${this.valName}`
      )
        .then(res => {
        //  console.log(res);
          if (res.code == 0) {
            this.AddWebCartGoods(res.data.UserId);
          } else if (res.code < 0) {
            this.msg2 = res.msg;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //根据陌生人立即赠送
    sendBuy2() {
      this.$axios(
        "get",
        `${this.$ports.send.CheckAccount}?account=${this.valName2}`
      )
        .then(res => {
         // console.log(res);
          if (res.code == 0) {
            this.$emit("parentPayFor", this.goodsid, 1, res.data.UserId);
          } else if (res.code < 0) {
            this.msg = res.msg;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //陌生人加入购物车
    CheckAccount2() {
      this.$axios(
        "get",
        `${this.$ports.send.CheckAccount}?account=${this.valName2}`
      )
        .then(res => {
          //console.log(res);
          if (res.code == 0) {
            this.AddWebCartGoods(res.data.UserId);
          } else if (res.code < 0) {
            this.msg = res.msg;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //赠送接口
    AddWebCartGoods(userid) {
      // debugger;
      this.$axios(
        "get",
        `${
          this.$ports.shopCar.AddWebCartGoods
        }?beGivenUserId=${userid}&goodsId=${this.goodsid}&count=${1}`
      )
        .then(res => {
        //  console.log(res);
          this.$emit("parentHandparent1");
          this.isShowSendFlag = false;
          this.valName = "--点击选择好友--";
        })
        .catch(error => {
          this.$emit("parentHandparent1");
          this.isShowSendFlag = false;
          this.valName = "--点击选择好友--";
        });
    }
  }
};
</script>


<style>
.model2 {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 1000;
}
#chkmsg {
  width: 100%;
  display: block;
  font-size: 12px;
  color: red;
  font-family: "微软雅黑";
  margin-top:5px;
}
.Gift {
  width: 392px;
  height: 218px;
  background: url(../assets/sendbg.jpg);
  margin: 0 auto;
  margin-top: 300px;
}
.model2 .Gift h1 {
  width: 377px;
  height: 25px;
  line-height: 25px;
  padding-left: 15px;
  font-size: 12px;
  color: #fff;
  font-weight: normal;
  position: relative;
}
.Gift h1 em {
  width: 20px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  font-size: 18px;
  display: block;
  position: absolute;
  top: 4px;
  right: 5px;
  cursor: pointer;
}
.giftMain {
  width: 361px;
  height: 151px;
  padding: 15px 0px 26px 30px;
}
.giftLeft {
  width: 120px;
  height: 138px;
  float: left;
}

.giftLeft span {
  width: 80px;
  height: 30px;
  line-height: 24px;
  color: #323333;
  font-size: 12px;
  font-weight: bold;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.giftLeft p {
  width: 80px;
  height: 80px;
  font-size: 12px;
}
.giftMain .giftLeft p img {
  width: 80px;
  height: 80px;
}

.giftLeft p.note {
  height: 40px;
  line-height: 34px;
  margin-top: 4px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.giftRight {
  width: 226px;
  height: 110px;
  float: left;
}

.giftRight label {
  margin-right: 10px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  position: relative;
  vertical-align: text-bottom;
  top: 3px;
  color: #333;
}
.giftRight span input {
  margin-right: 5px;
  position: relative;
  top: 3px;
  cursor: pointer;
}
.giftRight span {
  height: 30px;
  display: block;
  line-height: 24px;
  font-size: 12px;
  color: #333;
}

.giftRight p {
  height: 22px;
  line-height: 22px;
  font-size: 12px;
}

.wr_fd {
  width: 168px;
  height: 30px;
  position: relative;
  top: 0px;
}

.giftRight .inp {
  width: 168px;
  height: 28px;
  position: relative;
}

.inp em {
  width: 24px;
  height: 28px;
  display: block;
  position: absolute;
  background-color: #fff;
  top: 0px;
  right: 0px;
  cursor: pointer;
  border: 1px solid #a8a8a8;
  border-left: none;
}

.giftRight .inp em img {
  width: 11px;
  height: 6px;
  position: absolute;
  top: 11px;
  left: 7px;
}

.giftRight .fdShow {
  width: 132px;
  height: 28px;
  line-height: 28px;
  border: 1px solid #a8a8a8;
  color: #3d3d3d;
  padding-left: 12px;
  outline-style: none;
  position: absolute;
  top: 0px;
  left: 0px;
  border-right: none;
  cursor: pointer;
}

.giftRight .othShow {
  width: 156px;
  height: 28px;
  line-height: 28px;
  border: 1px solid #a8a8a8;
  color: #3d3d3d;
  padding-left: 12px;
  outline-style: none;
  position: absolute;
  top: 0px;
  left: 0px;
}

.wr_fd span {
  width: 121px;
  height: 22px;
  text-align: center;
}

.wr_fd span img {
  position: absolute;
  top: 0px;
  left: 0px;
}

.changeFD {
  width: 166px;
  height: 151px;
  display: block;
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  top: 30px;
  overflow-y: auto;
}

.giftRight .wr_fd .changeFD ul li {
  line-height: 24px;
  height: 24px;
  width: 100%;
  font-size: 12px;
  text-indent: 12px;
  cursor: default;
  padding: 0px;
  cursor: pointer;
  margin-right: 0px;
  margin-bottom: 0px;
  color: #333;
}

.changeFD ul li:hover {
  background-color: #e2f2ff;
}

.sureSend {
  width: 72px;
  height: 23px;
  line-height: 23px;
  text-align: center;
  display: block;
  font-size: 12px;
  background-color: #ff4a00;
  border: 1px solid #ff4a00;
  font-size: 14px;
  color: #fff;
  float: left;
  margin: 0 5px;
}
.surebuy {
  width: 72px;
  height: 23px;
  line-height: 23px;
  text-align: center;
  display: block;
  font-size: 12px;
  background-color: #ffb373;
  border: 1px solid #f0cbb6;
  font-size: 14px;
  color: #f32a42;
  float: left;
  margin: 0 5px;
  /*margin-top: 24px;*/
}
.sureSendDisabled {
  width: 72px;
  height: 23px;
  line-height: 23px;
  text-align: center;
  display: block;
  font-size: 12px;
  background-color: #b8b8b8;
  border: 1px solid #b8b8a8;
  color: #fff;
  /*margin-top: 33px;*/
  float: left;
  margin: 0 5px;
}
/* 赠送模态框 */
.sendBtn {
  width: 100%;
  margin-top: 24px;
}
</style>