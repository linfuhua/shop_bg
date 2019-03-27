<template>
  <div>
    <div class="bread_crumbs" id="ProductUpdate">
      <span>商品管理&nbsp;<i class="present">--&nbsp;{{msg}}</i></span>
    </div>
    <div class="update_product">
      <div class="step">
        <el-steps :active="step_present" simple>
          <el-step title="选择商品分类标签" icon="el-icon-edit"></el-step>
          <el-step title="填写商品信息" icon="el-icon-upload"></el-step>
          <el-step title="上传商品图片" icon="el-icon-picture"></el-step>
          <el-step title="其他信息" icon="el-icon-picture"></el-step>
        </el-steps>
      </div>
      <div class="step_one" v-show="step_present==0" >
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>当前选择的商品标签类别是：</el-breadcrumb-item>
          <el-breadcrumb-item>
            <strong style="color: #2FBC5E;"><i v-if="!mainSortName">一级标签</i>{{mainSortName}}</strong>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <strong style="color: #2FBC5E;"><i v-if="!subSortName">二级标签</i>{{subSortName}}</strong>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div style="width: 100%;text-align: center;margin-top: 20px">
          <div class="step_one_left">
            <header>请选择一级商品标签</header>
            <ul>
              <li v-for="(item,index) of mainSortList" :key="item.id" @click="checkMainSort(item)"
                  :class="{'active':sort_index==item.id}">{{item.sort}}</li>
            </ul>
          </div>
          <span class="right_icon"><img src="http://www.jianlinker.cn/static/right.png"></span>
          <div class="step_one_right">
            <header>请选择二级商品标签</header>
            <ul v-if="subSortList.length">
              <li v-for="(item,index) of subSortList" :key="item.id" @click="checkSubSort(item)"
                  :class="{'active':sort_index2==item.id}">{{item.sort}}</li>
            </ul>
            <div v-if="subSortList.length==0" style="margin: 30px 10px">
              <el-alert
                title="没有数据"
                :closable="false"
                type="info"
                center
                show-icon>
              </el-alert>
            </div>
          </div>
          <div class="step_btn">
            <el-button :disabled="step_present==0">上一步</el-button>
            <el-button type="primary" @click="step_present=1"><a href="#ProductUpdate">下一步</a></el-button>
          </div>
        </div>
      </div>
      <div class="step_two" v-show="step_present==1" >
        <div class="step_two_top">
          <el-breadcrumb separator-class="el-icon-arrow-right" style="display: inline-block">
            <el-breadcrumb-item>商品分类<strong style="color: #2FBC5E;margin-left: 25px">{{mainSortName}}</strong></el-breadcrumb-item>
            <el-breadcrumb-item><strong style="color: #2FBC5E;">{{subSortName}}</strong></el-breadcrumb-item>
          </el-breadcrumb>
          <span><i class="el-icon-edit-outline"></i></span>
        </div>
        <div class="step_two_input">
          <div>
            <span>商品名称</span><el-input placeholder="请输入商品名称" v-model="goods_name"></el-input>
          </div>
          <!--<div class="">-->
          <!--<span>商品ID</span><el-input placeholder="请输入商品ID"></el-input><br>-->
          <!--<div style="display: inline-block;width: 16%;padding-right: 25px;"></div>-->
          <!--<div class=" remind">系统自动生成，商家可用此编号管理商品</div>-->
          <!--</div>-->
          <div>
            <span>商品原价</span><el-input placeholder="请输入商品原价" v-model="goods_cost"></el-input>
          </div>
          <div class="">
            <span>商品售价</span><el-input placeholder="请输入商品售价" v-model="goods_price"></el-input>
          </div>
          <div class="">
            <span>商品成本价</span><el-input placeholder="请输入成本价"></el-input><br>
            <div style="display: inline-block;width: 16%;padding-right: 25px;"></div>
            <div class=" remind">商家自己管理计算成本利润，对普通买家不可见</div>
          </div>
          <div class="">
            <span>商品库存</span><el-input placeholder="请输入库存数量" v-model="goods_stock"></el-input>
          </div>
          <div class="">
            <span>库存警告</span><el-input placeholder="请输入库存警告数量" v-model="stock_warn"></el-input><br>
            <div style="display: inline-block;width: 16%;padding-right: 25px;"></div>
            <div class=" remind">设置最低库存预警值。当库存低于预警值时商家中心商品列表页库存列红字提醒，请填写0~255的数字，0为不预警。</div>
          </div>
          <div class="">
            <span>商品描述</span>
            <el-input type="textarea" :rows="3" v-model="goods_desc" placeholder="请输入商品描述" style="width: 40%;vertical-align: middle"></el-input>
          </div>
        </div>
        <div class="step_btn">
          <el-button @click="step_present=0"><a href="#ProductUpdate">上一步</a></el-button>
          <el-button type="primary" @click="step_present=2"><a href="#ProductUpdate">下一步</a></el-button>
        </div>
      </div>
      <div class="step_three" v-show="step_present==2">
        <div class="uploadImg">
          <div class="product_main_img">
            <span>上传商品主图</span>
            <el-upload
              class="avatar-uploader" style="display: inline-block;"
              action=""
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="img_link">
              <span>主图片外部链接</span><el-input placeholder="输入图片外部链接地址" size="small"></el-input><br/>
              <div></div>
              <div>外链地址必须带有http://格式</div>
            </div>
          </div>
          <div class="product_vice_img">
            <div>上传商品幅图</div>
            <div>
              <el-upload style="display: inline-block !important ;vertical-align: middle !important;"
                         action="https://jsonplaceholder.typicode.com/posts/"
                         list-type="picture-card">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div>
          </div>
        </div>
        <div class="step_btn">
          <el-button @click="step_present=1"><a href="#ProductUpdate">上一步</a></el-button>
          <el-button type="primary" @click="step_present=3"><a href="#ProductUpdate">下一步</a></el-button>
        </div>
      </div>
      <div class="step_four" v-show="step_present==3">
        <div class="step_four_input">
          <div class="">
            <span>商品重量</span><el-input placeholder="请输入商品重量"></el-input><br>
            <div style="display: inline-block;width: 16%;padding-right: 25px;"></div>
            <div class=" remind">注意以kg作为单位</div>
          </div>
          <div class="">
            <span>是否免运费</span><el-switch v-model="is_fare"></el-switch>
          </div>
          <div class="">
            <span>商品运费</span><el-input placeholder="请输入商品运费" :disabled="is_fare" v-model="goods_fare"></el-input><br>
          </div>
          <div class="">
            <span>拼团优惠人数</span><el-input placeholder="请输入团购人数" v-model="goods_people"></el-input><br>
            <div style="display: inline-block;width: 16%;padding-right: 25px;"></div>
            <div class=" remind">设置团购优惠的人数。当满足人数的时候普通买家能享受拼团优惠</div>
          </div>
          <div class="">
            <span>拼团优惠金额</span><el-input placeholder="团购优惠金额" v-model="goods_discount"></el-input><br>
            <div style="display: inline-block;width: 16%;padding-right: 25px;"></div>
            <div class=" remind">拼团完成时个人能优惠的金额</div>
          </div>
          <div class="">
            <span>拼团时效</span><el-input style="width: 10%" v-model="group_aging"></el-input>
            <i style="padding-left: 5px;">小时</i><br>
            <div style="display: inline-block;width: 16%;padding-right: 25px;"></div>
            <div class=" remind">团长开团成功后开始倒计时，超过时效拼团将取消</div>
          </div>
          <!--<div class="">-->
          <!--<span>是否发放优惠券</span><el-switch v-model="coupon"></el-switch>-->
          <!--</div>-->
          <!--<div class="">-->
          <!--<span>商品运费</span><el-input placeholder="请输入商品运费" :disabled="carriage"></el-input><br>-->
          <!--</div>-->
        </div>
        <div class="step_btn">
          <el-button @click="step_present=2"><a href="#ProductUpdate">上一步</a></el-button>
          <el-button type="primary" @click="productUpdate">立即上新</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
</style>
<script>
  import {getCookie} from "@/common/auth"
  export default {
    data() {
      return {
        msg: '商品上新',
        sort_index:'',
        mainSortName:'',
        subSortName:'',
        sort_index2:'',
        step_present:0,
        imageUrl: 'http://www.jianlinker.cn/static/update_images.jpg',
        dialogImageUrl: '',
        dialogVisible: false,
        is_fare:true,
        coupon:false,
        mainSortList:[],
        subSortList:[],
        productFormData:'',
        goods_name:'',
        goods_desc:'',
        goods_cost:'',
        goods_price:'',
        goods_discount:'',
        goods_stock:'',
        stock_warn:'',
        goods_people:'',
        group_aging:'',
        goods_fare:''
      }
    },
    mounted(){
      this.findMainSort();
      this.productFormData = new FormData()  //初始化用来保存商品上新提交的数据
    },
    methods: {
      findMainSort(){
        this.axios.get('/v1/merchant/mainsortall',{
          headers:{
            "Authorization":"Bearer "+ getCookie("token")
          }
        }).then((res)=>{
          let data =res.data.data;
          this.mainSortList=data.categoryList
        }).catch((err)=>{

        })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {//图片上传的处理
        this.ischangeImg=true;
        let windowURL = window.URL || window.webkitURL;
        console.log(windowURL.createObjectURL(file));
        this.imageUrl= windowURL.createObjectURL(file);
//        this.productFormData.append('goods_photo');
        this.productFormData.append('goods_photo',file);
        return false;
      },
      checkMainSort(item){
        this.sort_index=item.id;
        this.sort_index2='';
        this.mainSortList.forEach((item)=>{ //保存当面选中的一级标签名称
          if(item.id==this.sort_index){
            this.mainSortName=item.sort;
          }
        });
        this.subSortName="";
        this.axios.get('/v1/merchant/subsortall/?pid='+item.id,{
          headers:{
            "Authorization":"Bearer "+ getCookie("token")
          }
        }).then((res)=>{
          let data = res.data.data;
          this.subSortList=data.categoryList;
        }).catch((err)=>{
          console.log(err);
        })
      },
      checkSubSort(item){
        this.sort_index2=item.id;
        this.subSortList.forEach((item)=>{//保存当面选中的二级标签名称
          if(item.id==this.sort_index2){
            this.subSortName=item.sort;
          }
        });
      },
      productUpdate(){ //商品上新
        //判断信息是否填写完整
        if(this.sort_index=='' || this.sort_index2=='' || this.goods_name==''|| this.goods_desc==''||
          this.goods_cost==''|| this.goods_price==''|| this.goods_discount==''|| this.goods_stock==''||
          this.stock_warn==''|| this.goods_people=='' || this.group_aging=='' || !this.productFormData.get('goods_photo')){
          console.log("hahaha");
          this.$message.error("请检查商品上新信息是否填写完整！");
          return false;
        }
        if(!this.is_fare && this.goods_fare==''){  //判断运费是否免费滑块的选择状态
          this.$message.error("请检查商品上新信息是否填写完整！");
          console.log("5555555ha");
          return false;
        }else if(!this.is_fare && !this.goods_fare==''){
          this.productFormData.append("goods_fare",this.goods_fare.toString());
        }else if(this.is_fare){
          this.productFormData.append("goods_fare",'0');
        }
        this.productFormData.append("goods_name",this.goods_name.toString());
        this.productFormData.append("goods_desc",this.goods_desc.toString());
        this.productFormData.append("goods_cost",this.goods_cost.toString());
        this.productFormData.append("goods_price",this.goods_price.toString());
        this.productFormData.append("goods_discount",this.goods_discount.toString());
        this.productFormData.append("goods_stock",this.goods_stock.toString());
        this.productFormData.append("stock_warn",this.stock_warn.toString());
        this.productFormData.append("goods_people",this.goods_people.toString());
        this.productFormData.append("group_aging",this.group_aging.toString());
        this.productFormData.append("shop_id",sessionStorage.getItem("shopId").toString());
        this.productFormData.append("mainsort_id",this.sort_index.toString());
        this.productFormData.append("subsort_id",this.sort_index2.toString());
        this.productFormData.append("is_fare",this.is_fare.toString());


        this.axios.post('/v1/merchant/goods/',this.productFormData,{
          headers:{
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer '+getCookie("token")
          }
        }).then((res)=>{
          let result = res.data;
          if(result.message=='OK'){
            this.$message({
              message:'商品上新成功',
              type:'success'
            });
            setTimeout(function () {
              window.location.reload();
            },1500)
          }else{
            this.$message.error("商品上新失败！")
          }
        }).catch((err)=>{
          console.log(err);
        })
      }
    }
  }
</script>
