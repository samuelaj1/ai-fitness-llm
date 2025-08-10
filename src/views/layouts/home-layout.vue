<template>
  <div>
    <!-- Begin page -->
    <component
        :is="layoutComponent"
        :sideBarTheme="sideBarTheme"
        :topBarTheme="topBarTheme"
    >
      <b-overlay :show="loader" rounded="sm">
        <template #overlay>
          <div>
            <b-spinner small type="grow" variant="danger"></b-spinner>
            <b-spinner type="grow" variant="danger"></b-spinner>
            <b-spinner small type="grow" variant="danger"></b-spinner>
            <span class="sr-only text-dark">Please wait...</span>
          </div>
        </template>
        <slot />
      </b-overlay>
    </component>
  </div>
</template>

<script>
import Vertical from "./vertical";
import Horizontal from "./horizontal";
import PageHeader from "@/components/Page-header";

export default {
  components: {
    Vertical,
    Horizontal,
    PageHeader,
  },
  props: {
    layoutType: {
      type: String,
      default: "horizontal",
    },
  },
  computed: {
    layoutComponent() {
      if(this.layoutType === 'horizontal'){
        return 'Horizontal';
      }
      return 'Vertical';
    },
    sideBarTheme() {
      if(this.layoutType === 'vertical'){
        return 'light';
      }else if(this.layoutType === 'vertical-admin'){
        return 'dark';
      }else if(this.layoutType === 'horizontal'){
        return undefined;
      }
      return 'light'
    },
    topBarTheme() {
      if(this.layoutType === 'vertical'){
        return 'red';
      }else if(this.layoutType === 'vertical-admin'){
        return 'dark';
      }else if(this.layoutType === 'horizontal'){
        return 'red';
      }
      return 'light'
    },
    loader() {
      return this.$store.getters.LOADER;
    },
  },
};
</script>
