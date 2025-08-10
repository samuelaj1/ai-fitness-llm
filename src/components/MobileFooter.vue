<!-- Header Structure -->
<template>
  <div class="row d-md-none d-sm-block mt-5">
    <div
        class="b-mobile-bar b-mobile-bar-new active"
    >
      <div class="b-mobile-bar-item-outer">
        <router-link
            to="/"
            class="qa-create-advert-icon b-mobile-bar-item"
        >
          <i class="fa fa-home"/>
          <div style="font-size: 0.7rem">Home</div>
        </router-link>
      </div>
      <div class="b-mobile-bar-item-outer">
        <router-link
            to="/transaction"
            class="qa-create-advert-icon b-mobile-bar-item"
        >
          <i class="fa fa-cut"/>

          <div style="font-size: 0.7rem">Transaction Hall</div>
        </router-link>
      </div>

      <div class="b-mobile-bar-item-outer">
        <router-link
            to="/earn-interest"
            class="qa-create-advert-icon b-mobile-bar-item"
        >
          <i class="fa fa-money-bill-alt"/>
          <div style="font-size: 0.7rem">Earn Interest</div>
        </router-link>
      </div>
      <div class="b-mobile-bar-item-outer">
        <router-link to="/profile"
           class="qa-create-advert-icon b-mobile-bar-item"
        >
          <i class="fa fa-user-alt"/>
          <div style="font-size: 0.7rem">Profile</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Mobile-Footer",
  data() {
    return {
      login_type: ""
    };
  },
  created() {

  }
};
</script>
<style scoped>
a.router-link-exact-active {
  color: #ffffff !important;
  text-decoration: none;
  background-color: transparent;
}

.b-mobile-bar-new {
  bottom: 0;
}

i {
  font-size: 1.3rem !important;
}
/*mobile bottom navigation*/

  .b-mobile-bar.b-mobile-bar-new.active {
    -webkit-transform: translate(0);
    -ms-transform: translate(0);
    transform: translate(0);
  }

.b-mobile-bar.b-mobile-bar-new {
  position: fixed;

  left: 0;
  width: 100%;
  background-color: #3bafda;
  z-index: 10;
  height: 48px;
  padding: 2.5rem 30px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-transform: translateY(160%);
  -ms-transform: translateY(160%);
  transform: translateY(160%);
  -webkit-transition: -webkit-transform 0.3s ease-in;
  transition: -webkit-transform 0.3s ease-in;
  -o-transition: transform 0.3s ease-in;
  transition: transform 0.3s ease-in;
  transition: transform 0.3s ease-in, -webkit-transform 0.3s ease-in;
}

.b-mobile-bar.b-mobile-bar-new .b-mobile-bar-item-holder,
.b-mobile-bar.b-mobile-bar-new .b-mobile-bar-item-outer {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  position: relative;
}
.b-mobile-bar.b-mobile-bar-new .b-mobile-bar-item--active {
  color: #3db83a;
}
.b-mobile-bar.b-mobile-bar-new .b-mobile-bar-item {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  font-size: 9px;
  line-height: 16px;
  color: #d2d2d2;
}
</style>
