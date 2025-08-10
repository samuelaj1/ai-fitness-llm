<template>
  <div class="question-section">
    <h2>{{ question.formLabel }}</h2>

    <div v-if="question.options && question.options.length">
      <div v-for="(option, index) in question.options" :key="index">
        <!-- Radio Option -->
        <div v-if="option.type === 'StandardChoiceOption'" class="option-box">
          <input type="radio"
                 :id="'option-' + question.id + '-' + index"
                 :name="'question-' + question.id"
                 :value="option.formLabel"
                 v-model="answers[question.id]"
                 @change="onOptionSelected(option)">
          <label :for="'option-' + question.id + '-' + index">{{ option.formLabel }}</label>

          <div v-if="isOtherSelected(option)">
            <input type="text"
                   class="form-control mt-2"
                   v-model="answers[question.id + '_other']"
                   placeholder="Please specify" />
          </div>
        </div>

        <!-- Checkbox Option -->
        <div v-else-if="option.type === 'StandardCheckOption'" class="option-box">
          <input type="checkbox"
                 :id="'checkbox-' + question.id + '-' + index"
                 :value="option.formLabel"
                 v-model="answers[question.id]"
                 @change="onOptionSelected(option)">
          <label :for="'checkbox-' + question.id + '-' + index">{{ option.formLabel }}</label>

          <div v-if="isCheckboxOtherSelected(option)">
            <input type="text"
                   class="form-control mt-2"
                   v-model="answers[question.id + '_other']"
                   placeholder="Please specify" />
          </div>
        </div>

        <!-- Textarea Option -->
        <div v-else-if="option.type === 'StandardTextAreaOption'">
          <label :for="'textarea-' + question.id + '-' + index">{{ option.formLabel }}</label>
          <textarea :id="'textarea-' + question.id + '-' + index"
                    class="form-control mt-2"
                    v-model="answers[question.id + '_textarea_' + index]"
                    rows="4"
                    @input="onOptionSelected(option)"
                    placeholder="Type your response here"></textarea>
        </div>
      </div>

    </div>

    <!-- Nested Question shown only after clicking Next -->
    <div v-if="showNext && selectedOption && selectedOption.next">
      <QuestionRenderer
          :question="selectedOption.next"
          :answers.sync="answers"
          @next="$emit('next', $event)"
      />
    </div>


  </div>
</template>

<script>
export default {
  name: 'QuestionRenderer',
  props: {
    question: Object,
    answers: Object,
  },
  components: {
    QuestionRenderer: () => import('./QuestionRenderer.vue')
  },
  data() {
    return {
      selectedOption: null,
      showNext: false,
      nextButtonShown: false
    };
  },
  methods: {
    onOptionSelected(option) {
      this.selectedOption = option;
    },
    onCheckboxSelected(option) {
      // Optional: handle for checkboxes if needed
      console.log(option)
    },
    isOtherSelected(option) {
      return option.formLabel.toLowerCase() === 'other' &&
          this.answers[this.question.id] === option.formLabel;
    },
    isCheckboxOtherSelected(option) {
      return option.formLabel.toLowerCase() === 'other' &&
          this.answers[this.question.id]?.includes(option.formLabel);
    },
    goToNext() {
      this.showNext = true;
      if (this.selectedOption.next && this.selectedOption.next.id) {
        this.$emit('next', this.selectedOption.next.id);
      }
    }
  }
};
</script>

<style scoped>
.question-section {
  padding-bottom: 20px;
}
.option-box {
  border: 1px solid #ddd;
  padding: 15px;
  margin: 10px 0;
  border-radius: 10px;
  cursor: pointer;
}
.option-box:hover {
  background: #f9f9f9;
}
</style>
