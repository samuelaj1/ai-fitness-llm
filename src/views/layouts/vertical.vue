<template>
  <!-- Begin page -->

  <div id="wrapper">
    <Sidebar :theme="sideBarTheme" :topbarTheme="topBarTheme"/>
    <!-- ============================================================== -->
    <!-- Start Page Content here -->
    <!-- ============================================================== -->

    <div class="content-page" style="margin-top: 30px">
      <div class="content">
        <Topbar />
        <!-- Start Content-->
        <div class="container-fluid">
          <slot />
        </div>
      </div>
      <Footer />
    </div>
  </div>

</template>


<script>

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

/**
 * Vertical layout
 */
export default {
  components: {
    Sidebar,
    Topbar,
    Footer,
  },
  props: {
    sideBarTheme: {
      type: String,
      default: 'dark' //light, dark, gradient, brand, red
    },
    topBarTheme: {
      type: String,
      default: 'dark' //light, dark, red
    },
  },
  data() {
    return {
      isMenuCondensed: false,
    };
  },
  mounted() {
    document.body.removeAttribute("data-layout-mode");
    document.body.removeAttribute("data-sidebar-showuser");
  },
  methods: {
    toggleRightSidebar() {
      document.body.classList.toggle("right-bar-enabled");
    },
    hideRightSidebar() {
      document.body.classList.remove("right-bar-enabled");
    },
    toggleMenu() {
      this.isMenuCondensed = !this.isMenuCondensed;
      if (this.isMenuCondensed)
        document.body.setAttribute("data-sidebar-size", "condensed");
      else document.body.removeAttribute("data-sidebar-size", "condensed");

      if (window.screen.width >= 992) {
        this.$router.afterEach((routeTo, routeFrom) => {
          document.body.classList.remove("sidebar-enable");
        });
      } else {
        document.body.setAttribute("data-sidebar-size", "default");
        document.body.classList.toggle("sidebar-enable");
        this.$router.afterEach((routeTo, routeFrom) => {
          document.body.classList.remove("sidebar-enable");
        });
      }
    },
  },
};
</script>

