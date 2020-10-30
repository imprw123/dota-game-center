<template>
    <div class="siderBar">
        <div class="silderBtn">
            <ul>
                <li class="silder01" v-on:click="openFixed"></li>
                <li class="silder02" v-on:click="openFixed"></li>
                <li class="silder03" v-on:click="openFixed"></li>
                <li class="silder04" v-on:click="openFixed"></li>
            </ul>
        </div>
        <div class="siderHd">
            <div class="back" v-on:click="closeFixed">

            </div>
        </div>
    </div>
</template>


<script>

export default {
    name:'',
    data(){
        return {}
    },
    methods:{
        openFixed(){
            console.log('nn')
            this.$emit('FixedModel',true)
        },
        closeFixed(){
             this.$emit('FixedModel',false)
        }

    }
}
</script>


<style>
.siderBar{
    width:300px;
    height: 914px;
    background-color: #f3f3f3;
     box-shadow:-5px 0px 20px rgba(0,0,0,0.5); 
     position: relative;
}
.siderHd{
    width:300px;
    height:50px;
    background-color: #053249;
}
.silderBtn{
    width:56px;
    height:221px;
    position: absolute;
    top:50%;
    margin-top:-110px;
    left:-56px
}
.silderBtn ul li{
    width:56px;
    height: 56px;
    margin-bottom:7px;
    cursor: pointer;
}
.silderBtn ul li.silder01{
    background:url(../assets/silder01.png);
}
.silderBtn ul li.silder01:hover{
     background:url(../assets/silder01-hover.png);
     transition: 0.2s;
}
.silderBtn ul li.silder02{
   background:url(../assets/silder02.png);
}
.silderBtn ul li.silder02:hover{
    background:url(../assets/silder02-hover.png);
     transition: 0.2s;
}
.silderBtn ul li.silder03{
   background:url(../assets/silder03.png);
}
.silderBtn ul li.silder03:hover{
    background:url(../assets/silder03-hover.png);
     transition: 0.2s;
}
.silderBtn ul li.silder04{
   background:url(../assets/silder04.png);
}
.silderBtn ul li.silder04:hover{
    background:url(../assets/silder04-hover.png);
     transition: 0.2s;
}
.back{
    width:26px;
    height:50px;
    float:right;
    background: url(../assets/back.png);
    cursor: pointer;
}
.back:hover{
    background: url(../assets/back-hover.png);
    transition: 0.3s ease;
}
</style>