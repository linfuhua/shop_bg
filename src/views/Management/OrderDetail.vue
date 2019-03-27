<template>
    <div class="deliver-goods">
      <div class="bread_crumbs">
        <span>订单管理&nbsp;--&nbsp;<router-link href="javascript:void(0)" to="/OrderManage">订单列表</router-link>&nbsp;--&nbsp;发货信息</span>
      </div>
      <div>
        <table class="order-table">
          <thead>
          <tr>
            <th class="">商品信息</th>
            <th class="">团购价</th>
            <th class="">数量</th>
            <th class="">实付款</th>
            <th>状态</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="" width="34%">
              <div class="bought-form-hd" style="padding-bottom: 5px">
                <span class="bg-span bought-time">{{orderData.createdAt}}</span>
                <span class="bg-span bought-num" style="padding-left: 10px;">订单号：<span>{{orderData.order_num}}</span></span>
              </div>
              <span class="goods_img"><img :src="'http://www.jianlinker.cn/'+goodsData.goods_photo"/></span>
              <div class="goods_title">
                <span><i>{{goodsData.goods_desc}}</i></span>
                <div><span class="goods_class" style="color: #999"><i>颜色分类：{{goodsData.goods_name}}</i></span></div>
              </div>
            </td>
            <td width="6%">￥{{goodsData.goods_price}}</td>
            <td width="6%">{{orderData.order_price/goodsData.goods_price}}</td>
            <td width="14%">￥{{orderData.order_price}}</td>
            <td width="14%">{{orderData.order_status}}</td>
          </tr>
          </tbody>
        </table>
        <table class="infro-table">
          <tbody>
          <tr style="text-align: left;">
            <td style="padding-left: 15px;width: 37%;"><h3>订单信息</h3></td>
            <td rowspan="2" style="width: 577px;">
              <div class="detailBlock">
                <div class="trade-detail-imfor">
                  <span class="imfor-icon"><img src="http://www.jianlinker.cn/../../../static/T1e.aoXuXdXXa94Hfd-32-32.png" style="width: 32px;height: 32px;"></span>
                  <span class="imfor-title">
                    <span class="">
                      <h3>订单状态：<span>{{orderData.order_status}}</span></h3>
                    </span>
                  </span>
                </div>
                <div class="trade-detail-prompt">
                  <div class="dotted-node"><span>&nbsp;</span><span>物流：</span></div>
                  <div class="trade-detail-main">
                    <span class="package-detail">xxxx</span>
                    <span class="package-detail">运单号:</span><span>xxxxxxxxxxx</span>
                    <div class="logistic-detail">
                      <span class="package-detail package-time-detail">xxxx-xx-xx xx:xx:xx</span>
                      <span class="package-detail package-explain-detail"> 快件已被签收,如有问题请联系<span
                        class="span-a">商家客服</span>。相逢是缘,如果您对我的服务感到满意,给个五星好不好?</span>
                    </div>
                  </div>
                </div>
                <div class="trade-detail-operate">
                  <dl>
                    <dt>商品总价：</dt>
                    <dd>￥<span>{{orderData.order_price-goodsData.goods_fare}}</span></dd>
                  </dl>
                  <dl>
                    <dt>运费(快递)：</dt>
                    <dd>￥<span>{{goodsData.goods_fare}}</span></dd>
                  </dl>
                  <dl>
                    <dt>实付款：</dt>
                    <dd>￥<span>{{orderData.order_price}}</span></dd>
                  </dl>
                </div>
              </div>
            </td>
          </tr>
          <tr class="detail-list-tr">
            <td style="">
              <ul>
                <li class="table-list" style="padding-top: 15px;">
                  <div class="trade-imfor-dt" style="vertical-align: top;"><span>收货地址</span><span>：</span></div>
                  <div class="trade-imfor-dd" style="width: 214px;">
                    <span class="ui-trade-label null">{{orderData.client_nick}},{{orderData.client_phone}},{{orderData.order_addr}} ,xxxxxx</span>
                  </div>
                  <span class="trade-imfor-aa" style="margin-left: 10px;" @click="getAddress">修改</span>
                  <!-- 修改地址对话框 -->
                  <el-dialog title="修改收货地址" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                      <el-form-item label="收货人姓名" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off" placeholder="请输入收货人姓名"></el-input>
                      </el-form-item>
                      <br/>
                      <el-form-item label="收货人电话" :label-width="formLabelWidth">
                        <el-input v-model="form.phone" autocomplete="off" placeholder="请输入收货人电话"></el-input>
                      </el-form-item>
                      <br/>
                      <el-form-item label="收货人地址" :label-width="formLabelWidth">
                        <el-input v-model="form.address" autocomplete="off" placeholder="请输入收货人地址"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible = false">取 消</el-button>
                      <el-button type="primary" @click="resetAddress">确认</el-button>
                    </div>
                  </el-dialog>
                </li>
                <li class="table-list">
                  <div class="trade-imfor-dt"><span>买家姓名</span><span>：</span></div>
                  <div class="trade-imfor-dd">
                      <span><span class="middleText">
                        <span class="short-dd-nick" :title="orderData.client_nick">{{orderData.client_nick}}
                          <span class="ww-light ww-small">
                            <a href="#" class="ww-inline ww-online" title="点此可以直接和买家交流">
                              <span>在线联系</span>
                            </a>
                          </span>
                        </span>
                      </span></span>
                  </div>
                </li>
                <li class="table-list">
                  <div class="trade-imfor-dt"><span>联系买家</span><span>：</span></div>
                  <div class="trade-imfor-dd">
                    <span class="ui-trade-label">{{orderData.client_phone}}</span>
                  </div>
                </li>
                <li class="table-list">
                  <div class="trade-imfor-dt"><span>买家留言</span><span>：</span></div>
                  <div class="trade-imfor-dd"><span class="ui-trade-label null">{{orderData.order_mark}}</span></div>
                </li>
                <li class="table-list">
                  <div class="trade-imfor-dt"><span>订单编号</span><span>：</span></div>
                  <div class="trade-imfor-dd"><span class="ui-trade-label middleText">{{orderData.order_num}}</span></div>
                </li>
                <li class="table-list">
                  <div class="trade-imfor-dt"><span>订单时间</span><span>：</span></div>
                  <div class="trade-imfor-dd"><span class="ui-trade-label">{{orderData.createdAt}}</span></div>
                </li>
                <li class="table-list">
                  <div class="trade-imfor-dt"><span>付款方式</span><span>：</span></div>
                  <div class="trade-imfor-dd"><span class="ui-trade-label">{{orderData.pay_method}}</span>/<span class="ui-trade-label">xxxxxxxxxx</span></div>
                </li>
                <li class="table-list">
                  <div class="trade-imfor-dt"><span>付款时间</span><span>：</span></div>
                  <div class="trade-imfor-dd"><span class="ui-trade-label">{{orderData.payedAt}}</span></div>
                </li>
                <li class="table-list">
                  <div class="trade-imfor-dt"><span>更新时间</span><span>：</span></div>
                  <div class="trade-imfor-dd"><span class="ui-trade-label">{{orderData.updatedAt}}</span></div>
                </li>
                <li class="table-list">
                  <div class="trade-imfor-dt"><span>完结时间</span><span>：</span></div>
                  <div class="trade-imfor-dd"><span class="ui-trade-label">{{orderData.finishedAt}}</span></div>
                </li>
              </ul>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>
<script>
  import {getCookie} from "@/common/auth";
    export default {
        data() {
            return {
              msg: 'hello world',
              dialogFormVisible: false,
              form: {
                name: '',
                phone: '',
                address: '',
              },
              formLabelWidth: '120px',
              orderData: '',
              goodsData: '',
            }
        },
      methods: {
        //窗口显示地址
        getAddress(){
          this.dialogFormVisible = true;
          this.form.name = this.orderData.client_nick;
          this.form.phone = this.orderData.client_phone;
          this.form.address = this.orderData.order_addr;
        },
        //修改地址
        resetAddress(){
          console.log('this.orderData.id='+this.orderData.id);
          if(this.form.name==''&&this.form.phone==''&&this.form.address==''){
            this.$message.error('信息输入不完整！');
            return false;
          }else{
            this.axios.put('/v1/merchant/orders/'+this.orderData.id,
              {'client_nick':this.form.name,'client_phone':this.form.phone,'order_addr':this.form.address},{
              headers:{
                'Authorization': 'Bearer '+getCookie("token")
              }
            }).then((res)=>{
              let result = res.data;
              if(result.message=='OK'){
                this.$message({
                  message:'修改地址成功！',
                  type:'success'
                });
                setTimeout(function () {
                  window.location.reload();
                },1500)
              }else{
                this.$message.error("修改地址失败！")
              }
            }).catch((err)=>{
              console.log(err);
            })
          }
        },
        //时间显示格式
        formatTime(item){
          let time = item.createdAt;
          var date = new Date(time).toJSON();
          item.createdAt = new Date(+new Date(date)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');

         let time1 = item.payedAt;
         var date1 = new Date(time1).toJSON();
         item.payedAt = new Date(+new Date(date1)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');

         let time2 = item.finishedAt;
         var date2 = new Date(time2).toJSON();
         item.finishedAt = new Date(+new Date(date2)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');

         let time3 = item.updatedAt;
         var date3 = new Date(time3).toJSON();
         item.updatedAt = new Date(+new Date(date3)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
        },
        //根据id获取详情
        findOrder(item){
          this.axios.get('/v1/merchant/orders/'+item.id,{
            headers:{
              "Authorization":"Bearer "+ getCookie("token")
            }
          }).then((res)=>{
            let data = res.data.data;
            this.orderData = '';
            this.orderData=data;
            this.formatTime(this.orderData);
            this.findGoods(this.orderData);
          }).catch((err)=>{
            console.log(err);
          })
        },
        //根据id获取商品信息
        findGoods(item){
          this.axios.get('/v1/merchant/goods/'+item.goods_id,{
            headers:{
              "Authorization":"Bearer "+ getCookie("token")
            }
          }).then((res)=>{
            let data = res.data.data;
            this.goodsData = '';
            this.goodsData=data;
//            this.goodsData.goods_photo= this.goodsData.goods_photo.toString();
          }).catch((err)=>{
            console.log(err);
          })
        }
      },
      mounted(){
        console.log(this.$route.query.order_num);
        this.findOrder(this.$route.query);
      }
    }
</script>
<style scoped>
  /* 位置 */
  .bread_crumbs span a{
    color: #000 !important;
    text-decoration: none !important;
  }
  .bread_crumbs span a:hover{
    color: #67c23a !important;
    text-decoration: underline !important;
  }
  /* table1 */
  table{border:1px solid #DDD;width: 100%;border-collapse: collapse;margin-top: 25px}
  table thead{
    border-bottom: 1px solid #ddd;
    vertical-align: middle;font-size: 13px;line-height: 40px;
    background: #e5e5e5; font-weight: bold;;opacity: 0.7;
  }
  table thead th:last-child{border-right: 1px solid #ddd !important;}
  table tbody{
    font-size:13px ;color:gray;text-align: center;
  }
  table tbody tr:last-child{border-bottom: 1px solid #ddd}
  table tbody td{padding: 10px 10px;}
  table tbody td:last-child{border: 1px solid #ddd}
  table tbody td:nth-of-type(1){text-align: left}
  table tbody .goods_img{
    display: inline-block;border: 1px solid #ddd;
    padding: 6px;width: 60px;height: 60px;line-height: 45px;
  }
  table tbody img{
    width:100%;height:100%;vertical-align: middle}
  table tbody td .goods_title{
    font-size: 10px;display: inline-block;
    width: 70%;line-height: 20px;vertical-align: middle;
  }
  table tbody td .goods_title i{
    width:100%; display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  /* table2 */
  .detail-list-tr td ul{
    margin: 0;
    padding: 0;
  }
  .detail-list-tr td ul li div{
    display: inline-block;
    padding-bottom: 15px;
  }
  .detail-list-tr td ul li .trade-imfor-dt{padding-left: 15px;}
  .trade-imfor-dd .ww-online{
    background-position: -80px 0;
  }
  .trade-imfor-dd a{
    width: 20px;
    height: 20px;
    text-decoration: none !important;
    background-image: url("../../../static/cs-130-60.gif");
  }
  .trade-imfor-dd span{
    line-height: 20px;
  }
  .trade-imfor-dd a span{
    display: none;
  }
  .trade-imfor-dd .ww-inline{
    display: inline-block;
    vertical-align: text-bottom;
  }
  .trade-imfor-aa{
    font-size: 16px;
    font-weight: bolder;
    color: #20a0ff;
    cursor: pointer;
    text-decoration: underline;
  }
  .trade-imfor-aa:hover{
    color: #f65d29;
  }
  .trade-status-table tr td .detailBlock{padding-left: 25px;}
  .detailBlock dl dt,.detailBlock dl dd{display: inline-block;}
  .detailBlock .trade-detail-imfor{
    height: 36px;
  }
  .trade-detail-imfor .imfor-icon {
    display: inline-block;
    vertical-align: middle;
  }
  .trade-detail-imfor .imfor-title{
    display: inline-block;
    font-size: 14px;
    font-weight: bolder;
    vertical-align: middle;
    margin-left: 10px;
  }
  .trade-detail-prompt{margin:25px 0 0 25px;}
  .trade-detail-prompt .dotted-node{display: inline-block;vertical-align: top;}
  .trade-detail-prompt .trade-detail-main{display: inline-block;width: 577px;}
  .trade-detail-operate dl dt{
    width: 127px;
    text-align: center;
  }
  .span-a{text-decoration: underline;color: #20a0ff;cursor: pointer;}
  .span-a:hover{text-decoration: underline;color: #ff4200;cursor: pointer;}
</style>
