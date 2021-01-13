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
      <template v-if="fullStats.length"
        ><button
          class="show-full-stats"
          :class="{ 'is-showed': isFullStatsShowed }"
          type="button"
          @click="toggleFullStats"
        >
          <span>Подробная статистика</span>
          <img src="../assets/down-arrow.svg" alt="Arrow" />
        </button>
        <app-full-stats :fullStats="fullStats" v-show="isFullStatsShowed"
      /></template>
      <button class="btn finish-btn" type="button" @click="startGame">
        Сыграть еще раз
      </button>
    </div>
  </div>
</template>

<script>
import AppFullStats from "@/components/AppFullStats.vue";

export default {
  name: "AppFinish",

  components: {
    AppFullStats,
  },

  data: () => ({
    isFullStatsShowed: false,
  }),

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
    fullStats: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    startGame() {
      this.$emit("startGame");
    },
    toggleFullStats() {
      this.isFullStatsShowed = !this.isFullStatsShowed;
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

.show-full-stats {
  background-color: transparent;
  appearance: none;
  border: none;
  color: #fff;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  &.is-showed {
    img {
      transform: rotate(180deg);
    }
  }

  span {
    margin-right: 0.5rem;
  }
}
</style>
