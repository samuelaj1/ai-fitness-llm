<template>
  <Auth>
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
              <b-alert
                  variant="success"
                  class="mt-3"
                  v-if="linkSent"
                  :show="10"
                  dismissible
              >{{ message }}
              </b-alert>
        <div class="card">
          <div class="card-body p-4">
            <div v-if="emailVerify">
              <p v-if="loading">Verifying your email...</p>
            </div>
            <div v-else>
              <div class="text-center w-75 m-auto">
                <div class="auth-logo">
                  <router-link to="/" class="logo logo-dark text-center">
                  <span class="logo-lg">
                    <img src="@/assets/images/mortiply-logo-red.png" alt height="60"/>
                  </span>
                  </router-link>

                  <router-link to="/" class="logo logo-light text-center">
                  <span class="logo-lg">
                    <img src="@/assets/images/mortiply-logo-red.png" alt height="60"/>
                  </span>
                  </router-link>
                </div>
              </div>

              <div class="text-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 98 98"
                    style="height: 120px"
                    xml:space="preserve"
                >
                <g>
          <circle id="XMLID_50_" class="st0" cx="49" cy="49" r="49"/>
                  <g id="XMLID_4_">
            <path
                id="XMLID_49_"
                class="st1"
                d="M77.3,42.7V77c0,0.6-0.4,1-1,1H21.7c-0.5,0-1-0.5-1-1V42.7c0-0.3,0.1-0.6,0.4-0.8l27.3-21.7
                                                c0.3-0.3,0.8-0.3,1.2,0l27.3,21.7C77.1,42.1,77.3,42.4,77.3,42.7z"
            />
                    <path
                        id="XMLID_48_"
                        class="st2"
                        d="M66.5,69.5h-35c-1.1,0-2-0.9-2-2V26.8c0-1.1,0.9-2,2-2h35c1.1,0,2,0.9,2,2v40.7
                                                C68.5,68.6,67.6,69.5,66.5,69.5z"
                    />
                    <path
                        id="XMLID_47_"
                        class="st1"
                        d="M62.9,33.4H47.2c-0.5,0-0.9-0.4-0.9-0.9v-0.2c0-0.5,0.4-0.9,0.9-0.9h15.7
                                                c0.5,0,0.9,0.4,0.9,0.9v0.2C63.8,33,63.4,33.4,62.9,33.4z"
                    />
                    <path
                        id="XMLID_46_"
                        class="st1"
                        d="M62.9,40.3H47.2c-0.5,0-0.9-0.4-0.9-0.9v-0.2c0-0.5,0.4-0.9,0.9-0.9h15.7
                                                c0.5,0,0.9,0.4,0.9,0.9v0.2C63.8,39.9,63.4,40.3,62.9,40.3z"
                    />
                    <path
                        id="XMLID_45_"
                        class="st1"
                        d="M62.9,47.2H47.2c-0.5,0-0.9-0.4-0.9-0.9v-0.2c0-0.5,0.4-0.9,0.9-0.9h15.7
                                                c0.5,0,0.9,0.4,0.9,0.9v0.2C63.8,46.8,63.4,47.2,62.9,47.2z"
                    />
                    <path
                        id="XMLID_44_"
                        class="st1"
                        d="M62.9,54.1H47.2c-0.5,0-0.9-0.4-0.9-0.9v-0.2c0-0.5,0.4-0.9,0.9-0.9h15.7
                                                c0.5,0,0.9,0.4,0.9,0.9v0.2C63.8,53.7,63.4,54.1,62.9,54.1z"
                    />
                    <path
                        id="XMLID_43_"
                        class="st2"
                        d="M41.6,40.1h-5.8c-0.6,0-1-0.4-1-1v-6.7c0-0.6,0.4-1,1-1h5.8c0.6,0,1,0.4,1,1v6.7
                                                C42.6,39.7,42.2,40.1,41.6,40.1z"
                    />
                    <path
                        id="XMLID_42_"
                        class="st2"
                        d="M41.6,54.2h-5.8c-0.6,0-1-0.4-1-1v-6.7c0-0.6,0.4-1,1-1h5.8c0.6,0,1,0.4,1,1v6.7
                                                C42.6,53.8,42.2,54.2,41.6,54.2z"
                    />
                    <path
                        id="XMLID_41_"
                        class="st1"
                        d="M23.4,46.2l25,17.8c0.3,0.2,0.7,0.2,1.1,0l26.8-19.8l-3.3,30.9H27.7L23.4,46.2z"
                    />
                    <path
                        id="XMLID_40_"
                        class="st3"
                        d="M74.9,45.2L49.5,63.5c-0.3,0.2-0.7,0.2-1.1,0L23.2,45.2"
                    />
          </g>
        </g>
      </svg>

                <div v-if="verificationComplete">
                  <div>
                    <h3 v-if="verificationStatus">Success !</h3>
                    <p>{{ message }}</p>
                    <router-link to="/login"
                                 class="btn btn-block btn-dark waves-effect waves-light mt-3"
                    >Go to Login
                    </router-link>
                  </div>


                </div>
                <div v-else>
                  <h3>Verify your email</h3>
                  <p class="text-muted mt-2">
                    A verification email has been sent to
                    <span class="font-weight-medium">{{ email }}</span>.
                    Please check your inbox and click the link to verify your email address.
                  </p>
                  <button @click="resendVerification"
                      class="btn btn-block btn-primary waves-effect waves-light mt-3"
                  >Resend verification link
                  </button
                  >
                </div>
              </div>
            </div>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Auth>
</template>

<script>
import Auth from "../../layouts/auth";
import appConfig from "../../../../app.config.json";
import {userService} from "@/apis/user.service";

/**
 * Confirm Mail component
 */
export default {
  components: {
    Auth,
  },
  page: {
    title: "Confirm Mail",
    meta: [{name: "description", content: appConfig.description}],
  },
  data() {
    return {
      loading: false,
      linkSent: false,
      email: '',
      message: '',
      success: false,
      emailVerify: false,
      verificationComplete: false,
      verificationStatus: false,
      verify: null,
    };
  },
  methods: {
    async verifyEmail(id, hash) {
      this.loading = true;
      userService.verifyEmail(id, hash).then((response) => {
        this.loading = false;
        this.emailVerify = false;
        this.verificationComplete = true;
        const {status, message} = response;
        this.verificationStatus = status;
        this.message = message;
      })
    },
    async resendVerification() {
      this.loading = true;
      userService.resendVerifyEmail(this.email).then((response) => {
        this.loading = false;
        const {status, message} = response;
        this.message = message;
        if (!status) {
          this.verificationComplete = true;
          return
        }
        this.linkSent = true;

      })
    },
  },
  mounted() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const hash = params.get('hash');
    this.email = params.get('email');
    this.verify = params.get('verify');
    if (id && hash) {
      this.emailVerify = true;
      this.verifyEmail(id, hash);
      return;
    }
    if (!this.email) {
      this.$router.push('/login');
    }
    if (this.verify) {
      this.resendVerification();
    }
  },
  layout: "auth",

};
</script>

<style scoped>
.st0 {
  fill: #ffffff;
}

.st1 {
  fill: #f04a44;
}

.st2 {
  fill: #ffffff;
  stroke: #f04a44;
  stroke-width: 2;
  stroke-miterlimit: 10;
}

.st3 {
  fill: none;
  stroke: #ffffff;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-miterlimit: 10;
}
</style>
