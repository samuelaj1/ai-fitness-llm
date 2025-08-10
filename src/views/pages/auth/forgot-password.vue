<template>
  <div>
    <topHeader></topHeader>
    <div class="login-area mt-50 mb-120">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="form-wrapper">

              <div v-if="error" class="alert alert-danger">
                <ul class="mb-0">
                  <li>{{ error }}</li>
                </ul>
              </div>

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

                <div v-if="step ===1">
                  <div class="form-title mb-3">
                    <h3>Reset your password</h3>
                    <span></span>
                  </div>
                  <p class="text-muted  text-center mb-4 mt-3">
                    Tell us the email for your account and we'll send a password reset link.
                  </p>

                  <div class="form-inner mb-20">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" v-model="email" placeholder="" required>
                  </div>
                  <div class="form-inner">
                    <button class="btn bg-primary-1 text-light" type="submit" :disabled="loading">
                      <b-spinner small v-if="loading"></b-spinner>
                      {{ loading ? 'Submitting..' : 'Reset password' }}
                    </button>
                  </div>
                </div>
                <div v-if="step===2" class="text-center">
                  <h4>Please check your email</h4>
                  <p class="text-muted small mb-4">We just sent a reset link to {{ email }}. If you haven’t received it after a few minutes, check your
                    spam folder. If it’s not there, you may have signed up with a different email.</p>
                  <button class="btn btn-dark btn-block mt-3" @click="tryToReset" v-if="!loading" type="submit">
                    Resend email
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

    <!-- end row -->
  </div>
</template>

<script>
import appConfig from "../../../../app.config.json";
import topHeader from '../../base-layout/header-2'

import {userService} from "@/apis/user.service";

/**
 * Forgot-password component
 */
export default {
  page: {
    title: "Forgot-password",
    meta: [{name: "description", content: appConfig.description}],
  },
  data() {
    return {
      email: "",
      loading: false,
      isResetError: false,
      error: null,
      step: 1
    };
  },
  components: {
    topHeader,
  },
  methods: {
    async tryToReset() {
      this.loading = true;
      userService.forgotPassword({
        email: this.email
      }).then((res) => {
        const {status, message,} = res;
        this.loading = false;
        if (!status) {
          // if (message.toLowerCase().includes('email')) {
          //   this.error = message;
          // }
          this.error = message;
          return;
        }

        this.step = 2
      });
    },
  },
};
</script>