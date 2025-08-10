<template>
  <div>
    <homeOwnerHeader v-if="isHomeOwner"/>
    <topHeader v-else/>

    <div class="container py-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="mb-0">Search Results for "{{ searchTerm }}"</h2>
        <button class="btn btn-primary d-flex align-items-center gap-2" @click="goToAskTrade">
          <i class="bi bi-pencil-square"></i>
          Ask a Question
        </button>
      </div>

      <div v-if="loading" class="text-center">
        <div class="spinner-border" role="status"></div>
      </div>

      <div v-else-if="results.length === 0" class="text-muted">
        No matching questions or answers found.
      </div>

      <div v-else>
        <div v-for="result in results" :key="result.id" class="border rounded p-3 mb-3 bg-white shadow-sm">
          <h5 class="small text-muted">{{ result.user?.name }}</h5>
          <router-link :to="{ name: 'ForumDetails', params: { id: result.id }, query:{q:result.content} }"
                       class="text-decoration-none">
            <div class="mb-2">{{ result.content }}</div>
          </router-link>

          <div class="text-muted small ">{{ formatDate(result.created_at) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {userService} from "@/apis/user.service";
import store from "@/store/store";
import homeOwnerHeader from '../base-layout/navigation/homeowner-menu';
import topHeader from '../base-layout/navigation/homeowner-menu';

export default {
  name: "SearchResults",
  data() {
    return {
      searchTerm: this.$route.query.q || '',
      results: [],
      loading: false
    };
  },
  components: {
    topHeader,
    homeOwnerHeader
  },
  computed: {
    isHomeOwner() {
      const user = store.getters.GET_USER_INFO;
      return user?.roles?.[0] === 'homeowner';
    }
  },
  watch: {
    '$route.query.q'(newVal) {
      this.searchTerm = newVal;
      this.fetchResults();
    }
  },
  methods: {
    async fetchResults() {
      if (!this.searchTerm) return;

      this.loading = true;
      userService.searchForum(this.searchTerm.trim()).then((res) => {
        this.loading = false;
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.results = extra;
      });
    },
    formatDate(dateStr) {
      return new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }).format(new Date(dateStr));
    },
    goToAskTrade() {
      this.$router.push({path: '/ask-a-trade'});
    }
  },
  mounted() {
    this.fetchResults();
  }
};
</script>
