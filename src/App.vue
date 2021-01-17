<template>
  <div class="app-wrapper">
    <app-greeting
      @startGame="startGame"
      v-if="isGreeting"
      :isDelayed="isDelayed"
    />
    <app-game
      v-else-if="isGameStarted"
      :gameTime="gameTime"
      :firstNumber="firstNumber"
      :secondNumber="secondNumber"
      :progressStyle="progressStyle"
      @handleAnswer="handleAnswer"
    />
    <app-finish
      v-else
      :correctAnswers="correctAnswers"
      :incorrectAnswers="incorrectAnswers"
      :pluralForm="pluralForm"
      :fullStats="fullStats"
      :isDelayed="isDelayed"
      @startGame="startGame"
    />
  </div>
</template>

<script>
import { randomInteger, sleep } from "@/helpers";
import AppGreeting from "@/components/AppGreeting.vue";
import AppGame from "@/components/AppGame.vue";
import AppFinish from "@/components/AppFinish.vue";

const MIN_NUMBER = 0;
const MAX_NUMBER = 50;
const DELAY_BEFORE_GAME = 3000;

export default {
  name: "App",

  components: {
    AppGreeting,
    AppGame,
    AppFinish,
  },

  data() {
    return {
      isGreeting: true,
      isGameStarted: false,
      isDelayed: false,
      firstNumber: 0,
      secondNumber: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      initialTime: 60,
      gameTime: this.initialTime,
      gameTimer: null,
      fullStats: [],
    };
  },

  computed: {
    correctAnswer() {
      return this.firstNumber + this.secondNumber;
    },
    progressStyle() {
      return {
        "animation-duration": `${this.initialTime}s`,
        "animation-play-state": this.isGameStarted ? "running" : "paused",
      };
    },
    pluralForm() {
      return {
        correct: this.correctAnswers === 1 ? "правильный" : "правильных",
        incorrect:
          this.incorrectAnswers === 1 ? "неправильный" : "неправильных",
      };
    },
  },

  beforeUnmount() {
    clearInterval(this.gameTimer);
  },

  methods: {
    async startGame() {
      await this.startDelayBeforeGame();
      this.fullStats = [];
      this.correctAnswers = 0;
      this.incorrectAnswers = 0;
      this.generateNumbers();
      this.gameTime = this.initialTime;
      this.isGreeting = false;
      this.isGameStarted = true;
      this.gameTimer = setInterval(() => {
        if (this.gameTime === 1) {
          clearInterval(this.gameTimer);
          this.finishGame();
        }
        this.gameTime--;
      }, 1000);
    },
    async startDelayBeforeGame() {
      this.isDelayed = true;
      await sleep(DELAY_BEFORE_GAME);
      this.isDelayed = false;
    },
    finishGame() {
      this.isGameStarted = false;
    },
    generateNumbers() {
      this.firstNumber = randomInteger(MIN_NUMBER, MAX_NUMBER);
      this.secondNumber = randomInteger(MIN_NUMBER, MAX_NUMBER);
    },
    createStatItem(type, userAnswer) {
      return {
        type,
        answer: `${this.firstNumber} + ${this.secondNumber} = ${userAnswer}`,
      };
    },
    handleAnswer(userAnswer) {
      if (this.correctAnswer === userAnswer) {
        this.correctAnswers++;
        this.fullStats.push(this.createStatItem("correct", userAnswer));
      } else {
        this.incorrectAnswers++;
        this.fullStats.push(this.createStatItem("incorrect", userAnswer));
      }

      this.generateNumbers();
    },
  },
};
</script>

<style lang="scss">
html,
body {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

body {
  background-color: #1d1e1f;
  color: #fff;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

input:focus,
button:focus {
  outline: 0;
}

::selection {
  background-color: #527beb;
  color: #fff;
}

a {
  color: #52ebb5;
  text-decoration: underline;

  &:hover,
  &:focus {
    color: #527beb;
    text-decoration: none;
  }
}

#app {
  width: 100%;
}

.app-wrapper {
  max-width: 700px;
  width: 100%;
  margin: 1rem auto;
}

.card {
  background-color: #27292d;
  padding: 1.5rem 1.75rem;
  border-radius: 2rem;
  font-size: 1.2rem;
}

.btn {
  background-color: #52ebb5;
  color: #1d1e1f;
  font-weight: 500;
  border: 1px solid transparent;
  padding: 0.75rem 1.5rem;
  line-height: 1;
  border-radius: 2rem;
  transition: all 0.4s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover,
  &:focus {
    background-color: transparent;
    border-color: #52ebb5;
    color: #52ebb5;
  }
}

@keyframes progress {
  0% {
    background-color: #52ebb5;
  }

  50% {
    background-color: #e1eb52;
  }

  100% {
    width: 0;
    background-color: #eb5252;
    display: none;
  }
}
</style>
