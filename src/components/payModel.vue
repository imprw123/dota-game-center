<template>
    <div class="payModel" v-show="payFlag">
        <div class="pay">
            <i class="close" @click="closePay"></i>
            <iframe width="604" height="420" scrolling="no" frameborder="0" allowtransparency="true"  src="https://shop.5211game.com/Weblayer/?goodsId=22153&amount=1&style=dark"></iframe>
        </div>
    </div>
</template>


<script >
    export default {
        name:'pay',
        data(){
            return {
                 payFlag:false
            }
        },
        methods:{
            payChildren(val){
                this.payFlag=true;
                console.log(val);
            },
            closePay(){
                 this.payFlag=false;
            }
        }
    }
</script>


<style>
.payModel{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 1000;
}
.pay{
    overflow: hidden;
    width: 604px;
    height: 420px;
    margin-left: -302px;
    margin-top: -210px;
    border: 1px solid #b1b3b4;
    background: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
}
.close{
    width: 20px;
    height: 18px;
    display: block;
    position: absolute;
    background-color: #000;
    top: 7px;
    right: 7px;
    cursor: pointer;
}
</style>