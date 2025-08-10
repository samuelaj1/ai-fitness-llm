<template>
  <BaseDashboardLayout>
    <template v-slot:title>
      <h4 class="title mb-5">Saved leads</h4>
    </template>
    <div class="row">
      <div class="col-md-8 text-center">
        <div class="mb-4">
          <div class="folder-icon">
            <i class="bi bi-folder2-open"></i>
          </div>
        </div>
        <h2 class="mb-3">You don't have any saved leads</h2>
        <p class="mb-4">Save a lead to access it later</p>
        <b-button variant="primary" class="custom-button btn-sm btn">Your next lead is just around the corner</b-button>
      </div>
    </div>

  </BaseDashboardLayout>
</template>

<script>
import BaseDashboardLayout from '../../base-layout/tradesperson-dashboard';
import appConfig from "../../../../app.config.json"; // Adjust the import path as necessary

export default {
  page: {
    title: "Saved Leads",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: {
    BaseDashboardLayout
  },
  mounted() {
    $('#saved-leads').addClass('active')
  },
};
</script>

<style scoped>
.folder-icon {
  background-color: #e9f7ef;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100px; /* Adjust size as needed */
  height: 100px; /* Adjust size as needed */
}

.folder-icon i {
  font-size: 50px; /* Adjust the icon size as needed */
  color: var(--primary-color1) !important;
}

.custom-button {
  background-color: var(--primary-color1) !important;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
}
</style>