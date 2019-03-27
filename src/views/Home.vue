<template>
  <div class="shop_home">
    <el-row>
      <el-col :span="14">
        <div class="shop_intro">
          <el-row>
            <el-col :span="5">
              <div><img :src="shopdata.shop_logo"></div>
            </el-col>
            <el-col :span="19">
              <p style="font-size: 16px;color: #F56C6C;font-family: microsoft yahei">{{shopdata.shop_name}}</p>
              <span>商家名：<span class="mes">{{shopowner.username}}</span></span>
              <span>开店时间：<span class="mes">{{shopdata.createdAt}}</span></span><br/>
              <span>管理权限：<span class="mes">管理员</span></span>
            </el-col>
          </el-row>
          <ul class="ul_one">
            <li><a href="javascript:void(0)">待处理订单(0)</a></li>
            <li><a href="javascript:void(0)">退换货订单(0)</a></li>
            <li><a href="javascript:void(0)">待商品回复咨询(0)</a></li>
            <li><a href="javascript:void(0)">系统消息(0)</a></li>
          </ul>
        </div>
      </el-col>
      <el-col :span="10" class="shop_score">
        <div>店铺评分</div>
        <div>
          <span>描述相符：</span><el-rate
          v-model="value"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}">
        </el-rate>
        </div>
        <div>
          <span>服务态度：</span><el-rate
          v-model="value"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}">
        </el-rate>
        </div>
        <div>
          <span>物流速度：</span><el-rate
          v-model="value"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}">
        </el-rate>
        </div>
      </el-col>
    </el-row>
    <div style="display:inline-block;width: 100% ">
      <div class="product_tag">
        <div>
          <div>店铺商品标签类别</div>
          <ul class="tag_none" v-if="!sortexit">
            <li style="width: 100%;border:none;text-align: center">
              <el-alert title="当前店铺还没有商品标签哦 请前往添加！" type="info" center show-icon  :closable="false"></el-alert>
            </li>
          </ul>
          <ul>
            <li v-for="(item,index) of sortdata" :key="index" @click="findSubSort(item)">
              <a href="javascript:void(0)">{{item.main_category.sort}}
                <em>({{item.sub_count}})</em></a>
            </li>
          </ul>
        </div>
        <div class="shop_deal">
          <div>交易提示</div>
          <ul class="deal_hint">
            <li><a href="javascript:void(0)">待确定<em>(10)</em></a></li>
            <li><a href="javascript:void(0)">待付款<em>(10)</em></a></li>
            <li><a href="javascript:void(0)">待发货<em>(10)</em></a></li>
            <li><a href="javascript:void(0)">已发货<em>(10)</em></a></li>
            <li><a href="javascript:void(0)">已完成<em>(10)</em></a></li>
            <li><a href="javascript:void(0)">待评价<em>(10)</em></a></li>
          </ul>
        </div>
        <div class="shop_deal_data">
          <div>店铺日交易数据<i></i></div>
          <ul class="deal_data">
            <li>今日成交金额<p>0</p></li>
            <li>今日订单数<p>0</p></li>
            <li>今日客单价<p>0</p></li>
            <li>昨日成交金额<p>0</p></li>
            <li>昨日订单数<p>0</p></li>
            <li>昨日客单价<p>0</p></li>
          </ul>
        </div>
      </div>
      <div class="shop_contact">
        <div>
          <div>联系方式</div>
          <ul>
            <li>电话：{{shopdata.shop_phone}}</li>
            <li>qq：{{shopdata.shop_qq}}</li>
            <li class="address">
              <span>地址：</span><em>{{shopdata.shop_addr}}</em>
            </li>
          </ul>
        </div>
        <div class="shop_introduction">
          <div>店铺简介</div>
          <p>
            <em>{{shopdata.shop_name}}</em>是一家{{shopdata.shop_intro}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
</style>
<script>
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import { getCookie } from '../common/auth';

  export default {
    props:['shopowner'],
    components: {
      ElCol,
      ElRow},
    data() {
      return {
        msg: 'hello world',
        value: 3.7,
        shopdata:[],
        sortdata:[],
        sortexit:false,
      }
    },
    mounted(){
      this.findShopMes();
      this.findMainSort();
//      this.findShopOwner();
//      this.userId=getCookie('name')
    },
    methods:{
      findMainSort(){
        this.axios.get('/v1/merchant/mainsort/subcount',
          {
            headers:{
//            "Authorization":"Bearer "+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDUxMDM4MTMsImlkIjo1LCJuYmYiOjE1NDUxMDM4MTMsInJvbGVpZCI6MiwidXNlcm5hbWUiOiIxMzQyMDEyMDc1MCJ9.jyqnBoIL7YMLAXcwZMvPaxUVYdM1cep6y3w4i99dQOY'
              "Authorization":"Bearer "+ getCookie("token")
            }
          }).then((response)=>{
          let data = response.data.data.categoryList;
          this.sortdata=data;
          console.log(data+"gg")
        }).catch((err)=>{
          console.log(err+"haha");
        })
      },
      findShopMes(){
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
          this.shopdata.shop_logo = "http://www.jianlinker.cn/"+this.shopdata.shop_logo;
          let time=this.shopdata.createdAt;//格式化时间
          var date = new Date(time).toJSON();
          this.shopdata.createdAt= new Date(+new Date(date)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
          console.log(data+getCookie('id'));

          sessionStorage.setItem('shopId',this.shopdata.id);//保存店铺ID
        }).catch((err)=>{
          console.log(err+"heihei");
        })
      },
      findSubSort(item){
        let sortId= item.main_category.id;
        sessionStorage.removeItem("main_sort_id");
        sessionStorage.setItem("main_sort_id",sortId);
        this.$store.dispatch("checkIndexAction",'2');
        this.$store.dispatch("checkIndex2Action",'2-2');
        this.$router.push("/ProductSort?check_next="+sortId);
        window.location.reload()
      }
    }
  }
</script>
