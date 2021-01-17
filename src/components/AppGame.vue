<template>
  <div class="game">
    <span class="game-time"> {{ gameTime }} </span>
    <div class="card game-card">
      <div
        class="game-progress"
        aria-hidden="true"
        :style="progressStyle"
      ></div>
      <h3 class="game-problem">{{ firstNumber }} + {{ secondNumber }} = ?</h3>
      <form class="game-form" @submit.prevent="handleAnswer">
        <input
          class="game-form-input"
          type="number"
          inputmode="numeric"
          pattern="[0-9]*"
          placeholder="Ваш ответ"
          v-model.number="userAnswer"
          ref="gameInput"
          required
        />
        <button class="btn game-form-btn" type="submit">Ответить</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppGame",

  data: () => ({
    userAnswer: "",
  }),

  props: {
    gameTime: {
      type: Number,
      required: true,
    },
    firstNumber: {
      type: Number,
      required: true,
    },
    secondNumber: {
      type: Number,
      required: true,
    },
    progressStyle: {
      type: Object,
      required: true,
    },
  },

  mounted() {
    this.$refs.gameInput.focus();
  },

  methods: {
    handleAnswer() {
      this.$emit("handleAnswer", this.userAnswer);
      this.userAnswer = "";
      this.$refs.gameInput.focus();
    },
  },
};
</script>

<style lang="scss">
.game {
  display: flex;
  flex-direction: column;
}

.game-time {
  align-self: flex-end;
  font-size: 1.1rem;
  margin-bottom: 0.55rem;
  margin-right: 1.75rem;
}

.game-progress {
  width: 100%;
  height: 10px;
  background-color: #52ebb5;
  border-radius: 2rem;
  margin-bottom: 1.5rem;
  animation-name: progress;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.game-form {
  display: flex;
  align-items: flex-end;
}

.game-form-input {
  background-color: transparent;
  border: none;
  flex-grow: 1;
  border-bottom: 1px solid #52ebb5;
  margin-right: 1rem;
  padding: 1rem;
  color: #fff;
}

.game-problem {
  text-align: center;
  font-size: 1.8rem;
}

@media screen and (max-width: 767px) {
  .game-form {
    flex-wrap: wrap;
    justify-content: center;
  }

  .game-form-input {
    width: 100%;
    margin-bottom: 1rem;
    margin-right: 0;
  }
}
</style>
