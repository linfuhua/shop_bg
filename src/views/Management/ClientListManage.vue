<template>
    <div>
      <div class="bread_crumbs">
        <span>客户名单管理&nbsp;--&nbsp;<i class="present">客户信息列表</i></span>
      </div>
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;margin-top: 10px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.keyword" placeholder="请输入客户姓名/账号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="getUsers">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleAdd">新增</el-button>
          </el-form-item>
          <el-button size="small" class="add_coupon" @click="backCoupon" v-if="isBack==true"><img src="/static/back.png"/>客户名单列表</el-button>
        </el-form>
      </el-col>
      <!--新增界面-->
      <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item label="账号" prop="account">
            <el-input v-model="addForm.account" auto-complete="off">
              <el-button type="primary" slot="append" icon="el-icon-search" @click.native="getClient"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="addForm.nickname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="addForm.sex">
              <el-radio class="radio" :label="1">男</el-radio>
              <el-radio class="radio" :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="addForm.phone" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit">提交</el-button>
        </div>
      </el-dialog>
      <!--内容-->
      <div class="lists">
        <table>
          <thead>
          <tr>
            <th class="">#</th>
            <th class="">账号</th>
            <th class="">昵称</th>
            <th class="">姓名</th>
            <th class="">性别</th>
            <th class="">联系电话</th>
            <th class="">操作</th>
          </tr>
          </thead>
          <tbody v-if="isNodata==false">
          <tr v-for="(item,index) of clientList" :key="index">
            <td class="" width="4%">
              <span class="client-id">{{item.clientID}}</span>
            </td>
            <td class="" width="19%" style="text-align: left">
              <span class="client-img"><img :src="'http://www.jianlinker.cn/'+item.clientImg"></span>
              <span class="client-account">{{item.clientAccount}}</span>
            </td>
            <td class="" width="16%">
              <span class="nick-name">{{item.nickName}}</span>
            </td>
            <td class="" width="16%">
              <span class="client-name">{{item.clientName}}</span>
            </td>
            <td class="" width="14%">
              <span class="reg-time">{{item.sex}}</span>
            </td>
            <td class="" width="14%">
              <span class="client-phone">{{item.clientPhone}}</span>
            </td>
            <td>
              <div style="margin-bottom: 8px">
                <el-button type="success" size="mini" @click="handleCheck(item,index)">查看<i class="el-icon-rank"></i>
                </el-button>
              </div>
            </td>
          </tr>
          </tbody>
          <tbody v-if="isNodata==true">
          <tr>
            <td colspan="7">
              <div>暂时没有数据</div>
            </td>
          </tr>
          </tbody>
          <tfoot>
          <tr>
            <td colspan="3"></td>
            <td colspan="6" style="position: relative">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="1000"
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
      <!--查看界面-->
      <el-dialog title="查看" :visible.sync="checkFormVisible" :close-on-click-modal="false">
        <el-form :model="checkForm" label-width="80px" :rules="checkFormRules" ref="checkForm">
          <el-form-item label="账号" prop="account">
            <el-input v-model="checkForm.account" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="checkForm.nickname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="checkForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="checkForm.sex">
              <el-radio class="radio" :label="1">男</el-radio>
              <el-radio class="radio" :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="checkForm.phone" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>
<script>
    export default {
      data() {
            return {
              msg: '客户名单管理',
              clientList: [],
              dataList: [
                {
                  clientID: 1,
                  clientImg: '../../../static/headerImg2.png',
                  clientAccount: '12ds5678912',
                  nickName: '轻易放飞',
                  clientName: '火红瑞',
                  sex: '男',
                  clientPhone: '134597*****',
                  status: 0
                },
                {
                  clientID: 1,
                  clientImg: '../../../static/touxiang.jpg',
                  clientAccount: '7rfds5678912',
                  nickName: '阿瓦罗萨',
                  clientName: '火红瑞',
                  sex: '男',
                  clientPhone: '187557*****',
                  status: 1
                },
                {
                  clientID: 2,
                  clientImg: '../../../static/headerImg.jpg',
                  clientAccount: 'all456dasdsfsd',
                  nickName: '阿罗拉露',
                  clientName: '卿叶子',
                  sex: '女',
                  clientPhone: '124597*****',
                  status: 1
                },
                {
                  clientID: 3,
                  clientImg: '../../../static/touxiang.jpg',
                  clientAccount: 'hsad4sda8dfsd',
                  nickName: '凮易菲菲',
                  clientName: '倾听雪',
                  sex: '女',
                  clientPhone: '136597*****',
                  status: 0
                },
                {
                  clientID: 4,
                  clientImg: '../../../static/headerImg2.png',
                  clientAccount: 'fdd4das8dfsd',
                  nickName: '火情风风',
                  clientName: '倾听瑞',
                  sex: '男',
                  clientPhone: '136597*****',
                  status: 0
                },
                {
                  clientID: 5,
                  clientImg: '../../../static/headerImg.jpg',
                  clientAccount: 'xzd4fdf8dfsd',
                  nickName: '菲菲伊雪',
                  clientName: '段欢欢',
                  sex: '女',
                  clientPhone: '187597*****',
                  status: 0
                },
                {
                  clientID: 6,
                  clientImg: '../../../static/headerImg2.png',
                  clientAccount: 'wqad456fd8dfsd',
                  nickName: '一听一周',
                  clientName: '段瑞',
                  sex: '男',
                  clientPhone: '137497*****',
                  status: 0
                },
                {
                  clientID: 7,
                  clientImg: '../../../static/headerImg.jpg',
                  clientAccount: '45sd5658dfsd',
                  nickName: '红琴轻语',
                  clientName: '琴清雨',
                  sex: '女',
                  clientPhone: '116578*****',
                  status: 2
                },
                {
                  clientID: 8,
                  clientImg: '../../../static/headerImg2.png',
                  clientAccount: 'qew45dgsdfsd',
                  nickName: '风清玉宇',
                  clientName: '轻语也',
                  sex: '男',
                  clientPhone: '136457*****',
                  status: 0
                }
              ],
              isNodata: false, // 是否有数据
              isBack: false, // 是否返回
              filters: {
                keyword: ''
              },

              addFormVisible: false,//新增界面是否显示
              addFormRules: {
                account: [
                  { required: true, message: '请输入账号', trigger: 'blur' }
                ],
//                nickname: [
//                  { required: true, message: '请输入昵称', trigger: 'blur' }
//                ],
//                name: [
//                  { required: true, message: '请输入姓名', trigger: 'blur' }
//                ]
              },
              getClientList: [], //新增界面查询暂存
              //新增界面数据
              addForm: {
                account: '',
                nickname: '',
                name: '',
                sex: -1,
                phone: '',
              },

              checkFormVisible: false,//查看界面是否显示
              checkFormRules: {
                account: [
                  {required: true, message: '请输入账号', trigger: 'blur'}
                ],
              },
              //查看界面数据
              checkForm: {
                account: '',
                nickname: '',
                name: '',
                sex: -1,
                phone: '',
              },
            }
        },
      mounted(){
        this.showDataList();
      },
      methods: {
        // 显示数据列表
        showDataList(){
          this.clientList = this.dataList;
          this.showData(this.clientList);
//        this.addFormVisible = true;
        },
        pageChange(val){
//        console.log(`当前页: ${val}`);
        },
        preClick(val){
//        console.log(`上一页: ${val}`);
        },
        nextClick(val){
//        console.log(`下一页: ${val}`);
        },
        //返回客户列表
        backCoupon(){
          this.$router.push('/ClientListManage')
          this.clientList = this.dataList;
          this.showData(this.clientList);
          this.isBack = false;
        },
        // 显示数据
        showData(item){
          if(item.length==0){
            this.isNodata=true;
          }else{
            this.isNodata=false;
          }
        },
        //显示新增界面
        handleAdd() {
          this.addFormVisible = true;
          this.addForm = {
            account: '',
            nickname: '',
            name: '',
            sex: -1,
            phone: '',
          };
        },
        //性别显示转换
        formatSex(sex) {
          let s = sex == '男' ? 1 : sex == '女' ? 0 : -1;
          return s;
        },
        //查询用户列表
        getUsers() {
          let para = {keyword: this.filters.keyword};
          let urlStr = '/ClientListManage?clientKeyword=' + para.keyword;
          if(para.keyword==""){
            urlStr = '/ClientListManage?clientKeyword=null'
            para.keyword = 0
          }
          this.$router.push(urlStr);
          this.isBack = true;
//          console.log('para.keyword==>'+para.keyword);
          this.clientList = [];
          this.dataList.forEach((item) => {
//            console.log('item.clientAccount==>'+item.clientAccount);
            if (item.clientAccount == para.keyword || item.clientName == para.keyword) {
              this.clientList.push(item);
            }
          });
          this.showData(this.clientList);
        },
        //新增界面查询用户
        getClient(){
          let para = {account: this.addForm.account};
          this.getClientList = [];
          this.addForm.nickname='';
          this.addForm.name='';
          this.addForm.sex=-1;
          this.addForm.phone='';
          this.dataList.forEach((item) => {
            if (item.clientAccount == para.account) {
              this.getClientList.push(item);
            }
          });
          if (this.getClientList.length == 0) {
            this.$message({
              message: '警告，暂查无结果',
              type: 'warning'
            });
          } else {
            this.$message({
              message: '成功，查询结果信息已经输入',
              type: 'success'
            });
            this.getClientList.forEach((item) => {
//              console.log(item.clientAccount+" "+item.nickName+" "+item.clientName+" "+item.sex+" "+item.clientPhone);
              this.addForm.nickname=item.nickName;
              this.addForm.name=item.clientName;
              this.addForm.sex=this.formatSex(item.sex);
              this.addForm.phone=item.clientPhone;
            })
          }
        },
        //新增
        addSubmit() {
          this.$refs.addForm.validate((valid) => {
            if (valid) {
              this.$confirm('确认提交吗？', '提示', {}).then(() => {
                //NProgress.start();
                let para = Object.assign({}, this.addForm);
                //add success
                this.$message({
                  message: '提交成功,未完成功能',
                  type: 'success'
                });
              });
            }
          });
        },
        //查看
        handleCheck(item,index){
          this.checkFormVisible = true;
          console.log(item.nickName);
          console.log(index);
          this.checkForm.account=item.clientAccount;
          this.checkForm.nickname=item.nickName;
          this.checkForm.name=item.clientName;
          this.checkForm.sex=this.formatSex(item.sex);
          this.checkForm.phone=item.clientPhone;
        },
      }
    }
</script>
<style>
  /* 工具条 */
  .toolbar .add_coupon{
    border-radius: 5px;
    border:1px solid #409EFF;
    color: #409EFF;
    float: right;
  }
  .toolbar .add_coupon img{
    vertical-align: middle;
    margin-right: 3px;
  }
  /* 新增对话框 */
  .el-dialog .el-input .el-input-group__append:hover{
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }

  /* 内容 */
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
  table tbody tr{border-bottom: 1px solid #ddd}
  table tbody td{padding: 10px 10px;}
  table tbody td:last-child{border-right: 1px solid #ddd}
  table tbody td .client-img img{
    width: 32px;height: 32px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
  table tbody td .client-account{
    vertical-align: top;
  }
  table tfoot tr td{padding: 10px 0 !important;height: 22px}
  table tfoot .el-pagination{
    position: absolute;right: 0;
    top: 5px;
  }
</style>
