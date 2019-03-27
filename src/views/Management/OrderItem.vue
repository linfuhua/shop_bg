<template>
  <tr>
    <td width="2%">
      <p>{{orderList.id}}</p>
    </td>
    <td width="18%">
      <p>{{orderList.order_num}}</p>
    </td>
    <td width="14%">
      <p>{{orderList.createdAt}}</p>
    </td>
    <td width="18%" style="color: red">
      <p>￥{{orderList.order_price}}</p>
    </td>
    <td width="18%">
      <p>{{orderList.order_addr}}</p>
    </td>
    <td width="14%">
      <p>{{orderList.order_mark}}</p>
    </td>
    <td width="10%">
      <div style="color: rgb(64, 158, 255);">
        <span>{{orderList.order_status}}</span>
      </div>
      <div style="margin-top: 2px">
        <span class="span-a" @click="showDetail">订单详情</span>
      </div>
    </td>
    <td width="14%">
      <div style="margin-bottom: 8px">
        <span v-if="orderList.order_status=='已支付'|| orderList.order_status=='待发货'">
          <el-button type="success" size="mini" @click="dialogFormVisible = true;">卖家发货</el-button>
          <!-- 快递对话框 -->
          <el-dialog title="物流快递" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="快递名称" :label-width="formLabelWidth">
                <el-select
                  style="width: 100%"
                  v-model="form.trackingName"
                  filterable
                  allow-create
                  default-first-option
                  placeholder="请输入或选择快递">
                  <el-option
                    v-for="item in options5"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="快运单号" :label-width="formLabelWidth">
                <el-input v-model="form.trackingNumber" autocomplete="off" placeholder="请输入快运单号"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="deliverGoods(orderList)">确认</el-button>
            </div>
          </el-dialog>
        </span>
      </div>
      <div style="margin-bottom: 8px">
        <span v-if="orderList.order_status=='正退款'">
          <el-button type="warning" size="mini">同意退款</el-button>
        </span>
      </div>
      <div>
        <span v-if="orderList.order_status=='已支付'|| orderList.order_status=='待发货'">
          <el-button size="mini">取消订单</el-button>
        </span>
      </div>
    </td>
  </tr>
</template>
<script>
  import {getCookie} from "@/common/auth";
    export default {
      props: ['orderList', 'index'],
      data() {
        return {
          sg: 'hello world',
          dialogFormVisible: false,
          totalOrder: 0,
          options5: [
            {
              value: '顺丰快递',
              label: '顺丰快递'
            }, {
              value: '韵达快递',
              label: '韵达快递'
            }, {
              value: '圆通快递',
              label: '圆通快递'
            }, {
              value: '申通快递',
              label: '申通快递'
            }, {
              value: '中通快递',
              label: '中通快递'
            }
          ], //快递
          select: [],
          goodsData: '',
          form: {
            trackingName: '',
            trackingNumber: '',
          },
          formLabelWidth: '120px',
          deliverGoodsData: ''
        }
      },
      methods: {
        showDetail(){
          this.$router.push({
            path:'/OrderDetail',
            query:{
              id:this.orderList.id,
              order_num:this.orderList.order_num,
            }
          })
        },
        //卖家发货
        deliverGoods(orderList){
          console.log(orderList);
          if(this.form.trackingName==''&&this.form.trackingNumber==''){
            this.$message.error('请输入发货信息！');
            return false;
          }else{
            this.axios.put('/v1/merchant/orders/'+orderList.id,{'order_status':'已发货'},{
              headers:{
                'Authorization': 'Bearer '+getCookie("token")
              }
            }).then((res)=>{
              let result = res.data;
              if(result.message=='OK'){
                this.$message({
                  message:'发货成功！',
                  type:'success'
                });
                console.log(orderList.order_status);
                setTimeout(function () {
                  window.location.reload();
                },1500)
              }else{
                this.$message.error("发货失败！")
              }
            }).catch((err)=>{
              console.log(err);
            })
          }
        }
      },
      mounted(){
      }
    }
</script>
<style scoped>
  table tbody tr{border-bottom: 1px solid #ddd}
  table tbody td{padding: 10px 10px;}
  table tbody td:last-child{border-right: 1px solid #ddd}
  .span-a:hover{text-decoration: underline;color: #ff4200;cursor: pointer;}
</style>
