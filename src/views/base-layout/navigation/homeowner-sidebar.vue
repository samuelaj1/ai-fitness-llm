<template>
  <div>
    <div class="row">
      <!-- My Chats Section -->
      <div class="col-md-12">
        <div class="card mb-4">
          <div class="card-header">
            <h5>My chats</h5>
          </div>
          <div class="card-body">
            <p v-if="chatTradespeople.length <1">You didn't start a chat with any tradespeople yet. Start a chat to get
              your job done soon.</p>
            <ul class="list-group list-group-flush" v-else>
              <li class="list-group-item" v-for="(person,i) in chatTradespeople" :key="i">
                <div class="d-flex align-items-center justify-content-between">
                  <div>
                    {{ person.invited_user.name }}
                    <span v-if="unreadMessages[person.invited_user_id] > 0" class="badge bg-danger ms-2">
        {{ unreadMessages[person.invited_user_id] }} new
      </span>
                  </div>
                  <router-link
                      :to="`/homeowner/chat/${jobId}?id=${person.id}`"
                      class="btn btn-sm btn-primary"
                  >
                    Message
                  </router-link>
                </div>
              </li>

            </ul>

          </div>
        </div>
      </div>

      <div class="col-md-12">
        <div class="card mb-4">
          <div class="card-header">
            <h5>Interested tradespeople</h5>
          </div>
          <div class="card-body">
            <div v-if="interestedTradespeople.length <1">
              <p>Tradespeople interested in your job will show here.</p>
              <p>Waiting for more tradespeople</p>
            </div>

            <ul class="list-group list-group-flush" v-else>
              <li class="list-group-item" v-for="(interest,i) in interestedTradespeople" :key="i">
                <div class="d-flex align-items-center justify-content-between">
                  <router-link :to="`/user-profile/${interest.invited_user.id}`" class="highlight">
                    {{ interest.invited_user.name }}
                  </router-link>
                  <button class="btn btn-sm btn-primary" @click="acceptInvite(interest)"
                          v-if="interest.status !=='accepted'">Accept
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Get More Responses Section -->
      <div class="col-md-12">
        <div class="card mb-4">
          <div class="card-header">
            <h5>Get more responses</h5>
          </div>
          <div class="card-body text-center">
            <p>Invite 10 more recommended tradespeople to get more responses.</p>
            <button class="btn btn-primary">Share your job</button>
          </div>
        </div>
      </div>

      <div class="col-md-12 text-center">
        <router-link :to="'/tradesperson-recommendation/'+jobId" class="btn btn-link">View recommended tradespeople
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
import {userService} from "@/apis/user.service";
import {getDatabase, ref, get, off, onValue} from "firebase/database";

export default {
  name: "homeownerSidebar",
  props: {
    jobId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      user: this.$store.getters.GET_USER_INFO || {},
      interestedTradespeople: [],
      chatTradespeople: [],
      unreadMessages: {},
      firebaseListeners: {},
    };
  },
  computed: {},
  watch: {},
  methods: {
    getJobInterests() {
      this.isLoading = true;
      userService.getProjectInterest(this.jobId).then((res) => {
        this.isLoading = false;
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.interestedTradespeople = extra;
      });
    },
    getAcceptInterest() {
      this.isLoading = true;
      userService.getAcceptedInterest(this.jobId).then((res) => {
        this.isLoading = false;
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.chatTradespeople = extra;

        // Listen for unread messages per tradesperson
        extra.forEach((person) => {
          this.listenForUnreadMessages(this.jobId, person.invited_user_id);
        });
      });
    },

    listenForUnreadMessages(jobId, tradespersonId) {
      const db = getDatabase();
      const messagesRef = ref(db, `chat_channels/${jobId}/${tradespersonId}/messages`);

      const listener = onValue(messagesRef, (snapshot) => {
        const messages = snapshot.val();
        let count = 0;
        if (messages) {
          for (let key in messages) {
            const msg = messages[key];
            if (msg.from === tradespersonId && !msg.read) {
              count++;
            }
          }
        }
        this.$set(this.unreadMessages, tradespersonId, count);
      });

      // Track for cleanup
      this.firebaseListeners[tradespersonId] = {ref: messagesRef, listener};
    },

    acceptInvite(interest) {
      this.isLoading = true;
      const payload = {
        request_id: interest.id
      }
      userService.acceptInvite(payload).then((res) => {
        this.isLoading = false;
        const {status, message, extra} = res;
        if (!status) {
          this.$store.dispatch('error', {message: message, showSwal: true});
          return;
        }
        this.interestedTradespeople = extra;
      });
    },

  },
  created() {
    this.getJobInterests();
    this.getAcceptInterest();
  },
};
</script>
