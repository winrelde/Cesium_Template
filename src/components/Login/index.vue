<template>
  <div class="login-wrap">
    <div class="login-title">
      <span>{{ title }}</span>
    </div>
    <div class="login-box">
      <span class="welcome-login">门的另一端</span>
      <div class="form-wrap">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="loginFormRules"
          :size="formSize"
          class="el-form-login"
          status-icon
        >
          <el-form-item label="" prop="username">
            <el-input ref="userRef" v-model="ruleForm.username" />
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input v-model="ruleForm.password" type="password" />
          </el-form-item>
          <div class="btn-box">
            <el-button
              type="primary"
              class="login-btn"
              @click="submitForm(ruleFormRef)"
            >
              登录
            </el-button>
            <el-button
              type="primary"
              class="login-btn"
              @click="resetForm(ruleFormRef)"
              >重置</el-button
            >
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref, reactive } from "vue";
import { type FormRules, type FormInstance } from "element-plus";

const title = ref<string>("向着星辰与深渊");
const formSize: any = ref("default");
const router = useRouter();
const ruleForm = reactive({
  username: "",
  password: "",
});

const loginFormRules = reactive<FormRules>({
  username: [{ required: true, message: "用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

const ruleFormRef = ref<FormInstance>();
const login = () => {
  localStorage.setItem("token", "access_token");
  router.replace({ path: "/home" });
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      const { username, password } = ruleForm;
      if (username !== "admin" || password !== "admin") {
        console.log("用户名或密码错误");
        ElMessage.error("用户名或密码错误");
        return;
      }
      login();
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
<style lang="less" scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  background: url("@/assets/login-pg.jpg") no-repeat;
  background-size: cover;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  .placeholder-class {
    color: #80aaff;
    letter-spacing: 2px;
    font-family: "楷体", serif;
  }
  .login-title {
    font-family: "pangMen", serif;
    font-size: 44px;
    color: #f0f6ff;
    text-shadow: 0 6px 2px #0b173f, -3px -1px 2px #0b173f;
    position: absolute;
    left: 50%;
    top: 17%;
    transform: translateX(-50%);
    padding-left: 7px;
    span {
      letter-spacing: 8px;
    }
  }
  .login-box {
    width: 530px;
    height: 400px;
    position: absolute;
    top: 50%;
    left: 49.78%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: -20px 0 20px 5px rgba(63, 214, 196, 0.5),
      0px -20px 20px 5px rgba(73, 87, 157, 0.5),
      20px 0 20px 5px rgba(135, 98, 194, 0.5),
      0 20px 20px 5px rgba(154, 67, 119, 0.5);
    background: linear-gradient(
      rgba(17, 183, 234, 0.5),
      rgba(126, 58, 208, 0.5)
    );
    z-index: 30;
    .welcome-login {
      font-size: 30px;
      font-family: "楷体", serif;
      color: transparent;
      background-clip: text;
      -webkit-background-clip: text;
      background-image: linear-gradient(to bottom, #fff 60%, #3a6bac);
      position: absolute;
      left: 50%;
      top: 46px;
      transform: translateX(-50%);
      font-weight: 700;
      display: block;
    }
    .form-wrap {
      position: absolute;
      display: flex;
      justify-content: center;
      text-align: center;
      left: 50%;
      top: 60%;
      transform: translate(-50%, -50%);

      .el-form-login {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .btn-box {
        display: flex;
        justify-content: center;
        text-align: center;
        margin-top: 6px;
      }

      .login-btn {
        width: 100px;
        height: 50px;
        line-height: 50px;
        font-size: 22px;
        color: #f7fbfd;
        font-family: "楷体", serif;
        font-weight: 700;
        padding-top: 3px;
        box-sizing: border-box;
      }
    }

    :deep(.el-form-item__error) {
      color: #80aaff;
      margin-left: 45px;
      font-size: 12px;
    }

    :deep(.el-input) {
      height: 42px;
      width: 200px;
      position: relative;
      top: 0;
      left: 0;
      .el-input__wrapper {
        background-color: transparent;
        // box-shadow: none;
      }

      .el-input__inner {
        height: 100%;
        background: transparent;
        color: #f6f8fa;
        font-size: 15px;
        letter-spacing: 2px;
        display: flex;
        align-items: center;

        &::placeholder {
          .placeholder-class();
        }

        &::-webkit-input-placeholder {
          .placeholder-class();
        }

        &:-moz-placeholder {
          .placeholder-class();
        }

        &::-moz-placeholder {
          .placeholder-class();
        }

        &:-ms-input-placeholder {
          .placeholder-class();
        }
      }
    }
  }
}
</style>
