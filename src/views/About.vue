<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }

  },
  mounted(){

    this._GetGamePkg()
  },
  methods:{
_GetGamePkg: function() {
      var _that=this;
      this.$axios("post", this.$ports.gifts.GetGamePkg, {
        st: "AQAAADlVShsAAAAAAAAAAF1piNL278vGZe5vH/vnGCrZcatQ259B9iK0MBcprD5DAU2K0j4CCkDuJ*iQDoh2oGD4PyO9YRzDIseRcNJTSFVg*D8jvWEcwyLHkXDSU0hVoU/fGMtygzsl1T7FhYS*1GD4PyO9YRzDIseRcNJTSFU=",
        page_index:1,
        page_size:5
      })
        .then(function(response) {
          console.log(response);
        
        })
        .catch(function(error) {
          console.log(error);
        });
    }

  }
}
</script>

<style>

</style>