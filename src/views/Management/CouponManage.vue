<template>
  <div class="coupons">
    <div class="bread_crumbs">
      <span>优惠券管理&nbsp;
        <i v-if="activeName=='first'&& !$route.query.add_coupon && !$route.query.modify_coupon" class="present">--&nbsp;全部优惠券</i>
        <i v-if="activeName=='second'&& !$route.query.add_coupon && !$route.query.modify_coupon" class="present">--&nbsp;未过期优惠券</i>
        <i v-if="activeName=='third'&& !$route.query.add_coupon && !$route.query.modify_coupon" class="present">--&nbsp;已过期优惠券</i>
        <i v-if="$route.query.add_coupon" class="present">--&nbsp;添加优惠券</i>
        <i v-if="$route.query.modify_coupon" class="present">--&nbsp;修改优惠券</i>
      </span>
    </div>
    <div class="coupons_list" v-if="!$route.query.add_coupon && !$route.query.modify_coupon">
      <div>
        <el-input placeholder="优惠券编号" class="check_coupon" size="mini">
          <el-button slot="append" icon="el-icon-search"  size="mini"></el-button>
        </el-input>
        <el-button size="small" class="add_coupon" @click="addCoupon"><i class="el-icon-plus"></i>添加优惠券</el-button>
        <div style="clear: both"></div>
      </div>
      <div class="coupons_table">
        <el-tabs v-model="activeName">
          <el-tab-pane label="全部" name="first">
            <table>
              <thead>
              <tr>
                <th class="">编号</th>
                <th class="">优惠券名称</th>
                <th class="">优惠券类型</th>
                <th class="">使用门槛（元）</th>
                <th class="">面值（元）</th>
                <th>有效期</th>
                <th>是否过期</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>001</td>
                <td>店铺优惠券</td>
                <td>全店通用</td>
                <td>满99元使用</td>
                <td>10元</td>
                <td>2018-12-17~2018-12-19</td>
                <td>未过期</td>
                <td>
                  <div style="margin-bottom: 5px">
                    <el-button type="primary" size="mini" plain @click="modifyCoupon">修改</el-button>
                  </div>
                  <div><el-button size="mini" plain>删除</el-button></div>
                </td>
              </tr>
              <tr>
                <td>002</td>
                <td>店铺优惠券</td>
                <td>全店通用</td>
                <td>满66元使用</td>
                <td>10元</td>
                <td>2018-12-14~2018-12-16</td>
                <td>已过期</td>
                <td>
                  <el-button size="mini" plain>删除</el-button>
                </td>
              </tr>
              </tbody>
            </table>
          </el-tab-pane>
          <el-tab-pane label="未过期" name="second">
            <table>
              <thead>
              <tr>
                <th class="">编号</th>
                <th class="">优惠券名称</th>
                <th class="">优惠券类型</th>
                <th class="">使用门槛（元）</th>
                <th class="">面值（元）</th>
                <th>有效期</th>
                <th>是否过期</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>001</td>
                <td>店铺优惠券</td>
                <td>全店通用</td>
                <td>满99元使用</td>
                <td>10元</td>
                <td>2018-12-17~2018-12-19</td>
                <td>未过期</td>
                <td>
                  <div style="margin-bottom: 5px"><el-button type="primary" size="mini" plain @click="modifyCoupon">修改</el-button></div>
                  <div><el-button size="mini" plain>删除</el-button></div>
                </td>
              </tr>
              </tbody>
            </table>
          </el-tab-pane>
          <el-tab-pane label="已过期" name="third">
            <table>
              <thead>
              <tr>
                <th class="">编号</th>
                <th class="">优惠券名称</th>
                <th class="">优惠券类型</th>
                <th class="">使用门槛（元）</th>
                <th class="">面值（元）</th>
                <th>有效期</th>
                <th>是否过期</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>002</td>
                <td>店铺优惠券</td>
                <td>全店通用</td>
                <td>满66元使用</td>
                <td>10元</td>
                <td>2018-12-14~2018-12-16</td>
                <td>已过期</td>
                <td>
                  <el-button size="mini" plain>删除</el-button>
                </td>
              </tr>
              </tbody>
            </table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="addCoupon" v-if="$route.query.add_coupon || $route.query.modify_coupon">
      <div>
        <el-button size="small" class="add_coupon" @click="backCoupon"><img src="/static/back.png"/>优惠券列表</el-button>
        <div style="clear: both"></div>
      </div>
      <div class="addCoupon_input">
        <div>
          <span>优惠券名称</span><el-input value="店铺优惠券" disabled></el-input>
        </div>
        <div class="">
          <!--<span>优惠券类型</span><el-input value="全店通用" disabled>全店通用</el-input><br>-->
          <span>优惠券类型</span>
          <el-select v-model="coupon_type" placeholder="请选择" style="width: 20% !important;">
            <el-option  value="选项1" key="全店通用" label="全店通用"></el-option>
            <el-option  value="注册赠送" disabled></el-option>
            <el-option  value="购物赠送" disabled></el-option>
          </el-select>
        </div>
        <div class="">
          <span>优惠券标题</span><el-input placeholder="请输入商品售价"></el-input><br/>
          <div style="display: inline-block;width: 16%;padding-right: 25px;"></div>
          <div class=" remind">普通买家收到优惠券消息的时候的标题提示</div>
        </div>
        <div class="">
          <span>面值</span><el-input placeholder="" style="width: 10%"></el-input><br>
          <div style="display: inline-block;width: 16%;padding-right: 25px;"></div>
          <div class=" remind">单位：元</div>
        </div>
        <div class="">
          <span>使用门槛</span>
          <i>
            购买满
            <el-input style="width: 10%"></el-input>
            元使用
          </i>
        </div>
        <div class="block">
          <span class="demonstration">有效时间</span>
          {{value6}}
          <el-date-picker
            v-model="valid_time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="">
          <span>可使用商品</span>
          <el-radio-group v-model="radio">
          <el-radio :label="0">全部商品</el-radio>
          <el-radio :label="1" disabled>指定商品</el-radio>
          <el-radio :label="2" disabled>指定分类</el-radio>
        </el-radio-group><br>
          <div style="display: inline-block;width: 16%;padding-right: 25px;"></div>
          <div class=" remind">购买以下商品可使用优惠券抵扣金额</div>
        </div>
      </div>
      <div class="add_sure">
        <el-button type="primary" @click="addSure" size="medium">确定添加</el-button>
      </div>
    </div>
  </div>
</template>
<style>
</style>
<script>
  export default {
    data() {
      return {
        msg: '优惠券管理',
        activeName:'first',
        valid_time:'',
        radio:1,
        coupon_type:'全店通用'
      }
    },
    methods:{
      addCoupon(){
        this.$router.push({
          path:'/CouponManage',
          query:{
            add_coupon:'add'
          }
        })
      },
      backCoupon(){
        this.$router.push('/CouponManage')
      },
      modifyCoupon(){
        this.$router.push({
          path:'/CouponManage',
          query:{
            modify_coupon:'modify'
          }
        })
      },
      addSure(){
        let status='0';
        this.$confirm('确认信息无误后是否确定添加?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(status=='1'){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }else{
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          }

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
