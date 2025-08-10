<template>
  <nav class="bottom-nav navbar navbar-expand navbar-light bg-light justify-content-around d-md-none"
       v-if="isMobile && loggedIn">
    <router-link class="nav-link" id="new-leads" to="/new-leads">
      <i class="bi bi-house-door-fill d-block"></i>
      <small>New Leads</small>
    </router-link>
    <router-link class="nav-link" id="inbox" to="/inbox">
      <i class="bi bi-envelope d-block"></i>
      <small>Inbox</small>
    </router-link>
    <router-link class="nav-link" id="contacts" to="/my-proposals/contacts">
      <i class="bi bi-people d-block"></i>
      <small>Contacts</small>
    </router-link>
    <router-link class="nav-link" id="profile" to="/profile-menu">
      <i class="bi bi-person-circle d-block"></i>
      <small>Profile</small>
    </router-link>
  </nav>
</template>

<script>

export default {
  name: "mobile-nav",
  data() {
    return {
      isMobile: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.GET_USER_INFO;
    }
  },
  methods: {
    checkScreenSize() {
      this.isMobile = window.innerWidth < 768;
    },
  },
  created() {

  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  }
};
</script>

<style scoped>
.nav-link.router-link-exact-active {
  color: #00A7AC;
}

</style>