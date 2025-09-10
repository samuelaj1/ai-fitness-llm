<template>
  <Layout>
    <div class="container mt-4">
      <div class="card p-3">
        <h5>Daily Check-In</h5>
        <div class="chat-box border p-3 mb-3" style="height: 300px; overflow-y: auto;">
          <div v-for="(msg, index) in messages" :key="index" :class="msg.type">
            <strong v-if="msg.type === 'bot'">Coach:</strong>
            <strong v-else>You:</strong>
            {{ msg.text }}
          </div>
        </div>

        <div class="input-group">
          <input type="text" v-model="userInput" class="form-control" placeholder="Type your answer..."
                 @keyup.enter="sendMessage"/>
          <button class="btn btn-primary" @click="sendMessage">Send</button>
        </div>
      </div>
    </div>
  </Layout>

</template>

<script>
import Layout from '../../base-layout/layout';
import {userService} from "@/apis/user.service";
import appConfig from "../../../../app.config.json";

export default {
  name: "Daily-Check-In",
  page: {
    title: "Daily Check In",
    meta: [{name: "description", content: appConfig.description}]
  },
  data() {
    return {
      userId: "6898e6b079b5c9e68fb4a9e2",
      userInput: "",
      messages: [
        {type: 'bot', text: 'Hi Samuel! How are you feeling today?'}
      ],
      step: 1,
      checkinData: {
        mood: "",
        notes: ""
      }
    };
  },
  components: {
    Layout
  },
  methods: {
    async sendMessage() {
      if (!this.userInput.trim()) return;

      this.messages.push({type: 'user', text: this.userInput});

      if (this.step === 1) {
        this.checkinData.mood = this.userInput;

        // Save mood right away
        await userService.checkIn({
          userId: this.userId,
          mood: this.checkinData.mood,
          notes: ""
        });

        this.messages.push({type: 'bot', text: "Got it! Anything specific you’d like to note about your day?"});
        this.step++;
      } else if (this.step === 2) {
        this.checkinData.notes = this.userInput;

        // Update check-in with notes
        await this.saveCheckin();
        this.step = 1;
      }

      this.userInput = "";
    },


    async saveCheckin() {
      try {
        // Save check-in and get LLM advice
        const res = await userService.checkIn({
          userId: this.userId,
          mood: this.checkinData.mood,
          notes: this.checkinData.notes
        });

        if (!res.status) {
          await this.$store.dispatch('error', {message: res.message, showSwal: true});
          return;
        }

        const llmRes = await userService.getMotivationalMessage({
          mood: this.checkinData.mood,
          goal: "Improve overall well-being",
          challenges: this.checkinData.notes
        });

        const aiMessage = llmRes.status ? llmRes.data : "Check-in saved ✅. Keep going strong today!";

        // Show AI message in chat
        this.messages.push({type: 'bot', text: aiMessage});

        // Save AI message to history
        await userService.saveLLMResponse({
          userId: this.userId,
          mood: this.checkinData.mood,
          notes: this.checkinData.notes,
          llmResponse: aiMessage
        });

      } catch (error) {
        console.error("Error in saveCheckin:", error);
        this.messages.push({type: 'bot', text: "Oops, something went wrong. Try again later."});
      }
    },

    getCheckInHistory() {
      userService.getCheckInHistory(this.userId).then((res) => {
        const {status, message, data} = res;
        if (!status) {
          this.$store.dispatch('error', {message, showSwal: true});
          return;
        }

        if (!data || data.length === 0) {
          this.messages.push({type: 'bot', text: 'Hi Samuel! How are you feeling today?'});
          return;
        }

        this.messages = data.flatMap(entry => {
          const msgs = [{ type: 'user', text: entry.mood }];
          if (entry.llmResponse) {
            msgs.push({ type: 'bot', text: entry.llmResponse });
          }
          return msgs;
        });

      }).catch(error => {
        console.error("Error fetching check-in history:", error);
      });
    }
  },

  created() {
    this.getCheckInHistory();
  },
};
</script>

<style>
.user {
  text-align: right;
  color: blue;
}

.bot {
  text-align: left;
  color: green;
}
</style>
