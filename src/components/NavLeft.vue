<template>
  <div class="nav_left">
    <el-menu v-if="active_index==1 || active_index==null"
             :default-active="active_index2"
             class="el-menu-vertical-demo"
             @select="handleSelect"
             background-color="#2C3E50"
             text-color="#fff"
             active-text-color="#ffd04b">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">欢迎页</span>
      </el-menu-item>
    </el-menu>

    <el-menu v-if="active_index==2"
             :default-active="active_index2"
             class="el-menu-vertical-demo"
             @select="handleSelect"
             background-color="#2C3E50"
             text-color="#fff"
             active-text-color="#ffd04b">
      <!--<el-menu-item index="1">-->
        <!--<i class="el-icon-menu"></i>-->
        <!--<span slot="title">商品管理</span>-->
      <!--</el-menu-item>-->
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <el-submenu index="2" class="product_manage">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
          <el-menu-item index="2-1" style="min-width: 180px; !important;">商品列表</el-menu-item>
          <el-menu-item index="2-2" style="min-width: 180px; !important;">商品分类</el-menu-item>
          <el-menu-item index="2-3" style="min-width: 180px; !important;">商品上新</el-menu-item>
          <el-menu-item index="2-4" style="min-width: 180px; !important;">商品删除</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">优惠券管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">拼团管理</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span slot="title">客户名单管理</span>
      </el-menu-item>
    </el-menu>

    <el-menu v-if="active_index==3"
             :default-active="active_index2"
             class="el-menu-vertical-demo"
             @select="handleSelect"
             background-color="#2C3E50"
             text-color="#fff"
             active-text-color="#ffd04b">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">系统消息</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">消息群发</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<style>
  .nav_left>.el-menu{border-right:1px solid #545c64;border-top:1px solid rgba(22, 23, 22, 0.21);
  box-shadow:0 -5px 8px rgba(4, 4, 4, 0.3)}
  .nav_left .product_manage .el-menu-item{text-align: center;line-height: 45px;height:45px; }
</style>
<script>
  export default {
//    props:["selectIndex"],
    data() {
      return {
        msg: 'hello world',
//        selectIndex:'1'
      }
    },
    computed:{
      selectIndex(){
        return this.active_index
      },
      active_index(){
        return this.$store.state.headerTag.active_index;
      },
      active_index2(){
        console.log(this.$store.state.LeftTag.activeIndex2+"ntsyn");
        return this.$store.state.LeftTag.activeIndex2;
      }
    },
    created(){

      if(sessionStorage.getItem("active_index2")){
        var index = sessionStorage.getItem("active_index2");
        console.log(index+"fuhua");
        this.$store.dispatch("checkIndex2Action",index);
      }else{
        this.$store.dispatch("checkIndex2Action",index);
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        if(this.active_index=='1'){
          this.$store.dispatch("checkIndex2Action",key);
          this.$router.push('/')
        }else if(this.active_index=='2'){
          switch (key){
            case '1':this.$store.dispatch("checkIndex2Action",key);this.$router.push('/OrderManage');
              break;
            case '2-1':
              if(this.$store.state.LeftTag.activeIndex2=='2-1'){
                window.location.reload();
              }
              this.$store.dispatch("checkIndex2Action",key);this.$router.push('/ProductList');sessionStorage.removeItem("goods_page");
              break;
            case '2-2':this.$store.dispatch("checkIndex2Action",key);this.$router.push('/ProductSort');sessionStorage.removeItem("present_page1");
              break;
            case '2-3':this.$store.dispatch("checkIndex2Action",key);this.$router.push('/ProductUpdate');
              break;
            case '2-4':this.$store.dispatch("checkIndex2Action",key);this.$router.push('/ProductDelete');
              break;
            case '3':this.$store.dispatch("checkIndex2Action",key);this.$router.push('/CouponManage');
              break;
            case '4':this.$store.dispatch("checkIndex2Action",key);this.$router.push('/GroupManage');
              break;
            case '5':this.$store.dispatch("checkIndex2Action",key);this.$router.push('/ClientListManage');
              break;
          }
        }else{
          switch (key){
            case '1':this.$store.dispatch("checkIndex2Action",key);this.$router.push('/SystemMes');
              break;
            case '2':this.$store.dispatch("checkIndex2Action",key);this.$router.push('/GroupSendMes');
              break;
          }
        }
      }
    }
  }
</script>
