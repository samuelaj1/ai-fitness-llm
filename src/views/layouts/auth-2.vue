<script>
/**
 * Auth-2 component
 */
export default {
  data() {
    return {};
  },
};
</script>

<template>
  <div class="auth-fluid">
    <!-- Auth fluid right content -->
    <div class="auth-fluid-right">
      <div class="auth-user-testimonial">
        <h3 class="mb-3 text-white">Mortiply Shipping</h3>
        <p class="lead font-weight-normal">
          <i class="mdi mdi-format-quote-open"></i>Mortiply drop shipping is the best drop shipping platform I have ever used. It is very easy to use and the customer service is top notch. I would recommend it to anyone who is looking to start a drop shipping business.<i class="mdi mdi-format-quote-close"></i>
          <i class="mdi mdi-format-quote-close"></i>
        </p>
        <h5 class="text-white">- Admin User</h5>
      </div>
      <!-- end auth-user-testimonial-->
    </div>
    <!-- end Auth fluid right content -->

    <!--Auth fluid left content -->
    <div class="auth-fluid-form-box">
      <div class="align-items-center d-flex h-100">
        <div class="card-body">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
