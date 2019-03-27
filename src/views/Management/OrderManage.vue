<template>
    <div class="order_list">
      <div class="bread_crumbs">
        <span>订单管理&nbsp;--&nbsp;<i class="present">订单列表</i></span>
      </div>
      <div class="grid-content bg-purple">
        <!--选卡-->
        <template>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部订单" name="全部订单">
              <template slot-scope="scope">
                <div>全部订单</div>
              </template>
            </el-tab-pane>
            <el-tab-pane label="待发货" name="待发货">
              <template slot-scope="scope">
                <div>待发货</div>
              </template>
            </el-tab-pane>
            <el-tab-pane label="已发货" name="已发货">
              <template slot-scope="scope">
                <div>已发货</div>
              </template>
            </el-tab-pane>
            <el-tab-pane label="已完成" name="已完成">
              <template slot-scope="scope">
                <div>已完成</div>
              </template>
            </el-tab-pane>
            <el-tab-pane label="审核退款" name="正退款">
              <template slot-scope="scope">
                <div>正退款</div>
              </template>
            </el-tab-pane>
            <el-tab-pane label="已退款" name="已退款">
              <template slot-scope="scope">
                <div>已退款</div>
              </template>
            </el-tab-pane>
          </el-tabs>
        </template>
        <!--工具条-->
        <div class="order-search" style="margin: 30px 0">
          <el-row>
            <el-col :span="24">
              <el-input v-model="orderId" placeholder="请输入订单ID" class="input-with-select" size="mini">
                <el-button slot="append" icon="el-icon-search"  size="mini" style="" @click="findOrderItem(orderId)"></el-button>
              </el-input>
            </el-col>
          </el-row>
          <el-button size="mini" class="add_coupon" @click="backCoupon" v-if="isBack==true"><img src="/static/back.png"/>订单列表</el-button>
        </div>
      </div>
      <!--列表-->
      <div class="lists">
        <table>
          <thead>
          <tr>
            <th class="">ID</th>
            <th class="">订单号</th>
            <th class="">时间</th>
            <th>实付款</th>
            <th>地址</th>
            <th>买家留言</th>
            <th>交易状态</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <order-item v-for="(item,index) of orderList" :key="index" :orderList="item" :index="index"></order-item>
          </tbody>
          <tfoot>
          <tr>
            <td colspan="8" v-if="orderList.length==0">
              <el-alert
                style="width: 100%"
                title="当前没有数据"
                type="info"
                center
                :closable="false"
                show-icon>
              </el-alert>
            </td>
            <td colspan="8" v-if="orderList.length!=0" style="position: relative">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="totalOrder"
                :page-size="limit"
                :current-page="page"
                @current-change="pageChange"
                @prev-click="preClick"
                @next-click="nextClick"
              >
              </el-pagination>
            </td>
          </tr>
          </tfoot>
        </table>
      </div>
    </div>
</template>
<script>
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import OrderItem from "@/views/Management/OrderItem";
  import {getCookie} from "@/common/auth";
    export default {
      components: {ElCol,ElRow,OrderItem},
        data() {
          return {
            msg: '订单管理',
            value: 35,
            orderId: '',
            activeName: "全部订单",  // 默认选卡
            orderList: [],
            dataList: [],
            isBack: false,
            page:1,
            limit:6,
            totalOrder:0,
            showPading:false,
          }
        },
      mounted(){
        this.getAllOrder({'offset':this.page,'limit':this.limit});
      },
      methods:{
        //点击选项卡
        handleClick(tab, event,) {
          console.log('点击' + tab.name);
          let urlStr = '/OrderManage?orderType=' + tab.name;
          this.$router.push(urlStr);
          if(tab.name=='全部订单'){
            this.orderList = this.dataList;
          }else {
            this.orderList = [];
            this.dataList.forEach((item) => {
              if (item.order_status == (tab.name)) {
                this.orderList.push(item);
              }
              if(item.order_status == '已支付'&&tab.name == '待发货'){
                this.orderList.push(item);
              }
            })
          }
        },
        //页3个事件
        pageChange(val){
//        console.log(`当前页: ${val}`);
          this.page=parseInt(val);
          sessionStorage.setItem("order_page",this.page);
          this.getAllOrder({'offset':this.page,'limit':this.limit});
        },
        preClick(val){
//        console.log(`上一页: ${val}`);
          this.page=parseInt(val);
          sessionStorage.setItem("order_page",this.page);
          this.getAllOrder({'offset':this.page,'limit':this.limit});
        },
        nextClick(val){
//        console.log(`下一页: ${val}`);
          this.page=parseInt(val);
          sessionStorage.setItem("order_page",this.page);
          this.getAllOrder({'offset':this.page,'limit':this.limit});
        },
        //获取数据
        getAllOrder(params){
          var urlStr='/v1/merchant/orderlistbymerchant/?offset='+params.offset+'&limit='+params.limit+'&mid='
              +sessionStorage.getItem("shopId");
          this.axios.get(urlStr,{
            headers:{
              "Authorization":"Bearer "+ getCookie('token')
            }
          }).then((res)=>{
            let data = res.data.data;
            this.orderList=data.ordersList;
            this.dataList=data.ordersList;
            //格式化时间
            this.orderList.forEach(function (item) {
              let time=item.createdAt;
              var date = new Date(time).toJSON();
              item.createdAt= new Date(+new Date(date)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
              let time1=item.payedAt;
              var date1 = new Date(time1).toJSON();
              item.payedAt= new Date(+new Date(date1)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
            });
            this.totalOrder = data.totalCount;//保存总条数
            if(data.totalCount<=this.limit){//分页栏是否显示
              this.showPading=false;
            }else{
              this.showPading=true;
            }
          }).catch((err)=>{
            console.log(err);
          })
        },
        //搜索
        findOrderItem(order_Id){
          if(!this.orderId){//输入框为空提示
            this.getAllOrder({'offset':this.page,'limit':this.limit});
            this.isBack = false;
            return false;
          }else {
            console.log('order_Id='+order_Id);
            this.axios.get('/v1/merchant/orders/'+order_Id,{
              headers:{
                "Authorization":"Bearer "+ getCookie('token')
              }
            }).then((res)=>{
              let list = res.data.data;
              console.log(res.data.message);
              console.log(res.data);
              if(res.data.code==20501){
                this.showPading =false;
                this.totalOrder=0;
                this.orderList=[];
              }else{
                this.orderList=[];
                this.totalOrder=1;
                this.showPading =false;
                this.orderList.push(list);
              }
            }).catch((err)=>{
              console.log(err)
            });
            this.isBack = true;
          }
        },
        //返回列表
        backCoupon(){
          this.$router.push('/OrderManage');
          this.getAllOrder({'offset':this.page,'limit':this.limit});
          this.isBack = false;
        },
      }
    }
</script>
<style>
  /* 工具条 */
  .order-search .add_coupon{
    border-radius: 5px;
    border:1px solid #409EFF;
    color: #409EFF;
    position: absolute;
    top: 0px;
    right: -370%;
    z-index: 1;
    height: 28px;
  }
  .order-search .add_coupon img{vertical-align: middle;  margin-right: 3px;padding-top: -15px}
  .order_list{padding-right: 40px;margin-bottom: 50px}
  .order_list .bg-purple {
    position: relative;
  }

  .order_list .order-search {
    position: absolute;
    top: 15px;
    z-index: 1;
  }
  .order_list .el-input .el-button{
    border-radius: 0 3px 3px 0;
    color: #fff !important;
    background-color: #409eff !important;
    border:1px solid #409eff !important;
  }
  .order_list .lists table{border:1px solid #DDD;width: 100%;border-collapse: collapse;margin-top: 25px}
  .order_list .lists table thead{
    border-bottom: 1px solid #ddd;
    vertical-align: middle;font-size: 13px;line-height: 40px;
    background: #e5e5e5; font-weight: bold;;opacity: 0.7;
  }
  .order_list .lists table thead th:last-child{border-right: 1px solid #ddd !important;}
  .order_list .lists table tbody{
    font-size:13px ;color:gray;text-align: center;
  }
  .order_list .lists table tfoot tr td{padding: 10px 0 !important;height: 22px}
  .order_list .lists table tfoot .el-pagination{
    position: absolute;right: 0;
    top: 5px;
  }
</style>
