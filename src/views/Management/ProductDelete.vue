<template>
  <div>
    <div class="bread_crumbs">
      <span>商品管理&nbsp;<i class="present">--&nbsp;商品删除</i></span>
    </div>
    <div class="product_delete">
      <el-input placeholder="商品ID/商品关键字" class="input-with-select" size="mini">
        <el-button slot="append" icon="el-icon-search"  size="mini"></el-button>
      </el-input>
      <el-tabs tab-position="left" style=""  v-model="activeName">
        <el-tab-pane label="一级删除" name="1">
          <table>
            <thead>
            <tr>
              <th class="">所属级别</th>
              <th class="">标签ID</th>
              <th class="">分类标签名称</th>
              <th class="">下级标签数量</th>
              <th class="">商品总数量</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) of mainSort" :key="index">
              <td>1级</td>
              <td>{{item.main_category.id}}</td>
              <td>{{item.main_category.sort}}</td>
              <td>{{item.sub_count}}</td>
              <td>300</td>
              <td><el-button type="warning" plain size="mini" @click="deleteMainSort(item)">点击删除</el-button></td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
              <td colspan="6" style="text-align: right">
                <el-pagination class="divide_page"
                  background
                  layout="prev, pager, next"
                  :total="totalMainSort"
                  :page-size="limit"
                  @current-change="pageChange1"
                  @prev-click="preClick1"
                  @next-click="nextClick1">
                </el-pagination>
              </td>
            </tr>
            </tfoot>
          </table>
        </el-tab-pane>
        <el-tab-pane label="二级删除" name="2">
          <table>
            <thead>
            <tr>
              <th class="">所属级别</th>
              <th class="">标签ID</th>
              <th class="">分类标签名称</th>
              <th class="">所属上级标签</th>
              <th class="">商品总类别</th>
              <th class="">商品总数量</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) of subSort" :key="index">
              <td>2级</td>
              <td>{{item.id}}</td>
              <td>{{item.sort}}</td>
              <td>
                <span v-for="(item1,index1) of mainSort">
                  <span v-if="item1.main_category.id==item.pid">{{item1.main_category.sort}}</span>
                </span>
              </td>
              <td>5</td>
              <td>300</td>
              <td><el-button type="warning" plain size="mini" @click="deleteSubSort(item)">点击删除</el-button></td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
              <td colspan="7" style="text-align: right">
                <el-pagination class="divide_page"
                  background
                  layout="prev, pager, next"
                  :total="totalSubsSort"
                  :page-size="limit"
                  @current-change="pageChange2"
                  @prev-click="preClick2"
                  @next-click="nextClick2">
                </el-pagination>
              </td>
            </tr>
            </tfoot>
          </table>
        </el-tab-pane>
        <el-tab-pane label="单一商品删除" name="3">
          <table class="single_product">
            <thead>
            <tr>
              <th class="">商品编号</th>
              <th class="">商品名称</th>
              <th class="">商品价格</th>
              <th class="">所属商品标签</th>
              <th class="">库存</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) of singleGoodsList" :key="index">
              <td>{{item.id}}</td>
              <td>
                <a href="javascript:void(0)">{{item.goods_name}}</a>
              </td>
              <td>{{item.goods_price}}</td>
              <td>
                <i v-for="(item1,index1) of mainSort">
                  <i v-if="item1.main_category.id==item.mainsort_id">{{item1.main_category.sort}}</i>
                </i>
                >
                <i v-for="(item2,index2) of subSort" >
                  <i v-if="item2.id==item.subsort_id">{{item2.sort}}</i>
                </i>
              </td>
              <td>{{item.goods_stock}}</td>
              <td><el-button type="warning" plain size="mini" @click="deleteProduct(item)">点击删除</el-button></td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
              <td colspan="6" style="text-align: right;">
                <el-pagination class="divide_page"
                  background
                  layout="prev, pager, next"
                  :total="totalProduct"
                  :page-size="limit"
                  @current-change="pageChange3"
                  @prev-click="preClick3"
                  @next-click="nextClick3">
                </el-pagination>
              </td>
            </tr>
            </tfoot>
          </table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<style>
</style>
<script>
  import {getCookie} from "@/common/auth";
  export default {
    data() {
      return {
        msg: '商品删除',
        activeName:'1',
        limit:6,
        totalMainSort:0,
        totalSubsSort:0,
        totalProduct:0,
        presentPage1:1,
        presentPage2:1,
        presentPage3:1,
        page1:'1',
        page2:'1',
        page3:'1',
        mainSort:[],
        mainSort1:[],
        subSort:[],
        subSort1:[],
        singleGoodsList:[]
      }
    },
    mounted(){
      this.findMainSort();
      this.findSubSort();
      this.findGoodsList();
    },
    methods:{
      findMainSort(){
        //        查询所有主类别标签
        this.axios.get('/v1/merchant/mainsort/subcount',{
          headers:{
            "Authorization":"Bearer "+ getCookie('token')
          }
        }).then((res)=>{
          let data =res.data.data;
          this.totalMainSort=data.totalCount;
          this.mainSort1 = data.categoryList;
          this.mainSort=this.mainSort1.slice(this.limit*(this.page2-1),this.limit*this.page2);
        }).catch((err)=>{
          console.log(err);
        });
      },
      pageChange1(val){
//        console.log(`当前页: ${val}`);
        this.page1=parseInt(val);
        this.mainSort=this.mainSort1.slice(this.limit*(val-1),this.limit*val);
      },
      preClick1(val){
//        console.log(`上一页: ${val}`);
        this.page1=parseInt(val);
        this.mainSort=this.mainSort1.slice(this.limit*(val-1),this.limit*val);
      },
      nextClick1(val){
//        console.log(`下一页: ${val}`);
        this.page1=parseInt(val);
        this.mainSort=this.mainSort1.slice(this.limit*(val-1),this.limit*val);
      },
      findSubSort(){
        //        查询所有子类别标签
        this.axios.get('/v1/merchant/suball',{
          headers:{
            "Authorization":"Bearer "+ getCookie('token')
          }
        }).then((res)=>{
          let data = res.data.data;
          this.subSort1 = [];
          this.subSort1=data.categoryList;
          this.totalSubsSort=this.subSort1.length;
          this.subSort=this.subSort1.slice(this.limit*(this.page2-1),this.limit*this.page2);
          if(this.totalProduct2<=this.limit){//当数据总数超过一页限制条数的时候显示分页栏
//            this.showPading2=false;
          }else{
//            this.showPading2=true;
          }
        }).catch((err)=>{
          console.log(err);
        });
      },
      pageChange2(val){
//        console.log(`当前页: ${val}`);
        this.page2=parseInt(val);
        this.subSort=this.subSort1.slice(this.limit*(val-1),this.limit*val);
      },
      preClick2(val){
//        console.log(`上一页: ${val}`);
        this.page2=parseInt(val);
        this.subSort=this.subSort1.slice(this.limit*(val-1),this.limit*val);
      },
      nextClick2(val){
//        console.log(`下一页: ${val}`);
        this.page2=parseInt(val);
        this.subSort=this.subSort.slice(this.limit*(val-1),this.limit*val);
      },
      findGoodsList(){
//        分页查询所有商品
        this.axios.get('/v1/merchant/goods/?offset='+this.page3+'&limit='+this.limit+'&mid='+sessionStorage.getItem('shopId'),{
          headers:{
            "Authorization":"Bearer "+ getCookie('token')
          }
        }).then((res)=>{
          let data = res.data.data;
          this.singleGoodsList=data.goodsList;
          this.totalProduct=data.totalCount;
        }).catch((err)=>{
          console.log(err);
        })
      },
      pageChange3(val){
//        console.log(`当前页: ${val}`);
        this.page3=parseInt(val);
        this.findGoodsList();
      },
      preClick3(val){
//        console.log(`上一页: ${val}`);
        this.page3=parseInt(val);
        this.findGoodsList();
      },
      nextClick3(val){
//        console.log(`下一页: ${val}`);
        this.page3=parseInt(val);
        this.findGoodsList();
      },
      deleteMainSort(item){//删除主类别下所有商品
        this.$confirm('此操作将删除该类别下的所有商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.delete('/v1/merchant/goodsbymain/?merid='+sessionStorage.getItem("shopId")+'&mid='+item.main_category.id,{
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
      deleteSubSort(item){//删除子类别下所有商品
        this.$confirm('此操作将删除该类别下的所有商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.delete('/v1/merchant/goodsbymain/?merid='+sessionStorage.getItem("shopId")+'&mid='+item.id,{
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
      deleteProduct(item){ //删除单一商品
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
      }
    }
  }
</script>
