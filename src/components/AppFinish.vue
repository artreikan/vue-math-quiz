<template>
  <div class="finish">
    <div class="card finish-card">
      <p>
        Вы дали
        <span class="finish-correct">{{ correctAnswers }}</span>
        {{ pluralForm.correct }} и
        <span class="finish-incorrect">{{ incorrectAnswers }}</span>
        {{ pluralForm.incorrect }} ответов
      </p>
      <p>
        Вы такой же крутой математик, как и
        <a href="https://www.youtube.com/watch?v=ejNGCWEgJNU" target="_blank"
          >Юрий Степанович Рыбников</a
        >
      </p>
      <button class="btn finish-btn" type="button" @click="startGame">
        Сыграть еще раз
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppFinish",

  props: {
    correctAnswers: {
      type: Number,
      required: true,
    },
    incorrectAnswers: {
      type: Number,
      required: true,
    },
    pluralForm: {
      type: Object,
      required: true,
    },
  },

  methods: {
    startGame() {
      this.$emit("startGame");
    },
  },
};
</script>

<style lang="scss">
.finish-card {
  span {
    font-weight: bold;

    &.finish-correct {
      color: #52ebb5;
    }

    &.finish-incorrect {
      color: #eb5252;
    }
  }
}

.finish-btn {
  display: block;
  margin: auto;
}
</style>
