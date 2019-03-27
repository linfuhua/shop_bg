<template>
  <div class="product_list">
    <div class="bread_crumbs">
      <span>商品管理&nbsp;<i class="present">--&nbsp;商品列表</i></span>
    </div>
    <div class="add_new">
      <el-input v-model="input_Id" style="width:25%" placeholder="商品ID" class="input-with-select" size="mini">
        <el-button slot="append" icon="el-icon-search"  size="mini" @click="checkProductItem(input_Id)"></el-button>
      </el-input>
      <el-button size="small" @click="addNewProduct"><i class="el-icon-plus"></i>添加新商品</el-button>
    </div>
    <div class="lists">
      <div>
        <div>
          <table>
            <thead>
            <tr>
              <th class="">商品ID</th>
              <th class="">商品信息</th>
              <th class="">所属标签</th>
              <th>价格</th>
              <th>库存</th>
              <th>上架</th>
              <th>拼团人数</th>
              <th>拼团时效</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) of filterProductList" :key="index">
              <td class="" width="8%">
                <p>{{item.id}}</p>
              </td>
              <td class=""  width="30%">
                <div class="publish_time">发布时间：{{item.createdAt}}</div>
                <span class="product_img"><img :src="'http://www.jianlinker.cn/'+item.goods_photo"/></span>
                <span class="title"><i>{{item.goods_name}}：{{item.goods_desc}}</i></span>
              </td>
              <td class=""  width="14%">
                <i v-for="(item1,index1) of allMainSort">
                  <i v-if="item1.id==item.mainsort_id">{{item1.sort}}</i>
                </i>
                &nbsp;>&nbsp;
                <i v-for="(item2,index2) of allSubSort">
                  <i v-if="item2.id==item.subsort_id">{{item2.sort}}</i>
                </i>
              </td>
              <td  width="6%">￥{{item.goods_price}}</td>
              <td  width="6%">{{item.goods_stock}}</td>
              <td  width="6%">
                <el-switch v-model="item.is_shelf" :width="value" @change="putAway(item)">
                </el-switch>
              </td>
              <td  width="8%">{{item.goods_people}}</td>
              <td  width="6%">{{item.group_aging}}小时</td>
              <td >
                <div style="margin-bottom: 8px">
                  <el-button type="success" size="mini" @click="checkGoodsItem(item)">查看<i class="el-icon-search"></i></el-button>
                </div>
                <div>
                  <el-button size="mini" @click="deleteProduct(item)">删除<i class="el-icon-delete"></i></el-button>
                </div>
              </td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
              <td colspan="24" v-if="totalProduct==0">
                <el-alert
                  style="width: 100%"
                  title="当前没有数据"
                  type="info"
                  center
                  :closable="false"
                  show-icon>
                </el-alert>
              </td>
              <td colspan="3"></td>
              <td colspan="6" style="position: relative">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="totalProduct"
                  :page-size="limit"
                  :current-page="page"
                  @current-change="pageChange"
                  @prev-click="preClick"
                  @next-click="nextClick"
                  v-if="showPading"
                >
                </el-pagination>
              </td>
            </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>

    <!--查看和修改商品信息弹出框-->
    <el-dialog :title="disabled==true ?'查看店铺信息':'修改店铺信息'"
               :visible.sync="dialogFormVisible" class="changeFlame"
               @close="disabled=true">
      <el-button  size="mini" @click="disabled=!disabled" v-if="disabled">修改</el-button>
      <el-button type="success" plain size="mini" @click="disabled=!disabled" v-if="!disabled">关闭修改</el-button>
      <el-form v-model="goods_data">
        <el-form-item label="更改商品图片" :label-width="formLabelWidth">
          <el-upload class="avatar-uploader" action=""
                     :disabled="disabled"
                     :before-upload="beforeAvatarUpload"
                     :show-file-list="false">
            <img v-if="goods_data.goods_photo" :src="'http://www.jianlinker.cn/'+goods_data.goods_photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="goods_data.goods_name" autocomplete="off" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="商品原价" :label-width="formLabelWidth">
          <el-input v-model="goods_data.goods_cost" autocomplete="off" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="商品售价" :label-width="formLabelWidth">
          <el-input v-model="goods_data.goods_price" autocomplete="off" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="3" v-model="goods_data.goods_desc"
                    autocomplete="off" :disabled="disabled" ></el-input>
        </el-form-item>
        <el-form-item label="商品库存" :label-width="formLabelWidth">
          <el-input v-model="goods_data.goods_stock" autocomplete="off" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="库存警告值" :label-width="formLabelWidth">
          <el-input v-model="goods_data.stock_warn" autocomplete="off" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="拼团人数" :label-width="formLabelWidth">
          <el-input v-model="goods_data.goods_people" autocomplete="off" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="拼团优惠金额" :label-width="formLabelWidth">
          <el-input v-model="goods_data.goods_discount" autocomplete="off" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="拼团时效" :label-width="formLabelWidth">
          <el-input v-model="goods_data.group_aging" autocomplete="off" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="是否免运费" :label-width="formLabelWidth">
          <el-switch v-model="goods_data.is_fare" :disabled="disabled"></el-switch>
        </el-form-item>
        <el-form-item label="商品运费" :label-width="formLabelWidth">
          <el-input placeholder="请输入商品运费" :disabled="goods_data.is_fare" v-model="goods_data.goods_fare"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false;disabled=true">取 消</el-button>
        <el-button type="primary"  :disabled="disabled" @click="changeGoods">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>
</style>
<script>
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import {getCookie} from "@/common/auth";

  export default {
    components: {
      ElCol,
      ElRow},
    data() {
      return {
        msg: '商品列表',
        dialogFormVisible:false,
        formLabelWidth:'120px',
        value:35,
        productList:[],
        input_Id:'',
        page:1,
        limit:6,
        totalProduct:0,
        showPading:false,
        goods_data:'',
        disabled:true,
        allMainSort:[],
        allSubSort:[],
        updateFormData:'',
        change_photo:false
      }
    },
    computed:{
      filterProductList(){
        return this.productList;
      }
    },
    mounted(){
      if(this.$route.query.findGoods){
        this.findProductList({'offset':this.page,'limit':this.limit},0)
      }else{
        if(sessionStorage.getItem("goods_page")){
          this.page=parseInt(sessionStorage.getItem("goods_page"));
          this.findProductList({'offset':this.page,'limit':this.limit},1)
        }else{
//        this.page=1;
          this.findProductList({'offset':this.page,'limit':this.limit},1)
        }
      }

      this.updateFormData = new FormData(); //修改商品信息时初始化一个FormData来存修改后的数据

//      查询所有以及标签
      this.axios.get('/v1/merchant/mainsortall',{
        headers:{
          "Authorization":"Bearer "+ getCookie('token')
        }
      }).then((res)=>{
        let data = res.data.data;
        this.allMainSort = data.categoryList;
      });
//      查询所有二级标签
      this.axios.get('/v1/merchant/suball',{
        headers:{
          "Authorization":"Bearer "+ getCookie('token')
        }
      }).then((res)=>{
        let data = res.data.data;
        this.allSubSort = data.categoryList;
      })
    },
    methods:{
      findProductList(params,status){
        if(status==0){
          var url='/v1/merchant/goodsbysub/?offset='+params.offset+'&limit='+params.limit+'&mid='
            +sessionStorage.getItem("shopId")+'&sid='+sessionStorage.getItem("sub_sort_id");
        }else{
          var url='/v1/merchant/goods/?offset='+params.offset+'&limit='+params.limit+'&mid='
            +sessionStorage.getItem("shopId");
        }
        this.axios.get(url,{
          headers:{
            "Authorization":"Bearer "+ getCookie('token')
          }
        }).then((res)=>{
          let data = res.data.data;
          this.productList=data.goodsList;

          this.productList.forEach(function (item) {//格式化时间
            let time=item.createdAt;
            var date = new Date(time).toJSON();
            item.createdAt= new Date(+new Date(date)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
          });

          this.totalProduct=data.totalCount;//保存总条数
          if(data.totalCount<=this.limit){//分页栏是否显示
            this.showPading=false;
          }else{
            this.showPading=true;
          }
        }).catch((err)=>{
          console.log(err);
        })
      },
      pageChange(val){
//        console.log(`当前页: ${val}`);
        this.page=parseInt(val);
        sessionStorage.setItem("goods_page",this.page);
        this.findProductList({'offset':this.page,'limit':this.limit});
      },
      preClick(val){
//        console.log(`上一页: ${val}`);
        this.page=parseInt(val);
        sessionStorage.setItem("goods_page",this.page);
        this.findProductList({'offset':this.page,'limit':this.limit});
      },
      nextClick(val){
//        console.log(`下一页: ${val}`);
        this.page=parseInt(val);
        sessionStorage.setItem("goods_page",this.page);
        this.findProductList({'offset':this.page,'limit':this.limit});
      },
      addNewProduct(){
        this.$store.dispatch("checkIndex2Action",'2-3');
        this.$router.push('/ProductUpdate')
      },
      checkProductItem(productId){
        if(!this.input_Id){//输入框为空提示
          this.findProductList({'offset':this.page,'limit':this.limit});
          return false;
        }
          this.axios.get('/v1/merchant/goods/'+productId,{
          headers:{
            "Authorization":"Bearer "+ getCookie('token')
          }
        }).then((res)=>{
          let list = res.data.data;
          console.log(res.data.message);
          console.log(res.data);
         if(res.data.code==20501){
            this.showPading =false;
            this.totalProduct=0;
            this.productList=[];
          }else{
            this.productList=[];
            this.totalProduct=1;
           this.showPading =false;
            this.productList.push(list);
          }
        }).catch((err)=>{
          console.log(err)
        })
      },
      findProductBySubSort(){
        let mainSortId=sessionStorage.getItem("main_sort_id");
        let subSortId=sessionStorage.getItem("sub_sort_id");
        this.axios.get('/v1/merchant/goods/?offset=1&limit=2&mid='+mainSortId+'&sid='+subSortId,{
          headers:{
            "Authorization":"Bearer "+ getCookie('token')
          }
        }).then((res)=>{
          let data = res.data.data;
        }).catch((err)=>{
          console.log(err);
        })
      },
      beforeAvatarUpload(file) {//图片上传的处理
        let windowURL = window.URL || window.webkitURL;
        console.log(windowURL.createObjectURL(file));
        this.goods_data.goods_photo= windowURL.createObjectURL(file);
//        this.productFormData.append('goods_photo');
        this.updateFormData.append('goods_photo',file);
        this.change_photo=true;
        return false;
      },
      checkGoodsItem(item){//查看商品
        this.dialogFormVisible=true;
        this.goods_data=item;

      },
      changeGoods(){ //修改商品
        if(!this.updateFormData.get('goods_photo')){//判断图片是否修改
          this.updateFormData.append('goods_photo',this.goods_data.goods_photo);
        }

        if(!this.goods_data.is_fare && this.goods_data.goods_fare==''){  //判断运费是否免费滑块的选择状态
          this.$message.error("请填写运费！");
          return false;
        }else if(!this.goods_data.is_fare && !this.goods_data.goods_fare==''){
          this.updateFormData.append("goods_fare",this.goods_data.goods_fare.toString());
        }else if(this.is_fare){
          this.updateFormData.append("goods_fare",'0');
        }
        this.updateFormData.append("goods_name",this.goods_data.goods_name.toString());
        this.updateFormData.append("goods_desc",this.goods_data.goods_desc.toString());
        this.updateFormData.append("goods_cost",this.goods_data.goods_cost.toString());
        this.updateFormData.append("goods_price",this.goods_data.goods_price.toString());
        this.updateFormData.append("goods_discount",this.goods_data.goods_discount.toString());
        this.updateFormData.append("goods_stock",this.goods_data.goods_stock.toString());
        this.updateFormData.append("stock_warn",this.goods_data.stock_warn.toString());
        this.updateFormData.append("goods_people",this.goods_data.goods_people.toString());
        this.updateFormData.append("group_aging",this.goods_data.group_aging.toString());
        this.updateFormData.append("shop_id",sessionStorage.getItem("shopId").toString());
        this.updateFormData.append("mainsort_id",this.goods_data.mainsort_id.toString());
        this.updateFormData.append("subsort_id",this.goods_data.subsort_id.toString());
        this.updateFormData.append("is_fare",this.goods_data.is_fare.toString());
        this.updateFormData.append('change_photo',this.change_photo.toString());

        this.axios.put('/v1/merchant/goods/'+this.goods_data.id,this.updateFormData,{
          headers:{
            'Content-Type': 'multipart/form-data',
            "Authorization":"Bearer "+ getCookie('token')
          }
        }).then((res)=>{
          if(res.data.message=="OK"){
            this.$message({
              message:'修改成功',
              type:'success'
            });
            setTimeout(function () {
              window.location.reload()
            },1500);

          }
        }).catch((err)=>{
          console.log(err);
        })
      },
      deleteProduct(item){
        this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.delete('/v1/merchant/goods/'+item.id,{
            headers:{
              "Authorization":"Bearer "+ getCookie('token')
            }
          }).then((res)=>{
            if(res.data.message=='OK'){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              setTimeout(function () {
                window.location.reload();
              },1500);
            }else{
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            }
          }).catch((err)=>{
            console.log(err);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      putAway(item){//改变商品上架状态
        let isShelf = new FormData();
        isShelf.append('is_shelf',item.is_shelf);
        this.axios.put('/v1/merchant/goodsforshelf/'+item.id,isShelf,{
          headers:{
            'Content-Type': 'multipart/form-data',
            "Authorization":"Bearer "+ getCookie('token')
          }
        }).then((res)=>{
          let result = res.data.message;
          if(result=='OK'){
            this.$message({
              message:"修改状态成功！！！",
              type:'success',
              duration:2000
            })
          }
        }).catch((err)=>{
          console.log(err);
        })
      }
    }
  }
</script>
