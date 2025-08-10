<template>
  <div>
    <topHeader></topHeader>
    <div class="login-area mt-50 mb-120">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="form-wrapper">



              <form @submit.prevent="tryToReset">
                <div class="text-center mb-3">
                  <router-link to="/">
                    <img
                        src="../../../../public/frontend/assets/images/header1-logo.svg"
                        alt=""
                        height="60"
                    />
                  </router-link>
                </div>

                <div v-if="isResetError" class="alert alert-danger alert-dismissible">
                  <ul class="mb-0">
                    <li>{{ error }}</li>
                  </ul>
                </div>

                <!-- Password Field with Popover -->
                <div class="form-inner mb-3">
                  <label for="password">New Password</label>
                  <input v-model="password"
                         :type="obscurePassword ? 'password': 'text'"
                         id="password"
                         @input="validatePassword"
                  />
                  <i class="bi bi-eye-slash" id="togglePassword" @click="obscurePassword = !obscurePassword"
                     v-if="!obscurePassword"></i>
                  <i class="bi bi-eye" id="togglePassword" @click="obscurePassword = !obscurePassword" v-else></i>
                  <!-- Popover for Password Requirements -->
                  <b-popover
                      target="password"
                      triggers="focus"
                      placement="top"
                      :show="showPopover"
                      class="popover-custom"
                  >
                    <ul>
                      <li :class="{'text-success': isLengthValid}">At least 8 characters</li>
                      <li :class="{'text-success': hasLowercase}">At least one lowercase letter</li>
                      <li :class="{'text-success': hasUppercase}">At least one uppercase letter</li>
                      <li :class="{'text-success': hasNumber}">At least one number</li>
                      <li :class="{'text-success': hasSpecialChar}">At least one special character (e.g. 1@#$%^&*)</li>
                    </ul>
                  </b-popover>
                </div>
                <div class="form-group mb-0 text-center">
                  <button class="btn btn-dark btn-block" :disabled="!isPasswordValid" v-if="!loading" type="submit">
                    Update password and login
                  </button>
                  <b-button variant="dark" disabled class="btn-dark btn-block ml-1" v-else>
                    <b-spinner small class="mr-1"></b-spinner>&nbsp;Loading...
                  </b-button>
                </div>

              </form>

            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12 text-center">
            <router-link to="/login" class="text-primary-1 font-weight-medium ml-1"><i class="fa fa-arrow-left"/> Back
              to
              Log in
            </router-link>
          </div>
          <!-- end col -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appConfig from "../../../../app.config.json";
import {userService} from "@/apis/user.service";
import topHeader from '../../base-layout/header-2'
import store from "@/store/store";

export default {
  page: {
    title: "Reset-password",
    meta: [{name: "description", content: appConfig.description}],
  },
  data() {
    return {
      password: "",
      loading: false,
      isResetError: false,
      error: null,
      obscurePassword: true,
      showPopover: false,
      isLengthValid: false,
      hasLowercase: false,
      hasUppercase: false,
      hasNumber: false,
      hasSpecialChar: false,
      email: this.$route.query.email,
      token: this.$route.query.token
    };
  },
  components: {
    topHeader
  },
  computed: {
    isPasswordValid() {
      return (
          this.isLengthValid &&
          [this.hasLowercase, this.hasUppercase, this.hasNumber, this.hasSpecialChar].filter(Boolean).length >= 1
      );
    },
  },
  methods: {
    validatePassword() {
      const password = this.password;
      this.isLengthValid = password.length >= 8;
      this.hasLowercase = /[a-z]/.test(password);
      this.hasUppercase = /[A-Z]/.test(password);
      this.hasNumber = /\d/.test(password);
      this.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      this.showPopover = !this.isPasswordValid;
    },
    async tryToReset() {
      this.loading = true
      userService.resetPassword({
        email: this.email,
        token: this.token,
        password: this.password
      }).then((response) => {
        this.loading = false
        const {status, message} = response
        if (!status) {
          this.error = message;
        } else {
          this.LogIn();
        }
      });
    },

    LogIn() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      }).then(()=>{
        const loggedUser = store.getters.GET_USER_INFO;
        const userRole = loggedUser.roles?.[0] || '';
        if (userRole === 'tradesperson') {
          this.$router.push('/profile');
        } else if (userRole === 'homeowner') {
          this.$router.push('/homeowner/my-projects');
        } else {
          this.$router.push('/');
        }
      }).catch(()=>{});
      this.$store.dispatch("clear");
    },
  },
};
</script>