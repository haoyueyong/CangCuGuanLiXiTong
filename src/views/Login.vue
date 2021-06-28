<template>
  <el-container>
    <el-header class="head" height="80px">
      <img src="../assets/image/logo (1).png" alt="" />
    </el-header>
    <el-main class="main">
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <p class="ziti">立足行业标杆方案</p>
            <p class="ziti">解决企业个性问题</p>
            <hr width="80%" align="left" color="rgb(51,56,84)" size="1px" />
            <p class="ziti2">
              在行业标杆的规范基础上，针对企业自身特点，建立<br />
              的数字化、透明化、协同化运营管理体系，满足企业<br />
              快速发展的需求。
            </p>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <h3>登录</h3>
            <el-form
              class="loform"
              :model="loginForm"
              :rules="rules"
              ref="loginRef"
              label-width="600px"
            >
              <el-form-item label="账号" prop="userName">
                <el-input
                  class="bor"
                  v-model="loginForm.userName"
                  prefix-icon="el-icon-user-solid"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="密码" prop="userPsw">
                <el-input
                  outline="none"
                  v-model="loginForm.userPsw"
                  prefix-icon="el-icon-lock"
                  type="password"
                >
                </el-input>
              </el-form-item>
              <div class="verification" prop="userCode">
                <input
                  type="text"
                  v-model="loginForm.login_code"
                  placeholder="请输入验证码"
                />
                <div
                  @click="refreshCode()"
                  class="code"
                  style="cursor: pointer"
                  title="点击切换验证码"
                >
                  <s-identify :identifyCode="identifyCode"></s-identify>
                </div>
              </div>
              <div class="inp">
                <input type="checkbox" class="check" />
                记住密码
              </div>

              <el-form-item class="anniu">
                <el-button class="anniu" type="primary" @click="login">
                  登录</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <el-footer class="foot" height="80px">
      <img src="../assets/image/system_02.png" alt="" />

      <img src="../assets/image/system_03.png" alt="" />

      <img src="../assets/image/system_04.png" alt="" />

      <img src="../assets/image/system_06.png" alt="" />
    </el-footer>
    <div class="bot">
      <ul>
        <li>Copyright(C)2020 </li>
                 
        <li>智造易@2020</li>
                  
        <li>ICP备12003508号-15 </li>
                 
        <li>公安备12003508号-15</li>
      </ul>
    </div>
    <el-dialog title="选择进入的应用" :visible.sync="dialogVisible" width="30%">
             <span></span>   <span>
            
        <div class="dialog">
                
          <div @click="goHome">
                  <img src="../assets/image/system_03.png" alt="" />       
            <p>协同管理</p>
                
          </div>
              
          <div>
                  <img src="../assets/image/system_02.png" alt="" />       
            <p>仓储系统</p>
                
          </div>
              
          <div>
                  <img src="../assets/image/system_03.png" alt="" />       
            <p>报表引擎</p>
                
          </div>
              
        </div>
          </span
      >
        <span slot="footer" class="dialog-footer">   </span>
    </el-dialog>
  </el-container>
</template>

<script>
import { defineComponent } from "vue";
import sIdentify from "../views/SIdentify";
import qs from "qs";
export default {
  data() {
    return {
      identifyCode: "6784",
      identifyCodes: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
      ],
      loginForm: {
        userName: "chenfang",
        userPsw: "chenfang",
        login_code: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3到 15个字符", trigger: "blur" },
        ],
        userPsw: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      dialogVisible: false,
    };
  },
  components: { sIdentify },
  methods: {
    login() {
      this.$refs.loginRef.validate(async (valid) => {
        if (!valid) {
          this.$message.error("用户名或者密码错误");
          return false;
        }
        if (this.identifyCode !== this.loginForm.login_code) {
          this.$message.error("验证码错误");
          return false;
        }
        var loginForm = qs.stringify(this.loginForm);
        console.log(loginForm);
        const { data: res } = await this.$http.post("sys/login", loginForm);
        console.log(res);
        //将token存到本地sessionStorage中
        window.sessionStorage.setItem("token", res.data.token);
        // 存储登录用的用户名
        window.sessionStorage.setItem("userName", res.data.name);
        // // 存储用户id
        window.sessionStorage.setItem("userId", res.data.id);
        // 存储nickName
        window.sessionStorage.setItem("nickName", res.data.nickName);

        // 向vuex中存储当前用户信息
        // this.$store.dispatch('saveUserInfo',res.data)
        // 登录成功 跳转到首页
        // 编程时导航
        // 跨域时也可以使用
        //  token:令牌
        //  http请求无状态的(需要记录状态)

        // 不存在跨域使用
        // cookies 在客户端记录
        // 通过session在服务端记录

        // 登录成功，跳转到首页
        //  编程式导航
        // this.$router.push("/home");
        // 显示对话框
        this.dialogVisible = true;
      });
    },
    goHome() {
      this.$router.push("/welcome");
      this.$message({
        message: "登陆成功",
        type: "success",
      });
    },
    mounted() {
      this.refreshCode();
    },
    unmounted() {},
    //
    // 生成随机数
    randomNum(min, max) {
      max = max + 1;
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 更新验证码
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
      console.log("当前验证码:", this.identifyCode);
    },
    // 随机生成验证码字符串
    makeCode(data, len) {
      console.log("data, len:", data, len);
      for (let i = 0; i < len; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length - 1)
        ];
      }
    },
  },
};
</script>

<style>
@import "../assets/css/login.css";
</style>