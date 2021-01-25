<template>
  <ul class="full-stats">
    <li
      v-for="statItem in fullStats"
      :key="statItem.answer"
      :class="statItem.type"
    >
      <span>{{ statItem.answer }}</span>
      <small v-if="statItem.extraData">
        {{ statItem.extraData }}
      </small>
    </li>
  </ul>
</template>

<script>
export default {
  name: "AppFullStats",
  props: {
    fullStats: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss">
.full-stats {
  padding-left: 0;
  list-style-position: inside;

  li {
    display: flex;
    align-items: center;

    span {
      margin-right: 10px;
    }

    small {
      font-style: italic;
      color: rgba(255, 255, 255, 0.4);
    }
  }

  .correct {
    color: #52ebb5;
  }

  .incorrect {
    color: #eb5252;
  }
}
</style>
