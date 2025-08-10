<template>
  <div>
    <RoleBasedHeader :userRole="userRole" />

    <div class="login-area mt-50 mb-120">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="form-wrapper">
              <div class="form-title mb-25">
                <h3>Admin Registration</h3>
                <span></span>
              </div>

              <div v-if="errorMessage" class="alert alert-danger">
                <ul class="mb-0">
                  <li>{{ errorMessage }}</li>
                </ul>
              </div>

              <form @submit.prevent="registerAdmin">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-inner mb-20">
                      <label for="name">Name</label>
                      <input type="text" id="name" v-model="name" placeholder="" required>
                    </div>

                    <div class="form-inner mb-20">
                      <label for="email">Email</label>
                      <input type="email" id="email" v-model="email" placeholder="" required>
                    </div>

                    <div class="form-inner mb-20">
                      <label class="large-font" for="password">Password</label>
                      <input
                          v-model="password"
                          :type="obscurePassword ? 'password' : 'text'"
                          id="password"
                          placeholder=""
                          required
                          @copy.prevent
                          @paste.prevent
                          @cut.prevent
                      />
                      <i class="bi bi-eye-slash" @click="obscurePassword = !obscurePassword" v-if="!obscurePassword"></i>
                      <i class="bi bi-eye" @click="obscurePassword = !obscurePassword" v-else></i>
                    </div>

                    <div class="form-inner mb-20">
                      <label class="large-font" for="confirmPassword">Confirm Password</label>
                      <input
                          v-model="confirmPassword"
                          :type="obscurePassword ? 'password' : 'text'"
                          id="confirmPassword"
                          placeholder=""
                          required
                          @copy.prevent
                          @paste.prevent
                          @cut.prevent
                      />
                    </div>
                  </div>

                  <div class="col-lg-12 mb-4">
                    <div class="form-inner">
                      <button class="btn bg-primary-1 text-light" type="submit" :disabled="isLoading">
                        <b-spinner small v-if="isLoading"></b-spinner>
                        {{ isLoading ? 'Submitting...' : 'Register' }}
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
import appConfig from "../../../../app.config.json";
import topHeader from '../../base-layout/header-2'
import store from "@/store/store";
import RoleBasedHeader from "@/views/base-layout/roleBasedHeader";
import {userService} from "@/apis/user.service";

export default {
  page: {
    title: "Admin Registration",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      obscurePassword: true,
      isLoading: false,
      errorMessage: ''
    };
  },
  components: {
    topHeader,
    RoleBasedHeader
  },
  computed: {
    userRole() {
      const loggedUser = store.getters.GET_USER_INFO;
      return loggedUser?.roles?.[0] || '';
    },
  },
  methods: {
    registerAdmin() {
      this.isLoading = true;
      this.errorMessage = '';

      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Passwords do not match.";
        this.isLoading = false;
        return;
      }

      userService.adminRegister({
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.confirmPassword,
      }).then((res) => {
        this.isLoading = false
        const {status, message} = res;
        if (!status) {
          this.errorMessage = message
          return;
        }
        this.loginAdmin();
      });
    },
    loginAdmin() {
      this.isLoading = true
      this.errorMessage = ''
      this.$store.dispatch("adminLogin", {
        email: this.email,
        password: this.password,
      }).then(() => {
        this.$router.push('/admin');
      }).catch((message) => {
        this.errorMessage = message;
      }).finally(() => {
        this.isLoading = false;
      });
      this.$store.dispatch("clear");
    }

  },
  mounted() {
    $('.sidebar-button').on("click", () => $('.main-menu').addClass('show-menu'));
    $('.menu-close-btn').on("click", () => $('.main-menu').removeClass('show-menu'));
    $('body').removeClass('bg-wight');
  }
};
</script>



