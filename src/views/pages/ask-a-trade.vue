<!-- ForumHome.vue -->
<template>
  <div>
    <homeOwnerHeader v-if="isHomeOwner"/>
    <topHeader v-else/>

    <div class="container py-5">
      <div class="mb-4 position-relative">
        <form @submit.prevent="goToSearch">
          <input type="text"
                 class="form-control"
                 placeholder="Search questions or answers..."
                 v-model="searchQuery"/>
        </form>
      </div>

      <h1 class="mb-4">Forum</h1>

      <div class="mb-5 border p-4 rounded bg-white shadow-sm">
        <textarea v-model="newQuestion" rows="3" class="form-control mb-3"
                  placeholder="Have a question? Ask here..."></textarea>
        <button class="btn btn-primary" @click="submitQuestion">
          <i class="bi bi-question-circle me-2"></i>Post Question
        </button>
      </div>

      <div v-for="question in questions" :key="question.id" class="mb-4 border-bottom pb-3">
        <router-link :to="{ name: 'ForumDetails', params: { id: question.id }, query:{q:question.content} }" class="text-decoration-none">
          <h5 class="fw-bold">{{ question.content }}</h5>
        </router-link>
        <div class="text-muted small">{{ question.user.name }} | {{ formatDate(question.created_at) }}</div>
      </div>
    </div>
  </div>
</template>



<script>
import homeOwnerHeader from '../base-layout/navigation/homeowner-menu';
import topHeader from '../base-layout/navigation/homeowner-menu';
import store from "@/store/store";
import appConfig from "../../../app.config.json";
import {userService} from "@/apis/user.service";

export default {
  name: "AskForum",
  page: {
    title: "Ask a Trade",
    meta: [{name: "description", content: appConfig.description}]
  },
  data() {
    return {
      user: store.getters.GET_USER_INFO,
      newQuestion: "",
      questions: [],
      questionLoader: false,
      searchQuery: "",
      searchResults: [],
      searchDebounce: null,
      isDropdownOpen: false
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
  methods: {
    formatDate(dateStr) {
      if (!dateStr) return '';
      return new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }).format(new Date(dateStr));
    },

    loadQuestions() {
      this.questionLoader = true;
      userService.getForumQuestions().then((res) => {
        this.questionLoader = false;
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.questions = extra.map(q => ({
          ...q,
          newAnswer: '',
          answers: q.comments.map(a => ({
            ...a,
            replies: a.replies || [],
            newReply: '',
            showReplyInput: false
          }))
        }));
      });
    },

    submitQuestion() {
      if (!this.newQuestion.trim()) return;
      const payload = {content: this.newQuestion};

      userService.askQuestions(payload).then(async (res) => {
        const {status, message} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.newQuestion = "";
        this.loadQuestions();
      });
    },


    handleClickOutside(event) {
      const wrapper = this.$refs.searchWrapper;
      if (wrapper && !wrapper.contains(event.target)) {
        this.isDropdownOpen = false;
      }
    },
    goToSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push({ name: 'SearchResults', query: { q: this.searchQuery.trim() } });
      }
    }
  },
  mounted() {
    this.loadQuestions();
  },
};
</script>


<style scoped>
textarea {
  resize: vertical;
}

.text-muted {
  font-size: 0.85rem;
}


</style>

