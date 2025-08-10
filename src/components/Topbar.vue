
<template>
  <!-- Topbar Start -->
  <div class="navbar-custom">
    <div class="container-fluid">
      <ul class="list-unstyled topnav-menu float-right mb-0">

        <b-nav-item-dropdown
          right
          class="notification-list topbar-dropdown"
          menu-class="profile-dropdown"
          toggle-class="p-0"
        >
          <template slot="button-content" class="nav-link dropdown-toggle">
            <div class="nav-user mr-0">
              <b-avatar size="md" variant="light" class="text-dark  font-15"
              >
                <span class="">{{ admin.name | initials }}</span>

              </b-avatar>
              <span class="pro-user-name ml-1">
                  {{admin.name}}
                <i class="mdi mdi-chevron-down"></i>
              </span>
              <br>

            </div>
          </template>
<!--          <b-dropdown-item>-->
<!--            <router-link to="/settings/auth-settings">-->
<!--              <i class="remixicon-settings-3-line"></i>-->
<!--              <span>{{ $t("settings") }}</span>-->
<!--            </router-link>-->
<!--          </b-dropdown-item>-->

          <b-dropdown-divider></b-dropdown-divider>
          <a class="dropdown-item" href="" @click.prevent="logout">
            <i class="fe-log-out mr-1"></i>
            <span>{{ $t("logout") }}</span>
          </a>
        </b-nav-item-dropdown>


      </ul>

      <!-- LOGO -->
      <div class="logo-box">
        <router-link to="/" class="logo logo-dark text-center">
          <span class="logo-sm">
            <img src="@/assets/images/logo-white.png" alt height="24" />
            <!-- <span class="logo-lg-text-light">Minton</span> -->
          </span>
          <span class="logo-lg">
            <img src="@/assets/images/logo-white.png" alt height="20" />
            <!-- <span class="logo-lg-text-light">M</span> -->
          </span>
        </router-link>

        <router-link to="/" class="logo logo-light text-center">
          <span class="logo-sm" @click="horizonalmenu()">
            <img src="@/assets/images/logo-white.png" alt height="35" />
          </span>
          <span class="logo-lg">
            <img src="@/assets/images/logo-white.png" alt height="100" />
          </span>
        </router-link>
      </div>

      <ul class="list-unstyled topnav-menu topnav-menu-left m-0">
        <li class=" d-lg-block">
          <button
            class="button-menu-mobile waves-effect waves-light"
            @click="toggleMenu"
          >
            <i class="fe-menu"></i>
          </button>
        </li>

        <li>
          <!-- Mobile menu toggle (Horizontal Layout)-->
          <a
            class="navbar-toggle nav-link"
            data-toggle="collapse"
            @click="horizonalmenu()"
            data-target="#topnav-menu-content"
          >
            <div class="lines">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </a>
          <!-- End mobile menu toggle-->
        </li>


      </ul>
      <div class="clearfix"></div>
    </div>
  </div>
  <!-- end Topbar -->
</template>

<script>
/**
 * Topbar component
 */
export default {
  name: "Topbar",
  data() {
    return {
      languages: [
        {
          flag: require("@/assets/images/flags/us.jpg"),
          language: "en",
          title: "English",
        },
        {
          flag: require("@/assets/images/flags/french.jpg"),
          language: "fr",
          title: "French",
        },
        {
          flag: require("@/assets/images/flags/spain.jpg"),
          language: "es",
          title: "Spanish",
        },
        {
          flag: require("@/assets/images/flags/china.png"),
          language: "zh",
          title: "Chinese",
        },
        {
          flag: require("@/assets/images/flags/arabic.png"),
          language: "ar",
          title: "Arabic",
        },
      ],
      current_language: this.$i18n.locale,
      text: null,
      flag: null,
      value: null,
    };
  },
  computed: {
    admin() {
        return this.$store.getters.GET_USER_INFO
    }
  },
  mounted() {
    this.value = this.languages.find((x) => x.language === this.$i18n.locale);
    this.text = this.value.title;
    this.flag = this.value.flag;
  },
  methods: {
    logout(){
      this.$store.dispatch('logout');
    },
    /**
     * Toggle menu
     */
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    /**
     * Full screen
     */
    /**
     * Toggle rightbar
     */
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    /**
     * Set languages
     */
    setLanguage(locale, country, flag) {
      this.$i18n.locale = locale;
      this.current_language = locale;
      this.text = country;
      this.flag = flag;
    },
    /**
     * Horizontal-toggle menu
     */
    horizonalmenu() {
      let element = document.getElementById("topnav-menu-content");
      element.classList.toggle("show");
    },

  },
};
</script>
