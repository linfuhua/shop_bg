<template>
  <div class="nav_header">
    <el-row style="background: #2C3E50;min-width: 900px !important;">
      <el-col :span="4" style="">
        <div class="grid-content bg-purple">
          <span class="logo">拼多少</span>
          <span class="small_logo">商家后台</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#2C3E50"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1">店铺首页</el-menu-item>
            <el-menu-item index="2">我的管理</el-menu-item>
            <el-menu-item index="3">消息中心</el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple header_right" >
          <el-row>
            <el-col :span="10" style="position: relative;z-index: 1000;">
              <img src="http://www.jianlinker.cn/static/touxiang.jpg">
              <div style="" class="admin">
                {{shopowner.nick_name}}
                <i class="el-icon-caret-bottom"></i>
                <div style="position: absolute;top:40px;left:46px;width: 45%;height:20px;"></div>
                <div class="admin_pull_down">
                  <div><a href="javascript:void(0)" @click="findShopMes">修改店铺信息</a></div>
                  <div><a href="javascript:void(0)">修改个人信息</a></div>
                </div>
              </div>
            </el-col>
            <el-col :span="14">
              <ul>
                <li @click="LinkHome">
                  <span><img src="http://www.jianlinker.cn/static/home.png"/>拼多少首页</span>
                </li>
                <li><span><img src="http://www.jianlinker.cn/static/exit.png"/>退出</span></li>
              </ul>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <!--修改店铺信息弹出框-->
    <el-dialog title="修改店铺信息" :visible.sync="dialogFormVisible" class="changeFlame">
      <el-form :model="shopdata">
        <el-form-item label="更改店铺logo" :label-width="formLabelWidth">
          <el-upload class="avatar-uploader" action=""
                     :on-error="uploadImaError"
                     :before-upload="beforeAvatarUpload"
            :show-file-list="false">
            <img v-if="shopLogo" :src="shopLogo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="店铺名称" :label-width="formLabelWidth">
          <el-input v-model="shopdata.shop_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺电话" :label-width="formLabelWidth">
          <el-input v-model="shopdata.shop_phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺营业执照" :label-width="formLabelWidth">
          <el-input v-model="shopdata.shop_cert" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商铺qq号" :label-width="formLabelWidth">
          <el-input v-model="shopdata.shop_qq" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商铺简介" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="3" v-model="shopdata.shop_intro"
                    autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="商铺地址" :label-width="formLabelWidth">
          <el-input v-model="shopdata.shop_addr" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商家身份证号" :label-width="formLabelWidth">
          <el-input v-model="shopdata.owner_cert" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import ElRow from "element-ui/packages/row/src/row";
  import {getCookie} from "@/common/auth"
  export default {
    props:['shopowner'],
    components: {ElRow},
    data() {
      return {
//        activeIndex: '1',
        dialogFormVisible: false,
        formLabelWidth: '120px',
        shopdata:{},
        shopLogo:'',
        shopMesParams:'',
        ischangeImg:false,
      };
    },
    computed:{
      activeIndex(){
        return this.$store.state.headerTag.active_index;
      }
    },
    mounted(){
      let index = sessionStorage.getItem("active_index");
      this.$store.dispatch("checkIndexAction",index);
      this.shopMesParams= new FormData();
    },
    methods: {
      LinkHome(){//首页跳转
        window.open('http://www.jianlinker.cn/pds/');
      },
      handleSelect(key, keyPath) {
        this.$emit("selectTag",key);
        if(key==1){
          let index = window.sessionStorage.getItem("active_index");
          this.$store.dispatch("checkIndexAction",key);
          this.$store.dispatch("checkIndex2Action",'1');
          this.$router.push('/');
//          window.location.reload();
        }else if(key==2){
          this.$store.dispatch("checkIndexAction",key);
          this.$store.dispatch("checkIndex2Action",'1');
          this.$router.push('/OrderManage');
//          window.location.reload();
        }else{
//          console.log(this.$route.params.index);
          this.$store.dispatch("checkIndexAction",key);
          this.$store.dispatch("checkIndex2Action",'1');
          this.$router.push('/SystemMes');
//          window.location.reload();
        }
      },
      findShopMes(){
        this.dialogFormVisible=true;
        this.axios.get('/v1/merchant/detailbyuser/'+getCookie('id'),
          {
            headers:{
              "Authorization":"Bearer "+ getCookie("token")
            }
          }).then((response)=>{
          if(response.data.message=='OK'){
            this.sortexit=true
          }
          let data = response.data.data;
          this.shopdata=data;
          this.shopLogo='http://www.jianlinker.cn/'+this.shopdata.shop_logo;
          let time=this.shopdata.createdAt;
          var date = new Date(time).toJSON();
          this.shopdata.createdAt= new Date(+new Date(date)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
          console.log(data+getCookie('id'))
        }).catch((err)=>{
          console.log(err);
        })
      },
      uploadImaError(){
        this.$message({
          message:'图片上传失败 请重新上传',
          type:'error'
        })
      },
      beforeAvatarUpload(file){
        this.ischangeImg=true;
        let windowURL = window.URL || window.webkitURL;
        console.log(windowURL.createObjectURL(file));
        this.shopLogo= windowURL.createObjectURL(file);
        this.shopMesParams.append('shop_logo',file);
        this.shopdata.change_head=true;
        return false;
      },
      onSubmit(){
        this.shopMesParams.append('shop_name',this.shopdata.shop_name);
        this.shopMesParams.append('shop_phone',this.shopdata.shop_phone);
        this.shopMesParams.append('shop_cert',this.shopdata.shop_cert);
        this.shopMesParams.append('shop_qq',this.shopdata.shop_qq);
        this.shopMesParams.append('shop_intro',this.shopdata.shop_intro);
        this.shopMesParams.append('shop_addr',this.shopdata.shop_addr);
        this.shopMesParams.append('owner_cert',this.shopdata.owner_cert);
        this.shopMesParams.append('change_head',this.shopdata.change_head);
//        this.shopMesParams.append('shop_logo',null);
        this.axios.put('/v1/merchant/detail/'+this.shopdata.id,this.shopMesParams,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer '+getCookie("token")
            }
          }).then((response)=>{
          let data=response.data;
          if(data.message=='OK'){
            this.$message({
              message:'修改成功',
              type:'primary'
            });
            this.dialogFormVisible=false;
            setTimeout(function () {
              window.location.reload();
            },1500)
          }
        }).catch((err)=>{
          console.log(err)
        });
      }
    }
  }
</script>
<style>
  /*.nav_header .el-col:first-child div{*/
    /*vertical-align: middle;line-height: 50px;padding-left:20px ;*/
  /*}*/
  /*.nav_header .logo{*/
    /*font-family:LiSu;color: white;font-size: 34px;*/
    /*font-weight: bolder;cursor: pointer;*/
  /*}*/
  /*.nav_header .small_logo{*/
    /*color: #DCDFE6;border-bottom:1px solid #DCDFE6;*/
    /*font-family: microsoft yahei;font-size: 13px*/
  /*}*/
  /*.nav_header .el-menu{border-bottom: none !important;min-width:700px !important;}*/
  /*.nav_header .el-menu-item:first-child:hover{*/
    /*background: none !important;*/
  /*}*/
  /*!*.nav_header .header_right{*!*/
  /*!*line-height: 50px;*!*/
  /*!*}*!*/
  /*.nav_header .header_right .el-col:first-child img{*/
    /*margin-top: 5px;*/
    /*width: 40px;border-radius: 25px; vertical-align: middle;*/
    /*border: 4px solid gray;*/
  /*}*/

  /*.nav_header .header_right .el-col:first-child img:hover{*/
    /*border: 4px solid #909399;*/
  /*}*/
  /*.nav_header .header_right .el-col:last-child img{*/
    /*width: 30px; vertical-align: middle;*/
  /*}*/
  /*.nav_header .header_right ul{list-style: none;margin: 0;padding: 0;}*/
  /*.nav_header .header_right ul li{float: left;padding:15px 8px;}*/
  /*.nav_header .header_right ul li:hover{*/
    /*!*outline: 0;*!*/
    /*background-color: #303133;*/
  /*}*/
</style>
