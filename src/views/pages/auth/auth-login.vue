<template>
  <div>
    <RoleBasedHeader :userRole="userRole" />

    <div class="login-area mt-50 mb-120">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="form-wrapper">

              <div class="form-title mb-25">
                <div @click="$router.go(-1)" class="mb-4 cursor-pointer">
                  <i class="bi bi-chevron-left"></i> Back
                </div>
                <h3>Login to TradeLink</h3>
                <span></span>
              </div>

              <div v-if="errorMessage" class="alert alert-danger">
                <ul class="mb-0">
                  <li>{{ errorMessage }}</li>
                </ul>
              </div>

              <form @submit.prevent="login" class="border">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-inner mb-20">
                      <label for="email">Email*</label>
                      <div class="input-area">
                        <img src="../../../../public/frontend/assets/images/icon/email-2.svg" alt="">
                        <input type="email" id="email" v-model="email" placeholder="Email" required>
                      </div>
                    </div>
                    <div class="form-inner mb-20">
                      <label class="large-font" for="email">Password</label>
                      <input v-model="password"
                             :type="obscurePassword ? 'password': 'text'"
                             id="password"/>
                      <i class="bi bi-eye-slash" id="togglePassword" @click="obscurePassword = !obscurePassword"
                         v-if="!obscurePassword"></i>
                      <i class="bi bi-eye" id="togglePassword" @click="obscurePassword = !obscurePassword" v-else></i>
                    </div>

                  </div>
                  <div class="col-lg-12 mb-4">
                    <div class="form-inner">
                      <button class="btn bg-primary-1 text-light" type="submit" :disabled="isLoading">
                        <b-spinner small v-if="isLoading"></b-spinner>
                        {{ isLoading ? 'Submitting..' : 'LogIn' }}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "../../layouts/auth";
import appConfig from "../../../../app.config.json";
import topHeader from '../../base-layout/header-2'

import {required, email} from "vuelidate/lib/validators";
import store from "@/store/store";
import {userService} from "@/apis/user.service";
import RoleBasedHeader from "@/views/base-layout/roleBasedHeader";

/**
 * Login component
 */
export default {
  name: "AuthLogin",
  page: {
    title: "Login",
    meta: [{name: "description", content: appConfig.description}],
  },
  data() {
    return {
      email: this.$store.getters.GET_USER_INFO ? this.$store.getters.GET_USER_INFO.email : "",
      password: "",
      obscurePassword: true,
      isLoading: false,
      error: false,
      errorMessage: ''
    };
  },
  components: {
    Auth,
    topHeader,
    RoleBasedHeader
  },
  computed: {
    userInfo() {
      return this.$store.getters.GET_USER_INFO;
    },
    userRole() {
      const loggedUser = store.getters.GET_USER_INFO;
      if(!loggedUser){
        return '';
      }
      return loggedUser?.roles?.[0] || '';
    },
  },

  created() {
  },

  methods: {
    login() {
      this.isLoading = true
      this.errorMessage = ''
      userService.login(this.email, this.password).then((res) => {
        this.isLoading = false
        const {status, message, extra} = res;
        if (!status) {
          this.errorMessage = message;
          return;
        }
        this.$store.dispatch('updateUserInfo', extra)
        const queryParam = this.$route.query['redirect-to'];
        console.log('Redirecting to:', queryParam);
        const redirectPath = (typeof queryParam === 'string') ? queryParam : '/profile';
        this.$router.push(redirectPath);
      });
    }
  },
};
</script>
