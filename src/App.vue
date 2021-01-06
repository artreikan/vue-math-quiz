<template>
  <div class="app-wrapper">
    <div class="greeting" v-if="isGreeting">
      <h1 class="greeting-title">
        Math Quiz
      </h1>
      <div class="card greeting-description">
        <p>
          Если вы математик, то вы
          <strike
            ><a
              href="https://www.youtube.com/watch?v=A0_Abt4dzAA"
              target="_blank"
              >должны знать счет древних шизов</a
            ></strike
          >
          очень легко справитесь с этой игрой.
        </p>
        <p>
          Цель игры достаточно простая: за <strong>60</strong> секунд вам нужно
          решить максимальное количество простых арифметических задачек.<br />
          Чем больше правильных ответов вы дадите, тем вы больший молодец <br />
          и пусечка.
        </p>
        <button class="btn greeting-btn" type="button" @click="startGame">
          Начать игру
        </button>
      </div>
    </div>
    <div class="game" v-if="isGameStarted">
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
            placeholder="Ваш ответ"
            v-model.number="userAnswer"
            required
          />
          <button class="btn game-form-btn" type="submit">Ответить</button>
        </form>
      </div>
    </div>
    <div class="finish" v-if="!isGreeting && !isGameStarted">
      <div class="card finish-card">
        <p>
          Вы дали
          <span class="finish-correct">{{ correctAnswers }}</span> правильных и
          <span class="finish-incorrect">{{ incorrectAnswers }}</span>
          неправильных ответов
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
  </div>
</template>

<script>
import { randomInteger } from "@/helpers";

const MIN_NUMBER = 0;
const MAX_NUMBER = 50;

export default {
  name: "App",

  data: () => ({
    isGreeting: true,
    isGameStarted: false,
    firstNumber: 0,
    secondNumber: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    initialTime: 60,
    gameTime: 60,
    gameTimer: null,
    userAnswer: "",
  }),

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
  },

  beforeUnmount() {
    clearInterval(this.gameTimer);
  },

  methods: {
    startGame() {
      this.correctAnswers = 0;
      this.incorrectAnswers = 0;
      this.generateNumbers();
      this.gameTime = 60;
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
    finishGame() {
      this.isGameStarted = false;
    },
    generateNumbers() {
      this.firstNumber = randomInteger(MIN_NUMBER, MAX_NUMBER);
      this.secondNumber = randomInteger(MIN_NUMBER, MAX_NUMBER);
    },
    handleAnswer() {
      if (this.correctAnswer === this.userAnswer) {
        this.correctAnswers++;
      } else {
        this.incorrectAnswers++;
      }

      this.userAnswer = "";

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

::selection {
  background-color: #527beb;
  color: #fff;
}

a {
  color: #52ebb5;

  &,
  &:hover {
    text-decoration: none;
  }

  &:hover {
    color: #527beb;
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

.greeting-title {
  color: #52ebb5;
  text-align: center;
  margin-bottom: 1.8rem;
  font-size: 2.5rem;
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

  &:hover,
  &:focus {
    background-color: transparent;
    border-color: #52ebb5;
    color: #52ebb5;
  }
}

.greeting-btn {
  display: block;
  margin: auto;
}

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

.game-problem {
  text-align: center;
  font-size: 1.8rem;
}

.finish-btn {
  display: block;
  margin: auto;
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
