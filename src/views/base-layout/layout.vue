<template>
  <div>
      <div class="container">
        <ul class="nav justify-content-end mt-4">
          <li class="nav-item">
            <router-link to="/analytics" class="nav-link active">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/" class="nav-link active">Onboarding</router-link>
          </li>
          <li class="nav-item">
            <router-link  to="/daily-check-in" class="nav-link">Daily Check In</router-link>
          </li>

          <li class="nav-item">
            <router-link  to="/chat" class="nav-link">Coach Chat</router-link>
          </li>

          <li class="nav-item">
            <router-link  to="/goals" class="nav-link">Goals</router-link>
          </li>

          <!-- Submenu for Saved Plans -->
          <li class="nav-item dropdown">
            <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
              Saved Plans
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link to="/saved-plans/workouts" class="dropdown-item">
                  🏋️ Workout Plans
                </router-link>
              </li>
              <li>
                <router-link to="/saved-plans/diet-interventions" class="dropdown-item">
                  🥗 Diet Interventions
                </router-link>
              </li>
              <li>
                <router-link to="/saved-plans/diet-plans" class="dropdown-item">
                  🍴 Diet Plans
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
        <div class="mt-4 text-end pe-4">
          <router-link to="/profile-menu" v-if="isMobile" class="mb-3">
            <i class="bi bi-chevron-left"></i> Back to Menu
          </router-link>
        </div>
<!--        <slot name="title"></slot>-->
        <slot></slot>
      </div>
    <MobileFooter></MobileFooter>
  </div>
</template>

<script>
import topHeader from '../base-layout/header-2';
import SideBar from './navigation/tradesperson-sidebar';
import MobileFooter from '../../components/mobile-nav';

export default {
  components: {
    topHeader,
    SideBar,
    MobileFooter
  },
  data() {
    return {
      isMobile: false,
      showMainContent: false
    };
  },
  methods: {
    handleNavigation() {
      if (this.isMobile) {
        this.showMainContent = true;
      }
    },
    toggleView() {
      this.showMainContent = !this.showMainContent;
    },
    checkScreenSize() {
      this.isMobile = window.innerWidth < 768;
      if (this.isMobile) {
        this.showMainContent = true;
      }
    },
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
