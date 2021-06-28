<template>
  <el-container>
    <el-header class="header">
      <el-row class="row">
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <i class="el-icon-menu systemSelect"></i>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light logo-wrapper">
            <div class="logo-1"></div>
            <p class="logo-txt">霍尔果斯爱情东海岸</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <!-- <span>{{ userName }}</span> -->
            <el-tooltip placement="bottom" effect="light">
              <div slot="content">
                <p @click="changePwd">修改密码</p>
                <div class="line"></div>
                <p @click="logout">退出登录</p>
              </div>
              <el-button class="but">{{ userName }}</el-button>
            </el-tooltip>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="210px" height="100%">
        <el-menu
          :default-active="activePath"
          background-color="#545454"
          text-color="#fff"
          active-text-color="#f00"
          :unique-opened="true"
          :router="true"
        >
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i class="el-icon-eleme"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item
              :index="subItem.url"
              v-for="subItem in item.menuList"
              :key="subItem.id"
              @click="savePath(subItem.url)"
              >{{ subItem.name }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
      <!-- 修改密码对话框 -->
      <el-dialog
        title="修改密码"
        :visible.sync="changePwdDialogVisible"
        width="50%"
      >
        <span>
          <el-form
            ref="changePwdRef"
            :model="changePwdForm"
            :rules="changePwdRules"
            label-width="80px"
          >
            <el-form-item label="新密码" prop="newPwd">
              <el-input v-model="changePwdForm.newPwd"></el-input>
            </el-form-item>
            <el-form-item label="旧密码" prop="oldPwd">
              <el-input v-model="changePwdForm.oldPwd"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="changePwdForm.userName"></el-input>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="changePwdCancel">取 消</el-button>
          <el-button type="primary" @click="changePwdHandler">确 定</el-button>
        </span>
      </el-dialog>
    </el-container>
  </el-container>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      userName: sessionStorage.getItem("userName"),
      menuList: [],
      activePath: "",
      changePwdDialogVisible: false,
      changePwdForm: {
        newPwd: "",
        oldPwd: "",
        userName: "",
      },
      changePwdRules: {
        newPwd: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        oldPwd: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        userName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  components: {},
  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    async getMenuList() {
      const { data: res } = await this.$http.get("menu/list");
      console.log(res);
      this.menuList = res.data;
    },
    savePath(path) {
      //  将激活状态的路由path，存入本地存储
      window.sessionStorage.setItem("activePath", path);
      this.activePath = path;
    },
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    changePwd() {
      this.changePwdDialogVisible = true;
    },
    changePwdCancel() {
      this.$refs.changePwdRef.resetFields();
      this.changePwdDialogVisible = false;
    },
    async changePwdHandler() {
      var changePwdForm = qs.stringify(this.changePwdForm);
      //  发请求
      const { data: res } = await this.$http.put(
        "user/changePwd",
        changePwdForm
      );
      console.log(res);
      this.changePwdDialogVisible = false;
      this.logout();
    },
  },
};
</script>


<style scoped>
.header {
  width: 100%;
  height: 80px;
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid wheat;
  margin-bottom: 5px;
}
.but {
  margin-left: 450px;
  margin-top: -150px;
}
.systemSelect {
  width: 60px;
  height: 50px;
  font-size: 30px;
  padding-left: 20px;
  position: relative;
  top: -20px;
  left: -80px;
  line-height: 60px;
  background-color: rgb(255, 255, 255);
  /* border-bottom: 1px solid wheat; */
}

.logo-1 {
  width: 100%;
  height: 80px;
  background: url("../assets/image/logo (2).png") 0px 20px no-repeat;
  background-size: 70px;
  margin-top: -96px;
  float: left;
}
.logo-txt {
  float: left;
  margin-top: -60px;
  margin-left: 100px;
}
.bg-purple {
  margin-top: -60px;
}
.line {
  border-top: 1px dashed #000;
  margin-top: 5px;
  margin-bottom: 5px;
}
.el-menu {
  border-right: none;
}
</style>
