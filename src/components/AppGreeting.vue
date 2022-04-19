<template>
  <div class="greeting">
    <h1 class="greeting-title">Math Quiz</h1>
    <div class="card greeting-description">
      <p>
        Цель игры достаточно простая: за <strong>60</strong> секунд вам нужно
        решить максимальное количество простых арифметических задачек.<br />
        Чем больше правильных ответов вы дадите, тем вы больший молодец <br />
        и пусечка.
      </p>
      <button
        class="btn greeting-btn"
        type="button"
        @click="startGame"
        :disabled="isDelayed"
      >
        {{ startBtnText }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppGreeting",

  props: {
    isDelayed: {
      type: Boolean,
      required: true,
    },
    delayTime: {
      type: Number,
      required: true,
    },
  },

  computed: {
    startBtnText() {
      return this.isDelayed
        ? `Стартуем через ${this.delayTime}`
        : "Начать игру";
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
.greeting-title {
  color: #52ebb5;
  text-align: center;
  margin-bottom: 1.8rem;
  font-size: 2.5rem;
}

.greeting-btn {
  display: block;
  margin: auto;
}
</style>
