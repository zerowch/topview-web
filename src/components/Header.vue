<template>
  <div class="header">
    <div class="header-flex-bx base-max-width">
      <a href="/">
        <div class="logo">
          <img src="@/assets/logo-full.png" alt="logo">
        </div>
      </a>
      <div class="category">
        <i></i> Categories
      </div>
      <div class="navs">
        <!-- <div>Udemy for Business</div>
        <div>Become an instructor</div> -->
        <a href="/list"><div>Courses List</div></a>
      </div>
      <div class="panel" v-if="!cookie">
        <div class="btn" @click="$refs.loginModal.open()">
          Log In
        </div>
        <div class="btn theme" @click="$refs.signupModal.open()">
          Sign Up
        </div>
      </div>
      <div class="panel" v-else>
        <div class="avatar">
        </div>
        <dropdown :close-on-click="true">
          <template slot="btn">
            <div class="username">
              {{cookie.username}}
            </div>
          </template>
          <template slot="body">
            <ul class="user-dropmenu">
              <li @click="$refs.changePwdModal.open()">change password</li>
              <li @click="signOut">log out</li>
            </ul>
          </template>
        </dropdown>
      </div>
    </div>

    <!-- 登录modal -->
    <SweetModal
      ref="loginModal"
      width="380"
      :hide-close-button="true"
    >
      <div class="modal">
        <div class="modal-top">
          <div class="modal-title">
            Log In to Your Topview Account
          </div>
          <div class="modal-close"
          @click="$refs.loginModal.close()"
          >×</div>
        </div>
        <div class="modal-content">
          <div class="modal-row">
            <inputCpnt v-model="login.phone" icon="phone" pre="+91"
            iType="number"
            placeholder="Mobile Number`"
            ></inputCpnt>
          </div>
          <div class="modal-row">
            <inputCpnt icon="pwd"
            v-model="login.password"
            ></inputCpnt>
          </div>
          <div class="modal-row">
            <div class="btn theme" @click="loginSubmit">
              Sign In
            </div>
          </div>
        </div>
      </div>
    </SweetModal>

    <!-- 注册modal -->
    <SweetModal
      ref="signupModal"
      width="380"
      :hide-close-button="true"
    >
      <div class="modal">
        <div class="modal-top">
          <div class="modal-title">
            Sign Up and Start Learning!
          </div>
          <div class="modal-close"
          @click="$refs.signupModal.close()"
          >×</div>
        </div>
        <div class="modal-content">
          <div class="modal-row">
            <inputCpnt v-model="signup.phone" icon="phone" pre="+91"
            iType="number"
            placeholder="Mobile Number`"
            ></inputCpnt>
          </div>
          <div class="modal-row">
            <span class="text-btn"
            :class="{'active': signup.sendReady}"
            @click="sendMsg">{{signup.btnText}}</span>
          </div>
          <div class="modal-row">
            <inputCpnt v-model="signup.otp" icon="otp"
            placeholder="Enter OTP here"
            iType="number"
            ></inputCpnt>
          </div>
          <div class="modal-row">
            <inputCpnt v-model="signup.password" icon="pwd"
            placeholder="Minimum 6 characters"
            iType="password"
            ></inputCpnt>
          </div>
          <div class="modal-row">
            <div class="btn theme" @click="signUpsubmit">
              Sign Up
            </div>
          </div>
        </div>
      </div>
    </SweetModal>

    <!-- 修改密码modal -->
    <SweetModal
      ref="changePwdModal"
      width="380"
      :hide-close-button="true"
    >
      <div class="modal">
        <div class="modal-top">
          <div class="modal-title">
            Change Password
          </div>
          <div class="modal-close"
          @click="$refs.changePwdModal.close()"
          >×</div>
        </div>
        <div class="modal-content">
          <div class="modal-row">
            <inputCpnt v-model="changePwd.password" icon="pwd"
            placeholder="Current Password"
            iType="password"
            ></inputCpnt>
          </div>
          <div class="modal-row">
            <inputCpnt v-model="changePwd.newPassword" icon="pwd"
            placeholder="New Password"
            iType="password"
            ></inputCpnt>
          </div>
          <div class="modal-row">
            <inputCpnt v-model="changePwd.confirm" icon="pwd"
            placeholder="Re-enter New Password"
            iType="password"
            ></inputCpnt>
          </div>
          <div class="modal-row">
            <div class="btn theme" @click="changPwdSubmit">
              Submit
            </div>
          </div>
        </div>
      </div>
    </SweetModal>
    <Alert ref="alert"></Alert>
  </div>
</template>

<script>
// 组件
import { SweetModal } from 'sweet-modal-vue'
import Alert from '@/components/UserAlert.vue'
import inputCpnt from '@/components/inputCpnt.vue'
import Dropdown from 'bp-vuejs-dropdown'

// mixins
import login from '@/mixins/login'
import signup from '@/mixins/signup'
import userCookies from '@/mixins/userCookies'
import changePwd from '@/mixins/changePwd'

export default {
  components: {
    SweetModal,
    inputCpnt,
    Alert,
    Dropdown
  },
  mixins: [userCookies, login, signup, changePwd],
  data () {
    return {}
  },
  methods: {
    signOut () {
      localStorage.removeItem('userCookies')
      location.href = '/'
    }
  }
}
</script>

<style lang="scss">
  @import '../styles/mixin.scss';
  @import '../styles/modal.scss';
  .header {
    &-flex-bx {
      display: flex;
      align-items: center;
      height: 65px;
      padding: 0 20px;
      overflow: hidden;
      font-size: 13px;
      color: #505763;

      .logo {
        width: 200px;
        margin-right: 16px;
      }
      .navs {
        flex-grow: 1;
        display: flex;
        justify-content: flex-start;
        margin-right: 16px;

        div {
          margin: 0 2px;
          padding: 12px 15px;
          border: 1px solid transparent;
          border-radius: 3px;
          color: #505763;
          font-weight: 400;
          white-space: nowrap;
          cursor: pointer;
          &:hover {
            background: rgba(20, 23, 28, .05);
            border-color: rgba(20, 23, 28, .05);
          }
        }
      }
      .category {
        padding: 12px 15px;

        i {
          display: inline-block;
          vertical-align: -1px;
          margin-right: 4px;
          @include square(13px);
          background: {
            image: url('../assets/category.png');
            size: 100%;
          }
        }
      }
      .panel {
        .btn {
          margin: 0 2px;
          padding: 11px 12px;
          line-height: 1.4;
        }
        .username {
          min-width: 5rem;
          text-align: center;
          font-size: 1.2rem;
        }
      }
    }
  }

  .sweet-modal.is-alert .sweet-content {
    padding: 0;
  }

  .user-dropmenu {
    padding: 0;
    li {
      user-select: none;
      padding: 0.5rem 1rem;
      cursor: pointer;
      &:hover {
        background-color: #eee;
      }
    }
  }
  .bp-dropdown__body {
    padding: 0;
  }
</style>
