<template>
  <!-- start page title -->
  <div class="row">
    <div class="col-12">
      <div
        class="page-title-box"
        :class="{
          'page-title-box-alt': 'vertical'

        }"
      >

        <template v-if="path.label === 'navMenu'">
          <h4 class="page-title">
            {{title}} <small v-if="loader" id="process">{{processing}}</small>
          </h4>
        </template>
        <template v-else>
          <h4 class="page-title" @click="onGoBackTapped" style="cursor: pointer">
            <i class="fas fa-arrow-left mr-1"></i> Go back
          </h4>
        </template>

<!--        <div class="page-title-right">-->
<!--          <b-breadcrumb :items="items" class="m-0"></b-breadcrumb>-->
<!--        </div>-->
      </div>
    </div>
  </div>
  <!-- end page title -->
</template>

<script>

/**
 * Page-header component
 */
export default {
  components: {},

  computed: {
    loader(){
      return this.$store.getters.LOADER
    },
    processing(){
      return this.$store.getters.PROCESSING_DATA
    },
    title(){
      return this.$store.getters.GET_PAGE_TITLE;
    },
    path(){
      const p  = this.$store.getters.GET_ROUTE;

      if(p.length === 1){
        return {
          label: 'home'
        }
      }
     else if(p.length === 2){
        return {
          label: 'navMenu'
        }
      }
        else{
        return {
          label: 'goBack'
        }
      }
    },

  },
  methods: {
    onGoBackTapped(){
      this.$store.dispatch('popRoutePath');
      this.$router.back();
    }
  },

};
</script>