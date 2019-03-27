<template>
  <div class="product_sort">
    <div class="bread_crumbs">
      <span>
        商品管理&nbsp;<i :class="[$route.query.add_label || $route.query.check_next ? '':'present']">--&nbsp;商品分类</i>
        <i v-if="$route.query.add_label==0" class="present">&nbsp;--&nbsp;添加分类</i>
        <i v-if="$route.query.add_label>0" class="present">&nbsp;--&nbsp;添加二级分类</i>
        <i v-if="$route.query.check_next" class="present">&nbsp;--&nbsp;商品二级分类</i>
      </span>
    </div>
    <div class="sort_list" v-if="$route.query.add_label==null && $route.query.check_next==null">
      <div><el-button size="small" @click="addLabel"><i class="el-icon-plus"></i>添加分类标签</el-button></div>
      <table>
        <thead>
        <tr>
          <th class="">所属级别</th>
          <th class="">标签ID</th>
          <th class="">分类标签名称</th>
          <th class="">下级标签数量</th>
          <th>设置</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) of sortpage">
          <td><i>1级</i></td>
          <td>{{item.main_category.id}}</td>
          <td>{{item.main_category.sort}}</td>
          <td>{{item.sub_count}}</td>
          <td>
            <div style="margin-bottom: 8px">
              <el-button type="primary" size="mini" @click="checkNextLevel(item,1,index)">查看下一级</el-button>
            </div>
            <div><el-button type="info" size="mini" @click="addNextLevel(item,index)">添加下一级</el-button></div>
          </td>
          <td>
            <div style="margin-bottom: 8px">
              <el-button type="success" size="mini">修改<i class="el-icon-edit"></i></el-button>
            </div>
            <div>
              <el-button size="mini" @click="deleteMainSort(item)">删除<i class="el-icon-delete"></i></el-button>
            </div>
          </td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td colspan="24" v-if="totalProduct==0 || noneProduct">
            <el-alert
              style="width: 100%"
              title="当前没有数据"
              type="info"
              center
              :closable="false"
              show-icon>
            </el-alert>
          </td>
        </tr>
        </tfoot>
      </table>
      <div style="margin-bottom: 50px">
        <el-pagination
        background
        layout="prev, pager, next"
        :total="totalProduct"
        :page-size="limit"
        :current-page="presentPage1"
        @current-change="pageChange"
        @prev-click="preClick"
        @next-click="nextClick"
        v-if="showPading"
        >
        </el-pagination>
      </div>
    </div>
    <div v-if="$route.query.add_label>=0" class="add_label">
      <div><el-button size="small" @click="$router.push('/ProductSort')"><img src="/static/back.png"></img>返回商品分类</el-button></div>
      <el-form :model="ruleForm" ref="ruleForm" label-width="150px" class="demo-ruleForm">
        <!--<el-form-item label="新增一级标签" prop="addLevelOne">-->
          <!--<el-input v-model="ruleForm.addLevelOne" placeholder="请输入新增标签名称"-->
                    <!--class="input-with-select" style="width: 40%" :disabled="$route.query.add_label>0">-->
          <!--</el-input><span class="caution">*(如已有需要的一级标签，无需再添加)</span>-->
        <!--</el-form-item>-->
        <el-form-item label="一级商品标签" prop="LevelOneLabel" required>
          <el-select v-model="ruleForm.LevelOneLabel" clearable  placeholder="选择一级标签">
            <el-option label="电子产品" value="生活用品"></el-option>
            <el-option label="家具电器" value="家具电器"></el-option>
            <el-option label="零食" value="零食"></el-option>
            <el-option label="服装衣服" value="服装衣服"></el-option>
            <el-option label="学习提升" value="学习提升"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="查看二级商品标签" prop="LevelTwoLabel">
          <el-select v-model="ruleForm.LevelTwoLabel" clearable placeholder="查看二级标签">
            <el-option disabled label="生活用品" value="生活用品"></el-option>
            <el-option disabled label="家具电器" value="家具电器"></el-option>
            <el-option disabled label="零食" value="零食"></el-option>
            <el-option disabled label="服装衣服" value="服装衣服"></el-option>
            <el-option disabled label="学习提升" value="学习提升"></el-option>
          </el-select><span class="caution">*(可查看一级标签下有哪些已经存在的二级标签)</span>
        </el-form-item>
        <el-form-item label="新增二级标签" prop="addLevelTwo">
          <el-input placeholder="请输入新增标签名称" v-model="ruleForm.addLevelTwo" class="input-with-select"  style="width: 40%">
          </el-input><span  class="caution">*(如已有需要的二级标签，无需再添加)</span>
        </el-form-item>
        <el-form-item label="标签描述" prop="sortDesc">
          <el-input type="textarea" v-model="ruleForm.sortDesc" :rows="4" style="width: 40%;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="levelTwo" v-if="$route.query.check_next>=0">
      <div>
        <el-button size="small" @click="backLastLevel"><img src="/static/back.png"/>返回上一级</el-button>
        <el-button size="small" @click="addLabel"><i class="el-icon-plus"></i>添加分类标签</el-button>
      </div>
      <table>
        <thead>
        <tr>
          <th class="">所属级别</th>
          <th class="">分类标签名称</th>
          <th class="">所属上级标签</th>
          <th class="">商品总类别</th>
          <th class="">商品总数量</th>
          <th>查看商品</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) of sortlist2" :key="index">
          <td>2级</td>
          <td>{{item.sort}}</td>
          <td>
            {{mainSortName}}
          </td>
          <td>5</td>
          <td>250</td>
          <td>
            <el-button type="primary" size="mini" @click="checkGoods(item)">查看</el-button>
          </td>
          <td>
            <div style="margin-bottom: 8px">
              <el-button type="success" size="mini">修改<i class="el-icon-edit"></i></el-button>
            </div>
            <div>
              <el-button size="mini" @click="deleteSubSort(item)">删除<i class="el-icon-delete"></i></el-button>
            </div>
          </td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td colspan="24" v-if="totalProduct2==0 || noneProduct" style="padding:20px 0 !important; ">
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
          <td colspan="9" style="padding:20px 0 !important;text-align: right ">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="totalProduct2"
              :page-size="limit"
              :current-page="presentPage2"
              @current-change="pageChange2"
              @prev-click="preClick2"
              @next-click="nextClick2"
              v-if="showPading2"
            >
            </el-pagination>
          </td>
        </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>
<style>
  .add_btn:hover{
    color:#409EFF !important;
  }
  textarea{resize: none !important;}
</style>
<script>
  import {getCookie} from "@/common/auth";
  export default {
    data() {
      return {
        msg: '商品分类',
        add_label:null,
        allProductNumArray:[],
        totalProduct:0,
        totalProduct2:0,
        page:1,
        presentPage1:1,
        presentPage2:1,
        limit:6,
        showPading:false,
        showPading2:false,
        noneProduct:false,
        sortlist:[],
        sortlist2:[],
        sortpage:[],
        ruleForm: {
          LevelOneLabel: '',
          LevelTwoLabel: '',
          addLevelTwo: '',
          sortDesc: ''
        },
        mainSortId:null,
        mainSortName:''
      }
    },
    mounted() {
      this.findAllMainSort();
      if(sessionStorage.getItem("present_page1")){
        this.presentPage1=parseInt(sessionStorage.getItem("present_page1"));
      }else{
        this.presentPage1=1;
      }

      if(this.$route.query.check_next){
        if(sessionStorage.getItem("present_page2")){
          this.presentPage2=parseInt(sessionStorage.getItem("present_page2"));
          this.checkNextLevel({'main_category':{id:sessionStorage.getItem("main_sort_id")}},sessionStorage.getItem("present_page2"),0);
        }else{
          this.checkNextLevel({'main_category':{id:sessionStorage.getItem("main_sort_id")}},1,0);
        }
      }

    },
    methods:{
      findAllMainSort(){
        this.axios.get('/v1/merchant/mainsort/subcount',{
          headers:{
            "Authorization":"Bearer "+ getCookie('token')
          }
        }).then((res)=>{
          let data =res.data.data;
          this.sortlist=[];
          this.sortlist =data.categoryList;
          this.sortpage=[];
//          this.sortpage=this.sortlist.slice(0,this.limit);
          this.sortpage=this.sortlist.slice(this.limit*(this.presentPage1-1),this.limit*this.presentPage1);
          this.totalProduct=data.totalCount;
          if(this.totalProduct<=this.limit){//当数据总数超过一页限制条数的时候显示分页栏
            this.showPading=false;
          }else{
            this.showPading=true;
          }
          console.log(this.totalProduct);
        }).catch((err)=>{
          console.log(err)
        })
      },
      pageChange(val){
//        console.log(`当前页: ${val}`);
        this.presentPage1=parseInt(val);
        sessionStorage.setItem("present_page1",this.presentPage1);
        this.sortpage=this.sortlist.slice(this.limit*(val-1),this.limit*val);
      },
      preClick(val){
//        console.log(`上一页: ${val}`);
        this.presentPage1=parseInt(val);
        sessionStorage.setItem("present_page1",this.presentPage1);
        this.sortpage=this.sortlist.slice(this.limit*(val-1),this.limit*val);
      },
      nextClick(val){
//        console.log(`下一页: ${val}`);
        this.presentPage1=parseInt(val);
        sessionStorage.setItem("present_page1",this.presentPage1);
        this.sortpage=this.sortlist.slice(this.limit*(val-1),this.limit*val);
      },
      addLabel(){
        this.add_label=0;
        this.$router.push({
          path:"/ProductSort",
          query:{
            add_label:this.add_label
          }
        });
      },
      submitForm(formName) {
        console.log(this.$refs[formName]);
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      addNextLevel(item,index){
        this.$router.push({
          path:'/ProductSort',
          query:{
            add_label:index+1,
          }
        });
        this.ruleForm.LevelOneLabel=item.levelOneLabel;
      },
      checkNextLevel(item,key,index){
        this.mainSortId=item.main_category.id;
        this.mainSortName=item.main_category.sort;
        sessionStorage.setItem("main_sort_id",this.mainSortId);
        this.axios.get('/v1/merchant/subsort/?offset='+key+'&limit='+this.limit+'&pid='+this.mainSortId,{
          headers:{
            "Authorization":"Bearer "+ getCookie('token')
          }
        }).then((res)=>{
          let data = res.data.data;
          this.sortlist2 = [];
          this.sortlist2=data.categoryList;
          this.totalProduct2=data.totalCount;
          if(this.totalProduct2<=this.limit){//当数据总数超过一页限制条数的时候显示分页栏
            this.showPading2=false;
          }else{
            this.showPading2=true;
          }
        }).catch((err)=>{
          console.log(err);
        });
        this.$router.push({
          path:'/ProductSort',
          query:{
            check_next:item.main_category.id
          }
        })
      },
      pageChange2(val){
        console.log(`当前页: ${val}`);
        this.presentPage2=parseInt(val);
        sessionStorage.setItem("present_page2",this.presentPage2);
        this.checkNextLevel({'main_category':{id:this.mainSortId}},this.presentPage2,0);
      },
      preClick2(val){
        console.log(`上一页: ${val}`);
        this.presentPage2=parseInt(val);
        sessionStorage.setItem("present_page2",this.presentPage2);
        this.checkNextLevel({'main_category':{id:this.mainSortId}},this.presentPage2,0);
      },
      nextClick2(val){
        console.log(`下一页: ${val}`);
        this.presentPage2=parseInt(val);
        sessionStorage.setItem("present_page2",this.presentPage2);
        this.checkNextLevel({'main_category':{id:this.mainSortId}},this.presentPage2,0);
      },
      backLastLevel(){
        this.$router.push('/ProductSort');
        sessionStorage.removeItem("present_page2");
        sessionStorage.setItem("present_page2",1);
        this.presentPage2=parseInt(sessionStorage.getItem("present_page2"));
      },
      checkGoods(item){//根据2级标签查看标签下的所有商品
        sessionStorage.setItem("sub_sort_id",item.id);
        sessionStorage.setItem("goods_page",1);
        this.$store.dispatch("checkIndex2Action",'2-1');
        this.$router.push({
          path:'/ProductList',
          query:{
            findGoods:'true'
          }
        });
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
      }
    }
  }
</script>
