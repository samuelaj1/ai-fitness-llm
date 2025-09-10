<template>
  <Layout>
    <div class="container mt-4">
      <h4>💬 LLM Fitness Coach</h4>

      <!-- Chat window -->
      <div class="card" style="height: 400px; overflow-y: scroll;">
        <div class="card-body">
          <div v-for="(msg, index) in messages" :key="index">
            <p>
              <strong>{{ msg.sender }}:</strong>
              <span v-html="formatMessage(msg.text)"></span>
            </p>
          </div>

          <!-- Typing animation -->
          <div v-if="isTyping" class="d-flex align-items-center mt-2">
            <strong>Coach:</strong>
            <div class="dots ms-2">
              <span>.</span><span>.</span><span>.</span>
            </div>
          </div>

          <!-- Pending action section -->
          <div v-if="pendingAction" class="alert alert-warning mt-3">
            <p><strong>Coach:</strong> {{ pendingAction }}</p>
            <div class="mt-2">
              <button class="btn btn-success btn-sm me-2" @click="handleAction('Yes')">Yes</button>
              <button class="btn btn-danger btn-sm" @click="handleAction('No')">No</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Input field -->
      <div class="input-group mt-3">
        <select v-model="userMood" class="form-select" style="max-width: 150px;">
          <option disabled value="">Mood</option>
          <option value="happy">😊 Happy</option>
          <option value="motivated">💪 Motivated</option>
          <option value="tired">😴 Tired</option>
          <option value="stressed">😟 Stressed</option>
          <option value="neutral">😐 Neutral</option>
        </select>

        <input
            v-model="userMessage"
            @keyup.enter="sendMessage()"
            type="text"
            class="form-control"
            placeholder="Type your message..."
        />
        <button @click="sendMessage()" class="btn btn-primary">Send</button>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "../../base-layout/layout";
import { userService } from "@/apis/user.service";
import appConfig from "../../../../app.config.json";

export default {
  name: "CoachChat",
  page: {
    title: "Coach Chat",
    meta: [{name: "description", content: appConfig.description}]
  },
  data() {
    return {
      messages: [],
      userId: "6898e6b079b5c9e68fb4a9e2",
      userMessage: "",
      pendingAction: null,
      isTyping: false,
      userMood: "neutral",
    };
  },
  components: {
    Layout,
  },
  methods: {
    formatMessage(text) {
      // Replace newlines with <br> and convert numbered lists to <ol><li>
      return text
          .replace(/\n/g, "<br>")
          .replace(/(\d+\.\s)(.+)/g, "<ol><li>$2</li></ol>")
          .replace(/<\/ol><ol>/g, ""); // Clean up extra <ol> tags
    },
    async sendMessage(messageOverride = "") {
      const msg = messageOverride || this.userMessage;
      if (!msg) return;

      // Push user message
      this.messages.push({ sender: "You", userMood:this.userMood, text: msg });
      this.userMessage = "";

      try {
        this.isTyping = true; // show animation

        const res = await userService.chat({
          message: msg,
          userId: this.userId,
          mood: this.userMood || "neutral"
        });

        this.isTyping = false; // hide animation

        if (!res.status) {
          this.$store.dispatch("error", {
            message: res.message,
            showSwal: true,
          });
          return;
        }

        // Add assistant reply
        this.messages.push({ sender: "Coach", text: res.data.reply });

        // Handle pending action
        this.pendingAction = res.data.pendingAction || null;
      } catch (err) {
        console.error(err);
        this.isTyping = false;
      }
    },

    handleAction(answer) {
      this.pendingAction = null;
      this.sendMessage(answer);
    },
  },
  mounted() {
    this.messages.push({
      sender: "Coach",
      text: "Hi Samuel 👋 How are you feeling today? Ready to get started?"
    });
  }

};
</script>

<style scoped>
/* Dots animation */
.dots span {
  animation: blink 1.4s infinite both;
  font-size: 20px;
  margin: 0 1px;
}
.dots span:nth-child(2) {
  animation-delay: 0.2s;
}
.dots span:nth-child(3) {
  animation-delay: 0.4s;
}
@keyframes blink {
  0% { opacity: 0.2; }
  20% { opacity: 1; }
  100% { opacity: 0.2; }
}
</style>
