<script>
/**
 * Auth component
 */
export default {
  data() {
    return {};
  },
  computed: {
    loader(){
      return this.$store.getters.LOADER
    }
  }
};
</script>

<template>
  <div>
      <div class="account-pages mt-5 mb-5">
        <b-overlay :show="loader" rounded="sm">
          <template #overlay>
            <div class="d-flex align-items-center">
              <b-spinner small type="grow" variant="danger"></b-spinner>
              <b-spinner type="grow" variant="danger"></b-spinner>
              <b-spinner small type="grow" variant="danger"></b-spinner>
              <span class="sr-only">Please wait...</span>
            </div>
          </template>
          <div class="container">
            <slot />
          </div>
        </b-overlay>
        <!-- end container -->
      </div>
      <!-- end page -->
      <footer class="footer footer-alt">
        {{ new Date().getFullYear() }} &copy; <a class="text-danger" href="mortiply.com">Mortiply Hub</a>
      </footer>
  </div>
</template>
