<template>
  <div>
    <div class="bread_crumbs">
      <span>拼团管理&nbsp;
        <i v-if="activeName=='first'" class="present">--&nbsp;全部拼团</i>
        <i v-if="activeName=='second'" class="present">--&nbsp;未完成拼团</i>
        <i v-if="activeName=='third'" class="present">--&nbsp;已完成拼团</i>
      </span>
    </div>
    <div class="group_list">
      <div>
        <el-input placeholder="拼团团号" class="check_group" size="mini">
          <el-button slot="append" icon="el-icon-search"  size="mini"></el-button>
        </el-input>
        <!--<el-button size="small" class="add_coupon"><i class="el-icon-plus"></i>添加优惠券</el-button>-->
        <div style="clear: both"></div>
      </div>
      <div class="group_table">
        <el-tabs v-model="activeName">
          <el-tab-pane label="全部" name="first">
            <table>
              <thead>
              <tr>
                <th class="">团号</th>
                <th class="">商品名称</th>
                <th class="">原价（元）</th>
                <th class="">拼团优惠价（元）</th>
                <th class="">成团人数</th>
                <th class="">当前人数</th>
                <th>商品库存</th>
                <th>拼团时效</th>
                <th>审核状态</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>1001</td>
                <td class="product_title">
                  <a href="javascript:void(0)"><i>食为先香辣鸡脖子湖南特产炸酱辣脖麻辣休闲肉类辣味零食小包装</i></a>
                </td>
                <td>30</td>
                <td>5</td>
                <td>5</td>
                <td>3</td>
                <td>300</td>
                <td>2小时</td>
                <td>--</td>
                <td><el-button size="mini">修改</el-button></td>
              </tr>
              <tr>
                <td>1002</td>
                <td class="product_title">
                  <a href="javascript:void(0)"><i>食为先香辣鸡脖子湖南特产炸酱辣脖麻辣休闲肉类辣味零食小包装</i></a>
                </td>
                <td>49</td>
                <td>6</td>
                <td>5</td>
                <td>0</td>
                <td>620</td>
                <td>2小时</td>
                <td>--</td>
                <td><el-button size="mini">修改</el-button></td>
              </tr>
              <tr>
                <td>1003</td>
                <td class="product_title">
                  <a href="javascript:void(0)"><i>食为先香辣鸡脖子湖南特产炸酱辣脖麻辣休闲肉类辣味零食小包装</i></a>
                </td>
                <td>30</td>
                <td>5</td>
                <td>5</td>
                <td>5</td>
                <td>300</td>
                <td>2小时</td>
                <td><i style="color:#409EFF">审核通过</i></td>
                <td><el-button size="mini">修改</el-button></td>
              </tr>
              <tr>
                <td>1004</td>
                <td class="product_title">
                  <a href="javascript:void(0)"><i>食为先香辣鸡脖子湖南特产炸酱辣脖麻辣休闲肉类辣味零食小包装</i></a>
                </td>
                <td>60</td>
                <td>10</td>
                <td>4</td>
                <td>2</td>
                <td>100</td>
                <td>2小时</td>
                <td><i style="color:#F56C6C">未审核</i></td>
                <td><el-button size="mini" type="primary" plain>审核</el-button></td>
              </tr>
              </tbody>
            </table>
          </el-tab-pane>
          <el-tab-pane label="未完成拼团" name="second">
            <table>
              <thead>
              <tr>
                <th class="">团号</th>
                <th class="">商品名称</th>
                <th class="">原价（元）</th>
                <th class="">拼团优惠价（元）</th>
                <th class="">成团人数</th>
                <th class="">当前人数</th>
                <th>商品库存</th>
                <th>拼团时效</th>
                <th>审核状态</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>1001</td>
                <td class="product_title">
                  <a href="javascript:void(0)"><i>食为先香辣鸡脖子湖南特产炸酱辣脖麻辣休闲肉类辣味零食小包装</i></a>
                </td>
                <td>30</td>
                <td>5</td>
                <td>5</td>
                <td>3</td>
                <td>300</td>
                <td>2小时</td>
                <td>--</td>
                <td><el-button size="mini">修改</el-button></td>
              </tr>
              <tr>
                <td>1002</td>
                <td class="product_title">
                  <a href="javascript:void(0)"><i>食为先香辣鸡脖子湖南特产炸酱辣脖麻辣休闲肉类辣味零食小包装</i></a>
                </td>
                <td>49</td>
                <td>6</td>
                <td>5</td>
                <td>0</td>
                <td>620</td>
                <td>2小时</td>
                <td>--</td>
                <td><el-button size="mini">修改</el-button></td>
              </tr>
              </tbody>
            </table>
          </el-tab-pane>
          <el-tab-pane label="已完成拼团" name="third">
            <div style="padding-top: 10px">
              <el-select v-model="checkStatus" placeholder="状态选择" size="small">
                <el-option key="0" label="未审核" value="未审核"></el-option>
                <el-option key="1" label="审核通过" value="审核通过"></el-option>
              </el-select>
            </div>
            <table>
              <thead>
              <tr>
                <th class="">团号</th>
                <th class="">商品名称</th>
                <th class="">原价（元）</th>
                <th class="">拼团优惠价（元）</th>
                <th class="">成团人数</th>
                <th class="">当前人数</th>
                <th>商品库存</th>
                <th>拼团时效</th>
                <th>审核状态</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>1003</td>
                <td class="product_title">
                  <a href="javascript:void(0)"><i>食为先香辣鸡脖子湖南特产炸酱辣脖麻辣休闲肉类辣味零食小包装</i></a>
                </td>
                <td>30</td>
                <td>5</td>
                <td>5</td>
                <td>5</td>
                <td>300</td>
                <td>2小时</td>
                <td><i style="color:#409EFF">审核通过</i></td>
                <td><el-button size="mini">修改</el-button></td>
              </tr>
              <tr>
                <td>1004</td>
                <td class="product_title">
                  <a href="javascript:void(0)"><i>食为先香辣鸡脖子湖南特产炸酱辣脖麻辣休闲肉类辣味零食小包装</i></a>
                </td>
                <td>60</td>
                <td>10</td>
                <td>4</td>
                <td>2</td>
                <td>100</td>
                <td>2小时</td>
                <td><i style="color:#F56C6C">未审核</i></td>
                <td><el-button size="mini" type="primary" plain>审核</el-button></td>
              </tr>
              </tbody>
            </table>
          </el-tab-pane>
        </el-tabs>
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
        msg: '拼团管理',
        activeName:"first",
        checkStatus:''
      }
    }
  }
</script>
