<template>
  
    <div class="model2" v-show="isShowSendFlag">
          <div class="Gift">
        <h1>赠送物品<em @click="closeModel">×</em></h1>
        <div class="giftMain">
            <div class="giftLeft">
                <span>希腊战神·玛尔斯</span>
                <p><img src="//img.5211game.com/5211/shop/Goods/Basic/22106.jpg?rand=637400852728121797" onerror="Public.fImgNofind();" height="80" width="80" alt=""></p>
                <p class="note"></p>
            </div>
            <div class="giftRight">
                <span>
                    <b>赠送给：</b>
                    <label for="Male">
                        <input type="radio" id="male" value="Male" v-model="gender"> 好友
                    </label>
                   <label for="female">
                       <input type="radio" id="female" value="Female" v-model="gender"> 陌生人
                   </label>
                    
                </span>
                <span>
                    <b id="des">请填写接受人的用户名：</b>
                </span>

                <div class="wr_fd"  v-show="gender == 'Male' ">
                    <div class="inp">
                        <em><img src="../assets/xl.png" h="" height="6" width="11" alt=""></em>
                        <input type="text" class="fdShow" value="--点击选择好友--" data-uid="0" readonly="readonly" maxlength="15" style="text-align:center;">
                        <span style="display:none;"><img src="../assets/ture.jpg" height="8" width="12" alt=""></span>
                    </div>

                    <div class="changeFD" style="display:none;">
                        <ul></ul>
                    </div>
                </div>
                <div class="wr_fd"  v-show="gender == 'Female'">
                    <div class="inp">
                        <input type="text" class="othShow" value="" data-uid="0" placeholder="用户名/手机/邮箱" maxlength="30">
                    </div>
                    <span style="display:none;"><img src="../assets/ture.jpg" height="8" width="12" alt=""></span>
                </div>
                <span id="chkmsg" style="color:red;"></span>
                <a href="javascript:;" id="sureSend" class="sureSendDisabled">确认赠送</a>
            </div>
        </div>
    </div>
    </div>
</div>
 
</template>


<script>
export default {
    name :'send',
    data(){
        return {
            gender: 'Male',
            isShowSendFlag: false
        }
    },
    methods:{
        childrenPram(val){
             this.isShowSendFlag=true;
            console.log(val)
        },
        closeModel() {
      this.isShowSendFlag = false;
    },
    }

}
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
.Gift {
  width: 392px;
  height: 218px;
  background: url(../assets/sendbg.jpg);
  margin: 0 auto;
  margin-top: 300px;
}
.Gift h1 {
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
    width: 360px;
    height: 138px;
    background-color: #fff;
    border: 1px solid #1f2d49;
    padding: 15px 0px 38px 30px;
}
.giftLeft {
    width: 120px;
    height: 138px;
    float: left;
}

    .giftLeft span {
        width: 120px;
        height: 30px;
        line-height: 24px;
        color: #323333;
        font-size: 12px;
        font-weight: bold;
        display: inline-block;
    }

    .giftLeft p {
        width: 80px;
        height: 80px;
        font-size: 12px;
    }
     .giftMain .giftLeft p img{
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
    height: 138px;
    float: left;
}

.giftRight label{
   margin-right: 10px;
    height: 20px;
    line-height: 20px;
    display: inline-block;
    position: relative;
    vertical-align: text-bottom;
    top: 3px;
}
.giftRight span input{
    margin-right: 5px;
    position: relative;
    top:3px;
    cursor: pointer;
}
    .giftRight span {
        height: 30px;
        display: block;
        line-height: 24px;
        font-size: 12px;
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

  .giftRight  .inp em img {
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
    width: 12px;
    height: 12px;
    position: absolute;
    top: 10px;
    right: -24px;
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

    .changeFD ul li {
        line-height: 24px;
        height: 24px;
        width: 100%;
        font-size: 12px;
        text-indent: 12px;
        cursor: default;
    }

        .changeFD ul li:hover {
            background-color: #e2f2ff;
        }

.sureSend {
    width: 118px;
    height: 23px;
    line-height: 23px;
    text-align: center;
    display: block;
    font-size: 12px;
    background-color: #e03336;
    border: 1px solid #cf2427;
    color: #fff;
    /*margin-top: 24px;*/
}

.sureSendDisabled {
    width: 118px;
    height: 23px;
    line-height: 23px;
    text-align: center;
    display: block;
    font-size: 12px;
    background-color: #B8B8B8;
    border: 1px solid #B8B8A8;
    color: #fff;
    /*margin-top: 33px;*/
}
/* 赠送模态框 */

</style>